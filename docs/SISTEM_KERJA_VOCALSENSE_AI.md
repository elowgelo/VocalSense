# BLUEPRINTS PENGEMBANGAN: SISTEM KERJA VOCALSENSE AI
**Dokumen Panduan Arsitektur, Alur Kerja, Algoritma DSP, dan Rencana Pengembangan**  
*Versi: 1.0 — Panduan Teknis & Konseptual Pengembang*

---

## 1. PENDAHULUAN & VISI PRODUK

### 1.1 Latar Belakang
Banyak orang ingin belajar bernyanyi atau melatih kualitas vokal mereka, namun les vokal privat (*vocal coach*) membutuhkan biaya yang sangat mahal dan jadwal yang kaku. Di sisi lain, aplikasi latihan vokal yang ada di pasaran umumnya hanya berfokus pada tes nada instan sederhana (seperti pendeteksi frekuensi dasar atau penganalisis gender suara biasa) tanpa memberikan **umpan balik diagnostik yang mendalam, visualisasi kesalahan nada secara interaktif, dan rencana latihan yang terstruktur**.

**VocalSense AI** hadir sebagai *AI-Powered Interactive Singing Vocal Trainer & Coach* berbasis web. Aplikasi ini memungkinkan pengguna untuk:
1. Mengetahui tipe dan jangkauan vokal alaminya (*Vocal Range Finder*).
2. Bernyanyi dengan panduan visualisasi nada waktu nyata (*Real-time Pitch Visualizer*).
3. Menganalisis akurasi nada hingga satuan **Cents**, mendeteksi nada fals (*flat/sharp*), kestabilan suara, dan kualitas vibrato menggunakan algoritma *Digital Signal Processing* (DSP).
4. Memeriksa kesalahan nada pada kanvas **Piano Roll Interaktif** dan **memutar ulang suara rekaman persis di detik nada yang fals**.
5. Menerima evaluasi alami dan silabus latihan tangga nada (*solfeggio drills*) harian yang dirancang personal oleh **Google Gemini AI Engine**.

---

## 2. ARSITEKTUR TIER PENGGUNA (BUSINESS & ACCESS MODEL)

Sistem dirancang dengan model *Freemium* yang terintegrasi dengan Payment Gateway (Midtrans):

```
+---------------------------------------------------------------------------------+
|                                 TIER PENGGUNA                                   |
+-----------------------+-------------------------+-------------------------------+
|       FREE TIER       |        PRO TIER         |         PREMIUM TIER          |
+-----------------------+-------------------------+-------------------------------+
| - Tuner & Kalibrasi   | Semua fitur Free, plus: | Semua fitur Pro, plus:        |
| - Tes Vocal Range     | - Simpan Rapor Nyanyi   | - Dasbor Progres Mingguan     |
| - Rekam Vokal (10s)   |   Permanen ke Akun      |   & Bulanan (Trend Chart)     |
| - Analisis Dasar AI   | - Putar Audio Terikat   | - AI Practice Planner &       |
| - Rapor Sementara     |   Nada Fals (Note-Sync) |   Kurikulum Solfeggio Cerdas  |
|   (Hilang saat reload)| - Ekspor Lembar Rapor & | - Latihan Tangga Nada Terbimbing|
|                       |   Sertifikat PDF Resmi  | - Pelacakan Streak & Badges   |
|                       | - Kuota rekam s.d 60s   | - Kuota rekam s.d 180s        |
+-----------------------+-------------------------+-------------------------------+
```

---

## 3. ARSITEKTUR TEKNIS SISTEM

Sistem VocalSense AI dibangun menggunakan arsitektur modern berbasis layanan:

