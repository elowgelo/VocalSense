# Use Case Descriptions
## VocalSense AI: Platform Analisis Suara dan Bimbingan Latihan Vokal Cerdas (AI Singing & Vocal Trainer)

Berikut adalah deskripsi lengkap seluruh 24 Use Case sistem VocalSense AI tanpa menggunakan tabel markdown yang rumit, dirancang khusus untuk domain pelatihan vokal bernyanyi (*singing trainer*) dan mudah disalin-tempel ke dalam laporan resmi (Microsoft Word / Google Docs).

---

### UC-01 Registrasi Akun Pengguna

**Nama use case & id**
UC-01 Registrasi Akun Pengguna

**Deskripsi Singkat**
Use case ini memungkinkan calon penyanyi/pengguna mendaftar akun baru ke dalam sistem VocalSense AI agar dapat menggunakan layanan berjenjang (Free, Pro, Premium).

**Aktor**
Pengguna (Tamu)

**Prasyarat**
- Pengguna memiliki koneksi internet aktif.
- Pengguna belum memiliki akun yang terdaftar dengan alamat email yang sama.

**Alur Utama**
1. Pengguna mengakses halaman utama dan memilih tombol "Daftar".
2. Sistem menampilkan formulir pendaftaran akun (nama lengkap, email, kata sandi, dan konfirmasi kata sandi).
3. Pengguna mengisi data formulir pendaftaran.
4. Pengguna menekan tombol "Buat Akun".
5. Sistem memvalidasi format email dan kecukupan kekuatan kata sandi.
6. Sistem memverifikasi bahwa alamat email belum pernah terdaftar sebelumnya.
7. Sistem mengenkripsi kata sandi dan membuat data pengguna baru dengan tier bawaan "Free".
8. Sistem mengalihkan pengguna ke Dashboard utama dengan sesi login aktif.
9. Use case berakhir.

**Alur Alternatif**
5.1 Format input data tidak valid atau kata sandi tidak cocok.
    5.1.1 Sistem menampilkan pesan galat spesifik pada bidang formulir terkait.
    5.1.2 Pengguna memperbaiki isian.
    5.1.3 Kembali ke langkah 4.
6.1 Email sudah terdaftar sebelumnya.
    6.1.1 Sistem menampilkan pesan bahwa email telah digunakan dan menawarkan tautan masuk (login).
    6.1.2 Pengguna beralih ke formulir masuk.
    6.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Akun pengguna baru berhasil dibuat di basis data dengan peran Free User.
- Pengguna masuk ke sistem dan menerima token sesi.

**Kondisi Akhir gagal**
- Akun gagal dibuat.
- Tidak ada data baru yang tersimpan di basis data.

---

### UC-02 Masuk ke Sistem (Login)

**Nama use case & id**
UC-02 Masuk ke Sistem (Login)

**Deskripsi Singkat**
Use case ini memungkinkan pengguna terdaftar untuk melakukan autentikasi ke dalam sistem menggunakan kredensial email dan kata sandi.

**Aktor**
Pengguna, Administrator

**Prasyarat**
- Pengguna sudah memiliki akun terdaftar yang aktif.

**Alur Utama**
1. Pengguna membuka halaman "Masuk".
2. Sistem menampilkan formulir login (email dan kata sandi).
3. Pengguna memasukkan email dan kata sandi yang valid.
4. Pengguna menekan tombol "Masuk".
5. Sistem memverifikasi kecocokan kredensial dengan rekaman di basis data.
6. Sistem memeriksa status keaktifan akun pengguna.
7. Sistem menghasilkan JWT Token otentikasi.
8. Sistem mengarahkan pengguna ke halaman Dashboard yang sesuai dengan perannya.
9. Use case berakhir.

**Alur Alternatif**
5.1 Email atau kata sandi salah.
    5.1.1 Sistem menampilkan notifikasi peringatan "Email atau kata sandi tidak valid".
    5.1.2 Pengguna memasukkan kembali kredensial.
    5.1.3 Kembali ke langkah 4.
6.1 Status akun ditangguhkan (Suspended).
    6.1.1 Sistem menampilkan pemberitahuan bahwa akun sedang dibekukan oleh admin.
    6.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Pengguna berhasil diautentikasi dan sesi aktif tercipta.

**Kondisi Akhir gagal**
- Autentikasi gagal, sesi tidak diterbitkan.

---

### UC-03 Masuk via Google OAuth (SSO)

**Nama use case & id**
UC-03 Masuk via Google OAuth (SSO)

**Deskripsi Singkat**
Use case ini memungkinkan pengguna masuk atau mendaftar secara instan menggunakan akun Google melalui protokol Single Sign-On (SSO) OAuth 2.0.

**Aktor**
Pengguna (Tamu, Pengguna Terdaftar)

**Prasyarat**
- Pengguna memiliki akun Google aktif.

**Alur Utama**
1. Pengguna memilih tombol "Lanjut dengan Google" pada halaman pendaftaran atau masuk.
2. Sistem mengalihkan pengguna ke halaman consent Google OAuth.
3. Pengguna memilih akun Google dan memberikan izin akses profil dasar serta email.
4. Google merespons dengan Authorization Code ke callback URL VocalSense AI.
5. Sistem menukar Authorization Code dengan Google Identity Token.
6. Sistem memeriksa apakah Google ID atau email sudah ada di basis data:
   - Jika belum ada, sistem secara otomatis membuat akun baru bertier Free.
   - Jika sudah ada, sistem mengambil profil pengguna yang ada.
7. Sistem menerbitkan JWT Session Token aplikasi.
8. Sistem mengarahkan pengguna ke Dashboard.
9. Use case berakhir.

**Alur Alternatif**
3.1 Pengguna membatalkan consent Google.
    3.1.1 Google mengembalikan pengguna ke halaman masuk dengan status dibatalkan.
    3.1.2 Sistem menampilkan pesan: "Autentikasi Google dibatalkan".
    3.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Pengguna berhasil masuk ke sistem menggunakan akun Google.

**Kondisi Akhir gagal**
- Autentikasi OAuth gagal; sesi tidak diterbitkan.

---

### UC-04 Pemulihan Kata Sandi (Forgot & Reset Password)

**Nama use case & id**
UC-04 Pemulihan Kata Sandi (Forgot & Reset Password)

