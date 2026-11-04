# VocalSense AI — AI-Powered Singing & Vocal Trainer Platform

> Platform latihan vokal interaktif berbasis **Vue.js 3 + Vite** yang mengevaluasi intonasi bernyanyi secara presisi langsung di peramban web (*in-browser real-time DSP*) menggunakan Web Audio API dan algoritma pelacakan nada YIN.

[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Status UTS](https://img.shields.io/badge/Status%20UTS-58.3%25%20Completed-success)](#laporan-audit-kepatuhan-fitur-uts)
[![Pull Request](https://img.shields.io/badge/PR-%231%20UTS%2050%25-blue)](https://github.com/elowgelo/VocalSense/pull/1)

---

## Laporan Audit Kepatuhan Fitur UTS

* **Target Minimum Kelulusan UTS:** 12 Fitur (50.0%)
* **Realisasi Fitur Selesai Penuh:** **14 Fitur (58.3%)**
* **Fitur Selesai Sebagian (Parsial):** **2 Fitur (8.3%)**
* **Fitur Tahap Lanjutan Pasca-UTS:** 8 Fitur (33.3%)
* **Status Evaluasi:** **MEMENUHI (>50%) & SELARAS DENGAN SRS, SDD, DAN DIAGRAM ALUR**

---

### 1. Matriks 24 Kebutuhan Fungsional (SRS Compliance)

| No | Kode FR | Nama Kebutuhan Fungsional | Status | Implementasi Sumber Kode |
| :---: | :---: | :--- | :---: | :--- |
| 1 | **FR-001** | Registrasi Akun Pengguna | **SELESAI** | `src/views/RegisterView.vue` (Form nama, email, password, simpan sesi `vs_user`) |
| 2 | **FR-002** | Autentikasi Pengguna & JWT Sesi | **SELESAI** | `src/views/LoginView.vue` (Validasi login, status navbar, proteksi rute) |
| 3 | **FR-003** | Single Sign-On Google OAuth | *Pasca-UTS* | Mockup UI di `LoginView.vue` (integrasi OAuth live tahap akhir) |
| 4 | **FR-004** | Pemulihan & Reset Kata Sandi | *Pasca-UTS* | Alur pengiriman email token SMTP direncanakan pasca-UTS |
| 5 | **FR-005** | Pengelolaan Profil Vokal | **SELESAI** | `src/views/ProfileView.vue` (Biometrik nada, Tessitura, preferensi) |
| 6 | **FR-006** | Chromatic Tuner & Noise Gate | **SELESAI** | `src/views/TunerView.vue` (Jarum meter deviasi $\pm 50$ Cents, noise gate slider) |
| 7 | **FR-007** | Tes Jangkauan Vokal (Range Finder) | **SELESAI** | `src/views/RangeFinderView.vue` (Pendeteksian Min/Max F0, klasifikasi Fach vokal) |
| 8 | **FR-008** | Perekaman & Live Piano Roll DAW | **SELESAI** | `src/views/StudioView.vue` (Web Audio API, live pitch curve 60 FPS, balok MIDI C2–C6) |
| 9 | **FR-009** | Pengunggahan Berkas Audio Vokal | **SELESAI** | `src/views/StudioView.vue` (`handleAudioFileUpload`, ekstraksi frame audio 50ms) |
| 10 | **FR-010** | Pemutaran Ulang Audio Rekaman | **SELESAI** | `src/views/StudioView.vue` (`togglePlayback`, `playAudioFromTime`, playhead scrubber) |
| 11 | **FR-011** | Analisis Suara AI / DSP Engine | **SELESAI** | `src/utils/pitch.js` (Ekstraksi F0 YIN, cents, vibrato 5–7 Hz, 3-band resonansi) |
| 12 | **FR-012** | Rapor Bernyanyi & Radar Chart | **SELESAI** | `src/views/ReportView.vue`, `StudioView.vue` (Radar Chart 5 dimensi, skor 0–100) |
| 13 | **FR-013** | Note-Sync Playback Nada Fals | **SELESAI** | `src/views/ReportView.vue`, `StudioView.vue` (Tabel nada fals sinkron ke pemutar audio) |
| 14 | **FR-014** | Penyimpanan Rapor Bernyanyi | **SELESAI** | Penyimpanan persisten lokal `vs_reports` di browser |
| 15 | **FR-015** | Ekspor Rapor & Sertifikat PDF | **SELESAI** | `src/views/ReportView.vue` (`handlePrint`, `@media print` lembar resmi) |
| 16 | **FR-016** | Komparasi Sesi Side-by-Side | *Pasca-UTS* | Direncanakan pada modul Comparison View |
| 17 | **FR-017** | Manajemen Arsip Vokal | **PARSIAL** | `src/views/AnalyticsView.vue` (Daftar sesi latihan, telemetri, take cards) |
| 18 | **FR-018** | Dasbor Progres Perluasan Vokal | **SELESAI** | `src/views/AnalyticsView.vue` (Kurva tren akurasi Chart.js, tessitura range) |
| 19 | **FR-019** | Pelacak Streak & Gamifikasi | **PARSIAL** | Poin performa vokal (`+pts`), streak harian visual |
| 20 | **FR-020** | Kurikulum Latihan Personal AI | *Pasca-UTS* | Prompt engine LLM Gemini dijadwalkan pasca-UTS; saran lokal aktif |
| 21 | **FR-021** | Latihan Tangga Nada & Solfeggio | **SELESAI** | `src/views/StudioView.vue`, `src/components/ExerciseCatalogModal.vue` |
| 22 | **FR-022** | Katalog Paket & Tier Switcher | **SELESAI** | `src/views/HomeView.vue`, durasi rekam berjenjang di `StudioView.vue` |
| 23 | **FR-023** | Riwayat Tagihan Midtrans | *Pasca-UTS* | Webhook payment gateway produksi dijadwalkan pasca-UTS |
| 24 | **FR-024** | Konsol Admin & Monitoring | *Pasca-UTS* | Direncanakan pada sprint penutup proyek |

---

### 2. Keselarasan Terhadap Dokumen Perancangan (SDD & Diagram Alur)

* **Arsitektur Multi-Tier & Pemrosesan Zero-Latency (SDD 3.1)**:  
  Seluruh ekstraksi nada dan visualisasi piano roll diproses langsung di peramban klien melalui Web Audio API (`AudioContext` dan `AnalyserNode`). Tidak ada rekaman audio mentah yang harus dikirim ke server luar, menjaga privasi pengguna dan mencapai latensi sub-50ms (memenuhi NFR 4.1).
* **Aliran Data (DFD Level 0 s/d Level 2)**:  
  - *Proses 1.0 (Akun)*: Registrasi dan login tersimpan dalam state aplikasi.
  - *Proses 2.0 (Audio Ingest)*: Tangkapan mikrofon real-time disaring noise gate.
  - *Proses 3.0 (Analisis DSP)*: Menghitung $F_0$, deviasi sen, vibrato, dan resonansi suara.
  - *Proses 4.0 (Rapor)*: Skor 5 dimensi ditampilkan dalam radar chart dan dicetak ke PDF resmi.
  - *Proses 5.0 (Progres)*: Riwayat sesi diakumulasikan ke grafik tren analitik.
* **Diagram Alur (Activity Diagram & Sequence Diagram 01–24)**:  
  Alur pengguna di setiap halaman (`Studio`, `Tuner`, `Range Finder`, `Report`, `Analytics`) bekerja 1:1 persis dengan tahapan yang dimodelkan pada diagram aktivitas dan diagram sekuens.

---

## Arsitektur & Teknologi
- **Frontend Framework**: Vue.js 3 (Composition API / `<script setup>`), Vue Router 4, Vite 6.
- **Tipografi & Desain**: Plus Jakarta Sans, JetBrains Mono, Inter, dan Studio Pro Dark Theme CSS.
- **Pemrosesan Audio**: Web Audio API (in-browser processing), AnalyserNode FFT, algoritma McLeod Pitch Method / Normalized Square Difference Function (NSDF), dan median filter.
- **Visualisasi Data**: HTML5 Canvas API (Piano Roll & Spektogram) dan Chart.js 4 (Radar Chart).

---

## Panduan Menjalankan Proyek Vue.js

### Prasyarat
- Node.js versi 18 atau lebih baru.
- Mikrofon aktif dengan izin akses pada peramban.

### Menjalankan Mode Pengembangan
1. Masuk ke direktori aplikasi:
   ```bash
   cd app
   ```
2. Pasang dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
4. Buka peramban pada alamat `http://localhost:5173`.

### Membangun Versi Produksi
```bash
npm run build
npm run preview
```

---

## Struktur Berkas
```text
app/
├── index.html                 # Entry point Vite SPA
├── package.json               # Dependensi Vue 3, Vue Router, Chart.js, Vite
├── vite.config.js             # Konfigurasi build dan proxy backend
├── src/
│   ├── main.js                # Inisialisasi Vue App & Router
│   ├── App.vue                # Root layout antarmuka
│   ├── assets/
│   │   └── style.css          # Desain antarmuka Studio Pro Dark Theme
│   ├── components/
│   │   ├── Navbar.vue         # Navigasi utama dan status akun
│   │   └── Footer.vue         # Informasi lisensi dan tautan
│   ├── router/
│   │   └── index.js           # Vue Router konfigurasi rute SPA
│   ├── utils/
│   │   └── pitch.js           # ES Module engine pendeteksi nada & akustik vokal
│   └── views/
│       ├── HomeView.vue       # Beranda dan katalog paket langganan (FR-022)
│       ├── TunerView.vue      # Chromatic Tuner digital (FR-006)
│       ├── RangeFinderView.vue# Pengujian jangkauan vokal (FR-007)
│       ├── StudioView.vue     # Studio DAW, Piano Roll, Audio Upload, & Rapor (FR-008, FR-009, FR-010, FR-012, FR-015, FR-021)
│       ├── LoginView.vue      # Autentikasi pengguna (FR-002)
│       └── RegisterView.vue   # Registrasi pengguna (FR-001)
└── legacy_prototype/          # Arsip cadangan kode prototype statis awal
```
---
## Lisensi
Proyek ini dikembangkan untuk keperluan akademik mata kuliah Rekayasa Perangkat Lunak / Implementasi Perancangan Perangkat Lunak.
