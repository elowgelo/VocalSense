# Laporan Jawaban UTS: Prototype Tugas Besar IPPL
# Proyek: VocalSense AI (AI-Powered Singing & Vocal Trainer Platform)
> **Informasi Mahasiswa & Proyek**
> * Mahasiswa: Rafael Hotdion L.T
> * NIM: 11241075
> * Mata Kuliah: Implementasi Perancangan Perangkat Lunak (IPPL)
> * Judul Tugas Besar: VocalSense AI (AI-Powered Singing & Vocal Trainer Platform)
> * Capaian Progress: **50.0% (12 dari 24 Fitur SRS) — Migrasi Framework Vue.js 3 Selesai**
> * Repositori GitHub: https://github.com/elowgelo/VocalSense.git
> * Tautan Video YouTube: https://youtu.be/contoh-video-uts
---
## 1. Pemenuhan Butir Soal UTS & Lanjutan Progress 50%
- [x] **Butir 1: Mulai mengerjakan prototype tugas besar & migrasi Vue.js**
  Sistem telah berhasil dimigrasikan dari prototype statis ke framework modern **Vue.js 3 + Vite** berbasis Single Page Application (SPA) responsif di direktori `app/` dengan dukungan Web Audio API, Canvas DAW, dan Chart.js.
- [x] **Butir 2: Capaian progress 50% dihitung dari jumlah fitur**
  Dari total 24 Functional Requirements (SRS.md), sebanyak 12 fitur telah selesai diimplementasikan (**50.0%**, tepat sesuai instruksi lanjutan progress dosen).
- [x] **Butir 3: Utamakan fitur esensial**
  Fitur fondasi utama tuntas: Chromatic Tuner, Vocal Range Finder, DAW MIDI Piano Roll, Web Audio Synth Guide, AI Pitch & Resonance Engine, dan Rapor Vokal 5 Dimensi.
- [x] **Butir 4: Batas pengerjaan sampai hari Senin jam 11.59**
  Pengerjaan diselesaikan tepat waktu dan seluruh modul teruji stabil.
- [x] **Butir 5: Progress dikumpulkan melalui GitHub**
  Kode sumber dan aset terkelola rapi pada repositori Git dengan commit log terstruktur.
- [x] **Butir 6: Wajib dipresentasikan dengan membuat video dan diunggah ke YouTube**
  Naskah dan skenario demonstrasi video 3-5 menit telah disusun runut per menit.
- [x] **Butir 7: Kerjakan di mana saja**
  Sistem berbasis *in-browser local processing* tanpa ketergantungan server database lokal, berjalan fleksibel di laptop atau PC mana pun.