**Deskripsi Singkat**
Use case ini menangani alur pemulihan akun bagi pengguna yang lupa kata sandi dengan mengirimkan tautan reset kata sandi ke email pengguna.

**Aktor**
Pengguna

**Prasyarat**
- Pengguna terdaftar dengan metode email/password (bukan SSO Google).

**Alur Utama**
1. Pengguna membuka tautan "Lupa Kata Sandi?" pada halaman masuk.
2. Sistem menampilkan formulir permohonan reset password (email).
3. Pengguna memasukkan alamat email terdaftar dan menekan tombol "Kirim Tautan Reset".
4. Sistem memeriksa keberadaan email di basis data.
5. Sistem menghasilkan token acak aman dengan batas kedaluwarsa 60 menit.
6. Sistem mengirimkan surel berisi tautan reset password unik.
7. Pengguna membuka surel dan mengklik tautan reset password.
8. Sistem menampilkan halaman formulir kata sandi baru.
9. Pengguna memasukkan kata sandi baru dan konfirmasi kata sandi.
10. Sistem memvalidasi token dan menyimpan hash kata sandi baru.
11. Sistem menampilkan konfirmasi sukses dan mengarahkan pengguna ke halaman login.
12. Use case berakhir.

**Alur Alternatif**
4.1 Email tidak ditemukan dalam basis data.
    4.1.1 Sistem tetap menampilkan pesan sukses generik demi alasan keamanan (mencegah user enumeration).
    4.1.2 Use case berakhir.
10.1 Token reset kedaluwarsa atau tidak valid.
    10.1.1 Sistem menampilkan pesan peringatan bahwa tautan sudah tidak berlaku.
    10.1.2 Pengguna diminta mengajukan ulang permohonan reset.
    10.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Kata sandi akun berhasil diperbarui.

**Kondisi Akhir gagal**
- Kata sandi gagal diubah.

---

### UC-05 Mengelola Profil Vokal & Preferensi Bernyanyi

**Nama use case & id**
UC-05 Mengelola Profil Vokal & Preferensi Bernyanyi

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi mengatur data profil pribadi, mengunggah foto avatar, serta menyetel preferensi vokal seperti tipe suara yang diasumsikan (Bass, Tenor, Alto, Sopran) dan genre musik vokal favorit (Pop, R&B, Rock, Klasik, Jazz).

**Aktor**
Pengguna

**Prasyarat**
- Pengguna telah login ke dalam sistem.

**Alur Utama**
1. Pengguna membuka menu "Pengaturan Profil & Preferensi Vokal".
2. Sistem menyajikan formulir data pengguna dan preferensi bernyanyi.
3. Pengguna memperbarui nama, foto profil, tipe suara target, serta genre bernyanyi yang ingin dilatih.
4. Pengguna menekan tombol "Simpan Perubahan".
5. Sistem memvalidasi kelayakan ukuran berkas gambar avatar (< 2 MB) dan teks masukan.
6. Sistem memperbarui data profil di basis data.
7. Sistem menampilkan notifikasi: "Profil dan preferensi vokal berhasil diperbarui".
8. Use case berakhir.

**Alur Alternatif**
5.1 Berkas avatar bukan format gambar yang valid atau melebihi 2 MB.
    5.1.1 Sistem menampilkan pesan galat spesifik ukuran/format berkas.
    5.1.2 Pengguna memilih berkas yang sesuai.
    5.1.3 Kembali ke langkah 4.

**Kondisi Akhir Sukses**
- Profil dan preferensi vokal penyanyi tersimpan dan menjadi acuan model AI dalam personalisasi feedback.

**Kondisi Akhir gagal**
- Perubahan profil vokal tidak tersimpan.

---

### UC-06 Kalibrasi & Tuner Deteksi Nada Dasar (Chromatic Tuner)

**Nama use case & id**
UC-06 Kalibrasi & Tuner Deteksi Nada Dasar (Chromatic Tuner)

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi menguji sensitivitas mikrofon, mengukur tingkat kebisingan ruangan (*ambient noise*), dan menggunakan *Chromatic Tuner* digital untuk membunyikan suara satu nada lalu mengecek apakah mikrofon menangkap frekuensi nada (misal: 440 Hz = A4) dengan akurat.

**Aktor**
Pengguna

**Prasyarat**
- Perangkat keras mikrofon terhubung dan izin akses mikrofon peramban diaktifkan.

**Alur Utama**
1. Pengguna membuka fitur "Tuner & Kalibrasi Mikrofon" di Studio Latihan.
2. Sistem menampilkan antarmuka *Chromatic Tuner* digital dan meter desibel masukan (*VU meter*).
3. Sistem mendengarkan desibel keheningan ruangan selama 3 detik untuk menetapkan ambang batas *noise gate*.
4. Sistem meminta pengguna menyanyikan satu nada vokal konstan (misal: "Aaaa" pada nada A3/A4).
5. Sistem mengekstraksi frekuensi dasar F0 secara real-time dan menampilkan jarum tuner (menunjukkan nada terdeteksi dan deviasi cents).
6. Sistem menampilkan status kualitas tangkapan suara (Sangat Jernih, Cukup, atau Sinyal Terlalu Lemah/Bising).
7. Sistem mengunci konfigurasi sensitivitas mikrofon untuk sesi rekaman bernyanyi berikutnya.
8. Use case berakhir.

**Alur Alternatif**
4.1 Suara mikrofon tidak terdeteksi sama sekali (sinyal 0 dB).
    4.1.1 Sistem menampilkan peringatan: "Sinyal suara tidak terdeteksi. Periksa koneksi mikrofon Anda".
    4.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Mikrofon terkalibrasi dan tuner nada dasar berfungsi presisi untuk evaluasi bernyanyi.

**Kondisi Akhir gagal**
- Kalibrasi gagal; sistem menggunakan pengaturan standar bawaan.

---

### UC-07 Tes Jangkauan Vokal Mandiri (Vocal Range Finder)

**Nama use case & id**
UC-07 Tes Jangkauan Vokal Mandiri (Vocal Range Finder)

**Deskripsi Singkat**
Use case ini memandu penyanyi melakukan tes vokal terarah untuk menemukan nada terendah (*lowest note*) dan nada tertinggi (*highest note*) yang dapat dinyanyikan secara stabil, kemudian secara otomatis mengklasifikasikan tipe suara (Bass, Bariton, Tenor, Contralto/Alto, Mezzo-Sopran, Sopran).

