import sqlite3
import json
import hashlib
import uuid
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).resolve().parent / "vocalsense.db"

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        tier TEXT DEFAULT 'free',
        voice_type TEXT DEFAULT 'Tenor',
        vocal_range_low TEXT DEFAULT 'C3',
        vocal_range_high TEXT DEFAULT 'G4',
        created_at TEXT NOT NULL
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        date TEXT NOT NULL,
        overall_score INTEGER NOT NULL,
        score_grade TEXT,
        duration TEXT,
        pitch_accuracy INTEGER,
        pitch_stability INTEGER,
        vibrato_rate REAL,
        vibrato_quality INTEGER,
        breath_support INTEGER,
        resonance_json TEXT,
        detected_notes_json TEXT,
        ai_advice TEXT,
        audio_stem_url TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
    """)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        level TEXT NOT NULL,
        target_vowel TEXT NOT NULL,
        bpm INTEGER NOT NULL,
        description TEXT NOT NULL,
        notes_json TEXT NOT NULL
    )
    """)
    conn.commit()

    # Seed default exercises if empty
    cursor.execute("SELECT COUNT(*) as count FROM exercises")
    if cursor.fetchone()["count"] == 0:
        seed_exercises(conn)
    conn.close()

def seed_exercises(conn):
    exercises = [
        {
            "id": "warmup-lip-trill",
            "title": "Lip Trill 5-Tone Scale",
            "category": "Warm-up & Release",
            "level": "Pemula",
            "target_vowel": "Lip Buzz / Brrr",
            "bpm": 84,
            "description": "Melepaskan ketegangan rahang, mengaktifkan napas diafragma, dan meratakan tekanan subglotal.",
            "notes": [
                {"midi": 60, "start": 0.0, "dur": 0.5},
                {"midi": 62, "start": 0.5, "dur": 0.5},
                {"midi": 64, "start": 1.0, "dur": 0.5},
                {"midi": 65, "start": 1.5, "dur": 0.5},
                {"midi": 67, "start": 2.0, "dur": 0.7},
                {"midi": 65, "start": 2.7, "dur": 0.5},
                {"midi": 64, "start": 3.2, "dur": 0.5},
                {"midi": 62, "start": 3.7, "dur": 0.5},
                {"midi": 60, "start": 4.2, "dur": 1.0}
            ]
        },
        {
            "id": "scale-major-octave",
            "title": "Full Octave Major Solfeggio",
            "category": "Pitch Accuracy",
            "level": "Menengah",
            "target_vowel": "/a/ (Ah) & /i/ (Ee)",
            "bpm": 96,
            "description": "Melatih presisi intonasi tiap interval semiton dari Do rendah hingga Do tinggi tanpa deviasi cents.",
            "notes": [
                {"midi": 60, "start": 0.0, "dur": 0.6},
                {"midi": 62, "start": 0.6, "dur": 0.6},
                {"midi": 64, "start": 1.2, "dur": 0.6},
                {"midi": 65, "start": 1.8, "dur": 0.6},
                {"midi": 67, "start": 2.4, "dur": 0.6},
                {"midi": 69, "start": 3.0, "dur": 0.6},
                {"midi": 71, "start": 3.6, "dur": 0.6},
                {"midi": 72, "start": 4.2, "dur": 1.2},
                {"midi": 71, "start": 5.4, "dur": 0.5},
                {"midi": 69, "start": 5.9, "dur": 0.5},
                {"midi": 67, "start": 6.4, "dur": 0.5},
                {"midi": 65, "start": 6.9, "dur": 0.5},
                {"midi": 64, "start": 7.4, "dur": 0.5},
                {"midi": 62, "start": 7.9, "dur": 0.5},
                {"midi": 60, "start": 8.4, "dur": 1.2}
            ]
        },
        {
            "id": "arpeggio-triad",
            "title": "Major Triad Arpeggio (Do-Mi-Sol-Do)",
            "category": "Pitch Agility",
            "level": "Menengah",
            "target_vowel": "/o/ (Oh) / /u/ (Oo)",
            "bpm": 105,
            "description": "Lompatan interval ketiga dan kelima mayor untuk kelenturan pita suara dan presisi attack nada.",
            "notes": [
                {"midi": 60, "start": 0.0, "dur": 0.5},
                {"midi": 64, "start": 0.5, "dur": 0.5},
                {"midi": 67, "start": 1.0, "dur": 0.5},
                {"midi": 72, "start": 1.5, "dur": 1.0},
                {"midi": 67, "start": 2.5, "dur": 0.5},
                {"midi": 64, "start": 3.0, "dur": 0.5},
                {"midi": 60, "start": 3.5, "dur": 1.0}
            ]
        },
        {
            "id": "passaggio-register-blend",
            "title": "Passaggio Register Shift (Primo to Secondo)",
            "category": "Register Transition",
            "level": "Lanjutan",
            "target_vowel": "/u/ -> /o/ -> /a/",
            "bpm": 80,
            "description": "Latihan transisi halus dari suara dada (chest voice) menembus jembatan vokal menuju mix/head voice.",
            "notes": [
                {"midi": 64, "start": 0.0, "dur": 0.8},
                {"midi": 65, "start": 0.8, "dur": 0.8},
                {"midi": 67, "start": 1.6, "dur": 0.8},
                {"midi": 69, "start": 2.4, "dur": 0.8},
                {"midi": 71, "start": 3.2, "dur": 1.2},
                {"midi": 69, "start": 4.4, "dur": 0.7},
                {"midi": 67, "start": 5.1, "dur": 0.7},
                {"midi": 65, "start": 5.8, "dur": 0.7},
                {"midi": 64, "start": 6.5, "dur": 1.2}
            ]
        },
        {
            "id": "sustain-vibrato-stability",
            "title": "Long Note Sustain & Natural Vibrato",
            "category": "Breath & Vibrato",
            "level": "Semua Level",
            "target_vowel": "/a/ (Ah Open Throat)",
            "bpm": 60,
            "description": "Menahan nada stabil minimal 4 detik tanpa pitch drift, disusul osilasi vibrato natural 5-7 Hz.",
            "notes": [
                {"midi": 65, "start": 0.0, "dur": 4.5}
            ]
        }
    ]
    cursor = conn.cursor()
    for ex in exercises:
        cursor.execute("""
        INSERT OR REPLACE INTO exercises (id, title, category, level, target_vowel, bpm, description, notes_json)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            ex["id"], ex["title"], ex["category"], ex["level"],
            ex["target_vowel"], ex["bpm"], ex["description"], json.dumps(ex["notes"])
        ))
    conn.commit()

def hash_pw(pw: str) -> str:
    # ponytail: SHA-256 for local zero-dependency database; upgrade to bcrypt when multi-user auth deployed.
    return hashlib.sha256(pw.encode()).hexdigest()