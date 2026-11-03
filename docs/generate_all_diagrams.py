import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Directories
BASE_DIR = r"D:\Kuliah\IPPL\docs\diagrams"
UC_DIR = os.path.join(BASE_DIR, "usecase")
DFD_DIR = os.path.join(BASE_DIR, "dfd")
AD_DIR = os.path.join(BASE_DIR, "activity")
SD_DIR = os.path.join(BASE_DIR, "sequence")

for d in [UC_DIR, DFD_DIR, AD_DIR, SD_DIR]:
    os.makedirs(d, exist_ok=True)

# -------------------------------------------------------------
# 1. GENERATE DRAWIO XML FILES (24 USE CASES)
# -------------------------------------------------------------

def create_usecase_drawio():
    xml = """<mxfile host="65bd71144e">
    <diagram id="uc_vocalsense_24" name="Use Case Diagram VocalSense AI - 24 Use Cases (Singing Trainer)">
        <mxGraphModel dx="1800" dy="1600" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="2200" math="0" shadow="0">
            <root>
                <mxCell id="0"/>
                <mxCell id="1" parent="0"/>
                <mxCell id="boundary" value="Sistem VocalSense AI (AI Singing &amp; Vocal Trainer)" style="shape=rect;fillColor=none;strokeColor=#1e293b;strokeWidth=2.5;dashed=0;align=center;verticalAlign=top;fontSize=20;fontStyle=1;fontColor=#0f172a;" parent="1" vertex="1">
                    <mxGeometry x="300" y="50" width="860" height="1950" as="geometry"/>
                </mxCell>
                <mxCell id="a_pengguna" value="Pengguna / Penyanyi&#xa;(Tamu / Free / Pro / Premium)" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=none;strokeColor=#0f172a;fontColor=#0f172a;fontSize=13;fontStyle=1;" parent="1" vertex="1">
                    <mxGeometry x="80" y="750" width="60" height="110" as="geometry"/>
                </mxCell>
                <mxCell id="a_admin" value="Administrator" style="shape=umlActor;verticalLabelPosition=bottom;verticalAlign=top;html=1;outlineConnect=0;fillColor=none;strokeColor=#0f172a;fontColor=#0f172a;fontSize=13;fontStyle=1;" parent="1" vertex="1">
                    <mxGeometry x="1260" y="1700" width="60" height="110" as="geometry"/>
                </mxCell>
                <mxCell id="a_ai" value="AI Vocal Coach&#xa;(Google Gemini)" style="shape=rect;whiteSpace=wrap;html=1;fillColor=#eff6ff;strokeColor=#2563eb;strokeWidth=2;fontColor=#1e40af;fontSize=12;fontStyle=1;rounded=1;" parent="1" vertex="1">
                    <mxGeometry x="1220" y="1250" width="140" height="70" as="geometry"/>
                </mxCell>
                <mxCell id="a_gateway" value="Payment Gateway&#xa;(Midtrans)" style="shape=rect;whiteSpace=wrap;html=1;fillColor=#ecfdf5;strokeColor=#059669;strokeWidth=2;fontColor=#065f46;fontSize=12;fontStyle=1;rounded=1;" parent="1" vertex="1">
                    <mxGeometry x="1220" y="1450" width="140" height="70" as="geometry"/>
                </mxCell>
                
                <!-- 24 Use Cases -->
                <!-- Kolom Kiri: Akun & Singing Audio Core (UC-01 s/d UC-12) -->
                <mxCell id="uc01" value="UC-01 Registrasi Akun Pengguna" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="110" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc02" value="UC-02 Masuk ke Sistem (Login)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="180" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc03" value="UC-03 Masuk via Google OAuth" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="250" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc04" value="UC-04 Pemulihan &amp; Reset Password" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="320" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc05" value="UC-05 Kelola Profil Vokal &amp; Preferensi" style="ellipse;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#0284c7;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="390" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc06" value="UC-06 Tuner &amp; Kalibrasi Mikrofon" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="470" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc07" value="UC-07 Tes Jangkauan Vokal (Range Finder)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="540" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc08" value="UC-08 Rekam Bernyanyi &amp; Pitch Visualizer" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="610" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc09" value="UC-09 Unggah Berkas Rekaman Vokal" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="680" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc10" value="UC-10 Putar Ulang &amp; Pangkas Vokal" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="760" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc11" value="UC-11 Analisis Suara Bernyanyi AI" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="830" width="250" height="50" as="geometry"/></mxCell>
                <mxCell id="uc12" value="UC-12 Tampilkan Rapor &amp; Piano Roll" style="ellipse;whiteSpace=wrap;html=1;fillColor=#e0f2fe;strokeColor=#0369a1;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="340" y="900" width="250" height="50" as="geometry"/></mxCell>

                <!-- Kolom Kanan: Rapor Pro, Progress, AI, Billing, Admin (UC-13 s/d UC-24) -->
                <mxCell id="uc13" value="UC-13 Putar Audio Terikat Nada Fals" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="470" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc14" value="UC-14 Simpan Rapor Nyanyi (Pro/Prem)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="540" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc15" value="UC-15 Ekspor Rapor &amp; Sertifikat PDF" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="610" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc16" value="UC-16 Bandingkan Sesi Rekaman Nyanyi" style="ellipse;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="680" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc17" value="UC-17 Dasbor Progres &amp; Perluasan Range" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="760" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc18" value="UC-18 Lacak Streak &amp; Lencana Vokal" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="830" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc19" value="UC-19 Hasilkan Kurikulum Vokal AI" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="910" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc20" value="UC-20 Sesi Latihan Tangga Nada &amp; Solfeggio" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f3e8ff;strokeColor=#9333ea;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="990" width="260" height="50" as="geometry"/></mxCell>

                <mxCell id="uc21" value="UC-21 Beli &amp; Bayar Langganan" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="1420" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc22" value="UC-22 Riwayat Tagihan &amp; Invoice" style="ellipse;whiteSpace=wrap;html=1;fillColor=#dcfce7;strokeColor=#16a34a;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="1490" width="260" height="50" as="geometry"/></mxCell>

                <mxCell id="uc23" value="UC-23 Manajemen Pengguna &amp; Tier (Admin)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="1680" width="260" height="50" as="geometry"/></mxCell>
                <mxCell id="uc24" value="UC-24 Analitik Finansial &amp; Sistem (Admin)" style="ellipse;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#475569;strokeWidth=1.5;fontColor=#0f172a;fontSize=11;" parent="1" vertex="1"><mxGeometry x="780" y="1750" width="260" height="50" as="geometry"/></mxCell>

                <!-- Association Lines User -->
                <mxCell id="e01" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc01" edge="1"/>
                <mxCell id="e02" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc02" edge="1"/>
                <mxCell id="e03" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc03" edge="1"/>
                <mxCell id="e04" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc04" edge="1"/>
                <mxCell id="e05" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc05" edge="1"/>
                <mxCell id="e06" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc06" edge="1"/>
                <mxCell id="e07" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc07" edge="1"/>
                <mxCell id="e08" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc08" edge="1"/>
                <mxCell id="e09" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc09" edge="1"/>
                <mxCell id="e10" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc10" edge="1"/>
                <mxCell id="e11" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc11" edge="1"/>
                <mxCell id="e12" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc12" edge="1"/>
                
                <mxCell id="e13" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc13" edge="1"/>
                <mxCell id="e14" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc14" edge="1"/>
                <mxCell id="e15" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc15" edge="1"/>
                <mxCell id="e16" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc16" edge="1"/>
                <mxCell id="e17" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc17" edge="1"/>
                <mxCell id="e18" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc18" edge="1"/>
                <mxCell id="e19" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc19" edge="1"/>
                <mxCell id="e20" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc20" edge="1"/>
                <mxCell id="e21" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc21" edge="1"/>
                <mxCell id="e22" style="endArrow=none;html=1;strokeColor=#64748b;" parent="1" source="a_pengguna" target="uc22" edge="1"/>
                
                <!-- Association External Actors -->
                <mxCell id="e_ai_1" style="endArrow=none;html=1;strokeColor=#2563eb;" parent="1" source="uc19" target="a_ai" edge="1"/>
                <mxCell id="e_ai_2" style="endArrow=none;html=1;strokeColor=#2563eb;" parent="1" source="uc20" target="a_ai" edge="1"/>
                <mxCell id="e_gw_1" style="endArrow=none;html=1;strokeColor=#059669;" parent="1" source="uc21" target="a_gateway" edge="1"/>
                <mxCell id="e_adm_1" style="endArrow=none;html=1;strokeColor=#475569;" parent="1" source="uc23" target="a_admin" edge="1"/>
                <mxCell id="e_adm_2" style="endArrow=none;html=1;strokeColor=#475569;" parent="1" source="uc24" target="a_admin" edge="1"/>
            </root>
        </mxGraphModel>
    </diagram>
</mxfile>"""
    with open(os.path.join(UC_DIR, "usecase_diagram_vocal_sense.drawio"), "w", encoding="utf-8") as f:
        f.write(xml)
    print("Saved usecase_diagram_vocal_sense.drawio (24 use cases for Singing Trainer)")