```
[Frontend Web App (Next.js / React)]
         |
         +--> [Web Audio API & AudioWorklet] (Tangkap Mic & Real-time Pitch Visualizer)
         |
         +--> [REST API (FastAPI / Python)]
                     |
                     +--> [DSP Audio Processing Engine (YIN / PYIN)] (F0, Cents, Vibrato, dB)
                     |
                     +--> [Google Gemini AI Engine] (Diagnosis Akustik & Silabus Latihan)
                     |
                     +--> [PostgreSQL Database] (User, Vocal Profile, Reports, Notes)
                     |
                     +--> [Cloud Storage] (Audio Blobs & PDF Exports)
                     |
                     +--> [Midtrans Snap API] (Payment Gateway & Subscriptions)
```

### 3.1 Lapisan Frontend (Antarmuka Pengguna & Web Audio)
* **Web Audio API (`AudioContext`, `AnalyserNode`, `MediaRecorder`):** Menangkap sinyal mikrofon pengguna langsung dari peramban tanpa latensi tinggi.
* **Canvas Pitch Roll:** Merender kurva gelombang suara yang mengalir di atas garis notasi balok saat pengguna sedang bernyanyi.
* **Interactive Piano Roll Canvas:** Menampilkan tuts piano vertikal (C2 hingga C6) dan balok-balok nada berwarna yang merepresentasikan nada yang dinyanyikan pengguna dibandingkan dengan nada target.
* **Radar Chart:** Visualisasi 5 dimensi kemampuan vokal pengguna.

### 3.2 Lapisan Backend API & DSP Worker
* **Framework:** Python FastAPI (sangat ideal karena performa tinggi *asynchronous* dan integrasi *native* dengan library audio numerik).
* **Ekstraksi Sinyal Digital (DSP):** Menggunakan `numpy`, `scipy`, dan algoritma `YIN/PYIN` untuk mengekstrak frekuensi fundamental ($F_0$) per frame audio 20–40 milidetik.
* **Kalkulator Akustik:** Menghitung deviasi frekuensi (*Cents*), kestabilan (*Jitter*), kedalaman & kecepatan modulasi (*Vibrato Rate/Depth*), serta energi RMS.

### 3.3 Lapisan Kecerdasan Buatan (Google Gemini AI)
* Menerima *payload* metrik numerik hasil komputasi DSP.
* Menganalisis pola kelemahan vokal (misalnya: pengguna sering *flat* pada perpindahan dari *chest voice* ke *head voice*).
* Menghasilkan teks saran bimbingan yang ramah, konstruktif, serta menyusun silabus latihan bertahap (7 hingga 30 hari).

---

## 4. STANDAR ILMIAH & FORMULA MATEMATIS KUALITAS VOKAL

Agar implementasi kode tidak membingungkan (*no miss-develop*), berikut adalah rumus dan standar kuantitatif yang digunakan:

### 4.1 Ekstraksi Frekuensi Fundamental ($F_0$) — Algoritma YIN
Algoritma YIN bekerja pada domain waktu dengan fungsi beda rata-rata kumulatif (*Cumulative Mean Normalized Difference Function - CMNDF*):
Di mana lag $\tau$ yang menghasilkan nilai minimum di bawah ambang batas (*threshold* $\approx 0.1$) dipilih sebagai periode fundamental nada, sehingga frekuensi diperoleh melalui:

$$F_0 = \frac{\text{Sample Rate}}{\tau}$$

### 4.2 Konversi Frekuensi ke Pitch Standar MIDI & Notasi Musik
Setiap frekuensi vokal ($F_0$ dalam Hertz) dikonversi ke nomor nada MIDI ($m$):

$$m = 69 + 12 \cdot \log_2\left(\frac{F_0}{440}\right)$$

* Contoh: $F_0 = 440\text{ Hz} \rightarrow m = 69$ (Nada **A4**).
* Contoh: $F_0 = 261.63\text{ Hz} \rightarrow m = 60$ (Nada **C4 / Middle C**).

### 4.3 Perhitungan Deviasi Cents (Deteksi Nada Fals)
Deviasi akurasi nada dihitung antara frekuensi yang dinyanyikan ($f_{\text{vokal}}$) terhadap frekuensi nada target ideal ($f_{\text{target}}$):

