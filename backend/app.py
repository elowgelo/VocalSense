import os
import sys
import uuid
import shutil
import json
import subprocess
from pathlib import Path
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from database import init_db, get_db, hash_pw

app = FastAPI(
    title="VocalSense AI - Audio Engine Backend",
    description="Backend Service untuk Pemisahan Vokal (Stem Isolation) dan Analisis Akustik Bernyanyi",
    version="1.0.0"
)

# Izinkan CORS agar frontend static dapat mengakses API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
TEMP_DIR = BASE_DIR / "temp_audio"
TEMP_DIR.mkdir(parents=True, exist_ok=True)

init_db()

# Models
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    tier: Optional[str] = "free"

class UserLogin(BaseModel):
    email: str
    password: str

class ReportPayload(BaseModel):
    user_id: Optional[str] = None
    overallScore: int
    scoreGrade: Optional[str] = None
    duration: Optional[str] = None
    pitchAccuracy: Optional[int] = None
    pitchStability: Optional[int] = None
    vibratoRate: Optional[float] = None
    vibratoQuality: Optional[int] = None
    breathSupport: Optional[int] = None
    resonance: Optional[Dict[str, Any]] = None
    detectedNotes: Optional[List[Any]] = None
    aiAdvice: Optional[str] = None
    audioStemUrl: Optional[str] = None

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "service": "VocalSense AI Engine",
        "ffmpeg_available": shutil.which("ffmpeg") is not None
    }

