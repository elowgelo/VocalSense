import fitz
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

# ---------------------------------------------------------------------------
# DATA TEKS JAWABAN TUGAS (NATURAL, MAHASISWA, PADAT, FORMAL HITAM-PUTIH)
# ---------------------------------------------------------------------------

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
    @page {
        size: A4;
        margin: 18mm 18mm 18mm 18mm;
    }
    body {
        font-family: 'Times New Roman', Times, serif;
        font-size: 10pt;
        line-height: 1.28;
        color: #000000;
    }
    .header-box {
        border-bottom: 2px solid #000000;
        padding-bottom: 5px;
        margin-bottom: 10px;
    }
    .header-title {
        font-size: 13pt;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        margin: 0;
    }
    .header-subtitle {
        font-size: 10pt;
        font-weight: bold;
        text-align: center;
        margin-top: 2px;
        margin-bottom: 0;
    }
    .info-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 6px;
        margin-bottom: 2px;
        font-size: 9.5pt;
    }
    .info-table td {
        padding: 2px 4px;
        border: none;
    }
    .info-table td.label {
        width: 18%;
        font-weight: bold;
    }
    .info-table td.colon {
        width: 2%;
    }
    h1 {
        font-size: 10.5pt;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 10px;
        margin-bottom: 4px;
        border-bottom: 1px solid #000000;
        padding-bottom: 2px;
    }
    h2 {
        font-size: 10pt;
        font-weight: bold;
        margin-top: 7px;
        margin-bottom: 3px;
    }
    p {
        margin-top: 2px;
        margin-bottom: 4px;
        text-align: justify;
    }
    ol, ul {
        margin-top: 2px;
        margin-bottom: 4px;
        padding-left: 18px;
    }
    li {
        margin-bottom: 2.5px;
        text-align: justify;
    }
    
    /* Flowchart Styling Ringkas & Formal */
    .flow-container {
        width: 100%;
        margin: 4px 0 6px 0;
    }
    .flow-step {
        border: 1px solid #000000;
        background-color: #fbfbfb;
        padding: 4px 8px;
        font-size: 9pt;
    }
    .flow-step-title {
        font-weight: bold;
    }
    .flow-arrow {
        text-align: center;
        font-weight: bold;
        font-size: 9.5pt;
        line-height: 1.0;
        margin: 1px 0;
    }
    
    /* Tabel Formal Hitam Putih */
    table.data-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 5px;
        margin-bottom: 6px;
        font-size: 8.5pt;
    }
    table.data-table th {
        border: 1px solid #000000;
        background-color: #f0f0f0;
        font-weight: bold;
        padding: 4px 5px;
        text-align: center;
    }
    table.data-table td {
        border: 1px solid #000000;
        padding: 3.5px 5px;
        vertical-align: top;
    }
    table.data-table td.center {
        text-align: center;
    }
    table.data-table td.bold {
        font-weight: bold;
    }
</style>
</head>
<body>

<div class="header-box">
    <div class="header-title">Tugas Rekayasa Perangkat Lunak (IPPL)</div>
    <div class="header-subtitle">Analisis Perancangan, Metodologi, Bisnis, Pengujian, dan Strategi Produk</div>
    <table class="info-table">
        <tr>
            <td class="label">Nama Mahasiswa</td>
            <td class="colon">:</td>
            <td><strong>Rafael Hotdion L.T</strong></td>
            <td class="label">Topik Proyek</td>
            <td class="colon">:</td>
            <td><strong>VocalSense AI</strong></td>
        </tr>
        <tr>
            <td class="label">NIM</td>
            <td class="colon">:</td>
            <td><strong>11241075</strong></td>
            <td class="label">Fokus Sistem</td>
            <td class="colon">:</td>
            <td>AI Singing &amp; Vocal Trainer</td>
        </tr>
    </table>
</div>

<h1>1. Alur Requirement dan Alur Data Proyek</h1>

<h2>A. Alur Rekayasa Kebutuhan (Requirement Engineering)</h2>
<p>
    Alur penentuan kebutuhan pada proyek <strong>VocalSense AI</strong> mengikuti siklus rekayasa kebutuhan perangkat lunak formal yang terdiri dari 5 tahap:
</p>
<ol>
    <li><strong>Identifikasi Kebutuhan (Elicitation):</strong> Menggali permasalahan utama pengguna, yaitu banyak orang ingin belajar menyanyi namun terhambat biaya les vokal yang mahal (Rp 500.000&ndash;Rp 2.000.000/bulan) dan rasa malu saat bernyanyi fals di depan orang lain. Solusi yang dirancang adalah aplikasi web pelatih vokal mandiri dengan analisis nada otomatis (mengacu pada referensi web akustik <em>VoiceGenderAnalyzer.com</em>).</li>
    <li><strong>Analisis Kebutuhan (Analysis):</strong> Mengelompokkan kebutuhan ke dalam Kebutuhan Fungsional (24 fitur utama: penala nada dasar, perekam Web Audio, deteksi nada fals, rapor Piano Roll, dan kurikulum latihan AI) serta Kebutuhan Non-Fungsional (ekstraksi nada &le; 4 detik, antarmuka responsif, dan keamanan data).</li>
    <li><strong>Spesifikasi Kebutuhan (Specification):</strong> Menuangkan kebutuhan ke dalam dokumen formal Software Requirements Specification (SRS) dan Use Case Diagram (24 use case dengan 2 aktor manusia: Pengguna dan Administrator).</li>
    <li><strong>Validasi Kebutuhan (Validation):</strong> Melakukan peninjauan dan asistensi bersama pembimbing (Kak Rahmi) untuk memastikan diagram valid (hanya aktor manusia di use case, label percabangan [ ], dan relasi 1:1 antar diagram).</li>
    <li><strong>Manajemen Kebutuhan (Management):</strong> Mengunci spesifikasi kebutuhan ke dalam Product Backlog sebagai acuan pembagian sprint pengembangan.</li>
