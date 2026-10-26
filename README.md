# VocalSense AI (React Edition)
Platform latihan vokal cerdas berbasis web responsif untuk evaluasi nada bernyanyi presisi tinggi langsung di peramban web (*in-browser processing*) menggunakan Web Audio API tanpa ketergantungan server.
Proyek ini telah dimigrasikan secara matang ke framework modern **React 18 + TypeScript + Vite** dengan arsitektur komponen modular, custom hooks terisolasi untuk Web Audio, SPA routing (`react-router-dom`), dan sistem evaluasi 5-dimensi berbasis Chart.js.
---
## Fitur Utama
- **Chromatic Tuner**: Pendeteksian nada dasar secara real-time dengan jarum meter deviasi cents, arc gauge digital, riwayat nada 10 detik, dan kontrol ambang batas kebisingan lingkungan (*noise gate*).
- **Vocal Range Finder**: Pengujian rentang nada terendah (*Lowest Note*) hingga tertinggi (*Highest Note*) pada tuts piano interaktif, pemutaran audio synth nada contoh, beserta klasifikasi tipe suara otomatis (Bass, Bariton, Tenor, Alto, Mezzo-Sopran, Sopran).
- **DAW-Style Piano Roll Studio**: Studio bernyanyi interaktif dengan jendela geser 10 detik, kursor target statis gaya Smule (32% width), notasi balok solid MIDI adaptif, panduan melodi Do-Re-Mi / arpeggio, pemutar melodi audio synth bawaan, dan mode simulasi vokal (*demo mode*).
- **AI Vocal & Resonance Analytics**: Ekstraksi parameter akustik mencakup deteksi notasi musik, deviasi cents, status nada (*In-Tune*, *Flat*, *Sharp*), osilasi vibrato 5ิว๔7 Hz, dan analisis distribusi energi resonansi 3 pita suara (Chest, Mask/Mixed, Head Voice) via FFT Analyser.
- **Rapor Bernyanyi 5 Dimensi**: Visualisasi radar chart performa bernyanyi (Akurasi Nada, Kestabilan Suara, Kontrol Napas, Getaran Vibrato, Resonansi Mask), kartu skor keseluruhan (0ิว๔100) berpredikat (A/B/C/D), ringkasan chip nada, dan rekomendasi latihan vokal terpersonalisasi.
- **Ekspor Rapor PDF**: Fitur cetak dokumen evaluasi vokal siap arsip menggunakan stylesheet `@media print`.
- **Manajemen Akun & Model Freemium**: Halaman autentikasi pengguna (Login, Register, Simulasi Google OAuth) dan kontrol durasi rekaman berdasarkan tier (Free: 60s, Pro: 300s, Premium: 900s).
---
## Arsitektur & Teknologi
- **Framework**: React 18, TypeScript, Vite
- **Routing**: `react-router-dom` (SPA Client-side routing)
- **Desain & Ikon**: Studio Pro Dark/Light Theme kustom, Lucide React icons
- **Tipografi**: Plus Jakarta Sans dan JetBrains Mono
- **Pemrosesan Audio**: Web Audio API (in-browser processing), AnalyserNode FFT, algoritma McLeod Pitch Method / Normalized Square Difference Function (NSDF), dan median filter 7-sample untuk stabilisasi nada
- **Visualisasi Data**: HTML5 Canvas API (Spectrum, Piano Roll, Waveform) dan Chart.js (5D Radar Chart)
- **Audio Synthesizer**: Web Audio OscillatorNode synthesizer untuk pemutaran melodi panduan piano dan nada referensi
---
## Struktur Berkas
```text
VocalSense/
ิ๖ฃิ๖วิ๖ว src/
ิ๖้   ิ๖ฃิ๖วิ๖ว components/
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว common/             # Komponen UI bersama
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว layout/             # Navbar, Footer, Layout wrapper
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว range-finder/       # PianoRangeBar, VoiceTypeTable
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว studio/             # SpectrumCanvas, PianoRollCanvas, WaveformCanvas, TelemetrySidebar, SingingReport, ImportSongModal
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว tuner/              # ArcGauge, NeedleMeter, PitchHistoryCanvas
ิ๖้   ิ๖ฃิ๖วิ๖ว context/
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว AuthContext.tsx     # Context autentikasi, sesi, dan tier freemium
ิ๖้   ิ๖ฃิ๖วิ๖ว hooks/
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว useAudioContext.ts  # Inisialisasi AudioContext & MediaStream mikrofon
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว usePianoSynth.ts    # Web Audio synthesizer melodi piano
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว usePitchDetection.ts# Real-time pitch tracking NSDF & median filter
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว useVoiceRecorder.ts # MediaRecorder audio buffer & waveform extraction
ิ๖้   ิ๖ฃิ๖วิ๖ว pages/
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว HomePage.tsx        # Halaman beranda & katalog paket langganan
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว LoginPage.tsx       # Halaman autentikasi masuk
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว RangeFinderPage.tsx # Pengujian jangkauan vokal interaktif
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว RegisterPage.tsx    # Pendaftaran pengguna baru & pemilihan tier
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว StudioPage.tsx      # DAW studio piano roll & evaluasi rapor vokal
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว TunerPage.tsx       # Tuner kromatik digital real-time
ิ๖้   ิ๖ฃิ๖วิ๖ว styles/
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว index.css           # Desain antarmuka Studio Pro & @media print
ิ๖้   ิ๖ฃิ๖วิ๖ว types/
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว index.ts            # Type definitions TypeScript
ิ๖้   ิ๖ฃิ๖วิ๖ว utils/
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว audioExport.ts      # Konversi WAV blob & ekstraksi nada audio buffer
ิ๖้   ิ๖้   ิ๖ฃิ๖วิ๖ว exercisePresets.ts  # Presets melodi Do-Re-Mi, arpeggio, dan transposisi
ิ๖้   ิ๖้   ิ๖๖ิ๖วิ๖ว pitch.ts            # Algoritma McLeod Pitch Method (NSDF) & teori musik
ิ๖้   ิ๖ฃิ๖วิ๖ว App.tsx                 # Route declarations & context wrapper
ิ๖้   ิ๖๖ิ๖วิ๖ว main.tsx                # Entry point aplikasi React
ิ๖ฃิ๖วิ๖ว prototype-vanilla/          # Prototipe asli (HTML/CSS/JS) diarsipkan lengkap
ิ๖ฃิ๖วิ๖ว index.html                  # HTML entry point Vite
ิ๖ฃิ๖วิ๖ว package.json                # Dependencies & script commands
ิ๖ฃิ๖วิ๖ว tsconfig.json               # Konfigurasi TypeScript
ิ๖ฃิ๖วิ๖ว vite.config.ts              # Konfigurasi Vite build & dev server
ิ๖๖ิ๖วิ๖ว README.md
```
---
## Panduan Menjalankan
Aplikasi berjalan sepenuhnya pada sisi klien (*client-side*).
### Prasyarat
- Node.js (v18 ke atas) dan npm / pnpm / yarn.
- Peramban web modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
- Mikrofon aktif dengan izin akses pada peramban.
### Menjalankan secara Lokal
1. Masuk ke direktori proyek:
   ```bash
   cd VocalSense
   ```
2. Pasang dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Vite:
   ```bash
   npm run dev
   ```
4. Buka alamat yang ditampilkan di terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).
### Membangun untuk Produksi
```bash
npm run build
```
Hasil kompilasi produksi siap rilis akan disimpan di dalam direktori `dist/`.
---
## Lisensi
Proyek ini dikembangkan untuk keperluan akademik mata kuliah Rekayasa Perangkat Lunak / Implementasi Perancangan Perangkat Lunak.
