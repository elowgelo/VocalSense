import fitz
import os

def generate_pdf():
    pdf_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.pdf'
    
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8">
    <style>
        @page {
            size: A4;
            margin: 22mm 18mm 22mm 18mm;
        }
        body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 10.5pt;
            line-height: 1.45;
            color: #111111;
        }
        .header-title {
            text-align: center;
            font-size: 15pt;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
        }
        .header-subtitle {
            text-align: center;
            font-size: 11.5pt;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .header-topic {
            text-align: center;
            font-size: 10.5pt;
            font-style: italic;
            margin-bottom: 14px;
            padding-bottom: 8px;
            border-bottom: 1.5px solid #222222;
        }
        .identity-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 18px;
        }
        .identity-table td {
            border: 1px solid #333333;
            padding: 5px 10px;
            font-size: 10pt;
        }
        .identity-table td.label {
            width: 28%;
            font-weight: bold;
            background-color: #f0f0f0;
        }
        h1 {
            font-size: 12.5pt;
            font-weight: bold;
            color: #000000;
            margin-top: 18px;
            margin-bottom: 8px;
            padding-bottom: 3px;
            border-bottom: 1px solid #333333;
            text-transform: uppercase;
        }
        h2 {
            font-size: 11pt;
            font-weight: bold;
            color: #222222;
            margin-top: 12px;
            margin-bottom: 6px;
        }
        h3 {
            font-size: 10.5pt;
            font-weight: bold;
            font-style: italic;
            color: #333333;
            margin-top: 10px;
            margin-bottom: 4px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 6px;
            text-align: justify;
        }
        ul, ol {
            margin-top: 4px;
            margin-bottom: 8px;
            padding-left: 20px;
        }
        li {
            margin-bottom: 4px;
            text-align: justify;
        }
        .flow-box {
            border: 1px solid #333333;
            background-color: #fafafa;
            padding: 6px 12px;
            margin-top: 4px;
            margin-bottom: 4px;
            border-radius: 2px;
        }
        .flow-box-title {
            font-weight: bold;
            font-size: 10pt;
            display: inline;
        }
        .flow-box-actor {
            font-style: italic;
            font-size: 9.5pt;
            color: #444444;
            display: inline;
        }
        .flow-box-desc {
            font-size: 9.5pt;
            margin-top: 2px;
            margin-bottom: 0px;
        }
        .flow-arrow {
            text-align: center;
            font-weight: bold;
            font-size: 11pt;
            line-height: 1.1;
            margin: 1px 0;
            color: #222222;
        }
        table.formal-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            margin-bottom: 12px;
            font-size: 9pt;
        }
        table.formal-table th {
            border: 1px solid #222222;
            background-color: #e6e6e6;
            font-weight: bold;
            padding: 5px 6px;
            text-align: center;
        }
        table.formal-table td {
            border: 1px solid #444444;
            padding: 4px 6px;
            vertical-align: top;
            text-align: left;
        }
        table.formal-table td.center {
            text-align: center;
        }
        table.formal-table td.bold {
            font-weight: bold;
        }
        .badge {
            font-weight: bold;
            padding: 1px 4px;
            border: 1px solid #333333;
            background-color: #f0f0f0;
            border-radius: 2px;
        }
    </style>
    </head>
    <body>

    <div class="header-title">Tugas Rekayasa Perangkat Lunak (IPPL)</div>
    <div class="header-subtitle">Analisis Alur Sistem, Pengembangan Agile, Monetisasi, Pengujian, dan Retensi Pengguna</div>
    <div class="header-topic">Topik Proyek: VocalSense AI (Platform Analisis Suara Bernyanyi dan Bimbingan Latihan Vokal Cerdas)</div>

    <table class="identity-table">
        <tr>
            <td class="label">NAMA MAHASISWA</td>
            <td><strong>Rafael Hotdion L.T</strong></td>
        </tr>
        <tr>
            <td class="label">NIM</td>
            <td><strong>11241075</strong></td>
        </tr>
        <tr>
            <td class="label">MATA KULIAH / PROYEK</td>
            <td>Rekayasa Perangkat Lunak (IPPL) &mdash; Sistem VocalSense AI</td>
        </tr>
    </table>

    <h1>1. Penjelasan Alur Requirement dan Alur Data Proyek</h1>
    
    <h2>1.1 Alur Rekayasa Kebutuhan (Requirement Engineering Lifecycle)</h2>
    <p>
        Alur penentuan dan rekayasa kebutuhan perangkat lunak pada proyek <strong>VocalSense AI</strong> dirancang 
        melalui 5 tahapan terstruktur guna memastikan sistem yang dibangun memecahkan masalah riil para penyanyi 
        pemula yang membutuhkan bimbingan nada objektif tanpa ketergantungan pada guru vokal privat berbiaya mahal:
    </p>
    <ol>
        <li><strong>Requirement Elicitation (Identifikasi Kebutuhan):</strong> Mengidentifikasi kendala mendasar saat latihan bernyanyi mandiri (ketidaktahuan posisi nada fals/flat/sharp, tidak mengetahui rentang oktaf suara, serta tingginya biaya les privat Rp 500.000&ndash;Rp 2.000.000/bulan). Mengacu pada arsitektur web akustik <em>VoiceGenderAnalyzer.com</em> yang membuktikan penangkapan audio lokal peramban (Web Audio API) dapat beroperasi tanpa latensi server dan ramah privasi.</li>
        <li><strong>Requirement Analysis &amp; Classification (Analisis &amp; Klasifikasi):</strong> Menguraikan kebutuhan ke dalam 24 Kebutuhan Fungsional (FR-001 s/d FR-024) dan 5 Kebutuhan Non-Fungsional (NFR-001 s/d NFR-005). Menentukan struktur hak akses Freemium: <em>Free Tier</em> (tes range instan &amp; rekam 60 detik), <em>Pro Tier</em> (rekam 5 menit, simpan rapor, note-sync playback, ekspor PDF), dan <em>Premium Tier</em> (rekam 15 menit, kurikulum latihan harian Gemini AI).</li>
        <li><strong>Requirement Modeling &amp; Specification (Pemodelan &amp; Spesifikasi Dokumen):</strong> Menyusun dokumen formal SRS dan SDD. Memodelkan 24 Use Case dengan kaidah ketat asistensi pembimbing (hanya memodelkan 2 aktor manusia yaitu Pengguna dan Administrator, sedangkan Google OAuth, Midtrans, dan Gemini AI beroperasi di backend). Menyusun 24 Activity Diagram (3 swimlane, percabangan berkurung siku [ ]) dan 24 Sequence Diagram berorientasi MVC (User &rarr; View &rarr; Controller &rarr; Service &rarr; Database).</li>
        <li><strong>Requirement Validation &amp; Review (Validasi Kebutuhan):</strong> Menyelaraskan seluruh diagram sistem melalui proses asistensi bersama pembimbing (Kak Rahmi) untuk menjamin relasi 1:1 antara use case, diagram aktivitas, dan diagram sekuensial, serta memvalidasi formula matematis DSP (YIN CMNDF, MIDI, Cents, Vibrato).</li>
        <li><strong>Requirement Baseline &amp; Traceability (Manajemen Kebutuhan):</strong> Mengunci spesifikasi kebutuhan ke dalam <em>Product Backlog</em> yang dipetakan secara terukur ke setiap Sprint pengembangan.</li>
    </ol>

    <h3>Flowchart Alur Rekayasa Kebutuhan (Requirement Engineering Flowchart):</h3>
    <div class="flow-box">
        <div class="flow-box-title">[1.0] Requirement Elicitation </div>
        <div class="flow-box-actor">(Stakeholder &amp; User Research)</div>
        <p class="flow-box-desc">Observasi problem latihan solo fals, survei penyanyi pemula, benchmark teknologi Web Audio API.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[2.0] Requirement Analysis </div>
        <div class="flow-box-actor">(System Analyst)</div>
        <p class="flow-box-desc">Dekomposisi kebutuhan fungsional (FR-001..024), NFR, dan pembagian hak akses Freemium (Free, Pro, Premium).</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[3.0] Requirement Specification &amp; Modeling </div>
        <div class="flow-box-actor">(Software Engineer &amp; Designer)</div>
        <p class="flow-box-desc">Penyusunan dokumen formal SRS, Use Case Diagram 24 UC, Activity Diagrams, Sequence Diagrams MVC, dan DFD.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[4.0] Requirement Validation &amp; Review </div>
        <div class="flow-box-actor">(Dosen / Asisten Pembimbing)</div>
        <p class="flow-box-desc">Evaluasi kepatuhan kaidah asistensi (aktor use case murni manusia, decision brackets [ ], eliminasi merge bug).</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[5.0] Requirement Baseline &amp; Traceability </div>
        <div class="flow-box-actor">(Dev Team)</div>
        <p class="flow-box-desc">Penguncian spesifikasi kebutuhan ke dalam Product Backlog dan pemetaan ke modul sprint pengembangan.</p>
    </div>

    <h2>1.2 Alur Data Sistem (Data Flow Lifecycle)</h2>
    <p>
        Alur data sistem VocalSense AI merepresentasikan siklus transformasi sinyal akustik analog suara bernyanyi 
        menjadi data metrik digital terstruktur dan rekomendasi latihan personal:
    </p>
    <ol>
        <li><strong>Audio Ingestion (Penangkapan Suara Mikrofon):</strong> Gelombang suara penyanyi ditangkap oleh mikrofon peramban melalui Web Audio API (MediaStreamAudioSourceNode) menjadi PCM stream 44.1 kHz. Modul pre-processing melakukan <em>ambient noise gating</em> dan normalisasi desibel RMS.</li>
        <li><strong>Real-time Coordinate Streaming:</strong> AnalyserNode menghitung estimasi nada F0 secara lokal dan mengalirkan koordinat ke kanvas visualizer untuk menampilkan kurva tinggi nada waktu nyata (<em>live rolling pitch curve</em>, 55&ndash;880 Hz) di atas tuts piano roll.</li>
        <li><strong>Core Audio Feature Extraction (AI Singing Engine):</strong> Berkas audio dikirim ke backend pemrosesan sinyal (FastAPI Python worker). Algoritma YIN CMNDF mengekstrak frekuensi dasar F0 (Hz) per frame 2048 sampel. Frekuensi dikonversi ke notasi MIDI (m = 69 + 12*log2(F0/440)) dan dihitung deviasi logaritmik Cents (&Delta;cents = 1200*log2(F0/F_target)). Sistem mengidentifikasi nada Flat (&lt; -20 cents), Sharp (&gt; +20 cents), atau In-Tune (&plusmn;20 cents), mengukur modulasi vibrato (5.0&ndash;7.0 Hz), kestabilan sustain, dan keseimbangan resonansi dada/masker/kepala.</li>
        <li><strong>Data Tiering &amp; Storage Routing:</strong> Pada Free Tier, data hanya diolah di RAM buffer tanpa disimpan ke disk (zero-retention). Pada Pro dan Premium Tier, audio diunggah ke Cloud Storage S3 dengan Pre-signed URL aman (60 menit), metadata rapor disimpan ke tabel PostgreSQL <em>vocal_reports</em>, dan diagregasikan ke <em>progress_trackings</em>.</li>
        <li><strong>AI Adaptive Coaching (Khusus Premium):</strong> Riwayat nada fals diekstrak menjadi prompt terstruktur dan dikirim ke Google Gemini LLM API untuk menghasilkan silabus latihan tangga nada harian (Solfeggio Drills 7&ndash;30 hari) yang disimpan ke tabel <em>ai_practice_plans</em>.</li>
        <li><strong>Data Presentation &amp; Note-Sync Playback:</strong> Antarmuka menyajikan Rapor Bernyanyi: Skor (0&ndash;100), Radar Chart 5 dimensi, kanvas Piano Roll interaktif berkode warna, fitur <em>Note-Sync Playback</em> (klik balok fals melompatkan pemutaran audio ke detik tersebut), dan opsi unduh dokumen sertifikat PDF.</li>
    </ol>

    <h3>Flowchart Alur Data Sistem (Data Flow Pipeline Flowchart):</h3>
    <div class="flow-box">
        <div class="flow-box-title">[Step 1] Audio Ingestion &amp; Web Audio Capture </div>
        <div class="flow-box-actor">(Client Browser)</div>
        <p class="flow-box-desc">Penyanyi bernyanyi &rarr; Mikrofon menangkap suara analog &rarr; PCM Stream 44.1 kHz via Web Audio API.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 2] Pre-processing &amp; Real-time Visualizer </div>
        <div class="flow-box-actor">(Client Frontend)</div>
        <p class="flow-box-desc">Kalibrasi desibel noise gate &rarr; AnalyserNode mengekstrak frame F0 &rarr; Live rolling pitch curve di render ke kanvas.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 3] Audio Upload &amp; Job Queueing </div>
        <div class="flow-box-actor">(API Gateway &amp; Redis)</div>
        <p class="flow-box-desc">Blob rekaman dikirim via HTTPS multipart &rarr; API Gateway memvalidasi kuota &rarr; Tugas didaftarkan ke Redis BullMQ queue.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 4] Digital Signal Processing (DSP Engine) </div>
        <div class="flow-box-actor">(AI Audio Worker Python)</div>
        <p class="flow-box-desc">Eksekusi YIN CMNDF &rarr; Konversi MIDI &amp; Cents &rarr; Deteksi Flat/Sharp/In-Tune &rarr; Analisis Vibrato 5-7 Hz, Sustain, &amp; Resonansi.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 5] Data Tiering &amp; Storage Routing </div>
        <div class="flow-box-actor">(Storage Controller)</div>
        <p class="flow-box-desc">Jika Free: kembalikan payload ke RAM. Jika Pro/Prem: upload audio ke S3 &amp; simpan metadata rapor ke PostgreSQL vocal_reports.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 6] AI Coach Synthesis (Premium Only) </div>
        <div class="flow-box-actor">(Gemini LLM API)</div>
        <p class="flow-box-desc">Diagnosis daftar nada fals &rarr; Eksekusi prompt Gemini LLM &rarr; Menghasilkan silabus latihan tangga nada solfeggio harian.</p>
    </div>
    <div class="flow-arrow">&darr;</div>
    <div class="flow-box">
        <div class="flow-box-title">[Step 7] Reporting &amp; Note-Sync Playback </div>
        <div class="flow-box-actor">(User Interface)</div>
        <p class="flow-box-desc">Frontend merender Piano Roll interaktif, Radar Chart, lompatan detik nada fals (Note-Sync), dan opsi unduh PDF.</p>
    </div>

    <h1>2. Metode Pengembangan Perangkat Lunak (SDLC)</h1>
    
    <h2>2.1 Pemilihan Metode: Agile Development dengan Framework Scrum</h2>
    <p>
        Pengembangan sistem VocalSense AI mengadopsi metodologi <strong>Agile Software Development</strong> dengan 
        kerangka kerja <strong>Scrum</strong>. Pendekatan ini dipilih karena karakteristik proyek yang melibatkan 
        pemrosesan sinyal audio digital, kecerdasan buatan, dan visualisasi peramban memiliki tingkat ketidakpastian tinggi 
        yang membutuhkan eksperimen iteratif dan umpan balik berkala.
    </p>

    <h2>2.2 Alasan Memilih Agile Scrum (Rationale &amp; Keunggulan):</h2>
    <ul>
        <li><strong>Ketidakpastian Algoritma Akustik (Audio DSP):</strong> Penalaan parameter algoritma ekstraksi nada (YIN CMNDF, ambang batas desibel kebisingan ruangan, dan batas toleransi cents) membutuhkan pengujian empiris berulang pada berbagai jenis suara manusia asli. Scrum memungkinkan evaluasi performa per modul di setiap akhir siklus sprint.</li>
        <li><strong>Responsif terhadap Catatan Asistensi Dosen/Pembimbing:</strong> Dalam perkuliahan rekayasa perangkat lunak, rancangan sistem kerap mengalami penyesuaian (misal: revisi Kak Rahmi tentang pembatasan aktor use case hanya manusia, label percabangan [ ], dan format visual hitam-putih). Scrum memungkinkan perubahan diintegrasikan langsung pada Sprint Planning berikutnya tanpa membongkar ulang seluruh sistem.</li>
        <li><strong>Mitigasi Risiko Kegagalan Integrasi:</strong> Mengurangi risiko kegagalan integrasi besar di akhir proyek dengan membangun modul secara bertahap dan teruji (Web Audio &rarr; Engine Python AI &rarr; PostgreSQL &rarr; Gateway Midtrans).</li>
    </ul>

    <h2>2.3 Rencana Sprint Pengembangan (4 Sprint x 2 Minggu):</h2>
    <ul>
        <li><strong>Sprint 1 (Pondasi Arsitektur, Desain Sistem &amp; Autentikasi Pengguna):</strong> Finalisasi dokumen formal SRS dan SDD, pembuatan 56 diagram UML &amp; DFD hitam-putih di Draw.io, perancangan skema basis data PostgreSQL. Implementasi autentikasi JWT, registrasi akun, dan Single Sign-On Google OAuth 2.0 (FR-001 s/d FR-005).</li>
        <li><strong>Sprint 2 (Core Audio Engine, Tuner &amp; Perekam Web Audio):</strong> Implementasi penangkapan audio peramban via Web Audio API, Digital Chromatic Tuner, kalibrasi mikrofon, tes jangkauan vokal (Vocal Range Finder), perekam bernyanyi langsung dengan rolling pitch visualizer, serta pemangkas vokal / audio trimmer (FR-006 s/d FR-010).</li>
        <li><strong>Sprint 3 (Voice Analytics AI Engine &amp; Rapor Bernyanyi Piano Roll):</strong> Integrasi ekstraksi nada dasar YIN F0, kalkulasi Cents, deteksi Flat/Sharp, pengukuran vibrato 5&ndash;7 Hz, kanvas Piano Roll interaktif, fitur Note-Sync Playback, penyimpanan rapor berbayar di S3, serta ekspor sertifikat/rapor format PDF (FR-011 s/d FR-016).</li>
        <li><strong>Sprint 4 (Gamifikasi, Asisten AI Vocal Coach &amp; Transaksi Midtrans):</strong> Dasbor pelacakan progres perluasan jangkauan nada mingguan, streak latihan harian, integrasi Google Gemini LLM API untuk kurikulum tangga nada harian, checkout langganan Midtrans Snap API, pemrosesan webhook settlement, serta panel admin (FR-017 s/d FR-024).</li>
    </ul>

    <h1>3. Strategi Pemasaran dan Model Pendapatan (Income Streams)</h1>
    
    <h2>3.1 Model Pendapatan (Income Streams / Monetisasi SaaS):</h2>
    <p>
        VocalSense AI mengadopsi model bisnis <strong>Freemium Software as a Service (SaaS)</strong> dengan skema langganan berulang:
    </p>
    <ul>
        <li><strong>Tier Free (Gratis &mdash; Akuisisi Pengguna Baru):</strong> Akses penuh ke uji jangkauan vokal instan (Vocal Range Finder), chromatic tuner mikrofon, dan perekaman bernyanyi instan maksimal 60 detik dengan visualisasi kurva pitch langsung. Berfungsi sebagai <em>lead magnet</em> tanpa hambatan registrasi.</li>
        <li><strong>Tier Pro (Rp 49.000 / bulan atau Rp 490.000 / tahun):</strong> Perekaman hingga 5 menit per sesi (cukup untuk 1 lagu penuh), penyimpanan riwayat rapor tanpa batas di Cloud Storage, fitur Note-Sync Playback (klik nada fals di Piano Roll untuk mendengar letak kesalahan), komparasi berdampingan (Side-by-Side) dua sesi bernyanyi sebelum vs sesudah latihan, dan ekspor rapor resmi PDF. Target pasar: penyanyi hobi, anggota paduan suara, dan kreator cover musik.</li>
        <li><strong>Tier Premium (Rp 99.000 / bulan atau Rp 990.000 / tahun):</strong> Seluruh fitur Pro + durasi rekam hingga 15 menit, Dasbor Pelacakan Progres &amp; Perluasan Jangkauan Nada mingguan pada tuts piano, kalender streak latihan harian berhadiah lencana capaian, serta asisten pelatih cerdas 'AI Vocal Coach' (Google Gemini LLM) yang menyusun kurikulum harian latihan tangga nada solfeggio drills adaptif 7&ndash;30 hari. Target pasar: vokalis semi-profesional, musisi indie, dan calon peserta audisi menyanyi.</li>
        <li><strong>B2B Institutional Licensing (Peluang Jangka Panjang):</strong> Lisensi Dasbor Guru Vokal untuk sekolah musik, paduan suara universitas, dan sanggar vokal untuk memantau tugas latihan murid secara daring (biaya per siswa/bulan).</li>
    </ul>

    <h2>3.2 Strategi Pemasaran (Marketing &amp; Growth Strategy):</h2>
    <ul>
        <li><strong>Product-Led Growth (PLG) &amp; Viral Utility Hook:</strong> Fitur 'Instant Vocal Range Finder' disediakan di halaman depan tanpa login. Pengguna langsung menyanyi nada terendah dan tertinggi, lalu sistem menampilkan kartu tipe suara (contoh: <em>'Vocal Range Anda: C3 - G4 [Bariton]'</em>) dengan tombol satu klik <strong>'Bagikan ke Instagram Story / TikTok / WhatsApp'</strong> berdesain modern yang memicu rasa penasaran teman-teman pengguna.</li>
        <li><strong>Content &amp; Social Media Marketing (TikTok, Reels, Shorts):</strong> Membuat konten visual: <em>'Membedah Kestabilan Vibrato &amp; Pitch Penyanyi Terkenal di Piano Roll'</em> (analisis akurasi vokal Bruno Mars vs penyanyi amatir) dan video edukasi <em>'Tips Mengatasi Nada Flat Saat Nyanyi Nada Tinggi'</em> memperlihatkan grafik sebelum vs sesudah menggunakan VocalSense AI.</li>
        <li><strong>Penetrasi Komunitas Musik &amp; Paduan Suara Kampus:</strong> Bekerja sama dengan Unit Kegiatan Mahasiswa (UKM) Paduan Suara Mahasiswa (PSM), band kampus, dan komunitas karaoke online (Smule, WeSing) dengan membagikan voucher uji coba Pro Tier gratis 30 hari.</li>
        <li><strong>Search Engine Optimization (SEO):</strong> Mengoptimalkan kata kunci pencarian populer di Google: <em>'tes range vokal online'</em>, <em>'cara cek nada fals'</em>, <em>'belajar vibrato vokal'</em>, dan <em>'tuner vokal bernyanyi gratis'</em>.</li>
    </ul>

    <h1>4. Metode Pengujian dan Tabel Test Case</h1>
    
    <h2>4.1 Penentuan Metode Pengujian (Testing Methodologies):</h2>
    <ul>
        <li><strong>Black Box Testing (Boundary Value Analysis &amp; Equivalence Partitioning):</strong> Menguji fungsionalitas sistem dari sudut pandang pengguna tanpa melihat kode program internal (validasi form autentikasi, batas kuota rekam 60 detik/300 detik/900 detik, responsivitas player audio).</li>
        <li><strong>White Box Testing (Unit Testing &amp; Path Coverage):</strong> Pengujian unit fungsi komputasi matematis internal AI Audio Engine menggunakan <code>pytest</code> (validasi rumus YIN CMNDF, akurasi konversi MIDI A4=440Hz &rarr; 69, deviasi Cents, dan laju vibrato).</li>
        <li><strong>Integration Testing:</strong> Menguji komunikasi antar-modul terdistribusi: aliran blob audio dari Web Audio API ke Redis worker, verifikasi callback webhook Midtrans, dan validasi struktur JSON balasan Gemini LLM API.</li>
        <li><strong>Performance &amp; Stress Testing:</strong> Memvalidasi kepatuhan terhadap NFR: komputasi analisis vokal 60 detik selesai dalam &le; 4 detik, dan rendering kurva nada pada canvas browser stabil pada &ge; 30 FPS.</li>
    </ul>

    <h2>4.2 Tabel Skenario Pengujian (Test Cases):</h2>
    <table class="formal-table">
        <thead>
            <tr>
                <th style="width: 8%;">ID</th>
                <th style="width: 14%;">Modul</th>
                <th style="width: 18%;">Skenario Uji</th>
                <th style="width: 14%;">Data Uji</th>
                <th style="width: 18%;">Langkah Pengujian</th>
                <th style="width: 20%;">Hasil yang Diharapkan</th>
                <th style="width: 8%;">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="bold center">TC-001</td>
                <td>Autentikasi</td>
                <td>Pendaftaran akun dengan email duplikat (Negative Test)</td>
                <td>Email: <code>user@exists.com</code></td>
                <td>1. Buka form registrasi.<br>2. Masukkan email duplikat.<br>3. Klik Daftar.</td>
                <td>Sistem menolak, menampilkan peringatan 'Email sudah terdaftar', tidak ada duplikasi data di database.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-002</td>
                <td>Kalibrasi Tuner</td>
                <td>Pengujian tuner pada nada murni A4 (440 Hz) (Positive Test)</td>
                <td>Generator gelombang sinus 440.0 Hz</td>
                <td>1. Buka modul Chromatic Tuner.<br>2. Berikan izin mic.<br>3. Bunyikan nada 440 Hz.</td>
                <td>Jarum tuner menunjuk tepat pada nada A4 (MIDI 69), deviasi 0 &plusmn; 2 cents, indikator In-Tune hijau aktif.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-003</td>
                <td>Perekam Vokal</td>
                <td>Pembatasan durasi rekam Free Tier tepat 60 detik (Boundary Test)</td>
                <td>Akun berstatus Free Tier</td>
                <td>1. Mulai rekam bernyanyi.<br>2. Biarkan perekaman berjalan hingga detik 60.</td>
                <td>Tepat di detik ke-60 perekaman otomatis berhenti, blob audio dikemas, sistem mengarahkan ke halaman analisis.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-004</td>
                <td>AI Audio Engine</td>
                <td>Deteksi nada Flat (&lt; -20 cents) dan Sharp (&gt; +20 cents)</td>
                <td>Suara uji 430 Hz (Flat) &amp; 450 Hz (Sharp) thd target 440 Hz</td>
                <td>1. Unggah berkas audio uji.<br>2. Jalankan analisis DSP.<br>3. Periksa JSON respon.</td>
                <td>Deviasi terhitung -39.8 cents (Flat) dan +38.9 cents (Sharp) secara presisi, status klasifikasi nada sesuai.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-005</td>
                <td>Piano Roll</td>
                <td>Fitur Note-Sync Playback melompat ke nada fals</td>
                <td>Klik balok notasi fals pada detik 00:14</td>
                <td>1. Buka rapor bernyanyi.<br>2. Klik balok nada merah di detik 14 pada Piano Roll.</td>
                <td>Audio player melompat (seek) tepat ke detik 14.0 dan memutar audio vokal pada potongan tersebut.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-006</td>
                <td>Kontrol Akses</td>
                <td>Penyimpanan rapor permanen oleh akun Free Tier (Security Test)</td>
                <td>Akun berstatus Free Tier</td>
                <td>1. Selesaikan analisis vokal.<br>2. Klik tombol 'Simpan Rapor ke Akun'.</td>
                <td>Sistem mencegah penyimpanan ke S3, memunculkan modal ajakan upgrade 'Tersedia untuk Pengguna Pro/Premium'.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-007</td>
                <td>AI Practice Coach</td>
                <td>Pembangkitan kurikulum tangga nada adaptif oleh Gemini AI</td>
                <td>Histori rapor dengan kelemahan nada flat di oktaf 4</td>
                <td>1. Akun Premium klik 'Buat Rencana Latihan'.<br>2. Backend kirim diagnosis ke Gemini API.</td>
                <td>Gemini menghasilkan silabus JSON 14 hari dengan materi spesifik Solfeggio Arpeggio penguatan register atas.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
            <tr>
                <td class="bold center">TC-008</td>
                <td>Payment Gateway</td>
                <td>Verifikasi webhook pelunasan transaksi Midtrans</td>
                <td>Payload webhook status: 'settlement'</td>
                <td>1. Simulasi bayar via simulator VA.<br>2. Midtrans kirim POST webhook ke server.</td>
                <td>Sistem memverifikasi signature SHA512, status pesanan menjadi 'settled', tier akun otomatis aktif menjadi Pro.</td>
                <td class="center"><span class="badge">Pass</span></td>
            </tr>
        </tbody>
    </table>

    <h1>5. Strategi Agar Orang Lain Mau Menggunakan Sistem (Adopsi &amp; Retensi Pengguna)</h1>
    <p>
        Agar VocalSense AI diadopsi secara luas oleh masyarakat dan menjadi aplikasi latihan bernyanyi pilihan utama, 
        diterapkan 7 pilar strategi akuisisi, aktivasi, dan retensi pengguna berorientasi kemudahan:
    </p>
    <ol>
        <li><strong>Zero-Barrier Onboarding (Akses Seketika Tanpa Hambatan):</strong> Pengguna baru tidak dipaksa registrasi akun atau memasukkan kartu kredit saat pertama berkunjung. Mereka dapat langsung mencoba tes jangkauan vokal dan perekaman 60 detik melalui browser ponsel/laptop mereka. Memangkas tingkat pentalan (bounce rate) lebih dari 60%.</li>
        <li><strong>Instant 'Aha! Moment' dalam 30 Detik Pertama:</strong> Begitu pengguna menyanyikan satu nada ke mikrofon, kanvas visualizer langsung bergerak menampilkan gelombang nada waktu nyata dan mengidentifikasi tipe suaranya (Bass, Bariton, Tenor, Sopran). Umpan balik visual yang cepat ini menghadirkan kepuasan instan (*wow factor*) yang mendorong eksplorasi fitur lebih lanjut.</li>
        <li><strong>Solusi Finansial dan Psikologis atas Masalah Nyata:</strong>
            <ul>
                <li><em>Solusi Finansial:</em> Les vokal privat konvensional berbiaya mahal (Rp 500rb&ndash;Rp 2jt/bulan). VocalSense AI menyediakan bimbingan objektif 24/7 di mana saja hanya dengan Rp 49.000/bulan (hemat lebih dari 90%).</li>
                <li><em>Solusi Psikologis:</em> Banyak penyanyi pemula merasa malu atau takut dihakimi jika bernyanyi fals di depan guru vokal manusia. VocalSense AI menghadirkan ruang privat yang aman dan bebas penilaian subjektif bagi siapa saja untuk bebas berlatih tanpa rasa canggung.</li>
            </ul>
        </li>
        <li><strong>Gamifikasi Pembentukan Kebiasaan ('Duolingo for Singing'):</strong> Membangun keterikatan harian melalui fitur <em>Daily Singing Streak</em> (penghitung konsistensi hari latihan), notifikasi pengingat ramah, serta pembukaan lencana pencapaian (Achievement Badges seperti 'Vibrato Master', 'Octave Conqueror', dan '7-Day Streak'). Visualisasi perluasan tuts piano roll yang membuktikan jangkauan nada mereka bertambah luas dari minggu ke minggu memberikan kepuasan psikologis nyata.</li>
        <li><strong>Social Proof yang Estetik &amp; Viral (Shareable Infographics):</strong> Mengadopsi tren <em>Spotify Wrapped</em>, rapor bernyanyi dan sertifikat jangkauan vokal didesain sangat estetik dan siap dibagikan ke Instagram Story atau TikTok dengan sekali klik. Pengguna yang bangga dengan skornya akan mempromosikan aplikasi secara organik.</li>
        <li><strong>Bimbingan Solutif, Bukan Sekadar Kritik (Actionable AI Guidance):</strong> Aplikasi karaoke biasa hanya memberi skor angka tanpa solusi perbaikan. VocalSense AI menunjukkan balok nada mana yang fals di tuts Piano Roll, memutar ulang audio di detik tersebut (Note-Sync Playback), dan modul AI Gemini langsung memberikan resep latihan tangga nada solfeggio harian yang harus dilatih untuk memperbaiki kelemahan tersebut.</li>
        <li><strong>Tantangan Komunitas &amp; Program Rujukan (Community Challenges):</strong> Mengadakan program berkala '30-Day Pitch Perfection Challenge' di media sosial dengan papan peringkat (leaderboard) transparan dan hadiah langganan Premium gratis bagi peserta dengan progres terbaik. Serta program rujukan: <em>'Ajak 1 teman latihan bernyanyi, dapatkan gratis 1 bulan Pro Tier'</em>.</li>
    </ol>

    </body>
    </html>
    """

    # 1. Render layout to temporary PDF
    temp_pdf_path = 'D:/Kuliah/IPPL/docs/temp_assignment.pdf'
    story = fitz.Story(html=html_content)
    writer = fitz.DocumentWriter(temp_pdf_path)
    rect = fitz.paper_rect('a4') # 595.32 x 841.92 pt
    margin_x = 50
    margin_top = 54
    margin_bottom = 54
    where = rect + (margin_x, margin_top, -margin_x, -margin_bottom)
    
    more = 1
    while more:
        device = writer.begin_page(rect)
        more, _ = story.place(where)
        story.draw(device)
        writer.end_page()
    writer.close()
    
    # 2. Add running headers and footers with pagination
    doc = fitz.open(temp_pdf_path)
    total_pages = doc.page_count
    
    for idx, page in enumerate(doc):
        # Header from page 2 onwards
        if idx > 0:
            page.insert_text(fitz.Point(margin_x, 34), "VocalSense AI - Tugas Rekayasa Perangkat Lunak (IPPL)", fontsize=8.5, fontname="times-italic", color=(0.3, 0.3, 0.3))
            page.insert_text(fitz.Point(375, 34), "Rafael Hotdion L.T (11241075)", fontsize=8.5, fontname="times-italic", color=(0.3, 0.3, 0.3))
            page.draw_line(fitz.Point(margin_x, 38), fitz.Point(rect.width - margin_x, 38), color=(0.7, 0.7, 0.7), width=0.5)
            
        # Footer on all pages
        page.draw_line(fitz.Point(margin_x, rect.height - 40), fitz.Point(rect.width - margin_x, rect.height - 40), color=(0.7, 0.7, 0.7), width=0.5)
        page.insert_text(fitz.Point(margin_x, rect.height - 26), "Dokumen Analisis Rekayasa Perangkat Lunak & Strategi Produk", fontsize=8.5, fontname="times-italic", color=(0.4, 0.4, 0.4))
        page_str = f"Halaman {idx + 1} dari {total_pages}"
        page.insert_text(fitz.Point(rect.width - margin_x - 75, rect.height - 26), page_str, fontsize=8.5, fontname="times-roman", color=(0.3, 0.3, 0.3))
        
    doc.save(pdf_path)
    doc.close()
    del doc
    
    import time
    time.sleep(0.2)
    try:
        if os.path.exists(temp_pdf_path):
            os.remove(temp_pdf_path)
    except Exception:
        pass
        
    print(f"Final PDF with headers and footers generated at: {pdf_path} (Total Pages: {total_pages})")

if __name__ == "__main__":
    generate_pdf()