$$\text{Cents} = 1200 \cdot \log_2\left(\frac{f_{\text{vokal}}}{f_{\text{target}}}\right)$$

* **In-Tune (Tepat Nada):** $|\text{Cents}| \le 25\text{ cents}$ (Zona nada akurat).
* **Flat (Fals Rendah / Kedodoran):** $\text{Cents} < -25\text{ cents}$ (Suara lebih rendah dari nada aslinya).
* **Sharp (Fals Tinggi / Kencang):** $\text{Cents} > +25\text{ cents}$ (Suara tegang melebihi nada target).

### 4.4 Kualitas Vibrato
Vibrato dianalisis pada segmen nada panjang (*sustained note* $\ge 0.8\text{ detik}$):
1. **Vibrato Rate (Frekuensi Modulasi):** Dihitung dari jarak antar puncak gelombang frekuensi.  
   $$\text{Standar Ideal} = 5.0\text{ Hz} - 7.0\text{ Hz}$$
2. **Vibrato Extent/Depth (Kedalaman Ayunan):** Dihitung dari selisih puncak dan lembah nada.  
   $$\text{Standar Ideal} = \pm 50\text{ s/d }\pm 80\text{ Cents}$$

### 4.5 Rumus Skor Total Bernyanyi (0 – 100)
Skor akhir dikalkulasi dengan bobot matriks:

$$\text{Total Score} = (0.40 \cdot S_{\text{pitch}}) + (0.20 \cdot S_{\text{stability}}) + (0.15 \cdot S_{\text{dynamics}}) + (0.15 \cdot S_{\text{vibrato}}) + (0.10 \cdot S_{\text{rhythm}})$$

* **Grade S (90–100):** *Master / Pro Vocalist*
* **Grade A (80–89):** *Advanced Singer*
* **Grade B (70–79):** *Intermediate Singer*
* **Grade C (60–69):** *Developing Singer*
* **Grade D (<60):** *Needs Basic Pitch Training*

---

## 5. ALUR KERJA UJUNG KE UJUNG (END-TO-END WORKFLOW)

### Tahap 1: Onboarding & Kalibrasi Mikrofon (UC-01 s/d UC-06)
1. Pengguna masuk ke sistem (Email/Password atau Google OAuth).
2. Membuka menu Tuner untuk memastikan izin mikrofon aktif.
3. Sistem mendengarkan suara sekitar selama 2 detik untuk mengukur *ambient noise floor*. Jika desibel lingkungan terlalu tinggi, pengguna diberi tahu agar mencari tempat yang lebih tenang.

### Tahap 2: Tes Jangkauan Vokal / Range Finder (UC-07)
1. Sistem membunyikan nada panduan terendah melalui Web Audio synthesizer.
2. Pengguna menyuarakan vokal *"Aah"* serendah mungkin yang masih nyaman dan stabil. Sistem mengunci nada $F_{\min}$ (misal: C3).
3. Sistem membunyikan nada panduan tertinggi. Pengguna menyuarakan nada tertinggi yang mampu dicapai. Sistem mengunci nada $F_{\max}$ (misal: A4).
4. Sistem memetakan rentang tersebut ke klasifikasi suara (*Voice Classification*):
   * **Bass:** E2 – E4
   * **Baritone:** A2 – A4
   * **Tenor:** C3 – C5
   * **Contralto:** F3 – F5
   * **Mezzo-Soprano:** A3 – A5
   * **Soprano:** C4 – C6
5. Hasil disimpan ke profil pengguna sebagai acuan rekomendasi lagu dan kurikulum latihan.

