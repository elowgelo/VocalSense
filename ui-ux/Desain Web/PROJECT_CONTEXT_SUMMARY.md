# VocalSense AI — Project Handover & Context Summary
> **Dokumen Transisi Konteks (Untuk Chat Baru)**
> Tanggal: 14 Oktober 2026 | Workspace: `D:\Kuliah\Desain Web` & `D:\Kuliah\Desain Web\figma-plugin`

---

## 1. Ringkasan Proyek & Konsep Inti
* **Nama Proyek:** **VocalSense AI**
* **Konsep:** Platform web diagnostik nada suara presisi (*bio-acoustic pitch diagnostic & vocal training*) dengan pemrosesan sinyal WebAudio DSP di browser (*zero latency*, algoritma YIN 48kHz, formant resonance & passaggio tracking) yang dipadukan dengan pedagogi latihan vokal berbasis **Gemini AI**.
* **Model Monetisasi:** Penjualan paket langganan langsung untuk pasar musisi/vokalis Indonesia via **Midtrans** (QRIS, GoPay, BCA, Mandiri) dan kartu internasional.
* **Format Kerja Saat Ini:** Figma UI/UX Plugin yang menghasilkan frame desain desktop berstandar tinggi (1440px).

---

## 2. Keputusan Workflow & Scope Desain
1. **Pemisahan Plugin per Halaman:**
   * Sebelumnya sempat dicoba menggabungkan 4 tab/halaman dalam satu plugin, yang mengakibatkan kode membengkak dan sulit diatur.
   * **Keputusan Pengguna:** Tiap halaman/fitur akan dibuatkan **plugin/file script terpisah** agar alur kerja rapi, modular, dan hasil desain maksimal.
   * **Fokus Aktif Saat Ini:** **Halaman 1: Official Homepage (Full Desktop Experience)** pada file [`D:\Kuliah\Desain Web\figma-plugin\code.js`](code.js).
2. **Aturan Konten:**
   * **DILARANG memakai Testimoni dan Trusted By:** Karena aplikasi ini baru diluncurkan, user menegaskan tidak boleh ada seksi testimoni atau logo "trusted by" palsu/slop.

---

## 3. Berkas Patokan & File Referensi Penting
* **Master Visual Benchmark:** [`D:\Kuliah\Desain Web\Result\patokan.png`](../Result/patokan.png)
  * File benchmark utama (1440x920) yang menampilkan konsol studio DAW gelap mewah dengan gradient bertingkat, tipografi rapi, dan estetika instrumen audio presisi.
* **Anotasi Perbaikan User:** [`D:\Kuliah\Desain Web\Result\Frame 1.png`](../Result/Frame 1.png)
  * Gambar catatan merah dari user mengenai bagian-bagian yang sempat terpotong atau menabrak.
* **Referensi Moodboard Awal:** [`D:\Kuliah\Desain Web\Referensi\cb66043e1f9c2ccddaa63d477734f191.jpg`](../Referensi/cb66043e1f9c2ccddaa63d477734f191.jpg)
* **File Ekspor Hasil Terakhir:** [`D:\Kuliah\Desain Web\Result\VocalSense AI — 01. Official Homepage (Full Desktop Experience).png`](../Result/VocalSense%20AI%20%E2%80%94%2001.%20Official%20Homepage%20(Full%20Desktop%20Experience).png)
* **Source Code Plugin Aktif:** [`D:\Kuliah\Desain Web\figma-plugin\code.js`](code.js) & [`manifest.json`](manifest.json)

---

## 4. Standar Desain & Aturan Anti-Slop (Wajib Dipatuhi)

### A. Larangan Bentuk Kapsul (Strictly No Capsules)
* **Tombol Bell & Theme (Moon):**
  * Harus berupa **kotak rapi / squircle** (`resize(38, 38)`, `cornerRadius: 10`, warna surface `#14171F` dengan garis border solid `#2E3846` yang terlihat tegas). **Bukan pil/kapsul!**
* **User Profile Chip ("Ethan Reynolds"):**
  * Menggunakan `cornerRadius: 10` (tile squircle dengan border `#2E3846`), **bukan `cornerRadius: 99`**.
* **Indikator Hardware Mic:**
  * **Tidak ada container / box kapsul sama sekali**. Hanya titik hijau mint (`7x7`) dan teks `Shure MV7 (48kHz YIN Engine)` langsung di atas canvas, 100% persis [`patokan.png`](../Result/patokan.png).
* **Posisi Icon pada Tombol Aksi:**
  * Icon panah atau aksi harus berada di sebelah **KIRI** label teks (misal: `↗ Start 5-Min Drill`, `↗ New Session`, `↘ Expand Range`, `↗ Practice Scales`), bukan di kanan.
  * Tombol aksi menggunakan `cornerRadius: 8` (squircle presisi).

### B. Mencegah Teks & Konten Terpotong (Zero Clipping)
* **Auto-Layout Hero Section:**
  * Wajib menggunakan `primaryAxisAlignItems = "MIN"` (top-aligned). Jika menggunakan `"CENTER"`, kalkulasi tinggi vertikal akan menggeser elemen ke atas sehingga baris pertama headline menabrak navbar dan bagian bawah mockup window tertutup section di bawahnya.
