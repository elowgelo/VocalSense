# VOCALSENSE AI — EKSPLORASI ARAH VISUAL & VIBE (DESIGN DIRECTIONS)
**Dokumen Kurasi Gaya Desain UI/UX (Taste-Skill Anti-Slop)**  
*Lokasi: `D:\Kuliah\IPPL\ui-ux\DESIGN_DIRECTIONS.md`*  
*Versi: 1.0 — Tahap 2: Diskusi Arah Visual & Estetika*

---

## 1. PENDAHULUAN
VocalSense AI adalah aplikasi dengan perpaduan dua dunia:
1. **Dunia Akustik / Audio Engineering:** Mengolah sinyal frekuensi, Hertz ($F_0$), deviasi *Cents*, decibel (dB), dan tuts piano.
2. **Dunia Seni Bernyanyi / Edukasi Vokal:** Emosional, ekspresif, membutuhkan rasa percaya diri, bimbingan yang bersahabat dan memotivasi.

Agar antarmuka **tidak terlihat seperti AI template murahan** (misal: background mesh ungu generik dengan kartu-kartu plastik membosankan), berikut 3 alternatif arah visual (*Design Directions*) yang dirancang khusus:

---

## 2. PILIHAN ARAH VISUAL (3 CURATED DESIGN VIBES)

### 🎛️ OPSI A: "Studio Pro Dark" (Acoustic Lab & Precision Gear)
> **Inspirasi Vibe:** Ableton Live, Teenage Engineering, Linear App, Logic Pro X.  
> **Karakter:** Tenang, fokus, presisi audio pro-grade, gelap pekat, kontras tinggi yang ramah di mata saat bernyanyi di ruangan redup.

* **Palet Warna:**
  * Background Utama: Deep Charcoal / Pitch Black (`#0A0A0C` & `#121215`)
  * Surface / Cards: Dark Obsidian dengan hairline border (`#18181D`, border `rgba(255, 255, 255, 0.08)`)
  * Pitch & Accuracy Accent:
    * In-Tune / Success: Electric Emerald (`#10B981` / `#00F5A0`)
    * Pitch Flat / Warn: Warm Amber (`#F59E0B`)
    * Pitch Sharp / Fals: Vivid Rose Red (`#F43F5E`)
  * Secondary Tech Accent: Cyan Synthwave (`#06B6D4`) untuk spektrum audio & resonant frequencies.
* **Tipografi:**
  * UI & Headings: `Geist Sans` atau `Plus Jakarta Sans` (modern, rapi, tracking rapat `-0.03em`)
  * Metrik Audio (Hz, Cents, dB): `Geist Mono` atau `JetBrains Mono` (memberi kesan instrumen digital presisi tinggi)
* **Gaya Komponen:**
  * Bento grid tanpa jarak berlebih, tombol bergaya tactile dengan subtle outer border.
  * Waveform & Pitch visualizer bercahaya neon halus (*controlled subtle glow*).

---

### 🏛️ OPSI B: "Warm Neo-Editorial & Conservatoire" (Modern Vocal Academy)
> **Inspirasi Vibe:** MasterClass, Pitchfork, Substack, Kinfolk, High-end Music Academy.  
> **Karakter:** Elegan, artistik, hangat, bernuansa kayu & kertas mewah, ramah untuk pemula yang ingin belajar bernyanyi tanpa merasa terintimidasi oleh angka-angka teknis.

* **Palet Warna:**
  * Background Utama: Warm Paper / Cream Alabaster (`#FBFBF9` atau `#F5F3ED`)
  * Surface / Cards: Pure Milk White (`#FFFFFF`) dengan bayangan difus sangat halus (*ultra-soft diffusion shadow*).
  * Teks & Kontras: Deep Espresso / Rich Carbon (`#181615` & `#3E3A37`)
  * Aksen Utama: Terracotta / Amber Cello (`#C25E38` & `#D97736`) dipadu dengan Sage Olive (`#4A6B5B`) untuk indikator nada tepat.
* **Tipografi:**
  * Headings: Elegant Serif Kontemporer (`Fraunces`, `Playfair Display`, atau `Instrument Serif`)
  * Body & Tombol: Warm Geometric Sans (`General Sans`, `Inter`, atau `Satoshi`)
* **Gaya Komponen:**
  * Layout asimetris dengan spasi bernapas lega (`py-28`), kartu bertekstur tenang dengan garis tipis `0.5px`.
  * Visualizer nada dirancang seperti partitur musik klasik modern, bukan oscilloskop kaku.

---

### ⚡ OPSI C: "Dynamic Neo-SaaS & Sonic Pulse" (Clean Modern Fintech-Tech Style)
> **Inspirasi Vibe:** Raycast, Supabase, Vercel, Spotify for Artists.  
> **Karakter:** Sangat bersih, modern, seimbang antara terang/gelap, profesional, berenergi tinggi, cocok untuk audiens mahasiswa & musisi independen.

* **Palet Warna:**
  * Background Utama: Pure Canvas (Opsi Light `#FFFFFF` atau Dark `#09090B`)
  * Surface / Cards: Zinc Neutral (`#FAFAFA` di light, `#18181B` di dark)
  * Aksen Brand Utama: Royal Cobalt Blue (`#2563EB`) & Violet Resonance (`#7C3AED`)
  * Feedback Nada: Modern Emerald (`#059669`) & Coral Red (`#E11D48`)
* **Tipografi:**
  * Display: `Plus Jakarta Sans` (tebal, punchy, ramah di mata)
  * Data: Tabular Monospace untuk timer dan frekuensi.
* **Gaya Komponen:**
  * Pill-shaped badges, mikro-interaksi responsif, tab segmented yang mulus, status pill yang ringkas.

---

## 3. PERBANDINGAN TIGA OPSI

| Kriteria Evaluasi | Opsi A (Studio Pro Dark) | Opsi B (Warm Neo-Editorial) | Opsi C (Dynamic Neo-SaaS) |
| :--- | :--- | :--- | :--- |
| **Kesan Pengguna** | Alat musik / audio workstation profesional | Kursus vokal elit, artistik & hangat | Startup teknologi musik modern |
| **Kenyamanan Saat Bernyanyi** | Sangat nyaman (gelap, tidak silau) | Tenang dan humanis | Netral dan familiar |
| **Representasi Metrik Akustik** | Sangat kuat (F0, Cents, Piano Roll sangat menonjol) | Diterjemahkan secara puitis & visual lembut | Terstruktur rapi dalam kartu-kartu metrik |
| **Rekomendasi Taste-Skill** | ⭐⭐⭐ **Sangat Direkomendasikan** untuk app berbasis audio visualizer | ⭐⭐ Sangat berkelas jika ingin pembeda total dari pasar | ⭐⭐ Pilihan aman & modern |
