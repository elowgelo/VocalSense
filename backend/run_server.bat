@echo off
title VocalSense AI - Audio Engine Backend

echo ====================================================
echo   VocalSense AI - Menjalankan Backend Engine
echo ====================================================

cd /d "%~dp0"

if exist ".venv\Scripts\python.exe" (
    echo Menjalankan server menggunakan virtual environment .venv...
    ".venv\Scripts\python.exe" -m uvicorn app:app --host 0.0.0.0 --port 8001 --reload
    goto finish
)

where uv >nul 2>&1
if %errorlevel% equ 0 (
    echo Menjalankan server menggunakan uv...
    uv run --project . python -m uvicorn app:app --host 0.0.0.0 --port 8001 --reload
    goto finish
)

if exist "%LOCALAPPDATA%\Programs\OpenHands Agent Canvas\resources\bin\uv.exe" (
    echo Menjalankan server menggunakan uv dari OpenHands...
    "%LOCALAPPDATA%\Programs\OpenHands Agent Canvas\resources\bin\uv.exe" run --project . python -m uvicorn app:app --host 0.0.0.0 --port 8001 --reload
    goto finish
)

where python >nul 2>&1
if %errorlevel% equ 0 (
    echo Menjalankan server menggunakan python sistem...
    python -m uvicorn app:app --host 0.0.0.0 --port 8001 --reload
    goto finish
)

echo [ERROR] Tidak ditemukan Python atau uv di komputer Anda.
pause
exit /b 1

:finish
pause