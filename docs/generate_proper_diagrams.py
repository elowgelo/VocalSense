import os
import re
import html

def xml_esc(s):
    if s is None:
        return ""
    t = html.unescape(str(s))
    return t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&apos;")


DOCS_DIR = r"D:\Kuliah\IPPL\docs"
DIAGRAMS_DIR = os.path.join(DOCS_DIR, "diagrams")
UC_DIR = os.path.join(DIAGRAMS_DIR, "usecase")
DFD_DIR = os.path.join(DIAGRAMS_DIR, "dfd")
AD_DIR = os.path.join(DIAGRAMS_DIR, "activity")
SD_DIR = os.path.join(DIAGRAMS_DIR, "sequence")

for d in [UC_DIR, DFD_DIR, AD_DIR, SD_DIR]:
    os.makedirs(d, exist_ok=True)

# ----------------------------------------------------------------------
# 24 USE CASES DATA DEFINITION
# (Titles are clean & unnumbered for use cases inside the boundary)
# ----------------------------------------------------------------------
USE_CASES = [
    {
        "id": "01",
        "code": "AD-01",
        "sd_code": "SD-01",
        "title": "Registrasi Akun Pengguna",
        "short_title": "Registrasi Akun",
        "actor": "Pengguna",
        "nav": "Memilih Menu Registrasi Akun",
        "sys_show": "Menampilkan Formulir Pendaftaran Akun",
        "user_input": "Mengisi Data Nama, Email, dan Password",
        "user_submit": "Menekan Tombol Daftar Sekarang",
        "sys_val": "Memvalidasi Format Email & Kekuatan Password",
        "db_check": "Memeriksa Ketersediaan Email di Database",
        "dec_text": "Email Tersedia?",
        "err_label": "[Sudah Terdaftar]",
        "ok_label": "[Tersedia]",
        "err_msg": "Menampilkan Notifikasi Email Sudah Digunakan",
        "db_save": "Mengenkripsi Password & Menyimpan User Baru",
        "sys_succ": "Menerbitkan Token JWT & Buka Dashboard",
        "view": "Tampilan Form Registrasi",
        "ctrl": "AuthController",
        "svc": "AuthService",
        "db": "UserDB",
        "sd_msgs": [
            ("user", "view", "1: Membuka menu registrasi"),
            ("view", "ctrl", "2: Request form registrasi"),
            ("ctrl", "view", "3: Render formulir pendaftaran"),
            ("user", "view", "4: Input data pendaftaran"),
            ("view", "ctrl", "5: Submit formulir akun baru"),
            ("ctrl", "svc", "6: Validasi kelayakan input & hashing"),
            ("svc", "db", "7: Kueri ketersediaan email"),
            ("db", "svc", "8: Email terverifikasi unik (OK)"),
            ("svc", "db", "9: Simpan akun baru ke tabel users"),
            ("db", "svc", "10: User record berhasil dibuat"),
            ("svc", "ctrl", "11: Terbitkan token sesi otentikasi"),
            ("ctrl", "view", "12: Redirect ke layar Dashboard"),
            ("view", "user", "13: Tampilkan Dashboard & notifikasi selamat datang")
        ]
    },
    {
        "id": "02",
        "code": "AD-02",
        "sd_code": "SD-02",
        "title": "Masuk ke Sistem",
        "short_title": "Masuk ke Sistem",
        "actor": "Pengguna",
        "nav": "Memilih Menu Masuk (Login)",
        "sys_show": "Menampilkan Formulir Masuk Aplikasi",
        "user_input": "Memasukkan Alamat Email dan Kata Sandi",
        "user_submit": "Menekan Tombol Masuk",
        "sys_val": "Memvalidasi Format Isian Kredensial",
        "db_check": "Mencocokkan Kredensial dengan Database",
        "dec_text": "Kredensial Cocok?",
        "err_label": "[Tidak Valid]",
        "ok_label": "[Valid]",
        "err_msg": "Menampilkan Pesan Email atau Password Salah",
        "db_save": "Memperbarui Waktu Login Terakhir",
        "sys_succ": "Menerbitkan Token Sesi & Memuat Dashboard",
        "view": "Tampilan Form Login",
        "ctrl": "AuthController",
        "svc": "AuthService",
        "db": "UserDB",
        "sd_msgs": [
            ("user", "view", "1: Membuka formulir login"),
            ("view", "ctrl", "2: Request halaman masuk"),
            ("ctrl", "view", "3: Render form login"),
            ("user", "view", "4: Input email dan kata sandi"),
            ("view", "ctrl", "5: Kirim kredensial akun"),
            ("ctrl", "svc", "6: Verifikasi hash kata sandi"),
            ("svc", "db", "7: Kueri kecocokan akun"),
            ("db", "svc", "8: Kredensial terverifikasi valid"),
            ("svc", "db", "9: Update last_login_at"),
            ("svc", "ctrl", "10: Kembalikan payload sesi JWT"),
            ("ctrl", "view", "11: Redirect ke halaman utama"),
            ("view", "user", "12: Tampilkan antarmuka Dashboard")
        ]
    },
    {
        "id": "03",
        "code": "AD-03",
        "sd_code": "SD-03",
        "title": "Masuk via Google OAuth",
        "short_title": "Masuk via Google OAuth",
        "actor": "Pengguna",
        "nav": "Memilih Tombol Masuk dengan Google",
        "sys_show": "Membuka Dialog Otorisasi Akun Google",
        "user_input": "Memilih Akun Google Pengguna",
        "user_submit": "Menyetujui Akses Profil Dasar",
        "sys_val": "Memverifikasi Keabsahan ID Token Google",
        "db_check": "Mengecek Keberadaan Google ID di Database",
        "dec_text": "Token Google Sah?",
        "err_label": "[Gagal/Expired]",
        "ok_label": "[Sah]",
        "err_msg": "Menampilkan Peringatan Autentikasi Google Gagal",
        "db_save": "Sinkronisasi Profil & Menyimpan Google ID",
        "sys_succ": "Menerbitkan Sesi JWT & Buka Beranda",
        "view": "Tampilan Login Google",
        "ctrl": "GoogleOAuthController",
        "svc": "GoogleOAuthService",
        "db": "UserDB",
        "sd_msgs": [
            ("user", "view", "1: Klik Masuk dengan Google"),
            ("view", "ctrl", "2: Redirect ke Google Auth Endpoint"),
            ("ctrl", "view", "3: Buka jendela otorisasi Google"),
            ("user", "view", "4: Pilih akun & konfirmasi izin"),
            ("view", "ctrl", "5: Callback dengan authorization code"),
            ("ctrl", "svc", "6: Exchange code dengan ID token"),
            ("svc", "db", "7: Kueri kecocokan google_id"),
            ("db", "svc", "8: Kembalikan data pengguna"),
            ("svc", "db", "9: Sinkronkan data profil & simpan"),
            ("svc", "ctrl", "10: Terbitkan token sesi aplikasi"),
            ("ctrl", "view", "11: Selesaikan autentikasi SSO"),
            ("view", "user", "12: Tampilkan Dashboard Pengguna")
        ]
    },
    {
        "id": "04",
        "code": "AD-04",
        "sd_code": "SD-04",
        "title": "Pemulihan Kata Sandi",
        "short_title": "Pemulihan Kata Sandi",
        "actor": "Pengguna",
        "nav": "Memilih Tautan Lupa Kata Sandi",
        "sys_show": "Menampilkan Form Permintaan Reset Password",
        "user_input": "Memasukkan Alamat Email Terdaftar",
        "user_submit": "Menekan Tombol Kirim Tautan Pemulihan",
        "sys_val": "Memvalidasi Format & Status Akun Email",
        "db_check": "Memeriksa Keberadaan Email di Sistem",
        "dec_text": "Email Terdaftar?",
        "err_label": "[Tidak Ditemukan]",
        "ok_label": "[Ditemukan]",
        "err_msg": "Menampilkan Peringatan Email Tidak Terdaftar",
        "db_save": "Membuat & Menyimpan Token Reset Password",
        "sys_succ": "Mengirim Email Tautan Pemulihan & Notifikasi",
        "view": "Tampilan Lupa Password",
        "ctrl": "PasswordResetController",
        "svc": "EmailResetService",
        "db": "UserDB",
        "sd_msgs": [
            ("user", "view", "1: Klik tautan lupa kata sandi"),
            ("view", "ctrl", "2: Request form reset kata sandi"),
            ("ctrl", "view", "3: Tampilkan form reset password"),
            ("user", "view", "4: Input alamat email terdaftar"),
            ("view", "ctrl", "5: Kirim instruksi pemulihan"),
            ("ctrl", "svc", "6: Buat token unik reset password"),
            ("svc", "db", "7: Simpan token reset & masa berlaku"),
            ("db", "svc", "8: Token berhasil dicatat"),
            ("svc", "ctrl", "9: Kirim surat elektronik reset password"),
            ("ctrl", "view", "10: Konfirmasi pengiriman tautan email"),
            ("view", "user", "11: Tampilkan pesan instruksi cek email")
        ]
    },
    {
        "id": "05",
        "code": "AD-05",
        "sd_code": "SD-05",
        "title": "Pengelolaan Profil Vokal dan Preferensi",
        "short_title": "Pengelolaan Profil Vokal",
        "actor": "Pengguna",
        "nav": "Membuka Menu Profil Akun & Preferensi",
        "sys_show": "Menampilkan Data Profil & Pengaturan Suara",
        "user_input": "Memilih Tipe Suara, Rentang Nada, & Genre",
        "user_submit": "Menekan Tombol Simpan Perubahan Profil",
        "sys_val": "Memvalidasi Format Data Profil Vokal",
        "db_check": "Memeriksa Validitas Data Pengguna Aktif",
        "dec_text": "Data Valid?",
        "err_label": "[Tidak Sesuai]",
        "ok_label": "[Sesuai]",
        "err_msg": "Menampilkan Pesan Validasi Data Profil",
        "db_save": "Memperbarui Profil Vokal pada Tabel Users",
        "sys_succ": "Menampilkan Konfirmasi Profil Berhasil Disimpan",
        "view": "Tampilan Profil Pengguna",
        "ctrl": "ProfileController",
        "svc": "ProfileService",
        "db": "UserDB",
        "sd_msgs": [
            ("user", "view", "1: Buka tab Pengaturan Profil"),
            ("view", "ctrl", "2: Request data profil penyanyi"),
            ("ctrl", "db", "3: Kueri profil pengguna"),
            ("db", "ctrl", "4: Kembalikan preferensi vokal"),
            ("ctrl", "view", "5: Render formulir profil vokal"),
            ("user", "view", "6: Ubah tipe vokal & genre favorit"),
            ("view", "ctrl", "7: Kirim data pembaruan profil"),
            ("ctrl", "svc", "8: Validasi isian profil vokal"),
            ("svc", "db", "9: Update preferensi suara penyanyi"),
            ("db", "svc", "10: Konfirmasi penyimpanan berhasil"),
            ("svc", "ctrl", "11: Profil terbarukan"),
            ("ctrl", "view", "12: Notifikasi profil vokal tersimpan"),
            ("view", "user", "13: Tampilkan profil terbaru")
        ]
    },
    {
        "id": "06",
        "code": "AD-06",
        "sd_code": "SD-06",
        "title": "Tuner dan Kalibrasi Mikrofon",
        "short_title": "Tuner & Kalibrasi Mikrofon",
        "actor": "Pengguna",
        "nav": "Memilih Menu Tuner & Kalibrasi Mikrofon",
        "sys_show": "Menampilkan Jarum Digital Tuner & Noise Meter",
        "user_input": "Mengucapkan Nada Acuan untuk Uji Tangkap Sinyal",
        "user_submit": "Menekan Tombol Mulai Kalibrasi Desibel",
        "sys_val": "Mengukur Tingkat Desibel & Kebisingan Sekitar",
        "db_check": "Mengecek Batas Ambang Noise Ambient",
        "dec_text": "Sinyal Mic Jernih?",
        "err_label": "[Noise Tinggi]",
        "ok_label": "[Jernih/Cukup]",
        "err_msg": "Menampilkan Saran Menjauh dari Suara Bising",
        "db_save": "Menyimpan Konfigurasi Sensitivitas Mikrofon",
        "sys_succ": "Menampilkan Status Mikrofon Siap untuk Bernyanyi",
        "view": "Tampilan Tuner & Mic",
        "ctrl": "AudioCalibrationController",
        "svc": "AudioCalibrationService",
        "db": "ClientAudioConfig",
        "sd_msgs": [
            ("user", "view", "1: Buka menu Tuner & Kalibrasi"),
            ("view", "ctrl", "2: Inisialisasi Web Audio Context"),
            ("ctrl", "view", "3: Minta izin akses mikrofon"),
            ("user", "view", "4: Izinkan akses mikrofon"),
            ("view", "ctrl", "5: Stream sinyal mikrofon aktif"),
            ("ctrl", "svc", "6: Hitung RMS noise floor & deteksi F0"),
            ("svc", "ctrl", "7: Kembalikan frekuensi dasar & status dB"),
            ("ctrl", "view", "8: Gerakkan jarum tuner digital ke nada acuan"),
            ("user", "view", "9: Tekan Simpan Kalibrasi"),
            ("view", "ctrl", "10: Simpan preferensi sensitivitas input"),
            ("ctrl", "db", "11: Simpan setelan kalibrasi lokal"),
            ("ctrl", "view", "12: Tampilkan status mikrofon optimal"),
            ("view", "user", "13: Notifikasi mikrofon siap digunakan")
        ]
    },
    {
        "id": "07",
        "code": "AD-07",
        "sd_code": "SD-07",
        "title": "Tes Jangkauan Vokal",
        "short_title": "Tes Jangkauan Vokal",
        "actor": "Pengguna",
        "nav": "Memilih Menu Tes Jangkauan Vokal (Vocal Range)",
        "sys_show": "Menampilkan Panduan Uji Nada Rendah ke Tinggi",
        "user_input": "Menyuarakan Nada Terendah dan Nada Tertinggi",
        "user_submit": "Menekan Tombol Selesai Pengujian Vokal",
        "sys_val": "Menganalisis Nada Stabil Terendah & Tertinggi",
        "db_check": "Mencocokkan Klasifikasi (Bass s.d. Sopran)",
        "dec_text": "Rentang Terdeteksi?",
        "err_label": "[Tidak Stabil]",
        "ok_label": "[Terdeteksi Stabil]",
        "err_msg": "Menampilkan Arahan Mengulang Nada Lebih Stabil",
        "db_save": "Menyimpan Rentang Nada & Tipe Suara Pengguna",
        "sys_succ": "Menampilkan Kartu Tipe Suara & Visual Tuts Piano",
        "view": "Tampilan Tes Range",
        "ctrl": "VocalRangeController",
        "svc": "VocalRangeService",
        "db": "VocalProfileDB",
        "sd_msgs": [
            ("user", "view", "1: Buka modul Vocal Range Finder"),
            ("view", "ctrl", "2: Inisialisasi pitch detector"),
            ("ctrl", "view", "3: Bunyikan nada panduan terendah"),
            ("user", "view", "4: Suarakan nada terendah stabil"),
            ("view", "ctrl", "5: Kirim stream frekuensi nada rendah"),
            ("ctrl", "svc", "6: Kunci nada terendah (misal C3)"),
            ("ctrl", "view", "7: Bunyikan nada panduan tertinggi"),
            ("user", "view", "8: Suarakan nada tertinggi stabil"),
            ("view", "ctrl", "9: Kirim stream frekuensi nada tinggi"),
            ("ctrl", "svc", "10: Kunci nada tertinggi (misal A4)"),
            ("svc", "db", "11: Klasifikasi tipe suara (Tenor) & simpan"),
            ("db", "svc", "12: Data jangkauan vokal tersimpan"),
            ("svc", "ctrl", "13: Kembalikan hasil klasifikasi"),
            ("ctrl", "view", "14: Sorot tuts jangkauan nada pada piano roll"),
            ("view", "user", "15: Tampilkan tipe suara penyanyi")
        ]
    },
    {
        "id": "08",
        "code": "AD-08",
        "sd_code": "SD-08",
        "title": "Perekaman Bernyanyi dan Pitch Visualizer",
        "short_title": "Perekaman Bernyanyi",
        "actor": "Pengguna",
        "nav": "Membuka Menu Studio Bernyanyi",
        "sys_show": "Menyiapkan Kanvas Gelombang Nada & Pitch Monitor",
        "user_input": "Menyanyikan Lagu di Depan Mikrofon",
        "user_submit": "Menekan Tombol Selesai Rekam Suara",
        "sys_val": "Mengekstrak Kurva Nada Waktu Nyata (10 Detik)",
        "db_check": "Memeriksa Durasi Rekaman terhadap Kuota Paket",
        "dec_text": "Durasi Sesuai Kuota?",
        "err_label": "[Melebihi Kuota]",
        "ok_label": "[Dalam Kuota]",
        "err_msg": "Menghentikan Rekam Otomatis Sesuai Kuota",
        "db_save": "Menyimpan Berkas Audio Rekaman Sementara",
        "sys_succ": "Menampilkan Pemutar Pratinjau Rekaman Audio",
        "view": "Tampilan Studio Bernyanyi",
        "ctrl": "RecordingController",
        "svc": "WebAudioService",
        "db": "AudioBufferStorage",
        "sd_msgs": [
            ("user", "view", "1: Buka studio bernyanyi"),
            ("view", "ctrl", "2: Inisialisasi MediaRecorder & AudioContext"),
            ("user", "view", "3: Tekan tombol Mulai Bernyanyi"),
            ("view", "ctrl", "4: Mulai rekam stream audio"),
            ("ctrl", "svc", "5: Ekstraksi F0 real-time (YIN/PYIN)"),
            ("svc", "view", "6: Kirim data titik nada kurva"),
            ("view", "user", "7: Render kurva nada mengalir di atas notasi"),
            ("user", "view", "8: Tekan tombol Selesai Bernyanyi"),
            ("view", "ctrl", "9: Stop MediaRecorder & kemas blob"),
            ("ctrl", "db", "10: Simpan buffer audio sementara"),
            ("db", "ctrl", "11: Audio blob siap diproses"),
            ("ctrl", "view", "12: Buka layar pratinjau audio"),
            ("view", "user", "13: Tampilkan tombol dengar & pangkas")
        ]
    },
    {
        "id": "09",
        "code": "AD-09",
        "sd_code": "SD-09",
        "title": "Unggah Berkas Rekaman Vokal",
        "short_title": "Unggah Berkas Audio",
        "actor": "Pengguna",
        "nav": "Memilih Menu Unggah Rekaman Vokal",
        "sys_show": "Menampilkan Dropzone Berkas Audio (.wav, .mp3)",
        "user_input": "Memilih Berkas Suara Bernyanyi dari Perangkat",
        "user_submit": "Menekan Tombol Mulai Unggah Berkas",
        "sys_val": "Memverifikasi Format & Ukuran Berkas (<25 MB)",
        "db_check": "Memeriksa Integritas File Audio Digital",
        "dec_text": "Berkas Valid?",
        "err_label": "[Format/Ukuran Salah]",
        "ok_label": "[Valid]",
        "err_msg": "Menampilkan Pesan Format Audio Tidak Didukung",
        "db_save": "Menyimpan Berkas Audio ke Cloud Storage",
        "sys_succ": "Meneruskan Berkas ke Modul Analisis Vokal AI",
        "view": "Tampilan Unggah Audio",
        "ctrl": "UploadController",
        "svc": "AudioValidationService",
        "db": "StorageServer",
        "sd_msgs": [
            ("user", "view", "1: Pilih menu Unggah Berkas Audio"),
            ("view", "ctrl", "2: Tampilkan area dropzone"),
            ("user", "view", "3: Drag & drop file audio bernyanyi"),
            ("view", "ctrl", "4: Validasi ekstensi & ukuran file"),
            ("ctrl", "svc", "5: Cek kelayakan audio stream"),
            ("svc", "ctrl", "6: File valid (.wav/.mp3 < 25MB)"),
            ("user", "view", "7: Tekan Unggah Berkas"),
            ("view", "ctrl", "8: Kirim berkas audio via multipart/form-data"),
            ("ctrl", "db", "9: Simpan file ke Cloud Object Storage"),
            ("db", "ctrl", "10: File URL terbit"),
            ("ctrl", "view", "11: Berkas berhasil diunggah"),
            ("view", "user", "12: Tampilkan pratinjau audio siap dianalisis")
        ]
    },
    {
        "id": "10",
        "code": "AD-10",
        "sd_code": "SD-10",
        "title": "Putar Ulang dan Pangkas Vokal",
        "short_title": "Putar Ulang & Pangkas Vokal",
        "actor": "Pengguna",
        "nav": "Membuka Editor Pemangkas Vokal (Trimmer)",
        "sys_show": "Merender Gelombang Suara (Waveform) Interaktif",
        "user_input": "Menggeser Batas Awal dan Akhir Audio Bernyanyi",
        "user_submit": "Menekan Tombol Terapkan Pemangkasan Audio",
        "sys_val": "Memvalidasi Rentang Durasi Pemotongan (>3 Detik)",
        "db_check": "Memeriksa Ketersediaan Buffer Sinyal Audio",
        "dec_text": "Rentang Valid?",
        "err_label": "[Kurang dari 3s]",
        "ok_label": "[Valid >3s]",
        "err_msg": "Menampilkan Peringatan Durasi Terlalu Singkat",
        "db_save": "Memotong Buffer Audio & Simpan Audio Bersih",
        "sys_succ": "Memperbarui Waveform & Menyiapkan Analisis AI",
        "view": "Tampilan Vocal Trimmer",
        "ctrl": "AudioTrimmerController",
        "svc": "AudioProcessingService",
        "db": "TempAudioStorage",
        "sd_msgs": [
            ("user", "view", "1: Buka layar pemangkas audio"),
            ("view", "ctrl", "2: Render visual waveform gelombang suara"),
            ("user", "view", "3: Putar audio & geser handle trim"),
            ("view", "ctrl", "4: Set start_time & end_time"),
            ("user", "view", "5: Klik Terapkan Pemangkasan"),
            ("view", "ctrl", "6: Request pemotongan buffer audio"),
            ("ctrl", "svc", "7: Eksekusi slicing audio stream"),
            ("svc", "db", "8: Simpan audio hasil pemangkasan"),
            ("db", "svc", "9: Audio bersih berhasil disimpan"),
            ("svc", "ctrl", "10: Kembalikan durasi audio terpangkas"),
            ("ctrl", "view", "11: Perbarui visual gelombang suara"),
            ("view", "user", "12: Tampilkan tombol Mulai Analisis AI")
        ]
    },
    {
        "id": "11",
        "code": "AD-11",
        "sd_code": "SD-11",
        "title": "Analisis Suara Bernyanyi AI",
        "short_title": "Analisis Suara Bernyanyi AI",
        "actor": "Pengguna",
        "nav": "Menekan Tombol Mulai Analisis Bernyanyi",
        "sys_show": "Menampilkan Animasi Indikator Pemrosesan AI",
        "user_input": "Menunggu Proses Ekstraksi Sinyal Digital Audio",
        "user_submit": "Sistem Menjalankan Pipeline Pemrosesan Audio DSP",
        "sys_val": "Ekstraksi Nada F0, Cents, Vibrato, & Deteksi Fals",
        "db_check": "Memeriksa Keberadaan Sinyal Vokal Manusia",
        "dec_text": "Sinyal Vokal Jernih?",
        "err_label": "[Bising/Hening]",
        "ok_label": "[Vokal Jelas]",
        "err_msg": "Peringatan Vokal Kurang Jelas atau Terlalu Bising",
        "db_save": "Menghitung Skor Total & Menyimpan Rapor di DB",
        "sys_succ": "Mengarahkan Pengguna ke Tampilan Rapor Vokal",
        "view": "Tampilan Analisis Suara",
        "ctrl": "AnalysisController",
        "svc": "SingingAiEngine",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Tekan tombol Analisis Suara AI"),
            ("view", "ctrl", "2: POST /api/voice/analyze-singing"),
            ("ctrl", "svc", "3: Kirim berkas audio ke Worker AI Queue"),
            ("svc", "svc", "4: Ekstraksi F0 & kalkulasi deviasi Cents"),
            ("svc", "svc", "5: Deteksi nada Flat, Sharp, & Vibrato 5-7Hz"),
            ("svc", "svc", "6: Hitung Skor Bernyanyi & Saran AI"),
            ("svc", "db", "7: Simpan metrik akustik ke vocal_reports"),
            ("db", "svc", "8: Report ID berhasil dibuat"),
            ("svc", "ctrl", "9: Kembalikan JSON rapor & data Piano Roll"),
            ("ctrl", "view", "10: Selesai pemrosesan analisis suara"),
            ("view", "user", "11: Redirect ke Halaman Rapor Bernyanyi")
        ]
    },
    {
        "id": "12",
        "code": "AD-12",
        "sd_code": "SD-12",
        "title": "Menampilkan Rapor dan Piano Roll",
        "short_title": "Lihat Rapor & Piano Roll",
        "actor": "Pengguna",
        "nav": "Membuka Halaman Rapor Bernyanyi",
        "sys_show": "Memuat Kanvas Piano Roll & Skor Bernyanyi",
        "user_input": "Mengeksplorasi Notasi Balok Warna & Radar Chart",
        "user_submit": "Memilih Balok Nada Tertentu untuk Detail Cents",
        "sys_val": "Memvalidasi Metadata Rapor Hasil Bernyanyi",
        "db_check": "Mengambil Rincian Nada In-Tune, Flat, & Sharp",
        "dec_text": "Data Rapor Ada?",
        "err_label": "[Rapor Rusak]",
        "ok_label": "[Lengkap]",
        "err_msg": "Menampilkan Notifikasi Data Evaluasi Tidak Lengkap",
        "db_save": "Mencatat Riwayat Peninjauan Rapor Bernyanyi",
        "sys_succ": "Menampilkan Radar Chart, Skor Vokal, & Saran AI",
        "view": "Tampilan Rapor Bernyanyi",
        "ctrl": "ReportController",
        "svc": "ReportPresentationService",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Buka lembar rapor bernyanyi"),
            ("view", "ctrl", "2: Request detail rapor by report_id"),
            ("ctrl", "db", "3: Query vocal_reports & piano_roll_data"),
            ("db", "ctrl", "4: Kembalikan data metrik & array nada"),
            ("ctrl", "svc", "5: Kompilasi radar chart 5 dimensi vokal"),
            ("svc", "ctrl", "6: Data visualisasi siap dirender"),
            ("ctrl", "view", "7: Render skor vokal & tuts Piano Roll"),
            ("user", "view", "8: Klik balok nada nada terdeteksi fals"),
            ("view", "ctrl", "9: Minta detail deviasi cents pada notasi"),
            ("ctrl", "view", "10: Sorot informasi deviasi nada (contoh: +28 cents)"),
            ("view", "user", "11: Tampilkan tooltip detail nada fals")
        ]
    },
    {
        "id": "13",
        "code": "AD-13",
        "sd_code": "SD-13",
        "title": "Putar Audio Terikat Nada Fals",
        "short_title": "Putar Audio Sinkron Nada Fals",
        "actor": "Pengguna",
        "nav": "Memilih Balok Nada Fals pada Tampilan Piano Roll",
        "sys_show": "Menyorot Nada Terpilih & Menyiapkan Pemutar Audio",
        "user_input": "Menekan Tombol Putar Audio Nada Ini (Note-Sync)",
        "user_submit": "Sistem Mencari Penanda Timestamp Nada pada Audio",
        "sys_val": "Menghitung Posisi Detik Awal & Akhir Sinyal Nada",
        "db_check": "Mengecek Ketersediaan Berkas Audio Rekaman",
        "dec_text": "Timestamp Valid?",
        "err_label": "[Tidak Sinkron]",
        "ok_label": "[Sinkron]",
        "err_msg": "Memutar Audio dari Detik Terdekat Sesi Rekaman",
        "db_save": "Mencatat Riwayat Pemutaran Bagian Nada Fals",
        "sys_succ": "Memutar Audio Tepat pada Bagian Nada Fals Tersebut",
        "view": "Tampilan Piano Roll Interaktif",
        "ctrl": "AudioSyncController",
        "svc": "AudioPlaybackService",
        "db": "AudioStorage",
        "sd_msgs": [
            ("user", "view", "1: Klik balok nada merah (sharp) di piano roll"),
            ("view", "ctrl", "2: Ambil start_offset dan end_offset nada"),
            ("user", "view", "3: Klik Putar Bagian Ini"),
            ("view", "ctrl", "4: Request stream audio pada rentang detik"),
            ("ctrl", "svc", "5: Seek pemutar Web Audio ke timestamp"),
            ("svc", "db", "6: Fetch chunk audio rekaman"),
            ("db", "svc", "7: Kembalikan buffer audio spesifik"),
            ("svc", "ctrl", "8: Buffer audio terisolasi siap"),
            ("ctrl", "view", "9: Mulai pemutaran audio sinkron"),
            ("view", "user", "10: Suara penyanyi terdengar persis di nada fals")
        ]
    },
    {
        "id": "14",
        "code": "AD-14",
        "sd_code": "SD-14",
        "title": "Menyimpan Rapor Nyanyi",
        "short_title": "Simpan Rapor Bernyanyi",
        "actor": "Pengguna",
        "nav": "Menekan Tombol Simpan Rapor ke Arsip Akun",
        "sys_show": "Menampilkan Konfirmasi Penyimpanan Rapor Permanen",
        "user_input": "Memberikan Judul Sesi Bernyanyi & Catatan Pribadi",
        "user_submit": "Menekan Tombol Konfirmasi Simpan",
        "sys_val": "Memeriksa Status Hak Akses Tier (Pro / Premium)",
        "db_check": "Memeriksa Kuota Penyimpanan Rapor Akun",
        "dec_text": "Akun Pro/Premium?",
        "err_label": "[Free Tier]",
        "ok_label": "[Pro/Premium]",
        "err_msg": "Menampilkan Penawaran Tingkatkan Paket ke Pro",
        "db_save": "Menyimpan Status Rapor Menjadi Permanen di DB",
        "sys_succ": "Menampilkan Notifikasi Rapor Berhasil Diarsipkan",
        "view": "Tampilan Konfirmasi Simpan",
        "ctrl": "ReportArchiveController",
        "svc": "SubscriptionCheckService",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Tekan tombol Simpan Rapor"),
            ("view", "ctrl", "2: Cek kelayakan penyimpanan arsip"),
            ("ctrl", "svc", "3: Validasi status langganan pengguna"),
            ("svc", "db", "4: Kueri tabel subscriptions"),
            ("db", "svc", "5: Status aktif Pro Tier terkonfirmasi"),
            ("svc", "ctrl", "6: Izin simpan permanen diberikan"),
            ("user", "view", "7: Input judul sesi rekaman"),
            ("view", "ctrl", "8: Kirim request arsip rapor bernyanyi"),
            ("ctrl", "db", "9: Update is_archived = true & simpan judul"),
            ("db", "ctrl", "10: Rapor resmi tercatat di arsip"),
            ("ctrl", "view", "11: Berikan konfirmasi sukses arsip"),
            ("view", "user", "12: Tampilkan status tersimpan di riwayat")
        ]
    },
    {
        "id": "15",
        "code": "AD-15",
        "sd_code": "SD-15",
        "title": "Mengekspor Rapor dan Sertifikat PDF",
        "short_title": "Ekspor Rapor & Sertifikat PDF",
        "actor": "Pengguna",
        "nav": "Memilih Menu Ekspor Dokumen Rapor PDF",
        "sys_show": "Menampilkan Pilihan Format Lembar Rapor / Sertifikat",
        "user_input": "Memilih Opsi Ekspor Rapor Lengkap atau Sertifikat",
        "user_submit": "Menekan Tombol Unduh Dokumen PDF Resmi",
        "sys_val": "Memeriksa Hak Akses Unduh Format PDF",
        "db_check": "Mengambil Rincian Skor & Statistik Akustik",
        "dec_text": "Kompilasi Sukses?",
        "err_label": "[Gagal Generate]",
        "ok_label": "[Kompilasi Sukses]",
        "err_msg": "Menampilkan Notifikasi Gagal Kompilasi Dokumen PDF",
        "db_save": "Mencatat Log Unduhan Dokumen PDF Pengguna",
        "sys_succ": "Mengunduh Berkas PDF Resmi ke Perangkat Pengguna",
        "view": "Tampilan Ekspor PDF",
        "ctrl": "PdfExportController",
        "svc": "PdfGeneratorService",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Klik Ekspor Lembar Rapor PDF"),
            ("view", "ctrl", "2: Request pembuatan dokumen PDF"),
            ("ctrl", "svc", "3: Kumpulkan data skor, cents, & saran vokal"),
            ("svc", "db", "4: Kueri lengkap vocal_reports by id"),
            ("db", "svc", "5: Kembalikan dataset penilaian lengkap"),
            ("svc", "svc", "6: Render template PDF & sematkan barcode"),
            ("svc", "ctrl", "7: Dokumen biner PDF siap diunduh"),
            ("ctrl", "db", "8: Catat riwayat pengunduhan rapor"),
            ("ctrl", "view", "9: Kirim stream berkas PDF ke browser"),
            ("view", "user", "10: File PDF tersimpan di perangkat pengguna")
        ]
    },
    {
        "id": "16",
        "code": "AD-16",
        "sd_code": "SD-16",
        "title": "Membandingkan Dua Sesi Rekaman Nyanyi",
        "short_title": "Bandingkan Sesi Bernyanyi",
        "actor": "Pengguna",
        "nav": "Membuka Menu Komparasi Dua Sesi Bernyanyi",
        "sys_show": "Menampilkan Daftar Riwayat Rapor yang Tersimpan",
        "user_input": "Memilih Sesi Rekaman A dan Sesi Rekaman B",
        "user_submit": "Menekan Tombol Bandingkan Kurva & Skor",
        "sys_val": "Memeriksa Jumlah Sesi yang Dipilih (Tepat 2 Sesi)",
        "db_check": "Mengambil Data Akustik dari Kedua Rekaman",
        "dec_text": "Tepat 2 Sesi?",
        "err_label": "[Bukan 2 Sesi]",
        "ok_label": "[Tepat 2 Sesi]",
        "err_msg": "Menampilkan Pesan Harap Memilih Tepat Dua Sesi",
        "db_save": "Mencatat Komparasi pada Cache Peramban",
        "sys_succ": "Menampilkan Grafik Side-by-Side Peningkatan Vokal",
        "view": "Tampilan Komparasi Sesi",
        "ctrl": "ComparisonController",
        "svc": "ComparisonService",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Akses menu Komparasi Sesi"),
            ("view", "ctrl", "2: Request daftar rapor tersimpan"),
            ("ctrl", "db", "3: Query archived reports by user_id"),
            ("db", "ctrl", "4: Kembalikan daftar rapor vokal"),
            ("ctrl", "view", "5: Tampilkan tabel pilihan sesi"),
            ("user", "view", "6: Pilih Rekaman Sesi 1 dan Rekaman Sesi 2"),
            ("view", "ctrl", "7: Kirim ID kedua rekaman bernyanyi"),
            ("ctrl", "svc", "8: Hitung selisih skor nada & stabilitas vibrato"),
            ("svc", "ctrl", "9: Kembalikan matriks komparasi side-by-side"),
            ("ctrl", "view", "10: Render kurva overlay perbandingan nada"),
            ("view", "user", "11: Tampilkan grafik kemajuan vokal komparatif")
        ]
    },
    {
        "id": "17",
        "code": "AD-17",
        "sd_code": "SD-17",
        "title": "Memantau Dasbor Progres Vokal",
        "short_title": "Lihat Dasbor Progres Vokal",
        "actor": "Pengguna",
        "nav": "Memilih Menu Dasbor Progres Latihan Vokal",
        "sys_show": "Memuat Grafik Tren Peningkatan Akurasi Nada",
        "user_input": "Memfilter Rentang Waktu (Mingguan / Bulanan)",
        "user_submit": "Menekan Tombol Terapkan Filter Periode",
        "sys_val": "Memeriksa Hak Akses Analitik Riwayat (Tier Premium)",
        "db_check": "Mengagregasi Data Akurasi Nada Berdasarkan Waktu",
        "dec_text": "Tier Premium?",
        "err_label": "[Bukan Premium]",
        "ok_label": "[Premium]",
        "err_msg": "Menampilkan Informasi Fitur Khusus Member Premium",
        "db_save": "Memperbarui Cache Statistik Progres Vokal",
        "sys_succ": "Menampilkan Grafik Perluasan Range & Akurasi Nada",
        "view": "Tampilan Dasbor Progres",
        "ctrl": "ProgressAnalyticsController",
        "svc": "ProgressAnalyticsService",
        "db": "VocalReportDB",
        "sd_msgs": [
            ("user", "view", "1: Buka Dasbor Progres Vokal"),
            ("view", "ctrl", "2: Request analitik perkembangan nada"),
            ("ctrl", "svc", "3: Validasi status langganan Premium"),
            ("svc", "db", "4: Kueri rekapitulasi skor 30 hari terakhir"),
            ("db", "svc", "5: Kembalikan deret skor & perluasan jangkauan"),
            ("svc", "ctrl", "6: Kalkulasi persentase peningkatan vokal"),
            ("ctrl", "view", "7: Render grafik garis tren akurasi & tuts piano"),
            ("view", "user", "8: Tampilkan dasbor analitik kemajuan vokal")
        ]
    },
    {
        "id": "18",
        "code": "AD-18",
        "sd_code": "SD-18",
        "title": "Melacak Streak dan Lencana Vokal",
        "short_title": "Pelacakan Streak & Lencana",
        "actor": "Pengguna",
        "nav": "Membuka Menu Capaian Latihan & Streak Harian",
        "sys_show": "Menampilkan Kalender Latihan & Galeri Lencana",
        "user_input": "Meninjau Syarat Membuka Kunci Lencana Tertentu",
        "user_submit": "Sistem Mengevaluasi Riwayat Latihan Terakhir",
        "sys_val": "Menghitung Selisih Waktu Sesi Latihan Terakhir",
        "db_check": "Memeriksa Riwayat Latihan Berturut-turut",
        "dec_text": "Latihan Beruntun?",
        "err_label": "[Terputus >48 Jam]",
        "ok_label": "[Beruntun 24-48 Jam]",
        "err_msg": "Mereset Penghitung Streak Kembali ke 1 Hari",
        "db_save": "Menambah Nilai Streak & Buka Lencana Capaian Baru",
        "sys_succ": "Menampilkan Notifikasi Perolehan Lencana Baru",
        "view": "Tampilan Streak & Badges",
        "ctrl": "StreakBadgeController",
        "svc": "GamificationService",
        "db": "UserGamificationDB",
        "sd_msgs": [
            ("user", "view", "1: Buka tab Capaian & Streak"),
            ("view", "ctrl", "2: Request status latihan streak harian"),
            ("ctrl", "svc", "3: Cek timestamp latihan terakhir vs hari ini"),
            ("svc", "db", "4: Kueri log latihan pada user_streaks"),
            ("db", "svc", "5: Kembalikan data hari latihan beruntun"),
            ("svc", "svc", "6: Hitung streak counter & evaluasi milestone"),
            ("svc", "db", "7: Update streak & buka kunci lencana vokal baru"),
            ("db", "svc", "8: Data capaian berhasil diperbarui"),
            ("svc", "ctrl", "9: Kirim data streak & lencana yang aktif"),
            ("ctrl", "view", "10: Render kalender api streak & popup lencana"),
            ("view", "user", "11: Tampilkan notifikasi lencana baru dibuka")
        ]
    },
    {
        "id": "19",
        "code": "AD-19",
        "sd_code": "SD-19",
        "title": "Menghasilkan Kurikulum Vokal AI",
        "short_title": "Buat Kurikulum Latihan AI",
        "actor": "Pengguna",
        "nav": "Memilih Menu AI Practice Planner (Vocal Coach)",
        "sys_show": "Menampilkan Formulir Target Suara & Masalah Vokal",
        "user_input": "Memilih Target Peningkatan (Pitch, Head Voice, Vibrato)",
        "user_submit": "Menekan Tombol Buat Jadwal Latihan Cerdas AI",
        "sys_val": "Mendiagnosis Kelemahan Nada Fals dari Rapor",
        "db_check": "Meneruskan Diagnosis ke Google Gemini AI Engine",
        "dec_text": "Respon AI Sukses?",
        "err_label": "[Timeout/Gagal]",
        "ok_label": "[Sukses]",
        "err_msg": "Menggunakan Kurikulum Standar Rekomendasi Sistem",
        "db_save": "Menyimpan Jadwal Kurikulum Latihan 7-30 Hari di DB",
        "sys_succ": "Menampilkan Silabus Latihan Solfeggio Harian Personal",
        "view": "Tampilan AI Vocal Coach",
        "ctrl": "AiCoachController",
        "svc": "GeminiAiService",
        "db": "CurriculumDB",
        "sd_msgs": [
            ("user", "view", "1: Akses AI Vocal Coach Planner"),
            ("view", "ctrl", "2: Tampilkan form target latihan"),
            ("user", "view", "3: Pilih fokus: Perbaikan Nada Flat & Chest Voice"),
            ("view", "ctrl", "4: Kirim preferensi target vokal"),
            ("ctrl", "svc", "5: Susun prompt diagnosis riwayat nada fals"),
            ("svc", "svc", "6: Panggil Google Gemini API untuk generate silabus"),
            ("svc", "db", "7: Simpan jadwal kurikulum terpersonalisasi"),
            ("db", "svc", "8: Jadwal latihan 14 hari tersimpan"),
            ("svc", "ctrl", "9: Kembalikan kurikulum drills tangga nada"),
            ("ctrl", "view", "10: Render kalender modul latihan harian"),
            ("view", "user", "11: Tampilkan rencana bimbingan vokal cerdas")
        ]
    },
    {
        "id": "20",
        "code": "AD-20",
        "sd_code": "SD-20",
        "title": "Menjalankan Sesi Latihan Tangga Nada",
        "short_title": "Latihan Tangga Nada Terpandu",
        "actor": "Pengguna",
        "nav": "Memilih Modul Latihan Tangga Nada (Solfeggio Drills)",
        "sys_show": "Memutar Audio Contoh Piano & Menampilkan Nada Acuan",
        "user_input": "Menyanyikan Tangga Nada (Do-Re-Mi-Fa-Sol) Sesuai Tempo",
        "user_submit": "Menekan Tombol Selesai Latihan Drill",
        "sys_val": "Mengevaluasi Ketepatan Nada Tiap Not Terhadap Acuan",
        "db_check": "Menghitung Rata-rata Skor Kepatuhan Nada Drill",
        "dec_text": "Skor Lulus >=70%?",
        "err_label": "[Belum Lulus]",
        "ok_label": "[Lulus]",
        "err_msg": "Memberikan Opsi Mengulang Latihan Tangga Nada Ini",
        "db_save": "Mencatat Progres Selesai pada Modul Kurikulum",
        "sys_succ": "Membuka Modul Latihan Tangga Nada Hari Berikutnya",
        "view": "Tampilan Guided Solfeggio",
        "ctrl": "DrillController",
        "svc": "AudioPitchEvaluationService",
        "db": "CurriculumDB",
        "sd_msgs": [
            ("user", "view", "1: Buka Latihan Solfeggio Hari ke-1"),
            ("view", "ctrl", "2: Request materi audio acuan tangga nada"),
            ("ctrl", "view", "3: Putar sampel suara piano (Do-Re-Mi-Fa-Sol)"),
            ("user", "view", "4: Bernyanyi menirukan nada piano"),
            ("view", "ctrl", "5: Stream sinyal vokal bernyanyi"),
            ("ctrl", "svc", "6: Bandingkan frekuensi vokal vs nada target"),
            ("svc", "ctrl", "7: Hitung persentase nada tepat (misal 88%)"),
            ("ctrl", "db", "8: Tandai sesi latihan hari ke-1 SELESAI"),
            ("db", "ctrl", "9: Update status materi latihan"),
            ("ctrl", "view", "10: Berikan lencana lulus drill harian"),
            ("view", "user", "11: Tampilkan evaluasi & tombol lanjut hari ke-2")
        ]
    },
    {
        "id": "21",
        "code": "AD-21",
        "sd_code": "SD-21",
        "title": "Memilih Paket dan Membayar Langganan",
        "short_title": "Beli Paket Langganan",
        "actor": "Pengguna",
        "nav": "Membuka Halaman Katalog Harga & Langganan",
        "sys_show": "Menampilkan Kartu Paket Free, Pro, dan Premium",
        "user_input": "Memilih Paket Langganan & Durasi (Bulanan/Tahunan)",
        "user_submit": "Menekan Tombol Bayar Sekarang",
        "sys_val": "Menghubungi Payment Gateway Snap Midtrans",
        "db_check": "Menerbitkan Kode Transaksi & Menunggu Pembayaran",
        "dec_text": "Pembayaran Lunas?",
        "err_label": "[Pending/Batal]",
        "ok_label": "[Settled/Lunas]",
        "err_msg": "Menampilkan Petunjuk Menuntaskan Pembayaran",
        "db_save": "Mengaktifkan Hak Akses Tier & Perpanjang Langganan",
        "sys_succ": "Menampilkan Bukti Pembayaran & Fitur Siap Digunakan",
        "view": "Tampilan Billing & Paket",
        "ctrl": "SubscriptionController",
        "svc": "MidtransPaymentService",
        "db": "BillingDB",
        "sd_msgs": [
            ("user", "view", "1: Buka halaman pilih paket langganan"),
            ("view", "ctrl", "2: Request daftar paket Pro & Premium"),
            ("ctrl", "view", "3: Render daftar harga & fitur"),
            ("user", "view", "4: Pilih paket Premium Bulanan"),
            ("view", "ctrl", "5: POST /api/subscriptions/checkout"),
            ("ctrl", "svc", "6: Hubungi Snap Midtrans API create transaction"),
            ("svc", "ctrl", "7: Kembalikan Snap Payment Token"),
            ("ctrl", "view", "8: Buka pop-up pembayaran resmi Midtrans"),
            ("user", "view", "9: Bayar via QRIS / Virtual Account"),
            ("ctrl", "svc", "10: Terima Webhook notifikasi status settlement"),
            ("svc", "db", "11: Update tier akun = 'premium' & expired_date"),
            ("db", "svc", "12: Transaksi lunas tercatat"),
            ("ctrl", "view", "13: Tampilkan notifikasi pembayaran berhasil"),
            ("view", "user", "14: Akses fitur Premium resmi aktif")
        ]
    },
    {
        "id": "22",
        "code": "AD-22",
        "sd_code": "SD-22",
        "title": "Melihat Riwayat Tagihan dan Invoice",
        "short_title": "Lihat Riwayat Tagihan",
        "actor": "Pengguna",
        "nav": "Membuka Menu Riwayat Tagihan & Faktur Saya",
        "sys_show": "Menampilkan Tabel Riwayat Transaksi Pembayaran",
        "user_input": "Memilih Baris Transaksi Tertentu untuk Detail Faktur",
        "user_submit": "Menekan Tombol Unduh Bukti Bayar PDF",
        "sys_val": "Memverifikasi Hak Kepemilikan Faktur Pembayaran",
        "db_check": "Mengambil Rincian Transaksi dari Database",
        "dec_text": "Data Faktur Ada?",
        "err_label": "[Belum Ada Transaksi]",
        "ok_label": "[Ada Transaksi]",
        "err_msg": "Menampilkan Pesan Riwayat Pembayaran Masih Kosong",
        "db_save": "Mencatat Log Akses Lembar Bukti Bayar",
        "sys_succ": "Mengunduh Berkas Faktur Pembayaran Resmi Format PDF",
        "view": "Tampilan Riwayat Tagihan",
        "ctrl": "BillingHistoryController",
        "svc": "InvoiceService",
        "db": "BillingDB",
        "sd_msgs": [
            ("user", "view", "1: Buka menu Riwayat Tagihan"),
            ("view", "ctrl", "2: Request daftar faktur by user_id"),
            ("ctrl", "db", "3: Query transactions & invoices"),
            ("db", "ctrl", "4: Kembalikan daftar invoice terbit"),
            ("ctrl", "view", "5: Tampilkan tabel riwayat pembayaran"),
            ("user", "view", "6: Klik Unduh Invoice PDF"),
            ("view", "ctrl", "7: Request berkas biner invoice"),
            ("ctrl", "svc", "8: Kompilasi invoice receipt format PDF"),
            ("svc", "ctrl", "9: File PDF kuitansi siap"),
            ("ctrl", "view", "10: Unduh file invoice ke browser"),
            ("view", "user", "11: Bukti bayar tersimpan di perangkat")
        ]
    },
    {
        "id": "23",
        "code": "AD-23",
        "sd_code": "SD-23",
        "title": "Manajemen Pengguna dan Tier",
        "short_title": "Manajemen Pengguna & Tier",
        "actor": "Administrator",
        "nav": "Membuka Panel Kontrol Administrator (User Management)",
        "sys_show": "Menampilkan Tabel Data Seluruh Pengguna Platform",
        "user_input": "Mencari Akun Pengguna & Memilih Aksi Ubah Tier/Suspend",
        "user_submit": "Menekan Tombol Konfirmasi Perubahan Akun",
        "sys_val": "Memverifikasi Hak Akses Administrator (Role Admin)",
        "db_check": "Memeriksa Status Akun Target pada Basis Data",
        "dec_text": "Role Admin Sah?",
        "err_label": "[Bukan Admin]",
        "ok_label": "[Admin Sah]",
        "err_msg": "Menolak Akses & Catat Upaya Ilegal di Security Log",
        "db_save": "Menyimpan Status Akun Baru & Log Audit Admin",
        "sys_succ": "Menampilkan Konfirmasi Perubahan Status Akun Berhasil",
        "view": "Panel Admin Manajemen User",
        "ctrl": "AdminUserController",
        "svc": "AdminUserService",
        "db": "UserDB",
        "sd_msgs": [
            ("admin", "view", "1: Buka Panel Admin Manajemen Pengguna"),
            ("view", "ctrl", "2: Request daftar seluruh pengguna"),
            ("ctrl", "svc", "3: Verifikasi role admin dari token JWT"),
            ("svc", "db", "4: Query data users & subscription tier"),
            ("db", "svc", "5: Kembalikan tabel akun pengguna"),
            ("svc", "ctrl", "6: Data pengguna siap ditampilkan"),
            ("ctrl", "view", "7: Render tabel manajemen akun"),
            ("admin", "view", "8: Ubah tier pengguna (misal Free ke Pro)"),
            ("view", "ctrl", "9: Kirim instruksi update status/tier akun"),
            ("ctrl", "svc", "10: Eksekusi pembaruan hak akses pengguna"),
            ("svc", "db", "11: UPDATE users SET role/tier & catat audit_log"),
            ("db", "svc", "12: Perubahan tersimpan di database"),
            ("svc", "ctrl", "13: Status akun berhasil diperbarui"),
            ("ctrl", "view", "14: Notifikasi sukses pembaruan data pengguna"),
            ("view", "admin", "15: Tampilkan data terkini di tabel admin")
        ]
    },
    {
        "id": "24",
        "code": "AD-24",
        "sd_code": "SD-24",
        "title": "Pemantauan Analitik Finansial dan Sistem",
        "short_title": "Monitoring Finansial & Sistem",
        "actor": "Administrator",
        "nav": "Membuka Menu Dasbor Analitik & Monitoring Sistem",
        "sys_show": "Menampilkan Statistik Omset, Beban AI, & Kuota Server",
        "user_input": "Mengatur Parameter Toleransi Nada Fals (Ambang Cents)",
        "user_submit": "Menekan Tombol Terapkan Parameter Tuning Global",
        "sys_val": "Memvalidasi Nilai Parameter Tuning dalam Rentang Aman",
        "db_check": "Mengambil Rekapitulasi Finansial & Metrik Kinerja AI",
        "dec_text": "Parameter Aman?",
        "err_label": "[Di Luar Batas]",
        "ok_label": "[Rentang Aman]",
        "err_msg": "Peringatan Nilai Parameter Tidak Sesuai Rentang",
        "db_save": "Menyimpan Parameter Sistem & Metrik Baru ke DB",
        "sys_succ": "Menampilkan Pembaruan Grafik Pendapatan & Beban AI",
        "view": "Panel Admin Analitik",
        "ctrl": "AdminSystemController",
        "svc": "SystemMonitoringService",
        "db": "SystemConfigDB",
        "sd_msgs": [
            ("admin", "view", "1: Buka Dasbor Analitik Sistem & Finansial"),
            ("view", "ctrl", "2: Request rekap pendapatan & utilisasi AI Engine"),
            ("ctrl", "svc", "3: Agregasi metrik finansial & beban CPU/GPU worker"),
            ("svc", "db", "4: Query pendapatan Midtrans & log pemrosesan audio"),
            ("db", "svc", "5: Kembalikan statistik transaksi & durasi ekstraksi"),
            ("svc", "ctrl", "6: Olah data metrik visual"),
            ("ctrl", "view", "7: Render grafik pendapatan bulanan & antrian AI"),
            ("admin", "view", "8: Ubah toleransi cents nada fals (misal 20 cents)"),
            ("view", "ctrl", "9: Kirim nilai tuning baru"),
            ("ctrl", "svc", "10: Validasi & terapkan ke konfigurasi AI engine"),
            ("svc", "db", "11: Simpan parameter ke system_configs"),
            ("db", "svc", "12: Parameter konfigurasi terbarui"),
            ("ctrl", "view", "13: Tampilkan notifikasi konfigurasi aktif"),
            ("view", "admin", "14: Grafik diperbarui secara langsung")
        ]
    }
]