def render_usecase_png():
    fig, ax = plt.subplots(figsize=(16, 22), dpi=300)
    ax.set_xlim(0, 1600)
    ax.set_ylim(0, 2200)
    ax.axis('off')
    
    # Boundary Box
    rect = patches.FancyBboxPatch((280, 50), 920, 2080, boxstyle="round,pad=10,rounding_size=15",
                                  linewidth=2.5, edgecolor='#1e3a8a', facecolor='#f8fafc')
    ax.add_patch(rect)
    ax.text(740, 2100, "SISTEM VOCALSENSE AI (24 USE CASES - SINGING TRAINER)", fontsize=18, fontweight='bold', color='#1e3a8a', ha='center')
    
    # Left Actor (Pengguna / Penyanyi)
    ax.scatter([120], [1150], s=1400, color='#0284c7', zorder=5)
    ax.plot([120, 120], [1110, 1000], color='#0f172a', lw=4, zorder=5)
    ax.plot([60, 180], [1060, 1060], color='#0f172a', lw=4, zorder=5)
    ax.plot([120, 70], [1000, 900], color='#0f172a', lw=4, zorder=5)
    ax.plot([120, 170], [1000, 900], color='#0f172a', lw=4, zorder=5)
    ax.text(120, 850, "Penyanyi / Pengguna\n(Tamu, Free,\nPro, Premium)", fontsize=12, fontweight='bold', ha='center', color='#0f172a')
    
    # Right Actors
    # Admin (Bottom right)
    ax.scatter([1380], [250], s=1200, color='#64748b', zorder=5)
    ax.plot([1380, 1380], [220, 140], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1330, 1430], [185, 185], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1380, 1340], [140, 70], color='#0f172a', lw=3.5, zorder=5)
    ax.plot([1380, 1420], [140, 70], color='#0f172a', lw=3.5, zorder=5)
    ax.text(1380, 40, "Administrator", fontsize=13, fontweight='bold', ha='center', color='#0f172a')
    
    # Secondary Box Actors
    box_ai = patches.FancyBboxPatch((1280, 1050), 220, 90, boxstyle="round,pad=5,rounding_size=10",
                                    linewidth=2, edgecolor='#2563eb', facecolor='#eff6ff')
    ax.add_patch(box_ai)
    ax.text(1390, 1095, "AI Vocal Coach\n(Google Gemini)", fontsize=12, fontweight='bold', ha='center', color='#1d4ed8')
    
    box_gw = patches.FancyBboxPatch((1280, 680), 220, 90, boxstyle="round,pad=5,rounding_size=10",
                                    linewidth=2, edgecolor='#059669', facecolor='#ecfdf5')
    ax.add_patch(box_gw)
    ax.text(1390, 725, "Payment Gateway\n(Midtrans)", fontsize=12, fontweight='bold', ha='center', color='#047857')

    # 24 Use Cases (12 Left, 12 Right)
    left_cases = [
        ("UC-01 Registrasi Akun Pengguna", 480, 2000, '#ffffff', '#0284c7'),
        ("UC-02 Masuk ke Sistem (Login)", 480, 1850, '#ffffff', '#0284c7'),
        ("UC-03 Masuk via Google OAuth", 480, 1700, '#ffffff', '#0284c7'),
        ("UC-04 Pemulihan & Reset Password", 480, 1550, '#ffffff', '#0284c7'),
        ("UC-05 Kelola Profil & Preferensi Vokal", 480, 1400, '#ffffff', '#0284c7'),
        ("UC-06 Tuner & Kalibrasi Mikrofon", 480, 1250, '#e0f2fe', '#0369a1'),
        ("UC-07 Tes Jangkauan Vokal (Range Finder)", 480, 1100, '#e0f2fe', '#0369a1'),
        ("UC-08 Rekam Bernyanyi & Pitch Visualizer", 480, 950, '#e0f2fe', '#0369a1'),
        ("UC-09 Unggah Berkas Rekaman Vokal", 480, 800, '#e0f2fe', '#0369a1'),
        ("UC-10 Putar Ulang & Pangkas Vokal", 480, 650, '#e0f2fe', '#0369a1'),
        ("UC-11 Analisis Suara Bernyanyi AI", 480, 500, '#e0f2fe', '#0369a1'),
        ("UC-12 Tampilkan Rapor & Piano Roll", 480, 350, '#e0f2fe', '#0369a1'),
    ]
    
    right_cases = [
        ("UC-13 Putar Audio Terikat Nada Fals", 920, 1850, '#fef9c3', '#ca8a04', False, False, False),
        ("UC-14 Simpan Rapor Nyanyi (Pro/Prem)", 920, 1700, '#fef9c3', '#ca8a04', False, False, False),
        ("UC-15 Ekspor Rapor & Sertifikat PDF", 920, 1550, '#fef9c3', '#ca8a04', False, False, False),
        ("UC-16 Bandingkan Sesi Rekaman Nyanyi", 920, 1400, '#fef9c3', '#ca8a04', False, False, False),
        ("UC-17 Dasbor Progres & Perluasan Range", 920, 1250, '#f3e8ff', '#9333ea', False, False, False),
        ("UC-18 Lacak Streak & Lencana Vokal", 920, 1100, '#f3e8ff', '#9333ea', False, False, False),
        ("UC-19 Hasilkan Kurikulum Vokal AI", 920, 950, '#f3e8ff', '#9333ea', True, False, False),
        ("UC-20 Sesi Latihan Tangga Nada & Drill", 920, 800, '#f3e8ff', '#9333ea', True, False, False),
        ("UC-21 Beli & Bayar Langganan", 920, 650, '#dcfce7', '#16a34a', False, True, False),
        ("UC-22 Riwayat Tagihan & Invoice", 920, 500, '#dcfce7', '#16a34a', False, False, False),
        ("UC-23 Manajemen Pengguna & Tier", 920, 350, '#f1f5f9', '#475569', False, False, True),
        ("UC-24 Analitik Finansial & Sistem", 920, 200, '#f1f5f9', '#475569', False, False, True),
    ]
    
    # Draw Left Cases
    for title, x, y, fc, ec in left_cases:
        ellipse = patches.Ellipse((x, y), 310, 80, facecolor=fc, edgecolor=ec, linewidth=2, zorder=4)
        ax.add_patch(ellipse)
        ax.text(x, y, title, fontsize=10, fontweight='semibold', ha='center', va='center', color='#0f172a', zorder=5)
        ax.plot([150, x - 155], [1070, y], color='#94a3b8', lw=1.3, linestyle='-', zorder=2)
        
    # Draw Right Cases
    for title, x, y, fc, ec, conn_ai, conn_gw, conn_adm in right_cases:
        ellipse = patches.Ellipse((x, y), 310, 80, facecolor=fc, edgecolor=ec, linewidth=2, zorder=4)
        ax.add_patch(ellipse)
        ax.text(x, y, title, fontsize=10, fontweight='semibold', ha='center', va='center', color='#0f172a', zorder=5)
        
        # User connection
        if not conn_adm:
            ax.plot([150, x - 155], [1070, y], color='#cbd5e1', lw=1.2, linestyle='-', zorder=2)
            
        # External connections
        if conn_ai:
            ax.plot([x + 155, 1280], [y, 1095], color='#2563eb', lw=1.8, linestyle='-', zorder=2)
        if conn_gw:
            ax.plot([x + 155, 1280], [y, 725], color='#059669', lw=1.8, linestyle='-', zorder=2)
        if conn_adm:
            ax.plot([x + 155, 1340], [y, 185], color='#475569', lw=1.8, linestyle='-', zorder=2)

    out_path = os.path.join(UC_DIR, "usecase_diagram_vocal_sense.png")
    plt.tight_layout()
    plt.savefig(out_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"Rendered {out_path} (24 singing use cases)")

