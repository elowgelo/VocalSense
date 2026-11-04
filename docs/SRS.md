# Software Requirements Specification (SRS)
## VocalSense AI: Platform Analisis Suara Bernyanyi dan Bimbingan Latihan Vokal Cerdas (AI Singing & Vocal Trainer)

---

## 1. Pendahuluan

### 1.1 Tujuan
Dokumen Software Requirements Specification (SRS) ini bertujuan untuk mendefinisikan secara komprehensif seluruh spesifikasi kebutuhan fungsional dan non-fungsional dari perangkat lunak **VocalSense AI**. Dokumen ini menjadi acuan utama bagi pengembang perangkat lunak (*software engineers*), perancang arsitektur sistem, *UI/UX designer*, penguji kualitas (*QA engineer*), dosen pembimbing, serta pemangku kepentingan (*stakeholders*) dalam mata kuliah Rekayasa Perangkat Lunak (IPPL).

### 1.2 Ruang Lingkup
**VocalSense AI** adalah platform aplikasi berbasis web (*web-based*) responsif yang dirancang khusus untuk membantu siapa saja belajar bernyanyi, melatih teknik vokal, mendeteksi dan memperbaiki nada fals (*pitch accuracy*), memperluas jangkauan vokal (*vocal range*), serta menguasai vibrato dan pernapasan diafragma secara mandiri dengan bantuan kecerdasan buatan (*Artificial Intelligence*), tanpa ketergantungan pada guru vokal privat berbiaya mahal.

