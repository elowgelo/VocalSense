import os
import re
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Root directories
DOCS_DIR = r"D:\Kuliah\IPPL\docs"
DIAGRAMS_DIR = os.path.join(DOCS_DIR, "diagrams")
UC_DIR = os.path.join(DIAGRAMS_DIR, "usecase")
AD_DIR = os.path.join(DIAGRAMS_DIR, "activity")
SD_DIR = os.path.join(DIAGRAMS_DIR, "sequence")
PUML_DIR = os.path.join(SD_DIR, "PlantUML")

for d in [UC_DIR, AD_DIR, SD_DIR, PUML_DIR]:
    os.makedirs(d, exist_ok=True)

# ----------------------------------------------------------------------
# 24 USE CASES SPECIFICATION DATA (1:1 CORRESPONDENCE)
# ----------------------------------------------------------------------
USE_CASES = [
    {
        "id": "01",
        "code": "UC-01",
        "name": "Registrasi Akun Pengguna",
        "actor": "Pengguna",
        "view": "Tampilan Formulir Registrasi",
        "ctrl": "AuthController",
        "svc": "AuthService",
        "db": "UserDB",
        "user_actions": [
            ("Memilih Tombol Daftar Akun", 100),
            ("Mengisi Formulir Pendaftaran (Nama, Email, Password)", 320)
        ],
        "sys_actions": [
            ("Menampilkan Formulir Registrasi Akun", 210),
            ("Memvalidasi Format Email & Kekuatan Password", 430),
            ("Memverifikasi Keunikan Email", 540, "db"),
            ("Mengenkripsi Password & Membuat Akun Baru", 750, "db"),
            ("Menerbitkan Sesi Login & Menampilkan Dashboard", 860)
        ],
        "decision": {
            "y": 640,
            "text": "Email Tersedia & Unik?",
            "yes_label": "[Tersedia]",
            "no_label": "[Sudah Terdaftar]",
            "error_msg": "Tampilkan Peringatan Email Telah Digunakan"
        },
        "sd_messages": [
            ("user", "view", "1: Memilih menu pendaftaran akun"),
            ("view", "ctrl", "2: Request form registrasi"),
            ("ctrl", "view", "3: Render formulir pendaftaran"),
            ("view", "user", "4: Tampilkan form pendaftaran"),
            ("user", "view", "5: Input nama, email, password"),
            ("view", "ctrl", "6: Submit data registrasi baru"),
            ("ctrl", "svc", "7: Validasi format & hash password"),
            ("svc", "db", "8: Cek ketersediaan email"),
            ("db", "svc", "9: Email belum terdaftar (OK)"),
            ("svc", "db", "10: Insert user baru (Tier Free)"),
            ("db", "svc", "11: User ID terbit"),
            ("svc", "ctrl", "12: Return auth token (JWT)"),
            ("ctrl", "view", "13: Redirect ke Dashboard"),
            ("view", "user", "14: Tampilkan dashboard & notifikasi sukses")
        ]
    },
    {
        "id": "02",
        "code": "UC-02",
        "name": "Masuk ke Sistem",
        "actor": "Pengguna",
        "view": "Tampilan Formulir Login",
        "ctrl": "AuthController",
        "svc": "AuthService",
        "db": "UserDB",
        "user_actions": [
            ("Memilih Tombol Masuk (Login)", 100),
            ("Memasukkan Kredensial Email & Password", 320)
        ],
        "sys_actions": [
            ("Menampilkan Formulir Masuk", 210),
            ("Memverifikasi Kecocokan Email & Password", 430, "db"),
            ("Memeriksa Status Akun (Aktif/Suspended)", 640, "db"),
            ("Menghasilkan JWT Token Otentikasi", 750),
            ("Mengarahkan ke Dashboard Sesuai Peran", 860)
        ],
        "decision": {
            "y": 530,
            "text": "Kredensial Valid?",
            "yes_label": "[Valid]",
            "no_label": "[Tidak Valid]",
            "error_msg": "Tampilkan Pesan Email atau Password Salah"
        },
        "sd_messages": [
            ("user", "view", "1: Buka halaman login"),
            ("view", "ctrl", "2: Request form login"),
            ("ctrl", "view", "3: Render form login"),
            ("view", "user", "4: Form login ditampilkan"),
            ("user", "view", "5: Input email dan password"),
            ("view", "ctrl", "6: Kirim kredensial login"),
            ("ctrl", "svc", "7: Verifikasi hash kredensial"),
            ("svc", "db", "8: Query data user by email"),
            ("db", "svc", "9: Return user record & hash"),
            ("svc", "ctrl", "10: Kredensial cocok & akun aktif"),
            ("ctrl", "view", "11: Terbitkan JWT Session Cookie"),
            ("view", "user", "12: Dashboard utama dimuat")
        ]
    },
    {
        "id": "03",
        "code": "UC-03",
        "name": "Masuk via Google OAuth",
        "actor": "Pengguna",
        "view": "Tampilan Login Google SSO",
        "ctrl": "OAuthController",
        "svc": "OAuthService",
        "db": "UserDB",
        "user_actions": [
            ("Menekan Tombol Lanjutkan dengan Google", 100),
            ("Memberikan Izin Akses Profil Akun Google", 320)
        ],
        "sys_actions": [
            ("Mengalihkan ke Consent Screen Google OAuth", 210),
            ("Menerima Auth Code & Menukar Token Identitas", 430),
            ("Memeriksa Apakah Akun Sudah Ada di Database", 540, "db"),
            ("Menyimpan Akun Baru / Ambil Akun Eksisting", 750, "db"),
            ("Menerbitkan Sesi JWT & Masuk ke Dashboard", 860)
        ],
        "decision": {
            "y": 640,
            "text": "Pengguna Baru?",
            "yes_label": "[Akun Baru]",
            "no_label": "[Akun Lama]",
            "error_msg": "Ambil Data Profil Pengguna Lama"
        },
        "sd_messages": [
            ("user", "view", "1: Klik Masuk dengan Google"),
            ("view", "ctrl", "2: Request redirect URL Google OAuth"),
            ("ctrl", "view", "3: Redirect ke server Google consent"),
            ("view", "user", "4: Tampilkan pilihan akun Google"),
            ("user", "view", "5: Pilih akun & konfirmasi consent"),
            ("view", "ctrl", "6: Callback Authorization Code"),
            ("ctrl", "svc", "7: Tukar code dengan Identity Token"),
            ("svc", "db", "8: Cek Google ID / Email di database"),
            ("db", "svc", "9: Akun terverifikasi"),
            ("svc", "ctrl", "10: Terbitkan token sesi pengguna"),
            ("ctrl", "view", "11: Redirect ke Dashboard"),
            ("view", "user", "12: Berhasil masuk via Google SSO")
        ]
    },
    {
        "id": "04",
        "code": "UC-04",
        "name": "Pemulihan Kata Sandi",
        "actor": "Pengguna",
        "view": "Tampilan Reset Password",
        "ctrl": "PasswordResetController",
        "svc": "EmailService",
        "db": "UserDB",
        "user_actions": [
            ("Memilih Tautan Lupa Kata Sandi", 100),
            ("Memasukkan Email & Menekan Kirim Tautan", 320),
            ("Membuka Email & Klik Link Reset", 540),
            ("Mengisi Kata Sandi Baru & Konfirmasi", 750)
        ],
        "sys_actions": [
            ("Menampilkan Form Permohonan Reset", 210),
            ("Menghasilkan Token Reset & Kirim Email", 430),
            ("Memvalidasi Token Reset Password", 640, "db"),
            ("Menyimpan Hash Kata Sandi Baru", 860, "db"),
            ("Menampilkan Konfirmasi Sukses Perbaruan", 970)
        ],
        "decision": {
            "y": 640,
            "text": "Token Valid & Aktif?",
            "yes_label": "[Valid]",
            "no_label": "[Kedaluwarsa]",
            "error_msg": "Tampilkan Peringatan Token Telah Kedaluwarsa"
        },
        "sd_messages": [
            ("user", "view", "1: Klik Lupa Kata Sandi"),
            ("view", "ctrl", "2: Buka form lupa kata sandi"),
            ("user", "view", "3: Masukkan alamat email terdaftar"),
            ("view", "ctrl", "4: Kirim permohonan reset password"),
            ("ctrl", "svc", "5: Buat token unik 60 menit & kirim email"),
            ("user", "view", "6: Klik link token pada email"),
            ("view", "ctrl", "7: Validasi keabsahan token reset"),
            ("user", "view", "8: Input kata sandi baru"),
            ("view", "ctrl", "9: Update password baru"),
            ("ctrl", "db", "10: Simpan hash password baru"),
            ("db", "ctrl", "11: Password updated successfully"),
            ("ctrl", "view", "12: Tampilkan konfirmasi sukses"),
            ("view", "user", "13: Kata sandi berhasil diperbarui")
        ]
    },
    {
        "id": "05",
        "code": "UC-05",
        "name": "Pengelolaan Profil Vokal dan Preferensi",
        "actor": "Pengguna",
        "view": "Tampilan Profil & Preferensi",
        "ctrl": "ProfileController",
        "svc": "ProfileService",
        "db": "UserDB",
        "user_actions": [
            ("Membuka Menu Profil & Preferensi Vokal", 100),
            ("Mengubah Tipe Suara, Genre Bernyanyi & Avatar", 320),
            ("Menekan Tombol Simpan Perubahan", 540)
        ],
        "sys_actions": [
            ("Memuat Data Profil Pengguna dari Database", 210, "db"),
            ("Memvalidasi Format & Ukuran Gambar Avatar", 430),
            ("Menyimpan Pembaruan Profil ke Database", 650, "db"),
            ("Menampilkan Notifikasi Profil Berhasil Disimpan", 760)
        ],
        "decision": {
            "y": 430,
            "text": "Ukuran File < 2MB?",
            "yes_label": "[Valid]",
            "no_label": "[Melebihi Batas]",
            "error_msg": "Tampilkan Error Ukuran Avatar Maksimal 2MB"
        },
        "sd_messages": [
            ("user", "view", "1: Akses menu profil vokal"),
            ("view", "ctrl", "2: Request profil data"),
            ("ctrl", "db", "3: Query user preferences & voice type"),
            ("db", "ctrl", "4: Return user data"),
            ("ctrl", "view", "5: Render form profil vokal"),
            ("user", "view", "6: Update tipe suara & genre favorit"),
            ("view", "ctrl", "7: Submit data profil baru"),
            ("ctrl", "svc", "8: Validasi kelayakan input"),
            ("svc", "db", "9: Update record users di database"),
            ("db", "svc", "10: Update success"),
            ("svc", "ctrl", "11: Profil tersimpan"),
            ("ctrl", "view", "12: Notifikasi profil vokal berhasil diperbarui"),
            ("view", "user", "13: Tampilkan profil baru")
        ]
    },
    {
        "id": "06",
        "code": "UC-06",
        "name": "Tuner dan Kalibrasi Mikrofon",
        "actor": "Pengguna",
        "view": "Tampilan Chromatic Tuner",
        "ctrl": "AudioTunerController",
        "svc": "AudioEngineService",
        "db": "SettingsDB",
        "user_actions": [
            ("Membuka Fitur Tuner & Kalibrasi Mikrofon", 100),
            ("Menyanyikan Nada Konstan (Aaaa pada A4/440Hz)", 430)
        ],
        "sys_actions": [
            ("Menginisialisasi Web Audio API & Deteksi Mic", 210),
            ("Mengukur Tingkat Ambient Noise Selama 3 Detik", 320),
            ("Ekstraksi Pitch Real-Time & Gerakkan Jarum Tuner", 540),
            ("Mengunci Konfigurasi Sensitivitas & Noise Gate", 650, "db")
        ],
        "decision": {
            "y": 320,
            "text": "Sinyal Mic Terdeteksi?",
            "yes_label": "[Jernih/Terdeteksi]",
            "no_label": "[Sinyal 0 dB]",
            "error_msg": "Tampilkan Peringatan Mikrofon Tidak Terhubung"
        },
        "sd_messages": [
            ("user", "view", "1: Buka fitur Chromatic Tuner"),
            ("view", "ctrl", "2: Inisialisasi Web Audio Context"),
            ("ctrl", "view", "3: Izinkan akses mikrofon peramban"),
            ("user", "view", "4: Suarakan nada vokal ke mic"),
            ("view", "ctrl", "5: Kirim audio buffer stream"),
            ("ctrl", "svc", "6: Hitung F0 via algoritma YIN"),
            ("svc", "ctrl", "7: Return pitch Hz & deviasi cents"),
            ("ctrl", "view", "8: Update jarum tuner & VU meter"),
            ("view", "user", "9: Visualisasi akurasi nada terkalibrasi")
        ]
    },
    {
        "id": "07",
        "code": "UC-07",
        "name": "Tes Jangkauan Vokal",
        "actor": "Pengguna",
        "view": "Tampilan Vocal Range Finder",
        "ctrl": "VocalRangeController",
        "svc": "AudioAnalysisService",
        "db": "VocalProfileDB",
        "user_actions": [
            ("Memilih Menu Tes Jangkauan Vokal", 100),
            ("Menyanyikan Nada Terendah yang Nyaman", 320),
            ("Menyanyikan Nada Tertinggi tanpa Memaksa", 540)
        ],
        "sys_actions": [
            ("Memutar Panduan Nada Rendah Piano", 210),
            ("Mendeteksi Nada Terendah Stabil (Lowest Note)", 430),
            ("Mendeteksi Nada Tertinggi Stabil (Highest Note)", 650),
            ("Menghitung Rentang Oktaf & Klasifikasi Suara", 760),
            ("Menyimpan Hasil Jangkauan Vokal ke Database", 870, "db")
        ],
        "decision": {
            "y": 650,
            "text": "Nada Stabil Terdeteksi?",
            "yes_label": "[Stabil]",
            "no_label": "[Tidak Stabil]",
            "error_msg": "Instruksikan Pengguna Mengulang dengan Suara Dada Jelas"
        },
        "sd_messages": [
            ("user", "view", "1: Buka tes jangkauan vokal"),
            ("view", "ctrl", "2: Mulai protokol range finder"),
            ("ctrl", "view", "3: Mainkan nada acuan piano terendah"),
            ("user", "view", "4: Nyanyikan nada terendah"),
            ("view", "ctrl", "5: Kirim sampel audio vokal rendah"),
            ("ctrl", "svc", "6: Ekstraksi nada terendah stabil (misal: E2)"),
            ("ctrl", "view", "7: Mainkan nada acuan piano tertinggi"),
            ("user", "view", "8: Nyanyikan nada tertinggi"),
            ("view", "ctrl", "9: Kirim sampel audio vokal tinggi"),
            ("ctrl", "svc", "10: Ekstraksi nada tertinggi (misal: G4)"),
            ("svc", "ctrl", "11: Klasifikasi tipe suara (Bariton, 2.3 Oktaf)"),
            ("ctrl", "db", "12: Simpan jangkauan vokal ke profil"),
            ("ctrl", "view", "13: Render keyboard piano & tipe suara"),
            ("view", "user", "14: Tampilkan sertifikat jangkauan vokal")
        ]
    },
    {
        "id": "08",
        "code": "UC-08",
        "name": "Perekaman Bernyanyi dan Pitch Visualizer",
        "actor": "Pengguna",
        "view": "Tampilan Singing Studio",
        "ctrl": "RecordingController",
        "svc": "WebAudioService",
        "db": "TempAudioStorage",
        "user_actions": [
            ("Membuka Modul Studio Latihan Menyanyi", 100),
            ("Menekan Tombol Mulai Rekam & Bernyanyi", 210),
            ("Menekan Tombol Selesai Bernyanyi", 540)
        ],
        "sys_actions": [
            ("Mengaktifkan Web Audio API & MediaRecorder", 320),
            ("Menggambar Kurva Pitch Waktu Nyata (Rolling 10s)", 430),
            ("Menghentikan Perekaman & Mengemas Audio Blob", 650),
            ("Mengarahkan ke Layar Pratinjau & Pemangkasan", 760)
        ],
        "decision": {
            "y": 430,
            "text": "Durasi Dalam Kuota?",
            "yes_label": "[Dalam Kuota]",
            "no_label": "[Batas Tercapai]",
            "error_msg": "Otomatis Hentikan Rekam Sesuai Kuota Paket"
        },
        "sd_messages": [
            ("user", "view", "1: Akses Studio Latihan Bernyanyi"),
            ("view", "ctrl", "2: Init Web Audio Context & Canvas"),
            ("user", "view", "3: Tekan tombol Mulai Bernyanyi"),
            ("view", "ctrl", "4: Mulai streaming sinyal mikrofon"),
            ("ctrl", "svc", "5: Ekstraksi F0 real-time per 10ms"),
            ("svc", "view", "6: Kirim koordinat tinggi nada"),
            ("view", "user", "7: Render kurva pitch bergerak di layar"),
            ("user", "view", "8: Tekan tombol Selesai"),
            ("view", "ctrl", "9: Stop MediaRecorder"),
            ("ctrl", "db", "10: Kemas audio blob WAV/WebM sementara"),
            ("ctrl", "view", "11: Tampilkan pemutar pratinjau audio")
        ]
    },
    {
        "id": "09",
        "code": "UC-09",
        "name": "Unggah Berkas Rekaman Vokal",
        "actor": "Pengguna",
        "view": "Tampilan Unggah Audio",
        "ctrl": "UploadController",
        "svc": "AudioValidationService",
        "db": "StorageServer",
        "user_actions": [
            ("Membuka Tab Unggah Rekaman Vokal", 100),
            ("Memilih / Drag-and-Drop Berkas Audio", 210),
            ("Menekan Tombol Kirim untuk Dianalisis", 540)
        ],
        "sys_actions": [
            ("Memvalidasi Ekstensi Berkas (.wav, .mp3, .m4a)", 320),
            ("Memvalidasi Batas Ukuran File (< 25 MB)", 430),
            ("Mengunggah Berkas Audio ke Server Backend", 650, "db"),
            ("Meneruskan Audio ke Antrian AI Singing Engine", 760)
        ],
        "decision": {
            "y": 430,
            "text": "Format & Size Valid?",
            "yes_label": "[Valid]",
            "no_label": "[Tidak Valid]",
            "error_msg": "Tolak Berkas & Tampilkan Ketentuan Format Audio"
        },
        "sd_messages": [
            ("user", "view", "1: Buka tab Unggah Audio"),
            ("user", "view", "2: Pilih file rekaman vokal"),
            ("view", "ctrl", "3: Validasi MIME type & ukuran"),
            ("ctrl", "svc", "4: Periksa header file audio"),
            ("svc", "ctrl", "5: File valid (<25MB)"),
            ("user", "view", "6: Klik Kirim untuk Dianalisis"),
            ("view", "ctrl", "7: POST /api/audio/upload"),
            ("ctrl", "db", "8: Simpan file ke server storage"),
            ("db", "ctrl", "9: File upload ID terbit"),
            ("ctrl", "view", "10: Berkas siap dianalisis"),
            ("view", "user", "11: Tampilkan status unggah berhasil")
        ]
    },
    {
        "id": "10",
        "code": "UC-10",
        "name": "Putar Ulang dan Pangkas Vokal",
        "actor": "Pengguna",
        "view": "Tampilan Vocal Trimmer",
        "ctrl": "AudioTrimmerController",
        "svc": "AudioProcessingService",
        "db": "TempAudioStorage",
        "user_actions": [
            ("Mendengarkan Pemutaran Pratinjau Rekaman", 100),
            ("Menggeser Bilah Pemangkas Awal & Akhir Audio", 210),
            ("Menekan Tombol Terapkan Pemangkasan", 430)
        ],
        "sys_actions": [
            ("Merender Timeline Gelombang Suara (Waveform)", 100),
            ("Menyesuaikan Rentang Waktu Pemotongan Audio", 320),
            ("Memotong Buffer Audio Berkas Vokal", 540),
            ("Meneruskan Audio Bersih ke AI Analysis Engine", 650, "db")
        ],
        "decision": {
            "y": 320,
            "text": "Rentang Pangkas Valid?",
            "yes_label": "[Valid (>3 Detik)]",
            "no_label": "[Kurang dari 3 Detik]",
            "error_msg": "Peringatkan Durasi Terlalu Pendek untuk Dianalisis"
        },
        "sd_messages": [
            ("user", "view", "1: Cek waveform audio rekaman"),
            ("user", "view", "2: Geser trim handle awal & akhir"),
            ("view", "ctrl", "3: Kirim parameter start/end timestamp"),
            ("user", "view", "4: Klik Terapkan Pemangkasan"),
            ("view", "ctrl", "5: Eksekusi pemotongan audio buffer"),
            ("ctrl", "svc", "6: Slice audio stream"),
            ("svc", "db", "7: Simpan audio hasil pangkasan"),
            ("db", "ctrl", "8: Audio bersih siap diproses"),
            ("ctrl", "view", "9: Kirim ke modul AI Singing Analysis")
        ]
    },
    {
        "id": "11",
        "code": "UC-11",
        "name": "Analisis Suara Bernyanyi AI",
        "actor": "Pengguna",
        "view": "Layar Pemrosesan Analisis",
        "ctrl": "AnalysisController",
        "svc": "AISingingEngine",
        "db": "ReportDB",
        "user_actions": [
            ("Menunggu Proses Ekstraksi AI Berlangsung", 100)
        ],
        "sys_actions": [
            ("Ekstraksi Pitch F0 (Algoritma YIN / CREPE)", 210),
            ("Hitung Deviasi Cents & Deteksi Flat / Sharp", 320),
            ("Kalkulasi Kualitas Vibrato (5-7Hz) & Kestabilan Sustain", 430),
            ("Ukur Keseimbangan Resonansi (Chest, Mask, Head)", 540),
            ("Agregasi Skor Bernyanyi & Susun Saran Vokal AI", 650),
            ("Simpan Lembar Rapor ke Database", 760, "db")
        ],
        "decision": {
            "y": 320,
            "text": "Vokal Manusia Jernih?",
            "yes_label": "[Jernih/Terdeteksi]",
            "no_label": "[Terlalu Bising]",
            "error_msg": "Peringatkan Audio Terlalu Bising / Nada Tidak Terdeteksi"
        },
        "sd_messages": [
            ("ctrl", "svc", "1: Kirim audio blob bernyanyi"),
            ("svc", "svc", "2: Ekstraksi F0 & notasi nada musik"),
            ("svc", "svc", "3: Hitung deviasi cents & label flat/sharp"),
            ("svc", "svc", "4: Evaluasi laju vibrato & penahanan nada"),
            ("svc", "svc", "5: Analisis resonansi (Chest, Mask, Head)"),
            ("svc", "svc", "6: Kalkulasi skor keseluruhan (0-100)"),
            ("svc", "ctrl", "7: Return payload lengkap evaluasi vokal"),
            ("ctrl", "db", "8: Simpan rapor vokal ke database"),
            ("ctrl", "view", "9: Teruskan payload hasil analisis"),
            ("view", "user", "10: Notifikasi analisis vokal selesai")
        ]
    },
    {
        "id": "12",
        "code": "UC-12",
        "name": "Menampilkan Rapor dan Piano Roll",
        "actor": "Pengguna",
        "view": "Tampilan Rapor Bernyanyi",
        "ctrl": "ReportController",
        "svc": "VisualizationService",
        "db": "ReportDB",
        "user_actions": [
            ("Membuka Lembar Rapor Hasil Analisis Vokal", 100),
            ("Memeriksa Skor, Radar Chart & Piano Roll", 320)
        ],
        "sys_actions": [
            ("Menampilkan Lencana Skor Bernyanyi Keseluruhan", 210),
            ("Merender Radar Chart 5 Dimensi Bernyanyi", 430),
            ("Merender Diagram Batang Keseimbangan Resonansi", 540),
            ("Merender Kanvas Piano Roll Interaktif Berkode Warna", 650),
            ("Menyajikan Kartu Saran Perbaikan Vokal AI", 760)
        ],
        "decision": {
            "y": 430,
            "text": "Status Tier Pengguna?",
            "yes_label": "[Pro/Premium]",
            "no_label": "[Free Tier]",
            "error_msg": "Tampilkan Tombol Simpan & Penawaran Upgrade Paket"
        },
        "sd_messages": [
            ("user", "view", "1: Buka lembar rapor evaluasi"),
            ("view", "ctrl", "2: Request data visualisasi rapor"),
            ("ctrl", "db", "3: Query laporan vokal by ID"),
            ("db", "ctrl", "4: Return skor, cents, data piano roll"),
            ("ctrl", "svc", "5: Format data radar chart & resonansi"),
            ("svc", "ctrl", "6: Dataset siap dirender"),
            ("ctrl", "view", "7: Render rapor bernyanyi lengkap"),
            ("view", "user", "8: Tampilkan skor, piano roll, & resonansi")
        ]
    },
    {
        "id": "13",
        "code": "UC-13",
        "name": "Putar Audio Terikat Nada Fals",
        "actor": "Pengguna",
        "view": "Kanvas Piano Roll",
        "ctrl": "PlayerController",
        "svc": "AudioSyncService",
        "db": "ReportDB",
        "user_actions": [
            ("Mengamati Balok Nada Berwarna Merah (Flat/Sharp)", 100),
            ("Mengklik Balok Nada Fals Tertentu", 210)
        ],
        "sys_actions": [
            ("Membaca Timestamp Detik Balok Nada yang Dipilih", 320),
            ("Memindahkan Seek Bar Audio Player ke Detik Tersebut", 430),
            ("Memutar Audio Rekaman Tepat di Titik Nada Fals", 540),
            ("Menampilkan Indikator Deviasi Cents di Layar", 650)
        ],
        "decision": {
            "y": 320,
            "text": "Data Timestamp Ada?",
            "yes_label": "[Ditemukan]",
            "no_label": "[Tidak Ada]",
            "error_msg": "Putar Audio dari Posisi Terakhir"
        },
        "sd_messages": [
            ("user", "view", "1: Klik balok nada fals pada Piano Roll"),
            ("view", "ctrl", "2: Kirim note ID yang diklik"),
            ("ctrl", "svc", "3: Cari start_time nada dalam metadata"),
            ("svc", "ctrl", "4: Return timestamp (misal: detik 14.2)"),
            ("ctrl", "view", "5: Seek pemutar audio ke detik 14.2"),
            ("view", "user", "6: Audio diputar tepat pada nada fals"),
            ("view", "user", "7: Tampilkan label deviasi cents nada tersebut")
        ]
    },
    {
        "id": "14",
        "code": "UC-14",
        "name": "Menyimpan Rapor Nyanyi",
        "actor": "Pengguna",
        "view": "Tampilan Riwayat Rapor",
        "ctrl": "ReportArchiveController",
        "svc": "CloudStorageService",
        "db": "ReportDB",
        "user_actions": [
            ("Menekan Tombol Simpan Rapor ke Akun Saya", 100)
        ],
        "sys_actions": [
            ("Memeriksa Status Langganan Akun Pengguna", 210, "db"),
            ("Mengunggah Berkas Audio Rekaman ke Cloud Storage", 430),
            ("Menyimpan Metadata Rapor & Menautkan ke User ID", 540, "db"),
            ("Menampilkan Konfirmasi Rapor Berhasil Diarsipkan", 650)
        ],
        "decision": {
            "y": 210,
            "text": "Tier Pro / Premium?",
            "yes_label": "[Berbayar]",
            "no_label": "[Free Tier]",
            "error_msg": "Tampilkan Modal Peningkatan Paket Langganan Pro"
        },
        "sd_messages": [
            ("user", "view", "1: Klik Simpan Rapor"),
            ("view", "ctrl", "2: Request penyimpanan rapor"),
            ("ctrl", "db", "3: Cek tier langganan pengguna"),
            ("db", "ctrl", "4: Status aktif Tier Pro"),
            ("ctrl", "svc", "5: Upload berkas audio ke S3 bucket"),
            ("svc", "ctrl", "6: Audio URL terbit"),
            ("ctrl", "db", "7: Insert record tabel vocal_reports"),
            ("db", "ctrl", "8: Simpan sukses"),
            ("ctrl", "view", "9: Notifikasi rapor berhasil diarsipkan"),
            ("view", "user", "10: Rapor tersimpan permanen di akun")
        ]
    },
    {
        "id": "15",
        "code": "UC-15",
        "name": "Mengekspor Rapor dan Sertifikat PDF",
        "actor": "Pengguna",
        "view": "Tampilan Rapor Vokal",
        "ctrl": "ExportPDFController",
        "svc": "PDFCompilerService",
        "db": "ReportDB",
        "user_actions": [
            ("Membuka Detail Rapor Evaluasi Bernyanyi", 100),
            ("Menekan Tombol Unduh Rapor & Sertifikat PDF", 210)
        ],
        "sys_actions": [
            ("Menarik Data Skor, Cents, & Resonansi dari Database", 320, "db"),
            ("Menyusun Tata Letak Dokumen Resmi & Sertifikat", 430),
            ("Mengompilasi Berkas Menjadi PDF Biner", 540),
            ("Memicu Pengunduhan Otomatis Berkas PDF ke Browser", 650)
        ],
        "decision": {
            "y": 430,
            "text": "Kompilasi Sukses?",
            "yes_label": "[Sukses]",
            "no_label": "[Gagal]",
            "error_msg": "Tampilkan Notifikasi Gagal Membuat Dokumen PDF"
        },
        "sd_messages": [
            ("user", "view", "1: Klik Unduh Rapor PDF & Sertifikat"),
            ("view", "ctrl", "2: Request export PDF"),
            ("ctrl", "db", "3: Ambil rincian data rapor vokal"),
            ("db", "ctrl", "4: Return data evaluasi vokal lengkap"),
            ("ctrl", "svc", "5: Susun dokumen PDF bersertifikat"),
            ("svc", "ctrl", "6: Return berkas biner PDF"),
            ("ctrl", "view", "7: Stream berkas PDF ke browser"),
            ("view", "user", "8: Dokumen rapor PDF terunduh otomatis")
        ]
    },
    {
        "id": "16",
        "code": "UC-16",
        "name": "Membandingkan Dua Sesi Rekaman Nyanyi",
        "actor": "Pengguna",
        "view": "Tampilan Perbandingan Sesi",
        "ctrl": "ComparisonController",
        "svc": "AnalyticsService",
        "db": "ReportDB",
        "user_actions": [
            ("Membuka Daftar Riwayat Rekaman Vokal", 100),
            ("Mencentang Tepat 2 Sesi Latihan yang Ingin Dibandingkan", 210),
            ("Menekan Tombol Bandingkan Sesi", 320)
        ],
        "sys_actions": [
            ("Menarik Data Skor & Nada Kedua Sesi dari Database", 430, "db"),
            ("Menghitung Delta Kenaikan Skor & In-Tune Rate", 540),
            ("Merender Grafik Komparasi Kurva Nada Sesi Lama vs Baru", 650),
            ("Menyajikan Rangkuman Evaluasi Kemajuan Vokal", 760)
        ],
        "decision": {
            "y": 320,
            "text": "Jumlah Sesi == 2?",
            "yes_label": "[Tepat 2 Sesi]",
            "no_label": "[Bukan 2 Sesi]",
            "error_msg": "Peringatkan Pengguna Memilih Tepat 2 Sesi Rekaman"
        },
        "sd_messages": [
            ("user", "view", "1: Pilih 2 sesi rekaman vokal"),
            ("user", "view", "2: Klik Bandingkan Sesi"),
            ("view", "ctrl", "3: Request komparasi sesi A & B"),
            ("ctrl", "db", "4: Query data sesi A dan sesi B"),
            ("db", "ctrl", "5: Return data kedua sesi"),
            ("ctrl", "svc", "6: Hitung selisih in-tune % & resonansi"),
            ("svc", "ctrl", "7: Hasil komparasi siap"),
            ("ctrl", "view", "8: Render grafik komparasi berdampingan"),
            ("view", "user", "9: Tampilkan perbandingan before-after")
        ]
    },
    {
        "id": "17",
        "code": "UC-17",
        "name": "Memantau Dasbor Progres Vokal",
        "actor": "Pengguna",
        "view": "Tampilan Progress Dashboard",
        "ctrl": "ProgressController",
        "svc": "ProgressService",
        "db": "ProgressDB",
        "user_actions": [
            ("Membuka Menu Pelacakan Kemajuan Vokal", 100)
        ],
        "sys_actions": [
            ("Memeriksa Hak Akses Keanggotaan Tier Premium", 210, "db"),
            ("Menarik Seluruh Histori Skor & Jangkauan Vokal", 320, "db"),
            ("Mengkalkulasi Tren In-Tune Rate Mingguan & Bulanan", 430),
            ("Merender Grafik Perluasan Tuts Jangkauan Vokal", 540),
            ("Menampilkan Statistik Total Jam Latihan & Kartu Wawasan", 650)
        ],
        "decision": {
            "y": 210,
            "text": "Status Tier Premium?",
            "yes_label": "[Premium]",
            "no_label": "[Bukan Premium]",
            "error_msg": "Tampilkan Penawaran Upgrade ke Tier Premium"
        },
        "sd_messages": [
            ("user", "view", "1: Buka dasbor pelacakan progres vokal"),
            ("view", "ctrl", "2: Request data progres pengguna"),
            ("ctrl", "db", "3: Cek status Premium & ambil data riwayat"),
            ("db", "ctrl", "4: Return riwayat sesi bernyanyi"),
            ("ctrl", "svc", "5: Hitung tren perluasan range vokal"),
            ("svc", "ctrl", "6: Dataset tren siap dirender"),
            ("ctrl", "view", "7: Render dasbor progres vokal interaktif"),
            ("view", "user", "8: Tampilkan grafik peningkatan akurasi nada")
        ]
    },
    {
        "id": "18",
        "code": "UC-18",
        "name": "Melacak Streak dan Lencana Vokal",
        "actor": "Pengguna",
        "view": "Tampilan Pencapaian Vokal",
        "ctrl": "GamificationController",
        "svc": "StreakService",
        "db": "GamificationDB",
        "user_actions": [
            ("Menyelesaikan Latihan Bernyanyi Hari Ini", 100)
        ],
        "sys_actions": [
            ("Memeriksa Tanggal Latihan Terakhir dari Database", 210, "db"),
            ("Memperbarui Angka Streak Latihan Harian", 320),
            ("Mengevaluasi Pencapaian Milestone Lencana", 430),
            ("Membuka Kunci (Unlock) Lencana Prestasi Baru di Database", 540, "db"),
            ("Menampilkan Modal Animasi Perayaan Pencapaian", 650)
        ],
        "decision": {
            "y": 320,
            "text": "Latihan Berturut-turut?",
            "yes_label": "[Streak +1]",
            "no_label": "[Terputus >48 Jam]",
            "error_msg": "Reset Counter Streak Menjadi 1 Hari"
        },
        "sd_messages": [
            ("ctrl", "svc", "1: Evaluasi streak setelah sesi rekaman"),
            ("svc", "db", "2: Ambil tanggal latihan terakhir"),
            ("db", "svc", "3: Return last_practiced_at"),
            ("svc", "svc", "4: Hitung penambahan streak harian"),
            ("svc", "db", "5: Cek milestone lencana baru (Pitch Master)"),
            ("db", "svc", "6: Lencana baru terpenuhi"),
            ("svc", "db", "7: Update streak & unlock lencana di DB"),
            ("svc", "ctrl", "8: Return status lencana baru"),
            ("ctrl", "view", "9: Tampilkan animasi modal lencana"),
            ("view", "user", "10: Selamat! Lencana baru terbuka")
        ]
    },
    {
        "id": "19",
        "code": "UC-19",
        "name": "Menghasilkan Kurikulum Vokal AI",
        "actor": "Pengguna",
        "view": "Tampilan AI Vocal Coach",
        "ctrl": "AICoachController",
        "svc": "LLMCoachService",
        "db": "CurriculumDB",
        "user_actions": [
            ("Membuka Modul AI Vocal Coach / Planner", 100),
            ("Menekan Tombol Buat Kurikulum Latihan Personal", 210)
        ],
        "sys_actions": [
            ("Mengumpulkan Data 5 Rapor Terakhir untuk Diagnosis", 320, "db"),
            ("Mengirim Prompt Diagnosis ke Google Gemini API", 430),
            ("Model AI Menyusun Silabus Latihan Tangga Nada 7-30 Hari", 540),
            ("Menyimpan Kurikulum Adaptif ke Database", 650, "db"),
            ("Menampilkan Kalender Latihan Vokal Harian", 760)
        ],
        "decision": {
            "y": 430,
            "text": "LLM API Responsif?",
            "yes_label": "[Berhasil]",
            "no_label": "[Timeout]",
            "error_msg": "Gunakan Kurikulum Standar Berbasis Aturan Vokal"
        },
        "sd_messages": [
            ("user", "view", "1: Buka AI Vocal Coach"),
            ("user", "view", "2: Klik Buat Kurikulum Latihan Baru"),
            ("view", "ctrl", "3: Request pembuatan kurikulum"),
            ("ctrl", "db", "4: Tarik data kelemahan nada 5 sesi terakhir"),
            ("db", "ctrl", "5: Return profil kelemahan vokal"),
            ("ctrl", "svc", "6: Kirim prompt diagnosis ke Google Gemini"),
            ("svc", "ctrl", "7: Return silabus latihan 14 hari & tangga nada"),
            ("ctrl", "db", "8: Simpan kurikulum ke tabel ai_practice_plans"),
            ("db", "ctrl", "9: Kurikulum aktif tersimpan"),
            ("ctrl", "view", "10: Render kalender tugas latihan harian"),
            ("view", "user", "11: Tampilkan kurikulum latihan vokal siap pakai")
        ]
    },
    {
        "id": "20",
        "code": "UC-20",
        "name": "Menjalankan Sesi Latihan Tangga Nada",
        "actor": "Pengguna",
        "view": "Tampilan Guided Drill Session",
        "ctrl": "DrillController",
        "svc": "DrillEvaluationService",
        "db": "CurriculumDB",
        "user_actions": [
            ("Memilih Tugas Latihan Tangga Nada Hari Ini", 100),
            ("Mendengarkan Nada Acuan Piano Solfeggio", 210),
            ("Menyanyikan Nada Menirukan Panduan Audio", 430),
            ("Menekan Tombol Selesai Latihan Drill", 540)
        ],
        "sys_actions": [
            ("Memuat Materi Notasi & Audio Tangga Nada", 210),
            ("Merekam Suara & Melacak Ketepatan Nada Real-Time", 430),
            ("Menghitung Skor Kelulusan Kepatuhan Nada Drill", 650),
            ("Memperbarui Status Tugas Menjadi Selesai di Database", 760, "db")
        ],
        "decision": {
            "y": 650,
            "text": "Skor Drill >= 70%?",
            "yes_label": "[Lulus]",
            "no_label": "[Belum Lulus]",
            "error_msg": "Berikan Pilihan Mengulang Sesi Latihan Tangga Nada"
        },
        "sd_messages": [
            ("user", "view", "1: Pilih tugas drill tangga nada hari ini"),
            ("view", "ctrl", "2: Ambil audio panduan tangga nada"),
            ("ctrl", "view", "3: Mainkan sampel nada piano C4-E4-G4"),
            ("user", "view", "4: Bernyanyi menirukan nada piano"),
            ("view", "ctrl", "5: Streaming audio vokal drill"),
            ("ctrl", "svc", "6: Bandingkan nada vokal vs nada target"),
            ("user", "view", "7: Klik Selesai Drill"),
            ("view", "ctrl", "8: Hitung kepatuhan nada solfeggio"),
            ("ctrl", "db", "9: Update status tugas hari ini: Selesai"),
            ("db", "ctrl", "10: Update progres kurikulum berhasil"),
            ("ctrl", "view", "11: Tampilkan evaluasi drill & skor kelulusan"),
            ("view", "user", "12: Tugas latihan harian selesai!")
        ]
    },
    {
        "id": "21",
        "code": "UC-21",
        "name": "Memilih Paket dan Membayar Langganan",
        "actor": "Pengguna",
        "view": "Tampilan Pricing & Checkout",
        "ctrl": "SubscriptionController",
        "svc": "PaymentGatewayService",
        "db": "SubscriptionDB",
        "user_actions": [
            ("Membuka Halaman Katalog Paket & Harga", 100),
            ("Memilih Paket Pro/Premium & Klik Beli Sekarang", 210),
            ("Menyelesaikan Pembayaran di Modal Snap", 430)
        ],
        "sys_actions": [
            ("Membuat Transaksi Baru Status Pending di Database", 320, "db"),
            ("Meminta Token Transaksi ke Midtrans API", 320),
            ("Menampilkan Modal Pembayaran Snap Window", 430),
            ("Menerima Webhook Settlement & Aktivasi Tier Otomatis", 650, "db"),
            ("Menampilkan Konfirmasi Sukses Pembayaran", 760)
        ],
        "decision": {
            "y": 650,
            "text": "Pembayaran Berhasil?",
            "yes_label": "[Settled]",
            "no_label": "[Pending/Cancel]",
            "error_msg": "Pertahankan Status Pending Hingga Batas Waktu Habis"
        },
        "sd_messages": [
            ("user", "view", "1: Pilih Paket Langganan Pro/Premium"),
            ("user", "view", "2: Klik Beli Sekarang"),
            ("view", "ctrl", "3: Request checkout subscription"),
            ("ctrl", "db", "4: Insert transaksi status Pending"),
            ("ctrl", "svc", "5: Request Snap Token ke Midtrans"),
            ("svc", "ctrl", "6: Return snap_token"),
            ("ctrl", "view", "7: Tampilkan jendela pembayaran Snap"),
            ("user", "view", "8: Selesaikan pembayaran via VA/E-Wallet"),
            ("svc", "ctrl", "9: Webhook settlement diterima"),
            ("ctrl", "db", "10: Update status transaksi Settled & tier aktif"),
            ("db", "ctrl", "11: Tier keanggotaan diperbarui"),
            ("ctrl", "view", "12: Tampilkan konfirmasi aktivasi paket"),
            ("view", "user", "13: Selamat datang di VocalSense Pro/Premium!")
        ]
    },
    {
        "id": "22",
        "code": "UC-22",
        "name": "Melihat Riwayat Tagihan dan Invoice",
        "actor": "Pengguna",
        "view": "Tampilan Tagihan & Langganan",
        "ctrl": "BillingController",
        "svc": "InvoiceService",
        "db": "BillingDB",
        "user_actions": [
            ("Membuka Menu Tagihan & Langganan Saya", 100),
            ("Melihat Daftar Invoice & Masa Aktif Paket", 210),
            ("Menekan Tombol Unduh Bukti Bayar PDF", 320)
        ],
        "sys_actions": [
            ("Menarik Data Langganan & Tagihan dari Database", 210, "db"),
            ("Menampilkan Tabel Faktur Pembayaran Lengkap", 210),
            ("Mengompilasi Lembar Bukti Bayar Resmi Format PDF", 430),
            ("Mengunduh Bukti Pembayaran ke Perangkat Pengguna", 540)
        ],
        "decision": {
            "y": 320,
            "text": "Data Tagihan Ditemukan?",
            "yes_label": "[Ditemukan]",
            "no_label": "[Belum Ada Transaksi]",
            "error_msg": "Tampilkan Pesan Riwayat Tagihan Masih Kosong"
        },
        "sd_messages": [
            ("user", "view", "1: Akses menu Tagihan & Langganan"),
            ("view", "ctrl", "2: Request daftar riwayat tagihan"),
            ("ctrl", "db", "3: Query transactions by user_id"),
            ("db", "ctrl", "4: Return daftar invoice pembayaran"),
            ("ctrl", "view", "5: Tampilkan tabel riwayat tagihan"),
            ("user", "view", "6: Klik Unduh Bukti Bayar PDF"),
            ("view", "ctrl", "7: Request invoice PDF by order_id"),
            ("ctrl", "svc", "8: Generate invoice receipt PDF"),
            ("svc", "ctrl", "9: Return binary PDF"),
            ("ctrl", "view", "10: Unduh file invoice PDF"),
            ("view", "user", "11: Bukti bayar tersimpan di perangkat")
        ]
    },
    {
        "id": "23",
        "code": "UC-23",
        "name": "Manajemen Pengguna dan Tier",
        "actor": "Administrator",
        "view": "Panel Admin Manajemen Pengguna",
        "ctrl": "AdminUserController",
        "svc": "AdminService",
        "db": "UserDB",
        "user_actions": [
            ("Membuka Panel Manajemen Pengguna", 100),
            ("Mencari Pengguna & Memilih Aksi Suspend/Ubah Tier", 320),
            ("Menekan Tombol Konfirmasi Aksi", 540)
        ],
        "sys_actions": [
            ("Menampilkan Daftar Seluruh Pengguna & Status Tier", 210, "db"),
            ("Memvalidasi Hak Akses Administrator", 430),
            ("Memperbarui Status Akun / Masa Aktif Tier di Database", 650, "db"),
            ("Mencatat Aksi ke Dalam Log Audit Administrator", 760, "db"),
            ("Menampilkan Notifikasi Aksi Berhasil Diterapkan", 870)
        ],
        "decision": {
            "y": 430,
            "text": "Hak Akses Admin Valid?",
            "yes_label": "[Authorized]",
            "no_label": "[Bukan Admin]",
            "error_msg": "Tolak Akses & Catat Upaya Ilegal di Security Log"
        },
        "sd_messages": [
            ("admin", "view", "1: Akses panel Manajemen Pengguna"),
            ("view", "ctrl", "2: Request user list data"),
            ("ctrl", "db", "3: Query all users and tiers"),
            ("db", "ctrl", "4: Return user dataset"),
            ("ctrl", "view", "5: Render tabel manajemen pengguna"),
            ("admin", "view", "6: Pilih user & sesuaikan tier / status"),
            ("view", "ctrl", "7: Submit update user tier"),
            ("ctrl", "svc", "8: Validasi wewenang admin"),
            ("svc", "db", "9: Update status akun / tier pengguna"),
            ("svc", "db", "10: Insert audit log admin"),
            ("db", "svc", "11: Data updated"),
            ("svc", "ctrl", "12: Aksi berhasil dieksekusi"),
            ("ctrl", "view", "13: Tampilkan notifikasi pembaruan sukses"),
            ("view", "admin", "14: Status akun pengguna berhasil diperbarui")
        ]
    },
    {
        "id": "24",
        "code": "UC-24",
        "name": "Pemantauan Analitik Finansial dan Sistem",
        "actor": "Administrator",
        "view": "Dashboard Admin Analitik & Sistem",
        "ctrl": "AdminAnalyticsController",
        "svc": "SystemConfigService",
        "db": "AnalyticsDB",
        "user_actions": [
            ("Membuka Dashboard Analitik & Pengaturan Sistem", 100),
            ("Memilih Rentang Filter Data (30 Hari Terakhir)", 210),
            ("Memperbarui Batas Toleransi Cents Nada Fals Global", 430)
        ],
        "sys_actions": [
            ("Mengambil Rekapitulasi Omset & Utilisasi Komputasi AI", 320, "db"),
            ("Menampilkan KPI Pendapatan, Rasio Konversi, & Grafik Beban", 320),
            ("Menyimpan Parameter Konfigurasi Baru ke Database", 540, "db"),
            ("Menerapkan Nilai Ambang Batas Cents Secara Global", 650)
        ],
        "decision": {
            "y": 430,
            "text": "Parameter Dalam Rentang Aman?",
            "yes_label": "[Valid 10-50 Cents]",
            "no_label": "[Di Luar Batas]",
            "error_msg": "Peringatkan Nilai Ambang Batas Tidak Sesuai Standar Akustik"
        },
        "sd_messages": [
            ("admin", "view", "1: Buka dashboard analitik finansial & sistem"),
            ("view", "ctrl", "2: Request rekapitulasi metrik omset & server AI"),
            ("ctrl", "db", "3: Query financial reports & AI task processing time"),
            ("db", "ctrl", "4: Return data analitik KPI"),
            ("ctrl", "view", "5: Render visualisasi grafik omset & utilisasi"),
            ("admin", "view", "6: Ubah ambang batas toleransi deviasi cents"),
            ("view", "ctrl", "7: Submit parameter konfigurasi vokal baru"),
            ("ctrl", "svc", "8: Validasi nilai cents threshold"),
            ("svc", "db", "9: Update global_system_settings"),
            ("db", "svc", "10: Settings saved"),
            ("svc", "ctrl", "11: Terapkan konfigurasi ke AI Engine"),
            ("ctrl", "view", "12: Notifikasi parameter berhasil diperbarui"),
            ("view", "admin", "13: Dashboard analitik & konfigurasi tersinkronisasi")
        ]
    }
]