### Tahap 3: Sesi Bernyanyi & Perekaman (UC-08 s/d UC-10)
1. Pengguna memilih lagu latihan atau memilih mode vokal bebas (*Free Singing Mode*).
2. Pengguna menekan tombol **Mulai Rekam**.
3. Sinyal audio ditangkap oleh `MediaRecorder` sekaligus dialirkan ke `AnalyserNode` peramban. Layar menampilkan garis nada yang meluncur waktu nyata (*pitch monitor*).
4. Setelah selesai, berkas audio sementara disimpan dalam bentuk *Blob*.
5. Pengguna diarahkan ke layar pemangkas vokal (*Vocal Trimmer*) untuk memotong detik hening di awal atau di akhir rekaman.

### Tahap 4: Pipeline Komputasi DSP & AI Diagnosis (UC-11)
1. Berkas audio bersih dikirim ke endpoint `/api/voice/analyze-singing`.
2. Worker memecah audio menjadi *frames* (panjang jendela 2048 sampel, *hop size* 512 sampel).
3. Algoritma YIN mendeteksi $F_0$ pada tiap frame yang bersuara (*voiced frames*).
4. Tiap frame dipetakan ke notasi musik target, menghitung deviasi Cents, kestabilan nada, dan modulasi vibrato.
5. Rangkuman data numerik dikirim ke **Google Gemini API** dengan prompt berformat terstruktur:
   * *Input:* Profil vokal, nada target, persentase deviasi Cents, daftar stempel waktu (*timestamps*) nada fals, dan nilai RMS.
   * *Output:* Analisis kelemahan vokal, pujian pada bagian yang sudah baik, serta saran teknik pernapasan / artikulasi.

### Tahap 5: Rapor Bernyanyi & Audio Sync (UC-12 s/d UC-15)
1. Pengguna melihat skor total (misal: 84 / Grade A) dan Radar Chart 5 dimensi.
2. **Piano Roll Interaktif:** Pengguna dapat men-scroll garis waktu lagu. Tiap balok nada memperlihatkan deviasi cents (contoh: $+34\text{ cents}$).
3. **Audio-Sync Playback (Fitur Pro):** Saat pengguna mengklik balok nada fals tersebut, pemutar audio otomatis melompat (*seek*) ke detik tersebut dan memutar rekaman suara pengguna tepat pada saat nada fals terjadi. Pengguna bisa langsung mendengar sendiri bagaimana suaranya terdengar fals.
4. Pengguna Pro/Premium dapat menyimpan rapor ke arsip akun dan mengunduh sertifikat/lembar evaluasi berformat PDF.

### Tahap 6: Kurikulum Cerdas & Latihan Terpandu (UC-17 s/d UC-20)
1. Pengguna Premium dapat membuka menu **AI Practice Planner**.
2. Gemini AI membaca riwayat 5 sesi rekaman terakhir pengguna dan mendeteksi kelemahan berulang (misal: sering *flat* saat nada berpindah cepat).
3. AI membuatkan jadwal latihan 7–14 hari yang berisi latihan tangga nada bertahap (*solfeggio drills*).
4. Pengguna menjalankan modul latihan tangga nada interaktif langsung di aplikasi: sistem memainkan nada piano panduan $\rightarrow$ pengguna menirukan $\rightarrow$ sistem memberi feedback instan apakah nada pengguna tepat atau meleset.
5. Setiap kali pengguna berlatih, sistem menambah hitungan *Streak Harian* dan membuka lencana pencapaian (*Badges*).

---

## 6. SKEMA DATABASE UTAMA (RELATIONAL SCHEMA)

