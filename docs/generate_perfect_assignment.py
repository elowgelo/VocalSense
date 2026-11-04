import fitz
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
import os

HTML_CONTENT = """
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
        font-size: 9.8pt;
        line-height: 1.36;
        color: #000000;
    }
    
    /* Judul Utama Bersih & Formal */
    .header-container {
        text-align: center;
        margin-bottom: 16px;
    }
    .header-title {
        font-size: 13pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0;
    }
    .header-subtitle {
        font-size: 10pt;
        color: #111111;
        margin-top: 4px;
        margin-bottom: 0;
    }
    
    /* Tabel Identitas Mahasiswa Formal Bersih (Tanpa Background Abu-Abu) */
    .identity-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 18px;
    }
    .identity-table td {
        border: 1px solid #000000;
        padding: 5px 12px;
        font-size: 9.5pt;
    }
    .identity-table td.col-label {
        width: 24%;
        font-weight: bold;
    }
    .identity-table td.col-val {
        width: 76%;
    }
    
    /* Judul Pemisah Antar Soal (Bersih, Rapi, Tanpa Kotak, Garis Bawah Pemisah) */
    .soal-title {
        font-size: 11pt;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.3px;
        color: #000000;
        margin-top: 18px;
        margin-bottom: 8px;
        padding-bottom: 3px;
        border-bottom: 1.5px solid #000000;
    }
    
    /* Sub-Heading Bagian */
    .sub-title {
        font-size: 10pt;
        font-weight: bold;
        margin-top: 12px;
        margin-bottom: 5px;
        color: #000000;
    }
    
    p {
        margin-top: 3px;
        margin-bottom: 7px;
        text-align: justify;
    }
    ol, ul {
        margin-top: 3px;
        margin-bottom: 7px;
        padding-left: 20px;
    }
    li {
        margin-bottom: 3px;
        text-align: justify;
    }
    
    /* Flowchart Container Rapi & Utuh (Tanpa Background Abu-Abu) */
    .flow-container {
        margin-top: 6px;
        margin-bottom: 12px;
    }
    .flow-wrapper {
        margin: 4px 0 0 0;
    }
    .flow-card {
        border: 1px solid #000000;
        padding: 5px 10px;
        font-size: 9pt;
        margin: 2px 0;
    }
    .flow-card strong {
        color: #000000;
    }
    .flow-arrow {
        text-align: center;
        font-weight: bold;
        font-size: 10pt;
        line-height: 1.1;
        margin: 1px 0;
        color: #000000;
    }
    
    /* Tabel Data Uji Test Case Formal Bersih (Tanpa Background Abu-Abu) */
    table.formal-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8px;
        margin-bottom: 12px;
        font-size: 8.8pt;
    }
    table.formal-table th {
        border: 1px solid #000000;
        font-weight: bold;
        padding: 5px 6px;
        text-align: center;
    }
    table.formal-table td {
        border: 1px solid #000000;
        padding: 4px 6px;
        vertical-align: top;
    }
    table.formal-table td.center {
        text-align: center;
    }
    table.formal-table td.bold {
        font-weight: bold;
    }
    
    .page-break {
        page-break-before: always;
        break-before: page;
    }
</style>
</head>
<body>

<!-- ================= HALAMAN 1 ================= -->
<div class="header-container">
    <div class="header-title">Tugas Rekayasa Perangkat Lunak (IPPL)</div>
    <div class="header-subtitle">Analisis Perancangan Sistem, Metodologi Pengembangan, Bisnis, Pengujian, dan Retensi Pengguna</div>
</div>

<table class="identity-table">
    <tr>
        <td class="col-label">Nama Mahasiswa</td>
        <td class="col-val"><strong>Rafael Hotdion L.T</strong></td>
    </tr>
    <tr>
        <td class="col-label">NIM</td>
        <td class="col-val"><strong>11241075</strong></td>
    </tr>
    <tr>
        <td class="col-label">Mata Kuliah</td>
        <td class="col-val">Rekayasa Perangkat Lunak (IPPL)</td>
    </tr>
    <tr>
        <td class="col-label">Topik Proyek</td>
        <td class="col-val"><strong>VocalSense AI</strong> (Platform Analisis Suara Bernyanyi dan Pelatih Vokal Cerdas)</td>
    </tr>
</table>

<div class="soal-title">1. Alur Requirement dan Alur Data Proyek</div>

<div class="sub-title">A. Alur Rekayasa Kebutuhan (Requirement Engineering Lifecycle)</div>
<p>
    Alur penentuan dan perumusan kebutuhan pada proyek <strong>VocalSense AI</strong> mengikuti 5 tahapan rekayasa kebutuhan perangkat lunak formal:
</p>
<ol>
    <li><strong>Identifikasi Kebutuhan (Requirement Elicitation):</strong>
        Menggali masalah mendasar dari para penyanyi pemula: tingginya biaya les privat vokal (Rp 500.000&ndash;Rp 2.000.000/bulan), jadwal les yang kaku, serta rasa minder/malu saat menyanyi fals di depan instruktur. Solusi yang dirancang adalah aplikasi web pelatih vokal mandiri yang memberikan evaluasi nada secara otomatis (mengacu pada referensi web akustik <em>VoiceGenderAnalyzer.com</em> yang membuktikan pemrosesan audio lokal peramban via Web Audio API dapat berjalan cepat, tanpa latensi, dan ramah privasi).
    </li>
    <li><strong>Analisis Kebutuhan (Requirement Analysis):</strong>
        Mengelompokkan kebutuhan ke dalam 24 Kebutuhan Fungsional (FR-001 s/d FR-024) dan 5 Kebutuhan Non-Fungsional (NFR: performa ekstraksi suara &le; 4 detik, visualizer pitch peramban &ge; 30 FPS, dan keamanan data). Di tahap ini juga dirumuskan pembagian hak akses bertingkat (Freemium): <em>Free Tier</em>, <em>Pro Tier</em>, dan <em>Premium Tier</em>.
    </li>
    <li><strong>Spesifikasi &amp; Pemodelan (Requirement Specification):</strong>
        Menuangkan kebutuhan ke dalam dokumen formal Software Requirements Specification (SRS) dan Software Design Document (SDD). Memodelkan 24 Use Case dengan kaidah ketat asistensi pembimbing (hanya memodelkan 2 aktor manusia: Pengguna dan Administrator; sementara Google OAuth, Midtrans, dan Gemini AI berada di backend). Menyusun 24 Activity Diagram (3 swimlane, label percabangan [ ]) dan 24 Sequence Diagram berorientasi MVC (User &rarr; View &rarr; Controller &rarr; Service &rarr; Database).
    </li>
    <li><strong>Validasi Kebutuhan (Requirement Validation):</strong>
        Melakukan asistensi dan peninjauan bersama pembimbing (Kak Rahmi) guna memverifikasi konsistensi pemetaan 1:1 antara use case, diagram aktivitas, dan diagram sekuensial, serta memvalidasi formula matematis DSP (algoritma YIN, MIDI, Cents, dan vibrato).
    </li>
    <li><strong>Manajemen Kebutuhan (Requirement Management):</strong>
        Mengunci spesifikasi kebutuhan ke dalam <em>Product Backlog</em> yang siap diimplementasikan secara terukur ke dalam sprint pengembangan.
    </li>
</ol>

<!-- ================= HALAMAN 2 ================= -->
<div class="page-break"></div>

<div class="flow-container">
    <p style="font-weight: bold; margin-bottom: 4px;">Diagram Alir Rekayasa Kebutuhan (Requirement Flowchart):</p>
    <div class="flow-wrapper">
        <div class="flow-card"><strong>1. Identifikasi Masalah:</strong> Riset kendala latihan solo fals, survei pengguna, dan studi referensi web audio.</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>2. Analisis Kebutuhan:</strong> Perumusan 24 Kebutuhan Fungsional (FR) dan 5 Kebutuhan Non-Fungsional (NFR).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>3. Spesifikasi &amp; Pemodelan:</strong> Penyusunan dokumen SRS, Use Case 24 UC, Activity Diagram, dan Sequence MVC.</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>4. Validasi Asistensi:</strong> Evaluasi kepatuhan kaidah asistensi (aktor use case murni manusia, label [ ]).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>5. Product Backlog Baseline:</strong> Pengesahan kebutuhan untuk pembagian modul sprint pengembangan.</div>
    </div>
</div>

<div class="sub-title">B. Alur Data Sistem (Data Flow Lifecycle)</div>
<p>
    Alur data menjelaskan perpindahan sinyal suara pengguna hingga diolah menjadi metrik rapor evaluasi dan kurikulum AI:
</p>
<ol>
    <li><strong>Penangkapan Suara (Audio Ingestion):</strong>
        Suara penyanyi ditangkap oleh mikrofon peramban melalui <em>Web Audio API</em> (MediaStreamAudioSourceNode) menjadi sinyal digital PCM 44.1 kHz. Modul pre-processing menerapkan <em>noise gate</em> untuk meredam desis ruangan dan normalisasi desibel RMS.
    </li>
    <li><strong>Visualisasi Waktu Nyata (Live Coordinate Streaming):</strong>
        AnalyserNode mengekstrak frekuensi dasar ($F_0$) secara instan dan mengalirkan koordinat ke kanvas peramban untuk merender kurva nada berjalan (<em>live rolling pitch curve</em>, 55&ndash;880 Hz) di atas tuts piano roll.
    </li>
    <li><strong>Ekstraksi Fitur Vokal (AI Audio Engine):</strong>
        Setelah rekaman selesai atau file audio diunggah, audio dikirim ke server pemrosesan (FastAPI Python worker). Algoritma <em>YIN CMNDF</em> mengekstrak frekuensi dasar $F_0$ (Hz) per frame audio 2048 sampel. Frekuensi dikonversi ke notasi MIDI ($m = 69 + 12\log_2(F_0/440)$) dan dihitung deviasi logaritmik Cents ($\Delta\text{cents} = 1200\log_2(F_0/F_{\text{target}})$). Sistem mengklasifikasikan nada menjadi <em>In-Tune</em> (&plusmn;20 cents), <em>Flat</em> (&lt; -20 cents), atau <em>Sharp</em> (&gt; +20 cents), serta mengukur osilasi vibrato (5.0&ndash;7.0 Hz), sustain, dan resonansi timbre.
    </li>
    <li><strong>Penyimpanan Data Berjenjang:</strong>
        Pada akun Free, hasil hanya diolah sementara di RAM tanpa disimpan permanen. Pada akun Pro dan Premium, file rekaman diunggah ke Cloud Storage (S3) dengan Pre-signed URL aman (60 menit), metadata rapor disimpan di PostgreSQL (<em>vocal_reports</em>), dan diagregasikan ke grafik tren mingguan (<em>progress_trackings</em>).
    </li>
    <li><strong>Pembuatan Kurikulum AI (Khusus Premium):</strong>
        Daftar nada fals diekstrak ke dalam prompt terstruktur dan dikirim ke Google Gemini AI untuk merumuskan kurikulum latihan tangga nada harian (Solfeggio Drills 7&ndash;30 hari) yang disimpan pada tabel <em>ai_practice_plans</em>.
    </li>
    <li><strong>Penyajian Rapor &amp; Fitur Interaktif:</strong>
        Frontend menyajikan Rapor Bernyanyi: Skor (0&ndash;100), Radar Chart 5 dimensi vokal, kanvas Piano Roll interaktif, fitur Note-Sync Playback (klik balok fals melompatkan pemutaran audio ke detik tersebut), dan opsi ekspor sertifikat resmi format PDF.
    </li>
</ol>

<!-- ================= HALAMAN 3 ================= -->
<div class="page-break"></div>

<div class="flow-container">
    <p style="font-weight: bold; margin-bottom: 4px;">Diagram Alir Perpindahan Data Sistem (Data Pipeline Flowchart):</p>
    <div class="flow-wrapper">
        <div class="flow-card"><strong>1. Input Suara:</strong> Gelombang suara mikrofon &rarr; Web Audio API (PCM 44.1 kHz &amp; filter noise).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>2. Real-time Streaming:</strong> Koordinat nada F0 dirender seketika menjadi kurva visual di atas tuts piano.</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>3. DSP Audio Engine:</strong> Ekstraksi YIN F0 &rarr; Konversi MIDI &amp; Cents &rarr; Deteksi Flat/Sharp &rarr; Vibrato (5-7 Hz).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>4. Penyimpanan:</strong> Free (hanya memori RAM) | Pro/Premium (simpan database PostgreSQL &amp; Cloud Storage S3).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>5. AI Synthesis:</strong> Gemini LLM merumuskan silabus latihan tangga nada solfeggio harian (khusus Premium).</div>
        <div class="flow-arrow">&darr;</div>
        <div class="flow-card"><strong>6. Output Rapor:</strong> Skor bernyanyi, Piano Roll interaktif (Note-Sync Playback), dan lembar rapor PDF.</div>
    </div>
</div>

<div class="soal-title">2. Metode Pengembangan Perangkat Lunak (SDLC)</div>

<div class="sub-title">A. Metode yang Dipilih: Agile Development (Framework Scrum)</div>
<p>
    Pengembangan VocalSense AI menggunakan pendekatan <strong>Agile Software Development</strong> dengan kerangka kerja <strong>Scrum</strong>.
</p>

<div class="sub-title">B. Alasan Pemilihan Metode (Rationale &amp; Keunggulan)</div>
<ol>
    <li><strong>Karakteristik Pemrosesan Audio yang Eksperimental:</strong> Penalaan parameter algoritma deteksi nada (ambang batas cents, noise gate mikrofon, dan laju vibrato) membutuhkan pengujian empiris berulang pada berbagai karakter suara asli manusia. Model Scrum memungkinkan pengujian dan penyempurnaan algoritma di setiap akhir sprint.</li>
    <li><strong>Kemudahan Mengakomodasi Umpan Balik Asistensi Dosen/Pembimbing:</strong> Dalam pengerjaan proyek mata kuliah, arahan dan masukan dari dosen/pembimbing (seperti revisi Kak Rahmi terkait aturan UML dan format hitam-putih) dapat langsung diintegrasikan ke sprint berikutnya tanpa membongkar ulang sistem dari awal.</li>
    <li><strong>Pengembangan Bertahap dan Terukur:</strong> Alih-alih mengintegrasikan seluruh sistem di fase akhir, Scrum membagi pengembangan ke dalam modul-modul fungsional teruji (Web Audio &rarr; AI Audio Engine &rarr; Database PostgreSQL &rarr; Gateway Midtrans).</li>
</ol>

<div class="sub-title">C. Rencana Pembagian Sprint Pengembangan (4 Sprint x 2 Minggu)</div>
<ul>
    <li><strong>Sprint 1 (Fondasi Arsitektur, Desain Sistem &amp; Autentikasi Pengguna):</strong> Finalisasi dokumen formal SRS &amp; SDD, pembuatan 56 diagram Draw.io hitam-putih, perancangan skema database PostgreSQL, serta implementasi autentikasi akun (JWT dan Google OAuth 2.0) (FR-001 s/d FR-005).</li>
    <li><strong>Sprint 2 (Core Audio Engine, Tuner &amp; Perekam Web Audio):</strong> Implementasi penangkapan audio browser via Web Audio API, Digital Chromatic Tuner, tes rentang vokal (Vocal Range Finder), perekam bernyanyi langsung dengan rolling pitch visualizer, serta pemotong audio (trimmer) (FR-006 s/d FR-010).</li>
    <li><strong>Sprint 3 (Mesin Analisis Nada &amp; Rapor Piano Roll):</strong> Integrasi algoritma ekstraksi nada YIN F0, kalkulasi deviasi Cents, klasifikasi Flat/Sharp, pengukuran vibrato 5&ndash;7 Hz, kanvas Piano Roll interaktif, fitur Note-Sync Playback, penyimpanan rapor ke S3, dan ekspor sertifikat/rapor PDF (FR-011 s/d FR-016).</li>
    <li><strong>Sprint 4 (Personalized AI Coach, Payment Gateway Midtrans &amp; Final Testing):</strong> Integrasi Gemini AI untuk rekomendasi latihan tangga nada solfeggio harian, integrasi Midtrans Snap API (QRIS/GoPay) untuk upgrade Pro/Premium, pengujian menyeluruh (Black Box, Unit Testing, Load Testing), dan deployment cloud production (FR-017 s/d FR-024).</li>
</ul>

<!-- ================= HALAMAN 4 ================= -->
<div class="page-break"></div>

<div class="soal-title">3. Strategi Menghasilkan Pendapatan (Monetisasi &amp; Bisnis)</div>

<div class="sub-title">A. Model Bisnis: Freemium Software-as-a-Service (SaaS)</div>
<p>
    VocalSense AI mengadopsi model bisnis <strong>Freemium Subscription</strong> berbasis langganan bulanan dan tahunan:
</p>

<ol>
    <li><strong>Free Tier (Rp 0 &ndash; Akuisisi Pengguna Baru):</strong>
        <ul>
            <li>Akses penuh Chromatic Tuner dan Tes Rentang Vokal (Vocal Range Finder).</li>
            <li>Batas durasi rekam maksimal 60 detik per sesi (maksimal 3 kali evaluasi per hari).</li>
            <li>Hasil rapor vokal hanya tampil instan di layar dan tidak disimpan permanen ke database riwayat akun.</li>
        </ul>
    </li>
    <li><strong>Pro Tier (Rp 49.000 / bulan atau Rp 399.000 / tahun):</strong>
        <ul>
            <li>Durasi rekam bernyanyi hingga 5 menit per lagu tanpa batas jumlah sesi harian.</li>
            <li>Visualisasi kanvas Piano Roll penuh dilengkapi fitur Note-Sync Playback.</li>
            <li>Penyimpanan riwayat analisis tanpa batas dan grafik pemantauan perkembangan vokal mingguan.</li>
            <li>Ekspor Rapor Bernyanyi Resmi format PDF resolusi tinggi dan bebas iklan.</li>
        </ul>
    </li>
    <li><strong>Premium Tier + AI Coach (Rp 99.000 / bulan atau Rp 799.000 / tahun):</strong>
        <ul>
            <li>Seluruh manfaat Pro Tier.</li>
            <li>Kurikulum Latihan Vokal Harian yang Dipersonalisasi oleh AI (Google Gemini LLM merumuskan latihan tangga nada solfeggio khusus berdasarkan jenis nada yang paling sering fals).</li>
            <li>Analisis dimensi vokal lanjutan (resonansi timbre suara dan konsistensi gelombang vibrato).</li>
            <li>Akses prioritas komputasi server pemrosesan audio tercepat (&lt; 2 detik).</li>
        </ul>
    </li>
    <li><strong>Add-On / Micro-transactions:</strong>
        Opsi pembelian paket kuota analisis instan fleksibel tanpa berlangganan rutin (Rp 15.000 untuk 10 sesi rekam) serta sertifikat evaluasi vokal resmi bertanda tangan digital.
    </li>
</ol>

<div class="sub-title">B. Strategi Pemasaran &amp; Go-to-Market (GTM)</div>
<ol>
    <li><strong>Kampanye Media Sosial &amp; TikTok Karaoke Challenge:</strong> Membuat video demonstrasi visual perbandingan: <em>"Cek seberapa fals kamu saat menyanyikan nada tinggi lagu X"</em>. Visual kanvas piano roll yang memperlihatkan balok merah (fals) dan balok hijau (pas) sangat menarik dan berpotensi viral di media sosial.</li>
    <li><strong>Kemitraan Komunitas Vokal &amp; Paduan Suara:</strong> Menjalin kerja sama dengan komunitas paduan suara kampus, gereja, serta sekolah musik sebagai alat bantu latihan mandiri anggota di rumah.</li>
    <li><strong>Program Afiliasi Guru Vokal:</strong> Memberikan bagi hasil (rev-share) 20% bagi pelatih vokal independen yang merekomendasikan muridnya menggunakan VocalSense AI untuk pemantauan tugas latihan mingguan.</li>
    <li><strong>Optimasi Mesin Pencari (SEO):</strong> Menargetkan kata kunci pencarian populer di Google: <em>"tes range vokal online"</em>, <em>"cara cek nada fals"</em>, <em>"belajar vibrato vokal"</em>, dan <em>"aplikasi pelatih vokal AI"</em>.</li>
</ol>

<!-- ================= HALAMAN 5 ================= -->
<div class="page-break"></div>

<div class="soal-title">4. Metode Pengujian dan Tabel Test Case</div>

<div class="sub-title">A. Metode Pengujian yang Digunakan</div>
<ol>
    <li><strong>Black Box Testing (Boundary Value Analysis &amp; Equivalence Partitioning):</strong> Menguji fungsionalitas sistem dari sudut pandang pengguna tanpa melihat kode program internal (validasi form login, pembatasan durasi rekam sesuai tier, dan respons tombol pemutar audio).</li>
    <li><strong>White Box / Unit Testing:</strong> Pengujian unit fungsi komputasi matematis internal AI Audio Engine menggunakan <em>pytest</em> (validasi rumus YIN CMNDF, akurasi konversi MIDI A4=440Hz &rarr; 69, dan kalkulasi deviasi cents).</li>
    <li><strong>Integration Testing:</strong> Menguji komunikasi antar-modul terdistribusi: aliran blob audio dari Web Audio API ke Redis worker, verifikasi callback webhook Midtrans, dan validasi struktur JSON respon Gemini LLM API.</li>
    <li><strong>Performance &amp; Stress Testing:</strong> Memvalidasi kepatuhan terhadap NFR: komputasi analisis vokal 60 detik selesai dalam &le; 4 detik, dan rendering kurva nada pada canvas browser stabil pada &ge; 30 FPS.</li>
</ol>

<div class="sub-title">B. Tabel Skenario Pengujian (Test Case)</div>
<table class="formal-table">
    <thead>
        <tr>
            <th style="width: 11%;">ID</th>
            <th style="width: 15%;">Modul</th>
            <th style="width: 25%;">Skenario Pengujian</th>
            <th style="width: 24%;">Langkah Pengujian</th>
            <th style="width: 17%;">Hasil yang Diharapkan</th>
            <th style="width: 8%;">Status</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="center bold">TC-01</td>
            <td>Autentikasi</td>
            <td>Pendaftaran akun dengan email yang sudah ada (Negative Test)</td>
            <td>1. Buka form registrasi.<br>2. Masukkan email duplikat.<br>3. Klik tombol Daftar.</td>
            <td>Sistem menolak dan menampilkan pesan 'Email sudah terdaftar'.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-02</td>
            <td>Tuner Nada</td>
            <td>Pengujian kalibrasi nada murni A4 (440 Hz) (Positive Test)</td>
            <td>1. Buka fitur Chromatic Tuner.<br>2. Bunyikan nada acuan 440 Hz ke mikrofon.</td>
            <td>Jarum tuner menunjuk nada A4 (MIDI 69) dengan deviasi 0 &plusmn; 2 cents dan indikator hijau In-Tune menyala.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-03</td>
            <td>Perekam Vokal</td>
            <td>Batas durasi rekam akun Free tepat 60 detik (Boundary Test)</td>
            <td>1. Mulai rekam bernyanyi pada akun Free.<br>2. Biarkan timer berjalan hingga 60 detik.</td>
            <td>Tepat di detik ke-60 perekaman otomatis berhenti, blob audio dikemas, dan sistem membuka halaman analisis.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-04</td>
            <td>AI Audio Engine</td>
            <td>Deteksi nada Flat (&lt; -20 cents) &amp; Sharp (&gt; +20 cents)</td>
            <td>1. Unggah file audio nada 430 Hz &amp; 450 Hz.<br>2. Jalankan analisis nada.</td>
            <td>Sistem menandai nada 430 Hz sebagai 'Flat' dan nada 450 Hz sebagai 'Sharp' secara tepat.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-05</td>
            <td>Piano Roll</td>
            <td>Fitur Note-Sync Playback melompat ke nada fals</td>
            <td>1. Buka rapor evaluasi vokal.<br>2. Klik balok nada fals merah di detik 00:14.</td>
            <td>Audio player langsung melompat (seek) dan memutar suara vokal tepat di detik ke-14.</td>
            <td class="center bold">Pass</td>
        </tr>
        <tr>
            <td class="center bold">TC-06</td>
            <td>Pembayaran</td>
            <td>Aktivasi paket langganan setelah pelunasan Midtrans</td>
            <td>1. Pilih paket Pro bulanan.<br>2. Selesaikan pembayaran di Midtrans.</td>
            <td>Status langganan akun otomatis aktif menjadi Pro dan kuota rekam bertambah jadi 5 menit.</td>
            <td class="center bold">Pass</td>
        </tr>
    </tbody>
</table>

<!-- ================= HALAMAN 6 ================= -->
<div class="page-break"></div>

<div class="soal-title">5. Strategi Agar Orang Lain Mau Menggunakan Sistem (Adopsi &amp; Retensi)</div>
<p>
    Strategi agar VocalSense AI diminati dan digunakan secara rutin oleh masyarakat bertumpu pada 6 pendekatan nyata:
</p>
<ol>
    <li><strong>Zero-Barrier Onboarding (Bisa Digunakan Tanpa Registrasi):</strong>
        Pengguna baru dapat langsung mencoba fitur tes rentang vokal dan perekaman 60 detik tanpa harus repot mendaftar akun atau memasukkan kartu kredit. Kemudahan ini memangkas keraguan awal pengguna dan menurunkan <em>bounce rate</em> secara signifikan.
    </li>
    <li><strong>Umpan Balik Cepat dalam Hitungan Detik:</strong>
        Begitu pengguna menyanyikan satu nada ke mikrofon, grafik kurva nada langsung bergerak di tuts piano dan sistem memberi tahu tipe suaranya (Bass, Bariton, Tenor, Sopran). Umpan balik visual yang instan ini menghadirkan kepuasan langsung (<em>wow factor</em>) yang memicu rasa penasaran untuk mencoba lagu penuh.
    </li>
    <li><strong>Solusi untuk Masalah Biaya dan Rasa Malu:</strong>
        <ul>
            <li><em>Faktor Biaya:</em> Les vokal privat konvensional berbiaya mahal (Rp 500rb&ndash;Rp 2jt/bulan). VocalSense AI menyediakan bimbingan objektif 24 jam dengan biaya sangat terjangkau (Rp 49.000/bulan).</li>
            <li><em>Faktor Kenyamanan:</em> Banyak penyanyi pemula merasa malu jika bernyanyi fals di depan guru les. Aplikasi ini memberikan ruang latihan mandiri yang privat tanpa rasa canggung atau dihakimi.</li>
        </ul>
    </li>
    <li><strong>Membentuk Kebiasaan Latihan (Daily Streak &amp; Badges):</strong>
        Menerapkan konsep gamifikasi (seperti Duolingo) dengan fitur pencatat konsistensi hari latihan bernyanyi harian (streak) dan lencana pencapaian. Dasbor yang memperlihatkan grafik rentang nada bertambah luas dari minggu ke minggu memberikan kepuasan psikologis nyata bahwa latihannya membuahkan hasil.
    </li>
    <li><strong>Bukan Sekadar Menilai, tapi Memberi Solusi Perbaikan:</strong>
        Aplikasi tidak hanya memberi tahu skor bahwa pengguna bernyanyi fals, tetapi menunjukkan tuts mana yang meleset, memutar ulang audio di detik tersebut (Note-Sync Playback), dan modul AI memberikan resep latihan tangga nada solfeggio harian yang harus dilatih untuk memperbaiki kelemahan tersebut.
    </li>
    <li><strong>Kartu Hasil Tes yang Siap Dipamerkan ke Media Sosial:</strong>
        Menyediakan kartu hasil tes rentang vokal yang didesain estetik dan modern (seperti <em>Spotify Wrapped</em>) sehingga pengguna tertarik membagikannya ke Instagram Story atau WhatsApp secara sukarela.
    </li>
</ol>

</body>
</html>
"""