# ----------------------------------------------------------------------
# 1. GENERATE USE CASE DIAGRAM (MATCHING APPL TEMPLATE)
# ----------------------------------------------------------------------
def generate_usecase_drawio():
    xml = """<mxfile><diagram id="uc_final_neat" name="Use Case Diagram VocalSense AI"><mxGraphModel dx="1200" dy="800"><root><mxCell id="0" /><mxCell id="1" parent="0" />
    <mxCell id="boundary" value="Sistem VocalSense AI (AI Singing &amp; Vocal Trainer)" style="shape=rect;fillColor=none;strokeWidth=2;align=center;verticalAlign=top;fontSize=18;fontStyle=1;" vertex="1" parent="1"><mxGeometry x="250" y="50" width="720" height="1580" as="geometry" /></mxCell>
    <mxCell id="a_pengguna" value="Penyanyi /&#xa;Pengguna" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;" vertex="1" parent="1"><mxGeometry x="70" y="720" width="50" height="90" as="geometry" /></mxCell>
    <mxCell id="a_admin" value="Administrator" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;" vertex="1" parent="1"><mxGeometry x="1070" y="1450" width="50" height="90" as="geometry" /></mxCell>
"""
    # 24 Use Cases (12 Left column, 12 Right column)
    y_start = 100
    spacing = 60
    for i in range(12):
        uc = USE_CASES[i]
        y = y_start + i * spacing
        xml += f'    <mxCell id="uc-{uc["id"]}" value="{uc["code"]} {uc["name"]}" style="ellipse;whiteSpace=wrap;html=1;" vertex="1" parent="1"><mxGeometry x="290" y="{y}" width="260" height="48" as="geometry" /></mxCell>\n'
        xml += f'    <mxCell id="edge_{uc["id"]}" style="endArrow=none;html=1;" edge="1" parent="1" source="a_pengguna" target="uc-{uc["id"]}" />\n'

    for i in range(12, 24):
        uc = USE_CASES[i]
        idx = i - 12
        y = y_start + idx * spacing
        xml += f'    <mxCell id="uc-{uc["id"]}" value="{uc["code"]} {uc["name"]}" style="ellipse;whiteSpace=wrap;html=1;" vertex="1" parent="1"><mxGeometry x="670" y="{y}" width="260" height="48" as="geometry" /></mxCell>\n'
        if i < 22:
            xml += f'    <mxCell id="edge_{uc["id"]}" style="endArrow=none;html=1;" edge="1" parent="1" source="a_pengguna" target="uc-{uc["id"]}" />\n'
        else:
            xml += f'    <mxCell id="edge_{uc["id"]}" style="endArrow=none;html=1;" edge="1" parent="1" source="uc-{uc["id"]}" target="a_admin" />\n'

    # Dependencies
    xml += '    <mxCell id="dep_03_02" value="«extend»" style="endArrow=open;dashed=1;html=1;" edge="1" parent="1" source="uc-03" target="uc-02" />\n'
    xml += '    <mxCell id="dep_10_08" value="«extend»" style="endArrow=open;dashed=1;html=1;" edge="1" parent="1" source="uc-10" target="uc-08" />\n'
    xml += '    <mxCell id="dep_13_12" value="«extend»" style="endArrow=open;dashed=1;html=1;" edge="1" parent="1" source="uc-13" target="uc-12" />\n'
    xml += '    <mxCell id="dep_20_19" value="«extend»" style="endArrow=open;dashed=1;html=1;" edge="1" parent="1" source="uc-20" target="uc-19" />\n'

    xml += '</root></mxGraphModel></diagram></mxfile>'
    
    path1 = os.path.join(UC_DIR, "usecase_diagram_final.drawio")
    path2 = os.path.join(UC_DIR, "usecase_diagram_vocal_sense.drawio")
    with open(path1, "w", encoding="utf-8") as f:
        f.write(xml)
    with open(path2, "w", encoding="utf-8") as f:
        f.write(xml)
    print("Generated usecase_diagram_final.drawio and usecase_diagram_vocal_sense.drawio")

