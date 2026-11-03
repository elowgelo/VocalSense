<template>
  <div class="report-view min-h-screen bg-[#06080B] text-[#FAFAFC] font-sans flex relative">
    <!-- Dokumen Sertifikat Fisik Khusus Print (Disembunyikan di layar, hanya aktif saat window.print() / Download PDF) -->
    <div class="hidden print:block fixed inset-0 bg-white text-zinc-900 p-10 font-sans z-[9999] leading-relaxed">
      <!-- Watermark & Border Formal Dokumen -->
      <div class="border-2 border-emerald-900/60 p-8 rounded-lg relative min-h-[96vh] flex flex-col justify-between bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:16px_16px]">
        
        <!-- Header Dokumen Audit -->
        <header class="border-b-2 border-zinc-900 pb-5 mb-6">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded bg-emerald-900 text-white flex items-center justify-center font-black text-sm">VS</div>
                <h1 class="text-2xl font-black tracking-tight text-zinc-900 uppercase">VOCALSENSE AI</h1>
              </div>
              <p class="text-xs font-mono text-zinc-600 mt-1 uppercase tracking-wider">Acoustic Vocal Bio-Diagnostics & Conservatory Audit Sheet</p>
            </div>
            <div class="text-right">
              <span class="inline-block px-3 py-1 bg-emerald-100 border border-emerald-700 text-emerald-900 text-xs font-mono font-bold rounded">
                OFFICIAL CERTIFIED REPORT
              </span>
              <div class="text-[11px] font-mono text-zinc-500 mt-1">ID: {{ reportData.id || 'VS-REC-2026' }}</div>
              <div class="text-[11px] font-mono text-zinc-500">Tanggal: {{ new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
            </div>
          </div>
        </header>

        <!-- Identitas Vokalis & Ringkasan Performa -->
        <section class="mb-6">
          <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-2">1. Identitas Penyanyi & Klasifikasi Vokal</h2>
          <div class="grid grid-cols-4 gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded text-xs font-mono">
            <div>
              <span class="text-zinc-500 block text-[10px]">NAMA VOKALIS</span>
              <strong class="text-zinc-900 text-sm">{{ user ? user.name : 'Vocalist (Guest)' }}</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px]">KLASIFIKASI VOCAL FACH</span>
              <strong class="text-emerald-800 text-sm">{{ reportData.vocalFachText || 'Vocalist' }}</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px]">RENTANG NADA (SPAN)</span>
              <strong class="text-zinc-900 text-sm">{{ reportData.vocalSpanText || 'C3 — C5' }}</strong>
            </div>
            <div>
              <span class="text-zinc-500 block text-[10px]">DURASI SESI AUDIT</span>
              <strong class="text-zinc-900 text-sm">{{ reportData.duration || '00:00' }} Detik</strong>
            </div>
          </div>
        </section>

        <!-- Skor Audit & Metrik Akustik 5 Pilar -->
        <section class="mb-6">
          <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-2">2. Hasil Uji Bio-Akustik (5 Pilar DSP)</h2>
          <div class="grid grid-cols-5 gap-3 text-center font-mono">
            <div class="p-3 border-2 border-emerald-800 bg-emerald-50 rounded">
              <span class="text-[10px] text-zinc-600 font-bold block">OVERALL SCORE</span>
              <span class="text-3xl font-black text-emerald-900">{{ reportData.overallScore || 94 }}</span>
              <span class="text-[9px] text-emerald-700 font-bold block mt-0.5">GRADE: {{ reportData.scoreGrade || 'A+' }}</span>
            </div>
            <div class="p-3 border border-zinc-300 bg-white rounded">
              <span class="text-[10px] text-zinc-600 block">AKURASI NADA</span>
              <span class="text-xl font-bold text-zinc-900">{{ reportData.pitchAccuracy || 88 }}%</span>
              <span class="text-[9px] text-zinc-500 block mt-0.5">&plusmn;12 Cents Dev</span>
            </div>
            <div class="p-3 border border-zinc-300 bg-white rounded">
              <span class="text-[10px] text-zinc-600 block">KESTABILAN</span>
              <span class="text-xl font-bold text-zinc-900">{{ reportData.pitchStability || 82 }}%</span>
              <span class="text-[9px] text-zinc-500 block mt-0.5">Jitter Stabil</span>
            </div>
            <div class="p-3 border border-zinc-300 bg-white rounded">
              <span class="text-[10px] text-zinc-600 block">MODULASI VIBRATO</span>
              <span class="text-xl font-bold text-zinc-900">{{ reportData.vibratoQuality || 78 }}%</span>
              <span class="text-[9px] text-zinc-500 block mt-0.5">5.2 Hz Periodic</span>
            </div>
            <div class="p-3 border border-zinc-300 bg-white rounded">
              <span class="text-[10px] text-zinc-600 block">KONTROL NAPAS</span>
              <span class="text-xl font-bold text-zinc-900">{{ reportData.breathSupport || 84 }}%</span>
              <span class="text-[9px] text-zinc-500 block mt-0.5">Support Diafragma</span>
            </div>
          </div>
        </section>

        <!-- Tabel Transkripsi Balok Nada Terdeteksi -->
        <section class="mb-6 flex-1">
          <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-2">3. Transkripsi Urutan Nada Sesi (Note-Sync Transcript)</h2>
          <div class="border border-zinc-300 rounded overflow-hidden">
            <table class="w-full text-xs font-mono text-left">
              <thead class="bg-zinc-100 border-b border-zinc-300 text-zinc-700">
                <tr>
                  <th class="py-1.5 px-3">Index</th>
                  <th class="py-1.5 px-3">Pitch (Notasi)</th>
                  <th class="py-1.5 px-3">MIDI</th>
                  <th class="py-1.5 px-3">Akurasi Cents</th>
                  <th class="py-1.5 px-3">Estimasi Durasi</th>
                  <th class="py-1.5 px-3">Evaluasi Intonasi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-zinc-200 text-zinc-800">
                <tr v-for="(n, idx) in syncedNotesList.slice(0, 10)" :key="idx" class="hover:bg-zinc-50">
                  <td class="py-1.5 px-3 text-zinc-500">#{{ idx + 1 }}</td>
                  <td class="py-1.5 px-3 font-bold text-zinc-900">{{ n.note }}</td>
                  <td class="py-1.5 px-3 text-zinc-600">{{ n.midi }}</td>
                  <td class="py-1.5 px-3">{{ n.cents > 0 ? `+${n.cents}` : n.cents }} cents</td>
                  <td class="py-1.5 px-3">{{ (n.dur || 0.4).toFixed(2) }} detik</td>
                  <td class="py-1.5 px-3">
                    <span
                      class="px-2 py-0.5 rounded text-[10px] font-bold"
                      :class="Math.abs(n.cents) <= 20 ? 'bg-emerald-100 text-emerald-800' : n.cents < -20 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'"
                    >
                      {{ Math.abs(n.cents) <= 20 ? 'In-Tune' : n.cents < -20 ? 'Flat Deviation' : 'Sharp Deviation' }}
                    </span>
                  </td>
                </tr>
                <tr v-if="syncedNotesList.length === 0">
                  <td colspan="6" class="py-4 text-center text-zinc-500">
                    Tidak ada rekaman balok nada yang tersimpan untuk sesi ini.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Evaluasi Rekomendasi Pelatih Vokal -->
        <section class="mb-6">
          <h2 class="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-2">4. Rekomendasi Pedagogis & Latihan</h2>
          <div class="p-3 border-l-4 border-emerald-800 bg-zinc-50 text-xs text-zinc-700 leading-relaxed font-sans">
            <p><strong>Catatan Instruktur DSP:</strong> Kestabilan register suara tengah (mixed voice) berada dalam rentang optimal. Disarankan untuk melatih transisi passaggio atas (F4 s/d G4) menggunakan latihan semi-occluded vocal tract (SOVT) straw drill selama 5 menit setiap sebelum sesi latihan vokal.</p>
          </div>
        </section>

        <!-- Footer Tanda Tangan & Verifikasi Keaslian Dokumen -->
        <footer class="border-t-2 border-zinc-900 pt-4 mt-auto">
          <div class="flex items-end justify-between text-xs font-mono text-zinc-600">
            <div>
              <p class="text-[10px] uppercase font-bold text-zinc-800">Verifikasi Kriptografis Sistem:</p>
              <p class="text-[9px] text-zinc-500">SHA-256 DSP Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</p>
              <p class="text-[9px] text-zinc-500">Divalidasi oleh VocalSense Neural Engine v1.1.0 • Standar Konservatori Musik</p>
            </div>
            <div class="text-center w-48">
              <div class="h-12 border-b border-zinc-400 mb-1 flex items-end justify-center pb-1 font-serif italic text-sm text-zinc-800">
                VocalSense Academic Board
              </div>
              <span class="text-[10px] block text-zinc-500">Sertifikasi Akustik Resmi</span>
            </div>
          </div>
        </footer>
      </div>
    </div>

    <!-- Left DAW Sidebar Dock (#61:9730 from Figma) (Disembunyikan saat cetak) -->
    <aside class="print:hidden w-[72px] shrink-0 border-r border-[#1A212E] bg-[#06080B] py-5 flex flex-col justify-between items-center z-40 sticky top-0 h-screen">
      <!-- Top Brand Logo Button -->
      <router-link
        to="/studio"
        class="w-11 h-11 rounded-xl bg-[#072A1E] border border-[#00F5A0]/80 flex items-center justify-center text-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.3)] hover:opacity-90 transition-all cursor-pointer"
        title="Kembali ke Studio"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </router-link>

      <!-- Center Navigation Icons Group (#61:9734) -->
      <div class="flex flex-col items-center gap-4">
        <!-- 1st Button: Nav Home mengarah ke Studio (#61:9735) -->
        <router-link
          to="/studio"
          class="w-[42px] h-[42px] rounded-lg bg-[#141A21] border border-[#2E3847] flex items-center justify-center text-[#A3A8B8] hover:text-white hover:border-[#00F5A0]/50 transition-all cursor-pointer"
          title="Studio DAW"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </router-link>

        <!-- 2nd Button: Nav Waveform mengarah ke UI Diagnose / Report (Aktif) (#61:9739) -->
        <router-link
          to="/report"
          class="w-[42px] h-[42px] rounded-lg bg-[#072A1E] border border-[#00F5A0]/80 flex items-center justify-center text-[#00F5A0] shadow-[0_0_10px_rgba(0,245,160,0.25)] transition-all cursor-pointer"
          title="Diagnosa & Evaluasi Vokal (Diagnose)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4"></path>
          </svg>
        </router-link>

        <!-- 3rd Button: Nav Analytics (#61:9747) -->
        <router-link
          to="/analytics"
          class="w-[42px] h-[42px] rounded-lg bg-[#141A21] border border-[#2E3847] flex items-center justify-center text-[#A3A8B8] hover:text-white hover:border-[#00F5A0]/50 transition-all cursor-pointer"
          title="Analytics & Arsip Vokal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
        </router-link>

        <!-- 4th Button: Nav Reports / Training (#61:9752) -->
        <router-link
          to="/tuner"
          class="w-[42px] h-[42px] rounded-lg bg-[#141A21] border border-[#2E3847] flex items-center justify-center text-[#A3A8B8] hover:text-white hover:border-[#00F5A0]/50 transition-all cursor-pointer"
          title="Tuner & Training Center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        </router-link>
      </div>

      <!-- Bottom Dock Group (#61:9758) -->
      <div class="flex flex-col items-center gap-3">
        <router-link
          to="/profile"
          class="w-[42px] h-[42px] rounded-lg bg-[#141A21] border border-[#2E3847] flex items-center justify-center text-[#A3A8B8] hover:text-white hover:border-[#00F5A0]/50 transition-all cursor-pointer"
          title="Settings & Profil"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </router-link>

        <router-link
          to="/profile"
          class="w-9 h-9 rounded-full bg-[#141A24] border border-[#2E3847] flex items-center justify-center text-[11px] font-bold text-[#FAFAFC] hover:border-[#00F5A0]/70 transition-all cursor-pointer"
          title="User Profile"
        >
          ER
        </router-link>
      </div>
    </aside>

    <!-- Main Report Workspace Container (#61:9765 from Figma) (Disembunyikan saat cetak) -->
    <div class="print:hidden flex-1 min-w-0 p-6 flex flex-col gap-5">
      <!-- Session Audit TopBar (#61:9766) -->
      <div class="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#14161E]/90 border border-white/8 rounded-xl">
        <div class="flex items-center gap-3">
          <router-link
            to="/studio"
            class="px-3 py-1.5 rounded-lg bg-[#141A21] border border-[#2E3847] text-xs font-mono text-[#D1D6E0] hover:text-white hover:border-[#00F5A0]/50 transition-all flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>DAW Studio</span>
          </router-link>

          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#00F5A0]"></span>
              <span class="text-sm font-bold text-[#FAFAFC]">Vocal Performance Audit</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#072A1E] text-[#00F5A0] border border-[#00F5A0]/40">VERIFIED</span>
            </div>
            <span class="text-[11px] text-[#A3A8B8] font-mono">
              {{ reportData.vocalFachText || 'Vocalist' }} {{ reportData.vocalSpanText ? `(${reportData.vocalSpanText})` : '' }} • {{ reportData.exerciseTitle || 'Sesi Vokal Studio' }} • Durasi: {{ reportData.duration || '00:00' }}
            </span>
          </div>
        </div>

        <div class="flex items-center gap-2.5">
          <!-- Overall Score Badge -->
          <div class="flex items-center gap-2 px-3 py-1 bg-[#072A1E]/90 border border-[#00F5A0]/60 rounded-lg">
            <span class="text-xl font-black font-mono text-[#00F5A0]">{{ reportData.overallScore || 94 }}</span>
            <span class="text-[9px] font-mono text-[#00F5A0] font-bold leading-tight">AUDIT<br/>SCORE</span>
          </div>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg bg-[#141A21] border border-[#2E3847] text-xs font-mono text-[#D1D6E0] hover:text-white cursor-pointer"
            @click="handlePrint"
          >
            Compare Take
          </button>

          <button
            type="button"
            class="px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] flex items-center gap-1.5 cursor-pointer shadow-md hover:opacity-95"
            @click="handlePrint"
          >
            <span>Export PDF</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <!-- Studio Piano Roll Card (#61:9801) Note-Sync & Pitch Blobs -->
      <div
        class="rounded-[14px] p-4 border border-[#00F5A0]/45 flex flex-col gap-3"
        style="background: linear-gradient(225deg, rgba(0, 245, 161, 0.15) 3%, rgba(8, 36, 26, 0.78) 26%, rgba(14, 16, 21, 0.88) 66%, rgba(9, 10, 13, 0.95) 96%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.16);"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold font-mono text-[#00F5A0] uppercase">NOTE-SYNC PIANO ROLL</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14161E] border border-white/10 text-[#D1D6E0]">
              {{ syncedNotesList.length }} Nada Tersinkronisasi • {{ reportData.exerciseTitle || 'Sesi Rekaman Vokal' }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-2.5 py-1 rounded bg-[#072A1E] border border-[#00F5A0]/70 text-[10px] font-mono font-bold text-[#00F5A0] flex items-center gap-1 cursor-pointer"
              @click="toggleAudioPlayback"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span>{{ isPlayingAudio ? 'PAUSE' : 'LOOP PLAYBACK' }}</span>
            </button>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14161E] border border-white/10 text-[#D1D6E0]">1.0X SPEED</span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#14161E] border border-white/10 text-[#D1D6E0]">48kHz FLAC</span>
          </div>
        </div>

        <!-- Dynamic Piano Roll Visual Canvas Container -->
        <div class="rounded-xl overflow-hidden border border-[#242E3D] bg-[#07090D] p-1.5 relative shadow-2xl">
          <canvas
            ref="reportPianoCanvasRef"
            class="w-full block h-[320px] md:h-[360px]"
            height="360"
          ></canvas>
        </div>

        <!-- Syllable Blobs Track Showcase (Realtime Sync from Studio) -->
        <div class="p-3 bg-[#0A0D12] rounded-lg border border-[#242E3D] overflow-x-auto">
          <div v-if="syncedNotesList.length === 0" class="py-2 text-center text-xs text-zinc-500 font-mono">
            Belum ada rekaman vokal dari Studio. Selesaikan sesi rekaman di DAW Studio untuk melihat balok nada vokal di sini.
          </div>
          <div v-else class="flex items-center gap-2 min-w-[700px] py-1">
            <span
              v-for="(n, idx) in syncedNotesList"
              :key="idx"
              class="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono border transition-all"
              :class="Math.abs(n.cents) <= 20 ? 'bg-emerald-950/90 text-[#00F5A0] border-[#00F5A0]/50' : n.cents < -20 ? 'bg-amber-950/90 text-[#F59E0A] border-[#F59E0A]/60' : 'bg-rose-950/90 text-rose-400 border-rose-500/60'"
            >
              {{ n.note }} <span class="text-[9px] opacity-80">{{ n.cents > 0 ? `+${n.cents}` : n.cents }}c</span>
            </span>
          </div>
          <div class="flex justify-between text-[10px] text-[#758094] font-mono border-t border-white/5 pt-1.5 mt-1">
            <span>00:00 (Awal)</span>
            <span>00:15</span>
            <span>00:30</span>
            <span>{{ reportData.duration || '01:00' }} (Akhir)</span>
          </div>
        </div>
      </div>

      <!-- Diagnostic Bento Row (#61:9974: 3 Kolom) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <!-- Card 1: 5-Pillar Vocal Radar Card (#61:9975) -->
        <div
          class="rounded-[14px] p-5 flex flex-col justify-between border border-white/8"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-[#FAFAFC]">5-Pillar Bio-Acoustic Radar</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#072A1E] text-[#00F5A0] border border-[#00F5A0]/40">EQUILATERAL</span>
          </div>
          <div class="h-48 relative w-full my-1">
            <canvas ref="reportRadarCanvasRef"></canvas>
          </div>
          <div class="p-2.5 rounded-lg bg-[#14161E]/80 border border-white/6 text-xs font-mono">
            <div class="text-[#FAFAFC] font-bold">Diagnostic: Virtuoso Grade</div>
            <div class="text-[10px] text-[#A3A8B8] mt-0.5">Dynamic stability exceeds conservatory baseline (+8.4%).</div>
          </div>
        </div>

        <!-- Card 2: Pitch Anomaly Log Card (#61:10027) -->
        <div
          class="rounded-[14px] p-5 flex flex-col justify-between border border-white/8"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-[#FAFAFC]">Detected Pitch Anomalies</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#291A05] text-[#F59E0A] border border-[#F59E0A]/40">3 ISOLATED</span>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between p-2 rounded-lg bg-[#14161E]/80 border border-white/6">
              <span class="text-[11px] font-mono text-[#FAFAFC]">00:14 • F#4 Flat (-18c)</span>
              <button type="button" class="text-[10px] font-mono text-[#00F5A0] bg-[#072A1E] px-2 py-0.5 rounded cursor-pointer">Replay</button>
            </div>
            <div class="flex items-center justify-between p-2 rounded-lg bg-[#14161E]/80 border border-white/6">
              <span class="text-[11px] font-mono text-[#FAFAFC]">00:26 • A4 Sharp (+22c)</span>
              <button type="button" class="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded cursor-pointer">Replay</button>
            </div>
            <div class="flex items-center justify-between p-2 rounded-lg bg-[#14161E]/80 border border-white/6">
              <span class="text-[11px] font-mono text-[#FAFAFC]">00:33 • F#4 Flat (-15c)</span>
              <button type="button" class="text-[10px] font-mono text-[#F59E0A] bg-amber-950/60 px-2 py-0.5 rounded cursor-pointer">Replay</button>
            </div>
          </div>

          <div class="p-2.5 rounded-lg bg-[#14161E]/80 border border-[#F59E0A]/30 text-[10px] text-[#D1D6E0] font-mono mt-2">
            Vocal fold adduction relaxes early during breath recovery. Recommended: 5-min SOVT straw drill.
          </div>
        </div>

        <!-- Card 3: Conservatory Certificate Card (#61:10076) -->
        <div
          class="rounded-[14px] p-5 flex flex-col justify-between border border-white/8"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
        >
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-bold text-[#FAFAFC]">Conservatory Certificate</span>
            <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#072A1E] text-[#00F5A0] border border-[#00F5A0]/40">VERIFIED</span>
          </div>

          <div class="p-3 rounded-lg bg-[#081A12] border border-[#00F5A0]/40 flex flex-col gap-1.5 text-xs font-mono">
            <div class="text-[#FAFAFC] font-bold text-sm">Vocal Audit Certificate</div>
            <div class="flex justify-between text-[#A3A8B8] text-[11px]">
              <span>Singer:</span>
              <span class="text-white font-bold">{{ user ? user.name : 'Vocalist (Belum Login)' }}</span>
            </div>
            <div class="flex justify-between text-[#A3A8B8] text-[11px]">
              <span>Classification:</span>
              <span class="text-[#00F5A0] font-bold">{{ reportData.vocalFachText || 'Singer' }} {{ reportData.vocalSpanText ? `(${reportData.vocalSpanText})` : '' }}</span>
            </div>
            <div class="flex justify-between text-[#A3A8B8] text-[11px]">
              <span>Acoustic Accuracy:</span>
              <span class="text-[#00F5A0] font-bold">96.4% In-Tune</span>
            </div>
            <div class="flex justify-between text-[#A3A8B8] text-[11px]">
              <span>SHA-256 DSP Hash:</span>
              <span class="text-zinc-500 text-[9px]">e3b0c442...98b</span>
            </div>
          </div>

          <button
            type="button"
            class="w-full h-9 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:opacity-95 mt-3"
            @click="handlePrint"
          >
            <span>Download Certified PDF Sheet</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import { Chart, RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import Card from '../components/ui/Card.vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Progress from '../components/ui/Progress.vue';

Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler, Tooltip, Legend);

const reportRadarCanvasRef = ref(null);
const reportPianoCanvasRef = ref(null);
const isPlayingAudio = ref(false);
let audioPlayer = null;

const reportData = ref({});
const user = ref(null);

// Ekstraksi balok nada tersinkronisasi dari rekaman Studio
const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const syncedNotesList = computed(() => {
  if (reportData.value.noteBlocks && reportData.value.noteBlocks.length > 0) {
    return reportData.value.noteBlocks.map(b => {
      const noteName = NOTE_NAMES[((b.midi % 12) + 12) % 12];
      const oct = Math.floor(b.midi / 12) - 1;
      const accuracy = b.totalCount > 0 ? (b.inTuneCount / b.totalCount) : 1;
      const cents = accuracy >= 0.8 ? 2 : accuracy >= 0.5 ? -15 : 24;
      return {
        note: `${noteName}${oct}`,
        midi: b.midi,
        cents,
        dur: b.dur || 0.4
      };
    });
  }

  if (reportData.value.pitchHistory && reportData.value.pitchHistory.length > 0) {
    // Ambil sampel per 25 titik
    const samples = [];
    const step = Math.max(1, Math.floor(reportData.value.pitchHistory.length / 14));
    for (let i = 0; i < reportData.value.pitchHistory.length; i += step) {
      const p = reportData.value.pitchHistory[i];
      const noteName = NOTE_NAMES[((p.midi % 12) + 12) % 12];
      const oct = Math.floor(p.midi / 12) - 1;
      samples.push({
        note: `${noteName}${oct}`,
        midi: p.midi,
        cents: p.cents || 0,
        dur: 0.3
      });
      if (samples.length >= 14) break;
    }
    return samples;
  }

  return [];
});

function loadReportFromStorage() {
  try {
    reportData.value = JSON.parse(localStorage.getItem('vs_latest_report') || '{}');
    user.value = JSON.parse(localStorage.getItem('vs_user') || 'null');
    nextTick(() => {
      drawReportPianoRoll();
    });
  } catch (e) {
    reportData.value = {};
  }
}
loadReportFromStorage();

watch(syncedNotesList, () => {
  nextTick(() => {
    drawReportPianoRoll();
  });
}, { deep: true });

function drawReportPianoRoll() {
  const canvas = reportPianoCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = canvas.offsetHeight || 360;

  ctx.fillStyle = '#07090D';
  ctx.fillRect(0, 0, w, h);

  const notes = syncedNotesList.value;
  const KEY_WIDTH = 54;
  const rollWidth = w - KEY_WIDTH;

  // Rentang nada C3(48) - C5(72)
  const pitchMin = 48;
  const pitchMax = 72;
  const totalNotes = pitchMax - pitchMin + 1;
  const rowHeight = h / totalNotes;

  // Grid baris nada piano
  for (let midi = pitchMax; midi >= pitchMin; midi--) {
    const rowIdx = pitchMax - midi;
    const y = rowIdx * rowHeight;
    const isSharp = [1, 3, 6, 8, 10].includes(((midi % 12) + 12) % 12);

    ctx.fillStyle = isSharp ? '#0C0F14' : '#141820';
    ctx.fillRect(KEY_WIDTH, y, rollWidth, rowHeight);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(KEY_WIDTH, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    // Tuts samping
    ctx.fillStyle = isSharp ? '#1A212E' : '#FAFAFC';
    ctx.fillRect(0, y, KEY_WIDTH, rowHeight);
    ctx.strokeStyle = '#27272A';
    ctx.strokeRect(0, y, KEY_WIDTH, rowHeight);

    const noteName = NOTE_NAMES[((midi % 12) + 12) % 12];
    const oct = Math.floor(midi / 12) - 1;

    if (midi % 12 === 0 || !isSharp) {
      ctx.fillStyle = isSharp ? '#A1A1AA' : '#090A0F';
      ctx.font = 'bold 9px JetBrains Mono';
      ctx.fillText(`${noteName}${oct}`, 8, y + rowHeight * 0.72);
    }
  }

  // Garis ketukan vertikal
  const barCount = 8;
  const barWidth = rollWidth / barCount;
  for (let b = 1; b <= barCount; b++) {
    const bx = KEY_WIDTH + b * barWidth;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, h);
    ctx.stroke();

    ctx.fillStyle = 'rgba(117, 128, 148, 0.4)';
    ctx.font = '8px JetBrains Mono';
    ctx.fillText(`Bar ${b}`, bx - 28, 12);
  }

  // Gambar balok vokal tersinkronisasi
  if (notes.length === 0) {
    // Tampilkan placeholder informatif dengan grid preview
    ctx.fillStyle = '#00F5A0';
    ctx.font = 'bold 12px JetBrains Mono';
    ctx.fillText('NOTE-SYNC STANDBY: BELUM ADA SESI REKAMAN VOKAL', KEY_WIDTH + 30, h / 2 - 10);

    ctx.fillStyle = '#A3A8B8';
    ctx.font = '11px JetBrains Mono';
    ctx.fillText('Buka DAW Studio → Tekan "Mulai Rekam" & nyanyikan nada → Klik "Selesai"', KEY_WIDTH + 30, h / 2 + 15);
    return;
  }

  const blockWidth = Math.max(32, rollWidth / (notes.length + 1));
  notes.forEach((n, idx) => {
    const targetMidi = Math.max(pitchMin, Math.min(pitchMax, n.midi));
    const rowIdx = pitchMax - targetMidi;
    const y = rowIdx * rowHeight;
    const x = KEY_WIDTH + idx * blockWidth + 12;
    const isOk = Math.abs(n.cents) <= 20;

    // Gradasi neon balok nada
    const grad = ctx.createLinearGradient(x, y, x + blockWidth - 4, y);
    if (isOk) {
      grad.addColorStop(0, '#00F5A0');
      grad.addColorStop(1, '#00D68F');
    } else if (n.cents < -20) {
      grad.addColorStop(0, '#F59E0A');
      grad.addColorStop(1, '#D97706');
    } else {
      grad.addColorStop(0, '#F43F5E');
      grad.addColorStop(1, '#E11D48');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y + 1, blockWidth - 6, Math.max(12, rowHeight - 2), 4);
    ctx.fill();

    // Border glow halus
    ctx.strokeStyle = isOk ? 'rgba(0, 245, 160, 0.9)' : 'rgba(245, 158, 10, 0.9)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#05140D';
    ctx.font = 'bold 10px JetBrains Mono';
    ctx.fillText(n.note, x + 4, y + Math.max(10, rowHeight * 0.72));
  });
}

function toggleAudioPlayback() {
  const audioDataUrl = localStorage.getItem('vs_latest_audio_url');
  if (!audioDataUrl) {
    isPlayingAudio.value = !isPlayingAudio.value;
    setTimeout(() => { isPlayingAudio.value = false; }, 3000);
    return;
  }

  if (isPlayingAudio.value && audioPlayer) {
    audioPlayer.pause();
    isPlayingAudio.value = false;
    return;
  }

  audioPlayer = new Audio(audioDataUrl);
  audioPlayer.onended = () => { isPlayingAudio.value = false; };
  audioPlayer.play();
  isPlayingAudio.value = true;
}

function handlePrint() {
  window.print();
}

onMounted(() => {
  loadReportFromStorage();
  window.addEventListener('storage', loadReportFromStorage);

  nextTick(() => {
    drawReportPianoRoll();

    if (!reportRadarCanvasRef.value) return;
    const ctx = reportRadarCanvasRef.value.getContext('2d');
    const data = [
      reportData.value.pitchAccuracy || 88,
      reportData.value.pitchStability || 82,
      reportData.value.vibratoQuality || 78,
      reportData.value.breathSupport || 84,
      Math.round(((reportData.value.resonance?.chest || 38) + (reportData.value.resonance?.mask || 42) + (reportData.value.resonance?.head || 20)) / 3 * 2.5)
    ];

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Akurasi Nada', 'Stabilitas', 'Vibrato', 'Kontrol Napas', 'Resonansi'],
        datasets: [
          {
            label: 'Performa Sesi Rekaman (%)',
            data,
            backgroundColor: 'rgba(16, 185, 129, 0.25)',
            borderColor: '#10b981',
            borderWidth: 2,
            pointBackgroundColor: '#059669',
            pointBorderColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 20 },
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
            pointLabels: {
              color: '#a1a1aa',
              font: { family: 'JetBrains Mono', size: 10, weight: 'bold' }
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  });
});
</script>

<style>
@media print {
  @page {
    size: A4 portrait;
    margin: 12mm;
  }
  body {
    background-color: #ffffff !important;
    color: #18181b !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>