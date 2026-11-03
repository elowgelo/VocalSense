# Tugas Besar IPPL: VocalSense AI (AI-Powered Vocal & Singing Trainer Platform)

## 1. Visi & Konsep Produk (Benchmark Referensi: https://voicegenderanalyzer.com/)
VocalSense AI adalah aplikasi cerdas berbasis web responsif yang terinspirasi langsung oleh keunggulan arsitektur dan kemudahan akses dari platform referensi [Voice Gender Analyzer](https://voicegenderanalyzer.com/). Seperti halnya situs referensi tersebut, VocalSense AI mengutamakan:
1. **Akses Instan & Ramah Privasi di Peramban (*In-Browser Local Processing*)**: Pengguna dapat langsung mencoba menganalisis suara melalui mikrofon peramban (*Web Audio API*) secara *real-time* tanpa keharusan mendaftar atau mengunggah berkas di awal.
2. **Visualisasi Kurva Nada Waktu Nyata (*Live Rolling Pitch Curve*)**: Menampilkan grafik kurva tinggi nada bergerak (*continuous 10-second window*, rentang frekuensi 55 Hz – 880 Hz) yang merespons vokal pengguna seketika.
3. **Ekstraksi Parameter Akustik Tingkat Lanjut (*Advanced Acoustic Cues*)**: Mengadopsi algoritma pelacak nada YIN, estimasi frekuensi F0, statistik sesi (Median F0, Robust Low, Robust High, Voiced Time), serta keseimbangan resonansi vokal multi-band (*Resonance Balance*).

VocalSense AI mengkhususkan dan menyempurnakan teknologi akustik tersebut ke dalam ranah **Pelatihan Vokal & Bernyanyi (*Singing & Vocal Trainer*)**, membantu siapa saja belajar bernyanyi tepat nada (*in-tune*), mengatasi nada fals (*flat/sharp*), memperluas jangkauan nada (*vocal range*), serta menguasai register suara (Chest, Mask/Mixed, Head Voice) secara mandiri.

---

## 2. Parameter Analisis Suara Bernyanyi (AI Singing Analytics)
1. **Akurasi Nada & Deteksi Fals (Pitch Accuracy & Cent Deviation)**:
   - Mendeteksi notasi musik aktual yang dinyanyikan (misal: C3, G4, A#4) dan frekuensi F0 (Hz).
   - Menghitung deviasi nada dalam satuan Cents ($\pm$ 50 cents) dan menandai nada yang *Flat* (terlalu rendah) atau *Sharp* (terlalu tinggi).
2. **Statistik Sesi & Jangkauan Vokal (Session Stats & Vocal Range Finder)**:
   - Mengukur Median F0, Robust Low, Robust High, serta durasi vokal bersuara (*Voiced Time*).
   - Mengukur nada terendah (*lowest note*) dan nada tertinggi (*highest note*) yang dapat dijangkau secara stabil.
   - Mengklasifikasikan tipe suara penyanyi: Bass, Bariton, Tenor (Pria); Contralto/Alto, Mezzo-Sopran, Sopran (Wanita).
3. **Keseimbangan Resonansi Vokal (Resonance Balance - Sesuai Referensi)**:
   - **Chest Voice (100 – 400 Hz)**: Kekuatan dan resonansi suara dada pada nada-nada rendah/fondasi.
   - **Mask / Mixed Resonance (400 – 2000 Hz)**: Resonansi area wajah/pharyngeal untuk penempatan nada menengah (*mix voice*).
   - **Head Voice (2000 – 5000 Hz)**: Resonansi nada tinggi dan kecerahan spektral (*vocal ring / singer's formant*).
4. **Kualitas Vibrato & Kestabilan Penahanan Nada (Vibrato & Sustain)**:
   - Mengukur kecepatan osilasi vibrato sehat (5–7 Hz) dan kedalaman modulasi vibrato (*vibrato extent*).
   - Mengukur kestabilan menahan nada panjang (*sustain pitch drift*).
5. **Kontrol Napas & Dinamika Volume (Breath Support & Dynamics)**:
   - Mengukur stabilitas desibel (dB), kontrol pernapasan diafragma, dan kelancaran transisi volume (*crescendo* ke *decrescendo*).
6. **Ketukan Irama & Tempo Melodi (Rhythm & Timing Precision)**:
   - Mengukur kepatuhan tempo terhadap metronom atau nada acuan melodi (*on-beat* vs *late/early*).
7. **Skor Bernyanyi Keseluruhan (Overall Singing Score 0-100)**:
   - Menggabungkan seluruh metrik ke dalam *Radar Chart* bernyanyi dan kanvas *Interactive Piano Roll* beserta rekomendasi latihan vokal praktis.

---

## 3. Tingkatan Akun & Model Bisnis (Freemium Tiers)
1. **Tier Free (Tamu / Pengguna Gratis - Mirip Pengalaman di Web Referensi)**:
   - Akses instan langsung di peramban tanpa wajib login.
   - Tes jangkauan vokal instan (*Vocal Range Finder*).
   - Perekaman suara nyanyi / latihan tangga nada instan (maksimal 60 detik).
   - Visualisasi kurva pitch waktu nyata di layar tanpa penyimpanan rapor riwayat.
2. **Tier Pro (Berbayar - Rapor Nyanyi & Arsip)**:
   - Perekaman nyanyi hingga 5 menit.
   - Penyimpanan rapor evaluasi bernyanyi permanen di akun pengguna (*Singing Report Card Archive*).
   - Pemutaran ulang audio rekaman nyanyi dengan sinkronisasi nada fals di layar (*Note-Sync Playback*).
   - Komparasi sebelum-sesudah (*Side-by-Side Pitch & Resonance Comparison* mirip fitur voice comparison referensi).
   - Unduh sertifikat / lembar evaluasi bernyanyi resmi dalam format PDF.
3. **Tier Premium (Berbayar - Progress Tracking & AI Vocal Coach)**:
   - Semua fitur Pro + perekaman lagu hingga 15 menit.
   - **Progress Tracking & Range Expansion Dashboard**: Grafik pelacakan perluasan jangkauan vokal dari minggu ke minggu, persentase peningkatan nada tepat (*in-tune rate*), tren kestabilan resonansi, dan kalender streak latihan.
   - **AI Personalized Vocal Coach & Practice Planner**: Asisten AI (Google Gemini) yang menganalisis riwayat kelemahan bernyanyi pengguna, kemudian menyusun kurikulum latihan vokal harian (7-30 hari) lengkap dengan materi tangga nada audio (*solfeggio drills*, arpeggio, dan latihan pernapasan).

---

## 4. Struktur Folder Proyek
- `D:\Kuliah\IPPL\docs\`: Seluruh berkas dokumentasi SRS, SDD, diagram Draw.io, dan Word `.docx`. (**Diisolasi dari Git/GitHub**).
- `D:\Kuliah\IPPL\app\`: Kode sumber aplikasi web responsif. (**Repositori Git Mandiri**).
