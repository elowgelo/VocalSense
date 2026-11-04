# Laporan Audit Kepatuhan Fitur & Arsitektur: VocalSense AI
**Proyek:** VocalSense AI (AI-Powered Singing & Vocal Trainer Platform)  
**Mahasiswa:** Rafael Hotdion L.T (NIM: 11241075)  
**Mata Kuliah:** Implementasi Perancangan Perangkat Lunak (IPPL)  
**Tanggal Audit:** 4 November 2026  
**Status Kelulusan Progress UTS:** **MEMENUHI (>50%) — 58.3% (14 dari 24 Fitur SRS Tuntas)**

---

## 1. Ringkasan Eksekutif Hasil Audit

Audit ini mengevaluasi kesesuaian implementasi teknis aplikasi web **VocalSense AI** terhadap 3 dokumen perancangan utama:
1. **Software Requirements Specification (SRS)**: 24 Functional Requirements.
2. **Software Design Document (SDD)**: Arsitektur Multi-Tier, Data Flow Diagram (DFD Level 0–2), dan Kamus Data Relasional.
3. **Diagram Alur Kerja Fitur**: 24 Activity Diagrams (`AD-01` s/d `AD-24`) & 24 Sequence Diagrams (`SD-01` s/d `SD-24`).

### Hasil Skor Evaluasi
* **Target Progress UTS Minimum:** 12 Fitur (50.0%)
* **Realisasi Fitur Selesai Penuh:** **14 Fitur (58.3%)**
* **Fitur Selesai Sebagian (Parsial):** **2 Fitur (8.3%)**
* **Fitur Tahap Lanjutan Pasca-UTS:** 8 Fitur (33.3%)
* **Kesimpulan:** Aplikasi dinyatakan **lolos melampaui batas ambang 50%**, dengan fondasi pemrosesan sinyal digital (*Digital Signal Processing / Web Audio API*) dan visualisasi DAW Piano Roll yang bekerja tanpa kendala.

---

## 2. Matriks Pemenuhan 24 Kebutuhan Fungsional (SRS)

| No | Kode FR | Nama Kebutuhan Fungsional | Status Audit | Komponen / Modul Sumber Kode |
| :---: | :---: | :--- | :---: | :--- |
| 1 | **FR-001** | Registrasi Akun Pengguna | **SELESAI** | `app/src/views/RegisterView.vue`, `backend/app.py` (`POST /api/auth/register`) |
| 2 | **FR-002** | Autentikasi Pengguna & JWT | **SELESAI** | `app/src/views/LoginView.vue`, `backend/app.py` (`POST /api/auth/login`) |
| 3 | **FR-003** | Single Sign-On Google OAuth | *Pasca-UTS* | Mockup UI di `LoginView.vue` (integrasi OAuth live tahap akhir) |
| 4 | **FR-004** | Pemulihan & Reset Kata Sandi | *Pasca-UTS* | Alur pengiriman email token SMTP direncanakan pasca-UTS |
| 5 | **FR-005** | Pengelolaan Profil Vokal | **SELESAI** | `app/src/views/ProfileView.vue` (Biometrik nada, Tessitura, preferensi) |
| 6 | **FR-006** | Chromatic Tuner & Noise Gate | **SELESAI** | `app/src/views/TunerView.vue` (Jarum meter deviasi $\pm 50$ Cents, noise threshold) |
| 7 | **FR-007** | Tes Jangkauan Vokal (Range Finder) | **SELESAI** | `app/src/views/RangeFinderView.vue` (Pendeteksian Min/Max F0, klasifikasi Fach vokal) |
| 8 | **FR-008** | Perekaman & Live Piano Roll | **SELESAI** | `app/src/views/StudioView.vue` (Web Audio API, live pitch curve, balok MIDI C2–C6) |
| 9 | **FR-009** | Pengunggahan Berkas Audio Vokal | **SELESAI** | `app/src/views/StudioView.vue` (`handleAudioFileUpload`, ekstraksi frame audio 50ms) |
| 10 | **FR-010** | Pemutaran Ulang Audio Rekaman | **SELESAI** | `app/src/views/StudioView.vue` (`togglePlayback`, `playAudioFromTime`) |
| 11 | **FR-011** | Analisis Suara AI / DSP | **SELESAI** | `app/src/utils/pitch.js` (Ekstraksi F0 YIN, cents, vibrato 5–7 Hz, 3-band resonansi) |
| 12 | **FR-012** | Rapor Bernyanyi & Radar Chart | **SELESAI** | `app/src/views/ReportView.vue`, `StudioView.vue` (Radar Chart 5 dimensi, skor 0–100) |
| 13 | **FR-013** | Note-Sync Playback Nada Fals | **SELESAI** | `StudioView.vue` (Scrubbing timeline), `ReportView.vue` (Tabel lompatan nada) |
| 14 | **FR-014** | Penyimpanan Rapor Bernyanyi | **SELESAI** | `localStorage` + `backend/app.py` (`POST /api/reports`, tabel `reports`) |
| 15 | **FR-015** | Ekspor Rapor & Sertifikat PDF | **SELESAI** | `app/src/views/ReportView.vue` (`handlePrint`, `@media print` lembar resmi) |
| 16 | **FR-016** | Komparasi Sesi Side-by-Side | *Pasca-UTS* | Direncanakan pada modul Comparison View |
| 17 | **FR-017** | Manajemen Arsip Vokal | **PARSIAL** | `app/src/views/AnalyticsView.vue` (Daftar sesi latihan, telemetri, take cards) |
| 18 | **FR-018** | Dasbor Progres Perluasan Vokal | **SELESAI** | `app/src/views/AnalyticsView.vue` (Kurva tren akurasi Chart.js, tessitura range) |
| 19 | **FR-019** | Pelacak Streak & Gamifikasi | **PARSIAL** | Poin performa vokal (`+pts`), streak harian visual |
| 20 | **FR-020** | Kurikulum Latihan Personal AI | *Pasca-UTS* | Prompt engine LLM Gemini dijadwalkan pasca-UTS; saran lokal aktif |
| 21 | **FR-021** | Latihan Tangga Nada & Solfeggio | **SELESAI** | `StudioView.vue`, `ExerciseCatalogModal.vue`, synthesizer panduan piano bawaan |
| 22 | **FR-022** | Katalog Paket & Tier Switcher | **SELESAI** | `app/src/views/HomeView.vue`, logika durasi rekam berjenjang di `StudioView.vue` |
| 23 | **FR-023** | Riwayat Tagihan Midtrans | *Pasca-UTS* | Webhook payment gateway produksi dijadwalkan pasca-UTS |
| 24 | **FR-024** | Konsol Admin & Monitoring | *Pasca-UTS* | Direncanakan pada sprint penutup proyek |