**Aktor**
Pengguna (Tamu, Free, Pro, Premium)

**Prasyarat**
- Izin mikrofon aktif dan kalibrasi perangkat telah dilakukan.

**Alur Utama**
1. Pengguna memilih menu "Tes Jangkauan Vokal (Vocal Range Finder)".
2. Sistem memainkan nada acuan piano dan menginstruksikan pengguna menyanyikan nada terendah dari dada yang nyaman ("Aaa" turun ke nada rendah).
3. Pengguna menyanyikan nada rendah; sistem mendeteksi nada stabil terendah (misal: E2 atau G3) beserta frekuensinya (Hz).
4. Sistem memainkan nada acuan naik dan menginstruksikan pengguna menyanyikan nada tertinggi tanpa memaksakan pita suara ("Ooo" meluncur ke nada tinggi).
5. Pengguna menyanyikan nada tinggi; sistem mendeteksi nada stabil tertinggi (misal: G4 atau C6).
6. Sistem menghitung rentang vokal total dalam satuan oktaf dan semiton (misal: E2 - G4 = 2.3 Oktaf).
7. Sistem mencocokkan rentang tersebut dengan standar klasifikasi vokal internasional dan menetapkan tipe suara (contoh: "Bariton", "Tenor", atau "Sopran").
8. Sistem menampilkan visualisasi keyboard piano interaktif dengan tuts yang diarsir sesuai jangkauan vokal pengguna.
9. Use case berakhir.

**Alur Alternatif**
3.1 Pengguna menyanyikan nada dengan suara berbisik atau tidak stabil.
    3.1.1 Sistem meminta pengguna mengulang penyuaraan dengan proyeksi suara penuh.
    3.1.2 Kembali ke langkah 2.

**Kondisi Akhir Sukses**
- Jangkauan nada vokal dan tipe suara penyanyi berhasil teridentifikasi dan tercatat pada profil vokal.

**Kondisi Akhir gagal**
- Pengujian gagal; jangkauan vokal tidak dapat ditentukan.

---

### UC-08 Perekaman Suara Bernyanyi Langsung (Live Singing Recording with Pitch Visualizer)

**Nama use case & id**
UC-08 Perekaman Suara Bernyanyi Langsung (Live Singing Recording with Pitch Visualizer)

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi merekam suaranya saat menyanyikan potongan lagu atau melodi tangga nada, dengan visualisasi kurva tinggi nada (*real-time pitch curve visualizer*) yang bergerak di atas tuts piano roll saat suara dialirkan.

**Aktor**
Pengguna (Free, Pro, Premium)

**Prasyarat**
- Akses mikrofon diizinkan pada peramban.

**Alur Utama**
1. Pengguna membuka modul "Studio Latihan Menyanyi".
2. Sistem menyajikan kanvas visualizer melodi dan tombol kontrol rekam.
3. Pengguna menekan tombol "Mulai Bernyanyi & Rekam".
4. Sistem mengaktifkan Web Audio API, memulai timer durasi, dan menggambar kurva pitch suara penyanyi secara langsung (*live pitch tracking*).
5. Pengguna menyanyi hingga selesai dan menekan tombol "Berhenti / Selesai".
6. Sistem memproses stream audio menjadi blob audio berkualitas tinggi format WAV/WebM.
7. Sistem mengalihkan pengguna ke layar pratinjau audio dan pemangkasan vokal.
8. Use case berakhir.

**Alur Alternatif**
4.1 Durasi rekaman mencapai batas maksimal paket pengguna (Free: 60 detik, Pro: 5 menit, Premium: 15 menit).
    4.1.1 Sistem secara otomatis menghentikan perekaman vokal.
    4.1.2 Sistem menampilkan pemberitahuan bahwa batas durasi telah tercapai.
    4.1.3 Sistem langsung melanjutkan ke langkah 6.

**Kondisi Akhir Sukses**
- Berkas audio bernyanyi berhasil direkam dan siap untuk dianalisis oleh AI.

**Kondisi Akhir gagal**
- Rekaman bernyanyi gagal ditangkap atau audio kosong.

---

### UC-09 Mengunggah Berkas Audio Rekaman Vokal Bernyanyi

**Nama use case & id**
UC-09 Mengunggah Berkas Audio Rekaman Vokal Bernyanyi

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi mengunggah berkas rekaman vokal bernyanyi (*acapella* atau rekaman mikrofon studio eksternal) untuk dianalisis oleh sistem.

**Aktor**
Pengguna

**Prasyarat**
- Pengguna memiliki berkas audio vokal bernyanyi berformat .wav, .mp3, atau .m4a dengan ukuran maksimal 25 MB.

**Alur Utama**
1. Pengguna membuka tab "Unggah Rekaman Vokal".
2. Pengguna menyeret (*drag-and-drop*) atau memilih berkas rekaman dari penyimpanan perangkat.
3. Sistem memvalidasi ekstensi berkas, MIME type audio, dan batas ukuran berkas.
4. Sistem memuat pratinjau pemutar audio vokal dan memvalidasi durasi rekaman sesuai kuota tier pengguna.
5. Pengguna menekan tombol "Kirim untuk Dianalisis".
6. Sistem mengunggah audio ke server untuk diproses oleh AI Singing Engine.
7. Use case berakhir.

**Alur Alternatif**
3.1 Format berkas tidak didukung atau ukuran melebihi 25 MB.
    3.1.1 Sistem menolak berkas dan menampilkan pesan peringatan mengenai ketentuan berkas audio.
    3.1.2 Pengguna memilih berkas yang sesuai.
    3.1.3 Kembali ke langkah 3.

**Kondisi Akhir Sukses**
- Berkas rekaman vokal berhasil diunggah ke sistem.

**Kondisi Akhir gagal**
- Berkas audio ditolak atau gagal diunggah.

---

### UC-10 Pemutaran Ulang & Pemangkasan Audio Nyanyi (Vocal Trimmer)

**Nama use case & id**
UC-10 Pemutaran Ulang & Pemangkasan Audio Nyanyi (Vocal Trimmer)

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi mendengarkan kembali hasil rekaman bernyanyi dan memotong bagian hening (*silence trimming*) atau suara tarikan napas kosong di awal dan akhir lagu sebelum dianalisis oleh AI.

**Aktor**
Pengguna

**Prasyarat**
- Pengguna telah menyelesaikan sesi rekaman vokal atau mengunggah audio nyanyi.