def render_dfd_level_0_png():
    fig, ax = plt.subplots(figsize=(14, 9), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(0, 800)
    ax.axis('off')
    
    ax.text(600, 760, "DATA FLOW DIAGRAM (DFD) LEVEL 0 - DIAGRAM KONTEKS", fontsize=16, fontweight='bold', color='#0f172a', ha='center')
    ax.text(600, 730, "Sistem VocalSense AI (AI-Powered Singing & Vocal Trainer)", fontsize=13, fontstyle='italic', color='#475569', ha='center')

    # Central Process
    p0 = patches.Ellipse((600, 400), 280, 180, facecolor='#0284c7', edgecolor='#0369a1', linewidth=3, zorder=4)
    ax.add_patch(p0)
    ax.text(600, 420, "0.0", fontsize=16, fontweight='bold', color='#ffffff', ha='center', zorder=5)
    ax.text(600, 385, "SISTEM\nVOCALSENSE AI", fontsize=14, fontweight='bold', color='#ffffff', ha='center', zorder=5)

    # Entities
    e_user = patches.Rectangle((60, 300), 200, 200, facecolor='#f8fafc', edgecolor='#1e293b', linewidth=2.5, zorder=4)
    ax.add_patch(e_user)
    ax.text(160, 400, "ENTITAS:\nPENYANYI / USER\n(Tamu, Free,\nPro, Premium)", fontsize=12, fontweight='bold', color='#0f172a', ha='center', va='center', zorder=5)

    e_adm = patches.Rectangle((490, 600), 220, 90, facecolor='#f8fafc', edgecolor='#1e293b', linewidth=2.5, zorder=4)
    ax.add_patch(e_adm)
    ax.text(600, 645, "ENTITAS:\nADMINISTRATOR", fontsize=12, fontweight='bold', color='#0f172a', ha='center', va='center', zorder=5)

    e_gw = patches.Rectangle((940, 480), 200, 110, facecolor='#ecfdf5', edgecolor='#059669', linewidth=2.5, zorder=4)
    ax.add_patch(e_gw)
    ax.text(1040, 535, "ENTITAS:\nPAYMENT GATEWAY\n(Midtrans)", fontsize=12, fontweight='bold', color='#065f46', ha='center', va='center', zorder=5)

    e_ai = patches.Rectangle((940, 210), 200, 110, facecolor='#eff6ff', edgecolor='#2563eb', linewidth=2.5, zorder=4)
    ax.add_patch(e_ai)
    ax.text(1040, 265, "ENTITAS:\nAI VOCAL COACH\n(Google Gemini)", fontsize=12, fontweight='bold', color='#1e40af', ha='center', va='center', zorder=5)

    # Flows User <-> System
    ax.annotate("Audio Bernyanyi, Tes Range, Tuner Mic, Order Langganan", xy=(460, 440), xytext=(260, 440),
                arrowprops=dict(facecolor='#0284c7', edgecolor='#0284c7', width=2, headwidth=8),
                fontsize=8.5, fontweight='semibold', color='#0f172a', ha='center', va='bottom')
    
    ax.annotate("Rapor Nyanyi (Piano Roll), Dasbor Perluasan Vokal, Kurikulum AI", xy=(260, 360), xytext=(460, 360),
                arrowprops=dict(facecolor='#0284c7', edgecolor='#0284c7', width=2, headwidth=8),
                fontsize=8.5, fontweight='semibold', color='#0f172a', ha='center', va='top')

    # Flows System <-> Gateway
    ax.annotate("Tagihan Pembayaran", xy=(940, 550), xytext=(730, 450),
                arrowprops=dict(facecolor='#059669', edgecolor='#059669', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#065f46', ha='center')
    ax.annotate("Webhook Settlement", xy=(730, 420), xytext=(940, 500),
                arrowprops=dict(facecolor='#059669', edgecolor='#059669', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#065f46', ha='center')

    # Flows System <-> AI
    ax.annotate("Diagnosis Nada Fals & Profil Vokal", xy=(940, 280), xytext=(730, 370),
                arrowprops=dict(facecolor='#2563eb', edgecolor='#2563eb', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#1e40af', ha='center')
    ax.annotate("Kurikulum Solfeggio & Drill Tangga Nada", xy=(730, 340), xytext=(940, 230),
                arrowprops=dict(facecolor='#2563eb', edgecolor='#2563eb', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#1e40af', ha='center')

    # Flows System <-> Admin
    ax.annotate("Konfigurasi Cents Fals", xy=(570, 490), xytext=(570, 600),
                arrowprops=dict(facecolor='#475569', edgecolor='#475569', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#334155', ha='right')
    ax.annotate("Laporan Omset & Server AI", xy=(630, 600), xytext=(630, 490),
                arrowprops=dict(facecolor='#475569', edgecolor='#475569', width=2, headwidth=8),
                fontsize=9, fontweight='semibold', color='#334155', ha='left')

    out_path = os.path.join(DFD_DIR, "dfd_level_0.png")
    plt.tight_layout()
    plt.savefig(out_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"Rendered {out_path}")

def render_activity_diagram_png():
    fig, ax = plt.subplots(figsize=(14, 11), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(0, 1000)
    ax.axis('off')
    
    ax.text(600, 970, "ACTIVITY DIAGRAM: PEREKAMAN SUARA BERNYANYI & ANALISIS AI (AD-01)", fontsize=15, fontweight='bold', color='#0f172a', ha='center')

    lanes = [
        ("Penyanyi / Pengguna", 0, 300, '#f8fafc'),
        ("Sistem Frontend (Web Audio API)", 300, 300, '#f0fdf4'),
        ("AI Singing Engine (Backend)", 600, 300, '#eff6ff'),
        ("Basis Data & Cloud Storage", 900, 300, '#fffbeb')
    ]
    for name, x, w, bg in lanes:
        rect = patches.Rectangle((x, 40), w, 900, facecolor=bg, edgecolor='#94a3b8', linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x + w/2, 920, name, fontsize=12, fontweight='bold', color='#1e293b', ha='center')

    # Nodes
    c_start = patches.Circle((150, 860), 15, facecolor='#0f172a')
    ax.add_patch(c_start)

    n1 = patches.FancyBboxPatch((70, 770), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5)
    ax.add_patch(n1)
    ax.text(150, 795, "Memilih Mulai\nBernyanyi & Rekam", fontsize=9.5, ha='center', va='center')

    n2 = patches.FancyBboxPatch((370, 770), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5)
    ax.add_patch(n2)
    ax.text(450, 795, "Tangkap Audio Mic &\nRender Pitch Curve", fontsize=9.5, ha='center', va='center')

    n3 = patches.FancyBboxPatch((70, 670), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5)
    ax.add_patch(n3)
    ax.text(150, 695, "Menekan Tombol\nSelesai Bernyanyi", fontsize=9.5, ha='center', va='center')

    n4 = patches.FancyBboxPatch((370, 670), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#16a34a', lw=1.5)
    ax.add_patch(n4)
    ax.text(450, 695, "Kemas Audio Blob &\nKirim ke Singing Engine", fontsize=9.5, ha='center', va='center')

    n5 = patches.FancyBboxPatch((670, 670), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#2563eb', lw=1.5)
    ax.add_patch(n5)
    ax.text(750, 695, "Ekstraksi F0 & Cents\n(YIN / CREPE Algorithm)", fontsize=9, ha='center', va='center')

    n6 = patches.FancyBboxPatch((670, 560), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#2563eb', lw=1.5)
    ax.add_patch(n6)
    ax.text(750, 585, "Deteksi Flat / Sharp &\nModulasi Vibrato (5-7Hz)", fontsize=9, ha='center', va='center')

    n7 = patches.FancyBboxPatch((670, 450), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#2563eb', lw=1.5)
    ax.add_patch(n7)
    ax.text(750, 475, "Agregasi Skor Nyanyi &\nRekomendasi Vokal AI", fontsize=9, ha='center', va='center')

    d1 = patches.Polygon([[450, 400], [500, 360], [450, 320], [400, 360]], facecolor='#fef08a', edgecolor='#ca8a04', lw=1.5)
    ax.add_patch(d1)
    ax.text(450, 360, "Tier Pro / \nPremium?", fontsize=8.5, fontweight='bold', ha='center', va='center')

    n8 = patches.FancyBboxPatch((970, 335), 160, 50, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#d97706', lw=1.5)
    ax.add_patch(n8)
    ax.text(1050, 360, "Simpan Audio S3 &\nRekam Rapor ke DB", fontsize=9.5, ha='center', va='center')

    n9 = patches.FancyBboxPatch((70, 220), 160, 55, boxstyle="round,pad=5,rounding_size=8", facecolor='#ffffff', edgecolor='#0284c7', lw=1.5)
    ax.add_patch(n9)
    ax.text(150, 247, "Tampilkan Rapor,\nRadar Chart & Piano Roll", fontsize=9.5, ha='center', va='center')

    c_end1 = patches.Circle((150, 110), 18, facecolor='none', edgecolor='#0f172a', lw=2)
    c_end2 = patches.Circle((150, 110), 12, facecolor='#0f172a')
    ax.add_patch(c_end1)
    ax.add_patch(c_end2)

    def draw_arr(p1, p2):
        ax.annotate("", xy=p2, xytext=p1, arrowprops=dict(facecolor='#0f172a', edgecolor='#0f172a', width=1.5, headwidth=6))

    draw_arr((150, 845), (150, 820))
    draw_arr((230, 795), (370, 795))
    draw_arr((450, 770), (150, 720))
    draw_arr((150, 670), (370, 695))
    draw_arr((530, 695), (670, 695))
    draw_arr((750, 670), (750, 610))
    draw_arr((750, 560), (750, 500))
    draw_arr((670, 475), (450, 400))
    
    ax.annotate("Ya (Berbayar)", xy=(970, 360), xytext=(500, 360),
                arrowprops=dict(facecolor='#16a34a', edgecolor='#16a34a', width=1.5, headwidth=6),
                fontsize=9, fontweight='bold', color='#16a34a', va='bottom')
    
    draw_arr((1050, 335), (230, 247))
    
    ax.annotate("Tidak (Free)", xy=(230, 255), xytext=(400, 360),
                arrowprops=dict(facecolor='#dc2626', edgecolor='#dc2626', width=1.5, headwidth=6),
                fontsize=9, fontweight='bold', color='#dc2626', va='bottom')
    
    draw_arr((150, 220), (150, 130))

    out_path = os.path.join(AD_DIR, "AD-01_Perekaman_dan_Analisis_Suara.png")
    plt.tight_layout()
    plt.savefig(out_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"Rendered {out_path}")

def render_sequence_diagram_png():
    fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
    ax.set_xlim(0, 1200)
    ax.set_ylim(0, 1000)
    ax.axis('off')
    
    ax.text(600, 970, "SEQUENCE DIAGRAM: ANALISIS SUARA BERNYANYI BERBASIS AI (SD-01)", fontsize=15, fontweight='bold', color='#0f172a', ha='center')

    lifelines = [
        ("Penyanyi", 100),
        ("Client Web UI", 350),
        ("API Gateway Server", 600),
        ("AI Singing Engine", 850),
        ("PostgreSQL Database", 1100)
    ]
    for name, x in lifelines:
        box = patches.FancyBboxPatch((x - 70, 900), 140, 45, boxstyle="round,pad=3,rounding_size=6", facecolor='#f1f5f9', edgecolor='#334155', lw=1.5)
        ax.add_patch(box)
        ax.text(x, 922, name, fontsize=10, fontweight='bold', ha='center', va='center')
        ax.plot([x, x], [900, 80], color='#cbd5e1', linestyle='--', lw=1.5)

    msgs = [
        (100, 350, 850, "1. Mulai Bernyanyi & Rekam Audio", True),
        (350, 350, 800, "2. Capture Web Audio & Real-time Pitch Curve", False),
        (100, 350, 750, "3. Tekan Selesai Bernyanyi", True),
        (350, 600, 700, "4. POST /api/voice/analyze-singing (Audio Blob)", True),
        (600, 850, 650, "5. Push Job Antrian Ekstraksi Nada Vokal", True),
        (850, 850, 600, "6. Ekstraksi Nada, Cents, Flat/Sharp, Vibrato & Sustain", False),
        (850, 600, 540, "7. Return Payload Skor Bernyanyi & Piano Roll Data", True, True),
        (600, 1100, 480, "8. Simpan Rapor Bernyanyi & Metadata Rekaman", True),
        (1100, 600, 420, "9. Konfirmasi Record ID Tersimpan", True, True),
        (600, 350, 360, "10. HTTP 200 OK (Data Rapor Bernyanyi Lengkap)", True, True),
        (350, 100, 300, "11. Render Rapor Nyanyi, Radar Chart & Piano Roll", True, True)
    ]
    
    for msg in msgs:
        if len(msg) == 5:
            x1, x2, y, text, is_arrow = msg
            is_dashed = False
        else:
            x1, x2, y, text, is_arrow, is_dashed = msg
            
        ls = '--' if is_dashed else '-'
        color = '#0284c7' if is_dashed else '#0f172a'
        
        if is_arrow:
            ax.annotate("", xy=(x2, y), xytext=(x1, y),
                        arrowprops=dict(arrowstyle="->", color=color, lw=1.5, linestyle=ls))
            ax.text((x1 + x2)/2, y + 10, text, fontsize=8.5, fontweight='semibold', color=color, ha='center')
        else:
            ax.plot([x1, x1 + 40, x1 + 40, x1], [y, y, y - 25, y - 25], color='#475569', lw=1.5)
            ax.annotate("", xy=(x1, y - 25), xytext=(x1 + 40, y - 25),
                        arrowprops=dict(arrowstyle="->", color='#475569', lw=1.5))
            ax.text(x1 + 45, y - 12, text, fontsize=8, fontweight='semibold', color='#475569', ha='left', va='center')

    out_path = os.path.join(SD_DIR, "SD-01_Analisis_Suara_dan_Rapor.png")
    plt.tight_layout()
    plt.savefig(out_path, dpi=300, bbox_inches='tight')
    plt.close()
    print(f"Rendered {out_path}")

if __name__ == "__main__":
    create_usecase_drawio()
    render_usecase_png()
    render_dfd_level_0_png()
    render_activity_diagram_png()
    render_sequence_diagram_png()