---

## 3. Evaluasi Keselarasan dengan Software Design Document (SDD)

### 3.1 Arsitektur Multi-Tier & Pemrosesan Zero-Latency
* **Frontend Web Audio Layer**: Menggunakan Vue 3 + Vite dengan routing modular. Audio diproses langsung di peramban pengguna melalui `AudioContext` dan `AnalyserNode`, menjamin privasi rekaman dan meniadakan latensi unggah (NFR 4.1 & NFR 4.2).
* **Backend API Layer**: Menggunakan FastAPI Python di `backend/app.py` dengan model database relasional SQLite `vocalsense.db`.
* **Kesesuaian Kamus Data**:
  * Tabel `users`: Menyimpan kredensial ber-hash, tier pengguna, serta karakteristik vokal (`voice_type`, `vocal_range_low`, `vocal_range_high`).
  * Tabel `reports`: Menyimpan metrik evaluasi lengkap (`overall_score`, `pitch_accuracy`, `vibrato_rate`, `resonance_json`, `detected_notes_json`).
  * Tabel `exercises`: Menyimpan koleksi tangga nada panduan (*Do-Re-Mi*) dalam format JSON MIDI sequence.

### 3.2 Aliran Data (DFD Level 0 & Level 1)
* **Proses 1.0 (Akun & Autentikasi)**: Input form login/registrasi tersinkronisasi ke backend DB.
* **Proses 2.0 (Kalibrasi & Perekaman Vokal)**: Aliran sinyal mikrofon ditangkap real-time pada 60 FPS.
* **Proses 3.0 (Analisis Suara Bernyanyi DSP)**: Algoritma YIN mengekstrak $F_0$, deviasi Cents, dan klasifikasi nada *In-Tune*, *Flat*, atau *Sharp*.
* **Proses 4.0 (Penyimpanan Rapor & Ekspor PDF)**: Berkas cetak PDF diekspor menggunakan standar lembar resmi konservatori musik.
* **Proses 5.0 (Progress Tracking)**: Telemetri diakumulasikan ke grafik tren akurasi di `AnalyticsView.vue`.

---

## 4. Evaluasi Keselarasan dengan Diagram Fitur (Activity & Sequence)

1. **AD/SD-01 & 02 (Registrasi & Login)**: Alur validasi isian $\rightarrow$ hashing password $\rightarrow$ penyimpan akun $\rightarrow$ penerbitan sesi. Selaras.
2. **AD/SD-06 (Tuner & Kalibrasi Mikrofon)**: Stream audio $\rightarrow$ kalkulasi frekuensi dominan $\rightarrow$ hitung selisih cents $\rightarrow$ update rotasi jarum analog. Selaras.
3. **AD/SD-07 (Tes Jangkauan Vokal)**: Pengujian nada terendah & tertinggi stabil $\rightarrow$ konversi ke oktaf $\rightarrow$ pemetaan otomatis kategori suara (*Bass/Tenor/Alto/Soprano*). Selaras.
4. **AD/SD-08 & 09 (Studio Perekaman & Unggah Audio)**: Perekaman live maupun parsing file eksternal (WAV/MP3) didekode ke frame 50ms dan dirender ke tuts piano roll C2–C6. Selaras.
5. **AD/SD-10 & 13 (Playback & Note-Sync Scrubbing)**: Klik atau geser pada kanvas DAW mengarahkan titik putar audio tepat ke detik nada yang diinginkan. Selaras.
6. **AD/SD-11, 12, 15 (Analisis, Rapor, & Cetak PDF)**: Rapor menyajikan Skor Keseluruhan (0–100), Radar Chart 5 dimensi vokal, dan fungsi cetak PDF resmi. Selaras.
7. **AD/SD-20 & 21 (Latihan Tangga Nada & Tier Switcher)**: Pemilihan katalog latihan Solfeggio, playback synthesizer piano panduan, dan simulasi batasan durasi sesuai tier (Free 60s, Pro 300s, Premium 900s). Selaras.

---

## 5. Tautan Proyek & Repositori

* **Repositori GitHub:** [https://github.com/elowgelo/VocalSense](https://github.com/elowgelo/VocalSense)
* **Branch Implementasi UTS:** `feature/uts-50-percent-vue`
* **Pull Request Resmi:** [https://github.com/elowgelo/VocalSense/pull/1](https://github.com/elowgelo/VocalSense/pull/1)