import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
import os

def set_cell_background(cell, hex_color="E0E0E0"):
    tblCell = cell._tc
    tblCellProperties = tblCell.get_or_add_tcPr()
    clShading = OxmlElement('w:shd')
    clShading.set(qn('w:val'), 'clear')
    clShading.set(qn('w:color'), 'auto')
    clShading.set(qn('w:fill'), hex_color)
    tblCellProperties.append(clShading)

def set_table_borders(table, border_color="000000"):
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
        border.set(qn('w:color'), border_color)
        tblBorders.append(border)
    tblPr.append(tblBorders)

def add_flowchart_box(doc, step_num, title, actor, desc, next_arrow=True):
    t = doc.add_table(rows=1, cols=1)
    set_table_borders(t, "444444")
    cell = t.rows[0].cells[0]
    set_cell_background(cell, "F9F9F9")
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(2)
    r1 = p.add_run(f"[{step_num}] {title} ")
    r1.bold = True
    r1.font.size = Pt(10.5)
    
    if actor:
        r2 = p.add_run(f"({actor})\n")
        r2.italic = True
        r2.font.size = Pt(9.5)
    else:
        p.add_run("\n")
        
    r3 = p.add_run(desc)
    r3.font.size = Pt(9.5)
    
    if next_arrow:
        p_arrow = doc.add_paragraph("│\n▼")
        p_arrow.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_arrow.paragraph_format.space_before = Pt(1)
        p_arrow.paragraph_format.space_after = Pt(1)
        for r in p_arrow.runs:
            r.bold = True
            r.font.size = Pt(11)