</ol>

<div class="flow-container">
    <div class="flow-step"><strong>1. Identifikasi Masalah:</strong> Riset kendala latihan vokal solo &amp; studi referensi web akustik peramban.</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>2. Analisis Kebutuhan:</strong> Perumusan 24 Kebutuhan Fungsional (FR) dan Kebutuhan Non-Fungsional (NFR).</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>3. Spesifikasi &amp; Pemodelan:</strong> Penyusunan dokumen SRS, Use Case 24 UC, Activity, dan Sequence MVC.</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>4. Validasi Asistensi:</strong> Evaluasi kesesuaian kaidah asistensi (aktor use case manusia, label decision [ ]).</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>5. Baseline Product Backlog:</strong> Pengesahan spesifikasi kebutuhan untuk diimplementasikan ke sprint.</div>
</div>

<h2>B. Alur Data Sistem (Data Flow)</h2>
<p>
    Alur data menjelaskan perpindahan dan pengolahan data dari suara pengguna hingga menjadi rapor evaluasi:
</p>
<ol>
    <li><strong>Input Suara:</strong> Pengguna bernyanyi melalui mikrofon peramban, ditangkap oleh <em>Web Audio API</em> secara lokal menjadi aliran data audio PCM 44.1 kHz. Modul <em>noise filter</em> membersihkan desis ruangan.</li>
    <li><strong>Visualisasi Waktu Nyata:</strong> Selama bernyanyi, sistem mengekstrak frekuensi dasar ($F_0$) secara langsung dan menampilkan garis kurva nada berjalan di atas tuts piano roll pada layar.</li>
    <li><strong>Ekstraksi Fitur Vokal (DSP Engine):</strong> Setelah selesai merekam, file audio dikirim ke server. Algoritma <em>YIN</em> mengekstrak frekuensi nada dasar ($F_0$), mengonversinya ke notasi musik (MIDI), menghitung deviasi nada (Cents), menentukan status nada (In-Tune, Flat, atau Sharp), serta mengukur getaran vibrato (5&ndash;7 Hz) dan stabilitas penahanan nada.</li>
    <li><strong>Penyimpanan Berjenjang:</strong>
        <ul>
            <li><em>Free Tier:</em> Data hasil hanya diproses di memori RAM dan ditampilkan di layar tanpa disimpan ke basis data.</li>
            <li><em>Pro/Premium:</em> File rekaman disimpan di Cloud Storage dan metrik nilai disimpan permanen di database PostgreSQL.</li>
        </ul>
    </li>
    <li><strong>Pembuatan Kurikulum AI (Khusus Premium):</strong> Catatan nada fals dikirim ke Google Gemini AI untuk menghasilkan silabus latihan tangga nada (solfeggio drills) harian.</li>
    <li><strong>Output Rapor:</strong> Sistem menampilkan Rapor Bernyanyi berisi Skor (0&ndash;100), Radar Chart, tuts Piano Roll interaktif (bisa diklik untuk mendengar detik nada fals), dan tombol unduh sertifikat PDF.</li>
</ol>

<div class="flow-container">
    <div class="flow-step"><strong>Input:</strong> Suara mikrofon penyanyi &rarr; Web Audio API (PCM 44.1 kHz &amp; filter noise).</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>Live Stream:</strong> Koordinat nada F0 dirender seketika menjadi kurva visual di atas tuts piano.</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>Pemrosesan Audio (AI Engine):</strong> Ekstraksi YIN F0 &rarr; Konversi MIDI &amp; Cents &rarr; Deteksi Flat/Sharp &rarr; Vibrato.</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>Penyimpanan:</strong> Free (hanya memori RAM) | Pro/Premium (simpan database PostgreSQL &amp; Cloud Storage S3).</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>Analisis AI (Premium):</strong> Gemini LLM merumuskan silabus latihan tangga nada solfeggio harian.</div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-step"><strong>Output:</strong> Skor bernyanyi, Piano Roll interaktif (Note-Sync Playback), dan lembar rapor PDF.</div>
</div>

<h1>2. Metode Pengembangan Perangkat Lunak</h1>

<h2>A. Metode yang Digunakan: Agile (Framework Scrum)</h2>
<p>
    Pengembangan VocalSense AI menggunakan metode <strong>Agile</strong> dengan kerangka kerja <strong>Scrum</strong>.
</p>

<h2>B. Alasan Pemilihan Metode</h2>
<ol>
    <li><strong>Karakteristik Pemrosesan Audio yang Eksperimental:</strong> Penalaan algoritma deteksi nada (ambang batas cents dan filter kebisingan mic) memerlukan pengujian berulang dengan suara penyanyi asli. Scrum memungkinkan pengujian dan penyesuaian fungsi di setiap akhir sprint.</li>
    <li><strong>Kemudahan Mengakomodasi Umpan Balik:</strong> Dalam perkuliahan rekayasa perangkat lunak, arahan dan masukan dari dosen/pembimbing dapat langsung dimasukkan ke sprint berikutnya tanpa mengulang perancangan dari awal.</li>
    <li><strong>Pengembangan Bertahap dan Terukur:</strong> Setiap fitur utama diselesaikan secara bertahap dalam siklus 2 mingguan sehingga sistem selalu memiliki modul yang berfungsi secara nyata.</li>
</ol>