# ----------------------------------------------------------------------
# 1. GENERATE USE CASE DIAGRAM (NO NUMBERING, BOX & TALINYA VISIBLE)
# ----------------------------------------------------------------------
def generate_usecase_drawio():
    xml = """<mxfile host="65bd71144e">
    <diagram name="Use Case Diagram VocalSense AI" id="uc_vocalsense_ai">
        <mxGraphModel dx="1200" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="1600" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                
                <!-- System Boundary Box (Monochrome Black & White) -->
                <mxCell id="boundary" value="Sistem VocalSense AI" style="shape=rect;fillColor=none;strokeColor=#000000;strokeWidth=2;align=center;verticalAlign=top;fontSize=18;fontStyle=1;whiteSpace=wrap;html=1;" vertex="1" parent="1">
                    <mxGeometry x="190" y="40" width="380" height="1470" as="geometry"/>
                </mxCell>
                
                <!-- Primary Actor: Pengguna (Positioned on the Left, vertically centered against its 22 Use Cases) -->
                <mxCell id="a_pengguna" value="Pengguna" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;strokeColor=#000000;fillColor=#ffffff;" vertex="1" parent="1">
                    <mxGeometry x="50" y="700" width="40" height="80" as="geometry"/>
                </mxCell>
                
                <!-- Secondary Actor: Administrator (Positioned on the Right, directly facing Admin Use Cases) -->
                <mxCell id="a_admin" value="Administrator" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;strokeColor=#000000;fillColor=#ffffff;" vertex="1" parent="1">
                    <mxGeometry x="650" y="1400" width="40" height="80" as="geometry"/>
                </mxCell>
"""
    # 24 Use Cases in a single neat vertical column centered inside the boundary box
    # Boundary x=190, width=380 -> center x is 190 + (380 - 320)/2 = 220
    # Width = 320, Height = 44, Step = 60
    # UC 01 to 22 (Pengguna): y = 80 to 1340
    for i in range(22):
        uc = USE_CASES[i]
        y_pos = 80 + i * 60
        title_val = xml_esc(uc['short_title'])
        xml += f"""                <mxCell id="uc_{uc['id']}" value="{title_val}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.5;fontSize=12;" vertex="1" parent="1">
                    <mxGeometry x="220" y="{y_pos}" width="320" height="44" as="geometry"/>
                </mxCell>
                <!-- Direct straight line from Pengguna to left edge of use case (entryX=0; entryY=0.5) -->
                <mxCell id="edge_{uc['id']}" style="endArrow=none;html=1;rounded=0;strokeColor=#000000;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="a_pengguna" target="uc_{uc['id']}">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
"""

    # UC 23 & 24 (Administrator): y = 1400 and 1455
    for i in range(22, 24):
        uc = USE_CASES[i]
        y_pos = 1400 if i == 22 else 1455
        title_val = xml_esc(uc['short_title'])
        xml += f"""                <mxCell id="uc_{uc['id']}" value="{title_val}" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#000000;strokeWidth=1.5;fontSize=12;" vertex="1" parent="1">
                    <mxGeometry x="220" y="{y_pos}" width="320" height="44" as="geometry"/>
                </mxCell>
                <!-- Direct straight line from Administrator to right edge of use case (entryX=1; entryY=0.5) -->
                <mxCell id="edge_{uc['id']}" style="endArrow=none;html=1;rounded=0;strokeColor=#000000;entryX=1;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="a_admin" target="uc_{uc['id']}">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
"""

    xml += """            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""

    with open(os.path.join(UC_DIR, "usecase_diagram_final.drawio"), "w", encoding="utf-8") as f:
        f.write(xml)
    with open(os.path.join(UC_DIR, "usecase_diagram_vocal_sense.drawio"), "w", encoding="utf-8") as f:
        f.write(xml)
    print("Generated Use Case Diagrams (usecase_diagram_final.drawio & usecase_diagram_vocal_sense.drawio) in clean B&W with zero overlapping straight lines.")

# ----------------------------------------------------------------------
# 2. GENERATE DFD DIAGRAMS (LEVEL 0, LEVEL 1, LEVEL 2)
# (Modeled directly after D:\Kuliah\APPL - Copy (2)\DFD)
# ----------------------------------------------------------------------
def generate_dfd_diagrams():
    # 2.1 DFD Level 0 (Context & Core Processes)
    dfd0_xml = """<mxfile host="app.diagrams.net">
  <diagram name="DFD Level 0" id="dfd_level_0">
    <mxGraphModel dx="2241" dy="887" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- External Entities -->
        <mxCell id="ent_user" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fontSize=12;fontStyle=1;" value="Pengguna&#xa;(Penyanyi)" vertex="1">
          <mxGeometry height="60" width="120" x="265" y="30" as="geometry" />
        </mxCell>
        
        <mxCell id="ent_admin" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fontSize=12;fontStyle=1;" value="Administrator" vertex="1">
          <mxGeometry height="60" width="120" x="660" y="415" as="geometry" />
        </mxCell>
        
        <mxCell id="ent_payment" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fontSize=12;fontStyle=1;" value="Payment Gateway&#xa;(Midtrans)" vertex="1">
          <mxGeometry height="60" width="130" x="-50" y="415" as="geometry" />
        </mxCell>
        
        <mxCell id="ent_ai_engine" parent="1" style="rounded=0;whiteSpace=wrap;html=1;fontSize=12;fontStyle=1;" value="AI Vocal Coach&#xa;&amp; LLM Engine" vertex="1">
          <mxGeometry height="60" width="130" x="260" y="790" as="geometry" />
        </mxCell>
        
        <!-- Core Processes (Circles) -->
        <mxCell id="proc_1" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;fontStyle=1;" value="1 Sistem Pengelolaan&#xa;Akun &amp; Profil Vokal" vertex="1">
          <mxGeometry height="150" width="150" x="250" y="190" as="geometry" />
        </mxCell>
        
        <mxCell id="proc_2" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;fontStyle=1;" value="2 Sistem Perekaman &amp;&#xa;Analisis Suara Bernyanyi" vertex="1">
          <mxGeometry height="150" width="150" x="250" y="370" as="geometry" />
        </mxCell>
        
        <mxCell id="proc_3" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;fontStyle=1;" value="3 Sistem Evaluasi Rapor&#xa;&amp; Latihan Vokal AI" vertex="1">
          <mxGeometry height="150" width="150" x="250" y="550" as="geometry" />
        </mxCell>
        
        <!-- Data Stores (Open-ended rectangles) -->
        <mxCell id="ds_user" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Data Pengguna" vertex="1">
          <mxGeometry height="30" width="120" x="500" y="250" as="geometry" />
        </mxCell>
        
        <mxCell id="ds_report" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Data Rekaman &amp; Rapor" vertex="1">
          <mxGeometry height="30" width="140" x="500" y="430" as="geometry" />
        </mxCell>
        
        <mxCell id="ds_curriculum" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Data Kurikulum AI" vertex="1">
          <mxGeometry height="30" width="130" x="500" y="610" as="geometry" />
        </mxCell>
        
        <!-- Data Flows with EdgeLabels -->
        <mxCell id="e_u_p1" edge="1" parent="1" source="ent_user" target="proc_1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_u_p1" connectable="0" parent="e_u_p1" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Data Registrasi &amp; Profil" vertex="1">
          <mxGeometry relative="1" x="-0.2" y="2" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p1_u" edge="1" parent="1" source="proc_1" target="ent_user" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.2;exitY=0;exitDx=0;exitDy=0;entryX=0.2;entryY=1;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p1_u" connectable="0" parent="e_p1_u" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Status Akun &amp; Token JWT" vertex="1">
          <mxGeometry relative="1" x="0.2" y="-1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p1_ds" edge="1" parent="1" source="proc_1" target="ds_user" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p1_ds" connectable="0" parent="e_p1_ds" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Simpan Akun" vertex="1">
          <mxGeometry relative="1" x="-0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_u_p2" edge="1" parent="1" source="ent_user" target="proc_2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="180" y="60" />
              <mxPoint x="180" y="445" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_u_p2" connectable="0" parent="e_u_p2" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Sinyal Audio Bernyanyi &amp; Uji Range" vertex="1">
          <mxGeometry relative="1" x="-0.1" y="-2" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p2_u" edge="1" parent="1" source="proc_2" target="ent_user" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=1;exitY=0;exitDx=0;exitDy=0;entryX=1;entryY=0.5;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="630" y="380" />
              <mxPoint x="630" y="60" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_p2_u" connectable="0" parent="e_p2_u" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Kurva Pitch Waktu Nyata &amp; Rapor" vertex="1">
          <mxGeometry relative="1" x="0.2" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p2_ds" edge="1" parent="1" source="proc_2" target="ds_report" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p2_ds" connectable="0" parent="e_p2_ds" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Simpan Rapor &amp; Skor" vertex="1">
          <mxGeometry relative="1" x="-0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p2_pay" edge="1" parent="1" source="proc_2" target="ent_payment" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p2_pay" connectable="0" parent="e_p2_pay" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Instruksi Checkout Paket" vertex="1">
          <mxGeometry relative="1" x="0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_pay_p2" edge="1" parent="1" source="ent_payment" target="proc_2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.2;entryY=1;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_pay_p2" connectable="0" parent="e_pay_p2" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Status Settlement Lunas" vertex="1">
          <mxGeometry relative="1" x="0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p3_ai" edge="1" parent="1" source="proc_3" target="ent_ai_engine" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p3_ai" connectable="0" parent="e_p3_ai" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Diagnosis Riwayat Nada Fals" vertex="1">
          <mxGeometry relative="1" x="-0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_ai_p3" edge="1" parent="1" source="ent_ai_engine" target="proc_3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;exitX=0.8;exitY=0;exitDx=0;exitDy=0;entryX=0.8;entryY=1;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ai_p3" connectable="0" parent="e_ai_p3" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Silabus Kurikulum Latihan Harian" vertex="1">
          <mxGeometry relative="1" x="0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_p3_ds" edge="1" parent="1" source="proc_3" target="ds_curriculum" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_p3_ds" connectable="0" parent="e_p3_ds" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Simpan Silabus AI" vertex="1">
          <mxGeometry relative="1" x="-0.1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_adm_p1" edge="1" parent="1" source="ent_admin" target="proc_1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_adm_p1" connectable="0" parent="e_adm_p1" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Manajemen Status &amp; Tier Pengguna" vertex="1">
          <mxGeometry relative="1" x="-0.2" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

    # 2.2 DFD Level 1 (Decomposition of Process 2: Perekaman & Analisis Suara)
    dfd1_xml = """<mxfile host="app.diagrams.net">
  <diagram name="DFD Level 1" id="dfd_level_1">
    <mxGraphModel dx="1758" dy="1066" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Input from Process 1 -->
        <mxCell id="p_in" parent="1" style="html=1;dashed=0;whiteSpace=wrap;fontSize=11;fontStyle=1;" value="1 Sistem Akun &amp; Profil" vertex="1">
          <mxGeometry height="50" width="130" x="120" y="250" as="geometry" />
        </mxCell>
        
        <!-- Subprocesses 2.x -->
        <mxCell id="p_21" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;" value="2.1 Menangkap Audio&#xa;Bernyanyi" vertex="1">
          <mxGeometry height="120" width="120" x="125" y="650" as="geometry" />
        </mxCell>
        
        <mxCell id="p_22" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;" value="2.2 Memvalidasi Kualitas&#xa;&amp; Kebisingan Sinyal" vertex="1">
          <mxGeometry height="120" width="120" x="350" y="250" as="geometry" />
        </mxCell>
        
        <mxCell id="p_23" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;" value="2.3 Ekstraksi Frekuensi&#xa;Nada Dasar (F0 &amp; Cents)" vertex="1">
          <mxGeometry height="120" width="120" x="350" y="460" as="geometry" />
        </mxCell>
        
        <mxCell id="p_24" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;" value="2.4 Mendeteksi Nada Fals&#xa;&amp; Analisis Vibrato" vertex="1">
          <mxGeometry height="120" width="120" x="350" y="670" as="geometry" />
        </mxCell>
        
        <mxCell id="p_25" parent="1" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fontSize=11;" value="2.5 Mengompilasi Skor&#xa;&amp; Saran Teknik AI" vertex="1">
          <mxGeometry height="120" width="120" x="580" y="250" as="geometry" />
        </mxCell>
        
        <!-- Data Stores & Entities -->
        <mxCell id="ds_reports" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Data Rekaman &amp; Rapor" vertex="1">
          <mxGeometry height="30" width="140" x="570" y="500" as="geometry" />
        </mxCell>
        
        <mxCell id="ent_ai_engine" parent="1" style="html=1;dashed=0;whiteSpace=wrap;fontSize=11;fontStyle=1;" value="Voice Analytics&#xa;AI Engine" vertex="1">
          <mxGeometry height="50" width="130" x="575" y="705" as="geometry" />
        </mxCell>
        
        <!-- Edges with Labels -->
        <mxCell id="e_pin_22" edge="1" parent="1" source="p_in" target="p_22" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_pin_22" connectable="0" parent="e_pin_22" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Profil Vokal Penyanyi" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_21_22" edge="1" parent="1" source="p_21" target="p_22" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;entryX=0;entryY=0.5;entryDx=0;entryDy=0;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_21_22" connectable="0" parent="e_21_22" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Stream Audio Mentah" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_22_23" edge="1" parent="1" source="p_22" target="p_23" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_22_23" connectable="0" parent="e_22_23" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Audio Lolos Noise Filter" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_23_24" edge="1" parent="1" source="p_23" target="p_24" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_23_24" connectable="0" parent="e_23_24" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Deret Frekuensi Pitch F0" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_24_ds" edge="1" parent="1" source="p_24" target="ds_reports" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_24_ds" connectable="0" parent="e_24_ds" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Data Cents &amp; Vibrato" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_ds_25" edge="1" parent="1" source="ds_reports" target="p_25" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ds_25" connectable="0" parent="e_ds_25" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Rekapitulasi Nada Sesi" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_ai_24" edge="1" parent="1" source="ent_ai_engine" target="p_24" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ai_24" connectable="0" parent="e_ai_24" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Model Deteksi Vibrato" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

    # 2.3 DFD Level 2 (Decomposition of Process 2.3: Ekstraksi Pitch F0 & Cents)
    dfd2_xml = """<mxfile host="app.diagrams.net">
  <diagram name="DFD Level 2" id="dfd_level_2">
    <mxGraphModel dx="3087" dy="1370" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Input process from 2.2 -->
        <mxCell id="p_in22" parent="1" style="html=1;dashed=0;whiteSpace=wrap;fontSize=11;fontStyle=1;" value="2.2 Memvalidasi Audio" vertex="1">
          <mxGeometry height="50" width="130" x="120" y="230" as="geometry" />
        </mxCell>
        
        <!-- Subprocesses 2.3.x -->
        <mxCell id="p_231" parent="1" style="shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;fontSize=10;" value="2.3.1 Membagi Audio ke&#xa;Frame FFT (Buffer 2048)" vertex="1">
          <mxGeometry height="120" width="120" x="125" y="390" as="geometry" />
        </mxCell>
        
        <mxCell id="p_232" parent="1" style="shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;fontSize=10;" value="2.3.2 Menghitung Korelasi&#xa;Pitch F0 (Algoritma YIN)" vertex="1">
          <mxGeometry height="120" width="120" x="125" y="610" as="geometry" />
        </mxCell>
        
        <mxCell id="p_233" parent="1" style="shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;fontSize=10;" value="2.3.3 Mengonversi Hz&#xa;ke Nada Musik (Midi)" vertex="1">
          <mxGeometry height="120" width="120" x="380" y="610" as="geometry" />
        </mxCell>
        
        <mxCell id="p_234" parent="1" style="shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;fontSize=10;" value="2.3.4 Menghitung Selisih&#xa;Deviasi Cents" vertex="1">
          <mxGeometry height="120" width="120" x="380" y="390" as="geometry" />
        </mxCell>
        
        <mxCell id="p_235" parent="1" style="shape=ellipse;html=1;dashed=0;whiteSpace=wrap;aspect=fixed;perimeter=ellipsePerimeter;fontSize=10;" value="2.3.5 Mengirimkan Titik&#xa;ke Visualizer &amp; DB" vertex="1">
          <mxGeometry height="120" width="120" x="620" y="390" as="geometry" />
        </mxCell>
        
        <!-- Output to 2.4 -->
        <mxCell id="p_out24" parent="1" style="html=1;dashed=0;whiteSpace=wrap;fontSize=11;fontStyle=1;" value="2.4 Deteksi Nada Fals" vertex="1">
          <mxGeometry height="50" width="130" x="375" y="230" as="geometry" />
        </mxCell>
        
        <!-- Data Stores -->
        <mxCell id="ds_buffer" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Buffer Audio Frame" vertex="1">
          <mxGeometry height="30" width="130" x="-70" y="435" as="geometry" />
        </mxCell>
        
        <mxCell id="ds_pitch_points" parent="1" style="html=1;dashed=0;whiteSpace=wrap;shape=partialRectangle;right=0;left=0;fontSize=11;fontStyle=1;" value="Data Titik Pitch &amp; Cents" vertex="1">
          <mxGeometry height="30" width="140" x="620" y="655" as="geometry" />
        </mxCell>
        
        <!-- Edges with Labels -->
        <mxCell id="e_22_231" edge="1" parent="1" source="p_in22" target="p_231" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_22_231" connectable="0" parent="e_22_231" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Buffer Audio Bersih" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_231_232" edge="1" parent="1" source="p_231" target="p_232" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_231_232" connectable="0" parent="e_231_232" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Potongan Sinyal 10ms" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_232_233" edge="1" parent="1" source="p_232" target="p_233" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_232_233" connectable="0" parent="e_232_233" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Nilai F0 Hertz Terkunci" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_233_234" edge="1" parent="1" source="p_233" target="p_234" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_233_234" connectable="0" parent="e_233_234" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Identifikasi Notasi Nada" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_234_235" edge="1" parent="1" source="p_234" target="p_235" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_234_235" connectable="0" parent="e_234_235" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Nilai Deviasi Cents (-50 s/d +50)" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_235_out" edge="1" parent="1" source="p_235" target="p_out24" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_235_out" connectable="0" parent="e_235_out" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Data Nada Siap Evaluasi" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
        
        <mxCell id="e_235_ds" edge="1" parent="1" source="p_235" target="ds_pitch_points" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_235_ds" connectable="0" parent="e_235_ds" style="edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];fontSize=10;" value="Simpan Kurva Pitch" vertex="1">
          <mxGeometry relative="1" as="geometry"><mxPoint as="offset" /></mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""

    # Write DFD files
    for name, content in [
        ("lv0.drawio", dfd0_xml),
        ("dfd_level_0.drawio", dfd0_xml),
        ("LVL1.drawio", dfd1_xml),
        ("dfd_level_1.drawio", dfd1_xml),
        ("LVL2.drawio", dfd2_xml),
        ("dfd_level_2.drawio", dfd2_xml),
    ]:
        with open(os.path.join(DFD_DIR, name), "w", encoding="utf-8") as f:
            f.write(content)
    print("Generated all DFD diagrams (lv0.drawio, LVL1.drawio, LVL2.drawio)")

