# Software Design Document (SDD)
## VocalSense AI: Platform Analisis Suara Bernyanyi dan Bimbingan Latihan Vokal Cerdas (AI Singing & Vocal Trainer)

---

## 1. Pendahuluan

### 1.1 Tujuan Software Design Document
Dokumen Software Design Document (SDD) ini disusun untuk memberikan gambaran teknis dan cetak biru (*blueprint*) arsitektur perangkat lunak dari sistem **VocalSense AI**. Dokumen ini menjadi pedoman utama bagi tim pengembang (*programmers*, *system architects*, *database administrators*, dan *UI/UX designers*) dalam mentransformasikan spesifikasi kebutuhan perangkat lunak (SRS) ke dalam bentuk implementasi sistem yang modular, aman, andal, dan terukur (*scalable*).

### 1.2 Ruang Lingkup Software Design Document
Ruang lingkup desain teknis yang dibahas dalam dokumen ini mencakup:
- Arsitektur sistem multi-tier dari hulu ke hilir (*Frontend Web Audio*, *API Gateway*, *Backend Services*, *AI Singing Audio Engine*, dan *Database*).
- Integrasi pihak ketiga (*Web Audio API*, *AI LLM Vocal Coach Google Gemini*, *Cloud Object Storage*, dan *Payment Gateway Midtrans*).
- Perancangan Aliran Data (*Data Flow Diagram* - DFD level konteks hingga level rinci).
- Perancangan Basis Data Relasional (*Database Schema*, *Data Dictionary*, dan Relasi Entitas) yang berfokus pada metrik akustik bernyanyi (Pitch Cents, Flat/Sharp, Vibrato, Sustain, Range).
- Dekomposisi fungsional modul sistem dan spesifikasi antarmuka pemrograman aplikasi (*RESTful API Endpoints*).

---

## 2. Rancangan Lingkungan Aplikasi & Arsitektur Sistem

### 2.1 Lingkungan Operasi & Persyaratan Sistem
1. **Konektivitas Jaringan:** Sistem memerlukan koneksi internet aktif dan stabil (disarankan minimal 5 Mbps) untuk mengunggah berkas rekaman vokal dan menyinkronkan status pembayaran secara *real-time*.
2. **Klien Antarmuka (Frontend):** Berbasis Web (*Web-Based Responsive App*), sehingga pengguna dapat mengakses melalui peramban web modern tanpa instalasi aplikasi *desktop* khusus:
   - Google Chrome ver. 90 ke atas.
   - Mozilla Firefox ver. 88 ke atas.
   - Microsoft Edge ver. 90 ke atas.
   - Safari ver. 14 ke atas.
3. **Perangkat Keras Klien:** Perangkat komputer (PC/Laptop) atau telepon pintar (*Smartphone*) yang dilengkapi mikrofon masukan (*built-in* atau kondensor eksternal) dengan dukungan *sampling rate* minimal 44.1 kHz.
4. **Lingkungan Server & Infrastruktur:**
   - Sistem Operasi Server: Ubuntu 22.04 LTS atau Windows Server 2022.
   - Lingkungan Eksekusi Backend: Node.js (Express / NestJS) atau Python 3.10+ (FastAPI).
   - Mesin Komputasi AI: Python runtime dengan pustaka pemrosesan sinyal suara (`librosa`, `soundfile`, `scipy`, `numpy`, algoritma pelacak pitch YIN/PYIN / CREPE).
   - Basis Data: PostgreSQL 15+ untuk data transaksional dan riwayat bernyanyi, didukung Redis 7+ untuk manajemen sesi dan antrian tugas audio (*task queue*).

### 2.2 Batasan Desain dan Implementasi
- **Web Audio Permission:** Aplikasi bergantung pada izin akses mikrofon peramban (*browser permissions*). Jika pengguna menolak akses mikrofon, perekaman langsung tidak dapat berjalan (pengguna diarahkan ke opsi unggah berkas).
- **Latency Audio Processing:** Komputasi ekstraksi nada, deviasi cents, dan osilasi vibrato membutuhkan pemrosesan intensif CPU. Backend mengadopsi pola asinkron (*asynchronous worker*) dengan antrian Redis BullMQ / Celery agar tidak mengunci (*block*) antarmuka pengguna.
- **Penyimpanan Berkas (Storage Isolation):** Berkas rekaman bernyanyi pengguna gratis (Free Tier) hanya diproses di dalam *RAM buffer* dan langsung dihapus setelah analisis selesai. Berkas audio pengguna berbayar (Pro/Premium) disimpan dalam Cloud Storage (AWS S3 / Supabase Storage) dengan tautan bertanda tangan (*Pre-signed URL*).

### 2.3 Arsitektur Sistem (High-Level Architecture)
Sistem VocalSense AI mengadopsi arsitektur **Modular Service-Oriented Architecture (SOA)** berbasis REST API:

```
[ Klien Penyanyi (Web Browser & Web Audio API) ]
               │
               ▼  (HTTPS / REST / WSS)
    ┌──────────────────────────┐
    │   API Gateway (Backend)  │
    └──────────┬───────────────┘
               │
    ┌──────────┴────────────────────────────────────────────────┐
    │                                                           │
    ▼                                                           ▼
[ Service Autentikasi & Akun ]               [ Service Billing & Subscription ]
    │ (JWT & Google OAuth)                                      │ (Midtrans Webhook)
    │                                                           │
    ▼                                                           ▼
[ Task Queue (Redis Broker) ]                [ Cloud Storage (Audio S3/MinIO) ]
    │                                                           ▲
    ▼                                                           │
[ AI Singing Audio Engine ] ────────────────────────────────────┘
    ├── Pitch / F0 Extractor (YIN / CREPE)
    ├── Cent Deviation & Flat/Sharp Detector
    ├── Vibrato & Sustain Modulator (5-7 Hz)
    ├── Breath Support & Dynamic Analyzer
    └── AI Vocal Coach Planner (Gemini LLM)
               │
               ▼
[ Basis Data Relasional (PostgreSQL) ]
```

---

## 3. Perancangan Aliran Data (Data Flow Design)

### 3.1 DFD Level 0 (Diagram Konteks)
Diagram konteks menggambarkan interaksi batas sistem VocalSense AI dengan entitas luar:
- **Entitas Luar:**
  1. **Pengguna / Penyanyi (Tamu, Free, Pro, Premium):** Mengirimkan input suara rekaman bernyanyi, tes jangkauan vokal, kalibrasi mic, dan menerima rapor bernyanyi (Piano Roll, Radar Chart), grafik progres perluasan vokal, serta jadwal latihan tangga nada harian.
  2. **Payment Gateway (Midtrans):** Menerima instruksi pembuatan tagihan dan mengembalikan notifikasi status pelunasan transaksi (*settlement webhook*).
  3. **AI LLM Coach (Google Gemini):** Menerima data diagnosis nada fals dan histori vokal pengguna, kemudian mengembalikan naskah kurikulum latihan vokal harian adaptif (*Solfeggio & Scales Drills*).
  4. **Administrator:** Memantau analitik keuangan platform vokal, mengelola status pengguna, memantau utilisasi server AI Engine, dan mengatur ambang batas toleransi nada fals (*cents threshold*).

