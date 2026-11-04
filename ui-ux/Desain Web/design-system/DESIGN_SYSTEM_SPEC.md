# VOCALSENSE AI — DESIGN SYSTEM & VISUAL SPECIFICATION
**Aesthetic: Vercel Dark Architecture + Radiant Emerald Glow (Pinterest-Tier Pro UI)**  
*Lokasi: `D:\Kuliah\Desain Web\design-system\DESIGN_SYSTEM_SPEC.md`*  
*Versi: 1.0 — Anti-Slop Design Engineering*

---

## 1. DESIGN DNA & BEDAH REFERENSI USER

Berdasarkan dua gambar referensi di `D:\Kuliah\Desain Web\Referensi`:
1. **Referensi 1 (`4eb395e78deadf74d1737939e3a4dbc0.jpg`):**
   * **Karakter:** Floating 3D card dengan **Ambient Back-Glow / Diffuse Rim Light** di belakang kartu.
   * **Penerapan di VocalSense:** Kartu-kartu utama (seperti *Live Pitch Visualizer*, *Interactive Piano Roll*, dan *Current Vocal Score*) akan memiliki pancaran cahaya lembut di belakang kontainer (*ambient emerald aura*) sehingga tampak melayang di atas kanvas hitam Vercel.
2. **Referensi 2 (`9a5886409a8f502346ad68f6e8d1efe5.jpg`):**
   * **Karakter:** Dark Bento Dashboard mewah dengan kurva grafik spline yang menyala (*glowing spline area chart*), pill-shaped navigation, floating tooltip badges, dan sudut membulat ultra-halus (`24px`).
   * **Penerapan di VocalSense:** Kurva nada vokal waktu nyata (*Rolling Pitch Curve*) dan diagram jangkauan vokal akan mengadopsi gaya grafik ini dengan aksen gradien hijau terang yang bercahaya alami.

---

## 2. RAODMAP "ANTI-SLOP": CARA MEMBUAT GRADIEN HIJAU TERLIHAT MAHAL
Gradien hijau sering kali terlihat murahan (*slop*) jika dibuat asal-asalan (misal: hijau stabilo 100% opacity dipadukan dengan hitam pekat).  
Agar gradien hijau terlihat **mahal, pro, dan setara Vercel/Linear**:

| ❌ Ciri Gradien "Slop / Kaleng-Kaleng" | ✅ Standar Gradien "Taste-Skill Pro" |
| :--- | :--- |
| Warna hijau neon mentah (`#00FF00`) | Spektrum terpilih: **Electric Mint (`#00F5A0`) $\rightarrow$ Deep Emerald (`#10B981`) $\rightarrow$ Forest Obsidian (`#022C22`)** |
| Opacity 100% menutupi seluruh background | **Diffuse Radial Glow:** Opacity 10%–22% dengan blur gaussian besar (`60px–100px`) hanya di titik fokus (focal highlight). |
| Border hitam pekat tanpa pencahayaan | **Specular Hairline Border:** Border `1px` dengan gradien vertikal tipis (atas terang `rgba(0, 245, 160, 0.3)`, bawah redup `rgba(255, 255, 255, 0.04)`). |
| Flat tanpa kedalaman | **Layering 3 Lapis:** 1) Background Canvas $\rightarrow$ 2) Ambient Glow $\rightarrow$ 3) Matte Card Surface (`#0E0E12`) $\rightarrow$ 4) Radiant Foreground. |

---

## 3. COLOR TOKENS (PALET RESMI)

```
CANVAS & SURFACES (Vercel Black Base):
- Background Canvas   : #050507 (Pure Deep Obsidian)
- Card Surface Base   : #0E0E13 (Dark Matte Graphite)
- Card Surface Raised : #14141B (Elevated Component)
- Card Border Hairline: rgba(255, 255, 255, 0.08)

RADIANT EMERALD GRADIENT ACCENTS:
- Electric Mint (Lightest Peak) : #00F5A0 (Digunakan untuk kurva nada in-tune & active glow)
- Vivid Emerald (Mid-Tone)      : #10B981 (Primary Brand Accent)
- Deep Forest (Shadow Anchor)   : #064E3B (Gradient fill bottom)
- Gradient Mesh Aura            : radial-gradient(circle at 50% 0%, rgba(0, 245, 160, 0.18) 0%, transparent 70%)

STATUS & VOCAL FEEDBACK:
- In-Tune (Tepat Nada)          : #00F5A0 (Electric Mint)
- Pitch Flat (Terlalu Rendah)   : #F59E0B (Amber Gold)
- Pitch Sharp (Terlalu Tinggi)  : #F43F5E (Vivid Rose)

TYPOGRAPHY CONTRAST:
- Text Primary (Headings)       : #FFFFFF (100% Pure White)
- Text Secondary (Body/Labels)  : #A1A1AA (Zinc-400)
- Text Muted (Subtext/Captions) : #71717A (Zinc-500)
- Text Monospace (Hz, Cents)    : #00F5A0 / #E4E4E7
```

---

## 4. TYPOGRAPHY SYSTEM
* **Primary Sans (Headings & UI):** `Geist Sans` atau `Plus Jakarta Sans`  
  * Karakter: Modern, geometris, tracking rapat (`-0.03em`) khas Vercel.
* **Technical Monospace (DSP Metrics):** `Geist Mono` atau `JetBrains Mono`  
  * Digunakan untuk: Frekuensi F0 (`261.63 Hz`), Deviasi (`+4 Cents`), Decibel (`-18.4 dB`), Timer (`01:45`).

---

## 5. STRUKTUR BENTO CARD & AMBIENT GLOW COMPONENT
Setiap kartu di layar dibangun dengan struktur *multi-layered*:

```
[Layer 0] Background Canvas Grid: Garis grid tipis 1px (opacity 4%)
[Layer 1] Ambient Back-Glow: Ellipse shape dengan warna #00F5A0 (Opacity 15%, Blur 64px)
[Layer 2] Bento Card Container:
          - Fill: #0E0E13
          - Radius: 24px
          - Border: 1px solid rgba(255, 255, 255, 0.08)
          - Top Inner Border: 1px gradient stroke (rgba(0, 245, 160, 0.25) -> transparent)
[Layer 3] Content:
          - Badge Pill Status (e.g. "AI Pitch Detector Active")
          - Spline Chart / Interactive Canvas
          - Floating Tooltip Card (e.g. "G4 • 392 Hz • Perfect Vibrato 6.2Hz")
```