```sql
-- Tabel Pengguna & Profil Vokal
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    full_name VARCHAR(100),
    vocal_type VARCHAR(50), -- 'Tenor', 'Soprano', etc.
    lowest_note VARCHAR(10), -- 'C3'
    highest_note VARCHAR(10), -- 'A4'
    current_tier VARCHAR(20) DEFAULT 'FREE', -- 'FREE', 'PRO', 'PREMIUM'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Transaksi & Langganan (Midtrans)
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'PRO_MONTHLY', 'PREMIUM_YEARLY'
    midtrans_order_id VARCHAR(100) UNIQUE NOT NULL,
    transaction_status VARCHAR(50) NOT NULL, -- 'settlement', 'pending', 'expire'
    amount DECIMAL(12, 2) NOT NULL,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

-- Tabel Rapor Bernyanyi
CREATE TABLE vocal_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_title VARCHAR(150),
    audio_file_url TEXT,
    duration_seconds FLOAT,
    overall_score INT, -- 0 - 100
    grade VARCHAR(5), -- 'S', 'A', 'B', 'C', 'D'
    pitch_accuracy_score INT,
    stability_score INT,
    vibrato_score INT,
    dynamics_score INT,
    ai_feedback_text TEXT,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Detail Balok Nada Piano Roll
CREATE TABLE vocal_report_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_id UUID REFERENCES vocal_reports(id) ON DELETE CASCADE,
    start_time FLOAT NOT NULL,
    end_time FLOAT NOT NULL,
    target_note VARCHAR(10) NOT NULL,
    sung_freq_hz FLOAT NOT NULL,
    cents_deviation FLOAT NOT NULL,
    status VARCHAR(20) NOT NULL -- 'IN_TUNE', 'FLAT', 'SHARP'
);

-- Tabel Kurikulum Latihan Personal AI
CREATE TABLE user_curriculums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150),
    target_focus VARCHAR(100),
    syllabus_json JSONB,
    start_date DATE,
    completion_percentage INT DEFAULT 0
);
```

---

## 7. CHECKLIST PENGEMBANGAN (AGAR TIDAK MISS-DEVELOP)

Untuk memastikan implementasi kode berjalan mulus tanpa ada fitur yang terlewat atau salah arah:

- [ ] **Sprint 1: DSP Engine & Pitch Detector**
  - Implementasi algoritma YIN di Python (`scipy`/`numpy`) untuk mendeteksi frekuensi dasar $F_0$.
  - Fungsi konversi frekuensi ke notasi musik dan perhitungan deviasi Cents.
  - Unit test validasi: Masukkan berkas audio gelombang sinus 440 Hz murni $\rightarrow$ output harus nada A4 dengan deviasi 0 cents.

- [ ] **Sprint 2: Web Audio Recording & Visualizer**
  - Implementasi `MediaRecorder` dan `AudioContext` di Next.js/React.
  - Komponen kanvas *Live Pitch Monitor* (mengalir saat rekaman berjalan).
  - Komponen *Waveform Trimmer* menggunakan WaveSurfer.js.

- [ ] **Sprint 3: Piano Roll Canvas & Audio-Sync Playback**
  - Pembuatan komponen kanvas Piano Roll (sumbu Y = nada C2–C6, sumbu X = garis waktu).
  - Logika klik balok nada $\rightarrow$ memicu *seek* audio player ke `start_time` balok nada yang dipilih.
  - Komponen Radar Chart 5 dimensi metrik akustik.

- [ ] **Sprint 4: AI Diagnosis & Prompt Engineering Gemini**
  - Integrasi SDK Google Gemini API.
  - Perancangan template prompt yang mengonversi JSON metrik akustik ke bahasa umpan balik vokal alami.
  - Generator kurikulum latihan tangga nada terstruktur.

- [ ] **Sprint 5: Autentikasi, Paywall, & Integrasi Midtrans**
  - Sistem login JWT & Google OAuth.
  - Pembatasan hak akses (*Authorization Middleware*): Free vs Pro vs Premium.
  - Integrasi Midtrans Snap API & Webhook handler untuk *auto-upgrade tier*.

- [ ] **Sprint 6: Gamifikasi & Ekspor Dokumen**
  - Perhitungan *Daily Streak* dan pembukaan kunci lencana (*Badges*).
  - Kompilasi berkas PDF laporan resmi (menggunakan Puppeteer / ReportLab).

---
*Dokumen ini dapat dibaca kapan saja di folder docs/ dan menjadi kompas pengembangan teknis kita ke depan.*