def generate_pdf():
    pdf_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.pdf'
    
    story = fitz.Story(html=HTML_CONTENT)
    writer = fitz.DocumentWriter(pdf_path)
    rect = fitz.paper_rect('a4') # 595.32 x 841.92 pt
    margin_x = 44
    margin_top = 38
    margin_bottom = 38
    where = rect + (margin_x, margin_top, -margin_x, -margin_bottom)
    
    more = 1
    while more:
        device = writer.begin_page(rect)
        more, _ = story.place(where)
        story.draw(device)
        writer.end_page()
    writer.close()
    
    doc = fitz.open(pdf_path)
    total_pages = doc.page_count
    
    # Simpan halaman sebagai PNG untuk verifikasi visual
    for p_num in range(total_pages):
        pix = doc[p_num].get_pixmap(dpi=150)
        pix.save(f'D:/Kuliah/IPPL/docs/inspect_page_{p_num+1}.png')
        
    doc.close()
    print(f"Clean PDF generated at: {pdf_path} (Total Pages: {total_pages})")

def generate_docx():
    docx_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.docx'
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        section.header.is_linked_to_previous = False
        section.footer.is_linked_to_previous = False
        for p in section.header.paragraphs:
            p.text = ""
        for p in section.footer.paragraphs:
            p.text = ""
        
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    
    # Judul Utama Bersih
    p_h = doc.add_paragraph()
    p_h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_h.paragraph_format.space_before = Pt(0)
    p_h.paragraph_format.space_after = Pt(2)
    r = p_h.add_run("TUGAS REKAYASA PERANGKAT LUNAK (IPPL)")
    r.bold = True
    r.font.size = Pt(13)
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(14)
    r2 = p_sub.add_run("Analisis Perancangan Sistem, Metodologi Pengembangan, Bisnis, Pengujian, dan Retensi Pengguna")
    r2.font.size = Pt(10.5)
    
    # Tabel Identitas Bersih (Tanpa Background)
    t_info = doc.add_table(rows=4, cols=2)
    t_info.style = 'Table Grid'
    t_info.columns[0].width = Inches(1.8)
    t_info.columns[1].width = Inches(4.8)
    
    rows_data = [
        ("Nama Mahasiswa", "Rafael Hotdion L.T"),
        ("NIM", "11241075"),
        ("Mata Kuliah", "Rekayasa Perangkat Lunak (IPPL)"),
        ("Topik Proyek", "VocalSense AI (Platform Analisis Suara Bernyanyi dan Pelatih Vokal Cerdas)")
    ]
    for idx, (k, v) in enumerate(rows_data):
        row = t_info.rows[idx]
        row.cells[0].text = k
        row.cells[1].text = v
        row.cells[0].paragraphs[0].runs[0].bold = True
        
    def add_soal_title(title_text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(18)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(title_text)
        run.bold = True
        run.font.size = Pt(11.5)
        
    # ================= 1. ALUR REQUIREMENT & ALUR DATA =================
    add_soal_title("1. ALUR REQUIREMENT DAN ALUR DATA PROYEK")
    
    doc.add_heading("A. Alur Rekayasa Kebutuhan (Requirement Engineering Lifecycle)", level=2)
    doc.add_paragraph(
        "Alur penentuan dan perumusan kebutuhan pada proyek VocalSense AI mengikuti 5 tahapan rekayasa kebutuhan perangkat lunak formal:\n"
        "1. Identifikasi Kebutuhan (Requirement Elicitation): Menggali masalah mendasar dari para penyanyi pemula: tingginya biaya les privat vokal (Rp 500.000–Rp 2.000.000/bulan), jadwal les yang kaku, serta rasa minder/malu saat menyanyi fals di depan instruktur. Solusi yang dirancang adalah aplikasi web pelatih vokal mandiri yang memberikan evaluasi nada secara otomatis (mengacu pada referensi web akustik VoiceGenderAnalyzer.com yang membuktikan pemrosesan audio lokal peramban via Web Audio API dapat berjalan cepat, tanpa latensi, dan ramah privasi).\n"
        "2. Analisis Kebutuhan (Requirement Analysis): Mengelompokkan kebutuhan ke dalam 24 Kebutuhan Fungsional (FR-001 s/d FR-024) dan 5 Kebutuhan Non-Fungsional (NFR: performa ekstraksi suara <= 4 detik, visualizer pitch peramban >= 30 FPS, dan keamanan data). Di tahap ini juga dirumuskan pembagian hak akses bertingkat (Freemium): Free Tier, Pro Tier, dan Premium Tier.\n"
        "3. Spesifikasi & Pemodelan (Requirement Specification): Menuangkan kebutuhan ke dalam dokumen formal Software Requirements Specification (SRS) dan Software Design Document (SDD). Memodelkan 24 Use Case dengan kaidah ketat asistensi pembimbing (hanya memodelkan 2 aktor manusia: Pengguna dan Administrator; sementara Google OAuth, Midtrans, dan Gemini AI berada di backend). Menyusun 24 Activity Diagram (3 swimlane, label percabangan [ ]) dan 24 Sequence Diagram berorientasi MVC (User -> View -> Controller -> Service -> Database).\n"
        "4. Validasi Kebutuhan (Requirement Validation): Melakukan asistensi dan peninjauan bersama pembimbing (Kak Rahmi) guna memverifikasi konsistensi pemetaan 1:1 antara use case, diagram aktivitas, dan diagram sekuensial, serta memvalidasi formula matematis DSP (algoritma YIN, MIDI, Cents, dan vibrato).\n"
        "5. Manajemen Kebutuhan (Requirement Management): Mengunci spesifikasi kebutuhan ke dalam Product Backlog yang siap diimplementasikan secara terukur ke dalam sprint pengembangan."
    )
    
    doc.add_heading("Diagram Alir Rekayasa Kebutuhan (Requirement Flowchart):", level=3)
    steps_req = [
        "1. Identifikasi Masalah: Riset kendala latihan solo fals, survei pengguna, dan studi referensi web audio.",
        "2. Analisis Kebutuhan: Perumusan 24 Kebutuhan Fungsional (FR) dan 5 Kebutuhan Non-Fungsional (NFR).",
        "3. Spesifikasi & Pemodelan: Penyusunan dokumen SRS, Use Case 24 UC, Activity Diagram, dan Sequence MVC.",
        "4. Validasi Asistensi: Evaluasi kepatuhan kaidah asistensi (aktor use case murni manusia, label [ ]).",
        "5. Product Backlog Baseline: Pengesahan kebutuhan untuk pembagian modul sprint pengembangan."
    ]
    for s in steps_req:
        p = doc.add_paragraph(f"• {s}")
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)

    doc.add_heading("B. Alur Data Sistem (Data Flow Lifecycle)", level=2)
    doc.add_paragraph(
        "Alur data menjelaskan perpindahan sinyal suara pengguna hingga diolah menjadi metrik rapor evaluasi dan kurikulum AI:\n"
        "1. Penangkapan Suara (Audio Ingestion): Suara penyanyi ditangkap oleh mikrofon peramban melalui Web Audio API (MediaStreamAudioSourceNode) menjadi sinyal digital PCM 44.1 kHz. Modul pre-processing menerapkan noise gate untuk meredam desis ruangan dan normalisasi desibel RMS.\n"
        "2. Visualisasi Waktu Nyata (Live Coordinate Streaming): AnalyserNode mengekstrak frekuensi dasar (F0) secara instan dan mengalirkan koordinat ke kanvas peramban untuk merender kurva nada berjalan (live rolling pitch curve, 55–880 Hz) di atas tuts piano roll.\n"
        "3. Ekstraksi Fitur Vokal (AI Audio Engine): Setelah rekaman selesai atau file audio diunggah, audio dikirim ke server pemrosesan (FastAPI Python worker). Algoritma YIN CMNDF mengekstrak frekuensi dasar F0 (Hz) per frame audio 2048 sampel. Frekuensi dikonversi ke notasi MIDI (m = 69 + 12*log2(F0/440)) dan dihitung deviasi logaritmik Cents (Delta_cents = 1200*log2(F0/F_target)). Sistem mengklasifikasikan nada menjadi In-Tune (+-20 cents), Flat (< -20 cents), atau Sharp (> +20 cents), serta mengukur osilasi vibrato (5.0–7.0 Hz), sustain, dan resonansi timbre.\n"
        "4. Penyimpanan Data Berjenjang: Pada akun Free, hasil hanya diolah sementara di RAM tanpa disimpan permanen. Pada akun Pro dan Premium, file rekaman diunggah ke Cloud Storage (S3) dengan Pre-signed URL aman (60 menit), metadata rapor disimpan di PostgreSQL (vocal_reports), dan diagregasikan ke grafik tren mingguan (progress_trackings).\n"
        "5. Pembuatan Kurikulum AI (Khusus Premium): Daftar nada fals diekstrak ke dalam prompt terstruktur dan dikirim ke Google Gemini AI untuk merumuskan kurikulum latihan tangga nada harian (Solfeggio Drills 7–30 hari) yang disimpan pada tabel ai_practice_plans.\n"
        "6. Penyajian Rapor & Fitur Interaktif: Frontend menyajikan Rapor Bernyanyi: Skor (0–100), Radar Chart 5 dimensi vokal, kanvas Piano Roll interaktif, fitur Note-Sync Playback (klik balok fals melompatkan pemutaran audio ke detik tersebut), dan opsi ekspor sertifikat resmi format PDF."
    )
    
    doc.add_heading("Diagram Alir Perpindahan Data Sistem (Data Pipeline Flowchart):", level=3)
    steps_data = [
        "1. Input Suara: Gelombang suara mikrofon -> Web Audio API (PCM 44.1 kHz & filter noise).",
        "2. Real-time Streaming: Koordinat nada F0 dirender seketika menjadi kurva visual di atas tuts piano.",
        "3. DSP Audio Engine: Ekstraksi YIN F0 -> Konversi MIDI & Cents -> Deteksi Flat/Sharp -> Vibrato (5-7 Hz).",
        "4. Penyimpanan: Free (hanya memori RAM) | Pro/Premium (simpan database PostgreSQL & Cloud Storage S3).",
        "5. AI Synthesis: Gemini LLM merumuskan silabus latihan tangga nada solfeggio harian (khusus Premium).",
        "6. Output Rapor: Skor bernyanyi, Piano Roll interaktif (Note-Sync Playback), dan lembar rapor PDF."
    ]
    for s in steps_data:
        p = doc.add_paragraph(f"• {s}")
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(2)

    # ================= 2. METODE PENGEMBANGAN SDLC =================
    doc.add_page_break()
    add_soal_title("2. METODE PENGEMBANGAN PERANGKAT LUNAK (SDLC)")
    
    doc.add_heading("A. Metode yang Dipilih: Agile Development (Framework Scrum)", level=2)
    doc.add_paragraph("Pengembangan VocalSense AI menggunakan pendekatan Agile Software Development dengan kerangka kerja Scrum.")

    doc.add_heading("B. Alasan Pemilihan Metode (Rationale & Keunggulan)", level=2)
    doc.add_paragraph(
        "1. Karakteristik Pemrosesan Audio yang Eksperimental: Penalaan parameter algoritma deteksi nada (ambang batas cents, noise gate mikrofon, dan laju vibrato) membutuhkan pengujian empiris berulang pada berbagai karakter suara asli manusia. Model Scrum memungkinkan pengujian dan penyempurnaan algoritma di setiap akhir sprint.\n"
        "2. Kemudahan Mengakomodasi Umpan Balik Asistensi Dosen/Pembimbing: Dalam pengerjaan proyek mata kuliah, arahan dan masukan dari dosen/pembimbing (seperti revisi Kak Rahmi terkait aturan UML dan format hitam-putih) dapat langsung diintegrasikan ke sprint berikutnya tanpa membongkar ulang sistem dari awal.\n"
        "3. Pengembangan Bertahap dan Terukur: Alih-alih mengintegrasikan seluruh sistem di fase akhir, Scrum membagi pengembangan ke dalam modul-modul fungsional teruji (Web Audio -> AI Audio Engine -> Database PostgreSQL -> Gateway Midtrans)."
    )

    doc.add_heading("C. Rencana Pembagian Sprint Pengembangan (4 Sprint x 2 Minggu)", level=2)
    doc.add_paragraph(
        "• Sprint 1 (Fondasi Arsitektur, Desain Sistem & Autentikasi Pengguna): Finalisasi dokumen formal SRS & SDD, pembuatan 56 diagram Draw.io hitam-putih, perancangan skema database PostgreSQL, serta implementasi autentikasi akun (JWT dan Google OAuth 2.0) (FR-001 s/d FR-005).\n"
        "• Sprint 2 (Core Audio Engine, Tuner & Perekam Web Audio): Implementasi penangkapan audio browser via Web Audio API, Digital Chromatic Tuner, tes rentang vokal (Vocal Range Finder), perekam bernyanyi langsung dengan rolling pitch visualizer, serta pemotong audio (trimmer) (FR-006 s/d FR-010).\n"
        "• Sprint 3 (Mesin Analisis Nada & Rapor Piano Roll): Integrasi algoritma ekstraksi nada YIN F0, kalkulasi deviasi Cents, klasifikasi Flat/Sharp, pengukuran vibrato 5–7 Hz, kanvas Piano Roll interaktif, fitur Note-Sync Playback, penyimpanan rapor ke S3, dan ekspor sertifikat/rapor PDF (FR-011 s/d FR-016).\n"
        "• Sprint 4 (Personalized AI Coach, Payment Gateway Midtrans & Final Testing): Integrasi Gemini AI untuk rekomendasi latihan tangga nada solfeggio harian, integrasi Midtrans Snap API (QRIS/GoPay) untuk upgrade Pro/Premium, pengujian menyeluruh (Black Box, Unit Testing, Load Testing), dan deployment cloud production (FR-017 s/d FR-024)."
    )

    # ================= 3. STRATEGI BISNIS & PENDAPATAN =================
    doc.add_page_break()
    add_soal_title("3. STRATEGI MENGHASILKAN PENDAPATAN (MONETISASI & BISNIS)")
    
    doc.add_heading("A. Model Bisnis: Freemium Software-as-a-Service (SaaS)", level=2)
    doc.add_paragraph(
        "VocalSense AI mengadopsi model bisnis Freemium Subscription berbasis langganan bulanan dan tahunan:\n"
        "1. Free Tier (Rp 0 – Akuisisi Pengguna Baru):\n"
        "   - Akses penuh Chromatic Tuner dan Tes Rentang Vokal (Vocal Range Finder).\n"
        "   - Batas durasi rekam maksimal 60 detik per sesi (maksimal 3 kali evaluasi per hari).\n"
        "   - Hasil rapor vokal hanya tampil instan di layar dan tidak disimpan permanen ke database riwayat akun.\n"
        "2. Pro Tier (Rp 49.000 / bulan atau Rp 399.000 / tahun):\n"
        "   - Durasi rekam bernyanyi hingga 5 menit per lagu tanpa batas jumlah sesi harian.\n"
        "   - Visualisasi kanvas Piano Roll penuh dilengkapi fitur Note-Sync Playback.\n"
        "   - Penyimpanan riwayat analisis tanpa batas dan grafik pemantauan perkembangan vokal mingguan.\n"
        "   - Ekspor Rapor Bernyanyi Resmi format PDF resolusi tinggi dan bebas iklan.\n"
        "3. Premium Tier + AI Coach (Rp 99.000 / bulan atau Rp 799.000 / tahun):\n"
        "   - Seluruh manfaat Pro Tier.\n"
        "   - Kurikulum Latihan Vokal Harian yang Dipersonalisasi oleh AI (Google Gemini LLM merumuskan latihan tangga nada solfeggio khusus berdasarkan jenis nada yang paling sering fals).\n"
        "   - Analisis dimensi vokal lanjutan (resonansi timbre suara dan konsistensi gelombang vibrato).\n"
        "   - Akses prioritas komputasi server pemrosesan audio tercepat (< 2 detik).\n"
        "4. Add-On / Micro-transactions: Opsi pembelian paket kuota analisis instan fleksibel tanpa berlangganan rutin (Rp 15.000 untuk 10 sesi rekam) serta sertifikat evaluasi vokal resmi bertanda tangan digital."
    )

    doc.add_heading("B. Strategi Pemasaran & Go-to-Market (GTM)", level=2)
    doc.add_paragraph(
        "1. Kampanye Media Sosial & TikTok Karaoke Challenge: Membuat video demonstrasi visual perbandingan: 'Cek seberapa fals kamu saat menyanyikan nada tinggi lagu X'. Visual kanvas piano roll yang memperlihatkan balok merah (fals) dan balok hijau (pas) sangat menarik dan berpotensi viral di media sosial.\n"
        "2. Kemitraan Komunitas Vokal & Paduan Suara: Menjalin kerja sama dengan komunitas paduan suara kampus, gereja, serta sekolah musik sebagai alat bantu latihan mandiri anggota di rumah.\n"
        "3. Program Afiliasi Guru Vokal: Memberikan bagi hasil (rev-share) 20% bagi pelatih vokal independen yang merekomendasikan muridnya menggunakan VocalSense AI untuk pemantauan tugas latihan mingguan.\n"
        "4. Optimasi Mesin Pencari (SEO): Menargetkan kata kunci pencarian populer di Google: 'tes range vokal online', 'cara cek nada fals', 'belajar vibrato vokal', dan 'aplikasi pelatih vokal AI'."
    )

    # ================= 4. METODE PENGUJIAN & TEST CASE =================
    doc.add_page_break()
    add_soal_title("4. METODE PENGUJIAN DAN TABEL TEST CASE")
    
    doc.add_heading("A. Metode Pengujian yang Digunakan", level=2)
    doc.add_paragraph(
        "1. Black Box Testing (Boundary Value Analysis & Equivalence Partitioning): Menguji fungsionalitas sistem dari sudut pandang pengguna tanpa melihat kode program internal (validasi form login, pembatasan durasi rekam sesuai tier, dan respons tombol pemutar audio).\n"
        "2. White Box / Unit Testing: Pengujian unit fungsi komputasi matematis internal AI Audio Engine menggunakan pytest (validasi rumus YIN CMNDF, akurasi konversi MIDI A4=440Hz -> 69, dan kalkulasi deviasi cents).\n"
        "3. Integration Testing: Menguji komunikasi antar-modul terdistribusi: aliran blob audio dari Web Audio API ke Redis worker, verifikasi callback webhook Midtrans, dan validasi struktur JSON respon Gemini LLM API.\n"
        "4. Performance & Stress Testing: Memvalidasi kepatuhan terhadap NFR: komputasi analisis vokal 60 detik selesai dalam <= 4 detik, dan rendering kurva nada pada canvas browser stabil pada >= 30 FPS."
    )
    
    doc.add_heading("B. Tabel Skenario Pengujian (Test Case)", level=2)
    tc_data = [
        ("TC-01", "Autentikasi", "Pendaftaran akun dengan email yang sudah ada (Negative Test)", "1. Buka form registrasi.\n2. Masukkan email duplikat.\n3. Klik tombol Daftar.", "Sistem menolak dan menampilkan pesan 'Email sudah terdaftar'.", "Pass"),
        ("TC-02", "Tuner Nada", "Pengujian kalibrasi nada murni A4 (440 Hz) (Positive Test)", "1. Buka fitur Chromatic Tuner.\n2. Bunyikan nada acuan 440 Hz ke mikrofon.", "Jarum tuner menunjuk nada A4 (MIDI 69) dengan deviasi 0 +- 2 cents dan indikator hijau In-Tune menyala.", "Pass"),
        ("TC-03", "Perekam Vokal", "Batas durasi rekam akun Free tepat 60 detik (Boundary Test)", "1. Mulai rekam bernyanyi pada akun Free.\n2. Biarkan timer berjalan hingga 60 detik.", "Tepat di detik ke-60 perekaman otomatis berhenti, blob audio dikemas, dan sistem membuka halaman analisis.", "Pass"),
        ("TC-04", "AI Audio Engine", "Deteksi nada Flat (< -20 cents) & Sharp (> +20 cents)", "1. Unggah file audio nada 430 Hz & 450 Hz.\n2. Jalankan analisis nada.", "Sistem menandai nada 430 Hz sebagai 'Flat' dan nada 450 Hz sebagai 'Sharp' secara tepat.", "Pass"),
        ("TC-05", "Piano Roll", "Fitur Note-Sync Playback melompat ke nada fals", "1. Buka rapor evaluasi vokal.\n2. Klik balok nada fals merah di detik 00:14.", "Audio player langsung melompat (seek) dan memutar suara vokal tepat di detik ke-14.", "Pass"),
        ("TC-06", "Pembayaran", "Aktivasi paket langganan setelah pelunasan Midtrans", "1. Pilih paket Pro bulanan.\n2. Selesaikan pembayaran di Midtrans.", "Status langganan akun otomatis aktif menjadi Pro dan kuota rekam bertambah jadi 5 menit.", "Pass")
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
        
    for r_idx, row_vals in enumerate(tc_data):
        row = t_tc.rows[r_idx+1]
        for c_idx, val in enumerate(row_vals):
            c = row.cells[c_idx]
            c.text = val
            if c_idx in [0, 5]:
                c.paragraphs[0].runs[0].bold = True
                c.paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER

    # ================= 5. STRATEGI ADOPSI =================
    doc.add_page_break()
    add_soal_title("5. STRATEGI AGAR ORANG LAIN MAU MENGGUNAKAN SISTEM (ADOPSI & RETENSI)")
    doc.add_paragraph(
        "Strategi agar VocalSense AI diminati dan digunakan secara rutin oleh masyarakat bertumpu pada 6 pendekatan nyata:\n"
        "1. Zero-Barrier Onboarding (Bisa Digunakan Tanpa Registrasi): Pengguna baru dapat langsung mencoba fitur tes rentang vokal dan perekaman 60 detik tanpa harus repot mendaftar akun atau memasukkan kartu kredit. Kemudahan ini memangkas keraguan awal pengguna dan menurunkan bounce rate secara signifikan.\n"
        "2. Umpan Balik Cepat dalam Hitungan Detik: Begitu pengguna menyanyikan satu nada ke mikrofon, grafik kurva nada langsung bergerak di tuts piano dan sistem memberi tahu tipe suaranya (Bass, Bariton, Tenor, Sopran). Umpan balik visual yang instan ini menghadirkan kepuasan langsung (wow factor) yang memicu rasa pendasaran untuk mencoba lagu penuh.\n"
        "3. Solusi untuk Masalah Biaya dan Rasa Malu:\n"
        "   - Faktor Biaya: Les vokal privat konvensional berbiaya mahal (Rp 500rb–Rp 2jt/bulan). VocalSense AI menyediakan bimbingan objektif 24 jam dengan biaya sangat terjangkau (Rp 49.000/bulan).\n"
        "   - Faktor Kenyamanan: Banyak penyanyi pemula merasa malu jika bernyanyi fals di depan guru les. Aplikasi ini memberikan ruang latihan mandiri yang privat tanpa rasa canggung atau dihakimi.\n"
        "4. Membentuk Kebiasaan Latihan (Daily Streak & Badges): Menerapkan konsep gamifikasi (seperti Duolingo) dengan fitur pencatat konsistensi hari latihan bernyanyi harian (streak) dan lencana pencapaian. Dasbor yang memperlihatkan grafik rentang nada bertambah luas dari minggu ke minggu memberikan kepuasan psikologis nyata bahwa latihannya membuahkan hasil.\n"
        "5. Bukan Sekadar Menilai, tapi Memberi Solusi Perbaikan: Aplikasi tidak hanya memberi tahu skor bahwa pengguna bernyanyi fals, tetapi menunjukkan tuts mana yang meleset, memutar ulang audio di detik tersebut (Note-Sync Playback), dan modul AI memberikan resep latihan tangga nada solfeggio harian yang harus dilatih untuk memperbaiki kelemahan tersebut.\n"
        "6. Kartu Hasil Tes yang Siap Dipamerkan ke Media Sosial: Menyediakan kartu hasil tes rentang vokal yang didesain estetik dan modern (seperti Spotify Wrapped) sehingga pengguna tertarik membagikannya ke Instagram Story atau WhatsApp secara sukarela."
    )
    
    doc.save(docx_path)
    print(f"Clean DOCX generated at: {docx_path}")

if __name__ == "__main__":
    generate_pdf()
    generate_docx()
