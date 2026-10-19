# VocalSense AI
Platform latihan vokal cerdas berbasis web responsif untuk evaluasi nada bernyanyi presisi tinggi langsung di peramban web (*in-browser processing*) menggunakan Web Audio API tanpa ketergantungan server.
---
## Fitur Utama
- **Chromatic Tuner**: Pendeteksian nada dasar secara real-time dengan jarum meter deviasi cents dan kontrol ambang batas kebisingan lingkungan (*noise gate*).
- **Vocal Range Finder**: Pengujian rentang nada terendah (*Lowest Note*) hingga tertinggi (*Highest Note*) pada tuts piano interaktif beserta klasifikasi tipe suara otomatis (Bass, Bariton, Tenor, Contralto, Mezzo-Sopran, Sopran).
- **DAW-Style Piano Roll Studio**: Studio bernyanyi interaktif dengan jendela geser 10 detik, notasi balok solid MIDI, panduan melodi Do-Re-Mi / arpeggio, dan audio synth piano bawaan.
- **AI Vocal & Resonance Analytics**: Ekstraksi parameter akustik mencakup deteksi notasi musik, deviasi cents, status nada (*In-Tune*, *Flat*, *Sharp*), osilasi vibrato 5-7 Hz, dan analisis distribusi energi resonansi 3 pita suara (Chest, Mask/Mixed, Head Voice).
- **Rapor Bernyanyi 5 Dimensi**: Visualisasi radar chart performa bernyanyi, kartu skor keseluruhan (0-100), dan rekomendasi latihan vokal.
- **Ekspor Rapor PDF**: Fitur cetak dokumen evaluasi vokal siap arsip menggunakan stylesheet `@media print`.
- **Manajemen Akun & Model Freemium**: Halaman autentikasi pengguna dan katalog perbandingan tier (Free, Pro, Premium).
---
## Arsitektur & Teknologi
- **Antarmuka**: HTML5, CSS3 kustom (Studio Pro Dark Theme), vanilla JavaScript.
- **Tipografi**: Plus Jakarta Sans dan JetBrains Mono.
- **Pemrosesan Audio**: Web Audio API (in-browser processing), AnalyserNode FFT, algoritma McLeod Pitch Method / Normalized Square Difference Function (NSDF), dan median filter 7-sample untuk stabilisasi nada.
- **Visualisasi Data**: HTML5 Canvas API (Piano Roll) dan Chart.js (Radar Chart).
---
## Panduan Menjalankan
Aplikasi berjalan sepenuhnya pada sisi klien (*client-side*).
### Prasyarat
- Peramban web modern (Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari).
- Mikrofon aktif dengan izin akses pada peramban.
### Menjalankan secara Lokal
1. Clone repositori:
   ```bash
   git clone https://github.com/elowgelo/VocalSense.git
   cd VocalSense
   ```
2. Jalankan server lokal:
   Menggunakan Python:
   ```bash
   python -m http.server 8000
   ```
   Atau menggunakan Node.js:
   ```bash
   npx serve .
   ```
3. Buka peramban pada alamat `http://localhost:8000`.
Aplikasi juga dapat dibuka langsung melalui berkas `index.html` pada peramban.
---
## Struktur Berkas
```text
VocalSense/
Ôö£ÔöÇÔöÇ index.html              # Halaman beranda dan katalog paket
Ôö£ÔöÇÔöÇ README.md               # Dokumentasi proyek
Ôö£ÔöÇÔöÇ css/
Ôöé   ÔööÔöÇÔöÇ style.css           # Desain antarmuka Studio Pro
Ôö£ÔöÇÔöÇ js/
Ôöé   ÔööÔöÇÔöÇ pitch.js            # Engine pendeteksi nada dan teori musik
ÔööÔöÇÔöÇ pages/
    Ôö£ÔöÇÔöÇ login.html          # Halaman autentikasi pengguna
    Ôö£ÔöÇÔöÇ range-finder.html   # Pengujian jangkauan vokal
    Ôö£ÔöÇÔöÇ register.html       # Pendaftaran pengguna baru
    Ôö£ÔöÇÔöÇ studio.html         # Studio vokal, piano roll, dan rapor evaluasi
    ÔööÔöÇÔöÇ tuner.html          # Tuner kromatik digital
```
---
## Lisensi
Proyek ini dikembangkan untuk keperluan akademik mata kuliah Rekayasa Perangkat Lunak / Implementasi Perancangan Perangkat Lunak.