![Data Flow Diagram Level 0 - Konteks](diagrams/dfd/dfd_level_0.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/dfd/dfd_level_0.drawio`](diagrams/dfd/dfd_level_0.drawio)

### 3.2 DFD Level 1
Sistem dipecah menjadi 7 proses fungsional utama:
- **Proses 1.0 (Manajemen Akun & Autentikasi):** Menangani pendaftaran pengguna, verifikasi login, OAuth Google, dan penerbitan JWT.
- **Proses 2.0 (Kalibrasi & Perekaman Vokal):** Menguji mikrofon (*Chromatic Tuner*), menangkap stream audio bernyanyi, dan merender *waveform/pitch curve*.
- **Proses 3.0 (Analisis Suara Bernyanyi AI):** Mengekstrak kurva nada F0, menghitung deviasi cents, mengidentifikasi nada fals (*Flat/Sharp*), mengukur vibrato, sustain, dan menghitung Skor Bernyanyi Keseluruhan.
- **Proses 4.0 (Penyimpanan Rapor Bernyanyi & Ekspor PDF):** Menyimpan metadata penilaian ke basis data, mengunggah audio ke Cloud Storage, dan menyusun dokumen sertifikat/rapor PDF.
- **Proses 5.0 (Pelacakan Kemajuan / Progress Tracking):** Mengagregasi data historis nada tepat (*in-tune rate*) dan memetakan perluasan jangkauan vokal pada tuts piano.
- **Proses 6.0 (Perencanaan Latihan Vokal AI):** Mendiagnosis kelemahan register vokal dan menyusun jadwal latihan tangga nada solfeggio harian adaptif.
- **Proses 7.0 (Manajemen Pembayaran & Langganan):** Mengatur tagihan pembayaran, memproses webhook Midtrans, dan memperbarui tier keanggotaan pengguna.

---

## 4. Perancangan Basis Data (Database Design)

### 4.1 Entitas dan Kamus Data (Data Dictionary)

#### 1. Tabel `users`
Menyimpan informasi identitas dan profil vokal pengguna.
- `id` (UUID, Primary Key): Pengenal unik akun penyanyi.
- `name` (VARCHAR(100), Not Null): Nama lengkap penyanyi.
- `email` (VARCHAR(150), Unique, Not Null): Alamat email unik.
- `password_hash` (VARCHAR(255), Nullable): Hash kata sandi terenkripsi (bcrypt).
- `google_id` (VARCHAR(100), Unique, Nullable): ID penaut Google SSO.
- `avatar_url` (VARCHAR(255), Nullable): Tautan foto profil.
- `voice_type_assumed` (VARCHAR(30), Nullable): Tipe suara asumsi awal (Bass, Bariton, Tenor, Alto, Mezzo, Sopran).
- `favorite_genre` (VARCHAR(50), Nullable): Genre vokal favorit (Pop, Rock, R&B, Jazz, Klasik).
- `role` (ENUM('user', 'admin'), Default 'user'): Peran hak akses di sistem.
- `status` (ENUM('active', 'suspended'), Default 'active'): Status keaktifan akun.
- `created_at` (TIMESTAMP, Default NOW()): Waktu pendaftaran akun.

#### 2. Tabel `plans`
Menyimpan katalog paket langganan bernyanyi yang tersedia di platform.
- `id` (VARCHAR(30), Primary Key): Kode unik paket (`free`, `pro_monthly`, `premium_monthly`).
- `name` (VARCHAR(50), Not Null): Nama komersial paket.
- `price` (DECIMAL(12,2), Not Null): Tarif harga paket dalam Rupiah.
- `duration_days` (INT, Not Null): Durasi masa aktif paket dalam jumlah hari.
- `max_recording_seconds` (INT, Not Null): Durasi maksimal per rekaman bernyanyi (60, 300, 900 detik).
- `features` (JSONB, Not Null): Hak akses fitur (simpan rapor, unduh PDF, progress tracking, AI vocal coach).

#### 3. Tabel `subscriptions`
Menyimpan relasi langganan aktif penyanyi.
- `id` (UUID, Primary Key): ID unik transaksi langganan.
- `user_id` (UUID, Foreign Key -> `users.id`): ID pengguna pemilik langganan.
- `plan_id` (VARCHAR(30), Foreign Key -> `plans.id`): ID paket langganan.
- `status` (ENUM('active', 'expired', 'cancelled'), Default 'active'): Status masa aktif langganan.
- `start_date` (TIMESTAMP, Not Null): Waktu mulai aktifnya paket.
- `end_date` (TIMESTAMP, Not Null): Waktu berakhirnya masa berlaku langganan.

#### 4. Tabel `payments`
Mencatat riwayat transaksi pembayaran dan status verifikasi dari Payment Gateway (Midtrans).
- `id` (UUID, Primary Key): ID transaksi internal.
- `order_id` (VARCHAR(50), Unique, Not Null): Nomor pesanan unik (contoh: `INV-SING-20260929-XXXX`).
- `user_id` (UUID, Foreign Key -> `users.id`): ID pembayar.
- `plan_id` (VARCHAR(30), Foreign Key -> `plans.id`): Paket yang dibeli.
- `amount` (DECIMAL(12,2), Not Null): Jumlah nominal tagihan.
- `payment_method` (VARCHAR(50), Nullable): Metode pembayaran (BCA VA, GoPay, QRIS, Kartu Kredit).
- `status` (ENUM('pending', 'settled', 'expired', 'failed'), Default 'pending'): Status pembayaran.
- `payment_gateway_response` (JSONB, Nullable): Payload lengkap kembalian webhook.
- `created_at` (TIMESTAMP, Default NOW()): Waktu pembuatan tagihan.
- `settled_at` (TIMESTAMP, Nullable): Waktu pelunasan tagihan.

#### 5. Tabel `voice_recordings`
Menyimpan berkas rekaman dan metadata audio bernyanyi pengguna.
- `id` (UUID, Primary Key): ID rekaman audio.
- `user_id` (UUID, Foreign Key -> `users.id`, Nullable): ID pemilik rekaman (null jika Guest User).
- `file_url` (VARCHAR(255), Nullable): Tautan berkas audio bernyanyi di Cloud Storage (null untuk Free User).
- `duration_seconds` (DECIMAL(6,2), Not Null): Panjang durasi rekaman vokal dalam detik.
- `file_format` (VARCHAR(10), Not Null): Format audio (`wav`, `mp3`, `m4a`).
- `file_size_kb` (INT, Not Null): Ukuran berkas dalam Kilobyte.
- `recording_type` (ENUM('free_singing', 'range_test', 'scale_drill'), Default 'free_singing'): Jenis sesi rekaman.
- `created_at` (TIMESTAMP, Default NOW()): Waktu perekaman dibuat.

#### 6. Tabel `vocal_reports`
Menyimpan rapor lengkap hasil kalkulasi AI Singing Voice Analytics Engine.
- `id` (UUID, Primary Key): ID unik rapor evaluasi bernyanyi.
- `recording_id` (UUID, Foreign Key -> `voice_recordings.id`): Tautan ke berkas rekaman suara.
- `user_id` (UUID, Foreign Key -> `users.id`, Nullable): Tautan akun penyanyi.
- `overall_score` (INT, Not Null): Nilai skor bernyanyi keseluruhan (0 - 100).
- `pitch_accuracy_cents` (DECIMAL(5,2), Not Null): Rata-rata deviasi nada dalam satuan Cents.
- `in_tune_percentage` (DECIMAL(5,2), Not Null): Persentase nada yang tepat sasaran ($\pm$ 20 cents).
- `median_f0_hz` (DECIMAL(6,2), Not Null): Median frekuensi dasar F0 suara penyanyi dalam Hertz.
- `voiced_seconds` (DECIMAL(6,2), Not Null): Total durasi waktu suara vokal bernyanyi aktif (voiced time).
- `flat_notes_count` (INT, Not Null): Jumlah nada yang terdeteksi fals terlalu rendah (*Flat*).
- `sharp_notes_count` (INT, Not Null): Jumlah nada yang terdeteksi fals terlalu tinggi (*Sharp*).
- `vocal_range_min` (VARCHAR(10), Not Null): Nada stabil terendah yang terdeteksi (contoh: C3).
- `vocal_range_max` (VARCHAR(10), Not Null): Nada stabil tertinggi yang terdeteksi (contoh: A4).
- `voice_type` (VARCHAR(30), Not Null): Klasifikasi tipe suara teridentifikasi (Tenor, Bariton, Sopran, dll).
- `resonance_chest_pct` (DECIMAL(5,2), Not Null): Persentase energi resonansi suara dada (100–400 Hz).
- `resonance_mask_pct` (DECIMAL(5,2), Not Null): Persentase energi resonansi mask/pharyngeal (400–2000 Hz).
- `resonance_head_pct` (DECIMAL(5,2), Not Null): Persentase energi resonansi nada tinggi/head voice (2000–5000 Hz).
- `vibrato_rate_hz` (DECIMAL(4,2), Nullable): Frekuensi osilasi vibrato (ideal 5.0 - 7.0 Hz).
- `vibrato_extent_cents` (DECIMAL(5,2), Nullable): Kedalaman modulasi vibrato.
- `sustain_stability_score` (INT, Not Null): Skor kestabilan menahan nada panjang (0 - 100).
- `breath_support_score` (INT, Not Null): Skor kestabilan volume pernapasan diafragma (0 - 100).
- `timing_accuracy_score` (INT, Not Null): Skor ketepatan ketukan nada melodi (0 - 100).
- `piano_roll_data` (JSONB, Not Null): Rangkaian data notasi nada target vs nada suara penyanyi untuk visualisasi Piano Roll.
- `recommendations` (JSONB, Not Null): Daftar saran perbaikan teknik vokal dari AI.
- `created_at` (TIMESTAMP, Default NOW()): Waktu pembuatan rapor.

#### 7. Tabel `progress_trackings`
Menyimpan agregasi data latihan bernyanyi untuk visualisasi tren kemajuan dan perluasan jangkauan nada.
- `id` (UUID, Primary Key): ID unik pencatatan progres vokal.
- `user_id` (UUID, Foreign Key -> `users.id`): ID pengguna bersangkutan.
- `current_streak` (INT, Default 0): Jumlah hari berturut-turut melakukan latihan vokal.
- `total_sessions` (INT, Default 0): Total keseluruhan sesi latihan bernyanyi yang telah dilakukan.
- `avg_singing_score` (DECIMAL(5,2), Default 0.0): Rata-rata skor bernyanyi keseluruhan.
- `in_tune_rate_trend` (JSONB, Nullable): Histori persentase nada tepat mingguan/bulanan.
- `vocal_range_current_min` (VARCHAR(10), Nullable): Nada terendah saat ini.
- `vocal_range_current_max` (VARCHAR(10), Nullable): Nada tertinggi saat ini.
- `last_practiced_at` (TIMESTAMP, Nullable): Waktu latihan vokal terakhir.

#### 8. Tabel `ai_practice_plans`
Menyimpan kurikulum latihan bernyanyi personal yang dirancang oleh AI Vocal Coach untuk pengguna Premium.
- `id` (UUID, Primary Key): ID rencana kurikulum vokal.
- `user_id` (UUID, Foreign Key -> `users.id`): ID pengguna pemilik kurikulum.
- `title` (VARCHAR(150), Not Null): Judul program latihan (contoh: "Program Penguatan Register Tinggi & Penstabilan Vibrato 14 Hari").
- `target_voice_type` (VARCHAR(30), Not Null): Tipe suara pengguna.
- `target_weaknesses` (JSONB, Not Null): Daftar kelemahan nada fals yang menjadi fokus perbaikan.
- `curriculum_schedule` (JSONB, Not Null): Rincian tugas harian, materi audio tangga nada (*solfeggio drills*), dan tips teknik pernapasan.
- `status` (ENUM('active', 'completed', 'archived'), Default 'active'): Status program.
- `created_at` (TIMESTAMP, Default NOW()): Waktu perancangan kurikulum.

---

## 5. Dekomposisi Fungsional Modul & Spesifikasi API

### 5.1 Dekomposisi Modul Fungsional
- **0.0 Sistem VocalSense AI (Singing Trainer)**
  - **1.0 Modul Autentikasi & Akun**
    - 1.1 Registrasi Akun Penyanyi Baru
    - 1.2 Masuk Sistem Kredensial & Validasi JWT
    - 1.3 Integrasi Single Sign-On Google OAuth 2.0
    - 1.4 Pembaruan Profil Vokal & Preferensi Rentang Nada
  - **2.0 Modul Kalibrasi & Perekam Bernyanyi**
    - 2.1 Kalibrasi Desibel & Digital Chromatic Tuner
    - 2.2 Tes Jangkauan Vokal Mandiri (*Vocal Range Finder*)
    - 2.3 Perekaman Suara Bernyanyi & Live Pitch Curve Visualizer
    - 2.4 Unggah Berkas Rekaman Vokal & Validasi Kualitas Format
    - 2.5 Pemutaran Ulang & Pemangkasan Jeda Hening Vokal
  - **3.0 Modul Engine Analisis Suara Bernyanyi AI**
    - 3.1 Ekstraksi Nada Dasar F0 & Deviasi Satuan Cents
    - 3.2 Deteksi Nada Fals (*Flat / Sharp Classification*)
    - 3.3 Pengukuran Frekuensi Osilasi & Modulasi Vibrato (5-7 Hz)
    - 3.4 Penilaian Kestabilan Penahanan Nada (*Sustain Drift*)
    - 3.5 Analisis Dinamika Desibel & Kontrol Napas Diafragma
    - 3.6 Agregasi Skor Bernyanyi & Pembangkitan Saran Teknik Vokal AI
  - **4.0 Modul Rapor Bernyanyi & Ekspor Dokumen (Pro)**
    - 4.1 Penyajian Kanvas Piano Roll Interaktif & Radar Chart Vokal
    - 4.2 Pemutaran Audio Terikat Deteksi Nada Fals (*Note-Sync Playback*)
    - 4.3 Penyimpanan Rapor Bernyanyi Permanen di Cloud Storage
    - 4.4 Pembangkitan Lembar Rapor & Sertifikat Vokal Format PDF
    - 4.5 Perbandingan Kurva Nada Dua Sesi Bernyanyi (*Side-by-Side*)
  - **5.0 Modul Pelacakan Kemajuan Vokal (Premium)**
    - 5.1 Dasbor Tren Akurasi Nada & Perluasan Jangkauan Vokal
    - 5.2 Pelacak Konsistensi Streak Latihan Bernyanyi Harian
    - 5.3 Sistem Pembukaan Kunci Lencana Capaian Prestasi Vokal
  - **6.0 Modul Pelatih Vokal Cerdas AI (Premium)**
    - 6.1 Diagnosis Otomatis Kelemahan Register & Nada Fals
    - 6.2 Penyusunan Silabus Latihan Tangga Nada Solfeggio Adaptif LLM
    - 6.3 Sesi Latihan Tangga Nada & Arpeggio Terpandu
  - **7.0 Modul Transaksi & Langganan**
    - 7.1 Katalog Paket & Pembuatan Transaksi
    - 7.2 Integrasi Gateway Pembayaran (Snap Midtrans)
    - 7.3 Pemrosesan Webhook & Aktivasi Hak Akses Tier Otomatis
  - **8.0 Modul Administrasi & Monitoring**
    - 8.1 Manajemen Pengguna & Penyesuaian Tier Vokal
    - 8.2 Dasbor Analitik Finansial & Utilisasi Komputasi AI Engine
    - 8.3 Konfigurasi Batas Toleransi Deviasi Cents Nada Fals Global

### 5.2 Spesifikasi Endpoint REST API Utama

| No | Metode | Endpoint | Deskripsi | Hak Akses |
|---|---|---|---|---|
| 1 | `POST` | `/api/auth/register` | Mendaftarkan akun penyanyi baru | Publik |
| 2 | `POST` | `/api/auth/login` | Masuk dengan email & password | Publik |
| 3 | `POST` | `/api/auth/google` | Masuk / daftar via Google OAuth 2.0 | Publik |
| 4 | `PUT` | `/api/users/profile-vocal` | Memperbarui tipe suara & preferensi genre vokal | Pengguna |
| 5 | `POST` | `/api/audio/tuner-calibrate` | Kalibrasi kebisingan mikrofon & tuner nada dasar | Pengguna |
| 6 | `POST` | `/api/vocal-range/test` | Memproses nada terendah/tertinggi & klasifikasi suara | Semua Pengguna |
| 7 | `POST` | `/api/voice/analyze-singing` | Menganalisis audio bernyanyi (Pitch, Cents, Vibrato) | Semua Pengguna |
| 8 | `GET` | `/api/reports` | Mengambil daftar riwayat rapor bernyanyi | Pro, Premium |
| 9 | `GET` | `/api/reports/:id` | Mengambil detail rapor & data kanvas Piano Roll | Pro, Premium |
| 10 | `GET` | `/api/reports/:id/pdf` | Mengunduh lembar rapor & sertifikat vokal format PDF | Pro, Premium |
| 11 | `POST` | `/api/reports/compare` | Komparasi side-by-side kurva nada dua sesi rekaman | Pro, Premium |
| 12 | `GET` | `/api/analytics/vocal-progress` | Mengambil statistik tren akurasi & perluasan range | Premium |
| 13 | `POST` | `/api/ai-coach/generate-curriculum`| Merancang kurikulum latihan vokal harian adaptif AI | Premium |
| 14 | `POST` | `/api/ai-coach/drills/evaluate` | Mengevaluasi kepatuhan nada latihan solfeggio | Premium |
| 15 | `GET` | `/api/subscriptions/plans` | Mengambil daftar katalog paket harga langganan | Publik |
| 16 | `POST` | `/api/subscriptions/checkout` | Membuat tagihan pembayaran ke Snap Midtrans | Pengguna Terdaftar |
| 17 | `POST` | `/api/payments/webhook` | Menerima webhook notifikasi pelunasan transaksi | Gateway Server |
| 18 | `GET` | `/api/admin/users` | Mengelola data pengguna dan penyesuaian tier vokal | Administrator |
| 19 | `GET` | `/api/admin/analytics` | Mengambil statistik omset & beban komputasi AI | Administrator |
| 20 | `PUT` | `/api/admin/tuning-params` | Menyetel ambang batas deviasi cents nada fals | Administrator |

---

## 6. Perancangan Antarmuka & Layanan (Interface Design)

### 6.1 Desain Alur Antarmuka Pengguna (UI Flow)
1. **Halaman Beranda (*Landing Page*):** Memperkenalkan kapabilitas VocalSense AI Singing Trainer, tombol coba instan tes jangkauan vokal, pemutar demo visualizer piano roll, tabel perbandingan fitur Free vs Pro vs Premium, dan tombol daftar/masuk.
2. **Halaman Pengujian Jangkauan Vokal (*Vocal Range Finder View*):** Antarmuka interaktif yang memandu penyanyi menyuarakan nada terendah dan tertinggi dengan panduan audio piano, menampilkan tuts piano yang menyala secara dinamis, dan memberikan hasil klasifikasi suara (Bass, Bariton, Tenor, Alto, Mezzo, Sopran).
3. **Halaman Studio Menyanyi (*Singing Studio View*):** Dilengkapi tombol besar rekam/berhenti vokal, kanvas *Real-time Pitch Curve* yang mengalir di atas balok nada target, indikator deviasi cents, dan tombol pemangkas vokal (*audio trimmer*).
4. **Halaman Rapor Bernyanyi (*Singing Report Card View*):** Menampilkan Skor Bernyanyi (0-100), Radar Chart 5 dimensi vokal, kanvas visualisasi *Interactive Piano Roll* (balok nada berkode warna hijau in-tune, biru flat, merah sharp yang dapat diklik untuk memutar audio), kartu saran vokal AI, serta tombol simpan rapor atau ekspor PDF.
5. **Halaman Dasbor Progres Vokal (*Vocal Progress View* - Premium):** Menampilkan grafik garis peningkatan akurasi nada mingguan, visualisasi perluasan tuts jangkauan vokal, kalender *streak* latihan vokal harian, dan lencana capaian prestasi vokal.
6. **Halaman Pelatih Vokal Cerdas (*AI Vocal Coach & Practice Planner View* - Premium):** Kalender jadwal latihan vokal harian (7-30 hari), modul latihan tangga nada terpandu (*Guided Solfeggio & Arpeggio Drills*), dan evaluasi ketepatan nada solfeggio instan.
7. **Halaman Pembayaran & Langganan (*Billing View*):** Kartu pilihan paket langganan (Free, Pro, Premium), modal pembayaran resmi Midtrans, dan riwayat faktur tagihan.
8. **Panel Kontrol Administrator (*Admin Dashboard*):** Ringkasan kartu statistik pendapatan, grafik pengguna aktif per tier bernyanyi, tabel manajemen akun, dan pengaturan parameter algoritma evaluasi vokal.

---

## 7. Perancangan UML & Diagram Sistem

Perancangan UML pada sistem VocalSense AI disusun secara komprehensif dengan mematuhi kaidah pemodelan berorientasi objek serta catatan asistensi pembimbing (Kak Rahmi):
1. **Pemisahan Aktor Eksternal vs Backend Service:** Entitas Google OAuth 2.0, Payment Gateway (Midtrans), dan AI LLM Provider (Google Gemini) beroperasi di lapisan infrastruktur/backend sistem, bukan aktor manusia atau perangkat IoT interaktif. Oleh karena itu, Use Case Diagram hanya memodelkan 2 aktor manusia utama: **Pengguna (Penyanyi)** dan **Administrator**.
2. **Kesesuaian 1:1 Use Case, Activity Diagram, dan Sequence Diagram:** Setiap Use Case (UC-01 hingga UC-24) memiliki tepat 1 Activity Diagram (AD-01 hingga AD-24) dan 1 Sequence Diagram (SD-01 hingga SD-24).
3. **Kaidah Activity Diagram:** Setiap percabangan keputusan (*decision diamond*) wajib memiliki label keterangan berpenanda kurung siku `[ ]` (contoh: `[Tersedia]`, `[Sudah Terdaftar]`, `[Valid]`, `[Tidak Valid]`), tidak menyisipkan simbol *merge diamond* tanpa titik penggabungan ganda, menyertakan alur navigasi menu awal yang jelas, serta menggunakan kosakata ramah pengguna.
4. **Kaidah Sequence Diagram & Konsep MVC:** Lifeline disusun berurutan dari `User` -> `View` (Antarmuka Pengguna) -> `Controller` (Pengendali Alur) -> `Service` (Logika Bisnis) -> `Database / Storage` (Basis Data). Selain format berkas visual `.drawio`, seluruh diagram sekuensial juga disediakan dalam format deklaratif **PlantUML (`.puml`)** untuk kemudahan pemeliharaan dan pengeditan cepat.

---

### 7.1 Tabel Matriks Pemetaan 1:1 Diagram Sistem (24 Use Cases)

| Kode UC | Nama Use Case | Aktor Utama | Berkas Activity Diagram (.drawio) | Berkas Sequence Diagram (.drawio & .puml) |
|---|---|---|---|---|
| **UC-01** | Registrasi Akun Pengguna | Pengguna | `AD-01_Registrasi_Akun_Pengguna.drawio` | `SD-01_Registrasi_Akun_Pengguna.drawio` / `.puml` |
| **UC-02** | Masuk ke Sistem (Login) | Pengguna | `AD-02_Masuk_ke_Sistem.drawio` | `SD-02_Masuk_ke_Sistem.drawio` / `.puml` |
| **UC-03** | Masuk via Google OAuth | Pengguna | `AD-03_Masuk_via_Google_OAuth.drawio` | `SD-03_Masuk_via_Google_OAuth.drawio` / `.puml` |
| **UC-04** | Pemulihan Kata Sandi | Pengguna | `AD-04_Pemulihan_Kata_Sandi.drawio` | `SD-04_Pemulihan_Kata_Sandi.drawio` / `.puml` |
| **UC-05** | Pengelolaan Profil Vokal dan Preferensi | Pengguna | `AD-05_Pengelolaan_Profil_Vokal_dan_Preferensi.drawio` | `SD-05_Pengelolaan_Profil_Vokal_dan_Preferensi.drawio` / `.puml` |
| **UC-06** | Tuner dan Kalibrasi Mikrofon | Pengguna | `AD-06_Tuner_dan_Kalibrasi_Mikrofon.drawio` | `SD-06_Tuner_dan_Kalibrasi_Mikrofon.drawio` / `.puml` |
| **UC-07** | Tes Jangkauan Vokal (Vocal Range Finder) | Pengguna | `AD-07_Tes_Jangkauan_Vokal.drawio` | `SD-07_Tes_Jangkauan_Vokal.drawio` / `.puml` |
| **UC-08** | Perekaman Bernyanyi dan Pitch Visualizer | Pengguna | `AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio` | `SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio` / `.puml` |
| **UC-09** | Unggah Berkas Rekaman Vokal | Pengguna | `AD-09_Unggah_Berkas_Rekaman_Vokal.drawio` | `SD-09_Unggah_Berkas_Rekaman_Vokal.drawio` / `.puml` |
| **UC-10** | Putar Ulang dan Pangkas Vokal (Trim Audio) | Pengguna | `AD-10_Putar_Ulang_dan_Pangkas_Vokal.drawio` | `SD-10_Putar_Ulang_dan_Pangkas_Vokal.drawio` / `.puml` |
| **UC-11** | Analisis Suara Bernyanyi AI (Pitch, Cents, Vibrato) | Pengguna | `AD-11_Analisis_Suara_Bernyanyi_AI.drawio` | `SD-11_Analisis_Suara_Bernyanyi_AI.drawio` / `.puml` |
| **UC-12** | Menampilkan Rapor dan Piano Roll Visualizer | Pengguna | `AD-12_Menampilkan_Rapor_dan_Piano_Roll.drawio` | `SD-12_Menampilkan_Rapor_dan_Piano_Roll.drawio` / `.puml` |
| **UC-13** | Putar Audio Terikat Nada Fals (Note-Sync Playback) | Pengguna | `AD-13_Putar_Audio_Terikat_Nada_Fals.drawio` | `SD-13_Putar_Audio_Terikat_Nada_Fals.drawio` / `.puml` |
| **UC-14** | Menyimpan Rapor Nyanyi (Pro / Premium) | Pengguna (Pro/Prem) | `AD-14_Menyimpan_Rapor_Nyanyi.drawio` | `SD-14_Menyimpan_Rapor_Nyanyi.drawio` / `.puml` |
| **UC-15** | Mengekspor Rapor dan Sertifikat PDF | Pengguna (Pro/Prem) | `AD-15_Mengekspor_Rapor_dan_Sertifikat_PDF.drawio` | `SD-15_Mengekspor_Rapor_dan_Sertifikat_PDF.drawio` / `.puml` |
| **UC-16** | Membandingkan Dua Sesi Rekaman Nyanyi | Pengguna (Pro/Prem) | `AD-16_Membandingkan_Dua_Sesi_Rekaman_Nyanyi.drawio` | `SD-16_Membandingkan_Dua_Sesi_Rekaman_Nyanyi.drawio` / `.puml` |
| **UC-17** | Memantau Dasbor Progres Vokal | Pengguna (Premium) | `AD-17_Memantau_Dasbor_Progres_Vokal.drawio` | `SD-17_Memantau_Dasbor_Progres_Vokal.drawio` / `.puml` |
| **UC-18** | Melacak Streak dan Lencana Vokal | Pengguna (Premium) | `AD-18_Melacak_Streak_dan_Lencana_Vokal.drawio` | `SD-18_Melacak_Streak_dan_Lencana_Vokal.drawio` / `.puml` |
| **UC-19** | Menghasilkan Kurikulum Vokal AI | Pengguna (Premium) | `AD-19_Menghasilkan_Kurikulum_Vokal_AI.drawio` | `SD-19_Menghasilkan_Kurikulum_Vokal_AI.drawio` / `.puml` |
| **UC-20** | Menjalankan Sesi Latihan Tangga Nada (Solfeggio) | Pengguna (Premium) | `AD-20_Menjalankan_Sesi_Latihan_Tangga_Nada.drawio` | `SD-20_Menjalankan_Sesi_Latihan_Tangga_Nada.drawio` / `.puml` |
| **UC-21** | Memilih Paket dan Membayar Langganan | Pengguna | `AD-21_Memilih_Paket_dan_Membayar_Langganan.drawio` | `SD-21_Memilih_Paket_dan_Membayar_Langganan.drawio` / `.puml` |
| **UC-22** | Melihat Riwayat Tagihan dan Invoice | Pengguna | `AD-22_Melihat_Riwayat_Tagihan_dan_Invoice.drawio` | `SD-22_Melihat_Riwayat_Tagihan_dan_Invoice.drawio` / `.puml` |
| **UC-23** | Manajemen Pengguna dan Tier | Administrator | `AD-23_Manajemen_Pengguna_dan_Tier.drawio` | `SD-23_Manajemen_Pengguna_dan_Tier.drawio` / `.puml` |
| **UC-24** | Pemantauan Analitik Finansial dan Sistem | Administrator | `AD-24_Pemantauan_Analitik_Finansial_dan_Sistem.drawio` | `SD-24_Pemantauan_Analitik_Finansial_dan_Sistem.drawio` / `.puml` |

---

### 7.2 Use Case Diagram
Diagram Use Case memetakan 24 fungsi fungsional sistem VocalSense AI dengan 2 aktor utama (*Pengguna* dan *Administrator*) sesuai arahan pembimbing Kak Rahmi (di mana Google OAuth, Payment Gateway, dan LLM AI beroperasi di backend sistem sehingga tidak digambar sebagai aktor use case):

![Use Case Diagram VocalSense AI](diagrams/usecase/usecase_diagram_vocal_sense.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/usecase/usecase_diagram_vocal_sense.drawio`](diagrams/usecase/usecase_diagram_vocal_sense.drawio) & [`docs/diagrams/usecase/usecase_diagram_final.drawio`](diagrams/usecase/usecase_diagram_final.drawio)