<h2>C. Rencana Pembagian Sprint (4 Sprint x 2 Minggu)</h2>
<ul>
    <li><strong>Sprint 1 (Fondasi &amp; Desain Sistem):</strong> Pembuatan dokumen SRS &amp; SDD, perancangan skema database PostgreSQL, pembuatan 56 diagram Draw.io hitam-putih, serta implementasi registrasi dan login akun (JWT &amp; Google OAuth).</li>
    <li><strong>Sprint 2 (Perekam Audio &amp; Tuner):</strong> Pembuatan modul penangkap suara Web Audio API, Digital Chromatic Tuner, tes rentang vokal (Vocal Range Finder), perekam vokal langsung dengan visualizer kurva pitch, dan pemotong audio (trimmer).</li>
    <li><strong>Sprint 3 (Mesin Analisis Nada &amp; Rapor Piano Roll):</strong> Implementasi algoritma ekstraksi pitch YIN F0, deteksi nada fals (flat/sharp), pengukuran vibrato 5&ndash;7 Hz, kanvas Piano Roll interaktif, pemutaran sinkron nada fals (Note-Sync Playback), dan ekspor rapor PDF.</li>
    <li><strong>Sprint 4 (Kurikulum AI, Monetisasi &amp; Finalisasi):</strong> Integrasi Gemini AI untuk jadwal latihan tangga nada harian, grafik pelacakan kemajuan mingguan, streak latihan harian, gateway pembayaran Midtrans Snap, panel admin, serta pengujian akhir sistem.</li>
</ul>

<h1>3. Strategi Pemasaran dan Model Pendapatan (Income)</h1>

<h2>A. Model Pendapatan (Monetisasi Freemium SaaS)</h2>
<p>
    Sistem menerapkan model bisnis langganan bertingkat (Freemium):
</p>
<ol>
    <li><strong>Free Tier (Gratis):</strong> Pengguna dapat mencoba tes rentang vokal instan dan merekam suara latihan bernyanyi maksimal 60 detik dengan visualisasi nada langsung. Fitur ini tidak menyimpan riwayat rapor dan berfungsi untuk menarik pengguna baru sebanyak-banyaknya tanpa hambatan.</li>
    <li><strong>Pro Tier (Rp 49.000 / bulan):</strong> Menyediakan durasi rekam hingga 5 menit (cukup untuk 1 lagu penuh), penyimpanan riwayat rapor tanpa batas, fitur <em>Note-Sync Playback</em> (klik balok nada fals di Piano Roll untuk memutar ulang audio di detik tersebut), komparasi sebelum vs sesudah latihan, dan unduh lembar rapor PDF. Target: penyanyi hobi, anggota paduan suara, dan pembuat cover musik.</li>
    <li><strong>Premium Tier (Rp 99.000 / bulan):</strong> Seluruh fitur Pro ditambah durasi rekam 15 menit, grafik pelacakan kemajuan nada mingguan, fitur streak latihan harian, serta asisten <em>AI Vocal Coach</em> (Gemini AI) yang membuatkan kurikulum latihan tangga nada solfeggio harian sesuai titik kelemahan nada pengguna. Target: vokalis semi-profesional dan calon peserta audisi.</li>
</ol>

<h2>B. Strategi Pemasaran</h2>
<ol>
    <li><strong>Product-Led Growth (Fitur Coba Instan &amp; Kartu Hasil):</strong> Pengguna bisa langsung mencoba tes rentang vokal di halaman depan tanpa harus membuat akun. Hasil tes menampilkan kartu profil suara yang estetik (contoh: <em>"Vocal Range: C3 - G4 [Bariton]"</em>) dilengkapi tombol bagikan ke Instagram Story atau WhatsApp.</li>
    <li><strong>Konten Edukasi Media Sosial (TikTok &amp; Reels):</strong> Membuat video pendek yang menarik, seperti menganalisis akurasi nada dan vibrato penyanyi terkenal menggunakan Piano Roll, serta video tips memperbaiki nada fals saat bernyanyi.</li>
    <li><strong>Kerja Sama Komunitas Paduan Suara &amp; Kampus:</strong> Bekerja sama dengan Unit Kegiatan Mahasiswa (UKM) Paduan Suara Mahasiswa (PSM) dan komunitas karaoke dengan memberikan akses coba gratis paket Pro selama 30 hari.</li>
    <li><strong>Optimasi Mesin Pencari (SEO):</strong> Menargetkan kata kunci pencarian populer di Google, seperti <em>"tes jangkauan vokal online"</em>, <em>"cara cek nada fals"</em>, dan <em>"latihan vokal mandiri"</em>.</li>
</ol>

<h1>4. Metode Pengujian dan Tabel Test Case</h1>

<h2>A. Metode Pengujian yang Digunakan</h2>
<ol>
    <li><strong>Black Box Testing:</strong> Menguji alur fitur dari sisi pengguna tanpa melihat kode internal (validasi form login, pembatasan durasi rekam sesuai tier, dan respon tombol pemutar audio).</li>
    <li><strong>White Box / Unit Testing:</strong> Menguji fungsi perhitungan matematis algoritma audio menggunakan <code>pytest</code> (akurasi deteksi frekuensi nada, rumus konversi MIDI, dan kalkulasi deviasi cents).</li>
    <li><strong>Integration Testing:</strong> Menguji kelancaran komunikasi antar modul: pengiriman data audio dari browser ke server, integrasi respon AI Gemini, dan webhook pembayaran Midtrans.</li>
</ol>