**Alur Utama**
1. Sistem menyajikan editor prapemrosesan audio dengan visualisasi gelombang vokal (*interactive waveform timeline*).
2. Pengguna dapat menekan tombol putar (*playback*) untuk mengecek kejernihan rekaman suara.
3. Pengguna menggeser bilah pemangkas (*trim handles*) untuk membuang jeda kosong yang tidak diinginkan.
4. Pengguna menekan tombol "Terapkan Pemangkasan & Lanjut Analisis".
5. Sistem memotong buffer audio sesuai rentang yang ditentukan pengguna.
6. Sistem meneruskan data audio hasil pangkasan ke modul AI Singing Voice Analysis.
7. Use case berakhir.

**Alur Alternatif**
3.1 Pengguna tidak ingin memotong audio.
    3.1.1 Pengguna langsung menekan tombol "Lanjut Analisis Tanpa Memotong".
    3.1.2 Sistem meneruskan audio utuh ke modul analisis (UC-11).
    3.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Audio bernyanyi terpotong dengan bersih dan dikirimkan ke mesin AI.

**Kondisi Akhir gagal**
- Proses pemotongan audio gagal; sistem menggunakan audio asli.

---

### UC-11 Menganalisis Suara Bernyanyi Berbasis AI (Singing Voice Analysis Engine)

**Nama use case & id**
UC-11 Menganalisis Suara Bernyanyi Berbasis AI (Singing Voice Analysis Engine)

**Deskripsi Singkat**
Use case ini merupakan proses komputasi cerdas yang mengevaluasi parameter suara bernyanyi: mendeteksi notasi musik nada vokal, menghitung deviasi cents, menandai nada fals (*Flat/Sharp*), mengukur osilasi vibrato, kestabilan penahanan nada (*sustain*), serta kontrol dinamika napas diafragma.

**Aktor**
Sistem (AI Audio & Singing Engine)

**Prasyarat**
- Berkas audio rekaman vokal yang valid telah diterima oleh sistem backend.