# ----------------------------------------------------------------------
# 2. GENERATE ALL 24 ACTIVITY DIAGRAMS (1:1 CORRESPONDENCE)
# ----------------------------------------------------------------------
def generate_activity_diagram_drawio(uc):
    safe_name = re.sub(r'[^a-zA-Z0-9_]', '_', uc['name'])
    filename = f"AD-{uc['id']}_{safe_name}.drawio"
    filepath = os.path.join(AD_DIR, filename)

    actor_label = uc['actor']
    user_acts = uc['user_actions']
    sys_acts = uc['sys_actions']
    dec = uc.get('decision', None)

    total_height = 1300
    xml = f"""<mxfile host="65bd71144e">
    <diagram name="AD-{uc['id']} {uc['name']}" id="id_AD-{uc['id']}">
        <mxGraphModel dx="1200" dy="1400" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1653" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                <mxCell id="lane_0" value="{actor_label}" style="swimlane;startSize=30;" parent="1" vertex="1">
                    <mxGeometry x="0" y="40" width="330" height="{total_height}" as="geometry"/>
                </mxCell>
                <mxCell id="n_start" value="" style="ellipse;fillColor=#000000;" parent="lane_0" vertex="1">
                    <mxGeometry x="152.5" y="50" width="25" height="25" as="geometry"/>
                </mxCell>
"""
    # User actions in lane_0
    y_u = 110
    user_node_ids = []
    for idx, (act_text, _) in enumerate(user_acts):
        node_id = f"n_u{idx+1}"
        user_node_ids.append(node_id)
        xml += f"""                <mxCell id="{node_id}" value="{act_text}" style="rounded=1;whiteSpace=wrap;html=1;" parent="lane_0" vertex="1">
                    <mxGeometry x="95" y="{y_u}" width="140" height="65" as="geometry"/>
                </mxCell>
"""
        y_u += 140

    xml += f"""                <mxCell id="lane_1" value="Sistem" style="swimlane;startSize=30;" parent="1" vertex="1">
                    <mxGeometry x="330" y="40" width="330" height="{total_height}" as="geometry"/>
                </mxCell>
"""
    # System actions in lane_1
    y_s = 180
    sys_node_ids = []
    for idx, act in enumerate(sys_acts):
        act_text = act[0]
        node_id = f"n_s{idx+1}"
        sys_node_ids.append(node_id)
        xml += f"""                <mxCell id="{node_id}" value="{act_text}" style="rounded=1;whiteSpace=wrap;html=1;" parent="lane_1" vertex="1">
                    <mxGeometry x="95" y="{y_s}" width="140" height="65" as="geometry"/>
                </mxCell>
"""
        y_s += 140

    # Decision diamond
    if dec:
        xml += f"""                <mxCell id="n_d1" value="{dec['text']}" style="rhombus;" parent="lane_1" vertex="1">
                    <mxGeometry x="120" y="{y_s}" width="90" height="80" as="geometry"/>
                </mxCell>
                <mxCell id="n_err" value="{dec['error_msg']}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fee2e2;strokeColor=#ef4444;" parent="lane_1" vertex="1">
                    <mxGeometry x="10" y="{y_s + 110}" width="140" height="65" as="geometry"/>
                </mxCell>
"""
        y_s += 200

    # End node in lane_1
    xml += f"""                <mxCell id="n_end" value="" style="shape=doubleEllipse;whiteSpace=wrap;" parent="lane_1" vertex="1">
                    <mxGeometry x="150" y="{y_s}" width="30" height="30" as="geometry"/>
                </mxCell>
"""

    xml += f"""                <mxCell id="lane_2" value="Database / AI Storage" style="swimlane;startSize=30;" parent="1" vertex="1">
                    <mxGeometry x="660" y="40" width="330" height="{total_height}" as="geometry"/>
                </mxCell>
                <mxCell id="n_db1" value="Kueri &amp; Rekam Data&#xa;Transaksi Vokal" style="rounded=1;whiteSpace=wrap;html=1;" parent="lane_2" vertex="1">
                    <mxGeometry x="95" y="320" width="140" height="65" as="geometry"/>
                </mxCell>
"""

    # Edges
    xml += """                <mxCell id="e_start" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_start" target="n_u1" />
                <mxCell id="e_u1_s1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_u1" target="n_s1" />
"""
    if len(user_node_ids) > 1 and len(sys_node_ids) > 1:
        xml += """                <mxCell id="e_s1_u2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_s1" target="n_u2" />
                <mxCell id="e_u2_s2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_u2" target="n_s2" />
"""
    if dec:
        xml += f"""                <mxCell id="e_dec_err" value="{dec['no_label']}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_d1" target="n_err" />
                <mxCell id="e_dec_ok" value="{dec['yes_label']}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="n_d1" target="n_end" />
                <mxCell id="e_s_last" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="{sys_node_ids[-1]}" target="n_d1" />
"""
    else:
        xml += f"""                <mxCell id="e_s_end" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;" edge="1" parent="1" source="{sys_node_ids[-1]}" target="n_end" />
"""

    xml += """            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(xml)

# ----------------------------------------------------------------------
# 3. GENERATE ALL 24 SEQUENCE DIAGRAMS (1:1 CORRESPONDENCE)
# ----------------------------------------------------------------------
def generate_sequence_diagram_drawio_and_puml(uc):
    safe_name = re.sub(r'[^a-zA-Z0-9_]', '_', uc['name'])
    drawio_name = f"SD-{uc['id']}_{safe_name}.drawio"
    drawio_path = os.path.join(SD_DIR, drawio_name)
    puml_name = f"SD-{uc['id']}_{safe_name}.puml"
    puml_path = os.path.join(PUML_DIR, puml_name)

    actor_label = uc['actor']
    view_label = uc['view']
    ctrl_label = uc['ctrl']
    svc_label = uc['svc']
    db_label = uc['db']
    msgs = uc['sd_messages']

    # 3.1 Generate PlantUML .puml
    puml_content = f"""@startuml