Sistem mengadopsi prinsip antarmuka dan komputasi akustik peramban dari platform referensi [Voice Gender Analyzer](https://voicegenderanalyzer.com/), yang memungkinkan analisis suara seketika di peramban secara lokal dan ramah privasi, lalu mengembangkannya secara spesifik untuk kebutuhan pembinaan vokal bernyanyi.

Sistem memungkinkan pengguna untuk:
- Menguji dan mengetahui jangkauan nada vokal (*Vocal Range Finder*) dari nada terendah (*lowest note*) hingga nada tertinggi (*highest note*), serta mengklasifikasikan tipe suara (Bass, Bariton, Tenor, Contralto/Alto, Mezzo-Sopran, Sopran).
- Merekam suara bernyanyi secara langsung melalui antarmuka peramban (*browser*) dengan visualisasi kurva tinggi nada waktu nyata (*live rolling pitch curve visualizer*, 55–880 Hz) di atas tuts piano roll, atau mengunggah berkas rekaman audio vokal.
- Memperoleh analisis multi-parameter bernyanyi secara instan:
  1. **Akurasi Nada & Deviasi Cents (Pitch Accuracy & Cent Deviation):** Pendeteksian notasi nada musik aktual (C3, G4, dll.) dan penandaan nada *Flat* (terlalu rendah) atau *Sharp* (terlalu tinggi).
  2. **Statistik Sesi Akustik (Session Stats):** Median F0 (Hz), Robust Low, Robust High, dan durasi vokal bersuara (*Voiced Time*).
  3. **Keseimbangan Resonansi Vokal (Resonance Balance):** Distribusi energi vokal pada *Chest Voice* (100–400 Hz), *Mask / Mixed Resonance* (400–2000 Hz), dan *Head Voice* (2000–5000 Hz).
  4. **Jangkauan Vokal & Tipe Suara (Vocal Range Finder):** Rentang oktaf dan klasifikasi suara penyanyi.
  5. **Kualitas Vibrato & Penahanan Nada (Vibrato & Sustain):** Pengukuran osilasi vibrato sehat (5–7 Hz), kedalaman modulasi (*vibrato extent*), dan kestabilan penahanan nada (*sustain pitch drift*).
  6. **Kontrol Napas & Dinamika Desibel (Breath Support & Dynamics):** Kestabilan proyeksi volume suara dan kontrol pernapasan diafragma.
  7. **Ketepatan Ketukan Nada (Rhythm & Melodic Timing):** Akurasi ketukan bernyanyi terhadap melodi acuan atau metronom.
- Mengakses Rapor Evaluasi Bernyanyi (*Singing Report Card*) yang dilengkapi *Interactive Piano Roll Visualizer*, *Resonance Balance Chart*, *Radar Chart*, dan rekomendasi latihan vokal terarah.
- Mengelola paket langganan berjenjang (*Freemium Model*):
  - **Tier Free (Gratis - Mirip Pengalaman di Web Referensi):** Tes jangkauan vokal instan, rekaman bernyanyi instan hingga 60 detik, dan visualisasi nada waktu nyata tanpa penyimpanan riwayat rapor.
  - **Tier Pro (Berbayar):** Perekaman bernyanyi hingga 5 menit, penyimpanan permanen rapor evaluasi bernyanyi (*Singing Report Card Archive*), pemutaran audio dengan lompatan nada fals (*Note-Sync Playback*), perbandingan dua sesi bernyanyi berdampingan (*Side-by-Side Pitch & Resonance Comparison*), dan ekspor lembar rapor/sertifikat vokal format PDF.
  - **Tier Premium (Langganan Penuh):** Seluruh fitur Pro + rekaman lagu hingga 15 menit, dasbor pelacakan perluasan jangkauan vokal (*Vocal Range Expansion & Progress Tracking*), kalender *streak* latihan vokal, serta asisten pelatih bernyanyi cerdas (*AI Personalized Vocal Coach & Practice Planner*) yang menyusun kurikulum harian latihan tangga nada (*solfeggio drills* & arpeggio).
- Menyediakan *Admin Management Console* untuk pengawasan transaksi pembayaran langganan, manajemen pengguna, pemantauan utilisasi komputasi AI Audio Engine, serta konfigurasi batas toleransi nada fals platform.

### 1.3 Definisi, Akronim, dan Singkatan
- **SRS:** *Software Requirements Specification* (Spesifikasi Kebutuhan Perangkat Lunak).
- **F0 (Fundamental Frequency):** Frekuensi getaran dasar pita suara manusia yang menentukan tinggi-rendahnya nada suara (*pitch*), diukur dalam satuan Hertz (Hz).
- **Cent:** Satuan logaritmik interval musik, di mana 1 semiton (jarak antar tuts piano bersebelahan) setara dengan 100 cents.
- **Flat:** Kondisi saat nada yang dinyanyikan berada di bawah frekuensi nada target acuan (deviasi negatif lebih dari 20 cents).
- **Sharp:** Kondisi saat nada yang dinyanyikan berada di atas frekuensi nada target acuan (deviasi positif lebih dari 20 cents).
- **In-Tune:** Kondisi nada yang dinyanyikan tepat pada target frekuensi (berada dalam toleransi $\pm$ 20 cents).
- **Resonance Balance:** Distribusi energi akustik pada rentang frekuensi register vokal (Chest: 100–400 Hz, Mask: 400–2000 Hz, Head: 2000–5000 Hz).
- **Vocal Range:** Rentang nada dari nada terendah hingga nada tertinggi yang mampu dihasilkan oleh seorang penyanyi dengan teknik vokal yang sehat.
- **Vibrato:** Modulasi pitch yang berosilasi secara teratur (kecepatan ideal 5–7 Hz dengan amplitudo 50–100 cents) pada nada yang ditahan panjang.
- **Piano Roll Visualizer:** Antarmuka grafis berbentuk tuts piano vertikal dan sumbu waktu horizontal yang memvisualisasikan balok notasi target dan garis kurva nada penyanyi.
- **Solfeggio Drills:** Latihan bernyanyi menggunakan suku kata tangga nada (Do-Re-Mi-Fa-Sol-La-Si-Do) dan arpeggio untuk melatih ketajaman pendengaran (*ear training*) dan penempatan nada (*pitch placement*).
- **LLM (Large Language Model):** Model bahasa AI berskala besar yang digunakan untuk mendiagnosis kelemahan bernyanyi dan menyusun kurikulum latihan vokal personal.
- **Payment Gateway:** Penyedia gerbang pembayaran daring (Midtrans) untuk memproses langganan Pro dan Premium secara otomatis.

---

## 2. Deskripsi Keseluruhan

### 2.1 Perspektif Produk
VocalSense AI beroperasi sebagai aplikasi Software as a Service (SaaS) mandiri berbasis Cloud. Sistem ini berinteraksi dengan:
- **Web Audio API:** Antarmuka bawaan peramban klien untuk menangkap sinyal audio dari mikrofon perangkat pengguna secara *real-time* dan merender kurva nada (*pitch curve*).
- **AI Singing Audio Processing Engine:** Layanan backend komputasi pemrosesan sinyal suara (`librosa`, `scipy`, algoritma pelacak pitch YIN/PYIN / CREPE) untuk ekstraksi F0, konversi Hz ke notasi musik, deteksi flat/sharp, dan kalkulasi vibrato.
- **LLM Provider (Google Gemini API):** Layanan kecerdasan buatan untuk menganalisis histori rapor bernyanyi pengguna dan menyusun kurikulum vokal harian adaptif (*AI Vocal Coach Planner*).
- **Payment Gateway API (Midtrans):** Layanan gerbang pembayaran daring untuk memproses transaksi paket Pro dan Premium melalui Virtual Account, E-Wallet (GoPay, QRIS), dan Kartu Kredit.
- **Cloud Storage (S3 / MinIO / Supabase):** Media penyimpanan awan terenkripsi untuk menampung berkas rekaman audio bernyanyi pengguna berbayar dan arsip berkas sertifikat/rapor PDF.

### 2.2 Klasifikasi Pengguna
Sistem dirancang untuk melayani kategori pengguna berikut:
1. **Pengguna Publik / Tamu (Guest User):** Pengguna tanpa akun yang dapat mencoba tes jangkauan vokal instan atau latihan menyanyi singkat (maksimal 60 detik) dengan visualisasi kurva pitch langsung tanpa penyimpanan rapor.
2. **Pengguna Terdaftar - Free Tier:** Pengguna yang memiliki akun terdaftar namun belum berlangganan. Mendapatkan kuota tes vokal harian dan tuner mikrofon.
3. **Pengguna Berbayar - Pro Tier:** Penyanyi yang berlangganan fitur penyimpanan rapor bernyanyi (*Singing Report Card Archive*), pemutaran ulang rekaman berdurasi hingga 5 menit dengan sinkronisasi nada fals (*Note-Sync Playback*), perbandingan dua sesi rekaman berdampingan, dan ekspor sertifikat/rapor format PDF.
4. **Pengguna Berbayar - Premium Tier:** Penyanyi dengan hak akses tertinggi yang menikmati durasi rekaman hingga 15 menit, dasbor pelacakan perluasan jangkauan vokal (*Progress Tracking & Vocal Range Expansion*), kalender *streak* latihan vokal, serta modul kurikulum latihan tangga nada terarah dari *AI Vocal Coach & Practice Planner*.
5. **Administrator:** Pengelola sistem yang memantau analitik keuangan platform, mengawasi status keaktifan pengguna, memantau beban komputasi AI Audio Engine, serta mengatur ambang batas toleransi nada fals.

### 2.3 Lingkungan Operasi
- **Sisi Klien (Frontend):** Peramban web modern yang mendukung HTML5 Web Audio API dan MediaRecorder API (Google Chrome ver 90+, Mozilla Firefox ver 88+, Microsoft Edge ver 90+, Safari ver 14+).
- **Sisi Server (Backend):** Lingkungan Node.js/FastAPI pada server Linux Ubuntu 22.04 LTS atau Windows Server dengan konektivitas stabil.
- **Mesin Komputasi AI:** Python 3.10+ dengan pustaka pemrosesan audio (`librosa`, `soundfile`, `scipy`, `numpy`, algoritma YIN/CREPE).
- **Basis Data:** PostgreSQL 15+ untuk integritas data transaksional dan riwayat penilaian vokal, didukung Redis 7+ untuk antrian pemrosesan audio (*job queue*).

### 2.4 Batasan Desain dan Implementasi
- Pengguna wajib memberikan izin akses peramban (*browser microphone permission*) agar fitur perekaman vokal dan tuner dapat berfungsi.
- Kualitas tangkapan nada vokal dipengaruhi oleh sensitivitas mikrofon dan kebisingan ruangan (*ambient noise*). Sistem menyediakan modul kalibrasi desibel awal dan *noise suppression*.
- Berkas audio rekaman pada tier Free tidak disimpan ke dalam server untuk menghemat kapasitas penyimpanan dan menjaga privasi pengguna.

### 2.5 Use Case Diagram
Berikut adalah diagram Use Case sistem VocalSense AI yang memetakan 24 fungsi operasional utama dengan aktor Pengguna (Tamu, Free, Pro, Premium), Administrator, serta sistem eksternal (Payment Gateway Midtrans & AI LLM Coach Google Gemini):

![Use Case Diagram VocalSense AI](diagrams/usecase/usecase_diagram_vocal_sense.png)

> **Berkas Mentah Draw.io:** Berkas diagram vektor yang dapat diedit langsung menggunakan Draw.io / diagrams.net tersimpan pada:  
> [`docs/diagrams/usecase/usecase_diagram_vocal_sense.drawio`](diagrams/usecase/usecase_diagram_vocal_sense.drawio)

---

## 3. Kebutuhan Fungsional (Functional Requirements)

Kebutuhan fungsional dijabarkan menjadi 24 poin spesifikasi yang dipetakan secara 1-to-1 dengan 24 Use Case sistem:

### 3.1 Manajemen Akun, Keamanan & Profil Vokal
- **FR-001 [Registrasi Akun Pengguna]:** Sistem harus memungkinkan calon penyanyi mendaftar akun baru dengan nama, email, dan kata sandi yang aman.
- **FR-002 [Autentikasi Pengguna & JWT]:** Sistem harus memvalidasi kredensial login dan menerbitkan token sesi JWT (*HttpOnly cookie*).
- **FR-003 [Single Sign-On Google OAuth]:** Sistem harus menyediakan opsi masuk cepat menggunakan akun Google OAuth 2.0.
- **FR-004 [Pemulihan & Reset Kata Sandi]:** Sistem harus menyediakan fasilitas pengiriman tautan token reset kata sandi ke email terdaftar pengguna.
- **FR-005 [Pengelolaan Profil Vokal & Preferensi]:** Pengguna harus dapat memperbarui data profil, foto avatar, tipe suara target, serta genre vokal bernyanyi favorit.

### 3.2 Kalibrasi, Pengujian Vokal & Perekaman Bernyanyi
- **FR-006 [Tuner & Kalibrasi Nada Dasar]:** Sistem harus menyediakan modul *Chromatic Tuner* digital dan kalibrasi ambang batas kebisingan (*ambient noise gate*) mikrofon pengguna.
- **FR-007 [Tes Jangkauan Vokal (Vocal Range Finder)]:** Sistem harus memandu pengujian nada terendah dan tertinggi yang dapat dicapai penyanyi secara stabil serta mengklasifikasikan tipe suaranya (Bass, Bariton, Tenor, Alto, Mezzo-Sopran, Sopran).
- **FR-008 [Perekaman Bernyanyi & Pitch Visualizer]:** Sistem harus merekam suara vokal via Web Audio API dengan visualisasi kurva nada waktu nyata (*live pitch curve*) di atas tuts piano roll.
- **FR-009 [Pengunggahan Berkas Audio Bernyanyi]:** Sistem harus mengizinkan pengunggahan berkas rekaman vokal bernyanyi eksternal format WAV, MP3, atau M4A (maksimal 25 MB).
- **FR-010 [Pemutaran Ulang & Pemangkasan Vokal]:** Sistem harus menyediakan bilah visual untuk memangkas jeda hening kosong di awal dan akhir rekaman lagu.

### 3.3 Engine Analisis Suara Bernyanyi AI & Rapor Piano Roll
- **FR-011 [Analisis Suara Bernyanyi Berbasis AI]:** Mesin AI harus mengekstrak notasi nada vokal, deviasi cents, menandai nada fals (*Flat/Sharp*), mengukur osilasi vibrato (5-7 Hz), kestabilan penahanan nada (*sustain*), dan dinamika pernapasan.
- **FR-012 [Penyajian Rapor Bernyanyi & Piano Roll]:** Sistem harus menampilkan Skor Bernyanyi Keseluruhan (0-100), Radar Chart 5 dimensi vokal, kanvas Piano Roll interaktif berkode warna nada, dan saran latihan vokal AI.
- **FR-013 [Pemutaran Audio Terikat Deteksi Nada Fals]:** Pengguna dapat mengklik balok nada fals pada Piano Roll untuk melompatkan pemutaran audio tepat pada detik nada fals tersebut dinyanyikan.

### 3.4 Manajemen Arsip, Ekspor PDF & Komparasi Sesi (Pro & Premium)
- **FR-014 [Penyimpanan Rapor Bernyanyi]:** Sistem harus menyimpan berkas audio rekaman vokal ke Cloud Storage dan menyimpan data rapor ke basis data pengguna Pro/Premium.
- **FR-015 [Ekspor Rapor & Sertifikat Bernyanyi PDF]:** Sistem harus menyediakan fungsi unduh lembar rapor evaluasi bernyanyi resmi dan sertifikat kelulusan uji nada berformat PDF.
- **FR-016 [Perbandingan Sesi Rekaman Berdampingan]:** Sistem harus menyajikan komparasi *side-by-side* kurva nada dan skor antara dua sesi rekaman vokal untuk melihat perkembangan vokal sebelum vs sesudah (*before-after*).
- **FR-017 [Pengelolaan & Penghapusan Arsip Vokal]:** Pengguna berbayar dapat mengorganisasi, menandai rekaman favorit, atau menghapus riwayat rekaman bernyanyi dari penyimpanan.

### 3.5 Pelacakan Progres Bernyanyi & Gamifikasi (Premium Tier)
- **FR-018 [Dasbor Progres & Perluasan Jangkauan Nada]:** Sistem harus menampilkan grafik garis tren peningkatan akurasi nada (*in-tune rate*), penurunan nada fals, dan peta perluasan tuts jangkauan vokal dari minggu ke minggu.
- **FR-019 [Pelacak Streak & Gamifikasi Vokal]:** Sistem harus melacak hari berturut-turut latihan vokal (*daily vocal streak*) dan membuka kunci lencana pencapaian bernyanyi (*milestone badges*).

### 3.6 Modul Asisten Pelatih Vokal Cerdas AI (Premium Tier)
- **FR-020 [Kurikulum Latihan Bernyanyi Personal AI]:** Model AI harus mendiagnosis pola kelemahan bernyanyi dari riwayat rapor pengguna dan menyusun jadwal kurikulum latihan vokal harian 7-30 hari.
- **FR-021 [Sesi Latihan Tangga Nada & Solfeggio Terpandu]:** Sistem harus memandu penyanyi menirukan tangga nada audio piano (Mayor, Minor, Arpeggio, Pentatonik) dan mengevaluasi kepatuhan nada secara *real-time*.

### 3.7 Modul Transaksi & Manajemen Langganan
- **FR-022 [Katalog Paket & Pembayaran Gateway]:** Sistem harus menyajikan perbandingan tier langganan dan memfasilitasi transaksi daring otomatis melalui Payment Gateway (Midtrans).
- **FR-023 [Riwayat Tagihan & Invoice Langganan]:** Sistem harus menyajikan riwayat faktur tagihan, status transaksi (*settled/pending*), bukti bayar PDF, dan pengaturan opsi perpanjangan otomatis.

### 3.8 Modul Administrasi & Pemantauan Sistem (Administrator)
- **FR-024 [Manajemen Pengguna, Analitik & Sistem Admin]:** Administrator dapat mengawasi akun pengguna, menyesuaikan tier secara manual, melihat laporan omset pendapatan, memantau utilisasi komputasi AI Audio Engine, serta mengatur ambang batas toleransi deviasi cents nada fals.

---

## 4. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 4.1 Keamanan (Security)
- Semua komunikasi audio dan data antara browser klien dan server wajib menggunakan protokol terenkripsi HTTPS / WSS.
- Kata sandi pengguna wajib di-hash menggunakan algoritma *bcrypt* dengan *salt rounds* minimal 10 sebelum disimpan ke basis data.
- Berkas rekaman audio bernyanyi pengguna berbayar pada Cloud Storage harus dilindungi dengan URL bertanda tangan (*Pre-signed URL*) berbatas waktu (maksimal 60 menit) untuk mencegah akses tanpa hak.
- Token autentikasi JWT harus memiliki masa kedaluwarsa (*expiry time*) dan disimpan secara aman pada *HttpOnly cookie*.

### 4.2 Kinerja dan Waktu Respons (Performance)
- Komputasi ekstraksi nada, deteksi cents, dan evaluasi vibrato untuk rekaman audio berdurasi 60 detik tidak boleh melebihi 4 detik pada koneksi internet standar.
- Antarmuka visualisasi nada waktu nyata (*live pitch curve oscilloscope*) harus beroperasi secara mulus dengan frame rate minimal 30 Frame Per Second (FPS).
- Penyerahan kurikulum latihan vokal adaptif oleh modul *AI Vocal Coach* harus selesai dalam kurun waktu kurang dari 4 detik.

### 4.3 Ketersediaan dan Keandalan (Availability & Reliability)
- Layanan aplikasi ditargetkan mencapai ketersediaan (*uptime*) minimal 99.5% setiap bulan.
- Antrian pemrosesan audio bernyanyi (*Singing Audio Job Queue*) pada Redis harus menggunakan mekanisme *retry* otomatis hingga 3 kali apabila terjadi kegagalan pada mesin AI tanpa menyebabkan peladen utama terhenti (*crash*).

### 4.4 Kemudahan Akses dan Kompatibilitas (Usability & Accessibility)
- Antarmuka aplikasi harus sepenuhnya responsif dan beradaptasi secara optimal pada resolusi layar ponsel cerdas (*Mobile* 360px+), tablet (*Tablet* 768px+), dan komputer meja (*Desktop* 1024px+).
- Kanvas visualisasi Piano Roll harus menyediakan skema warna berstandar kontras tinggi (WCAG 2.1 AA) agar nada tepat (*in-tune*) dan nada fals (*flat/sharp*) mudah dibedakan oleh penyanyi dalam berbagai kondisi pencahayaan.
- Petunjuk latihan vokal bernyanyi harus disajikan dengan bahasa yang ramah, jelas, dan menyertakan sampel audio acuan nada agar mudah dipahami oleh pemula.