**Alur Utama**
1. Sistem mengirimkan berkas audio vokal ke modul ekstraksi sinyal akustik (*CREPE / YIN pitch tracker*).
2. Sistem mengekstrak kurva frekuensi dasar F0 sepanjang waktu dengan interval 10 milidetik.
3. Sistem memetakan setiap segmen frekuensi ke notasi nada musik terdekat (misal: C3, D3, G4, A#4) dan menghitung deviasi nada dalam satuan Cents ($\pm$ 50 cents).
4. Sistem mendeteksi titik-titik nada fals:
   - Menandai nada *Flat* (jika frekuensi < target nada lebih dari 20 cents).
   - Menandai nada *Sharp* (jika frekuensi > target nada lebih dari 20 cents).
   - Menandai nada *In-Tune* (jika deviasi berada dalam ambang toleransi $\pm$ 20 cents).
5. Sistem menganalisis segmen nada panjang untuk mengukur kecepatan vibrato (frekuensi osilasi ideal 5–7 Hz) dan kedalaman modulasi (*vibrato extent*).
6. Sistem mengukur kestabilan penahanan nada (*sustain pitch drift*) dan kontrol dinamika desibel pernapasan (*breath support dynamics*).
7. Sistem mengukur statistik akustik sesi vokal: Median F0 (Hz), Robust Low, Robust High, durasi bersuara (*Voiced Time*), estimasi formant (F1/F2), serta keseimbangan resonansi vokal (*Resonance Balance*):
   - **Chest Voice (100 – 400 Hz)**: Kekuatan dan resonansi suara dada.
   - **Mask / Mixed Resonance (400 – 2000 Hz)**: Resonansi area wajah/pharyngeal untuk penempatan suara tengah (*mix voice*).
   - **Head Voice (2000 – 5000 Hz)**: Resonansi nada tinggi dan kecerahan vokal (*head voice / vocal ring*).
8. Sistem mengagregasi seluruh parameter menjadi Skor Bernyanyi Keseluruhan (Overall Singing Score, 0 - 100).
9. Sistem menghasilkan rekomendasi vokal berbasis AI (*actionable vocal tips*) untuk memperbaiki nada fals dan mengoptimalkan resonansi.
10. Sistem mengembalikan payload hasil evaluasi ke antarmuka pengguna.
11. Use case berakhir.

**Alur Alternatif**
1.1 Sinyal audio terlalu bising atau tidak terdeteksi frekuensi nada vokal manusia.
    1.1.1 Sistem memberikan pesan peringatan: "Vokal bernyanyi tidak terdeteksi dengan jelas. Harap bernyanyi lebih dekat ke mikrofon di ruangan hening".
    1.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Parameter ketepatan nada, fals flat/sharp, vibrato, dan skor bernyanyi selesai dihitung secara presisi.

**Kondisi Akhir gagal**
- Komputasi analisis audio bernyanyi gagal dieksekusi.

---

### UC-12 Menampilkan Rapor Evaluasi Bernyanyi (Singing Report Card & Piano Roll)

**Nama use case & id**
UC-12 Menampilkan Rapor Evaluasi Bernyanyi (Singing Report Card & Piano Roll)

**Deskripsi Singkat**
Use case ini menyajikan visualisasi komprehensif hasil evaluasi bernyanyi kepada pengguna, termasuk Skor Bernyanyi Keseluruhan (0-100), Radar Chart 5 dimensi vokal, visualisasi Piano Roll interaktif (membandingkan balok nada target vs kurva nada suara penyanyi), dan daftar catatan perbaikan nada fals.

**Aktor**
Pengguna

**Prasyarat**
- Proses analisis suara bernyanyi (UC-11) telah selesai.

**Alur Utama**
1. Sistem menampilkan antarmuka Rapor Evaluasi Bernyanyi (*Singing Report Card*).
2. Sistem menyajikan Skor Bernyanyi Keseluruhan dalam lencana nilai visual (contoh: 88/100 - "Kategori Vokal: Sangat Merdu & Presisi").
3. Sistem merender diagram radar 5 dimensi bernyanyi: Akurasi Nada (Pitch Accuracy), Kestabilan Penahanan Nada (Sustain), Kualitas Vibrato, Kontrol Napas (Breath Support), dan Ketukan Nada (Rhythm/Timing).
4. Sistem merender visualisasi diagram keseimbangan resonansi vokal (*Resonance Balance*): distribusi persentase Chest Voice (100–400 Hz), Mask / Mixed Resonance (400–2000 Hz), dan Head Voice (2000–5000 Hz) seperti pada platform acuan akustik.
5. Sistem menampilkan visualisasi kanvas Piano Roll interaktif dengan kode warna nada:
   - Warna Hijau: Nada tepat (*In-Tune*).
   - Warna Biru: Nada terlalu rendah (*Flat*).
   - Warna Oranye/Merah: Nada terlalu tinggi (*Sharp*).
6. Sistem menampilkan kartu rangkuman statistik sesi: Median F0 (Hz), nada terendah dan tertinggi (*vocal range*), durasi vokal bersuara (*Voiced Time*), dan estimasi formants.
7. Sistem menampilkan saran perbaikan teknik vokal dari AI (misal: "Perhatikan transisi ke nada G4 di detik ke-14 agar tidak flat dan perkuat resonansi mask").
8. Sistem menyajikan tombol simpan rapor (bagi Free Tier ditawarkan opsi upgrade ke Pro).
9. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Penyanyi memahami performa ketepatan nadanya secara visual dan terperinci.

**Kondisi Akhir gagal**
- Antarmuka gagal merender visualisasi rapor.

---

### UC-13 Pemutaran Audio Terikat Deteksi Nada Fals (Note-Sync Playback)

**Nama use case & id**
UC-13 Pemutaran Audio Terikat Deteksi Nada Fals (Note-Sync Playback)

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi mengklik balok notasi nada tertentu pada visualisasi Piano Roll (misalnya nada bertanda merah/flat di nada F#4) untuk langsung melompatkan pemutaran audio ke detik tepat di mana nada fals tersebut dinyanyikan.

**Aktor**
Pengguna

**Prasyarat**
- Rapor bernyanyi dan visualisasi Piano Roll interaktif sedang dibuka.

**Alur Utama**
1. Pengguna memeriksa lembar visualisasi Piano Roll pada rapor bernyanyi.
2. Pengguna melihat balok nada yang ditandai warna fals (Flat atau Sharp).
3. Pengguna mengklik balok nada tersebut.
4. Sistem membaca metadata stempel waktu (*timestamp*) awal dan akhir dari segmen nada bersangkutan.
5. Sistem memindahkan bilah pemutar audio (*audio seek bar*) tepat pada detik tersebut dan memulai pemutaran ulang audio rekaman.
6. Pengguna mendengarkan langsung suaranya pada nada fals tersebut sembari melihat indikator perbandingan deviasi cents.
7. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Pemutaran audio sinkron secara presisi dengan nada musik yang dipilih penyanyi.

**Kondisi Akhir gagal**
- Pemutar audio gagal melompat ke detik yang dipilih.

---

### UC-14 Menyimpan Rapor Nyanyi ke Riwayat Akun Pengguna

**Nama use case & id**
UC-14 Menyimpan Rapor Nyanyi ke Riwayat Akun Pengguna

**Deskripsi Singkat**
Use case ini menyimpan berkas rekaman audio bernyanyi dan metadata penilaian vokal secara permanen ke dalam basis data dan penyimpanan awan bagi pengguna bertier Pro atau Premium.

**Aktor**
Pengguna (Pro, Premium), Sistem

**Prasyarat**
- Pengguna login dengan akun bertier Pro atau Premium.
- Pengguna telah menyelesaikan sesi analisis suara bernyanyi.

**Alur Utama**
1. Sistem mendeteksi status keanggotaan pengguna sebagai Pro atau Premium.
2. Sistem mengunggah berkas rekaman vokal ke Cloud Storage terenkripsi.
3. Sistem menyimpan skor parameter vokal, data nada Piano Roll, kurva cents deviasi, dan rekomendasi AI ke tabel `vocal_reports` di basis data.
4. Sistem menautkan rekaman vokal tersebut ke ID akun penyanyi.
5. Sistem menampilkan konfirmasi: "Rapor bernyanyi berhasil disimpan ke riwayat akun Anda".
6. Use case berakhir.

**Alur Alternatif**
1.1 Pengguna berstatus Free Tier menekan tombol "Simpan Rapor".
    1.1.1 Sistem menampilkan dialog penawaran peningkatan paket (*Upgrade to Pro Modal*).
    1.1.2 Pengguna dapat memilih untuk beralih ke halaman langganan (UC-21).
    1.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Berkas audio rekaman dan data rapor bernyanyi tersimpan permanen di akun pengguna.

**Kondisi Akhir gagal**
- Data gagal disimpan ke basis data atau penyimpanan awan.

---

### UC-15 Mengekspor Lembar Rapor Evaluasi Bernyanyi Format PDF & Sertifikat Vokal

**Nama use case & id**
UC-15 Mengekspor Lembar Rapor Evaluasi Bernyanyi Format PDF & Sertifikat Vokal

**Deskripsi Singkat**
Use case ini menghasilkan berkas dokumen PDF resmi yang memuat lembar evaluasi bernyanyi lengkap dengan diagram radar vokal, rekapitulasi persentase nada tepat (*in-tune rate*), jangkauan vokal, dan sertifikat kelulusan uji nada vokal.

**Aktor**
Pengguna (Pro, Premium)

**Prasyarat**
- Pengguna memiliki akses tier Pro atau Premium.
- Terdapat rapor bernyanyi yang dipilih untuk diekspor.

**Alur Utama**
1. Pengguna membuka tampilan detail rapor dan menekan tombol "Unduh Rapor PDF & Sertifikat".
2. Sistem memanggil modul generator dokumen PDF backend.
3. Sistem menyusun tata letak PDF standar: kop resmi VocalSense AI, identitas penyanyi, tanggal sesi, diagram radar vokal, rincian nada fals, dan sertifikat kelulusan uji nada.
4. Sistem mengompilasi lembar dokumen menjadi berkas PDF biner.
5. Sistem memicu pengunduhan berkas PDF langsung ke peramban pengguna.
6. Use case berakhir.

**Alur Alternatif**
2.1 Terjadi gangguan pada modul kompilasi PDF.
    2.1.1 Sistem menampilkan pesan: "Gagal membuat dokumen PDF, silakan coba beberapa saat lagi".
    2.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Berkas PDF lembar evaluasi vokal bernyanyi berhasil diunduh ke perangkat pengguna.

**Kondisi Akhir gagal**
- Berkas PDF gagal diunduh.

---

### UC-16 Membandingkan Dua Sesi Rekaman Nyanyi (Side-by-Side Pitch Comparison)

**Nama use case & id**
UC-16 Membandingkan Dua Sesi Rekaman Nyanyi (Side-by-Side Pitch Comparison)

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi memilih dua sesi rekaman dari tanggal berbeda untuk dibandingkan secara berdampingan (*before-after comparison*) guna mengevaluasi perkembangan ketepatan nada dan kestabilan vibrato.

**Aktor**
Pengguna (Pro, Premium)

**Prasyarat**
- Pengguna memiliki minimal dua sesi rapor bernyanyi yang tersimpan di akunnya.

**Alur Utama**
1. Pengguna membuka daftar riwayat rapor dan memilih dua sesi rekaman vokal yang ingin dibandingkan.
2. Pengguna menekan tombol "Bandingkan Sesi Bernyanyi".
3. Sistem menarik data skor metrik dan kurva nada dari kedua sesi tersebut.
4. Sistem menyajikan tampilan perbandingan berdampingan:
   - Delta Skor Bernyanyi Keseluruhan (misal: +14 poin).
   - Peningkatan persentase nada tepat (*in-tune rate*, misal: dari 68% menjadi 89%).
   - Penurunan jumlah nada fals (Flat & Sharp).
   - Grafik radar ganda yang menumpuk kurva vokal sesi lama vs sesi baru.
5. Sistem menyajikan ringkasan evaluasi kemajuan teknik bernyanyi pengguna.
6. Use case berakhir.

**Alur Alternatif**
1.1 Pengguna hanya memilih satu sesi atau lebih dari dua sesi.
    1.1.1 Sistem menampilkan panduan: "Pilih tepat 2 sesi rekaman untuk melihat perbandingan perkembangan vokal".
    1.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Antarmuka visual perbandingan dua sesi vokal bernyanyi tersaji secara informatif.

**Kondisi Akhir gagal**
- Sistem gagal memuat salah satu data sesi rekaman.

---

### UC-17 Memantau Dasbor Analitik Progres Vokal & Perluasan Jangkauan Nada (Singing Progress Tracker)

**Nama use case & id**
UC-17 Memantau Dasbor Analitik Progres Vokal & Perluasan Jangkauan Nada (Singing Progress Tracker)

**Deskripsi Singkat**
Use case ini menyajikan dasbor analitik tren vokal dari waktu ke waktu kepada pengguna Premium, termasuk grafik perluasan jangkauan nada vokal (*vocal range expansion*), peningkatan rasio nada tepat (*pitch accuracy trend*), dan frekuensi latihan bernyanyi.

**Aktor**
Pengguna (Premium)

**Prasyarat**
- Pengguna memiliki langganan aktif tier Premium.
- Pengguna telah menyelesaikan minimal 2 kali rekaman latihan yang tersimpan.

**Alur Utama**
1. Pengguna membuka menu "Pelacakan Progres Latihan Bernyanyi".
2. Sistem menarik seluruh rekam jejak penilaian vokal bernyanyi pengguna dari basis data.
3. Sistem mengkalkulasi agregat perkembangan:
   - Tren skor bernyanyi keseluruhan mingguan dan bulanan.
   - Grafik perluasan tuts jangkauan vokal (misal: dari C3-E4 meluas hingga C3-G4).
   - Grafik penurunan deviasi cents nada fals.
   - Total durasi latihan menyanyi dan akumulasi nada yang dilatih.
4. Sistem merender grafik garis interaktif dan peta jangkauan tuts piano.
5. Sistem menampilkan kartu analisis perkembangan vokal.
6. Use case berakhir.

**Alur Alternatif**
2.1 Riwayat rekaman pengguna masih kurang dari 2 sesi.
    2.1.1 Sistem menampilkan informasi: "Lakukan minimal 2 sesi rekaman bernyanyi untuk mulai melihat grafik tren perkembangan Anda".
    2.1.2 Use case berakhir.

**Kondisi Akhir Sukses**
- Dasbor analitik kemajuan bernyanyi berhasil ditampilkan secara interaktif.

**Kondisi Akhir gagal**
- Sistem gagal memuat data analitik vokal.

---

### UC-18 Melacak Konsistensi Streak Latihan Bernyanyi dan Mengklaim Lencana

**Nama use case & id**
UC-18 Melacak Konsistensi Streak Latihan Bernyanyi dan Mengklaim Lencana

**Deskripsi Singkat**
Use case ini mengelola sistem gamifikasi bernyanyi, melacak jumlah hari latihan vokal berturut-turut (*daily vocal streak*), serta memberikan lencana penghargaan (misal: "Pitch Master", "Vibrato Champion", "High Note Achiever").

**Aktor**
Pengguna (Premium), Sistem

**Prasyarat**
- Pengguna aktif bertier Premium dan menyelesaikan latihan vokal pada hari bersangkutan.

**Alur Utama**
1. Pengguna menyelesaikan sesi rekaman atau drill latihan vokal harian.
2. Sistem memeriksa tanggal latihan vokal terakhir pengguna di tabel `progress_trackings`.
3. Sistem memperbarui kalkulasi streak harian:
   - Jika latihan dilakukan berturut-turut: `current_streak` bertambah 1 hari.
   - Jika terputus lebih dari 48 jam: `current_streak` diatur ulang menjadi 1 hari.
4. Sistem mengevaluasi apakah streak pengguna mencapai tonggak pencapaian (*milestone*, misal: Streak 7 Hari, 14 Hari, atau 30 Hari).
5. Sistem membuka kunci (*unlock*) lencana prestasi vokal baru jika target terpenuhi.
6. Sistem menampilkan jendela animasi perayaan pencapaian lencana dan memperbarui profil penyanyi.
7. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Streak bernyanyi bertambah dan lencana penghargaan berhasil disematkan pada profil pengguna.

**Kondisi Akhir gagal**
- Streak vokal gagal diperbarui.

---

### UC-19 Menghasilkan Kurikulum Latihan Bernyanyi Personal AI (AI Vocal Coach & Practice Planner)

**Nama use case & id**
UC-19 Menghasilkan Kurikulum Latihan Bernyanyi Personal AI (AI Vocal Coach & Practice Planner)

**Deskripsi Singkat**
Use case ini memanfaatkan model kecerdasan buatan untuk mendiagnosis riwayat kelemahan bernyanyi pengguna (misal: sering flat di oktaf 4 atau vibrato belum stabil), lalu merancang jadwal latihan harian adaptif lengkap dengan materi tangga nada vokal (*vocal scales & arpeggio*).

**Aktor**
Pengguna (Premium), Sistem AI

**Prasyarat**
- Pengguna memiliki status langganan aktif Premium.
- Pengguna memiliki riwayat analisis bernyanyi tersimpan.

**Alur Utama**
1. Pengguna membuka modul "AI Vocal Coach / Practice Planner".
2. Pengguna menekan tombol "Buat / Perbarui Kurikulum Latihan Vokal Saya".
3. Sistem mengumpulkan metrik dari 5 rekaman bernyanyi terakhir pengguna untuk membuat profil diagnosis nada fals dan jangkauan vokal.
4. Sistem mengirimkan prompt diagnosis ke layanan LLM AI (Google Gemini API).
5. Model AI memetakan kelemahan utama (contoh: transkripsi flat pada register nada tinggi dan transisi falsetto ke head voice yang belum mulus).
6. Model AI menyusun rencana kurikulum latihan vokal 7-30 hari ke depan dengan tema harian, materi solfeggio terarah, dan latihan pernapasan diafragma.
7. Sistem menyimpan rencana latihan bernyanyi tersebut ke basis data pengguna.
8. Sistem menampilkan jadwal kalender latihan vokal harian beserta tombol aksi "Mulai Latihan Hari Ini".
9. Use case berakhir.

**Alur Alternatif**
4.1 Layanan LLM eksternal mengalami timeout atau gangguan kuota.
    4.1.1 Sistem secara otomatis beralih ke silabus vokal berbasis aturan (*rule-based fallback singing planner*).
    4.1.2 Sistem menyajikan rencana latihan standar yang sesuai dengan tipe suara dan jangkauan vokal pengguna.
    4.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Rencana latihan bernyanyi personal adaptif berhasil disusun dan siap diikuti pengguna.

**Kondisi Akhir gagal**
- Rencana latihan vokal gagal dibuat.

---

### UC-20 Menjalankan Sesi Latihan Tangga Nada & Vokal Terpandu (Guided Scales & Solfeggio Drills)

**Nama use case & id**
UC-20 Menjalankan Sesi Latihan Tangga Nada & Vokal Terpandu (Guided Scales & Solfeggio Drills)

**Deskripsi Singkat**
Use case ini memandu penyanyi mengeksekusi tugas latihan harian dari kurikulum AI, membunyikan nada panduan tangga nada musik (Mayor, Minor, Arpeggio, Pentatonik), dan memberikan evaluasi kecocokan nada secara langsung saat pengguna menirukannya.

**Aktor**
Pengguna (Premium)

**Prasyarat**
- Pengguna memiliki kurikulum latihan aktif yang dibuat oleh AI Vocal Coach.

**Alur Utama**
1. Pengguna memilih tugas latihan vokal hari ini pada kalender kurikulum (misal: "Hari 4: Latihan Arpeggio Mayor C4-E4-G4-C5").
2. Sistem menyajikan antarmuka drill terpandu (*Guided Vocal Drill View*) yang memuat audio panduan piano dan notasi tangga nada.
3. Sistem memainkan nada acuan piano baris per baris.
4. Pengguna menyanyikan nada tangga nada tersebut mengikuti panduan suara sambil mikrofon merekam.
5. Sistem menangkap nada pengguna secara *real-time* dan membandingkannya dengan nada target melodi.
6. Pengguna menekan tombol selesai drill.
7. Sistem memproses penilaian drill: mengukur persentase ketepatan nada solfeggio dan kestabilan tempo.
8. Sistem menandai status tugas hari tersebut sebagai "Selesai" (*Completed*).
9. Sistem memperbarui persentase capaian kurikulum vokal pengguna.
10. Use case berakhir.

**Alur Alternatif**
7.1 Skor ketepatan nada drill masih di bawah ambang batas kelulusan (< 70%).
    7.1.1 Sistem memberikan opsi: "Ulangi Latihan Tangga Nada" atau "Simpan Skor Saat Ini".
    7.1.2 Pengguna dapat mengulang latihan tangga nada.
    7.1.3 Kembali ke langkah 3.

**Kondisi Akhir Sukses**
- Sesi latihan tangga nada harian tereksekusi dan progres kurikulum bernyanyi berhasil diperbarui.

**Kondisi Akhir gagal**
- Sesi latihan vokal gagal dicatat.

---

### UC-21 Memilih Paket dan Membayar Langganan (Free, Pro, Premium)

**Nama use case & id**
UC-21 Memilih Paket dan Membayar Langganan (Free, Pro, Premium)

**Deskripsi Singkat**
Use case ini memandu pengguna dalam memilih paket langganan bernyanyi (Pro atau Premium) dan menyelesaikan pembayaran melalui gerbang pembayaran (Payment Gateway) terintegrasi.

**Aktor**
Pengguna

**Prasyarat**
- Pengguna telah login ke dalam sistem.

**Alur Utama**
1. Pengguna membuka halaman "Paket & Harga Langganan" (*Pricing Plans*).
2. Sistem menyajikan perbandingan fitur bernyanyi antara Free, Pro, dan Premium.
3. Pengguna memilih paket yang diinginkan (misal: "Paket Premium Bulanan - Akses AI Vocal Coach") dan menekan tombol "Beli Sekarang".
4. Sistem membuat data transaksi baru berstatus *Pending* dan memanggil API Payment Gateway (Midtrans).
5. Sistem menampilkan modal pembayaran resmi (*Snap Payment Window*) yang memuat pilihan metode pembayaran (BCA VA, Mandiri, GoPay, QRIS, Kartu Kredit).
6. Pengguna memilih metode pembayaran dan menyelesaikan transaksi.
7. Payment Gateway memproses pembayaran dan mengirimkan notifikasi HTTP Webhook ke peladen VocalSense AI.
8. Sistem menerima Webhook, memverifikasi tanda tangan digital transaksi (*signature key*), dan mengubah status pembayaran menjadi *Settled / Paid*.
9. Sistem mengaktifkan hak akses tier akun penyanyi secara otomatis.
10. Antarmuka menampilkan ucapan selamat datang dan konfirmasi aktivasi paket langganan.
11. Use case berakhir.

**Alur Alternatif**
6.1 Pengguna membatalkan atau menutup jendela pembayaran sebelum membayar.
    6.1.1 Status transaksi tetap *Pending* hingga batas waktu habis (*expired*).
    6.1.2 Sistem mengembalikan pengguna ke halaman paket dengan pemberitahuan transaksi belum diselesaikan.
    6.1.3 Use case berakhir.
8.1 Webhook Payment Gateway tertunda atau gagal terkirim.
    8.1.1 Sistem menyediakan tombol "Cek Status Pembayaran" pada riwayat tagihan pengguna untuk sinkronisasi manual.
    8.1.2 Sistem mengonfirmasi ke server gateway dan mengaktifkan tier jika dana sudah masuk.
    8.1.3 Use case berakhir.

**Kondisi Akhir Sukses**
- Pembayaran berhasil diverifikasi dan status tier pengguna ditingkatkan ke Pro/Premium.

**Kondisi Akhir gagal**
- Pembayaran kedaluwarsa atau ditolak; tier pengguna tidak berubah.

---

### UC-22 Melihat Riwayat Tagihan dan Mengelola Langganan

**Nama use case & id**
UC-22 Melihat Riwayat Tagihan dan Mengelola Langganan

**Deskripsi Singkat**
Use case ini memungkinkan penyanyi memeriksa bukti pembayaran masa lalu, memantau masa aktif paket langganan saat ini, dan mengatur opsi perpanjangan langganan otomatis.

**Aktor**
Pengguna (Pro, Premium)

**Prasyarat**
- Pengguna telah login dan memiliki riwayat transaksi langganan.

**Alur Utama**
1. Pengguna membuka menu "Tagihan & Langganan Saya".
2. Sistem menyajikan informasi langganan aktif: nama paket, masa berlaku (*expiry date*), dan status perpanjangan.
3. Sistem menampilkan tabel daftar invoice pembayaran: Order ID, Tanggal, Nominal, Metode Bayar, dan Status Transaksi (*Settled / Pending*).
4. Pengguna dapat mengklik tombol "Unduh Bukti Bayar / Invoice PDF" pada baris transaksi terkait.
5. Sistem mengunduh berkas tanda terima transaksi resmi ke perangkat pengguna.
6. Pengguna dapat memilih opsi "Batalkan Perpanjangan Otomatis" jika ingin mengakhiri langganan saat masa aktif habis.
7. Sistem memperbarui preferensi auto-renewal pengguna di basis data.
8. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Pengguna dapat memantau seluruh riwayat finansial langganannya secara transparan.

**Kondisi Akhir gagal**
- Data tagihan gagal dimuat.

---

### UC-23 Manajemen Pengguna dan Penyesuaian Tier oleh Administrator

**Nama use case & id**
UC-23 Manajemen Pengguna dan Penyesuaian Tier oleh Administrator

**Deskripsi Singkat**
Use case ini memungkinkan administrator untuk mengawasi akun pengguna platform vokal, mengatur status keaktifan, dan menyesuaikan tier langganan secara manual jika terjadi kendala pembayaran offline.

**Aktor**
Administrator

**Prasyarat**
- Pengguna login dengan akun yang memiliki hak akses peran *Admin*.

**Alur Utama**
1. Admin mengakses panel "Manajemen Pengguna".
2. Sistem menampilkan tabel daftar pengguna lengkap dengan kolom ID, Nama, Email, Tier Vokal Saat Ini, Status Akun, dan Tanggal Bergabung.
3. Admin dapat mencari atau memfilter pengguna berdasarkan nama atau tier.
4. Admin memilih salah satu pengguna untuk melihat detail riwayat rekaman vokal dan transaksi langganan.
5. Admin dapat melakukan tindakan administratif:
   - Menangguhkan (*suspend*) akun pengguna yang melanggar ketentuan.
   - Mengaktifkan kembali (*un-suspend*) akun yang dibekukan.
   - Menyesuaikan masa aktif langganan vokal secara manual.
6. Sistem memvalidasi aksi admin dan memperbarui basis data.
7. Sistem mencatat aksi tersebut ke dalam log audit administrator.
8. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Data akun dan status langganan vokal pengguna berhasil diperbarui oleh administrator.

**Kondisi Akhir gagal**
- Perubahan gagal disimpan di basis data.

---

### UC-24 Pemantauan Analitik Finansial, Utilisasi AI Engine dan Konfigurasi Sistem

**Nama use case & id**
UC-24 Pemantauan Analitik Finansial, Utilisasi AI Engine dan Konfigurasi Sistem

**Deskripsi Singkat**
Use case ini menyajikan ringkasan statistik komprehensif terkait pendapatan langganan platform vokal, jumlah pengguna aktif per tier, utilisasi komputasi engine analisis nada AI, serta pengelolaan parameter global sistem (ambang batas toleransi cents nada fals).

**Aktor**
Administrator

**Prasyarat**
- Pengguna telah login sebagai Administrator.

**Alur Utama**
1. Admin membuka dashboard utama "Analitik & Pengaturan Sistem".
2. Sistem mengambil data rekapitulasi dari basis data:
   - Pendapatan kotor bulanan (*Monthly Gross Revenue*).
   - Jumlah pengguna baru dan total pengguna per tier bernyanyi (Free, Pro, Premium).
   - Rasio konversi dari pengguna gratis ke pengguna berbayar (*Conversion Rate*).
   - Total sesi rekaman bernyanyi yang diproses per hari.
   - Waktu rata-rata komputasi ekstraksi nada audio oleh AI Engine.
3. Sistem merender visualisasi metrik dalam bentuk grafik garis, diagram lingkaran, dan kartu KPI.
4. Admin dapat memilih rentang waktu filter data (7 hari terakhir, 30 hari terakhir, atau tahun berjalan).
5. Admin dapat mengunduh ringkasan laporan ke berkas spreadsheet (CSV/Excel).
6. Admin dapat memperbarui parameter batas kuota gratis atau ambang batas toleransi nada fals (cents threshold).
7. Sistem menyimpan parameter baru dan langsung menerapkannya secara global.
8. Use case berakhir.

**Alur Alternatif**
- Tidak ada alur alternatif signifikan.

**Kondisi Akhir Sukses**
- Seluruh data analitik bernyanyi tersaji dengan akurat dan konfigurasi parameter sistem berhasil diperbarui.

**Kondisi Akhir gagal**
- Data laporan gagal dimuat atau konfigurasi gagal disimpan.