@app.post("/api/audio/separate-stems")
async def separate_stems(file: UploadFile = File(...)):
    """
    Memisahkan audio menjadi 2 stem:
    1. vocals: Vokal bersih (Center-channel extraction + vocal bandpass filter)
    2. accompaniment: Musik pengiring karaoke (Center-channel cancellation / side stereo)
    """
    if not shutil.which("ffmpeg"):
        raise HTTPException(status_code=500, detail="FFmpeg tidak terpasang di sistem peladen.")

    job_id = str(uuid.uuid4())
    job_dir = TEMP_DIR / job_id
    job_dir.mkdir(parents=True, exist_ok=True)

    input_ext = Path(file.filename or "").suffix.lower()
    if input_ext not in {".mp3", ".wav", ".m4a", ".flac", ".ogg", ".aac"}:
        shutil.rmtree(job_dir, ignore_errors=True)
        raise HTTPException(status_code=415, detail="Format audio tidak didukung.")

    input_path = job_dir / f"input{input_ext}"
    vocals_path = job_dir / "vocals.wav"
    accompaniment_path = job_dir / "accompaniment.wav"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Demucs hybrid transformer model; better separation than stereo center/side DSP.
        separated_dir = job_dir / "separated"
        cmd_demucs = [
            sys.executable, "-m", "demucs.separate",
            "-n", "htdemucs_ft",
            "--two-stems", "vocals",
            "--out", str(separated_dir),
            str(input_path)
        ]
        result = subprocess.run(
            cmd_demucs, capture_output=True, text=True, timeout=1800
        )
        if result.returncode != 0:
            raise RuntimeError(
                f"Demucs gagal ({result.returncode}): {result.stderr[-3000:]}"
            )

        model_dir = separated_dir / "htdemucs_ft" / input_path.stem
        demucs_vocals = model_dir / "vocals.wav"
        demucs_instruments = model_dir / "no_vocals.wav"
        if not demucs_vocals.exists() or not demucs_instruments.exists():
            raise RuntimeError(
                f"Stem Demucs tidak lengkap. Output: {model_dir}"
            )

        shutil.copyfile(demucs_vocals, vocals_path)
        shutil.copyfile(demucs_instruments, accompaniment_path)

        return JSONResponse({
            "status": "success",
            "job_id": job_id,
            "filename": file.filename,
            "vocals_url": f"/api/audio/stream/{job_id}/vocals",
            "accompaniment_url": f"/api/audio/stream/{job_id}/accompaniment",
            "message": "Pemisahan stem vokal dan karaoke berhasil diproses."
        })

    except Exception as e:
        shutil.rmtree(job_dir, ignore_errors=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/audio/stream/{job_id}/{stem_type}")
def stream_stem(job_id: str, stem_type: str):
    job_dir = TEMP_DIR / job_id
    if not job_dir.exists():
        raise HTTPException(status_code=404, detail="Sesi audio tidak ditemukan atau telah kedaluwarsa.")

    target_file = job_dir / f"{stem_type}.wav"
    if not target_file.exists():
        raise HTTPException(status_code=404, detail=f"Stem '{stem_type}' tidak ditemukan.")

    return FileResponse(
        path=target_file,
        media_type="audio/wav",
        filename=f"{stem_type}.wav"
    )

# --- DB APIs: Auth, Exercises & Reports ---

@app.post("/api/auth/register")
def register(user: UserRegister):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email = ?", (user.email.strip().lower(),))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="Email sudah terdaftar.")
    
    user_id = str(uuid.uuid4())
    pw_hashed = hash_pw(user.password)
    now = datetime.utcnow().isoformat()
    cursor.execute("""
    INSERT INTO users (id, name, email, password_hash, tier, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (user_id, user.name, user.email.strip().lower(), pw_hashed, user.tier, now))
    conn.commit()
    conn.close()
    return {
        "status": "success",
        "user": {
            "id": user_id,
            "name": user.name,
            "email": user.email.strip().lower(),
            "tier": user.tier
        }
    }

@app.post("/api/auth/login")
def login(creds: UserLogin):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (creds.email.strip().lower(),))
    row = cursor.fetchone()
    conn.close()
    if not row or row["password_hash"] != hash_pw(creds.password):
        raise HTTPException(status_code=401, detail="Email atau kata sandi tidak valid.")
    
    return {
        "status": "success",
        "user": {
            "id": row["id"],
            "name": row["name"],
            "email": row["email"],
            "tier": row["tier"],
            "voice_type": row["voice_type"],
            "vocal_range_low": row["vocal_range_low"],
            "vocal_range_high": row["vocal_range_high"]
        }
    }

@app.get("/api/exercises")
def get_exercises():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM exercises")
    rows = cursor.fetchall()
    conn.close()
    res = []
    for r in rows:
        res.append({
            "id": r["id"],
            "title": r["title"],
            "category": r["category"],
            "level": r["level"],
            "target_vowel": r["target_vowel"],
            "bpm": r["bpm"],
            "description": r["description"],
            "notes": json.loads(r["notes_json"])
        })
    return {"status": "success", "exercises": res}

@app.post("/api/reports")
def create_report(payload: ReportPayload):
    conn = get_db()
    cursor = conn.cursor()
    report_id = f"VS-REC-{str(uuid.uuid4())[:8].upper()}"
    now = datetime.utcnow().isoformat()
    cursor.execute("""
    INSERT INTO reports (
        id, user_id, date, overall_score, score_grade, duration,
        pitch_accuracy, pitch_stability, vibrato_rate, vibrato_quality,
        breath_support, resonance_json, detected_notes_json, ai_advice, audio_stem_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        report_id,
        payload.user_id,
        now,
        payload.overallScore,
        payload.scoreGrade,
        payload.duration,
        payload.pitchAccuracy,
        payload.pitchStability,
        payload.vibratoRate,
        payload.vibratoQuality,
        payload.breathSupport,
        json.dumps(payload.resonance or {}),
        json.dumps(payload.detectedNotes or []),
        payload.aiAdvice,
        payload.audioStemUrl
    ))
    conn.commit()
    conn.close()
    return {"status": "success", "report_id": report_id}

@app.get("/api/reports")
def list_reports(user_id: Optional[str] = None):
    conn = get_db()
    cursor = conn.cursor()
    if user_id:
        cursor.execute("SELECT * FROM reports WHERE user_id = ? ORDER BY date DESC", (user_id,))
    else:
        cursor.execute("SELECT * FROM reports ORDER BY date DESC LIMIT 20")
    rows = cursor.fetchall()
    conn.close()
    res = []
    for r in rows:
        res.append({
            "id": r["id"],
            "user_id": r["user_id"],
            "date": r["date"],
            "overallScore": r["overall_score"],
            "scoreGrade": r["score_grade"],
            "duration": r["duration"],
            "pitchAccuracy": r["pitch_accuracy"],
            "pitchStability": r["pitch_stability"],
            "vibratoRate": r["vibrato_rate"],
            "vibratoQuality": r["vibrato_quality"],
            "breathSupport": r["breath_support"],
            "resonance": json.loads(r["resonance_json"] or "{}"),
            "detectedNotes": json.loads(r["detected_notes_json"] or "[]"),
            "aiAdvice": r["ai_advice"],
            "audioStemUrl": r["audio_stem_url"]
        })
    return {"status": "success", "reports": res}

@app.get("/api/reports/{report_id}")
def get_report(report_id: str):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM reports WHERE id = ?", (report_id,))
    r = cursor.fetchone()
    conn.close()
    if not r:
        raise HTTPException(status_code=404, detail="Laporan tidak ditemukan.")
    return {
        "status": "success",
        "report": {
            "id": r["id"],
            "user_id": r["user_id"],
            "date": r["date"],
            "overallScore": r["overall_score"],
            "scoreGrade": r["score_grade"],
            "duration": r["duration"],
            "pitchAccuracy": r["pitch_accuracy"],
            "pitchStability": r["pitch_stability"],
            "vibratoRate": r["vibrato_rate"],
            "vibratoQuality": r["vibrato_quality"],
            "breathSupport": r["breath_support"],
            "resonance": json.loads(r["resonance_json"] or "{}"),
            "detectedNotes": json.loads(r["detected_notes_json"] or "[]"),
            "aiAdvice": r["ai_advice"],
            "audioStemUrl": r["audio_stem_url"]
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)