<h2>B. Tabel Skenario Pengujian (Test Case)</h2>
<table class="data-table">
    <thead>
        <tr>
            <th style="width: 8%;">ID</th>
            <th style="width: 14%;">Modul</th>
            <th style="width: 20%;">Skenario Pengujian</th>
            <th style="width: 22%;">Langkah Pengujian</th>
            <th style="width: 26%;">Hasil yang Diharapkan</th>
            <th style="width: 10%;">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="center bold">TC-01</td>
            <td>Autentikasi</td>
            <td>Daftar akun dengan email yang sudah ada</td>
            <td>1. Buka form registrasi.<br>2. Masukkan email duplikat.<br>3. Klik tombol Daftar.</td>
            <td>Sistem menolak dan menampilkan pesan 'Email sudah terdaftar'.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-02</td>
            <td>Tuner Nada</td>
            <td>Pengujian kalibrasi nada murni A4 (440 Hz)</td>
            <td>1. Buka fitur Chromatic Tuner.<br>2. Bunyikan nada acuan 440 Hz ke mikrofon.</td>
            <td>Jarum tuner menunjuk nada A4 (MIDI 69) dengan deviasi 0 &plusmn; 2 cents dan lampu hijau menyala.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-03</td>
            <td>Perekam Vokal</td>
            <td>Batas waktu rekam akun Free (60 detik)</td>
            <td>1. Rekam suara pada akun Free.<br>2. Biarkan perekaman berjalan hingga detik 60.</td>
            <td>Perekaman otomatis berhenti di detik ke-60 dan sistem membuka halaman analisis.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-04</td>
            <td>AI Audio Engine</td>
            <td>Deteksi nada Flat (&lt; -20 cents) &amp; Sharp (&gt; +20 cents)</td>
            <td>1. Unggah file audio uji nada 430 Hz &amp; 450 Hz.<br>2. Jalankan analisis nada.</td>
            <td>Sistem menandai nada 430 Hz sebagai 'Flat' dan nada 450 Hz sebagai 'Sharp' secara tepat.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-05</td>
            <td>Piano Roll</td>
            <td>Fitur Note-Sync Playback pada nada fals</td>
            <td>1. Buka rapor evaluasi vokal.<br>2. Klik balok nada fals merah di detik 00:14.</td>
            <td>Audio player langsung melompat (seek) dan memutar suara vokal tepat di detik ke-14.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-06</td>
            <td>Pembayaran</td>
            <td>Aktivasi paket langganan setelah bayar</td>
            <td>1. Pilih paket Pro bulanan.<br>2. Selesaikan pembayaran di Midtrans.</td>
            <td>Status langganan akun otomatis aktif menjadi Pro dan kuota rekam bertambah jadi 5 menit.</td>
            <td class="center bold">Pass</td>
        </tr>
    </tbody>
</table>

<h1>5. Strategi Agar Orang Lain Mau Menggunakan Sistem</h1>
<p>
    Strategi agar VocalSense AI diminati dan digunakan secara rutin oleh masyarakat bertumpu pada 6 pendekatan nyata:
</p>
<ol>
    <li><strong>Bisa Langsung Digunakan Tanpa Registrasi:</strong> Pengguna baru dapat langsung mencoba fitur tes rentang vokal dan perekaman 60 detik tanpa harus repot mendaftar akun atau memasukkan kartu kredit. Kemudahan ini menghilangkan keraguan pengguna pertama kali.</li>
    <li><strong>Umpan Balik Cepat dalam Hitungan Detik:</strong> Begitu pengguna menyanyikan satu nada ke mikrofon, grafik kurva nada langsung bergerak di tuts piano dan sistem memberi tahu tipe suaranya (Bass, Bariton, Tenor, dll). Hal ini memberikan kepuasan instan yang memicu rasa penasaran untuk mencoba lagu penuh.</li>
    <li><strong>Solusi untuk Masalah Biaya dan Rasa Malu:</strong>
        <ul>
            <li><em>Faktor Biaya:</em> Biaya les vokal privat sangat mahal (Rp 500rb&ndash;Rp 2jt/bulan). VocalSense AI menyediakan bimbingan objektif 24 jam dengan biaya sangat terjangkau (Rp 49.000/bulan).</li>
            <li><em>Faktor Kenyamanan:</em> Banyak orang pemula merasa malu jika bernyanyi fals di depan guru les. Aplikasi ini memberikan ruang latihan mandiri yang privat tanpa rasa canggung atau dihakimi.</li>
        </ul>
    </li>
    <li><strong>Membentuk Kebiasaan Latihan (Daily Streak &amp; Badges):</strong> Menerapkan konsep gamifikasi (seperti Duolingo) dengan fitur pencatat konsistensi hari latihan bernyanyi harian (streak) dan lencana pencapaian. Dasbor yang memperlihatkan grafik rentang nada bertambah luas dari minggu ke minggu membuat pengguna merasa latihannya membuahkan hasil nyata.</li>
    <li><strong>Bukan Sekadar Menilai, tapi Memberi Solusi Perbaikan:</strong> Aplikasi tidak hanya memberi tahu skor bahwa pengguna bernyanyi fals, tetapi menunjukkan tuts mana yang meleset, memutar ulang audio di detik tersebut, dan modul AI memberikan resep latihan tangga nada solfeggio harian yang harus dilatih.</li>
    <li><strong>Kartu Hasil Tes yang Siap Dipamerkan ke Media Sosial:</strong> Menyediakan kartu hasil tes rentang vokal yang didesain estetik dan modern (seperti Spotify Wrapped) sehingga pengguna tertarik membagikannya ke Instagram Story atau WhatsApp secara sukarela.</li>
</ol>