---
## 2. Visi Produk & Keunggulan Teknis
> **Visi Platform**
> VocalSense AI adalah platform web cerdas untuk latihan olah vokal mandiri. Terinspirasi dari Voice Gender Analyzer, komputasi audio berjalan langsung di peramban pengguna (*client-side*) untuk menjamin privasi rekaman dan meniadakan latensi transfer data.
### Keunggulan Arsitektur
* **Zero-Latency Audio Engine**: Memanfaatkan Web Audio API peramban dengan algoritma YIN dan Fast Fourier Transform (FFT) untuk pelacakan nada seketika.
* **DAW-Style Piano Roll**: Menggunakan balok notasi MIDI solid ala software Ableton / Logic Pro dengan panduan melodi Do-Re-Mi dan deteksi cents presisi.
* **Analisis Multi-Parameter Vokal**: Mendeteksi $F_0$ (Hz), nada fals (*Flat/Sharp*), kestabilan vibrato 5-7 Hz, dan pembagian resonansi 3 pita (Chest, Mask/Mixed, Head Voice).
---
## 3. Matriks Progress 24 Fitur Kebutuhan (SRS)
* Rumus Perhitungan: **12 Fitur Selesai / 24 Total Fitur SRS = 50.0%** (Target 50% tercapai)
### Tabel Status 24 Kebutuhan Fungsional
| No | Kode FR | Nama Kebutuhan Fungsional | Kategori | Status Implementasi | Halaman / Modul |
| :---: | :---: | :--- | :---: | :--- | :--- |
| 1 | FR-001 | Registrasi Akun Pengguna | Akun | **[SELESAI]** | `src/views/RegisterView.vue` |
| 2 | FR-002 | Autentikasi Pengguna & JWT | Akun | **[SELESAI]** | `src/views/LoginView.vue` |
| 3 | FR-003 | Single Sign-On Google OAuth | Akun | [PASCA-UTS] | `src/views/LoginView.vue` (Mock) |
| 4 | FR-004 | Pemulihan & Reset Kata Sandi | Akun | [PASCA-UTS] | Modul Auth Backend |
| 5 | FR-005 | Pengelolaan Profil Vokal | Profil | [PASCA-UTS] | Modul User Profile |
| 6 | FR-006 | Chromatic Tuner & Kalibrasi Noise | Audio Engine | **[SELESAI]** | `src/views/TunerView.vue` |
| 7 | FR-007 | Tes Jangkauan Vokal (Range Finder) | Audio Engine | **[SELESAI]** | `src/views/RangeFinderView.vue` |
| 8 | FR-008 | Perekaman Bernyanyi & Live Piano Roll | Audio Studio | **[SELESAI]** | `src/views/StudioView.vue` |
| 9 | FR-009 | Pengunggahan Berkas Audio Vokal | Audio Studio | **[SELESAI]** | `src/views/StudioView.vue` |
| 10 | FR-010 | Pemutaran Ulang Audio Rekaman | Audio Studio | **[SELESAI]** | `src/views/StudioView.vue` |
| 11 | FR-011 | Analisis Suara Bernyanyi Berbasis AI | AI Engine | **[SELESAI]** | `src/utils/pitch.js` |
| 12 | FR-012 | Rapor Bernyanyi & Radar Chart | Evaluasi | **[SELESAI]** | `src/views/StudioView.vue` |
| 13 | FR-013 | Pemutaran Audio Terikat Deteksi Fals | Evaluasi | [PASCA-UTS] | Modul Audio Sync |
| 14 | FR-014 | Penyimpanan Cloud Rapor Bernyanyi | Penyimpanan | [PASCA-UTS] | Modul Cloud Storage |
| 15 | FR-015 | Ekspor / Cetak Rapor Format PDF | Output | **[SELESAI]** | `src/views/StudioView.vue` |
| 16 | FR-016 | Komparasi Sesi Rekaman Side-by-Side | Analisis | [PASCA-UTS] | Modul Comparison View |
| 17 | FR-017 | Pengelolaan & Penghapusan Arsip Vokal | Penyimpanan | [PASCA-UTS] | Modul Archive Manager |
| 18 | FR-018 | Dasbor Progres Perluasan Range Nada | Tracking | [PASCA-UTS] | Modul Progress Tracker |
| 19 | FR-019 | Pelacak Streak & Gamifikasi Latihan | Gamifikasi | [PASCA-UTS] | Modul Gamification |
| 20 | FR-020 | Kurikulum Latihan Personal AI | AI Coach | [PASCA-UTS] | Modul LLM Curriculum |
| 21 | FR-021 | Latihan Tangga Nada & Solfeggio | Edukasi | **[SELESAI]** | `src/views/StudioView.vue` |
| 22 | FR-022 | Katalog Paket & Tier Switcher | Komersial | **[SELESAI]** | `src/views/HomeView.vue` |
| 23 | FR-023 | Riwayat Tagihan & Invoice Langganan | Billing | [PASCA-UTS] | Modul Payment Gateway |
| 24 | FR-024 | Manajemen Pengguna & Admin Console | Admin | [PASCA-UTS] | Modul Admin Dashboard |
---
## 4. Daftar 12 Fitur yang Telah Selesai (50.0% Capaian Proyek)
- [x] **FR-001: Registrasi Akun Pengguna**
  Formulir pendaftaran akun penyanyi baru dengan validasi data masukan, pilihan tier awal, dan penyimpanan sesi lokal pada `src/views/RegisterView.vue`.