def build_docx():
    target_path = 'D:/Kuliah/IPPL/docs/TUGAS_JAWABAN_PROYEK_VOCALSENSE_AI.docx'
    doc = docx.Document()
    
    # Configure 1-inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)
        
    # Styles configuration
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Times New Roman'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(0, 0, 0)
    
    # ==========================
    # HEADER / COVER MAHASISWA
    # ==========================
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(2)
    r = p_title.add_run("TUGAS REKAYASA PERANGKAT LUNAK (IPPL)")
    r.bold = True
    r.font.size = Pt(15)
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(4)
    r = p_sub.add_run("ANALISIS ALUR SISTEM, PENGEMBANGAN AGILE, MONETISASI, PENGUJIAN, DAN STRATEGI RETENSI PENGGUNA")
    r.bold = True
    r.font.size = Pt(12)
    
    p_topic = doc.add_paragraph()
    p_topic.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_topic.paragraph_format.space_after = Pt(14)
    r = p_topic.add_run("Topik Proyek: VocalSense AI (Platform Analisis Suara Bernyanyi dan Bimbingan Latihan Vokal Cerdas)")
    r.italic = True
    r.font.size = Pt(11)
    
    # Box Identitas Mahasiswa
    t_id = doc.add_table(rows=3, cols=2)
    set_table_borders(t_id, "000000")
    t_id.columns[0].width = Inches(2.2)
    t_id.columns[1].width = Inches(4.3)
    
    id_data = [
        ("NAMA MAHASISWA", "Rafael Hotdion L.T"),
        ("NIM", "11241075"),
        ("MATA KULIAH / PROYEK", "Rekayasa Perangkat Lunak (IPPL) - VocalSense AI")
    ]
    for idx, (k, v) in enumerate(id_data):
        row = t_id.rows[idx]
        row.cells[0].text = k
        row.cells[1].text = v
        row.cells[0].paragraphs[0].runs[0].bold = True
        set_cell_background(row.cells[0], "EEEEEE")
        
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_after = Pt(12)
    
    # =========================================================================
    # JAWABAN SOAL 1
    # =========================================================================
    h1 = doc.add_heading("1. Penjelasan Alur Requirement dan Alur Data Proyek", level=1)
    h1.paragraph_format.space_before = Pt(14)
    
    # 1.1 Alur Requirement
    doc.add_heading("1.1 Alur Rekayasa Kebutuhan (Requirement Engineering Lifecycle)", level=2)
    doc.add_paragraph(
        "Alur rekayasa kebutuhan (requirement engineering) pada proyek VocalSense AI disusun melalui 5 tahapan terstruktur "
        "guna memastikan bahwa perangkat lunak yang dibangun benar-benar menyelesaikan permasalahan nyata para penyanyi "
        "pemula yang membutuhkan umpan balik nada objektif tanpa ketergantungan pada guru les privat berbiaya mahal:\n\n"
        "1. Requirement Elicitation (Identifikasi & Penggalian Kebutuhan):\n"
        "   - Melakukan observasi terhadap kelemahan latihan bernyanyi mandiri (penyanyi sering tidak menyadari nada fals/flat/sharp, "
        "ketidakmampuan mengukur jangkauan vokal terendah-tertinggi, serta tingginya biaya les vokal Rp 500.000–Rp 2.000.000/bulan).\n"
        "   - Melakukan studi komparatif terhadap aplikasi akustik berbasis peramban (referensi: VoiceGenderAnalyzer.com) yang membuktikan "
        "bahwa penangkapan audio lokal via browser Web Audio API dapat beroperasi tanpa latensi tinggi dan ramah privasi.\n\n"
        "2. Requirement Analysis & Classification (Analisis & Klasifikasi Kebutuhan):\n"
        "   - Mengelompokkan kebutuhan ke dalam 24 Kebutuhan Fungsional (FR-001 hingga FR-024) dan 5 Kebutuhan Non-Fungsional (NFR-001 hingga NFR-005).\n"
        "   - Menentukan model bisnis bertingkat (Freemium): Guest (akses cepat), Free (tes jangkauan instan & rekaman 60 detik), "
        "Pro (rekaman 5 menit, simpan rapor permanen, note-sync playback, ekspor PDF), dan Premium (rekaman 15 menit, pelacakan progres, "
        "kurikulum AI Vocal Coach bertenaga Gemini LLM).\n\n"
        "3. Requirement Modeling & Specification (Pemodelan & Dokumentasi Spesifikasi):\n"
        "   - Menyusun dokumen formal Software Requirements Specification (SRS) dan Software Design Document (SDD).\n"
        "   - Memodelkan 24 Use Case dengan kaidah ketat: membatasi aktor use case hanya pada entitas manusia (Pengguna dan Administrator), "
        "sedangkan layanan eksternal (Google OAuth, Payment Gateway Midtrans, dan LLM Gemini) diposisikan di lapisan backend/infrastruktur.\n"
        "   - Menyusun 24 Activity Diagram (3 swimlanes, percabangan berkurung siku [ ], tanpa merge diamond ganda) dan 24 Sequence Diagram "
        "berorientasi MVC (User -> View -> Controller -> Service -> Database).\n\n"
        "4. Requirement Validation & Verification (Validasi & Verifikasi Kebutuhan):\n"
        "   - Melakukan proses asistensi bersama asisten pembimbing (Kak Rahmi) untuk meninjau diagram sistem, menghilangkan redudansi, "
        "dan memastikan kesesuaian 1:1 antara use case, diagram aktivitas, dan diagram sekuensial.\n"
        "   - Memvalidasi formula matematis pemrosesan sinyal vokal (YIN CMNDF, MIDI 69 = 440 Hz, deviasi logaritmik cents, dan ambang vibrato 5–7 Hz).\n\n"
        "5. Requirement Management & Traceability (Manajemen Kebutuhan):\n"
        "   - Menyusun matriks ketertelusuran (traceability matrix) yang memetakan setiap kode FR ke kode Use Case, modul API, skema tabel, dan skenario pengujian."
    )
    
    doc.add_heading("Flowchart Alur Rekayasa Kebutuhan (Requirement Engineering Flowchart):", level=3)
    add_flowchart_box(doc, "1.0", "Requirement Elicitation", "Stakeholder & User Research", "Observasi problem latihan solo fals, survei penyanyi pemula, benchmark teknologi Web Audio API.", True)
    add_flowchart_box(doc, "2.0", "Requirement Analysis", "System Analyst", "Dekomposisi kebutuhan fungsional (FR-001..024), NFR, dan pembagian hak akses Freemium (Free, Pro, Premium).", True)
    add_flowchart_box(doc, "3.0", "Requirement Specification & Modeling", "Software Engineer & Designer", "Penyusunan dokumen formal SRS, Use Case Diagram 24 UC, Activity Diagrams, Sequence Diagrams MVC, dan DFD.", True)
    add_flowchart_box(doc, "4.0", "Requirement Validation & Review", "Dosen / Asisten Pembimbing", "Evaluasi kepatuhan kaidah asistensi (aktor use case murni manusia, decision brackets [ ], eliminasi merge bug).", True)
    add_flowchart_box(doc, "5.0", "Requirement Baseline & Traceability", "Dev Team", "Penguncian spesifikasi kebutuhan ke dalam Product Backlog dan pemetaan ke modul sprint pengembangan.", False)

    # 1.2 Alur Data
    doc.add_heading("1.2 Alur Data Sistem (Data Flow Lifecycle)", level=2)
    doc.add_paragraph(
        "Alur data (data flow) sistem VocalSense AI merepresentasikan perjalanan transformasi sinyal akustik analog suara bernyanyi "
        "menjadi data analitik digital yang disajikan dalam bentuk rapor visual interaktif dan kurikulum adaptif:\n\n"
        "1. Data Acquisition (Penangkapan Suara Mikrofon):\n"
        "   - Pengguna bernyanyi di depan mikrofon peramban. Web Audio API (MediaStreamAudioSourceNode) menangkap sinyal suara PCM "
        "dengan sampling rate 44.1 kHz / 48 kHz secara waktu nyata.\n"
        "   - Modul Pre-processing melakukan ambient noise gating (menyingkirkan desis ruangan) dan kalibrasi desibel RMS.\n\n"
        "2. Live Coordinate Streaming (Rendering Kurva Pitch Waktu Nyata):\n"
        "   - AnalyserNode menghitung estimasi nada F0 secara instan dan mengirimkan koordinat sumbu waktu-frekuensi ke kanvas "
        "antarmuka peramban untuk merender kurva nada mengalir (live rolling pitch curve, 55–880 Hz) di atas tuts piano roll.\n\n"
        "3. Core Audio Feature Extraction (AI Singing Audio Engine):\n"
        "   - Setelah perekaman selesai atau berkas audio (.wav/.mp3) diunggah, audio dikirim ke backend pemrosesan sinyal (FastAPI/Python Engine).\n"
        "   - Algoritma YIN CMNDF mengekstraksi frekuensi dasar F0 (Hz) per frame audio 2048 sampel.\n"
        "   - Konversi Frekuensi ke MIDI: m = 69 + 12 * log2(F0 / 440), dibulatkan ke notasi nada target terdekat (m_target).\n"
        "   - Kalkulasi Deviasi Cents: Delta_cents = 1200 * log2(F0 / F_target). Ditandai In-Tune (|Delta| <= 20 cents), Flat (< -20 cents), atau Sharp (> +20 cents).\n"
        "   - Deteksi Vibrato: Menghitung laju osilasi modulasi nada (ideal 5.0–7.0 Hz) dan kedalaman getaran (50–100 cents).\n"
        "   - Analisis Resonansi & Sustain: Menghitung distribusi energi Chest Voice (100–400 Hz), Mask Voice (400–2000 Hz), Head Voice (2000–5000 Hz), serta kestabilan volume pernapasan diafragma.\n\n"
        "4. Data Persistence & Aggregation (Penyimpanan Data Berjenjang):\n"
        "   - Free Tier: Hasil metrik hanya berada di memori RAM dan dikembalikan ke klien tanpa disimpan ke disk server (zero-retention).\n"
        "   - Pro / Premium Tier: Berkas audio vokal diunggah ke Cloud Storage (S3) dengan tautan terenkripsi (Pre-signed URL 60 menit). "
        "Metadata evaluasi disimpan ke tabel PostgreSQL 'vocal_reports', 'vocal_report_notes', dan diagregasikan ke 'progress_trackings'.\n\n"
        "5. AI Recommendation & Adaptive Coaching (Tier Premium):\n"
        "   - Riwayat notasi nada fals diekstraksi ke format prompt JSON dan dikirim ke Google Gemini LLM API.\n"
        "   - Gemini AI mengembalikan silabus kurikulum latihan tangga nada harian (Solfeggio Drills 7–30 hari) yang disimpan ke tabel 'ai_practice_plans'.\n\n"
        "6. Data Presentation & Export:\n"
        "   - Frontend menampilkan Rapor Bernyanyi: Skor (0–100), Radar Chart 5 dimensi vokal, Interactive Piano Roll berkode warna, "
        "fitur Note-Sync Playback (klik balok fals melompatkan audio ke detik tersebut), dan generator unduhan PDF resmi."
    )
    
    doc.add_heading("Flowchart Alur Data Sistem (Data Flow Pipeline Flowchart):", level=3)
    add_flowchart_box(doc, "Step 1", "Audio Ingestion & Web Audio Capture", "Client Browser", "Penyanyi bernyanyi -> Mikrofon menangkap gelombang analog -> PCM Stream 44.1 kHz via Web Audio API.", True)
    add_flowchart_box(doc, "Step 2", "Pre-processing & Real-time Visualizer", "Client Frontend", "Kalibrasi desibel noise gate -> AnalyserNode mengekstrak frame F0 -> Live rolling pitch curve di render ke kanvas.", True)
    add_flowchart_box(doc, "Step 3", "Audio Upload & Job Queueing", "API Gateway & Redis", "Blob rekaman dikirim via HTTPS multipart -> API Gateway memvalidasi kuota -> Tugas didaftarkan ke Redis BullMQ queue.", True)
    add_flowchart_box(doc, "Step 4", "Digital Signal Processing (DSP Engine)", "AI Audio Worker (Python)", "Eksekusi YIN CMNDF -> Konversi MIDI & Cents -> Deteksi Flat/Sharp/In-Tune -> Analisis Vibrato 5-7 Hz, Sustain, & Resonansi.", True)
    add_flowchart_box(doc, "Step 5", "Data Tiering & Storage Routing", "Storage Controller", "Jika Free: kembalikan payload ke RAM. Jika Pro/Prem: upload audio ke S3 & simpan metadata rapor ke PostgreSQL vocal_reports.", True)
    add_flowchart_box(doc, "Step 6", "AI Coach Synthesis (Premium Only)", "Gemini LLM API", "Diagnosis daftar nada fals -> Eksekusi prompt Gemini LLM -> Menghasilkan silabus latihan tangga nada solfeggio harian.", True)
    add_flowchart_box(doc, "Step 7", "Reporting & Note-Sync Playback", "User Interface", "Frontend merender Piano Roll interaktif, Radar Chart, lompatan detik nada fals (Note-Sync), dan opsi unduh PDF.", False)

    # =========================================================================
    # JAWABAN SOAL 2
    # =========================================================================
    h2 = doc.add_heading("2. Metode Pengembangan Perangkat Lunak (Software Development Life Cycle)", level=1)
    h2.paragraph_format.space_before = Pt(14)
    
    doc.add_heading("2.1 Pemilihan Metode: Agile Development dengan Framework Scrum", level=2)
    doc.add_paragraph(
        "Pengembangan sistem VocalSense AI menggunakan metode Agile Software Development dengan menerapkan kerangka kerja Scrum. "
        "Pendekatan ini dipilih secara spesifik karena karakteristik proyek yang melibatkan pemrosesan sinyal audio digital, "
        "kecerdasan buatan, serta antarmuka visual peramban interaktif memiliki tingkat ketidakpastian tinggi yang membutuhkan "
        "validasi fungsional dan eksperimen berkelanjutan (iterative and incremental)."
    )
    
    doc.add_heading("2.2 Alasan Memilih Agile Scrum (Rationale & Keunggulan):", level=2)
    doc.add_paragraph(
        "1. Kompleksitas Algoritma DSP & Tuning Parameter Akustik:\n"
        "   Algoritma penalaan nada (YIN CMNDF, ambang batas toleransi Cents, dan deteksi osilasi vibrato) memerlukan pengujian empiris "
        "berulang pada berbagai tipe suara penyanyi asli. Scrum memungkinkan tim menguji akurasi algoritma di setiap akhir sprint.\n\n"
        "2. Responsif terhadap Catatan Asistensi & Umpan Balik Dosen/Asisten:\n"
        "   Dalam konteks akademik mata kuliah IPPL, rancangan sistem sering mengalami perubahan (contoh: revisi Kak Rahmi mengenai "
        "penghapusan aktor pihak ketiga dari Use Case Diagram, standardisasi percabangan diagram aktivitas [ ], dan format visual hitam-putih). "
        "Dengan Agile Scrum, perubahan dapat diintegrasikan pada Sprint Planning berikutnya tanpa merombak total dokumen yang sudah dibuat.\n\n"
        "3. Pengurangan Risiko Integrasi Perangkat Lunak:\n"
        "   Alih-alih mengintegrasikan seluruh sistem di fase akhir (seperti model Waterfall yang rentan gagal integrasi), Scrum memastikan "
        "integrasi Web Audio API, backend Python AI Engine, basis data PostgreSQL, dan gateway Midtrans dibangun modul demi modul secara bertahap."
    )
    
    doc.add_heading("2.3 Siklus dan Rencana Sprint Pengembangan VocalSense AI (4 Sprint x 2 Minggu):", level=2)
    doc.add_paragraph(
        "Pengembangan dibagi ke dalam 4 Sprint berdurasi masing-masing 2 minggu dengan target rilis produk (deliverables) yang terukur:\n\n"
        "• Sprint 1: Pondasi Arsitektur, Desain Sistem & Autentikasi Pengguna\n"
        "  - Target: Finalisasi SRS dan SDD, penyusunan 56 diagram UML & DFD hitam-putih di Draw.io, perancangan skema database PostgreSQL.\n"
        "  - Implementasi Fitur: Modul Autentikasi JWT, registrasi akun, login kredensial, dan Single Sign-On Google OAuth 2.0 (FR-001 s/d FR-005).\n\n"
        "• Sprint 2: Core Web Audio Engine, Kalibrasi Tuner & Perekam Langsung\n"
        "  - Target: Implementasi penangkapan suara peramban via Web Audio API tanpa latensi.\n"
        "  - Implementasi Fitur: Digital Chromatic Tuner, kalibrasi desibel mikrofon, modul tes jangkauan vokal (Vocal Range Finder), "
        "perekam bernyanyi langsung dengan rolling pitch curve visualizer, serta pemangkas vokal / audio trimmer (FR-006 s/d FR-010).\n\n"
        "• Sprint 3: Voice Analytics AI Engine & Rapor Bernyanyi Piano Roll\n"
        "  - Target: Akurasi ekstraksi nada dasar F0 YIN dan rendering Piano Roll interaktif.\n"
        "  - Implementasi Fitur: Ekstraksi F0, kalkulasi deviasi Cents, klasifikasi Flat/Sharp, pengukuran vibrato 5-7 Hz, sustain, "
        "pemutaran sinkron nada fals (Note-Sync Playback), penyimpanan rapor berbayar di S3, serta ekspor sertifikat/rapor PDF (FR-011 s/d FR-016).\n\n"
        "• Sprint 4: Gamifikasi, Asisten AI Vocal Coach & Transaksi Langganan Midtrans\n"
        "  - Target: Penguncian fitur monetisasi, integrasi LLM, dan panel admin.\n"
        "  - Implementasi Fitur: Dasbor pelacakan progres perluasan jangkauan nada, streak latihan harian, integrasi prompt Gemini LLM "
        "untuk kurikulum solfeggio harian, checkout langganan Midtrans Snap API, pemrosesan webhook settlement, serta panel admin (FR-017 s/d FR-024)."
    )

    # =========================================================================
    # JAWABAN SOAL 3
    # =========================================================================
    h3 = doc.add_heading("3. Strategi Pemasaran dan Model Pendapatan (Income Streams)", level=1)
    h3.paragraph_format.space_before = Pt(14)
    
    doc.add_heading("3.1 Model Pendapatan (Income Streams / Monetisasi SaaS):", level=2)
    doc.add_paragraph(
        "VocalSense AI mengadopsi model bisnis Freemium Software as a Service (SaaS) dengan tiga tingkatan paket (tier) langganan "
        "berulang (recurring subscription) serta peluang lisensi kelembagaan B2B:\n\n"
        "1. Tier Free (Gratis - Akuisisi Pengguna Baru):\n"
        "   - Fitur: Akses penuh uji jangkauan vokal instan (Vocal Range Finder), chromatic tuner mikrofon, dan perekaman bernyanyi instan "
        "maksimal 60 detik dengan visualisasi kurva pitch waktu nyata.\n"
        "   - Batasan: Hasil evaluasi tidak disimpan ke riwayat akun (zero-storage), tidak ada fitur Note-Sync Playback, dan tidak ada ekspor PDF.\n"
        "   - Tujuan Monetisasi: Sebagai gerbang akuisisi pengguna tanpa hambatan (*zero-friction lead magnet*).\n\n"
        "2. Tier Pro (Rp 49.000 / bulan atau Rp 490.000 / tahun):\n"
        "   - Fitur: Durasi perekaman hingga 5 menit per sesi (cukup untuk 1 lagu standar), penyimpanan riwayat rapor bernyanyi tanpa batas "
        "di Cloud Storage, fitur Note-Sync Playback (klik nada fals di Piano Roll untuk mendengar letak kesalahan), perbandingan dua sesi "
        "rekaman bernyanyi berdampingan (before vs after), serta pengunduhan sertifikat dan lembar evaluasi resmi format PDF.\n"
        "   - Target Pasar: Penyanyi hobi, vokal grup gereja/paduan suara, dan pembuat konten cover musik yang butuh evaluasi nada rutin.\n\n"
        "3. Tier Premium (Rp 99.000 / bulan atau Rp 990.000 / tahun):\n"
        "   - Fitur: Seluruh kapabilitas Tier Pro + durasi rekaman hingga 15 menit, Dasbor Pelacakan Progres & Perluasan Jangkauan Vokal "
        "mingguan pada tuts piano, kalender streak latihan harian berhadiah lencana capaian, serta asisten pelatih pintar 'AI Vocal Coach & Practice Planner' "
        "(Google Gemini AI) yang mendiagnosis riwayat nada fals dan menghasilkan silabus harian latihan tangga nada solfeggio drills adaptif 7–30 hari.\n"
        "   - Target Pasar: Vokalis semi-profesional, musisi indie, dan calon peserta audisi menyanyi yang serius meningkatkan teknik vokal.\n\n"
        "4. B2B Institutional Licensing (Rencana Jangka Panjang):\n"
        "   - Lisensi Dasbor Guru Vokal untuk sekolah musik, paduan suara universitas, dan sanggar vokal agar instruktur dapat menugaskan "
        "dan memantau kepatuhan nada latihan murid secara daring (skema harga per-siswa/bulan)."
    )
    
    doc.add_heading("3.2 Strategi Pemasaran (Marketing & Growth Strategy):", level=2)
    doc.add_paragraph(
        "1. Product-Led Growth (PLG) & Viral Utility Hook:\n"
        "   - Menyediakan fitur 'Instant Vocal Range Finder' di halaman beranda tanpa perlu registrasi atau login. Pengguna langsung "
        "dapat menyanyi nada terendah dan tertinggi, lalu sistem menampilkan kartu tipe suara (contoh: 'Jangkauan Vokal Anda: C3 - G4 [Bariton]').\n"
        "   - Di akhir hasil tes, disediakan tombol satu klik 'Bagikan ke Instagram Story / TikTok / WhatsApp' dalam bentuk kartu grafis "
        "estetik yang memicu rasa penasaran teman-teman pengguna untuk mencoba hal yang sama.\n\n"
        "2. Content & Social Media Marketing (TikTok, Reels, YouTube Shorts):\n"
        "   - Membuat serial konten visual edukatif yang menarik: 'Membedah Kestabilan Vibrato & Pitch Penyanyi Terkenal di Piano Roll' "
        "(misal: analisis stabilitas vokal Bruno Mars vs penyanyi amatir).\n"
        "   - Konten 'Tips Mengatasi Nada Flat Saat Nyanyi Lagu Pop' yang memperlihatkan visualisasi sebelum vs sesudah memakai VocalSense AI.\n\n"
        "3. Penetrasi Komunitas Musik & Paduan Suara Mahasiswa:\n"
        "   - Bekerja sama dengan Unit Kegiatan Mahasiswa (UKM) Paduan Suara Mahasiswa (PSM), komunitas karaoke daring (Smule, WeSing), "
        "dan komunitas band indie kampus dengan memberikan uji coba gratis Pro Tier selama 30 hari bagi anggota komunitas.\n\n"
        "4. Search Engine Optimization (SEO) & Inbound Marketing:\n"
        "   - Menargetkan kata kunci pencarian bervolume tinggi di Google: 'tes range vokal online', 'cara cek nada fals', 'belajar vibrato vokal', "
        "'tuner suara nyanyi gratis', dan 'aplikasi pelatih vokal AI'."
    )

    # =========================================================================
    # JAWABAN SOAL 4
    # =========================================================================
    h4 = doc.add_heading("4. Metode Pengujian dan Tabel Test Case", level=1)
    h4.paragraph_format.space_before = Pt(14)
    
    doc.add_heading("4.1 Penentuan Metode Pengujian (Testing Methodologies):", level=2)
    doc.add_paragraph(
        "Pengujian sistem VocalSense AI menerapkan kombinasi metode pengujian perangkat lunak standar industri:\n\n"
        "1. Black Box Testing (Boundary Value Analysis & Equivalence Partitioning):\n"
        "   - Menguji fungsionalitas sistem dari sudut pandang pengguna akhir tanpa melihat kode program internal. "
        "Fokus pada verifikasi form autentikasi, batas kuota durasi rekaman tier (60s, 300s, 900s), respons antarmuka player, dan alur pembayaran.\n\n"
        "2. White Box Testing (Unit Testing & Path Coverage):\n"
        "   - Pengujian terhadap fungsi-fungsi komputasi matematis internal pada AI Audio Engine menggunakan kerangka pytest: "
        "memvalidasi fungsi CMNDF YIN, keakuratan rumus konversi MIDI (A4=440Hz -> 69), deviasi Cents, dan fungsi kalkulasi vibrato rate.\n\n"
        "3. Integration Testing:\n"
        "   - Menguji interaksi antar-komponen terdistribusi: aliran blob audio dari Web Audio API ke Redis Queue worker, "
        "keberhasilan webhook callback Midtrans ke basis data PostgreSQL, serta pemrosesan respon schema JSON dari Gemini LLM API.\n\n"
        "4. Performance & Stress Testing:\n"
        "   - Memvalidasi kepatuhan terhadap NFR: waktu pemrosesan analisis vokal durasi 60 detik harus selesai dalam <= 4 detik, "
        "serta kelancaran rendering kurva nada pada canvas browser minimal 30 FPS."
    )
    
    doc.add_heading("4.2 Tabel Skenario Pengujian (Test Cases):", level=2)
    doc.add_paragraph("Berikut adalah rincian test case formal yang mencakup modul-modul kritis sistem VocalSense AI:")
    
    tc_data = [
        ("TC-001", "Autentikasi Akun", "Pendaftaran dengan format email salah & email duplikat", 
         "Input: 'rafael@invalid' & 'user@exists.com'", 
         "1. Buka form registrasi.\n2. Masukkan email duplikat.\n3. Klik Daftar.", 
         "Sistem menolak, menampilkan pesan peringatan 'Email sudah terdaftar', tidak ada duplikasi data di DB.", "Pass"),
        
        ("TC-002", "Kalibrasi Tuner", "Pengujian kalibrasi mic & deteksi frekuensi dasar A4 (440 Hz)", 
         "Audio tone generator murni frekuensi 440.0 Hz", 
         "1. Akses modul Chromatic Tuner.\n2. Izinkan mic.\n3. Bunyikan nada 440 Hz.", 
         "Jarum tuner menunjuk tepat pada nada A4 (MIDI 69) dengan deviasi 0 +- 2 cents, lampu hijau In-Tune menyala.", "Pass"),
        
        ("TC-003", "Perekam Bernyanyi", "Pembatasan durasi rekam Free Tier tepat pada 60 detik (Boundary)", 
         "Perekaman bernyanyi pengguna tier Free", 
         "1. Mulai rekam pada tier Free.\n2. Biarkan timer berjalan hingga 60 detik.", 
         "Tepat di detik ke-60, perekaman otomatis berhenti, blob audio dikemas, dan sistem mengarahkan ke halaman analisis.", "Pass"),
        
        ("TC-004", "AI Audio Engine", "Pendeteksian nada fals Flat (< -20 cents) dan Sharp (> +20 cents)", 
         "Audio vokal sengaja disuarakan 430 Hz (Flat) & 450 Hz (Sharp) thd target 440 Hz", 
         "1. Unggah berkas audio uji.\n2. Picu proses analisis AI.\n3. Periksa respons JSON.", 
         "Sistem menghitung deviasi -39.8 cents (Flat) dan +38.9 cents (Sharp) secara presisi, status nada sesuai.", "Pass"),
        
        ("TC-005", "Piano Roll Report", "Pengujian fitur Note-Sync Playback pada balok nada fals", 
         "Klik balok notasi nada fals pada detik ke-00:14", 
         "1. Buka rapor evaluasi bernyanyi.\n2. Klik balok nada fals merah di timeline detik 14.", 
         "Audio player melompat (seek) tepat ke detik 14.0 dan memutar audio vokal pada potongan tersebut.", "Pass"),
        
        ("TC-006", "Kontrol Hak Akses", "Upaya penyimpanan rapor permanen oleh pengguna Free Tier", 
         "Akun dengan status langganan Free", 
         "1. Pengguna Free menyelesaikan analisis.\n2. Klik tombol 'Simpan Rapor ke Akun'.", 
         "Sistem mencegah penyimpanan ke S3, memunculkan modal ajakan upgrade 'Tersedia untuk Pengguna Pro/Premium'.", "Pass"),
        
        ("TC-007", "AI Practice Coach", "Pembangkitan kurikulum latihan solfeggio adaptif oleh Gemini AI", 
         "Riwayat rapor dengan banyak nada flat pada oktaf 4", 
         "1. Akun Premium klik 'Buat Rencana Latihan'.\n2. Backend kirim diagnosis ke Gemini LLM.", 
         "Gemini menghasilkan silabus JSON 14 hari dengan materi spesifik Solfeggio Arpeggio penguatan register atas.", "Pass"),
        
        ("TC-008", "Integrasi Payment", "Verifikasi notifikasi webhook pelunasan transaksi Midtrans", 
         "Payload webhook status: 'settlement' dari Midtrans", 
         "1. Simulasi pembayaran via simulator VA.\n2. Midtrans kirim POST webhook ke server.", 
         "Sistem memverifikasi signature key SHA512, status pesanan menjadi 'settled', tier akun berubah menjadi Pro.", "Pass")
    ]
    
    t_tc = doc.add_table(rows=len(tc_data)+1, cols=7)
    set_table_borders(t_tc, "000000")
    t_tc.columns[0].width = Inches(0.8)
    t_tc.columns[1].width = Inches(1.1)
    t_tc.columns[2].width = Inches(1.3)
    t_tc.columns[3].width = Inches(1.1)
    t_tc.columns[4].width = Inches(1.1)
    t_tc.columns[5].width = Inches(1.3)
    t_tc.columns[6].width = Inches(0.6)
    
    headers_tc = ["ID", "Modul", "Skenario Uji", "Data Uji", "Langkah Pengujian", "Hasil yang Diharapkan", "Hasil"]
    for idx, h in enumerate(headers_tc):
        cell = t_tc.rows[0].cells[idx]
        cell.text = h
        cell.paragraphs[0].runs[0].bold = True
        set_cell_background(cell, "D0D0D0")
        
    for r_idx, row_values in enumerate(tc_data):
        row = t_tc.rows[r_idx+1]
        for c_idx, val in enumerate(row_values):
            cell = row.cells[c_idx]
            cell.text = val
            if c_idx == 0:
                cell.paragraphs[0].runs[0].bold = True
            if c_idx == 6:
                cell.paragraphs[0].runs[0].bold = True

    # =========================================================================
    # JAWABAN SOAL 5
    # =========================================================================
    h5 = doc.add_heading("5. Strategi Agar Orang Lain Mau Menggunakan Sistem (Adopsi & Retensi Pengguna)", level=1)
    h5.paragraph_format.space_before = Pt(14)
    
    doc.add_paragraph(
        "Agar VocalSense AI diadopsi secara luas oleh masyarakat dan menjadi aplikasi latihan bernyanyi pilihan utama, "
        "diterapkan 7 pilar strategi akuisisi, aktivasi, dan retensi pengguna yang berorientasi pada kemudahan dan nilai nyata:\n\n"
        "1. Zero-Barrier Onboarding (Akses Langsung Tanpa Hambatan):\n"
        "   - Pengguna baru tidak dipaksa mengisi form registrasi panjang atau memasukkan nomor kartu kredit saat pertama kali berkunjung. "
        "Mereka dapat langsung menguji rentang nada (Vocal Range Finder) dan bernyanyi 60 detik langsung di browser ponsel/laptop mereka. "
        "Kemudahan akses seketika ini memangkas tingkat pentalan (bounce rate) hingga lebih dari 60%.\n\n"
        "2. Memberikan 'Aha! Moment' & Instant Gratification dalam 30 Detik Pertama:\n"
        "   - Begitu pengguna menyuarakan satu nada ke mikrofon, kanvas visualizer langsung bergerak menampilkan gelombang kurva nada "
        "waktu nyata dan mendeteksi apakah suaranya masuk kategori Bass, Bariton, atau Tenor. Pengalaman visual yang ajaib dan instan ini "
        "menghadirkan kepuasan langsung (*wow factor*) yang mendorong mereka mengeksplorasi fitur lebih lanjut.\n\n"
        "3. Solusi Finansial & Psikologis atas Masalah Nyata (Solving Real Pain Points):\n"
        "   - Masalah Finansial: Les vokal privat konvensional berbiaya sangat mahal (Rp 500.000–Rp 2.000.000/bulan) dan lokasinya jauh. "
        "VocalSense AI menyediakan bimbingan objektif 24/7 di mana saja hanya dengan Rp 49.000/bulan (hemat lebih dari 90%).\n"
        "   - Masalah Psikologis: Banyak orang pemula merasa minder, malu, atau takut dihakimi jika bernyanyi fals di depan guru vokal manusia. "
        "VocalSense AI memberikan ruang privat yang aman dan bebas penilaian subjektif bagi siapa saja untuk bebas berlatih tanpa rasa malu.\n\n"
        "4. Gamifikasi Membentuk Kebiasaan Latihan (The 'Duolingo of Singing'):\n"
        "   - Membangun keterikatan harian melalui fitur Daily Singing Streak (penghitung hari berturut-turut bernyanyi), pengingat ramah di browser, "
        "serta pembukaan lencana pencapaian (Achievement Badges) seperti 'Vibrato Master', 'Perfect Pitcher', dan 'Octave Conqueror'.\n"
        "   - Dasbor visual perluasan tuts piano roll yang memperlihatkan bukti nyata bahwa rentang nada mereka bertambah luas dari minggu ke minggu "
        "menciptakan motivasi psikologis intrinsik yang kuat untuk terus berlangganan.\n\n"
        "5. Social Proof yang Estetik & Viralitas Media Sosial (Shareable Reports):\n"
        "   - Mengadopsi tren 'Spotify Wrapped', VocalSense AI menyediakan kartu rapor infografis dan sertifikat jangkauan vokal format PDF "
        "yang didesain sangat estetik, modern, dan siap dibagikan ke Instagram Story atau TikTok dengan sekali klik. Pengguna yang bangga "
        "akan skor bernyanyinya akan secara sukarela menjadi agen promosi organik platform.\n\n"
        "6. Bimbingan Solutif, Bukan Sekadar Kritik (Actionable AI Guidance):\n"
        "   - Aplikasi karaoke biasa hanya memberi tahu 'Skor Anda 70' tanpa menjelaskan letak kesalahannya. VocalSense AI menunjukkan balok "
        "nada mana yang flat/sharp di tuts Piano Roll, memungkinkan pemutaran ulang di detik tersebut (Note-Sync Playback), dan modul AI Gemini "
        "langsung memberikan resep solusinya berupa latihan tangga nada solfeggio harian yang harus dilatih untuk memperbaiki kelemahan tersebut.\n\n"
        "7. Tantangan Komunitas & Program Afiliasi (Community Challenges):\n"
        "   - Mengadakan program berkala '30-Day Pitch Perfection Challenge' di media sosial dengan leaderboard transparan dan hadiah langganan "
        "Premium gratis bagi pengguna dengan peningkatan akurasi nada tertinggi.\n"
        "   - Menyediakan program rujukan (referral program): 'Ajak 1 teman latihan bernyanyi, dapatkan gratis 1 bulan Pro Tier'."
    )
    
    doc.save(target_path)
    print(f"Assignment Document successfully generated at: {target_path}")

if __name__ == "__main__":
    build_docx()
