import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import shutil
import os
import re

def set_cell_background(cell, hex_color="F2F2F2"):
    tblCell = cell._tc
    tblCellProperties = tblCell.get_or_add_tcPr()
    clShading = OxmlElement('w:shd')
    clShading.set(qn('w:val'), 'clear')
    clShading.set(qn('w:color'), 'auto')
    clShading.set(qn('w:fill'), hex_color)
    tblCellProperties.append(clShading)

def set_table_borders(table):
    tblPr = table._element.xpath('w:tblPr')
    if not tblPr:
        tblPr = OxmlElement('w:tblPr')
        table._element.insert(0, tblPr)
    else:
        tblPr = tblPr[0]
        
    tblBorders = OxmlElement('w:tblBorders')
    for border_name in ['top', 'left', 'bottom', 'right', 'insideH', 'insideV']:
        border = OxmlElement(f'w:{border_name}')
        border.set(qn('w:val'), 'single')
        border.set(qn('w:sz'), '4')  
        border.set(qn('w:space'), '0')
        border.set(qn('w:color'), 'CCCCCC')
        tblBorders.append(border)
    tblPr.append(tblBorders)

def parse_markdown_usecases():
    md_path = 'D:/Kuliah/IPPL/docs/usecase_description.md'
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    use_cases = []
    blocks = re.split(r'###\s+UC-\d+\s+', content)[1:]
    
    for idx, block in enumerate(blocks):
        lines = [line.strip() for line in block.split('\n')]
        title = lines[0]
        
        uc_data = {
            "code": f"UC-{idx+1:02d}",
            "name": title,
            "id": "",
            "desc": "",
            "actor": "",
            "pre": "",
            "alur": "",
            "alt": "",
            "succ": "",
            "fail": ""
        }
        
        current_key = None
        current_text = []
        for line in lines[1:]:
            if line.startswith('**Nama use case & id**'):
                current_key = 'id'
                current_text = []
            elif line.startswith('**Deskripsi Singkat**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'desc'
                current_text = []
            elif line.startswith('**Aktor**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'actor'
                current_text = []
            elif line.startswith('**Prasyarat**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'pre'
                current_text = []
            elif line.startswith('**Alur Utama**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'alur'
                current_text = []
            elif line.startswith('**Alur Alternatif**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'alt'
                current_text = []
            elif line.startswith('**Kondisi Akhir Sukses**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'succ'
                current_text = []
            elif line.startswith('**Kondisi Akhir gagal**'):
                uc_data[current_key] = '\n'.join(current_text).strip()
                current_key = 'fail'
                current_text = []
            elif line == '---' or line == '':
                if current_key and line != '':
                    current_text.append(line)
            else:
                if current_key:
                    current_text.append(line)
                    
        if current_key:
            uc_data[current_key] = '\n'.join(current_text).strip()
            
        use_cases.append(uc_data)
        
    return use_cases

# Dictionary of specialized activity and sequence descriptions for all 24 use cases
UC_DESCRIPTIONS = {
    1: {
        "ad": "Alur registrasi penyanyi baru diawali dari navigasi Halaman Beranda menuju Form Registrasi. Calon penyanyi memasukkan nama lengkap, alamat email, dan kata sandi. Sistem Web Audio & API melakukan validasi format dan memeriksa ketersediaan email pada basis data. Jika [Tersedia], sistem meng-hash kata sandi menggunakan bcrypt (salt rounds 10), membuat entri akun baru, menerbitkan token sesi JWT aman, dan mengalihkan ke Dasbor Pengguna. Jika [Sudah Terdaftar], sistem menyajikan notifikasi peringatan agar pengguna menggunakan email lain.",
        "sd": "Interaksi sekuensial MVC diawali saat Pengguna mengisi form pada RegisterView. RegisterView meneruskan objek DTO registrasi ke AuthController melalui metode registerUser(). AuthController memanggil AuthService untuk memvalidasi ketersediaan email dan meng-hash kata sandi via PasswordHasher. AuthService menyimpan record pengguna baru ke UserRepository/Database, kemudian meminta JwtTokenService menerbitkan token otentikasi. Token dikembalikan ke AuthController dan RegisterView untuk inisialisasi sesi login."
    },
    2: {
        "ad": "Alur autentikasi masuk dimulai saat pengguna membuka form Login dari menu utama. Pengguna menginput alamat email dan kata sandi. Sistem mengirimkan permintaan verifikasi ke backend. Sistem memeriksa kecocokan email dan hash kata sandi pada basis data. Jika [Kredensial Valid], sistem mengembalikan token JWT terenkripsi, menyimpan sesi pada peramban, dan memuat Dasbor Utama. Jika [Kredensial Tidak Valid], sistem menampilkan pesan kesalahan login dan meminta pengguna memeriksa kembali email atau kata sandi.",
        "sd": "Pengguna memasukkan kredensial pada LoginView. LoginView memanggil metode login() pada AuthController. AuthController mendelegasikan verifikasi kredensial ke AuthService. AuthService mengambil hash kata sandi dari UserRepository/Database dan melakukan komparasi via bcrypt. Jika cocok, AuthService menghasilkan token JWT dan mengembalikannya ke AuthController, yang kemudian mengarahkan LoginView untuk membuka tampilan dashboard penyanyi."
    },
    3: {
        "ad": "Alur masuk cepat Single Sign-On (SSO) diawali saat pengguna mengklik tombol 'Masuk via Google' pada halaman autentikasi. Sistem mengarahkan peramban ke halaman Google Consent Screen. Pengguna memilih akun Google dan memberikan persetujuan. Google Authorization Server mengembalikan Authorization Code ke sistem backend. Sistem menukarkan kode tersebut dengan Google Profile Token. Jika [Akun Pengguna Baru], sistem secara otomatis mendaftarkan record user baru. Jika [Akun Sudah Ada], sistem langsung menerbitkan JWT internal dan menampilkan Dasbor.",
        "sd": "Pengguna menekan tombol SSO pada LoginView. Antarmuka mengarahkan pengguna ke Google OAuth View untuk otorisasi. Google Auth Server mengembalikan authorization code ke LoginView, yang diteruskan ke AuthController melalui authenticateGoogleOAuth(). AuthController memanggil GoogleOAuthService untuk validasi token, lalu memanggil UserService untuk mencari atau membuat entri pengguna di Database. Token sesi JWT VocalSense AI diterbitkan dan dikembalikan ke klien."
    },
    4: {
        "ad": "Alur pemulihan kata sandi diawali ketika pengguna memilih tautan 'Lupa Kata Sandi' pada form login. Pengguna menginput email terdaftar. Sistem memeriksa keberadaan email di basis data. Jika [Email Terdaftar], sistem membangkitkan token verifikasi acak berbatas waktu (expire 15 menit), menyimpannya di database, dan mengirim tautan reset ke email pengguna melalui mail server. Pengguna mengklik tautan, memasukkan kata sandi baru, sistem memvalidasi kekuatan kata sandi dan memperbarui hash kata sandi pada basis data.",
        "sd": "Pengguna mengirim permintaan reset dari ForgotPasswordView ke AuthController. AuthController memanggil AuthService untuk mengecek keberadaan akun di UserRepository. AuthService meminta TokenService membuat token reset sementara, lalu EmailService mengirim email berisi tautan reset. Pada sesi berikutnya, pengguna memasukkan password baru di ResetPasswordView, yang memanggil AuthController.resetPassword(), memverifikasi token di Database, dan meng-update hash password baru."
    },
    5: {
        "ad": "Alur pengelolaan profil vokal diawali saat pengguna membuka menu Pengaturan Profil Vokal pada dasbor. Pengguna memperbarui nama tampilan, mengunggah foto avatar, memperbarui asumsi tipe suara (Bass, Bariton, Tenor, Alto, Mezzo, Sopran), dan memilih genre musik favorit (Pop, Rock, R&B, Jazz, Klasik). Sistem memvalidasi masukan dan memperbarui data akun pada basis data, lalu menampilkan notifikasi keberhasilan.",
        "sd": "Pengguna memperbarui data isian pada ProfileSettingsView. View mengirimkan data ke UserController melalui metode updateVocalProfile(). UserController memvalidasi payload dan memanggil UserService. UserService mengeksekusi pembaruan record pada UserRepository/Database, lalu mengembalikan objek profil terkini ke UserController untuk ditampilkan kembali pada View."
    },
    6: {
        "ad": "Alur kalibrasi dan tuner diawali ketika pengguna membuka menu Digital Chromatic Tuner. Sistem meminta izin akses mikrofon peramban (Web Audio API). Setelah izin diberikan, sistem menganalisis kebisingan ambien ruangan (ambient noise floor) selama 2 detik untuk menyetel noise gate. Pengguna menyuarakan nada vokal atau memainkan instrumen musik. Engine Web Audio mendeteksi frekuensi dasar F0 dan menampilkan jarum tuner, notasi nada terdekat, serta deviasi cents secara waktu nyata.",
        "sd": "Pengguna menekan tombol kalibrasi pada TunerView. TunerView memicu AudioCaptureController untuk menginisialisasi WebAudioService. WebAudioService mengaktifkan MicrophoneStream via Web Audio API, mengukur ambang desibel ambien ruangan, dan menjalankan detektor nada F0 waktu nyata. Nilai frekuensi dan deviasi cents dikirimkan secara kontinu kembali ke TunerView untuk menggerakkan indikator jarum tuner."
    },
    7: {
        "ad": "Alur tes jangkauan vokal diawali saat pengguna memilih menu Vocal Range Finder. Sistem memandu pengguna menyuarakan nada terendah (lowest comfortable note) dengan bantuan nada panduan piano. Sistem merekam dan mengunci nada terendah yang stabil. Selanjutnya, sistem memandu pengguna menyanyikan nada tertinggi (highest note). Sistem menguji kestabilan nada dan memetakan rentang oktaf vokal (misal: E2 hingga G4). Sistem mengklasifikasikan tipe suara penyanyi secara otomatis dan menyimpan hasilnya ke profil pengguna.",
        "sd": "Pengguna mengikuti panduan tes nada pada VocalRangeView. Setiap rekaman nada dikirim ke VocalRangeController via submitRangeSample(). Controller meneruskan buffer suara ke VocalRangeService untuk dihitung nilai F0 terendah dan tertingginya. VocalRangeService memanggil VoiceClassifier untuk mencocokkan rentang nada dengan tabel register vokal baku, menyimpan hasilnya ke Database, dan mengembalikan sertifikat tipe suara ke VocalRangeView."
    },
    8: {
        "ad": "Alur perekaman vokal langsung diawali ketika pengguna membuka Halaman Studio Menyanyi dan menekan tombol 'Mulai Rekam'. Peramban menangkap audio stream via Web Audio API. Sistem merender kurva nada waktu nyata (live rolling pitch curve) di atas tuts piano roll horizontal. Sistem terus memeriksa durasi rekaman terhadap batas kuota tier (Free 60s, Pro 300s, Premium 900s). Ketika pengguna menekan tombol 'Berhenti' atau durasi habis, rekaman dikemas menjadi berkas Audio Blob dan dialihkan ke modul pemangkas/analisis.",
        "sd": "Pengguna menekan tombol rekam pada SingingStudioView. View memanggil RecordingController.startRecording(). Controller menginstruksikan WebAudioEngine untuk membuat MediaStreamAudioSourceNode dan AnalyserNode. WebAudioEngine mengekstraksi frame F0 dan mengirim koordinat nada ke SingingStudioView untuk digambar pada kanvas visualizer secara real-time. Saat rekaman selesai, RecordingController mengemas audio blob ke TempStorage dan mengembalikan URL sesi rekaman ke View."
    },
    9: {
        "ad": "Alur pengunggahan berkas vokal diawali saat pengguna memilih opsi 'Unggah Berkas Audio' pada studio menyanyi. Pengguna memilih berkas dari penyimpanan lokal (.wav, .mp3, .m4a). Sistem memeriksa format MIME berkas dan ukuran berkas (maksimal 25 MB). Jika [Format Valid & Ukuran Sesuai], berkas diunggah ke penyimpanan sementara server dan pengguna diarahkan ke tahap analisis. Jika [Format Tidak Sesuai], sistem menampilkan pesan kesalahan dan menolak unggahan.",
        "sd": "Pengguna memilih berkas audio pada UploadAudioView. View mengirim FormData ke UploadController melalui metode uploadVocalFile(). UploadController memanggil FileValidationService untuk memverifikasi ekstensi, MIME type, dan header audio. Jika valid, UploadController memanggil StorageService untuk menyimpan berkas sementara pada TemporaryStorage, lalu mengembalikan referensi fileId ke UploadAudioView."
    },
    10: {
        "ad": "Alur pemutaran ulang dan pemangkasan audio diawali saat audio vokal telah tersedia pada player pemangkas. Sistem menampilkan visualisasi bentuk gelombang (waveform) beserta dua slider penanda titik potong (Start Marker dan End Marker). Pengguna memutar ulang audio dan menggeser penanda untuk memotong jeda hening di awal dan akhir lagu. Pengguna menekan tombol 'Terapkan Pemangkasan', sistem memotong buffer audio dan memperbarui berkas untuk dianalisis.",
        "sd": "Pengguna mengatur posisi marker potong pada AudioTrimmerView. View memanggil AudioTrimmerController.applyTrim(startTime, endTime). Controller meneruskan parameter waktu ke AudioProcessingService. AudioProcessingService memotong AudioBuffer pada rentang yang ditentukan dan menyimpan audio hasil pangkasan ke TempStorage. Kontroler mengembalikan durasi baru dan status siap analisis ke AudioTrimmerView."
    },
    11: {
        "ad": "Alur analisis sinyal suara AI diawali saat pengguna mengklik 'Analisis Suara Bernyanyi'. Sistem mengirimkan berkas audio ke Voice Analytics AI Engine. Engine membagi audio menjadi frame-frame 2048 sample, mengeksekusi algoritma YIN untuk melacak frekuensi nada F0, menghitung deviasi Cents dari nada target terdekat, mendeteksi nada Flat atau Sharp, mengukur osilasi vibrato (kecepatan 5-7 Hz dan kedalaman), mengukur kestabilan sustain, serta menghitung dinamika pernapasan. Hasil diagregasi menjadi Skor Bernyanyi (0-100) dan disimpan ke tabel rapor basis data.",
        "sd": "Pengguna memicu analisis pada AnalysisView. View mengirim permintaan ke AnalysisController.triggerAnalysis(). Controller mendaftarkan pekerjaan analisis ke QueueService (Redis BullMQ). Worker AISingingEngine mengambil pekerjaan dari antrean, mengeksekusi ekstraksi F0 (YIN/CREPE), menghitung deviasi nada Cents, mengukur metrik vibrato dan sustain, lalu menyusun ringkasan metrik. Hasil disimpan ke VocalReportRepository/Database, dan notifikasi analisis selesai dikirim kembali ke AnalysisView."
    },
    12: {
        "ad": "Alur penyajian rapor bernyanyi diawali ketika sistem selesai memproses analisis vokal. Sistem mengambil data rapor dari basis data dan merender antarmuka Rapor Evaluasi Bernyanyi. Tampilan mencakup kartu Skor Keseluruhan (0-100), Radar Chart 5 dimensi vokal (Pitch, Range, Stability, Vibrato, Breath), kanvas Piano Roll interaktif berkode warna (Hijau in-tune, Biru flat, Merah sharp), statistik sesi (Median F0, Voiced Time), serta kartu saran teknik vokal dari AI.",
        "sd": "Pengguna membuka Halaman Rapor pada SingingReportView. View memanggil ReportController.getReportDetails(reportId). ReportController mengambil data metrik dan deret koordinat tuts nada dari ReportService. ReportService memuat data dari VocalReportRepository/Database, lalu mengembalikan data terstruktur ke Controller dan SingingReportView untuk dirender dalam bentuk Radar Chart dan kanvas Piano Roll."
    },
    13: {
        "ad": "Alur pemutaran audio terikat nada fals diawali ketika pengguna memeriksa kanvas Piano Roll pada halaman rapor evaluasi. Pengguna melihat balok notasi berwarna merah (sharp) atau biru (flat) yang menandakan nada tidak tepat. Pengguna mengklik balok nada tersebut. Sistem membaca data offset waktu detik nada fals tersebut, lalu secara otomatis melompatkan posisi kursor pemutaran audio player ke detik tersebut dan memutarnya, sehingga penyanyi dapat mendengar letak kesalahannya secara presisi.",
        "sd": "Pengguna mengklik balok nada pada PianoRollView. View menangkap timestamp nada dan memanggil PlaybackController.seekToNoteTimestamp(timestamp). PlaybackController memanggil AudioPlaybackService untuk menghitung offset posisi pemutar audio, lalu mengirimkan instruksi seek() ke HTML5 Audio Player. Pemutar audio melompat ke detik yang dipilih dan memulai pemutaran audio vokal secara tersinkronisasi."
    },
    14: {
        "ad": "Alur penyimpanan rapor bernyanyi diawali saat pengguna mengklik tombol 'Simpan Rapor ke Akun'. Sistem memeriksa status paket langganan pengguna pada basis data. Jika [Pengguna Pro atau Premium], sistem mengunggah berkas rekaman audio vokal ke Cloud Storage permanen (S3/MinIO), menautkan ID berkas dengan record rapor di basis data, dan menampilkan pesan sukses. Jika [Pengguna Free], sistem menampilkan modal peringatan batas fitur gratis dan menawarkan opsi upgrade langganan.",
        "sd": "Pengguna menekan tombol simpan pada ReportActionView. View memanggil ReportController.saveReportToAccount(reportId). Controller memanggil SubscriptionService untuk memvalidasi hak akses tier pengguna di Database. Jika memenuhi syarat, ReportController memanggil CloudStorageService untuk mengunggah berkas audio ke S3 Bucket, lalu memanggil ReportService untuk memperbarui status kepemilikan rapor di VocalReportRepository. Status keberhasilan dikembalikan ke View."
    },
    15: {
        "ad": "Alur ekspor rapor dan sertifikat PDF diawali saat pengguna berbayar memilih menu 'Ekspor PDF'. Sistem mengumpulkan seluruh data evaluasi vokal meliputi skor bernyanyi, grafik radar chart, daftar nada fals, dan sertifikat kelulusan uji nada. Sistem menyusun dokumen PDF berformat resmi menggunakan mesin generator dokumen, lalu mengirimkan berkas PDF sebagai respon unduhan langsung ke peramban pengguna.",
        "sd": "Pengguna mengklik tombol ekspor pada ReportExportView. View memanggil ExportController.generateReportPDF(reportId). ExportController mendelegasikan penyusunan dokumen ke PDFExportService. PDFExportService mengambil data rapor dari Database, merender grafik visual ke format vektor/raster, menyusun layout lembar sertifikat resmi, dan mengembalikan file stream PDF ke ExportController untuk diunduh langsung oleh peramban pengguna."
    },
    16: {
        "ad": "Alur perbandingan dua sesi bernyanyi diawali saat pengguna berbayar membuka menu Komparasi Sesi Bernyanyi. Pengguna memilih Sesi Rekaman A (rekaman awal/sebelum latihan) dan Sesi Rekaman B (rekaman terbaru/setelah latihan). Sistem memuat data kedua rapor vokal dan menyajikan visualisasi perbandingan berdampingan (side-by-side) berupa perbandingan persentase in-tune, pengurangan nada fals, grafik overlay kurva pitch, dan peningkatan skor keseluruhan.",
        "sd": "Pengguna memilih dua ID rapor pada ComparisonView. View memanggil ComparisonController.compareSessions(reportIdA, reportIdB). ComparisonController meminta ComparisonService mengambil kedua dataset rapor dari VocalReportRepository/Database. ComparisonService melakukan normalisasi metrik waktu, menghitung delta peningkatan skor, dan mengembalikan payload gabungan ke ComparisonView untuk dirender secara komparatif."
    },
    17: {
        "ad": "Alur pemantauan dasbor progres vokal diawali saat pengguna Premium membuka menu Dasbor Progres Vokal. Sistem mengagregasi seluruh riwayat rapor bernyanyi pengguna dari waktu ke waktu. Sistem menampilkan grafik garis tren akurasi nada mingguan/bulanan, grafik rasio nada in-tune vs fals, serta visualisasi tuts piano yang memetakan perluasan jangkauan vokal penyanyi dari nada dasar awal hingga nada tertinggi saat ini.",
        "sd": "Pengguna membuka ProgressDashboardView. View memanggil AnalyticsController.getProgressMetrics(). AnalyticsController mendelegasikan perhitungan ke AnalyticsService. AnalyticsService mengagregasi record evaluasi vokal dari ProgressRepository/Database, menghitung tren persentase kepatuhan nada per minggu, dan memetakan perluasan range vokal. Hasil analitik dikembalikan ke AnalyticsController dan ditampilkan secara interaktif pada View."
    },
    18: {
        "ad": "Alur pelacakan streak dan lencana vokal diawali saat pengguna Premium menyelesaikan sesi bernyanyi atau latihan harian. Sistem memeriksa tanggal latihan terakhir pada tabel pelacakan progres. Jika [Latihan Dilakukan di Hari Berurutan], nilai streak harian bertambah satu (+1). Sistem memeriksa apakah capaian streak atau skor memenuhi syarat pembukaan lencana baru. Jika [Lencana Terbuka], sistem menampilkan modal penghargaan gamifikasi dan menyimpan lencana ke profil pengguna.",
        "sd": "Pengguna menyelesaikan aktivitas pada SingingStudioView. View memanggil GamificationController.recordDailyActivity(). Controller meminta GamificationService memeriksa tanggal aktivitas terakhir di ProgressRepository/Database. GamificationService memperbarui nilai current_streak, memanggil BadgeEvaluationService untuk memeriksa pencapaian milestone, dan menyimpan lencana baru ke Database sebelum mengembalikan reward event ke View."
    },
    19: {
        "ad": "Alur pembangkitan kurikulum vokal AI diawali ketika pengguna Premium membuka menu AI Vocal Coach dan memilih 'Buat Rencana Latihan'. Sistem merangkum daftar nada fals yang sering terjadi dan register vokal yang lemah dari histori rapor pengguna. Sistem menyusun prompt terstruktur dan mengirimkannya ke Google Gemini LLM API. AI menghasilkan silabus latihan vokal 7-30 hari berisi latihan tangga nada solfeggio harian. Sistem memvalidasi struktur respon, menyimpannya ke basis data, dan menampilkan jadwal latihan.",
        "sd": "Pengguna mengajukan pembuatan rencana latihan pada CurriculumPlannerView. View memanggil AIPlannerController.generateCurriculum(). Controller memanggil AIRecommendationService untuk mengumpulkan data riwayat kelemahan vokal dari Database, lalu memanggil GeminiApiClient untuk memproses kurikulum adaptif. Hasil kurikulum divalidasi dan disimpan ke CurriculumRepository/Database, kemudian dikembalikan ke CurriculumPlannerView."
    },
    20: {
        "ad": "Alur sesi latihan tangga nada terpandu diawali saat pengguna Premium memilih materi latihan solfeggio pada kurikulum harian (contoh: Arpeggio Tangga Nada C Mayor). Sistem memutar nada panduan audio piano tuts demi tuts. Pengguna menyanyikan nada tiruan ke mikrofon. Sistem menganalisis kepatuhan nada vokal penyanyi secara instan terhadap nada panduan, menampilkan umpan balik visual tepat/fals per tuts nada, dan menghitung skor kelulusan latihan tangga nada.",
        "sd": "Pengguna memulai latihan pada GuidedDrillView. View memanggil DrillController.startDrillSession(drillId). Controller menginisialisasi GuidedAudioService untuk memainkan sekuens audio nada piano dan mengaktifkan WebAudioService untuk mendeteksi nada vokal penyanyi. Nilai kepatuhan nada dievaluasi secara per-beat. Setelah seluruh tangga nada selesai, skor kepatuhan solfeggio disimpan ke Database dan disajikan pada GuidedDrillView."
    },
    21: {
        "ad": "Alur transaksi pembayaran langganan diawali saat pengguna membuka menu Katalog Langganan dan memilih paket Pro atau Premium bulanan. Pengguna mengklik tombol 'Lanjutkan Pembayaran'. Sistem mengirim permintaan pembuatan transaksi ke Payment Gateway (Midtrans Snap API). Sistem menerima Snap Payment Token dan menampilkan popup formulir pembayaran resmi. Pengguna memilih metode bayar (GoPay, QRIS, Virtual Account BCA/Mandiri) dan menyelesaikan transaksi. Midtrans mengirimkan notifikasi webhook ke server, sistem memverifikasi signature key, dan secara otomatis mengaktifkan status langganan pengguna.",
        "sd": "Pengguna memilih paket pada BillingView. View memanggil SubscriptionController.checkoutPlan(planId). Controller memanggil BillingService untuk membuat record tagihan di PaymentRepository/Database, lalu memanggil MidtransGatewayService untuk memperoleh snap_token. Token dikembalikan ke BillingView untuk merender Snap Modal. Setelah pembayaran tuntas, Midtrans Server mengirim POST webhook ke PaymentWebhookController. Controller memverifikasi signature transaksi via BillingService, memperbarui status di Database, dan mengaktifkan tier Pro/Premium pada UserRepository."
    },
    22: {
        "ad": "Alur melihat riwayat tagihan diawali ketika pengguna membuka menu Riwayat Pembayaran & Invoice pada pengaturan akun. Sistem mengambil seluruh data transaksi pembayaran milik pengguna dari tabel payments di basis data. Sistem menyajikan daftar nomor pesanan invoice, tanggal transaksi, metode pembayaran, nominal harga, status transaksi (Settled, Pending, Expired), serta tautan unduh tanda bukti pembayaran resmi.",
        "sd": "Pengguna mengakses InvoicesView. View memanggil BillingController.getInvoiceHistory(). BillingController memanggil BillingService untuk mengambil daftar riwayat transaksi dari PaymentRepository/Database. BillingService mengembalikan daftar transaksi terurut berdasarkan tanggal terbaru. Controller memformat data ke format DTO invoice dan menyajikannya pada InvoicesView."
    },
    23: {
        "ad": "Alur manajemen pengguna dan tier diawali ketika Administrator melakukan login dan membuka menu Manajemen Akun Pengguna pada Panel Kontrol Admin. Sistem menyajikan daftar seluruh akun penyanyi terdaftar dengan kolom status dan tier aktif. Administrator dapat mencari pengguna berdasarkan email, melihat riwayat sesi vokal, menonaktifkan akun yang melanggar ketentuan (Suspend), atau mengubah tier pengguna secara manual (misal: pemberian kompensasi akun Pro). Sistem memvalidasi hak akses admin dan menyimpan perubahan ke basis data.",
        "sd": "Administrator membuka AdminUserManagementView. View memanggil AdminUserController.getUsersList(filterParams). Controller memvalidasi peran Admin via AuthService, lalu mengambil data dari UserRepository/Database. Ketika Admin mengubah status atau tier akun via updateUserTier(userId, newTier), AdminUserController memanggil AdminService untuk memperbarui data pada Database dan mencatat log audit ke AdminAuditRepository."
    },
    24: {
        "ad": "Alur pemantauan analitik finansial dan sistem diawali ketika Administrator membuka menu Dasbor Analitik & Konfigurasi Sistem. Sistem mengagregasi omset pendapatan kotor dari transaksi langganan, jumlah pengguna aktif per tier vokal, beban utilisasi CPU komputasi AI Audio Engine, serta antrian pekerjaan pemrosesan audio. Administrator juga dapat menyetel batas toleransi deviasi nada fals global (cents threshold, default +/- 20 cents). Sistem menyimpan parameter konfigurasi baru ke basis data dan menerapkannya ke seluruh engine analisis audio.",
        "sd": "Administrator mengakses AdminAnalyticsView. View memanggil AdminAnalyticsController.getSystemDashboardMetrics(). Controller meminta AnalyticsService mengambil data ringkasan omset dari PaymentRepository, statistik pengguna dari UserRepository, dan beban worker dari Redis Queue. Untuk pembaruan toleransi nada fals, Admin memanggil updateTuningParameters(centsTolerance). Controller memanggil SystemConfigService untuk memperbarui konfigurasi di Database dan merelod parameter pada AISingingEngine."
    }
}

def generate_sdd():
    original_path = 'D:/Kuliah/APPL/SDD/11241049_SDD.docx'
    target_path = 'D:/Kuliah/IPPL/docs/SDD_VocalSense_AI.docx'
    
    shutil.copy(original_path, target_path)
    doc = docx.Document(target_path)

    # Sanitize float margins in section properties
    for section in doc.sections:
        sectPr = section._sectPr
        pgMar = sectPr.find(qn('w:pgMar'))
        if pgMar is not None:
            for attr in ['w:left', 'w:right', 'w:top', 'w:bottom', 'w:header', 'w:footer', 'w:gutter']:
                val = pgMar.get(qn(attr))
                if val and '.' in val:
                    pgMar.set(qn(attr), str(int(float(val))))
    
    # 1. Cover replacements
    for p in doc.paragraphs:
        if "11241049 - Muhamad Rizal" in p.text:
            p.text = p.text.replace("11241049 - Muhamad Rizal", "[Nama Mahasiswa / Kelompok]")
        if "SIFIRA (Sistem Finansial Integrasi Rumah Sakit)" in p.text:
            p.text = p.text.replace("SIFIRA (Sistem Finansial Integrasi Rumah Sakit)", "VocalSense AI (AI-Powered Singing & Vocal Trainer Platform)")
        if "SIFIRA" in p.text:
            p.text = p.text.replace("SIFIRA", "VocalSense AI")
        if "2025" in p.text:
            p.text = p.text.replace("2025", "2026")

    # 2. Find Abstrak heading to delete old body content
    delete_start = -1
    for i, p in enumerate(doc.paragraphs):
        if "Abstrak" in p.text and p.style.name.startswith('Heading'):
            delete_start = i
            break
            
    if delete_start != -1:
        for p in list(doc.paragraphs)[delete_start:]:
            p._element.getparent().remove(p._element)
            
    for table in doc.tables:
        table._element.getparent().remove(table._element)

    use_cases = parse_markdown_usecases()
    print(f"Parsed {len(use_cases)} use cases for SDD generation.")

    # 3. Add Abstrak
    doc.add_heading('Abstrak', level=1)
    doc.add_paragraph(
        "Dokumen Software Design Document (SDD) ini mendeskripsikan secara rinci rancangan arsitektur teknis, "
        "desain komponen sistem, model data relasional, spesifikasi antarmuka layanan (RESTful API), serta perancangan "
        "diagram berorientasi objek (UML) dari platform VocalSense AI (Platform Analisis Suara Bernyanyi dan Bimbingan "
        "Latihan Vokal Cerdas). Dirancang untuk mendemokratisasi bimbingan vokal mandiri tanpa ketergantungan pada instruktur "
        "privat berbiaya tinggi, sistem ini memadukan teknologi Web Audio API, pipa pemrosesan sinyal suara digital "
        "(Audio Digital Signal Processing) berbasis algoritma pelacak nada dasar YIN dan YIN CMNDF, kalkulasi deviasi nada "
        "dalam satuan logaritmik Cents, deteksi nada fals (Flat dan Sharp), evaluasi modulasi vibrato sehat (5–7 Hz), "
        "kestabilan penahanan nada (sustain), serta asisten kurikulum latihan tangga nada adaptif bertenaga Large Language Model (LLM).\n\n"
        "Dokumen ini mematuhi standar akademik rekayasa perangkat lunak serta catatan revisi asistensi pembimbing (Kak Rahmi), "
        "yang mencakup pembatasan aktor use case hanya pada entitas manusia (Pengguna dan Administrator), penempatan layanan pihak "
        "ketiga (Google OAuth, Payment Gateway Midtrans, dan AI LLM Provider) di lapisan infrastruktur/backend, kepatuhan label "
        "percabangan berpenanda kurung siku [ ] pada Activity Diagram, penghapusan merge diamond ganda, serta penerapan konsep MVC "
        "(Model-View-Controller) secara konsisten pada seluruh 24 Sequence Diagram. Seluruh diagram disajikan dalam format visual "
        "vektor hitam-putih (monochrome) beresolusi tinggi guna menjamin kejelasan dan integritas cetak biru rekayasa sistem."
    )

    # 4. Bab I Pendahuluan
    doc.add_heading('Bab I Pendahuluan', level=1)
    doc.add_heading('1.1 Tujuan Software Design Document', level=2)
    doc.add_paragraph(
        "Tujuan penyusunan dokumen Software Design Document (SDD) ini adalah untuk mentransformasikan seluruh spesifikasi "
        "kebutuhan fungsional dan non-fungsional yang telah didefinisikan pada dokumen Software Requirements Specification (SRS) "
        "ke dalam rancangan arsitektur teknis konkret dan terstruktur. Dokumen ini menjadi pedoman baku bagi rekayasawan perangkat "
        "lunak (Software Engineers, Frontend Developers, Backend Engineers, Audio DSP Engineers, QA Engineers, dan System Administrators) "
        "dalam mengimplementasikan modul program, merancang basis data relasional, mengonfigurasi gerbang API, serta menjamin "
        "skalabilitas, keandalan, dan keamanan sistem VocalSense AI."
    )
    
    doc.add_heading('1.2 Ruang Lingkup Sistem', level=2)
    doc.add_paragraph(
        "Ruang lingkup arsitektur dan perancangan teknis VocalSense AI mencakup 8 area fungsional utama:\n"
        "1. Klien Web Interaktif berbasis Web Audio API untuk penangkapan audio mikrofon lokal dan rendering kurva tinggi nada waktu nyata (live rolling pitch curve).\n"
        "2. Voice Analytics AI Engine untuk ekstraksi frekuensi nada dasar F0, konversi ke notasi musik MIDI, kalkulasi deviasi Cents, klasifikasi nada fals (Flat/Sharp), pengukuran osilasi vibrato (5–7 Hz), kestabilan sustain, dan kontrol napas.\n"
        "3. Modul Tes Jangkauan Vokal (Vocal Range Finder) untuk mengukur nada stabil terendah hingga tertinggi serta klasifikasi otomatis register suara penyanyi (Bass, Bariton, Tenor, Alto, Mezzo, Sopran).\n"
        "4. Modul Rapor Bernyanyi Interaktif dengan visualisasi tuts Piano Roll, pemutaran audio tersinkronisasi nada fals (Note-Sync Playback), dan generator sertifikat resmi format PDF.\n"
        "5. Dasbor Analitik Progres Vokal (Progress Tracking) untuk pemantauan peningkatan akurasi nada dan perluasan jangkauan vokal dari waktu ke waktu.\n"
        "6. Asisten Cerdas AI Vocal Coach & Practice Planner berbasis Large Language Model (Google Gemini API) untuk penyusunan silabus harian latihan tangga nada solfeggio terarah.\n"
        "7. Manajemen Transaksi dan Langganan Berjenjang (Free, Pro, Premium) terintegrasi dengan Payment Gateway (Midtrans Snap API).\n"
        "8. Panel Kontrol Administrator untuk manajemen pengguna, pemantauan utilisasi komputasi AI Engine, dan penyesuaian batas toleransi nada fals global."
    )

    doc.add_heading('1.3 Definisi, Istilah, dan Singkatan', level=2)
    doc.add_paragraph(
        "- F0 (Fundamental Frequency): Frekuensi getaran terendah dari gelombang suara periodik pita suara manusia yang menentukan tinggi-rendahnya nada (pitch), diukur dalam satuan Hertz (Hz).\n"
        "- Cent: Satuan logaritmik interval musik, di mana 1 semiton (jarak 2 tuts piano bersebelahan) setara dengan 100 cents (1200 cents per oktaf).\n"
        "- Flat: Kondisi nada bernyanyi yang berada di bawah target frekuensi acuan (deviasi negatif lebih dari 20 cents).\n"
        "- Sharp: Kondisi nada bernyanyi yang berada di atas target frekuensi acuan (deviasi positif lebih dari 20 cents).\n"
        "- In-Tune: Kondisi nada bernyanyi tepat sasaran yang berada dalam batas toleransi target (antara -20 hingga +20 cents).\n"
        "- Vibrato: Modulasi frekuensi dan amplitudo nada yang berosilasi secara teratur (kecepatan ideal 5.0–7.0 Hz dengan kedalaman modulasi 50–100 cents) pada nada yang ditahan panjang.\n"
        "- Piano Roll Visualizer: Komponen antarmuka grafis yang memetakan balok notasi melodi target terhadap kurva garis nada aktual penyanyi sepanjang garis waktu horizontal.\n"
        "- Web Audio API: Standar antarmuka pemrograman peramban tingkat tinggi dari W3C untuk pemrosesan dan sintesis sinyal audio secara langsung di sisi klien.\n"
        "- MVC: Model-View-Controller, pola arsitektur perangkat lunak yang memisahkan antarmuka pengguna (View), pengendali aliran logika (Controller), dan model data (Model/Service/Database)."
    )

    # 5. Bab II Rancangan Lingkungan Aplikasi, Arsitektur, dan Formula Matematis Vokal
    doc.add_heading('Bab II Rancangan Lingkungan Aplikasi, Arsitektur, dan Formula Matematis Vokal', level=1)
    
    doc.add_heading('2.1 Lingkungan Operasi & Persyaratan Sistem', level=2)
    doc.add_paragraph(
        "Lingkungan operasional sistem VocalSense AI dirancang untuk meminimalkan beban instalasi sisi klien sekaligus "
        "menyediakan keandalan komputasi tinggi pada sisi backend:\n"
        "- Klien Web Browser: Kompatibel dengan peramban modern yang mendukung Web Audio API dan MediaStream API, meliputi Google Chrome (v90+), Microsoft Edge (v90+), Mozilla Firefox (v88+), dan Apple Safari (v14+).\n"
        "- Server Backend & API: Sistem Operasi Linux Ubuntu 22.04 LTS / Windows Server yang menjalankan runtime Node.js LTS atau Python 3.10+ (FastAPI).\n"
        "- Mesin Pemrosesan Sinyal Audio (AI Audio Engine): Python 3.10+ dengan pustaka ilmiah librosa, scipy, numpy, soundfile, serta algoritma pelacak pitch YIN/CREPE.\n"
        "- Penyimpanan Basis Data: Relational Database Management System (RDBMS) PostgreSQL 15+ untuk integritas transaksional dan penyimpanan metadata akustik, didukung Redis 7+ untuk broker antrean kerja asinkron (job queue).\n"
        "- Media Penyimpanan Awan (Cloud Object Storage): Amazon S3 / MinIO / Supabase Storage yang dilindungi URL bertanda tangan (Pre-signed URL) berbatas waktu untuk berkas audio rekaman pengguna berbayar."
    )

    doc.add_heading('2.2 Batasan Desain dan Implementasi', level=2)
    doc.add_paragraph(
        "Batasan rekayasa sistem yang diterapkan meliputi:\n"
        "1. Izin Akses Mikrofon Peramban: Perekaman vokal langsung memerlukan persetujuan eksplisit dari pengguna. Jika izin ditolak, sistem menyediakan jalur alternatif berupa formulir pengunggahan berkas rekaman (.wav, .mp3, .m4a).\n"
        "2. Komputasi Asinkron Mesin AI: Proses analisis sinyal audio digital membutuhkan komputasi Fast Fourier Transform (FFT) dan kalkulasi matriks yang intensif CPU. Arsitektur menerapkan pola asynchronous worker queue (Redis BullMQ/Celery) agar thread utama web server tidak terblokir.\n"
        "3. Isolasi Privasi & Efisiensi Penyimpanan: Berkas rekaman vokal pengguna gratis (Free Tier) hanya diolah secara sementara di dalam memori buffer server dan langsung dimusnahkan setelah analisis selesai, guna menjamin privasi dan menghemat biaya penyimpanan awan."
    )

    doc.add_heading('2.3 Arsitektur Sistem Tingkat Tinggi', level=2)
    doc.add_paragraph(
        "Sistem menerapkan arsitektur Multi-Tier Service Architecture yang modular:\n"
        "- Presentation Tier (Frontend UI): Antarmuka web reaktif berbasis Web Audio API yang menangani penangkapan audio lokal, rendering bentuk gelombang (waveform), visualisasi kurva pitch, serta dasbor evaluasi vokal.\n"
        "- API Gateway & Middleware Tier: Mengatur autentikasi JWT, validasi skema masukan request, pembatasan laju kuota gratis (rate limiting), dan perutean permintaan ke layanan mikro terkait.\n"
        "- Business Logic Service Tier: Terdiri dari AuthService (JWT & Google OAuth), AudioRecordingService, VocalReportService, ProgressAnalyticsService, AIPlannerService, serta BillingService.\n"
        "- Asynchronous Worker & AI Engine Tier: Pekerja latar belakang berbasis Redis queue yang mengeksekusi komputasi pemrosesan sinyal suara digital dan perumusan kurikulum latihan adaptif LLM.\n"
        "- Data Persistence Tier: Kluster basis data PostgreSQL untuk penyimpanan transaksional dan S3 Object Storage untuk arsip berkas audio berbayar."
    )

    doc.add_heading('2.4 Landasan Teori Pemrosesan Sinyal Audio & Formula Matematis Analisis Bernyanyi', level=2)
    doc.add_paragraph(
        "Sistem VocalSense AI mengimplementasikan formulasi matematis akustik digital baku untuk menjamin objektivitas "
        "dan presisi evaluasi vokal bernyanyi pengguna:"
    )

    doc.add_heading('2.4.1 Algoritma Pelacakan Nada Dasar YIN & CMNDF', level=3)
    doc.add_paragraph(
        "Ekstraksi frekuensi dasar F0 suara vokal manusia menggunakan algoritma YIN (De Cheveigné & Kawahara). "
        "Algoritma ini mengatasi kelemahan autokorelasi standar dengan meminimalkan selisih kuadrat selang waktu (lag tau):\n\n"
        "1. Fungsi Selisih Kuadrat (Difference Function):\n"
        "   d_t(tau) = sum_{j=1}^{W} (x_j - x_{j+tau})^2\n\n"
        "2. Fungsi Normalisasi Rata-Rata Kumulatif (Cumulative Mean Normalized Difference Function - CMNDF):\n"
        "   d'_t(tau) = 1  (untuk tau = 0)\n"
        "   d'_t(tau) = d_t(tau) / [ (1 / tau) * sum_{j=1}^{tau} d_t(j) ]  (untuk tau > 0)\n\n"
        "3. Penentuan Ambang Batas Absolut (Absolute Threshold):\n"
        "   Dipilih lag terkecil tau_min di mana d'_t(tau_min) < 0.10 - 0.15 guna menghindari kesalahan pelipatgandaan oktaf (octave errors).\n\n"
        "4. Interpolasi Parabolik Sub-sample:\n"
        "   tau_peak = tau_min + 0.5 * (d'_{tau-1} - d'_{tau+1}) / (d'_{tau-1} - 2*d'_{tau} + d'_{tau+1})\n"
        "   F0 = SamplingRate / tau_peak (Hz)"
    )

    doc.add_heading('2.4.2 Formula Konversi Frekuensi F0 ke Notasi Musik MIDI', level=3)
    doc.add_paragraph(
        "Frekuensi F0 dalam satuan Hertz dikonversikan ke nomor notasi standar MIDI (Musical Instrument Digital Interface) "
        "berdasarkan acuan standar konser A4 = 440 Hz (MIDI 69):\n\n"
        "   m = 69 + 12 * log2(F0 / 440)\n\n"
        "Nomor notasi integer terdekat dihitung dengan pembulatan: m_target = round(m). "
        "Setiap bilangan integer m_target dipetakan ke 12 kromatik tangga nada Barat: "
        "C (0), C# (1), D (2), D# (3), E (4), F (5), F# (6), G (7), G# (8), A (9), A# (10), B (11), "
        "disertai nomor oktaf: oktaf = floor(m_target / 12) - 1."
    )

    doc.add_heading('2.4.3 Formula Deviasi Nada dalam Satuan Cents & Klasifikasi Nada Fals', level=3)
    doc.add_paragraph(
        "Penyimpangan nada bernyanyi aktual terhadap frekuensi nada target acuan dihitung dalam satuan logaritmik Cents:\n\n"
        "   Delta_Cents = 1200 * log2(F0 / F_target)\n\n"
        "Berdasarkan nilai Delta_Cents, sistem mengklasifikasikan kepatuhan nada vokal penyanyi ke dalam 3 status:\n"
        "1. In-Tune (Tepat Nada): -20 cents <= Delta_Cents <= +20 cents (ditandai warna hijau pada Piano Roll).\n"
        "2. Flat (Nada Terlalu Rendah / Fals Bawah): Delta_Cents < -20 cents (ditandai warna biru).\n"
        "3. Sharp (Nada Terlalu Tinggi / Fals Atas): Delta_Cents > +20 cents (ditandai warna merah)."
    )

    doc.add_heading('2.4.4 Formula Osilasi & Modulasi Vibrato', level=3)
    doc.add_paragraph(
        "Kualitas vibrato vokal dianalisis pada segmen nada vokal stabil (voiced sustain > 0.8 detik) "
        "melalui deteksi puncak-lembah osilasi frekuensi F0:\n\n"
        "1. Laju Frekuensi Vibrato (Vibrato Rate):\n"
        "   f_vib = N_cycles / Delta_t (Hz)\n"
        "   Kriteria Vibrato Sehat: 5.0 Hz <= f_vib <= 7.0 Hz (osilasi di bawah 5 Hz dikategorikan 'vocal wobble', di atas 7 Hz dikategorikan 'tremolo/bleat').\n\n"
        "2. Kedalaman Modulasi Vibrato (Vibrato Extent):\n"
        "   E_vib = 1200 * log2(F0_peak / F0_trough) (Cents)\n"
        "   Kedalaman modulasi vibrato yang ideal berada pada rentang 50 hingga 100 Cents (setengah semiton)."
    )

    doc.add_heading('2.4.5 Keseimbangan Resonansi Vokal (Resonance Balance)', level=3)
    doc.add_paragraph(
        "Keseimbangan timbre suara dievaluasi dengan menghitung rasio integrasi energi spektral frekuensi (FFT) "
        "pada tiga register utama vokal manusia:\n"
        "- Chest Voice Resonance: Rentang frekuensi 100 Hz hingga 400 Hz (bobot kehangatan dan ketebalan vokal).\n"
        "- Mask / Mixed Voice Resonance: Rentang frekuensi 400 Hz hingga 2000 Hz (kejelasan artikulasi vokal dan formants vokal F1-F2).\n"
        "- Head Voice Resonance: Rentang frekuensi 2000 Hz hingga 5000 Hz (kecemerlangan vokal dan Singer's Formant)."
    )

    doc.add_heading('2.4.6 Penilaian Kestabilan Penahanan Nada (Sustain Stability & Breath Support)', level=3)
    doc.add_paragraph(
        "Kestabilan penahanan nada panjang diukur berdasarkan standar deviasi frekuensi nada (sigma_F0) "
        "dan kelenturan volume desibel RMS (Root Mean Square) dari awal hingga akhir nada yang ditahan:\n"
        "- Sustain Score = max(0, 100 - (sigma_cents * 2.5))\n"
        "- Breath Support Score = max(0, 100 - (delta_RMS_dB * 3.0))\n"
        "Skor di atas 80 mengindikasikan penyanyi memiliki kontrol otot diafragma yang stabil dan penempatan pita suara yang sehat."
    )

    # 6. Bab III Perancangan Data
    doc.add_heading('Bab III Perancangan Data', level=1)
    doc.add_heading('3.1 Data Flow Diagram (DFD)', level=2)
    
    # 3.1.1 DFD Level 0
    doc.add_heading('3.1.1 DFD Level 0 (Diagram Konteks Sistem)', level=3)
    doc.add_paragraph(
        "Diagram konteks memetakan batasan sistem terpusat VocalSense AI dengan entitas-entitas eksternal di sekitarnya. "
        "Terdapat empat entitas luar yang berinteraksi dengan sistem:\n"
        "1. Pengguna / Penyanyi (Tamu, Free, Pro, Premium): Mengirimkan masukan berupa sinyal audio rekaman bernyanyi, data uji jangkauan vokal, kalibrasi mikrofon, preferensi akun, dan instruksi pemilihan paket langganan. Sebagai timbal balik, pengguna menerima keluaran berupa Rapor Bernyanyi (Skor, Piano Roll Visualizer, Radar Chart), visualisasi kurva pitch waktu nyata, grafik perkembangan vokal mingguan, serta kurikulum jadwal latihan tangga nada harian.\n"
        "2. Payment Gateway (Midtrans): Menerima permintaan pembuatan token pembayaran dari sistem dan mengirimkan notifikasi status pelunasan transaksi (settlement webhook) secara asinkron.\n"
        "3. AI LLM Coach (Google Gemini API): Menerima ringkasan diagnosis kelemahan nada fals pengguna dan mengembalikan dokumen silabus kurikulum latihan tangga nada adaptif.\n"
        "4. Administrator: Memantau laporan omset keuangan platform, mengawasi status keaktifan akun pengguna, memantau utilisasi beban komputasi server AI Audio Engine, serta mengonfigurasi batas toleransi nada fals global platform."
    )
    dfd0_path = 'D:/Kuliah/IPPL/docs/diagrams/export_images/dfd_level_0.png'
    if os.path.exists(dfd0_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_img.add_run()
        run.add_picture(dfd0_path, width=Inches(5.5))
        p_cap = doc.add_paragraph('Gambar 1. Data Flow Diagram (DFD) Level 0 - Konteks Sistem VocalSense AI')
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    # 3.1.2 DFD Level 1
    doc.add_heading('3.1.2 DFD Level 1 (Dekomposisi Proses Utama)', level=3)
    doc.add_paragraph(
        "Sistem didekomposisi menjadi 7 proses fungsional utama:\n"
        "- Proses 1.0 (Manajemen Akun & Autentikasi): Menangani registrasi, login, Google OAuth SSO, dan pembaruan profil vokal pengguna.\n"
        "- Proses 2.0 (Kalibrasi & Perekaman Vokal): Mengatur chromatic tuner mikrofon, penangkapan audio Web Audio API, serta pemangkasan jeda hening rekaman.\n"
        "- Proses 3.0 (Analisis Suara Bernyanyi AI): Menjalankan ekstraksi nada dasar YIN F0, kalkulasi Cents, deteksi Flat/Sharp, pengukuran vibrato 5-7 Hz, dan penghitungan skor bernyanyi.\n"
        "- Proses 4.0 (Penyimpanan Rapor Bernyanyi & Ekspor Dokumen): Mengunggah berkas audio ke Cloud Storage, menyimpan rapor ke basis data, dan menerbitkan berkas rapor PDF / sertifikat vokal.\n"
        "- Proses 5.0 (Pelacakan Kemajuan & Gamifikasi): Mengagregasi data historis nada tepat (in-tune rate), memetakan perluasan range vokal pada tuts piano, dan mengelola streak latihan harian.\n"
        "- Proses 6.0 (Perencanaan Latihan Vokal AI): Mendiagnosis kelemahan register vokal dan menyusun silabus latihan tangga nada solfeggio harian via AI LLM.\n"
        "- Proses 7.0 (Manajemen Pembayaran & Langganan): Mengatur katalog paket, memproses transaksi melalui Midtrans Snap API, dan mengaktifkan tier keanggotaan pengguna."
    )
    dfd1_path = 'D:/Kuliah/IPPL/docs/diagrams/export_images/dfd_level_1.png'
    if os.path.exists(dfd1_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_img.add_run()
        run.add_picture(dfd1_path, width=Inches(5.5))
        p_cap = doc.add_paragraph('Gambar 2. Data Flow Diagram (DFD) Level 1 - 7 Proses Utama Sistem VocalSense AI')
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    # 3.1.3 DFD Level 2
    doc.add_heading('3.1.3 DFD Level 2 (Rincian Proses Engine Analisis Audio & Transaksi)', level=3)
    doc.add_paragraph(
        "DFD Level 2 memberikan rincian dekomposisi mendalam terhadap sub-proses yang berjalan di dalam Proses 3.0 (Analisis Suara Bernyanyi AI) "
        "dan Proses 7.0 (Manajemen Pembayaran & Langganan):\n"
        "- Sub-proses 3.1 mengekstraksi frame audio menjadi matriks frekuensi F0 menggunakan algoritma YIN.\n"
        "- Sub-proses 3.2 mengonversi frekuensi ke notasi MIDI terdekat dan menghitung deviasi Cents untuk menandai nada Flat, Sharp, atau In-Tune.\n"
        "- Sub-proses 3.3 menganalisis modulasi gelombang F0 untuk mengekstraksi laju osilasi vibrato (5–7 Hz) dan kedalamannya.\n"
        "- Sub-proses 3.4 menilai kestabilan penahanan nada (sustain) dan kontrol volume desibel RMS.\n"
        "- Sub-proses 3.5 mengompilasi seluruh parameter ke dalam format JSONB Piano Roll dan menghitung Skor Bernyanyi keseluruhan (0-100).\n"
        "- Sub-proses 7.1 hingga 7.3 menangani inisiasi pesanan, penerbitan snap token, verifikasi webhook pelunasan dari server Midtrans, serta pembaruan tanggal berlaku langganan."
    )
    dfd2_path = 'D:/Kuliah/IPPL/docs/diagrams/export_images/dfd_level_2.png'
    if os.path.exists(dfd2_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_img.add_run()
        run.add_picture(dfd2_path, width=Inches(5.5))
        p_cap = doc.add_paragraph('Gambar 3. Data Flow Diagram (DFD) Level 2 - Rincian Proses Engine Audio dan Transaksi')
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    # 3.2 Perancangan Basis Data
    doc.add_heading('3.2 Perancangan Basis Data (Skema Tabel Relasional)', level=2)
    doc.add_paragraph(
        "Sistem menerapkan skema basis data relasional PostgreSQL dengan dukungan tipe data JSONB "
        "untuk menampung deret notasi nada piano roll berkinerja tinggi. Berikut adalah kamus data lengkap seluruh tabel utama:"
    )

    tables_data = [
        ("Tabel users", [
            ("id", "UUID (Primary Key)", "Pengenal unik setiap akun pengguna / penyanyi"),
            ("name", "VARCHAR(100), Not Null", "Nama lengkap pengguna"),
            ("email", "VARCHAR(150), Unique, Not Null", "Alamat email unik pengguna untuk login"),
            ("password_hash", "VARCHAR(255), Nullable", "Hash kata sandi terenkripsi menggunakan bcrypt (salt rounds 10)"),
            ("google_id", "VARCHAR(100), Unique, Nullable", "ID identitas penaut Google OAuth 2.0"),
            ("avatar_url", "VARCHAR(255), Nullable", "Tautan URL foto profil pengguna pada Cloud Storage"),
            ("voice_type_assumed", "VARCHAR(30), Nullable", "Asumsi tipe suara awal pengguna (Bass, Bariton, Tenor, Alto, Mezzo, Sopran)"),
            ("favorite_genre", "VARCHAR(50), Nullable", "Genre bernyanyi favorit (Pop, Rock, R&B, Jazz, Klasik, Teater)"),
            ("role", "ENUM('user', 'admin')", "Peran hak akses sistem (default: 'user')"),
            ("status", "ENUM('active', 'suspended')", "Status keaktifan akun pengguna (default: 'active')"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu pendaftaran akun")
        ]),
        ("Tabel plans & subscriptions", [
            ("id", "UUID (Primary Key)", "ID unik data langganan"),
            ("user_id", "UUID (Foreign Key -> users.id)", "Tautan ke identitas pengguna penyanyi"),
            ("plan_id", "VARCHAR(30), Not Null", "Kode paket langganan: 'free', 'pro_monthly', 'premium_monthly'"),
            ("status", "ENUM('active', 'expired', 'cancelled')", "Status masa aktif langganan saat ini"),
            ("start_date", "TIMESTAMP WITH TIME ZONE, Not Null", "Waktu mulai aktifnya periode paket langganan"),
            ("end_date", "TIMESTAMP WITH TIME ZONE, Not Null", "Waktu berakhirnya masa berlaku paket langganan"),
            ("auto_renew", "BOOLEAN, Default TRUE", "Penanda status perpanjangan otomatis paket"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu pencatatan langganan")
        ]),
        ("Tabel payments", [
            ("id", "UUID (Primary Key)", "ID transaksi internal sistem"),
            ("order_id", "VARCHAR(50), Unique, Not Null", "Nomor pesanan unik resmi (misal: INV-SING-2026-XXXX)"),
            ("user_id", "UUID (Foreign Key -> users.id)", "Tautan ke pengguna pembayar"),
            ("plan_id", "VARCHAR(30), Not Null", "Kode paket yang ditransaksikan"),
            ("amount", "DECIMAL(12,2), Not Null", "Jumlah nominal tagihan dalam mata uang Rupiah"),
            ("payment_method", "VARCHAR(50), Nullable", "Kanal pembayaran (BCA VA, GoPay, QRIS, Kartu Kredit)"),
            ("status", "ENUM('pending', 'settled', 'expired', 'failed')", "Status verifikasi pembayaran dari Midtrans"),
            ("payment_gateway_response", "JSONB, Nullable", "Payload lengkap respon webhook dari Midtrans"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu penerbitan tagihan"),
            ("settled_at", "TIMESTAMP WITH TIME ZONE, Nullable", "Waktu pelunasan pembayaran diverifikasi")
        ]),
        ("Tabel voice_recordings", [
            ("id", "UUID (Primary Key)", "ID unik berkas audio rekaman"),
            ("user_id", "UUID (Foreign Key -> users.id), Nullable", "Tautan akun pemilik (null untuk Guest User)"),
            ("file_url", "VARCHAR(255), Nullable", "Tautan berkas audio bernyanyi di Cloud Storage (null untuk Free User)"),
            ("duration_seconds", "DECIMAL(6,2), Not Null", "Panjang durasi rekaman vokal dalam satuan detik"),
            ("file_format", "VARCHAR(10), Not Null", "Format berkas audio ('wav', 'mp3', 'm4a')"),
            ("file_size_kb", "INT, Not Null", "Ukuran berkas audio dalam Kilobyte"),
            ("recording_type", "ENUM('free_singing', 'range_test', 'scale_drill')", "Jenis sesi perekaman yang dilakukan"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu perekaman dibuat")
        ]),
        ("Tabel vocal_reports", [
            ("id", "UUID (Primary Key)", "ID unik lembar rapor evaluasi bernyanyi"),
            ("recording_id", "UUID (Foreign Key -> voice_recordings.id)", "Tautan ke berkas rekaman suara vokal"),
            ("user_id", "UUID (Foreign Key -> users.id), Nullable", "Tautan akun penyanyi bersangkutan"),
            ("overall_score", "INT, Not Null", "Skor gabungan kualitas bernyanyi (0 - 100)"),
            ("pitch_accuracy_cents", "DECIMAL(5,2), Not Null", "Rata-rata deviasi nada dalam satuan logaritmik Cents"),
            ("in_tune_percentage", "DECIMAL(5,2), Not Null", "Persentase nada tepat sasaran dalam toleransi +-20 cents"),
            ("median_f0_hz", "DECIMAL(6,2), Not Null", "Median frekuensi dasar F0 suara penyanyi dalam Hertz"),
            ("voiced_seconds", "DECIMAL(6,2), Not Null", "Durasi waktu suara vokal bernyanyi aktif (voiced time)"),
            ("flat_notes_count", "INT, Not Null", "Jumlah notasi nada terdeteksi terlalu rendah (Flat)"),
            ("sharp_notes_count", "INT, Not Null", "Jumlah notasi nada terdeteksi terlalu tinggi (Sharp)"),
            ("vocal_range_min", "VARCHAR(10), Not Null", "Nada stabil terendah yang terdeteksi (contoh: C3)"),
            ("vocal_range_max", "VARCHAR(10), Not Null", "Nada stabil tertinggi yang terdeteksi (contoh: A4)"),
            ("voice_type", "VARCHAR(30), Not Null", "Klasifikasi tipe register suara (Tenor, Bariton, Sopran, dll)"),
            ("resonance_chest_pct", "DECIMAL(5,2), Not Null", "Persentase energi resonansi suara dada (100–400 Hz)"),
            ("resonance_mask_pct", "DECIMAL(5,2), Not Null", "Persentase energi resonansi mask/pharyngeal (400–2000 Hz)"),
            ("resonance_head_pct", "DECIMAL(5,2), Not Null", "Persentase energi resonansi nada tinggi / head voice (2000–5000 Hz)"),
            ("vibrato_rate_hz", "DECIMAL(4,2), Nullable", "Frekuensi osilasi vibrato (ideal 5.0 - 7.0 Hz)"),
            ("vibrato_extent_cents", "DECIMAL(5,2), Nullable", "Kedalaman modulasi getaran vibrato dalam Cents"),
            ("sustain_stability_score", "INT, Not Null", "Skor kestabilan menahan nada panjang (0 - 100)"),
            ("breath_support_score", "INT, Not Null", "Skor kontrol pernapasan diafragma & dinamika dB (0 - 100)"),
            ("timing_accuracy_score", "INT, Not Null", "Skor ketepatan ketukan melodi bernyanyi (0 - 100)"),
            ("piano_roll_data", "JSONB, Not Null", "Deret data balok nada target vs suara aktual untuk visualisasi Piano Roll"),
            ("recommendations", "JSONB, Not Null", "Daftar rekomendasi teknik vokal perbaikan dari AI"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu pembuatan rapor bernyanyi")
        ]),
        ("Tabel progress_trackings", [
            ("id", "UUID (Primary Key)", "ID unik pencatatan kemajuan vokal"),
            ("user_id", "UUID (Foreign Key -> users.id)", "Tautan ke akun penyanyi bersangkutan"),
            ("current_streak", "INT, Default 0", "Jumlah hari berturut-turut melakukan latihan vokal"),
            ("total_sessions", "INT, Default 0", "Total akumulasi sesi latihan bernyanyi yang telah diselesaikan"),
            ("avg_singing_score", "DECIMAL(5,2), Default 0.0", "Rata-rata skor bernyanyi keseluruhan"),
            ("in_tune_rate_trend", "JSONB, Nullable", "Histori persentase nada tepat mingguan/bulanan"),
            ("vocal_range_current_min", "VARCHAR(10), Nullable", "Nada terendah saat ini yang dicapai penyanyi"),
            ("vocal_range_current_max", "VARCHAR(10), Nullable", "Nada tertinggi saat ini yang dicapai penyanyi"),
            ("unlocked_badges", "JSONB, Default '[]'", "Daftar ID lencana prestasi vokal yang telah dibuka"),
            ("last_practiced_at", "TIMESTAMP WITH TIME ZONE, Nullable", "Waktu sesi latihan vokal terakhir")
        ]),
        ("Tabel ai_practice_plans", [
            ("id", "UUID (Primary Key)", "ID unik kurikulum rencana latihan vokal"),
            ("user_id", "UUID (Foreign Key -> users.id)", "Tautan ke akun penyanyi Premium"),
            ("title", "VARCHAR(150), Not Null", "Judul program kurikulum vokal personal"),
            ("target_voice_type", "VARCHAR(30), Not Null", "Tipe suara sasaran (Tenor, Sopran, dll)"),
            ("target_weaknesses", "JSONB, Not Null", "Daftar fokus kelemahan register nada fals yang diperbaiki"),
            ("curriculum_schedule", "JSONB, Not Null", "Silabus harian beserta materi audio tangga nada (solfeggio drills)"),
            ("status", "ENUM('active', 'completed', 'archived')", "Status keaktifan program kurikulum"),
            ("created_at", "TIMESTAMP WITH TIME ZONE", "Waktu AI merumuskan kurikulum vokal")
        ])
    ]

    for title, rows in tables_data:
        doc.add_heading(title, level=3)
        t = doc.add_table(rows=len(rows)+1, cols=3)
        t.style = doc.tables[0].style if len(doc.tables) > 0 else 'Table Grid'
        set_table_borders(t)
        t.columns[0].width = Inches(1.5)
        t.columns[1].width = Inches(2.0)
        t.columns[2].width = Inches(3.0)
        
        t.rows[0].cells[0].text = "Nama Kolom"
        t.rows[0].cells[1].text = "Tipe Data & Batasan"
        t.rows[0].cells[2].text = "Keterangan Fungsi"
        for c in t.rows[0].cells:
            c.paragraphs[0].runs[0].bold = True
            set_cell_background(c, "D9D9D9")
            
        for idx, (col, dtype, desc) in enumerate(rows):
            r = t.rows[idx+1]
            r.cells[0].text = col
            r.cells[1].text = dtype
            r.cells[2].text = desc
            r.cells[0].paragraphs[0].runs[0].bold = True

    # 7. Bab IV Dekomposisi Modul Fungsional & Spesifikasi API
    doc.add_heading('Bab IV Dekomposisi Modul Fungsional & Spesifikasi Antarmuka Layanan', level=1)
    doc.add_heading('4.1 Dekomposisi Modul Fungsional', level=2)
    doc.add_paragraph(
        "Hierarki modular fungsional sistem VocalSense AI dikelompokkan ke dalam modul-modul berikut:\n"
        "0.0 Sistem VocalSense AI (AI Singing Trainer)\n"
        "  1.0 Modul Autentikasi & Akun Pengguna\n"
        "    1.1 Registrasi Akun Penyanyi Baru & Enkripsi Kata Sandi\n"
        "    1.2 Masuk Sistem Kredensial & Validasi JWT Session\n"
        "    1.3 Integrasi Single Sign-On Google OAuth 2.0\n"
        "    1.4 Pemulihan & Reset Kata Sandi via Token Email\n"
        "    1.5 Pengelolaan Profil Vokal & Preferensi Genre\n"
        "  2.0 Modul Kalibrasi & Perekam Bernyanyi\n"
        "    2.1 Digital Chromatic Tuner & Kalibrasi Desibel Mikrofon\n"
        "    2.2 Tes Jangkauan Vokal Mandiri (Vocal Range Finder)\n"
        "    2.3 Web Audio Capture & Live Rolling Pitch Curve Visualizer\n"
        "    2.4 Unggah Berkas Rekaman Vokal & Validasi Format Audio\n"
        "    2.5 Pemutaran Ulang & Pemangkasan Jeda Hening Vokal (Audio Trimmer)\n"
        "  3.0 Modul Engine Analisis Suara Bernyanyi AI\n"
        "    3.1 Ekstraksi Nada Dasar F0 Berbasis Algoritma YIN & CMNDF\n"
        "    3.2 Kalkulasi Deviasi Nada Logaritmik Cents & Deteksi Flat/Sharp\n"
        "    3.3 Pengukuran Laju Osilasi (5–7 Hz) & Kedalaman Vibrato\n"
        "    3.4 Penilaian Kestabilan Penahanan Nada (Sustain Stability)\n"
        "    3.5 Analisis Dinamika Volume RMS & Kontrol Napas Diafragma\n"
        "    3.6 Agregasi Skor Bernyanyi & Rekomendasi Teknik Vokal AI\n"
        "  4.0 Modul Rapor Bernyanyi & Ekspor Dokumen (Pro Tier)\n"
        "    4.1 Kanvas Piano Roll Interaktif & Radar Chart 5 Dimensi Vokal\n"
        "    4.2 Pemutaran Audio Terikat Deteksi Nada Fals (Note-Sync Playback)\n"
        "    4.3 Penyimpanan Rapor Permanen & Pengarsipan Audio ke S3 Cloud Storage\n"
        "    4.4 Pembangkitan Lembar Rapor Evaluasi Format PDF & Sertifikat Kelulusan\n"
        "    4.5 Perbandingan Kurva Nada Dua Sesi Bernyanyi Berdampingan\n"
        "  5.0 Modul Pelacakan Progres Bernyanyi (Premium Tier)\n"
        "    5.1 Dasbor Grafik Tren Akurasi Nada & Perluasan Jangkauan Vokal\n"
        "    5.2 Pelacak Konsistensi Streak Hari Latihan Vokal Harian\n"
        "    5.3 Sistem Pembukaan Kunci Lencana Capaian Prestasi Bernyanyi\n"
        "  6.0 Modul Pelatih Vokal Cerdas AI (Premium Tier)\n"
        "    6.1 Diagnosis Otomatis Riwayat Nada Fals Berbasis Rapor\n"
        "    6.2 Pembangkitan Silabus Latihan Tangga Nada (Solfeggio Drills) 7-30 Hari\n"
        "    6.3 Evaluasi Kepatuhan Nada Latihan Tangga Nada Terpandu Real-time\n"
        "  7.0 Modul Transaksi & Pembayaran Langganan\n"
        "    7.1 Katalog Paket & Pembuatan Transaksi Snap Midtrans\n"
        "    7.2 Pemrosesan Webhook Notifikasi & Aktivasi Tier Otomatis\n"
        "    7.3 Riwayat Faktur Tagihan & Manajemen Invoice Langganan\n"
        "  8.0 Modul Administrasi & Monitoring Sistem\n"
        "    8.1 Manajemen Status Akun Pengguna & Penyesuaian Tier Manual\n"
        "    8.2 Dasbor Omset Keuangan & Utilisasi Komputasi AI Engine\n"
        "    8.3 Konfigurasi Ambang Batas Toleransi Deviasi Cents Nada Fals Global"
    )

    doc.add_heading('4.2 Spesifikasi Endpoint REST API Utama', level=2)
    api_list = [
        ("POST", "/api/auth/register", "Mendaftarkan akun penyanyi baru dengan nama, email, password", "Publik"),
        ("POST", "/api/auth/login", "Autentikasi akun dan penerbitan token sesi JWT", "Publik"),
        ("POST", "/api/auth/google", "Autentikasi satu klik Single Sign-On Google OAuth 2.0", "Publik"),
        ("POST", "/api/auth/forgot-password", "Mengirimkan tautan token pemulihan kata sandi ke email", "Publik"),
        ("PUT", "/api/users/profile-vocal", "Memperbarui preferensi tipe suara, genre, dan avatar vokal", "Pengguna"),
        ("POST", "/api/audio/tuner-calibrate", "Mengukur ambient noise dan kalibrasi chromatic tuner", "Pengguna"),
        ("POST", "/api/vocal-range/test", "Memproses uji nada terendah/tertinggi & klasifikasi suara", "Semua"),
        ("POST", "/api/voice/analyze-singing", "Menganalisis sinyal audio bernyanyi (Pitch, Cents, Vibrato, Sustain)", "Semua"),
        ("GET", "/api/reports", "Mengambil daftar riwayat rapor bernyanyi tersimpan", "Pro, Prem"),
        ("GET", "/api/reports/:id", "Mengambil detail rapor vokal & data deret nada Piano Roll", "Pro, Prem"),
        ("GET", "/api/reports/:id/pdf", "Mengunduh lembar laporan penilaian vokal & sertifikat format PDF", "Pro, Prem"),
        ("POST", "/api/reports/compare", "Menghasilkan komparasi side-by-side dua sesi rekaman bernyanyi", "Pro, Prem"),
        ("DELETE", "/api/reports/:id", "Menghapus berkas rekaman dan rapor bernyanyi dari penyimpanan", "Pro, Prem"),
        ("GET", "/api/analytics/vocal-progress", "Mengambil data tren akurasi nada dan peta perluasan range vokal", "Premium"),
        ("POST", "/api/ai-coach/generate-curriculum", "Menghasilkan kurikulum latihan tangga nada adaptif 7-30 hari", "Premium"),
        ("POST", "/api/ai-coach/drills/evaluate", "Mengevaluasi kepatuhan nada latihan solfeggio harian per ketukan", "Premium"),
        ("GET", "/api/subscriptions/plans", "Mengambil katalog paket harga langganan (Free, Pro, Premium)", "Publik"),
        ("POST", "/api/subscriptions/checkout", "Membuat snap token pembayaran ke Payment Gateway Midtrans", "Pengguna"),
        ("POST", "/api/payments/webhook", "Menerima notifikasi status settlement dari Payment Gateway", "Gateway"),
        ("GET", "/api/subscriptions/invoices", "Mengambil riwayat faktur tagihan dan bukti pembayaran resmi", "Pengguna"),
        ("GET", "/api/admin/users", "Manajemen daftar pengguna dan penyesuaian tier oleh Administrator", "Admin"),
        ("GET", "/api/admin/analytics", "Mengambil statistik keuangan omset dan beban komputasi server AI", "Admin"),
        ("PUT", "/api/admin/tuning-params", "Menyetel ambang batas deviasi cents toleransi nada fals global", "Admin")
    ]
    api_table = doc.add_table(rows=len(api_list)+1, cols=4)
    set_table_borders(api_table)
    api_table.columns[0].width = Inches(1.0)
    api_table.columns[1].width = Inches(2.2)
    api_table.columns[2].width = Inches(2.5)
    api_table.columns[3].width = Inches(0.8)
    api_table.rows[0].cells[0].text = "Metode"
    api_table.rows[0].cells[1].text = "Endpoint URI"
    api_table.rows[0].cells[2].text = "Deskripsi Operasi"
    api_table.rows[0].cells[3].text = "Akses"
    for c in api_table.rows[0].cells:
        c.paragraphs[0].runs[0].bold = True
        set_cell_background(c, "D9D9D9")
    for idx, (m, ep, d, ak) in enumerate(api_list):
        r = api_table.rows[idx+1]
        r.cells[0].text = m
        r.cells[1].text = ep
        r.cells[2].text = d
        r.cells[3].text = ak
        r.cells[0].paragraphs[0].runs[0].bold = True

    # 8. Bab V Perancangan UML
    doc.add_heading('Bab V Perancangan UML & Diagram Sistem', level=1)
    doc.add_paragraph(
        "Perancangan UML pada sistem VocalSense AI disusun secara komprehensif dengan mematuhi kaidah pemodelan "
        "berorientasi objek serta catatan asistensi pembimbing (Kak Rahmi):\n"
        "1. Pemisahan Aktor Eksternal vs Layanan Backend: Google OAuth 2.0, Payment Gateway (Midtrans), dan AI LLM Provider "
        "(Google Gemini) beroperasi di lapisan infrastruktur/backend sistem dan bukan aktor manusia. Oleh karena itu, Use Case "
        "Diagram hanya memodelkan 2 aktor manusia utama: Pengguna (Penyanyi) dan Administrator.\n"
        "2. Kesesuaian 1:1 Use Case, Activity Diagram, dan Sequence Diagram: Setiap Use Case (UC-01 hingga UC-24) memiliki tepat "
        "1 Activity Diagram (AD-01 hingga AD-24) dan 1 Sequence Diagram (SD-01 hingga SD-24).\n"
        "3. Kaidah Activity Diagram: Setiap percabangan keputusan (decision diamond) wajib memiliki label berpenanda kurung siku [ ] "
        "(contoh: [Tersedia], [Sudah Terdaftar], [Valid], [Tidak Valid]), tidak menyisipkan simbol merge diamond tanpa titik penggabungan ganda, "
        "serta menyertakan alur navigasi menu awal yang jelas dan ramah pengguna.\n"
        "4. Kaidah Sequence Diagram & Konsep MVC: Lifeline disusun berurutan dari User -> View (Antarmuka) -> Controller (Pengendali) -> "
        "Service (Logika Bisnis) -> Database / Storage (Basis Data). Seluruh diagram disajikan dalam gaya visual hitam-putih "
        "(monochrome) berstandar profesional."
    )

    doc.add_heading('5.1 Matriks Pemetaan 1:1 Use Case, Activity Diagram, dan Sequence Diagram', level=2)
    doc.add_paragraph("Tabel berikut menyajikan pemetaan 1:1 lengkap antara 24 Use Case dengan berkas Activity Diagram dan Sequence Diagram:")

    matrix_data = [
        ("UC-01", "Registrasi Akun Pengguna", "Pengguna", "AD-01_Registrasi_Akun_Pengguna.drawio", "SD-01_Registrasi_Akun_Pengguna.drawio"),
        ("UC-02", "Masuk ke Sistem (Login)", "Pengguna", "AD-02_Masuk_ke_Sistem.drawio", "SD-02_Masuk_ke_Sistem.drawio"),
        ("UC-03", "Masuk via Google OAuth", "Pengguna", "AD-03_Masuk_via_Google_OAuth.drawio", "SD-03_Masuk_via_Google_OAuth.drawio"),
        ("UC-04", "Pemulihan Kata Sandi", "Pengguna", "AD-04_Pemulihan_Kata_Sandi.drawio", "SD-04_Pemulihan_Kata_Sandi.drawio"),
        ("UC-05", "Pengelolaan Profil Vokal dan Preferensi", "Pengguna", "AD-05_Pengelolaan_Profil_Vokal_dan_Preferensi.drawio", "SD-05_Pengelolaan_Profil_Vokal_dan_Preferensi.drawio"),
        ("UC-06", "Tuner dan Kalibrasi Mikrofon", "Pengguna", "AD-06_Tuner_dan_Kalibrasi_Mikrofon.drawio", "SD-06_Tuner_dan_Kalibrasi_Mikrofon.drawio"),
        ("UC-07", "Tes Jangkauan Vokal (Vocal Range Finder)", "Pengguna", "AD-07_Tes_Jangkauan_Vokal.drawio", "SD-07_Tes_Jangkauan_Vokal.drawio"),
        ("UC-08", "Perekaman Bernyanyi dan Pitch Visualizer", "Pengguna", "AD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio", "SD-08_Perekaman_Bernyanyi_dan_Pitch_Visualizer.drawio"),
        ("UC-09", "Unggah Berkas Rekaman Vokal", "Pengguna", "AD-09_Unggah_Berkas_Rekaman_Vokal.drawio", "SD-09_Unggah_Berkas_Rekaman_Vokal.drawio"),
        ("UC-10", "Putar Ulang dan Pangkas Vokal (Trim Audio)", "Pengguna", "AD-10_Putar_Ulang_dan_Pangkas_Vokal.drawio", "SD-10_Putar_Ulang_dan_Pangkas_Vokal.drawio"),
        ("UC-11", "Analisis Suara Bernyanyi AI (Pitch, Cents, Vibrato)", "Pengguna", "AD-11_Analisis_Suara_Bernyanyi_AI.drawio", "SD-11_Analisis_Suara_Bernyanyi_AI.drawio"),
        ("UC-12", "Menampilkan Rapor dan Piano Roll Visualizer", "Pengguna", "AD-12_Menampilkan_Rapor_dan_Piano_Roll.drawio", "SD-12_Menampilkan_Rapor_dan_Piano_Roll.drawio"),
        ("UC-13", "Putar Audio Terikat Nada Fals (Note-Sync)", "Pengguna", "AD-13_Putar_Audio_Terikat_Nada_Fals.drawio", "SD-13_Putar_Audio_Terikat_Nada_Fals.drawio"),
        ("UC-14", "Menyimpan Rapor Nyanyi", "Pengguna (Pro/Prem)", "AD-14_Menyimpan_Rapor_Nyanyi.drawio", "SD-14_Menyimpan_Rapor_Nyanyi.drawio"),
        ("UC-15", "Mengekspor Rapor dan Sertifikat PDF", "Pengguna (Pro/Prem)", "AD-15_Mengekspor_Rapor_dan_Sertifikat_PDF.drawio", "SD-15_Mengekspor_Rapor_dan_Sertifikat_PDF.drawio"),
        ("UC-16", "Membandingkan Dua Sesi Rekaman Nyanyi", "Pengguna (Pro/Prem)", "AD-16_Membandingkan_Dua_Sesi_Rekaman_Nyanyi.drawio", "SD-16_Membandingkan_Dua_Sesi_Rekaman_Nyanyi.drawio"),
        ("UC-17", "Memantau Dasbor Progres Vokal", "Pengguna (Premium)", "AD-17_Memantau_Dasbor_Progres_Vokal.drawio", "SD-17_Memantau_Dasbor_Progres_Vokal.drawio"),
        ("UC-18", "Melacak Streak dan Lencana Vokal", "Pengguna (Premium)", "AD-18_Melacak_Streak_dan_Lencana_Vokal.drawio", "SD-18_Melacak_Streak_dan_Lencana_Vokal.drawio"),
        ("UC-19", "Menghasilkan Kurikulum Vokal AI", "Pengguna (Premium)", "AD-19_Menghasilkan_Kurikulum_Vokal_AI.drawio", "SD-19_Menghasilkan_Kurikulum_Vokal_AI.drawio"),
        ("UC-20", "Menjalankan Sesi Latihan Tangga Nada (Solfeggio)", "Pengguna (Premium)", "AD-20_Menjalankan_Sesi_Latihan_Tangga_Nada.drawio", "SD-20_Menjalankan_Sesi_Latihan_Tangga_Nada.drawio"),
        ("UC-21", "Memilih Paket dan Membayar Langganan", "Pengguna", "AD-21_Memilih_Paket_dan_Membayar_Langganan.drawio", "SD-21_Memilih_Paket_dan_Membayar_Langganan.drawio"),
        ("UC-22", "Melihat Riwayat Tagihan dan Invoice", "Pengguna", "AD-22_Melihat_Riwayat_Tagihan_dan_Invoice.drawio", "SD-22_Melihat_Riwayat_Tagihan_dan_Invoice.drawio"),
        ("UC-23", "Manajemen Pengguna dan Tier", "Administrator", "AD-23_Manajemen_Pengguna_dan_Tier.drawio", "SD-23_Manajemen_Pengguna_dan_Tier.drawio"),
        ("UC-24", "Pemantauan Analitik Finansial dan Sistem", "Administrator", "AD-24_Pemantauan_Analitik_Finansial_dan_Sistem.drawio", "SD-24_Pemantauan_Analitik_Finansial_dan_Sistem.drawio")
    ]

    mat_table = doc.add_table(rows=len(matrix_data)+1, cols=5)
    set_table_borders(mat_table)
    mat_table.columns[0].width = Inches(0.8)
    mat_table.columns[1].width = Inches(2.2)
    mat_table.columns[2].width = Inches(1.3)
    mat_table.columns[3].width = Inches(1.1)
    mat_table.columns[4].width = Inches(1.1)
    
    headers = ["Kode", "Nama Use Case", "Aktor", "Activity Diagram", "Sequence Diagram"]
    for idx, h in enumerate(headers):
        mat_table.rows[0].cells[idx].text = h
        mat_table.rows[0].cells[idx].paragraphs[0].runs[0].bold = True
        set_cell_background(mat_table.rows[0].cells[idx], "D9D9D9")

    for idx, (code, name, act, ad_f, sd_f) in enumerate(matrix_data):
        row = mat_table.rows[idx+1]
        row.cells[0].text = code
        row.cells[1].text = name
        row.cells[2].text = act
        row.cells[3].text = ad_f
        row.cells[4].text = sd_f
        row.cells[0].paragraphs[0].runs[0].bold = True

    # 5.2 Use Case Diagram
    doc.add_heading('5.2 Use Case Diagram', level=2)
    doc.add_paragraph(
        "Diagram Use Case berikut memetakan 24 use case fungsional lengkap sistem VocalSense AI dengan 2 aktor utama "
        "(Pengguna dan Administrator) sesuai kaidah asistensi Kak Rahmi. Seluruh garis relasi aktor ke use case disusun rapi "
        "tanpa tumpang tindih (zero line crossing) dan berpusat pada apex use case:"
    )
    uc_img_path = 'D:/Kuliah/IPPL/docs/diagrams/export_images/usecase_diagram.png'
    if os.path.exists(uc_img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p_img.add_run()
        run.add_picture(uc_img_path, width=Inches(5.5))
        p_cap = doc.add_paragraph('Gambar 4. Use Case Diagram Sistem VocalSense AI (24 Use Cases)')
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    # 5.3 Activity Diagram - SEMUA 24 DIAGRAM
    doc.add_heading('5.3 Perancangan Activity Diagram (24 Diagram Lengkap)', level=2)
    doc.add_paragraph(
        "Sistem VocalSense AI memiliki 24 Activity Diagram (AD-01 hingga AD-24) yang masing-masing berkorespondensi 1:1 dengan Use Case. "
        "Setiap diagram aktivitas mengadopsi 3 swimlane (Aktor Pengguna/Admin, Sistem Web/API, dan Database / Audio Storage), "
        "memiliki label percabangan keputusan berkurung siku [ ] (seperti [Valid], [Tidak Valid], [Tersedia], [Sudah Terdaftar]), "
        "tidak memiliki merge diamond yang berdiri sendiri tanpa proses percabangan ganda, serta diawali dengan alur navigasi menu "
        "yang ramah pengguna (user-friendly). Berikut disajikan seluruh 24 Activity Diagram sistem:"
    )

    img_dir = 'D:/Kuliah/IPPL/docs/diagrams/export_images'
    
    for i in range(1, 25):
        prefix = f"{i:02d}"
        uc_item = use_cases[i-1] if i-1 < len(use_cases) else {"name": f"Use Case {prefix}"}
        uc_title = uc_item["name"]
        
        # Subheading 5.3.X
        doc.add_heading(f"5.3.{i} AD-{prefix}: {uc_title}", level=3)
        
        # Description
        desc_text = UC_DESCRIPTIONS.get(i, {}).get("ad", f"Alur aktivitas untuk use case AD-{prefix}: {uc_title} yang memodelkan interaksi terpadu antara Aktor, Sistem Web/API, dan Basis Data.")
        doc.add_paragraph(desc_text)
        
        # Embed image
        ad_files = [f for f in os.listdir(img_dir) if f.startswith(f"AD-{prefix}") and f.endswith(".png") and "test" not in f]
        if ad_files:
            ad_img_path = os.path.join(img_dir, ad_files[0])
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p_img.add_run()
            try:
                run.add_picture(ad_img_path, width=Inches(5.5))
            except Exception as e:
                print(f"Error adding picture {ad_img_path}: {e}")
                
            p_cap = doc.add_paragraph(f"Gambar {4 + i}. Activity Diagram AD-{prefix}: {uc_title}")
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    # 5.4 Sequence Diagram - SEMUA 24 DIAGRAM
    doc.add_heading('5.4 Perancangan Sequence Diagram (24 Diagram Lengkap)', level=2)
    doc.add_paragraph(
        "Sistem VocalSense AI memiliki 24 Sequence Diagram (SD-01 hingga SD-24) yang memetakan kronologi pesan berurutan "
        "sesuai konsep arsitektur Model-View-Controller (MVC): User/Admin -> View (Antarmuka) -> Controller (Pengendali) -> "
        "Service (Logika Bisnis & Mesin Audio) -> Database / Storage (Basis Data). Seluruh diagram disajikan dalam format "
        "visual hitam-putih (monochrome) yang terintegrasi secara modular. Berikut disajikan seluruh 24 Sequence Diagram sistem:"
    )

    for j in range(1, 25):
        prefix = f"{j:02d}"
        uc_item = use_cases[j-1] if j-1 < len(use_cases) else {"name": f"Use Case {prefix}"}
        uc_title = uc_item["name"]
        
        # Subheading 5.4.X
        doc.add_heading(f"5.4.{j} SD-{prefix}: {uc_title}", level=3)
        
        # Description
        desc_text = UC_DESCRIPTIONS.get(j, {}).get("sd", f"Alur sekuensial pesan berorientasi MVC untuk SD-{prefix}: {uc_title} yang memetakan komunikasi antara Pengguna, View, Controller, Service, dan Database.")
        doc.add_paragraph(desc_text)
        
        # Embed image
        sd_files = [f for f in os.listdir(img_dir) if f.startswith(f"SD-{prefix}") and f.endswith(".png")]
        if sd_files:
            sd_img_path = os.path.join(img_dir, sd_files[0])
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = p_img.add_run()
            try:
                run.add_picture(sd_img_path, width=Inches(5.5))
            except Exception as e:
                print(f"Error adding picture {sd_img_path}: {e}")
                
            p_cap = doc.add_paragraph(f"Gambar {28 + j}. Sequence Diagram SD-{prefix}: {uc_title}")
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            if len(p_cap.runs) > 0: p_cap.runs[0].italic = True

    doc.save(target_path)
    print(f"SDD Document successfully generated with ALL 52 diagrams at: {target_path}")

if __name__ == "__main__":
    generate_sdd()