- [x] **FR-002: Autentikasi Pengguna & Sesi**
  Sistem login pengguna dengan pengecekan kredensial, proteksi sesi akun, dan simulasi alur Single Sign-On pada `src/views/LoginView.vue`.
- [x] **FR-006: Chromatic Tuner & Kalibrasi Kebisingan**
  Modul tuner nada kromatik digital dengan jarum meter deviasi -50 s/d +50 cents, kalkulasi frekuensi $F_0$ real-time, dan slider pengatur *Ambient Noise Gate* pada `src/views/TunerView.vue`.
- [x] **FR-007: Tes Jangkauan Vokal (Vocal Range Finder)**
  Pendeteksian nada terendah (*Lowest Note*) dan nada tertinggi (*Highest Note*) yang dinyanyikan secara stabil, visualisasi tuts piano interaktif, dan penentuan tipe suara otomatis (Bass, Bariton, Tenor, Contralto, Mezzo-Sopran, Sopran) pada `src/views/RangeFinderView.vue`.
- [x] **FR-008: Perekaman Bernyanyi & Live DAW Piano Roll**
  Perekaman vokal via Web Audio API dengan visualisasi notasi balok solid MIDI pada jendela geser 10 detik, dilengkapi pewarnaan adaptif nada In-Tune (hijau), Flat (merah), dan Sharp (kuning) pada `src/views/StudioView.vue`.
- [x] **FR-009: Pengunggahan Berkas Audio Bernyanyi (Fitur Baru Penentu 50%)**
  Fitur upload berkas audio vokal eksternal (WAV, MP3, M4A) ke peramban, didekode secara instan melalui AudioContext untuk ekstraksi frekuensi pitch, balok notasi, serta integrasi layanan isolasi stem vokal backend pada `src/views/StudioView.vue`.
- [x] **FR-010: Pemutaran Ulang Audio Rekaman (Playback)**
  Pemutar audio buffer instan di sisi klien untuk mendengarkan kembali hasil rekaman suara vokal pengguna tanpa jeda upload server pada `src/views/StudioView.vue`.
- [x] **FR-011: Analisis Suara Bernyanyi Berbasis AI**
  Ekstraksi parameter akustik mencakup deteksi notasi musik, deviasi cents, osilasi vibrato 5-7 Hz, dan analisis distribusi energi resonansi 3 pita suara (Chest, Mask/Mixed, Head Voice) pada `src/utils/pitch.js`.
- [x] **FR-012: Rapor Bernyanyi 5 Dimensi & Saran AI**
  Penyajian Skor Bernyanyi Keseluruhan (0-100), 3 indikator ringkas (Akurasi Nada %, Kestabilan Suara %, Durasi Bersuara), Radar Chart 5 dimensi vokal, serta rekomendasi instruksi latihan vokal pada `src/views/StudioView.vue`.
- [x] **FR-015: Ekspor / Cetak Rapor Format PDF**
  Fungsi cetak dan unduh dokumen evaluasi vokal berstandar arsip menggunakan aturan stylesheet cetak peramban `@media print` pada `src/views/StudioView.vue`.
- [x] **FR-021: Latihan Tangga Nada & Solfeggio Terpandu**
  Balok melodi panduan Do-Re-Mi pada kanvas DAW, synthesizer panduan piano bawaan (*Web Audio Synth Guide*), dan evaluasi ketepatan vokal terarah pada `src/views/StudioView.vue`.
- [x] **FR-022: Katalog Paket & Tier Switcher**
  Katalog komparasi paket layanan (Free, Pro, Premium) beserta simulasi upgrade tier akun pada `src/views/HomeView.vue`.
---
## 5. Panduan Menjalankan Prototype (GitHub Repository)
### Prasyarat Sistem
* Peramban web modern: Google Chrome, Microsoft Edge, Mozilla Firefox, atau Safari.
* Perangkat mikrofon aktif dengan izin akses peramban (*Microphone Permission*).
### Langkah Menjalankan
1. Clone repositori dari GitHub:
   ```bash
   git clone https://github.com/elowgelo/VocalSense.git
   cd VocalSense
   ```
