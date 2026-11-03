# VocalSense AI — Backend Audio Engine

Layanan backend mikro (*microservice*) untuk pemisahan vokal (*vocal stem isolation*) dan instrumen karaoke (*accompaniment minus-one*) berbasis FastAPI dan FFmpeg Audio DSP.

## Kebutuhan Sistem
- Python 3.11+ atau `uv`
- `ffmpeg` terpasang di sistem PATH

## Cara Menjalankan

### Menggunakan `uv` (Direkomendasikan)
```bash
cd backend
uv run uvicorn app:app --port 8001 --reload
```
Atau cukup klik dua kali berkas `run_server.bat` di Windows.

## Endpoint REST API

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/health` | Cek status kesehatan backend & kesiapan FFmpeg |
| `POST` | `/api/audio/separate-stems` | Mengunggah file lagu, menghasilkan 2 stem: `vocals.wav` dan `accompaniment.wav` |
| `GET` | `/api/audio/stream/{job_id}/{stem}` | Mengalirkan berkas audio stem hasil pemisahan |