title SD-{uc['id']} {uc['name']}

actor "{actor_label}" as user
participant "{view_label}" as view
participant "{ctrl_label}" as ctrl
participant "{svc_label}" as svc
database "{db_label}" as db

"""
    for src, dst, msg in msgs:
        if "-->" in msg or "return" in msg.lower() or "tampilkan" in msg.lower():
            puml_content += f"{src} --> {dst} : {msg}\n"
        else:
            puml_content += f"{src} -> {dst} : {msg}\n"
    puml_content += "@enduml\n"

    with open(puml_path, "w", encoding="utf-8") as f:
        f.write(puml_content)

    # 3.2 Generate Draw.io XML
    xml = f"""<mxfile host="65bd71144e">
    <diagram name="SD-{uc['id']}" id="SD-{uc['id']}">
        <mxGraphModel dx="1200" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1653" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                
                <!-- Lifelines -->
                <mxCell id="ll_user" value="{actor_label}" style="shape=umlLifeline;participant=umlActor;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="80" y="50" width="40" height="980" as="geometry"/>
                </mxCell>
                <mxCell id="ll_view" value="{view_label}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="270" y="50" width="130" height="980" as="geometry"/>
                </mxCell>
                <mxCell id="ll_ctrl" value="{ctrl_label}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="480" y="50" width="120" height="980" as="geometry"/>
                </mxCell>
                <mxCell id="ll_svc" value="{svc_label}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="680" y="50" width="130" height="980" as="geometry"/>
                </mxCell>
                <mxCell id="ll_db_cyl" value="&lt;&lt;Database&gt;&gt;&#xa;{db_label}" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;" parent="1" vertex="1">
                    <mxGeometry x="890" y="50" width="100" height="70" as="geometry"/>
                </mxCell>
                <mxCell id="ll_db_line" value="" style="endArrow=none;dashed=1;html=1;rounded=0;" parent="1" source="ll_db_cyl" edge="1">
                    <mxGeometry width="50" height="50" relative="1" as="geometry">
                        <mxPoint x="940" y="120" as="sourcePoint"/>
                        <mxPoint x="940" y="1030" as="targetPoint"/>
                    </mxGeometry>
                </mxCell>