# ----------------------------------------------------------------------
# 3. GENERATE ALL 24 ACTIVITY DIAGRAMS (EXACT APPL TEMPLATE STYLE)
# ----------------------------------------------------------------------
def generate_activity_diagram_drawio(uc):
    safe_name = re.sub(r'[^a-zA-Z0-9_]', '_', uc['title'])
    drawio_name = f"{uc['code']}_{safe_name}.drawio"
    drawio_path = os.path.join(AD_DIR, drawio_name)

    lane_height = 1350
    total_height = lane_height + 30

    title_esc = xml_esc(uc['title'])
    actor_esc = xml_esc(uc['actor'])
    nav_esc = xml_esc(uc['nav'])
    sys_show_esc = xml_esc(uc['sys_show'])
    user_input_esc = xml_esc(uc['user_input'])
    user_submit_esc = xml_esc(uc['user_submit'])
    sys_val_esc = xml_esc(uc['sys_val'])
    db_check_esc = xml_esc(uc['db_check'])
    err_lbl_esc = xml_esc(uc['err_label'])
    err_msg_esc = xml_esc(uc['err_msg'])
    ok_lbl_esc = xml_esc(uc['ok_label'])
    db_save_esc = xml_esc(uc['db_save'])
    sys_succ_esc = xml_esc(uc['sys_succ'])

    xml = f"""<mxfile host="65bd71144e">
    <diagram name="{uc['code']} {title_esc}" id="id_{uc['code']}">
        <mxGraphModel dx="3416" dy="3153" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1653" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                
                <!-- Swimlane 0: Actor (Pengguna or Administrator) -->
                <mxCell id="lane_0" value="{actor_esc}" style="swimlane;startSize=30;fontSize=12;fontStyle=1;" parent="1" vertex="1">
                    <mxGeometry x="-210" width="330" height="{lane_height}" as="geometry"/>
                </mxCell>
                
                <!-- Swimlane 1: Sistem -->
                <mxCell id="lane_1" value="Sistem" style="swimlane;startSize=30;fontSize=12;fontStyle=1;" parent="1" vertex="1">
                    <mxGeometry x="120" width="330" height="{lane_height}" as="geometry"/>
                </mxCell>
                
                <!-- Swimlane 2: Database -->
                <mxCell id="lane_2" value="Database" style="swimlane;startSize=30;fontSize=12;fontStyle=1;" parent="1" vertex="1">
                    <mxGeometry x="450" width="330" height="{lane_height}" as="geometry"/>
                </mxCell>
                
                <!-- Start node in lane_0 -->
                <mxCell id="n_start" value="" style="ellipse;fillColor=#000000;" parent="lane_0" vertex="1">
                    <mxGeometry x="152.5" y="50" width="25" height="25" as="geometry"/>
                </mxCell>
                
                <!-- Navigation step in lane_0 -->
                <mxCell id="n_nav" value="{nav_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_0" vertex="1">
                    <mxGeometry x="95" y="110" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- System render step in lane_1 -->
                <mxCell id="n_sys_show" value="{sys_show_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_1" vertex="1">
                    <mxGeometry x="95" y="220" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- User input step in lane_0 -->
                <mxCell id="n_user_input" value="{user_input_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_0" vertex="1">
                    <mxGeometry x="95" y="330" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- User submit step in lane_0 -->
                <mxCell id="n_user_submit" value="{user_submit_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_0" vertex="1">
                    <mxGeometry x="95" y="440" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- System validation in lane_1 -->
                <mxCell id="n_sys_val" value="{sys_val_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_1" vertex="1">
                    <mxGeometry x="95" y="550" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- Database check in lane_2 -->
                <mxCell id="n_db_check" value="{db_check_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_2" vertex="1">
                    <mxGeometry x="95" y="660" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- Decision diamond in lane_1 -->
                <mxCell id="n_dec" value="" style="rhombus;" parent="lane_1" vertex="1">
                    <mxGeometry x="125" y="770" width="80" height="80" as="geometry"/>
                </mxCell>
                
                <!-- Error notification in lane_1 -->
                <mxCell id="n_err" value="{err_msg_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=10;fillColor=#ffffff;strokeColor=#000000;" parent="lane_1" vertex="1">
                    <mxGeometry x="10" y="860" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- Database save in lane_2 -->
                <mxCell id="n_db_save" value="{db_save_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_2" vertex="1">
                    <mxGeometry x="95" y="990" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- System success in lane_1 -->
                <mxCell id="n_sys_succ" value="{sys_succ_esc}" style="rounded=1;whiteSpace=wrap;html=1;fontSize=11;" parent="lane_1" vertex="1">
                    <mxGeometry x="95" y="1110" width="140" height="65" as="geometry"/>
                </mxCell>
                
                <!-- End node in lane_1 -->
                <mxCell id="n_end" value="" style="shape=doubleEllipse;whiteSpace=wrap;" parent="lane_1" vertex="1">
                    <mxGeometry x="150" y="1230" width="30" height="30" as="geometry"/>
                </mxCell>
                
                <!-- Edges (All with mxGeometry relative="1" per APPL template) -->
                <mxCell id="e_0" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_start" target="n_nav" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_nav" target="n_sys_show" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_sys_show" target="n_user_input" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_user_input" target="n_user_submit" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_user_submit" target="n_sys_val" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_sys_val" target="n_db_check" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_6" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_db_check" target="n_dec" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <!-- Decision error branch -->
                <mxCell id="e_7" value="{err_lbl_esc}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0;exitY=0.5;exitDx=0;exitDy=0;fontSize=10;" parent="1" source="n_dec" target="n_err" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <!-- Loop back from error to input (clean orthogonal path via left margin) -->
                <mxCell id="e_8" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" parent="1" source="n_err" target="n_user_input" edge="1">
                    <mxGeometry relative="1" as="geometry">
                        <Array as="points">
                            <mxPoint x="-170" y="892.5"/>
                            <mxPoint x="-170" y="362.5"/>
                        </Array>
                    </mxGeometry>
                </mxCell>
                
                <!-- Decision OK branch -->
                <mxCell id="e_9" value="{ok_lbl_esc}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;fontSize=10;" parent="1" source="n_dec" target="n_db_save" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_10" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_db_save" target="n_sys_succ" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <mxCell id="e_11" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" parent="1" source="n_sys_succ" target="n_end" edge="1">
                    <mxGeometry relative="1" as="geometry"/>
                </mxCell>
                
                <!-- Outer title container (Placed at bottom of root like APPL templates to avoid capturing clicks) -->
                <mxCell id="outer_container" value="{title_esc}" style="swimlane;startSize=30;fontSize=14;fontStyle=1;" vertex="1" parent="1">
                    <mxGeometry x="-210" y="-30" width="990" height="{total_height}" as="geometry"/>
                </mxCell>
            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""

    with open(drawio_path, "w", encoding="utf-8") as f:
        f.write(xml)

# ----------------------------------------------------------------------
# 4. GENERATE ALL 24 SEQUENCE DIAGRAMS (EXACT APPL TEMPLATE STYLE)
# ----------------------------------------------------------------------
def generate_sequence_diagram_drawio(uc):
    safe_name = re.sub(r'[^a-zA-Z0-9_]', '_', uc['title'])
    drawio_name = f"{uc['sd_code']}_{safe_name}.drawio"
    drawio_path = os.path.join(SD_DIR, drawio_name)

    msgs = uc['sd_msgs']
    total_h = 100 + len(msgs) * 60 + 60

    title_esc = xml_esc(uc['title'])
    actor_esc = xml_esc(uc['actor'])
    view_esc = xml_esc(uc['view'])
    ctrl_esc = xml_esc(uc['ctrl'])
    svc_esc = xml_esc(uc['svc'])
    db_esc = xml_esc(uc['db'])

    xml = f"""<mxfile host="65bd71144e">
    <diagram name="{uc['sd_code']} {title_esc}" id="{uc['sd_code']}">
        <mxGraphModel dx="1200" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="1653" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                
                <!-- Lifelines (APPL Style MVC) -->
                <mxCell id="ll_User" value="{actor_esc}" style="shape=umlLifeline;participant=umlActor;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;verticalAlign=top;spacingTop=36;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="80" y="50" width="40" height="{total_h}" as="geometry"/>
                </mxCell>
                <mxCell id="ll_View" value="{view_esc}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="270" y="50" width="130" height="{total_h}" as="geometry"/>
                </mxCell>
                <mxCell id="ll_Controller" value="{ctrl_esc}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="480" y="50" width="120" height="{total_h}" as="geometry"/>
                </mxCell>
                <mxCell id="ll_Service" value="{svc_esc}" style="shape=umlLifeline;perimeter=lifelinePerimeter;whiteSpace=wrap;html=1;container=1;collapsible=0;recursiveResize=0;outlineConnect=0;" parent="1" vertex="1">
                    <mxGeometry x="680" y="50" width="130" height="{total_h}" as="geometry"/>
                </mxCell>
                <mxCell id="ll_DB_cyl" value="&amp;lt;&amp;lt;Database&amp;gt;&amp;gt;&amp;#10;{db_esc}" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;" parent="1" vertex="1">
                    <mxGeometry x="890" y="50" width="100" height="70" as="geometry"/>
                </mxCell>
                <mxCell id="ll_DB_line" value="" style="endArrow=none;dashed=1;html=1;rounded=0;" parent="1" source="ll_DB_cyl" edge="1">
                    <mxGeometry width="50" height="50" relative="1" as="geometry">
                        <mxPoint x="940" y="120" as="sourcePoint"/>
                        <mxPoint x="940" y="{total_h + 50}" as="targetPoint"/>
                    </mxGeometry>
                </mxCell>