* **Semua Kartu Auto-Layout & Bento:**
  * `clipsContent = false` pada semua kartu (`cardCoach`, `cardAccuracy`, `cardHistory`, `makeMiniFeature`, `makeStepCard`).
  * Pastikan tinggi frame mencukupi (contoh: Row 2 konsol tinggi 380px, Features row 2 kartu tinggi 330px, Steps kartu tinggi 250px) dengan `paddingBottom` minimal 20–24px agar tidak ada teks seperti "DIAGNOSTIC MATRIX" atau tombol yang terpotong garis batas.

### C. Sistem Warna & Signature Gradients
* **Canvas Top / Background:** `#090B0E` / `#0D1117`
* **Mint Neon Accent:** `#00F5A0` / `#10B981` (RGB: `{ r: 0.0, g: 0.96, b: 0.628 }`)
* **Amber / Gold Accent:** `#F59E0B` (dipakai untuk teks `HEAD VOICE (2k–5k Hz)` di Card 2 dan indikator status)
* **Gradients Sesuai Patokan:**
  * `applyCard1Glass`: Mint gradient bertingkat untuk Card 1 & Card Pro
  * `applyCard2Glass`: Slate-cyan glass untuk Card 2 & Plan 1/3
  * `applyCard3Glass`: Emerald-teal glass untuk Card 3 Vocal Coach
  * `applyCard4Glass`: Dark slate glass untuk Card 4 Accuracy Trend
  * `applyCard5Glass`: Jet black glass untuk Card 5 Recent Takes

---

## 5. Struktur Halaman Homepage Saat Ini (`code.js`)
Kanvas berukuran **1440 x 5600 px** dengan urutan 9 seksi:
1. **1. Top Navbar:** Logo vector sparkle + teks "VocalSense AI" (tanpa box kapsul), link navigasi, tombol `↗ Launch Studio`.
2. **2. Hero Section:** Eyebrow tag `BIO-ACOUSTIC PITCH DIAGNOSTIC WEB PLATFORM`, Headline 2 baris ("Precision Bio-Acoustic Studio & \n Real-Time Vocal Diagnostics"), Subtitle, Dual Action Buttons, dan mockup browser window.
3. **3. Hero Showcase Web App Window (1356 x 1020 px):** Browser bar macOS dots + URL pill + live studio workspace (Bento Row 1: Pitch Tracker + Vocal Registers Deck; Bento Row 2: Gemini AI Vocal Coach + Accuracy Trend + Recent Takes).
4. **4. Features Bento Grid:** Header Pro Audio Architecture + Row 1 (YIN Spectral Extraction 558px + Formant Classifier 558px) + Row 2 (3 kartu: Note-Sync Roll, 5D Vocal Radar, Lossless Conservatory Exports @ 330px).
5. **5. 3-Step Journey:** Alur "Connect & Calibrate" -> "Sing Your Exercise" -> "Receive AI Diagnostics" dengan status pill WebAudio dan YIN DSP.
6. **6. Transparent Pricing:** 3 paket (Free Explorer, Pro Vocalist Rp 79.000/bln dengan badge MOST POPULAR & Midtrans checkout, Conservatory Studio Rp 149.000/bln).
7. **7. FAQ Accordion:** 4 pertanyaan teknis & lokal (mikrofon, Gemini AI, metode bayar Midtrans, ekspor laporan).
8. **8. Final CTA Banner:** Frame radiant berdimensi 1140 x 320 px dengan ajakan mulai vokal diagnostik langsung di browser.
9. **9. Studio Footer:** 4 kolom navigasi seimbang (Brand, Product, Resources, Legal & Trust).

---

## 6. Status Kode Terkini
* Kode di [`D:\Kuliah\Desain Web\figma-plugin\code.js`](code.js) telah diperbaiki dari seluruh isu kapsul, pemotongan teks, tabrakan navbar, serta error validasi stroke opacity (`solid(..., 1.5)` -> sudah di-clamp ke 1.0).
* Lolos validasi sintaks JavaScript (`node --check`) dan lolos simulasi eksekusi headless mock Figma (`code 0`).
* Untuk menjalankan di Figma: Buka project Figma -> tekan **`Ctrl + Alt + P`** (atau jalankan plugin VocalSense AI).

---

## 7. Instruksi untuk Chat Baru
Ketika memulai chat baru, kamu cukup mengunggah atau memberikan instruksi seperti berikut:
> *"Baca berkas `D:\Kuliah\Desain Web\PROJECT_CONTEXT_SUMMARY.md`. Kita sedang mengerjakan project VocalSense AI. Aturan utamanya: tidak ada kapsul, ikuti patokan `patokan.png`, tidak ada testimoni, dan tiap page dibuatkan plugin terpisah. Sekarang mari kita [lanjutkan review hasil export homepage / buat plugin untuk page berikutnya]."*