2. Jalankan local web server:
   * Menggunakan Python:
     ```bash
     python -m http.server 8000
     ```
   * Menggunakan Node.js:
     ```bash
     npx serve .
     ```
3. Buka peramban pada alamat: `http://localhost:8000` atau buka langsung berkas `app/index.html`.
---
## 6. Skenario & Naskah Presentasi Video YouTube (3ÔÇô5 Menit)
> Tautan Video YouTube: https://youtu.be/contoh-video-uts
### Menit 00:00 - 00:45: Pembukaan & Latar Belakang
* Salam pembuka, sebutkan Nama (Rafael Hotdion L.T) dan NIM (11241075).
* Perkenalkan proyek: VocalSense AI (AI-Powered Singing & Vocal Trainer Platform).
* Paparkan masalah mahalnya les vokal privat dan inspirasi benchmark Voice Gender Analyzer.
* Tegaskan capaian progress: 45.8% (11 dari 24 fitur SRS), melampaui syarat minimal 30%.
### Menit 00:45 - 01:30: Demo Fitur 1 (Tuner Kromatik)
* Buka halaman Tuner (`pages/tuner.html`).
* Klik aktifkan mikrofon, suarakan nada stabil (misal A4 atau C4).
* Tunjukkan jarum meter deviasi cents real-time dan fungsi slider noise gate.
### Menit 01:30 - 02:30: Demo Fitur 2 (Vocal Range Finder)
* Buka halaman Range Finder (`pages/range-finder.html`).
* Demonstrasikan tes nada terendah dan tertinggi penyanyi.
* Perlihatkan tuts piano yang menyala otomatis mengikuti vokal.
* Tunjukkan hasil klasifikasi tipe vokal otomatis (misal Tenor atau Bariton) beserta rentang oktafnya.
### Menit 02:30 - 03:45: Demo Fitur 3 (Studio DAW & Rapor AI)
* Buka halaman Studio Vokal (`pages/studio.html`).
* Perlihatkan kanvas Piano Roll DAW dengan balok melodi target Do-Re-Mi.
* Jalankan tombol audio synth guide untuk mendengarkan nada acuan piano.
* Mulai bernyanyi: tunjukkan balok vokal terbentuk dengan warna In-Tune, Flat, atau Sharp.
* Tampilkan kartu evaluasi: Skor 0-100, Radar Chart 5 Dimensi, meter Resonansi, dan fitur Cetak Rapor PDF.
### Menit 03:45 - 04:30: Demo Fitur 4 (Landing Page & Tier Paket)
* Kembali ke Beranda (`index.html`).
* Jelaskan komparasi tier Freemium (Free, Pro, Premium).
* Tekankan keunggulan in-browser processing tanpa perlu instalasi server rumit.
### Menit 04:30 - 05:00: Kesimpulan & Rencana Pasca-UTS
* Rangkum pemenuhan seluruh kriteria esensial tugas besar UTS.
* Sebutkan rencana pasca-UTS: integrasi cloud storage, payment gateway Midtrans, dan asisten kurikulum AI berbasis LLM.
* Tutup presentasi dengan salam dan terima kasih.
---
## 7. Checklist Kelengkapan Pengumpulan UTS
- [x] Prototype web interaktif telah selesai dibangun dan berfungsi normal
- [x] Total progress mencapai 45.8% (11 fitur selesai dari 24 fitur SRS)
- [x] Fitur esensial (Tuner, Range Finder, DAW Piano Roll, AI Analytics, Rapor) teruji tuntas
- [x] Kode sumber dan dokumentasi tersimpan di repositori GitHub
- [x] Struktur dan skenario presentasi video YouTube siap digunakan
- [x] Seluruh kebutuhan non-fungsional (privasi in-browser, performa 30+ FPS) terpenuhi