</body>
</html>
"""

def generate_pdf():
    pdf_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.pdf'
    temp_pdf = 'D:/Kuliah/IPPL/docs/temp_render.pdf'
    
    story = fitz.Story(html=HTML_TEMPLATE)
    writer = fitz.DocumentWriter(temp_pdf)
    rect = fitz.paper_rect('a4')
    margin_x = 45
    margin_top = 45
    margin_bottom = 45
    where = rect + (margin_x, margin_top, -margin_x, -margin_bottom)
    
    more = 1
    while more:
        device = writer.begin_page(rect)
        more, _ = story.place(where)
        story.draw(device)
        writer.end_page()
    writer.close()
    
    doc = fitz.open(temp_pdf)
    total_pages = doc.page_count
    
    for idx, page in enumerate(doc):
        # Header from page 2
        if idx > 0:
            page.insert_text(fitz.Point(margin_x, 32), "VocalSense AI - Tugas Rekayasa Perangkat Lunak (IPPL)", fontsize=8, fontname="times-italic", color=(0.3, 0.3, 0.3))
            page.insert_text(fitz.Point(rect.width - margin_x - 130, 32), "Rafael Hotdion L.T (11241075)", fontsize=8, fontname="times-italic", color=(0.3, 0.3, 0.3))
            page.draw_line(fitz.Point(margin_x, 35), fitz.Point(rect.width - margin_x, 35), color=(0.6, 0.6, 0.6), width=0.5)
            
        # Footer all pages
        page.draw_line(fitz.Point(margin_x, rect.height - 35), fitz.Point(rect.width - margin_x, rect.height - 35), color=(0.6, 0.6, 0.6), width=0.5)
        page.insert_text(fitz.Point(margin_x, rect.height - 24), "Dokumen Tugas IPPL", fontsize=8, fontname="times-italic", color=(0.4, 0.4, 0.4))
        p_str = f"Halaman {idx + 1} dari {total_pages}"
        page.insert_text(fitz.Point(rect.width - margin_x - 65, rect.height - 24), p_str, fontsize=8, fontname="times-roman", color=(0.3, 0.3, 0.3))
        
    doc.save(pdf_path)
    doc.close()
    del doc
    
    import time
    time.sleep(0.1)
    if os.path.exists(temp_pdf):
        try:
            os.remove(temp_pdf)
        except Exception:
            pass
            
    print(f"Compact, natural student PDF generated at: {pdf_path} (Total Pages: {total_pages})")

def generate_docx():
    docx_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.docx'
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.85)
        section.bottom_margin = Inches(0.85)
        section.left_margin = Inches(0.85)
        section.right_margin = Inches(0.85)
        
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(10.5)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    
    # Header Identitas
    p_h = doc.add_paragraph()
    p_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p_h.add_run("TUGAS REKAYASA PERANGKAT LUNAK (IPPL)\n")
    r.bold = True
    r.font.size = Pt(13)
    r2 = p_h.add_run("Analisis Perancangan, Metodologi, Bisnis, Pengujian, dan Strategi Produk")
    r2.bold = True
    r2.font.size = Pt(10.5)
    
    t_info = doc.add_table(rows=2, cols=4)
    for r in t_info.rows:
        for c in r.cells:
            c.width = Inches(1.6)
            
    t_info.rows[0].cells[0].text = "Nama Mahasiswa"
    t_info.rows[0].cells[1].text = ": Rafael Hotdion L.T"
    t_info.rows[0].cells[2].text = "Topik Proyek"
    t_info.rows[0].cells[3].text = ": VocalSense AI"
    
    t_info.rows[1].cells[0].text = "NIM"
    t_info.rows[1].cells[1].text = ": 11241075"
    t_info.rows[1].cells[2].text = "Fokus Sistem"
    t_info.rows[1].cells[3].text = ": AI Singing & Vocal Trainer"
    
    for row in t_info.rows:
        for idx in [0, 2]:
            row.cells[idx].paragraphs[0].runs[0].bold = True
            
    doc.add_paragraph("―" * 58).paragraph_format.space_after = Pt(8)
    
    # ================= 1. ALUR REQUIREMENT & ALUR DATA =================
    doc.add_heading("1. Alur Requirement dan Alur Data Proyek", level=1)
    
    doc.add_heading("A. Alur Rekayasa Kebutuhan (Requirement Engineering)", level=2)
    doc.add_paragraph(
        "Alur penentuan kebutuhan pada proyek VocalSense AI mengikuti siklus rekayasa kebutuhan perangkat lunak formal yang terdiri dari 5 tahap:\n"
        "1. Identifikasi Kebutuhan (Elicitation): Menggali permasalahan utama pengguna, yaitu banyak orang ingin belajar menyanyi namun terhambat biaya les vokal yang mahal (Rp 500.000–Rp 2.000.000/bulan) dan rasa malu saat bernyanyi fals di depan orang lain. Solusi yang dirancang adalah aplikasi web pelatih vokal mandiri dengan analisis nada otomatis (mengacu pada referensi web akustik VoiceGenderAnalyzer.com).\n"
        "2. Analisis Kebutuhan (Analysis): Mengelompokkan kebutuhan ke dalam Kebutuhan Fungsional (24 fitur utama: penala nada dasar, perekam Web Audio, deteksi nada fals, rapor Piano Roll, dan kurikulum latihan AI) serta Kebutuhan Non-Fungsional (ekstraksi nada <= 4 detik, antarmuka responsif, dan keamanan data).\n"
        "3. Spesifikasi Kebutuhan (Specification): Menuangkan kebutuhan ke dalam dokumen formal Software Requirements Specification (SRS) dan Use Case Diagram (24 use case dengan 2 aktor manusia: Pengguna dan Administrator).\n"
        "4. Validasi Kebutuhan (Validation): Melakukan peninjauan dan asistensi bersama pembimbing (Kak Rahmi) untuk memastikan diagram valid (hanya aktor manusia di use case, label percabangan [ ], dan relasi 1:1 antar diagram).\n"
        "5. Manajemen Kebutuhan (Management): Mengunci spesifikasi kebutuhan ke dalam Product Backlog sebagai acuan pembagian sprint pengembangan."
    )
    
    doc.add_heading("Bagan Alur Rekayasa Kebutuhan:", level=3)
    steps_req = [
        "1. Identifikasi Masalah: Riset kendala latihan vokal solo & studi referensi web akustik peramban.",
        "2. Analisis Kebutuhan: Perumusan 24 Kebutuhan Fungsional (FR) dan Kebutuhan Non-Fungsional (NFR).",
        "3. Spesifikasi & Pemodelan: Penyusunan dokumen SRS, Use Case 24 UC, Activity, dan Sequence MVC.",
        "4. Validasi Asistensi: Evaluasi kesesuaian kaidah asistensi (aktor use case manusia, label decision [ ]).",
        "5. Baseline Product Backlog: Pengesahan spesifikasi kebutuhan untuk diimplementasikan ke sprint."
    ]
    for s in steps_req:
        p = doc.add_paragraph(f"• {s}")
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)

    doc.add_heading("B. Alur Data Sistem (Data Flow)", level=2)
    doc.add_paragraph(
        "Alur data menjelaskan perpindahan dan pengolahan data dari suara pengguna hingga menjadi rapor evaluasi:\n"
        "1. Input Suara: Pengguna bernyanyi melalui mikrofon peramban, ditangkap oleh Web Audio API secara lokal menjadi aliran data audio PCM 44.1 kHz. Modul noise filter membersihkan desis ruangan.\n"
        "2. Visualisasi Waktu Nyata: Selama bernyanyi, sistem mengekstrak frekuensi dasar (F0) secara langsung dan menampilkan garis kurva nada berjalan di atas tuts piano roll pada layar.\n"
        "3. Ekstraksi Fitur Vokal (DSP Engine): Setelah selesai merekam, file audio dikirim ke server. Algoritma YIN mengekstrak frekuensi nada dasar (F0), mengonversinya ke notasi musik (MIDI), menghitung deviasi nada (Cents), menentukan status nada (In-Tune, Flat, atau Sharp), serta mengukur getaran vibrato (5–7 Hz) dan stabilitas penahanan nada.\n"
        "4. Penyimpanan Berjenjang:\n"
        "   - Free Tier: Data hasil hanya diproses di memori RAM dan ditampilkan di layar tanpa disimpan ke basis data.\n"
        "   - Pro/Premium: File rekaman disimpan di Cloud Storage dan metrik nilai disimpan permanen di database PostgreSQL.\n"
        "5. Pembuatan Kurikulum AI (Khusus Premium): Catatan nada fals dikirim ke Google Gemini AI untuk menghasilkan silabus latihan tangga nada (solfeggio drills) harian.\n"
        "6. Output Rapor: Sistem menampilkan Rapor Bernyanyi berisi Skor (0–100), Radar Chart, tuts Piano Roll interaktif (bisa diklik untuk mendengar detik nada fals), dan tombol unduh sertifikat PDF."
    )
    
    doc.add_heading("Bagan Alur Data Sistem:", level=3)
    steps_data = [
        "Input: Suara mikrofon penyanyi -> Web Audio API (PCM 44.1 kHz & filter noise).",
        "Live Stream: Koordinat nada F0 dirender seketika menjadi kurva visual di atas tuts piano.",
        "Pemrosesan Audio (AI Engine): Ekstraksi YIN F0 -> Konversi MIDI & Cents -> Deteksi Flat/Sharp -> Vibrato.",
        "Penyimpanan: Free (hanya memori RAM) | Pro/Premium (simpan database PostgreSQL & Cloud Storage S3).",
        "Analisis AI (Premium): Gemini LLM merumuskan silabus latihan tangga nada solfeggio harian.",
        "Output: Skor bernyanyi, Piano Roll interaktif (Note-Sync Playback), dan lembar rapor PDF."
    ]
    for s in steps_data:
        p = doc.add_paragraph(f"• {s}")
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(2)

    # ================= 2. METODE PENGEMBANGAN =================
    doc.add_heading("2. Metode Pengembangan Perangkat Lunak", level=1)
    doc.add_heading("A. Metode yang Digunakan: Agile (Framework Scrum)", level=2)
    doc.add_paragraph("Pengembangan VocalSense AI menggunakan metode Agile dengan kerangka kerja Scrum.")
    
    doc.add_heading("B. Alasan Pemilihan Metode", level=2)
    doc.add_paragraph(
        "1. Karakteristik Pemrosesan Audio yang Eksperimental: Penalaan algoritma deteksi nada (ambang batas cents dan filter kebisingan mic) memerlukan pengujian berulang dengan suara penyanyi asli. Scrum memungkinkan pengujian dan penyesuaian fungsi di setiap akhir sprint.\n"
        "2. Kemudahan Mengakomodasi Umpan Balik: Dalam perkuliahan rekayasa perangkat lunak, arahan dan masukan dari dosen/pembimbing dapat langsung dimasukkan ke sprint berikutnya tanpa mengulang perancangan dari awal.\n"
        "3. Pengembangan Bertahap dan Terukur: Setiap fitur utama diselesaikan secara bertahap dalam siklus 2 mingguan sehingga sistem selalu memiliki modul yang berfungsi secara nyata."
    )
    
    doc.add_heading("C. Rencana Pembagian Sprint (4 Sprint x 2 Minggu)", level=2)
    doc.add_paragraph(
        "• Sprint 1 (Fondasi & Desain Sistem): Pembuatan dokumen SRS & SDD, perancangan skema database PostgreSQL, pembuatan 56 diagram Draw.io hitam-putih, serta implementasi registrasi dan login akun (JWT & Google OAuth).\n"
        "• Sprint 2 (Perekam Audio & Tuner): Pembuatan modul penangkap suara Web Audio API, Digital Chromatic Tuner, tes rentang vokal (Vocal Range Finder), perekam vokal langsung dengan visualizer kurva pitch, dan pemotong audio (trimmer).\n"
        "• Sprint 3 (Mesin Analisis Nada & Rapor Piano Roll): Implementasi algoritma ekstraksi pitch YIN F0, deteksi nada fals (flat/sharp), pengukuran vibrato 5–7 Hz, kanvas Piano Roll interaktif, pemutaran sinkron nada fals (Note-Sync Playback), dan ekspor rapor PDF.\n"
        "• Sprint 4 (Kurikulum AI, Monetisasi & Finalisasi): Integrasi Gemini AI untuk jadwal latihan tangga nada harian, grafik pelacakan kemajuan mingguan, streak latihan harian, gateway pembayaran Midtrans Snap, panel admin, serta pengujian akhir sistem."
    )

    # ================= 3. STRATEGI PEMASARAN & PENDAPATAN =================
    doc.add_heading("3. Strategi Pemasaran dan Model Pendapatan (Income)", level=1)
    doc.add_heading("A. Model Pendapatan (Monetisasi Freemium SaaS)", level=2)
    doc.add_paragraph(
        "Sistem menerapkan model bisnis langganan bertingkat (Freemium):\n"
        "1. Free Tier (Gratis): Pengguna dapat mencoba tes rentang vokal instan dan merekam suara latihan bernyanyi maksimal 60 detik dengan visualisasi nada langsung. Fitur ini tidak menyimpan riwayat rapor dan berfungsi untuk menarik pengguna baru sebanyak-banyaknya tanpa hambatan.\n"
        "2. Pro Tier (Rp 49.000 / bulan): Menyediakan durasi rekam hingga 5 menit (cukup untuk 1 lagu penuh), penyimpanan riwayat rapor tanpa batas, fitur Note-Sync Playback (klik balok nada fals di Piano Roll untuk memutar ulang audio di detik tersebut), komparasi sebelum vs sesudah latihan, dan unduh lembar rapor PDF. Target: penyanyi hobi, anggota paduan suara, dan pembuat cover musik.\n"
        "3. Premium Tier (Rp 99.000 / bulan): Seluruh fitur Pro ditambah durasi rekam 15 menit, grafik pelacakan kemajuan nada mingguan, fitur streak latihan harian, serta asisten AI Vocal Coach (Gemini AI) yang membuatkan kurikulum latihan tangga nada solfeggio harian sesuai titik kelemahan nada pengguna. Target: vokalis semi-profesional dan calon peserta audisi."
    )
    
    doc.add_heading("B. Strategi Pemasaran", level=2)
    doc.add_paragraph(
        "1. Product-Led Growth (Fitur Coba Instan & Kartu Hasil): Pengguna bisa langsung mencoba tes rentang vokal di halaman depan tanpa harus membuat akun. Hasil tes menampilkan kartu profil suara yang estetik (contoh: 'Vocal Range: C3 - G4 [Bariton]') dilengkapi tombol bagikan ke Instagram Story atau WhatsApp.\n"
        "2. Konten Edukasi Media Sosial (TikTok & Reels): Membuat video pendek yang menarik, seperti menganalisis akurasi nada dan vibrato penyanyi terkenal menggunakan Piano Roll, serta video tips memperbaiki nada fals saat bernyanyi.\n"
        "3. Kerja Sama Komunitas Paduan Suara & Kampus: Bekerja sama dengan Unit Kegiatan Mahasiswa (UKM) Paduan Suara Mahasiswa (PSM) dan komunitas karaoke dengan memberikan akses coba gratis paket Pro selama 30 hari.\n"
        "4. Optimasi Mesin Pencari (SEO): Menargetkan kata kunci pencarian populer di Google, seperti 'tes jangkauan vokal online', 'cara cek nada fals', dan 'latihan vokal mandiri'."
    )

    # ================= 4. METODE PENGUJIAN & TEST CASE =================
    doc.add_heading("4. Metode Pengujian dan Tabel Test Case", level=1)
    doc.add_heading("A. Metode Pengujian yang Digunakan", level=2)
    doc.add_paragraph(
        "1. Black Box Testing: Menguji alur fitur dari sisi pengguna tanpa melihat kode internal (validasi form login, pembatasan durasi rekam sesuai tier, dan respon tombol pemutar audio).\n"
        "2. White Box / Unit Testing: Menguji fungsi perhitungan matematis algoritma audio menggunakan pytest (akurasi deteksi frekuensi nada, rumus konversi MIDI, dan kalkulasi deviasi cents).\n"
        "3. Integration Testing: Menguji kelancaran komunikasi antar modul: pengiriman data audio dari browser ke server, integrasi respon AI Gemini, dan webhook pembayaran Midtrans."
    )
    
    doc.add_heading("B. Tabel Skenario Pengujian (Test Case)", level=2)
    tc_data = [
        ("TC-01", "Autentikasi", "Daftar akun dengan email yang sudah ada", "1. Buka form registrasi.\n2. Masukkan email duplikat.\n3. Klik tombol Daftar.", "Sistem menolak dan menampilkan pesan 'Email sudah terdaftar'.", "Pass"),
        ("TC-02", "Tuner Nada", "Pengujian kalibrasi nada murni A4 (440 Hz)", "1. Buka fitur Chromatic Tuner.\n2. Bunyikan nada acuan 440 Hz ke mikrofon.", "Jarum tuner menunjuk nada A4 (MIDI 69) dengan deviasi 0 +- 2 cents dan lampu hijau menyala.", "Pass"),
        ("TC-03", "Perekam Vokal", "Batas waktu rekam akun Free (60 detik)", "1. Rekam suara pada akun Free.\n2. Biarkan perekaman berjalan hingga detik 60.", "Perekaman otomatis berhenti di detik ke-60 dan sistem membuka halaman analisis.", "Pass"),
        ("TC-04", "AI Audio Engine", "Deteksi nada Flat (< -20 cents) & Sharp (> +20 cents)", "1. Unggah file audio uji nada 430 Hz & 450 Hz.\n2. Jalankan analisis nada.", "Sistem menandai nada 430 Hz sebagai 'Flat' dan nada 450 Hz sebagai 'Sharp' secara tepat.", "Pass"),
        ("TC-05", "Piano Roll", "Fitur Note-Sync Playback pada nada fals", "1. Buka rapor evaluasi vokal.\n2. Klik balok nada fals merah di detik 00:14.", "Audio player langsung melompat (seek) dan memutar suara vokal tepat di detik ke-14.", "Pass"),
        ("TC-06", "Pembayaran", "Aktivasi paket langganan setelah bayar", "1. Pilih paket Pro bulanan.\n2. Selesaikan pembayaran di Midtrans.", "Status langganan akun otomatis aktif menjadi Pro dan kuota rekam bertambah jadi 5 menit.", "Pass")
    ]
    
    t_tc = doc.add_table(rows=len(tc_data)+1, cols=6)
    t_tc.style = 'Table Grid'
    t_tc.columns[0].width = Inches(0.8)
    t_tc.columns[1].width = Inches(1.1)
    t_tc.columns[2].width = Inches(1.6)
    t_tc.columns[3].width = Inches(1.5)
    t_tc.columns[4].width = Inches(1.6)
    t_tc.columns[5].width = Inches(0.6)
    
    headers = ["ID", "Modul", "Skenario Pengujian", "Langkah Pengujian", "Hasil yang Diharapkan", "Status"]
    for idx, h in enumerate(headers):
        c = t_tc.rows[0].cells[idx]
        c.text = h
        c.paragraphs[0].runs[0].bold = True
        set_cell_background(c, "EBEBEB")
        
    for r_idx, row_vals in enumerate(tc_data):
        row = t_tc.rows[r_idx+1]
        for c_idx, val in enumerate(row_vals):
            c = row.cells[c_idx]
            c.text = val
            if c_idx in [0, 5]:
                c.paragraphs[0].runs[0].bold = True
                c.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER

    # ================= 5. STRATEGI ADOPSI =================
    doc.add_heading("5. Strategi Agar Orang Lain Mau Menggunakan Sistem", level=1)
    doc.add_paragraph(
        "Strategi agar VocalSense AI diminati dan digunakan secara rutin oleh masyarakat bertumpu pada 6 pendekatan nyata:\n"
        "1. Bisa Langsung Digunakan Tanpa Registrasi: Pengguna baru dapat langsung mencoba fitur tes rentang vokal dan perekaman 60 detik tanpa harus repot mendaftar akun atau memasukkan kartu kredit. Kemudahan ini menghilangkan keraguan pengguna pertama kali.\n"
        "2. Umpan Balik Cepat dalam Hitungan Detik: Begitu pengguna menyanyikan satu nada ke mikrofon, grafik kurva nada langsung bergerak di tuts piano dan sistem memberi tahu tipe suaranya (Bass, Bariton, Tenor, dll). Hal ini memberikan kepuasan instan yang memicu rasa penasaran untuk mencoba lagu penuh.\n"
        "3. Solusi untuk Masalah Biaya dan Rasa Malu:\n"
        "   - Faktor Biaya: Biaya les vokal privat sangat mahal (Rp 500rb–Rp 2jt/bulan). VocalSense AI menyediakan bimbingan objektif 24 jam dengan biaya sangat terjangkau (Rp 49.000/bulan).\n"
        "   - Faktor Kenyamanan: Banyak orang pemula merasa malu jika bernyanyi fals di depan guru les. Aplikasi ini memberikan ruang latihan mandiri yang privat tanpa rasa canggung atau dihakimi.\n"
        "4. Membentuk Kebiasaan Latihan (Daily Streak & Badges): Menerapkan konsep gamifikasi (seperti Duolingo) dengan fitur pencatat konsistensi hari latihan bernyanyi harian (streak) dan lencana pencapaian. Dasbor yang memperlihatkan grafik rentang nada bertambah luas dari minggu ke minggu membuat pengguna merasa latihannya membuahkan hasil nyata.\n"
        "5. Bukan Sekadar Menilai, tapi Memberi Solusi Perbaikan: Aplikasi tidak hanya memberi tahu skor bahwa pengguna bernyanyi fals, tetapi menunjukkan tuts mana yang meleset, memutar ulang audio di detik tersebut, dan modul AI memberikan resep latihan tangga nada solfeggio harian yang harus dilatih.\n"
        "6. Kartu Hasil Tes yang Siap Dipamerkan ke Media Sosial: Menyediakan kartu hasil tes rentang vokal yang didesain estetik dan modern (seperti Spotify Wrapped) sehingga pengguna tertarik membagikannya ke Instagram Story atau WhatsApp secara sukarela."
    )
    
    doc.save(docx_path)
    print(f"Compact, natural student DOCX generated at: {docx_path}")

def set_cell_background(cell, hex_color="E0E0E0"):
    tblCell = cell._tc
    tblCellProperties = tblCell.get_or_add_tcPr()
    clShading = OxmlElement('w:shd')
    clShading.set(qn('w:val'), 'clear')
    clShading.set(qn('w:color'), 'auto')
    clShading.set(qn('w:fill'), hex_color)
    tblCellProperties.append(clShading)

if __name__ == "__main__":
    generate_pdf()
    generate_docx()
