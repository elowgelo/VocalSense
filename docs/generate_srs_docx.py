import docx
import shutil
import re
import os
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def set_cell_background(cell, hex_color="D9D9D9"):
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
        border.set(qn('w:color'), '000000')
        tblBorders.append(border)
    tblPr.append(tblBorders)

def parse_markdown():
    md_path = 'D:/Kuliah/IPPL/docs/usecase_description.md'
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    use_cases = []
    blocks = re.split(r'###\s+UC-\d+\s+', content)[1:]
    
    for block in blocks:
        lines = [line.strip() for line in block.split('\n')]
        title = lines[0]
        
        uc_data = {
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

def generate_srs():
    original_template = 'D:/Kuliah/APPL/Srs/SRS.docx'
    target_docx = 'D:/Kuliah/IPPL/docs/SRS_VocalSense_AI.docx'
    
    shutil.copy(original_template, target_docx)
    doc = docx.Document(target_docx)
    
    use_cases = parse_markdown()
    print(f"Parsed {len(use_cases)} singing use cases from usecase_description.md")
    
    # 1. Update text paragraphs in Bab 1 & 2
    content_map = {
        16: "Dokumen Software Requirements Specification (SRS) ini bertujuan untuk mendefinisikan secara komprehensif spesifikasi kebutuhan perangkat lunak untuk sistem VocalSense AI (Platform Analisis Suara Bernyanyi dan Bimbingan Latihan Vokal Cerdas). Dokumen ini menjadi acuan utama bagi seluruh tim pengembang, analis sistem, desainer antarmuka, penguji, dan pemangku kepentingan dalam proses perancangan, implementasi, dan pengujian sistem. Diharapkan seluruh pihak memiliki pemahaman yang selaras mengenai batasan sistem, fitur bertingkat (Free, Pro, Premium), parameter analisis vokal bernyanyi (Pitch, Cents, Flat/Sharp, Vibrato, Range, Sustain), serta standar keandalan operasional yang harus dicapai.",
        19: "Dokumen ini ditujukan untuk berbagai pihak yang terlibat dalam siklus hidup pengembangan produk VocalSense AI, antara lain:",
        20: "Project Manager: Sebagai acuan utama untuk mengelola ruang lingkup modul bertingkat bernyanyi (Freemium), jadwal rilis, serta koordinasi tim pengembang audio engine dan antarmuka web.",
        21: "Pengembang Perangkat Lunak (Software Engineer): Sebagai pedoman implementasi logika bisnis, algoritma ekstraksi nada vokal (Pitch F0, Cents Deviation, Flat/Sharp Detection, Vibrato 5-7 Hz, Sustain), skema basis data, dan integrasi API (Payment Gateway Midtrans & AI Vocal Coach Google Gemini).",
        22: "Penguji (QA Engineer): Sebagai dasar dalam menyusun skenario pengujian fungsional modul perekam bernyanyi, akurasi perhitungan nada dan jangkauan vokal, pengujian beban, dan verifikasi alur pembayaran otomatis.",
        23: "Pengguna Akhir (Penyanyi Pemula, Vokalis Musik, Administrator): Untuk memberikan gambaran fitur rekaman vokal, tes jangkauan nada, rapor bernyanyi dengan Piano Roll, pelacakan progres perluasan vokal, serta kurikulum latihan tangga nada harian yang dipersonalisasi.",
        26: "VocalSense AI adalah aplikasi berbasis web responsif yang dirancang untuk mendemokratisasi bimbingan latihan vokal bernyanyi secara mandiri menggunakan kecerdasan buatan tanpa ketergantungan pada guru vokal privat berbiaya mahal. Cakupan sistem ini meliputi modul perekaman audio berbasis browser (Web Audio API) dengan visualisasi kurva pitch langsung, deteksi nada fals (Flat/Sharp) dalam satuan Cents, tes jangkauan vokal (Vocal Range Finder & klasifikasi suara), modul rapor evaluasi dengan visualisasi Piano Roll interaktif, sistem langganan berjenjang (Free, Pro, Premium), modul pelacakan kemajuan perluasan rentang nada (progress tracking), hingga asisten perencana latihan tangga nada cerdas (AI Vocal Coach Planner). Perangkat lunak ini bertujuan untuk mempermudah siapa saja belajar bernyanyi secara tepat nada dan percaya diri.",
        29: "F0 (Fundamental Frequency): Frekuensi getaran dasar pita suara manusia yang menentukan tinggi-rendahnya nada suara (pitch), diukur dalam satuan Hertz (Hz).",
        30: "Cent: Satuan logaritmik interval musik, di mana 1 semiton (jarak antar tuts piano bersebelahan) setara dengan 100 cents.",
        31: "Flat & Sharp: Kondisi nada yang dinyanyikan berada di bawah target nada acuan (Flat) atau di atas target nada acuan (Sharp) melebihi ambang batas toleransi.",
        32: "Vocal Range: Rentang nada dari nada stabil terendah hingga nada tertinggi yang mampu dicapai penyanyi (misal: E2 hingga G4).",
        33: "Vibrato: Modulasi nada yang berosilasi secara teratur (kecepatan ideal 5–7 Hz dengan kedalaman modulasi proporsional) pada nada yang ditahan panjang.",
        34: "Piano Roll Visualizer: Antarmuka visual yang menampilkan tuts piano vertikal dan balok-balok notasi nada target versus garis kurva nada aktual suara penyanyi.",
        35: "AI Vocal Coach: Modul bimbingan latihan adaptif berbasis model bahasa cerdas (LLM) yang menyusun silabus latihan tangga nada (solfeggio drills) 7-30 hari sesuai kelemahan bernyanyi pengguna.",
        36: "Payment Gateway: Gerbang pembayaran daring pihak ketiga (Midtrans) untuk menangani transaksi langganan Pro dan Premium secara otomatis.",
        37: "SRS: Software Requirements Specification, atau Spesifikasi Kebutuhan Perangkat Lunak.",
        38: "Web Audio API: Standar antarmuka peramban modern tingkat tinggi untuk merekam, memproses, dan menyintesis sinyal audio secara langsung di peramban.",
        41: "VocalSense AI merupakan platform terpadu yang memadukan komputasi pemrosesan sinyal audio musik digital dan kecerdasan buatan modern. Dibangun di atas fondasi arsitektur berlapis (Multi-tier Architecture) yang modular dan tangguh, sistem ini memisahkan lapisan presentasi antarmuka klien (Frontend Web Audio & Pitch Tracker), lapisan gerbang API (API Gateway), mesin komputasi analisis sinyal nada vokal (AI Singing Engine), serta manajemen data transaksi dan akun, sehingga sistem memiliki performa tinggi, latency rendah, serta skalabilitas optimal."
    }
    
    for i, p in enumerate(doc.paragraphs):
        if i in content_map:
            p.text = content_map[i]
            
    for p in doc.paragraphs:
        if "11241015 - Ariel" in p.text:
            p.text = p.text.replace("11241015 - Ariel", "[Nama Mahasiswa / Kelompok]")
        if "Sistem Manajemen Gudang" in p.text:
            p.text = p.text.replace("Sistem Manajemen Gudang", "VocalSense AI (AI Singing Trainer)")
        if "Juni 2026" in p.text:
            p.text = p.text.replace("Juni 2026", "2026")

    # 1.1 Insert Use Case Diagram Image into paragraph 56
    image_path = 'D:/Kuliah/IPPL/docs/diagrams/export_images/usecase_diagram.png'
    if os.path.exists(image_path) and len(doc.paragraphs) > 57:
        doc.paragraphs[55].text = (
            "Gambar 1 menunjukkan Use Case Diagram sistem VocalSense AI yang memetakan 24 use case fungsional "
            "dengan 2 aktor utama (Pengguna dan Administrator) sesuai kaidah asistensi pembimbing (Kak Rahmi). "
            "Layanan eksternal seperti Google OAuth, Payment Gateway Midtrans, dan AI LLM Provider beroperasi di "
            "lapisan backend sistem sehingga tidak dimodelkan sebagai aktor."
        )
        p56 = doc.paragraphs[56]
        p56.clear()
        p56.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p56.add_run()
        try:
            run.add_picture(image_path, width=Inches(5.5))
            print("Successfully inserted Use Case Diagram image into SRS paragraph 56!")
        except Exception as e:
            print("Could not insert image into paragraph 56:", e)
            
        doc.paragraphs[57].text = "Gambar 1. Use Case Diagram Sistem VocalSense AI (24 Use Cases)"
        doc.paragraphs[57].alignment = WD_ALIGN_PARAGRAPH.CENTER
        if len(doc.paragraphs[57].runs) > 0:
            doc.paragraphs[57].runs[0].italic = True
            
    # 2. Update Functional Requirement Table (Table 0)
    t0 = doc.tables[0]
    for row in t0.rows[1:]:
        t0._element.remove(row._element)
        
    frs = [
        ('FR-001', 'Registrasi Akun Pengguna', 'Sistem harus memungkinkan calon penyanyi mendaftar akun baru dengan nama, email, dan kata sandi yang aman.'),
        ('FR-002', 'Autentikasi Pengguna & JWT', 'Sistem harus memvalidasi kredensial login dan menerbitkan token sesi JWT yang aman.'),
        ('FR-003', 'Google OAuth (SSO)', 'Sistem harus menyediakan opsi masuk cepat satu klik menggunakan akun Google OAuth 2.0.'),
        ('FR-004', 'Pemulihan & Reset Kata Sandi', 'Sistem harus menyediakan mekanisme reset kata sandi melalui tautan token verifikasi email.'),
        ('FR-005', 'Pengelolaan Profil Vokal & Preferensi', 'Sistem harus memungkinkan pengguna memperbarui identitas, avatar, tipe suara, dan genre bernyanyi favorit.'),
        ('FR-006', 'Tuner & Kalibrasi Nada Dasar', 'Sistem harus menyediakan Digital Chromatic Tuner dan kalibrasi ambang batas kebisingan mikrofon.'),
        ('FR-007', 'Tes Jangkauan Vokal (Vocal Range Finder)', 'Sistem harus memandu pengujian rentang nada terendah-tertinggi dan mengklasifikasikan tipe suara penyanyi.'),
        ('FR-008', 'Perekaman Bernyanyi & Pitch Visualizer', 'Sistem harus merekam vokal via Web Audio API dengan visualisasi kurva tinggi nada waktu nyata di piano roll.'),
        ('FR-009', 'Pengunggahan Berkas Audio Rekaman Nyanyi', 'Sistem harus mengizinkan pengguna mengunggah berkas rekaman audio vokal format WAV, MP3, atau M4A.'),
        ('FR-010', 'Pemutaran Ulang & Pemangkasan Vokal', 'Sistem harus menyediakan bilah visual untuk memotong jeda hening kosong di awal dan akhir lagu.'),
        ('FR-011', 'Analisis Suara Bernyanyi AI Multi-Parameter', 'Mesin AI harus mengekstrak notasi nada, deviasi cents, deteksi flat/sharp, vibrato 5-7 Hz, dan kestabilan sustain.'),
        ('FR-012', 'Penyajian Rapor Bernyanyi & Piano Roll', 'Sistem harus menampilkan Skor Bernyanyi (0-100), Radar Chart vokal, Piano Roll interaktif, dan saran perbaikan AI.'),
        ('FR-013', 'Pemutaran Audio Terikat Deteksi Nada Fals', 'Sistem harus memungkinkan pengguna mengklik nada fals pada Piano Roll untuk melompatkan audio ke detik tersebut.'),
        ('FR-014', 'Penyimpanan Rapor Bernyanyi (Pro/Premium)', 'Sistem harus mengunggah audio ke Cloud Storage dan menyimpan data rapor bernyanyi ke akun pengguna.'),
        ('FR-015', 'Ekspor Rapor & Sertifikat Vokal Format PDF', 'Sistem harus memfasilitasi pengunduhan lembar evaluasi bernyanyi resmi dan sertifikat kelulusan uji nada format PDF.'),
        ('FR-016', 'Perbandingan Sesi Bernyanyi Berdampingan', 'Sistem harus menyajikan komparasi sebelum-sesudah (before-after) kurva nada antara dua sesi rekaman vokal.'),
        ('FR-017', 'Dasbor Progres & Perluasan Jangkauan Nada', 'Sistem harus menampilkan grafik tren akurasi nada mingguan dan peta perluasan tuts jangkauan vokal penyanyi.'),
        ('FR-018', 'Pelacak Streak & Gamifikasi Vokal', 'Sistem harus mencatat konsistensi hari latihan vokal berturut-turut dan membuka kunci lencana pencapaian bernyanyi.'),
        ('FR-019', 'Kurikulum Latihan Bernyanyi Adaptif AI', 'Sistem AI harus menyusun kurikulum jadwal latihan vokal harian 7-30 hari sesuai kelemahan bernyanyi pengguna.'),
        ('FR-020', 'Sesi Latihan Tangga Nada & Solfeggio Terpandu', 'Sistem harus memandu pengguna menirukan tangga nada panduan piano dan mengevaluasi kepatuhan nada secara real-time.'),
        ('FR-021', 'Katalog Paket & Pembayaran Gateway', 'Sistem harus terhubung ke Payment Gateway (Midtrans) untuk transaksi langganan Pro dan Premium secara otomatis.'),
        ('FR-022', 'Riwayat Tagihan & Kelola Langganan', 'Sistem harus menampilkan riwayat invoice pembayaran, bukti transaksi resmi, dan opsi pembatalan renewal.'),
        ('FR-023', 'Manajemen Pengguna & Tier Vokal (Admin)', 'Sistem harus menyediakan antarmuka bagi Admin untuk mengawasi akun penyanyi dan menyesuaikan tier secara manual.'),
        ('FR-024', 'Laporan Finansial & AI Sistem (Admin)', 'Sistem harus menyajikan rekapitulasi omset platform, beban server AI Audio Engine, dan pengaturan toleransi cents.')
    ]
    for fid, name, desc in frs:
        row = t0.add_row()
        row.cells[0].text = fid
        row.cells[1].text = name
        row.cells[2].text = desc

    # 3. Delete old Use Case tables (all tables after Table 0)
    for table in doc.tables[1:]:
        table._element.getparent().remove(table._element)

    # 4. Find all "Heading 3" paragraphs and insert new use case tables
    h3_paragraphs = [p for p in doc.paragraphs if p.style.name.startswith('Heading 3')]
    
    last_table_element = None
    for i in range(len(use_cases)):
        uc = use_cases[i]
        if i < len(h3_paragraphs):
            heading_para = h3_paragraphs[i]
            heading_para.text = uc['name']
        else:
            # If there weren't enough H3s, add a new one
            heading_para = doc.add_paragraph(uc['name'], style='Heading 3')
            
        new_table = doc.add_table(rows=8, cols=2)
        new_table.style = doc.tables[0].style
        set_table_borders(new_table)
        
        new_table.columns[0].width = Inches(1.5)
        new_table.columns[1].width = Inches(5.0)
        
        data = [
            ("Nama use case & id", uc['id']),
            ("Deskripsi Singkat", uc['desc']),
            ("Aktor", uc['actor']),
            ("Prasyarat", uc['pre']),
            ("Alur Utama", uc['alur']),
            ("Alur Alternatif", uc['alt']),
            ("Kondisi Akhir Sukses", uc['succ']),
            ("Kondisi Akhir gagal", uc['fail'])
        ]
        
        for r_idx, (k, v) in enumerate(data):
            row = new_table.rows[r_idx]
            row.cells[0].text = k
            row.cells[1].text = v
            if len(row.cells[0].paragraphs) > 0 and len(row.cells[0].paragraphs[0].runs) > 0:
                row.cells[0].paragraphs[0].runs[0].bold = True
            
        set_cell_background(new_table.rows[0].cells[0], "D9D9D9")
        set_cell_background(new_table.rows[0].cells[1], "D9D9D9")
        
        heading_para._element.addnext(new_table._element)
        last_table_element = new_table._element

    # Delete any extra H3 paragraphs beyond 24
    if len(h3_paragraphs) > len(use_cases):
        for heading_para in h3_paragraphs[len(use_cases):]:
            heading_para._element.getparent().remove(heading_para._element)

    # Clean up any leftover old paragraphs between the last table and "Non Functional Requirement"
    nfr_para = None
    for p in doc.paragraphs:
        if "Non Functional Requirement" in p.text:
            nfr_para = p
            break
            
    # Remove any stale warehouse text or empty lines right before NFR
    for p in list(doc.paragraphs):
        if any(term in p.text for term in ["Mencetak Label", "Supplier", "Gudang", "Kurir", "Table 2. Functional Requirement"]):
            p._element.getparent().remove(p._element)

    # 5. Insert Non-Functional Requirements (NFR) Table
    if nfr_para:
        p_desc = doc.add_paragraph("Kebutuhan non-fungsional sistem VocalSense AI mencakup aspek keamanan, performa pemrosesan audio waktu nyata, keandalan sistem, skalabilitas, dan kemudahan antarmuka pengguna:")
        nfr_para._element.addnext(p_desc._element)
        
        p_tab_label = doc.add_paragraph("Tabel 2. Kebutuhan Non-Fungsional (Non-Functional Requirements)")
        p_tab_label.runs[0].bold = True
        p_desc._element.addnext(p_tab_label._element)
        
        nfr_table = doc.add_table(rows=6, cols=3)
        nfr_table.style = doc.tables[0].style
        set_table_borders(nfr_table)
        nfr_table.columns[0].width = Inches(1.2)
        nfr_table.columns[1].width = Inches(2.0)
        nfr_table.columns[2].width = Inches(3.8)
        
        nfr_table.rows[0].cells[0].text = "ID"
        nfr_table.rows[0].cells[1].text = "Parameter Kebutuhan"
        nfr_table.rows[0].cells[2].text = "Spesifikasi & Batasan Kinerja"
        for c in nfr_table.rows[0].cells:
            c.paragraphs[0].runs[0].bold = True
            set_cell_background(c, "D9D9D9")
            
        nfr_data = [
            ("NFR-001", "Keamanan (Security)", "Semua komunikasi audio dan data menggunakan enkripsi HTTPS/WSS. Kata sandi di-hash menggunakan bcrypt (salt 10). Berkas rekaman audio pengguna berbayar pada Cloud Storage dilindungi Pre-signed URL (maksimal 60 menit). Token JWT disimpan aman dalam HttpOnly cookie."),
            ("NFR-002", "Kinerja & Latency (Performance)", "Ekstraksi nada F0, cents, dan osilasi vibrato untuk audio 60 detik selesai dalam <= 4 detik. Visualisasi live pitch curve berjalan mulus >= 30 FPS. Pembangkitan kurikulum latihan vokal oleh modul AI selesai <= 4 detik."),
            ("NFR-003", "Ketersediaan & Keandalan (Reliability)", "Tingkat ketersediaan (uptime) sistem minimal 99.5% per bulan. Antrian pemrosesan audio (Redis BullMQ/Celery) menerapkan mekanisme retry hingga 3 kali saat terjadi kegagalan tanpa menyebabkan peladen utama crash."),
            ("NFR-004", "Skalabilitas Sistem (Scalability)", "Arsitektur stateless REST API memungkinkan horizontal scaling secara modular guna mengantisipasi lonjakan beban komputasi saat banyak pengguna merekam suara bernyanyi secara simultan."),
            ("NFR-005", "Usabilitas & Aksesibilitas (Usability)", "Antarmuka web sepenuhnya responsif di layar Ponsel (360px+), Tablet (768px+), dan Desktop (1024px+). Visualisasi Piano Roll mengusung standar kontras tinggi WCAG 2.1 AA dengan kode warna nada tepat dan nada fals yang kontras.")
        ]
        
        for idx, (nid, param, spec) in enumerate(nfr_data):
            r = nfr_table.rows[idx+1]
            r.cells[0].text = nid
            r.cells[1].text = param
            r.cells[2].text = spec
            r.cells[0].paragraphs[0].runs[0].bold = True
            
        p_tab_label._element.addnext(nfr_table._element)

    # 6. Update Lampiran section
    for p in doc.paragraphs:
        if "Lampiran" in p.text and p.style.name.startswith('Heading'):
            p_lamp_desc = doc.add_paragraph(
                "Berkas artefak diagram sistem VocalSense AI tersimpan secara lengkap pada direktori proyek:\n"
                "- Use Case Diagram (Draw.io & PNG): docs/diagrams/export_images/usecase_diagram.png\n"
                "- Data Flow Diagram (DFD Level 0, 1, 2): docs/diagrams/export_images/dfd_level_*.png\n"
                "- 24 Activity Diagrams (AD-01 s/d AD-24): docs/diagrams/export_images/AD-*.png\n"
                "- 24 Sequence Diagrams (SD-01 s/d SD-24): docs/diagrams/export_images/SD-*.png"
            )
            p._element.addnext(p_lamp_desc._element)
            break

    doc.save(target_docx)
    print(f"SRS Document successfully generated and validated at: {target_docx}")

if __name__ == "__main__":
    generate_srs()
