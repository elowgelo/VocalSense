# VocalSense AI (Vue.js 3 Edition)
Platform latihan vokal cerdas berbasis Single Page Application (SPA) responsif dengan framework **Vue.js 3 + Vite** untuk evaluasi nada bernyanyi presisi tinggi langsung di peramban web (*in-browser local processing*) menggunakan Web Audio API.

---

## Capaian Progress: 50.0% (12 dari 24 Fitur SRS Terpenuhi)
Sistem telah ditingkatkan dari prototype statis ke arsitektur framework modern **Vue.js 3**, serta mengintegrasikan fitur ke-12 (**FR-009: Pengunggahan Berkas Audio Bernyanyi**).

### Fitur Utama yang Telah Selesai
1. **FR-001 [Registrasi Akun Pengguna]**: Registrasi akun penyanyi dan penentuan paket awal (`src/views/RegisterView.vue`).
2. **FR-002 [Autentikasi Pengguna & JWT Sesi]**: Manajemen sesi login pengguna dan demo OAuth (`src/views/LoginView.vue`).
3. **FR-006 [Chromatic Tuner & Kalibrasi Noise]**: Pendeteksi nada kromatik real-time dengan jarum meter deviasi cents dan ambient noise gate (`src/views/TunerView.vue`).
4. **FR-007 [Vocal Range Finder]**: Pengujian nada terendah (*Lowest Note*) hingga tertinggi (*Highest Note*) pada tuts piano interaktif beserta klasifikasi tipe vokal otomatis (`src/views/RangeFinderView.vue`).
5. **FR-008 [Perekaman Bernyanyi & Live Piano Roll]**: Studio DAW interaktif dengan jendela geser 10 detik, notasi balok solid MIDI, dan garis kurva nada real-time (`src/views/StudioView.vue`).
6. **FR-009 [Pengunggahan Berkas Audio Bernyanyi - NEW]**: Fasilitas upload file vokal rekaman eksternal (WAV/MP3/M4A) untuk didekode dan dianalisis nadanya pada Piano Roll (`src/views/StudioView.vue`).
7. **FR-010 [Pemutaran Ulang Audio Rekaman]**: Pemutar instan audio buffer hasil rekaman bernyanyi langsung di peramban (`src/views/StudioView.vue`).
8. **FR-011 [AI Pitch & Acoustic Resonance Engine]**: Ekstraksi parameter akustik mencakup deteksi notasi musik, deviasi cents, osilasi vibrato 5-7 Hz, dan analisis 3 pita resonansi vokal (`src/utils/pitch.js`).
9. **FR-012 [Rapor Bernyanyi 5 Dimensi & Saran AI]**: Kartu skor keseluruhan (0-100), visualisasi Radar Chart 5 dimensi vokal, dan rekomendasi latihan personal (`src/views/StudioView.vue`).
10. **FR-015 [Ekspor / Cetak Rapor Format PDF]**: Fitur cetak dokumen evaluasi vokal siap arsip menggunakan `@media print` (`src/views/StudioView.vue`).
11. **FR-021 [Latihan Tangga Nada & Solfeggio Terpandu]**: Balok melodi panduan Do-Re-Mi dan synthesizer audio piano bawaan (`src/views/StudioView.vue`).
12. **FR-022 [Katalog Paket & Tier Switcher]**: Katalog komparasi paket layanan (Free, Pro, Premium) dan simulasi tier akun (`src/views/HomeView.vue`).

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