"""
    # Lifeline X mapping
    x_map = {
        "user": 100,
        "admin": 100,
        "view": 335,
        "ctrl": 540,
        "svc": 745,
        "db": 940
    }

    y_msg = 150
    for idx, (src, dst, msg) in enumerate(msgs):
        x1 = x_map.get(src, 100)
        x2 = x_map.get(dst, 335)
        is_return = ("-->" in msg or "return" in msg.lower() or "tampilkan" in msg.lower() or "hasil" in msg.lower())
        line_style = "dashed=1;endArrow=open;" if is_return else "endArrow=block;"
        
        xml += f"""                <mxCell id="msg_{idx+1}" value="{msg}" style="html=1;verticalAlign=bottom;{line_style}edgeStyle=none;rounded=0;" parent="1" edge="1">
                    <mxGeometry width="80" relative="1" as="geometry">
                        <mxPoint x="{x1}" y="{y_msg}" as="sourcePoint"/>
                        <mxPoint x="{x2}" y="{y_msg}" as="targetPoint"/>
                    </mxGeometry>
                </mxCell>
"""
        y_msg += 55

    xml += """            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""

    with open(drawio_path, "w", encoding="utf-8") as f:
        f.write(xml)

# ----------------------------------------------------------------------
# 4. RENDER CRISP PNGs (FOR PREVIEWS AND DOCX)
# ----------------------------------------------------------------------
def render_all_pngs():
    # Render Use Case PNG
    fig, ax = plt.subplots(figsize=(16, 22), dpi=300)
    ax.set_xlim(0, 1600)
    ax.set_ylim(0, 2200)
    ax.axis('off')
    
    rect = patches.FancyBboxPatch((280, 50), 920, 2080, boxstyle="round,pad=10,rounding_size=15",
                                  linewidth=2.5, edgecolor='#1e3a8a', facecolor='#f8fafc')
    ax.add_patch(rect)
    ax.text(740, 2100, "SISTEM VOCALSENSE AI (24 USE CASES)", fontsize=20, fontweight='bold', color='#1e3a8a', ha='center')
    
    # Left Actor
    ax.scatter([120], [1150], s=1400, color='#0284c7', zorder=5)
    ax.plot([120, 120], [1110, 1000], color='#0f172a', lw=4, zorder=5)
    ax.plot([60, 180], [1060, 1060], color='#0f172a', lw=4, zorder=5)
    ax.plot([120, 70], [1000, 900], color='#0f172a', lw=4, zorder=5)
    ax.plot([120, 170], [1000, 900], color='#0f172a', lw=4, zorder=5)
    ax.text(120, 850, "Penyanyi /\nPengguna", fontsize=13, fontweight='bold', ha='center', color='#0f172a')
    
    # Right Actor (Admin)
    ax.scatter([1380], [350], s=1200, color='#64748b', zorder=5)
    ax.plot([1380, 1380], [320, 240], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1330, 1430], [285, 285], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1380, 1340], [240, 170], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1380, 1420], [240, 170], color='#0f172a', lw=3.5, zorder=5)
    ax.text(1380, 140, "Administrator", fontsize=13, fontweight='bold', ha='center', color='#0f172a')

    # Draw left 12 use cases
    for i in range(12):
        uc = USE_CASES[i]
        y = 2000 - i * 145
        ellipse = patches.Ellipse((510, y), 340, 75, facecolor='#ffffff', edgecolor='#0284c7', linewidth=2, zorder=4)
        ax.add_patch(ellipse)
        ax.text(510, y, f"{uc['code']} {uc['name']}", fontsize=10, fontweight='semibold', ha='center', va='center', color='#0f172a', zorder=5)
        ax.plot([150, 340], [1070, y], color='#94a3b8', lw=1.2, zorder=2)

    # Draw right 12 use cases
    for i in range(12, 24):
        uc = USE_CASES[i]
        idx = i - 12
        y = 2000 - idx * 145
        is_admin = (i >= 22)
        fc = '#f1f5f9' if is_admin else '#ffffff'
        ec = '#475569' if is_admin else '#0284c7'
        ellipse = patches.Ellipse((950, y), 340, 75, facecolor=fc, edgecolor=ec, linewidth=2, zorder=4)
        ax.add_patch(ellipse)
        ax.text(950, y, f"{uc['code']} {uc['name']}", fontsize=10, fontweight='semibold', ha='center', va='center', color='#0f172a', zorder=5)
        
        if is_admin:
            ax.plot([1120, 1340], [y, 285], color='#475569', lw=1.8, zorder=2)
        else:
            ax.plot([150, 780], [1070, y], color='#cbd5e1', lw=1.2, zorder=2)

    uc_png_path = os.path.join(UC_DIR, "usecase_diagram_vocal_sense.png")
    plt.tight_layout()
    plt.savefig(uc_png_path, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered usecase_diagram_vocal_sense.png (24 use cases)")

    # Render Sample AD & SD PNGs for documentation
    # AD-01
    fig, ax = plt.subplots(figsize=(12, 10), dpi=300)
    ax.set_xlim(0, 1000)
    ax.set_ylim(0, 800)
    ax.axis('off')
    ax.text(500, 770, "ACTIVITY DIAGRAM: AD-01 REGISTRASI AKUN PENGGUNA", fontsize=14, fontweight='bold', ha='center')
    lanes = [("Pengguna", 50, 300, '#f8fafc'), ("Sistem", 350, 300, '#f0fdf4'), ("Database", 650, 300, '#fffbeb')]
    for name, x, w, bg in lanes:
        ax.add_patch(patches.Rectangle((x, 30), w, 710, facecolor=bg, edgecolor='#94a3b8', lw=1.5))
        ax.text(x + w/2, 715, name, fontsize=12, fontweight='bold', ha='center')
    ax.add_patch(patches.Circle((200, 660), 12, facecolor='#0f172a'))
    ax.add_patch(patches.FancyBboxPatch((120, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 585, "Pilih Tombol Daftar", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.FancyBboxPatch((420, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 585, "Tampilkan Form Pendaftaran", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.FancyBboxPatch((120, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 485, "Isi Nama, Email, Password", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.FancyBboxPatch((420, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 485, "Validasi Input & Email Unik", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.FancyBboxPatch((720, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#d97706', lw=1.5))
    ax.text(800, 485, "Simpan User Baru (Tier Free)", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.FancyBboxPatch((420, 340), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 365, "Buka Dashboard Utama", ha='center', va='center', fontsize=9.5)
    ax.add_patch(patches.Circle((500, 260), 16, facecolor='none', edgecolor='#0f172a', lw=2))
    ax.add_patch(patches.Circle((500, 260), 10, facecolor='#0f172a'))
    
    def arr(p1, p2):
        ax.annotate("", xy=p2, xytext=p1, arrowprops=dict(facecolor='#0f172a', edgecolor='#0f172a', width=1.5, headwidth=6))
    arr((200, 648), (200, 610))
    arr((280, 585), (420, 585))
    arr((500, 560), (200, 510))
    arr((280, 485), (420, 485))
    arr((580, 485), (720, 485))
    arr((800, 460), (500, 390))
    arr((500, 340), (500, 280))

    ad01_path = os.path.join(AD_DIR, "AD-01_Registrasi_Akun_Pengguna.png")
    ad01_legacy = os.path.join(AD_DIR, "AD-01_Perekaman_dan_Analisis_Suara.png")
    plt.tight_layout()
    plt.savefig(ad01_path, dpi=300, bbox_inches='tight')
    plt.savefig(ad01_legacy, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered AD-01 png (Registrasi Akun Pengguna)")

    # AD-08: Perekaman Bernyanyi dan Pitch Visualizer
    fig, ax = plt.subplots(figsize=(12, 10), dpi=300)
    ax.set_xlim(0, 1000)
    ax.set_ylim(0, 800)
    ax.axis('off')
    ax.text(500, 770, "ACTIVITY DIAGRAM: AD-08 PEREKAMAN BERNYANYI & PITCH VISUALIZER", fontsize=13, fontweight='bold', ha='center')
    lanes = [("Pengguna", 50, 300, '#f8fafc'), ("Sistem (Web Audio)", 350, 300, '#f0fdf4'), ("Penyimpanan Audio", 650, 300, '#fffbeb')]
    for name, x, w, bg in lanes:
        ax.add_patch(patches.Rectangle((x, 30), w, 710, facecolor=bg, edgecolor='#94a3b8', lw=1.5))
        ax.text(x + w/2, 715, name, fontsize=11, fontweight='bold', ha='center')
    ax.add_patch(patches.Circle((200, 660), 12, facecolor='#0f172a'))
    ax.add_patch(patches.FancyBboxPatch((120, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 585, "Buka Studio Bernyanyi", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 585, "Inisialisasi Audio Canvas", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((120, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 485, "Mulai Rekam & Bernyanyi", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 485, "Render Live Pitch Curve", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((120, 360), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 385, "Klik Selesai Rekam", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((720, 360), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#d97706', lw=1.5))
    ax.text(800, 385, "Simpan Audio Blob WAV", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 260), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 285, "Buka Pratinjau & Trimmer", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.Circle((500, 190), 16, facecolor='none', edgecolor='#0f172a', lw=2))
    ax.add_patch(patches.Circle((500, 190), 10, facecolor='#0f172a'))
    
    arr((200, 648), (200, 610))
    arr((280, 585), (420, 585))
    arr((500, 560), (200, 510))
    arr((280, 485), (420, 485))
    arr((420, 460), (200, 410))
    arr((280, 385), (720, 385))
    arr((800, 360), (500, 310))
    arr((500, 260), (500, 210))
    ad08_path = os.path.join(AD_DIR, "AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.png")
    plt.tight_layout()
    plt.savefig(ad08_path, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered AD-08 png (Perekaman Bernyanyi dan Pitch Visualizer)")

    # AD-11: Analisis Suara Bernyanyi AI
    fig, ax = plt.subplots(figsize=(12, 10), dpi=300)
    ax.set_xlim(0, 1000)
    ax.set_ylim(0, 800)
    ax.axis('off')
    ax.text(500, 770, "ACTIVITY DIAGRAM: AD-11 ANALISIS SUARA BERNYANYI AI", fontsize=13, fontweight='bold', ha='center')
    lanes = [("Pengguna", 50, 300, '#f8fafc'), ("AI Singing Engine", 350, 300, '#f0fdf4'), ("Vocal Database", 650, 300, '#fffbeb')]
    for name, x, w, bg in lanes:
        ax.add_patch(patches.Rectangle((x, 30), w, 710, facecolor=bg, edgecolor='#94a3b8', lw=1.5))
        ax.text(x + w/2, 715, name, fontsize=11, fontweight='bold', ha='center')
    ax.add_patch(patches.Circle((200, 660), 12, facecolor='#0f172a'))
    ax.add_patch(patches.FancyBboxPatch((120, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 585, "Kirim Audio untuk Dianalisis", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 560), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 585, "Ekstraksi F0 & Deviasi Cents", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 460), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 485, "Deteksi Nada Fals & Vibrato", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((420, 360), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5))
    ax.text(500, 385, "Hitung Skor Bernyanyi & Saran", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((720, 360), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#d97706', lw=1.5))
    ax.text(800, 385, "Simpan Rapor ke PostgreSQL", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.FancyBboxPatch((120, 260), 160, 50, boxstyle="round,pad=3", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5))
    ax.text(200, 285, "Buka Tampilan Rapor & Roll", ha='center', va='center', fontsize=9)
    ax.add_patch(patches.Circle((200, 190), 16, facecolor='none', edgecolor='#0f172a', lw=2))
    ax.add_patch(patches.Circle((200, 190), 10, facecolor='#0f172a'))
    
    arr((200, 648), (200, 610))
    arr((280, 585), (420, 585))
    arr((500, 560), (500, 510))
    arr((500, 460), (500, 410))
    arr((580, 385), (720, 385))
    arr((720, 360), (280, 285))
    arr((200, 260), (200, 210))
    ad11_path = os.path.join(AD_DIR, "AD-11_Analisis_Suara_Bernyanyi_AI.png")
    plt.tight_layout()
    plt.savefig(ad11_path, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered AD-11 png (Analisis Suara Bernyanyi AI)")

    # SD-01
    fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(1000)
    ax.axis('off')
    ax.text(600, 970, "SEQUENCE DIAGRAM: SD-01 REGISTRASI AKUN PENGGUNA", fontsize=15, fontweight='bold', color='#0f172a', ha='center')
    lifelines = [
        ("Pengguna", 100),
        ("Form Registrasi View", 350),
        ("AuthController", 600),
        ("AuthService", 850),
        ("User Database", 1100)
    ]
    for name, x in lifelines:
        box = patches.FancyBboxPatch((x - 80, 900), 160, 45, boxstyle="round,pad=3,rounding_size=6", facecolor='#f1f5f9', edgecolor='#334155', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 922, name, fontsize=10, fontweight='bold', ha='center', va='center')
        ax.plot([x, x], [900, 80], color='#cbd5e1', linestyle='--', lw=1.5)

    sd_msgs = [
        (100, 350, 850, "1: Pilih menu pendaftaran akun", False),
        (350, 600, 790, "2: Request form registrasi", False),
        (600, 350, 730, "3: Render formulir pendaftaran", True),
        (100, 350, 670, "4: Input nama, email, password", False),
        (350, 600, 610, "5: Submit data registrasi baru", False),
        (600, 850, 550, "6: Validasi format & hash password", False),
        (850, 1100, 490, "7: Cek ketersediaan email di DB", False),
        (1100, 850, 430, "8: Email unik & insert record user", True),
        (850, 600, 370, "9: Terbitkan auth session token (JWT)", True),
        (600, 350, 310, "10: Redirect ke Dashboard Utama", True),
        (350, 100, 250, "11: Tampilkan Dashboard & Notifikasi Sukses", True)
    ]
    for x1, x2, y, text, is_ret in sd_msgs:
        col = '#0284c7' if is_ret else '#0f172a'
        ls = '--' if is_ret else '-'
        ax.annotate("", xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle="->", color=col, lw=1.5, linestyle=ls))
        ax.text((x1 + x2)/2, y + 10, text, fontsize=8.5, fontweight='semibold', color=col, ha='center')

    sd01_path = os.path.join(SD_DIR, "SD-01_Registrasi_Akun_Pengguna.png")
    sd01_legacy = os.path.join(SD_DIR, "SD-01_Analisis_Suara_dan_Rapor.png")
    plt.tight_layout()
    plt.savefig(sd01_path, dpi=300, bbox_inches='tight')
    plt.savefig(sd01_legacy, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered SD-01 png (Registrasi Akun Pengguna)")

    # SD-08: Perekaman Bernyanyi dan Pitch Visualizer
    fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(0, 1000)
    ax.axis('off')
    ax.text(600, 970, "SEQUENCE DIAGRAM: SD-08 PEREKAMAN BERNYANYI & PITCH VISUALIZER", fontsize=14, fontweight='bold', color='#0f172a', ha='center')
    lifelines = [
        ("Pengguna", 100),
        ("Singing Studio View", 350),
        ("RecordingController", 600),
        ("WebAudioService", 850),
        ("Temp Storage", 1100)
    ]
    for name, x in lifelines:
        box = patches.FancyBboxPatch((x - 80, 900), 160, 45, boxstyle="round,pad=3,rounding_size=6", facecolor='#f1f5f9', edgecolor='#334155', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 922, name, fontsize=9.5, fontweight='bold', ha='center', va='center')
        ax.plot([x, x], [900, 80], color='#cbd5e1', linestyle='--', lw=1.5)

    sd08_msgs = [
        (100, 350, 850, "1: Akses Studio Latihan Bernyanyi", False),
        (350, 600, 790, "2: Inisialisasi Web Audio Context & Canvas", False),
        (100, 350, 730, "3: Tekan tombol Mulai Bernyanyi", False),
        (350, 850, 670, "4: Mulai streaming sinyal mikrofon Web Audio", False),
        (850, 350, 610, "5: Ekstraksi F0 real-time per 10ms (Pitch Curve)", True),
        (350, 100, 550, "6: Render kurva nada mengalir di atas balok", True),
        (100, 350, 490, "7: Tekan tombol Selesai Bernyanyi", False),
        (350, 600, 430, "8: Stop perekam MediaRecorder", False),
        (600, 1100, 370, "9: Kemas & simpan blob audio (WAV/WebM)", False),
        (1100, 600, 310, "10: Berkas audio sementara siap", True),
        (600, 350, 250, "11: Tampilkan pemutar pratinjau & pemangkas vokal", True)
    ]
    for x1, x2, y, text, is_ret in sd08_msgs:
        col = '#0284c7' if is_ret else '#0f172a'
        ls = '--' if is_ret else '-'
        ax.annotate("", xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle="->", color=col, lw=1.5, linestyle=ls))
        ax.text((x1 + x2)/2, y + 10, text, fontsize=8.5, fontweight='semibold', color=col, ha='center')

    sd08_path = os.path.join(SD_DIR, "SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.png")
    plt.tight_layout()
    plt.savefig(sd08_path, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered SD-08 png (Perekaman Bernyanyi dan Pitch Visualizer)")

    # SD-11: Analisis Suara Bernyanyi AI
    fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(0, 1000)
    ax.axis('off')
    ax.text(600, 970, "SEQUENCE DIAGRAM: SD-11 ANALISIS SUARA BERNYANYI AI", fontsize=14, fontweight='bold', color='#0f172a', ha='center')
    lifelines = [
        ("Pengguna", 100),
        ("Report View", 350),
        ("AnalysisController", 600),
        ("SingingAiEngine", 850),
        ("VocalReportDB", 1100)
    ]
    for name, x in lifelines:
        box = patches.FancyBboxPatch((x - 80, 900), 160, 45, boxstyle="round,pad=3,rounding_size=6", facecolor='#f1f5f9', edgecolor='#334155', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 922, name, fontsize=9.5, fontweight='bold', ha='center', va='center')
        ax.plot([x, x], [900, 80], color='#cbd5e1', linestyle='--', lw=1.5)

    sd11_msgs = [
        (100, 350, 850, "1: Ajukan analisis rekaman bernyanyi", False),
        (350, 600, 790, "2: POST /api/voice/analyze-singing", False),
        (600, 850, 730, "3: Forward audio stream ke worker queue", False),
        (850, 850, 670, "4: Ekstraksi F0, cents, flat/sharp, vibrato 5-7Hz", False),
        (850, 600, 610, "5: Return metrik akustik & rekomendasi AI", True),
        (600, 1100, 550, "6: INSERT INTO vocal_reports (scores, cents, json)", False),
        (1100, 600, 490, "7: Report ID terbit & tersimpan di DB", True),
        (600, 350, 430, "8: Return JSON rapor vokal & data deret Piano Roll", True),
        (350, 100, 370, "9: Render kanvas Piano Roll & skor bernyanyi interaktif", True)
    ]
    for x1, x2, y, text, is_ret in sd11_msgs:
        col = '#0284c7' if is_ret else '#0f172a'
        ls = '--' if is_ret else '-'
        ax.annotate("", xy=(x2, y), xytext=(x1, y), arrowprops=dict(arrowstyle="->", color=col, lw=1.5, linestyle=ls))
        ax.text((x1 + x2)/2, y + 10, text, fontsize=8.5, fontweight='semibold', color=col, ha='center')

    sd11_path = os.path.join(SD_DIR, "SD-11_Analisis_Suara_Bernyanyi_AI.png")
    plt.tight_layout()
    plt.savefig(sd11_path, dpi=300, bbox_inches='tight')
    plt.close()
    print("Rendered SD-11 png (Analisis Suara Bernyanyi AI)")

def main():
    print("Generating APPL-Style Diagrams for VocalSense AI...")
    generate_usecase_drawio()
    
    print(f"Generating {len(USE_CASES)} Activity Diagrams (1:1 with Use Cases)...")
    for uc in USE_CASES:
        generate_activity_diagram_drawio(uc)
    print("All 24 Activity Diagrams generated.")

    print(f"Generating {len(USE_CASES)} Sequence Diagrams & PlantUML (1:1 with Use Cases)...")
    for uc in USE_CASES:
        generate_sequence_diagram_drawio_and_puml(uc)
    print("All 24 Sequence Diagrams & PlantUML files generated.")

    print("Rendering high-resolution diagrams...")
    render_all_pngs()
    print("Done generating all diagrams!")

if __name__ == "__main__":
    main()