---

### 7.3 Ilustrasi Activity Diagram Pilihan

#### 7.3.1 AD-01: Registrasi Akun Pengguna
Menggambarkan alur pendaftaran penyanyi baru dengan validasi format email, kekuatan kata sandi, dan percabangan ketersediaan email dengan label `[Tersedia]` atau `[Sudah Terdaftar]`:

![Activity Diagram AD-01 Registrasi Akun Pengguna](diagrams/activity/AD-01_Registrasi_Akun_Pengguna.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/activity/AD-01_Registrasi_Akun_Pengguna.drawio`](diagrams/activity/AD-01_Registrasi_Akun_Pengguna.drawio)

#### 7.3.2 AD-08: Perekaman Bernyanyi dan Pitch Visualizer
Menggambarkan alur perekaman suara langsung di browser via Web Audio API, rendering kurva pitch waktu nyata (rolling 10s F0) di atas tuts balok notasi nada, pengecekan batas durasi kuota, pengemasan audio blob, dan pengalihan ke modul pemangkas audio:

![Activity Diagram AD-08 Perekaman Bernyanyi dan Pitch Visualizer](diagrams/activity/AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/activity/AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio`](diagrams/activity/AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio)

#### 7.3.3 AD-11: Analisis Suara Bernyanyi AI
Menggambarkan pipa pemrosesan sinyal vokal digital bernyanyi (*audio DSP pipeline*) oleh Voice Analytics AI Engine (ekstraksi F0, kalkulasi deviasi nada dalam Cents, deteksi nada fals Flat/Sharp, pengukuran osilasi vibrato 5-7 Hz, kestabilan sustain, dinamika napas), kompilasi skor bernyanyi, dan penyimpanan rapor ke basis data:

![Activity Diagram AD-11 Analisis Suara Bernyanyi AI](diagrams/activity/AD-11_Analisis_Suara_Bernyanyi_AI.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/activity/AD-11_Analisis_Suara_Bernyanyi_AI.drawio`](diagrams/activity/AD-11_Analisis_Suara_Bernyanyi_AI.drawio)

---

### 7.4 Ilustrasi Sequence Diagram Pilihan

#### 7.4.1 SD-01: Registrasi Akun Pengguna
Memetakan pesan berurutan (*message sequence*) antara Pengguna, Form Registrasi View, AuthController, AuthService, dan User Database:

![Sequence Diagram SD-01 Registrasi Akun Pengguna](diagrams/sequence/SD-01_Registrasi_Akun_Pengguna.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/sequence/SD-01_Registrasi_Akun_Pengguna.drawio`](diagrams/sequence/SD-01_Registrasi_Akun_Pengguna.drawio)  
> **Berkas Sumber PlantUML:** [`docs/diagrams/sequence/PlantUML/SD-01_Registrasi_Akun_Pengguna.puml`](diagrams/sequence/PlantUML/SD-01_Registrasi_Akun_Pengguna.puml)

#### 7.4.2 SD-08: Perekaman Bernyanyi dan Pitch Visualizer
Memetakan interaksi waktu nyata (*real-time Web Audio pipeline*) antara Pengguna, Singing Studio View, RecordingController, WebAudioService (F0 Extractor), dan Temp Storage:

![Sequence Diagram SD-08 Perekaman Bernyanyi dan Pitch Visualizer](diagrams/sequence/SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/sequence/SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio`](diagrams/sequence/SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio)  
> **Berkas Sumber PlantUML:** [`docs/diagrams/sequence/PlantUML/SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.puml`](diagrams/sequence/PlantUML/SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.puml)

#### 7.4.3 SD-11: Analisis Suara Bernyanyi AI
Memetakan pertukaran pesan asinkron (*asynchronous worker queue*) antara Pengguna, Report View, AnalysisController, Singing AI Engine, dan Vocal Report Database:

![Sequence Diagram SD-11 Analisis Suara Bernyanyi AI](diagrams/sequence/SD-11_Analisis_Suara_Bernyanyi_AI.png)

> **Berkas Mentah Draw.io:** [`docs/diagrams/sequence/SD-11_Analisis_Suara_Bernyanyi_AI.drawio`](diagrams/sequence/SD-11_Analisis_Suara_Bernyanyi_AI.drawio)  
> **Berkas Sumber PlantUML:** [`docs/diagrams/sequence/PlantUML/SD-11_Analisis_Suara_Bernyanyi_AI.puml`](diagrams/sequence/PlantUML/SD-11_Analisis_Suara_Bernyanyi_AI.puml)