"""
    x_coords = {
        "user": 100,
        "admin": 100,
        "view": 335,
        "ctrl": 540,
        "svc": 745,
        "db": 940
    }

    y_pos = 145
    for idx, (src, dst, msg_txt) in enumerate(msgs):
        x1 = x_coords.get(src, 100)
        x2 = x_coords.get(dst, 335)
        is_ret = ("kembalikan" in msg_txt.lower() or "tampilkan" in msg_txt.lower() or "notifikasi" in msg_txt.lower() or "berhasil" in msg_txt.lower() or "redirect" in msg_txt.lower())
        line_style = "dashed=1;endArrow=open;" if is_ret else "endArrow=block;"
        msg_esc = xml_esc(msg_txt)

        xml += f"""                <mxCell id="msg_{idx+1}" value="{msg_esc}" style="html=1;verticalAlign=bottom;{line_style}edgeStyle=none;rounded=0;fontSize=10;" parent="1" edge="1">
                    <mxGeometry width="80" relative="1" as="geometry">
                        <mxPoint x="{x1}" y="{y_pos}" as="sourcePoint"/>
                        <mxPoint x="{x2}" y="{y_pos}" as="targetPoint"/>
                    </mxGeometry>
                </mxCell>
"""
        y_pos += 55

    xml += """            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""

    with open(drawio_path, "w", encoding="utf-8") as f:
        f.write(xml)

# ----------------------------------------------------------------------
# MAIN EXECUTION
# ----------------------------------------------------------------------
def main():
    print("1. Generating Use Case Diagrams (No numbering, fully visible box & lines)...")
    generate_usecase_drawio()
    
    print("2. Generating DFD Level 0, Level 1, Level 2 (Modeled after APPL)...")
    generate_dfd_diagrams()
    
    print(f"3. Generating 24 Activity Diagrams (APPL Template with outer container & clean loopbacks)...")
    for uc in USE_CASES:
        generate_activity_diagram_drawio(uc)
    print("   All 24 Activity Diagrams generated successfully.")
    
    print(f"4. Generating 24 Sequence Diagrams (APPL Template MVC Lifelines)...")
    for uc in USE_CASES:
        generate_sequence_diagram_drawio(uc)
    print("   All 24 Sequence Diagrams generated successfully.")
    print("Done generating all diagrams!")

if __name__ == "__main__":
    main()
