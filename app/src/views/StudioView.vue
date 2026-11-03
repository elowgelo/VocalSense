<template>
  <div class="studio-view min-h-screen bg-[#06080B] text-[#FAFAFC] font-sans flex">
    <!-- Left DAW Sidebar Dock (#61:9435 from Figma) -->
    <aside class="w-[72px] shrink-0 border-r border-[#1A212E] bg-[#06080B] py-5 flex flex-col justify-between items-center z-40 sticky top-0 h-screen">
      <!-- Top Brand Logo Button -->
      <router-link
        to="/"
        class="w-11 h-11 rounded-xl bg-[#072A1E] border border-[#00F5A0]/80 flex items-center justify-center text-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.3)] hover:opacity-90 transition-all cursor-pointer"
        title="Kembali ke Beranda"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </router-link>

      <!-- Center Navigation Icons Group (#61:9439) -->
      <div class="flex flex-col items-center gap-4">
        <!-- 1st Button: Nav Home mengarah ke Studio (#61:9440) -->
        <router-link
          to="/studio"
          class="w-[42px] h-[42px] rounded-lg bg-[#072A1E] border border-[#00F5A0]/80 flex items-center justify-center text-[#00F5A0] shadow-[0_0_10px_rgba(0,245,160,0.25)] transition-all cursor-pointer"
          title="Studio DAW"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </router-link>

        <!-- 2nd Button: Nav Waveform mengarah ke UI Diagnose / Report (#61:9444) -->
        <button
          type="button"
          @click="openReportPage"
          class="w-[42px] h-[42px] rounded-lg bg-[#141A21] border border-[#2E3847] flex items-center justify-center text-[#A3A8B8] hover:text-white hover:border-[#00F5A0]/50 transition-all cursor-pointer"
          title="Diagnosa & Evaluasi Vokal (Diagnose)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4"></path>
          </svg>
        </button>

        <!-- 3rd Button: Nav Analytics (#61:9452) -->
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

        <!-- 4th Button: Nav Reports / Training (#61:9457) -->
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

      <!-- Bottom Dock Group (#61:9463) -->
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
          {{ user ? (user.name ? user.name.slice(0, 2).toUpperCase() : 'U') : '—' }}
        </router-link>
      </div>
    </aside>

    <!-- Main Studio Workspace Container (#61:9470 from Figma: padding 16px 28px 20px, max-w-[1368px] mx-auto) -->
    <div class="flex-1 min-w-0 flex flex-col items-center">
      <!-- Top DAW Bar (from Figma #61:9471: w-full max-w-[1312px]) -->
      <div class="border-b border-white/6 bg-[#0A0C10]/95 px-6 py-2.5 sticky top-0 z-30 w-full flex justify-center">
        <div class="w-full max-w-[1312px] flex flex-wrap items-center justify-between gap-4">
          <!-- Search & Mic Indicator -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2 px-3 py-1.5 bg-[#141A21] border border-[#2E3847] rounded-lg text-xs text-[#A3A8B8] w-[260px]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span class="text-[11px]">Search vocal scales, songs...</span>
              <span class="ml-auto text-[9px] font-mono px-1 py-0.5 rounded bg-[#14161E] border border-white/10 text-[#D1D6E0]">⌘K</span>
            </div>
            <div class="hidden sm:flex items-center gap-2 text-xs font-medium text-[#D1D6E0]">
              <span class="w-2 h-2 rounded-full bg-[#00F5A0] animate-pulse"></span>
              <span class="text-[11px] font-mono">Shure MV7 (48kHz YIN Engine)</span>
            </div>
          </div>

          <!-- Right Quick Controls -->
          <div class="flex items-center gap-3">
            <router-link
              v-if="user"
              to="/profile"
              class="flex items-center gap-2 bg-[#141A21] border border-[#2E3847] px-3 py-1 rounded-lg hover:border-white/20 transition-all"
            >
              <div class="w-6 h-6 rounded-full bg-[#072A1E] border border-[#00F5A0]/60 flex items-center justify-center text-[10px] font-bold text-[#00F5A0]">
                {{ user.name ? user.name[0].toUpperCase() : 'U' }}
              </div>
              <div class="flex flex-col text-left">
                <span class="text-[11px] font-bold text-[#FAFAFC] leading-none">{{ user.name }}</span>
                <span class="text-[8px] font-bold text-[#00F5A0] font-mono tracking-wider uppercase">{{ currentTier }} SINGER</span>
              </div>
            </router-link>
            <router-link
              v-else
              to="/login"
              class="flex items-center gap-2 bg-[#141A21] border border-[#2E3847] px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:border-[#00F5A0]/50 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Masuk Akun</span>
            </router-link>
            <Button variant="outline" size="sm" @click="triggerPrintReport">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1">
                <polyline points="6 9 6 2 18 2 18 9"/>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <rect x="6" y="14" width="12" height="8"/>
              </svg>
              <span>Cetak PDF</span>
            </Button>
          </div>
        </div>
      </div>

      <div class="w-full max-w-[1368px] px-7 py-4 flex flex-col gap-5">
        <!-- Top Bento Row (from Figma #61:9504: w-[1312px] h-[490px] -> Card 1 [852px] & Card 2 [444px]) -->
        <div class="w-full max-w-[1312px] mx-auto flex flex-col xl:flex-row gap-4 items-start">
      <!-- Left Column: Card 1 Live Pitch & Formant Tracker (852px on desktop) -->
      <div class="w-full xl:w-[852px] xl:shrink-0 flex flex-col gap-4">
        <!-- Control Bar Card (DAW Master Transport) -->
        <div
          class="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl border border-white/8 bg-[#121215]"
        >
          <!-- Live Timer & Engine Status Indicator -->
          <div class="flex items-center gap-4">
            <div class="text-2xl font-black font-mono text-[#00F5A0] tracking-wider min-w-[75px] bg-[#0a0a0c] px-3 py-1 rounded border border-white/5">
              {{ formattedTime }}
            </div>
            <div class="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-zinc-300">
              <span
                class="w-2.5 h-2.5 rounded-full"
                :class="isRecording ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)] animate-pulse' : isPlaying ? 'bg-[#00F5A0] shadow-[0_0_8px_rgba(0,245,160,0.8)]' : 'bg-zinc-600'"
              ></span>
              <span>{{ sessionStateText }}</span>
            </div>
            <!-- Stereo VU Meter (from Figma #61:9564) -->
            <div class="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
              <span class="text-[10px] font-bold text-[#758094] font-mono">VU</span>
              <div class="flex flex-col gap-1">
                <div class="w-12 h-1.5 bg-[#0A0C10] rounded-sm overflow-hidden flex">
                  <div class="bg-gradient-to-r from-[#00F5A0] to-[#06B6D4] h-full transition-all duration-75" :style="{ width: `${liveVuL}%` }"></div>
                </div>
                <div class="w-12 h-1.5 bg-[#0A0C10] rounded-sm overflow-hidden flex">
                  <div class="bg-gradient-to-r from-[#00F5A0] to-[#F59E0A] h-full transition-all duration-75" :style="{ width: `${liveVuR}%` }"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Exercise & Key Controls -->
          <div class="flex items-center gap-3">
            <button
              type="button"
              @click="isCatalogOpen = true"
              class="h-8 rounded-lg border border-[#00F5A0]/30 bg-[#072A1E]/60 px-3 py-1 text-xs font-mono text-[#00F5A0] hover:bg-[#072A1E] hover:border-[#00F5A0]/70 transition-all flex items-center gap-1.5 cursor-pointer"
              :disabled="isRecording"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <span class="font-bold truncate max-w-[170px]">{{ currentExerciseTitle }}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-zinc-400">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <div class="flex items-center gap-1.5">
              <span class="text-xs text-zinc-400 font-mono">KUNCI:</span>
              <select
                v-model="transposeKey"
                class="h-8 rounded border border-white/10 bg-[#0a0a0c] px-2 py-1 text-xs font-mono text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                :disabled="isRecording"
              >
                <option :value="-12">Pria (-12)</option>
                <option :value="0">Standar (0)</option>
                <option :value="12">Wanita (+12)</option>
              </select>
            </div>

            <!-- Latency Calibration -->
            <div class="hidden sm:flex items-center gap-1.5" title="Kompensasi delay hardware mikrofon">
              <span class="text-[10px] text-zinc-500 font-mono">LATENCY:</span>
              <select
                v-model="micLatencyMs"
                class="h-8 rounded border border-white/10 bg-[#0a0a0c] px-1.5 py-1 text-[11px] font-mono text-zinc-400 focus:outline-none"
              >
                <option :value="0">0 ms</option>
                <option :value="20">20 ms</option>
                <option :value="40">40 ms</option>
                <option :value="60">60 ms</option>
              </select>
            </div>
          </div>

          <!-- Transport Action Buttons -->
          <div class="flex items-center gap-2">
            <!-- Record Button (Disabled saat audio sedang diputar) -->
            <Button
              v-if="!isRecording"
              variant="default"
              size="sm"
              :disabled="isPlaying"
              @click="startRecording"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
              </svg>
              <span>Mulai Rekam</span>
            </Button>
            <template v-else>
              <Button
                variant="danger"
                size="sm"
                @click="stopRecording"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12"/>
                </svg>
                <span>Selesai</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                @click="togglePauseRecording"
                :title="isRecordingPaused ? 'Lanjutkan perekaman vokal' : 'Jeda sementara perekaman vokal'"
              >
                {{ isRecordingPaused ? 'Lanjut' : 'Jeda' }}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                class="text-rose-400 hover:text-rose-300 hover:bg-rose-950/30"
                @click="cancelRecording"
                title="Batalkan dan buang sesi rekaman aktif"
              >
                Batal
              </Button>
            </template>

            <!-- Guide Audio Tone Playback (Disabled saat merekam atau memutar audio) -->
            <Button
              variant="outline"
              size="sm"
              :disabled="isRecording || isPlaying"
              @click="toggleGuideAudio"
            >
              {{ isGuideAudioPlaying ? 'Hentikan Panduan' : 'Putar Panduan Piano' }}
            </Button>

            <!-- FR-009: Upload Audio File Button (Disabled saat merekam atau memutar audio) -->
            <label
              class="inline-flex items-center gap-1.5 h-8 px-3 rounded border text-xs font-semibold transition-all"
              :class="isRecording || isPlaying ? 'border-white/5 bg-zinc-950 text-zinc-600 cursor-not-allowed opacity-50' : 'border-white/12 bg-zinc-900/80 hover:bg-white/10 hover:text-white text-zinc-300 cursor-pointer'"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span>Import Audio</span>
              <input
                type="file"
                accept="audio/*"
                class="hidden"
                :disabled="isRecording || isPlaying"
                @change="handleAudioFileUpload"
              />
            </label>
          </div>
        </div>

        <!-- Notification / Processing Bar -->
        <div v-if="micPermissionError" class="p-4 rounded-lg border border-rose-500/40 bg-rose-950/40 text-xs text-rose-200 flex flex-col gap-2 shadow-lg">
          <div class="flex items-center justify-between font-bold text-rose-300">
            <span class="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Izin Akses Mikrofon Tidak Diberikan
            </span>
            <button type="button" @click="micPermissionError = false" class="text-zinc-400 hover:text-white text-sm font-mono">&times;</button>
          </div>
          <p class="text-zinc-300 leading-relaxed">
            Peramban web memblokir akses input audio. Silakan klik ikon gembok/setelan di sebelah URL peramban Anda, pilih <strong>"Izinkan Mikrofon"</strong>, lalu segarkan halaman ini.
          </p>
        </div>

        <div v-if="uploadStatusText" class="p-3 rounded border border-cyan-500/30 bg-cyan-950/40 text-xs text-cyan-200 flex items-center justify-between">
          <span>{{ uploadStatusText }}</span>
          <span v-if="isProcessingUpload" class="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></span>
        </div>

        <!-- Banner Laporan Siap Setelah Rekaman Selesai -->
        <div
          v-if="analysisAvailable"
          class="p-4 rounded-xl border border-[#00F5A0]/60 bg-gradient-to-r from-[#072A1E]/95 to-[#0A1A14]/90 text-xs flex flex-wrap items-center justify-between gap-3 shadow-2xl animate-fade-in"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#00F5A0]/20 border border-[#00F5A0]/50 flex items-center justify-center text-[#00F5A0]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white font-mono">Sesi Rekaman Selesai Di-Audit!</span>
              <span class="text-[11px] text-[#A3A8B8] font-mono">
                Akurasi: <strong class="text-[#00F5A0]">{{ pitchAccuracyRate }}%</strong> • {{ noteBlocks.length }} balok nada tersinkronisasi.
              </span>
            </div>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F5A0] to-[#10B981] text-[#05140D] font-bold text-xs flex items-center gap-1.5 hover:opacity-95 shadow-lg shadow-[#00F5A0]/20 cursor-pointer"
            @click="openReportPage"
          >
            <span>Buka Rapor Lengkap</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>

        <!-- Canvas Panel (DAW Display Rack) -->
        <Card class="!p-4 bg-[#0e0e11] border-white/8 flex flex-col gap-4">
          <!-- Resonance Spectrum Visualizer -->
          <div>
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>SPEKTOGRAM FFT 512 & RESONANSI SUARA</span>
              </div>
              <span class="text-[10px] text-zinc-500">CHEST (100–400Hz) | MASK (400–2kHz) | HEAD (2–5kHz)</span>
            </div>
            <div class="rounded overflow-hidden border border-white/6 bg-[#070709]">
              <canvas ref="spectrumCanvasRef" class="w-full block" height="85"></canvas>
            </div>
          </div>

          <!-- Main DAW Piano Roll Visualizer -->
          <div>
            <!-- Frequency Readout Header (from Figma #61:9517) -->
            <div class="flex flex-wrap items-center justify-between gap-3 bg-[#080D12] p-3 rounded-lg border border-white/8 mb-3">
              <div class="flex items-center gap-3">
                <span class="text-3xl font-black font-mono text-[#FAFAFC] leading-none">{{ currentNote !== '-' ? `${currentNote}${currentOctave}` : '-' }}</span>
                <span class="text-lg font-bold font-mono text-[#00F5A0]">{{ currentPitch > 0 ? `${currentPitch.toFixed(1)} Hz` : '- Hz' }}</span>
                <span
                  class="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
                  :class="currentPitch > 0 ? (Math.abs(currentCents) <= 20 ? 'bg-[#072A1E] text-[#00F5A0] border border-[#00F5A0]/45' : currentCents < -20 ? 'bg-amber-950/80 text-amber-400 border border-amber-500/40' : 'bg-rose-950/80 text-rose-400 border border-rose-500/40') : 'bg-zinc-900 text-zinc-500 border border-white/10'"
                >
                  {{ currentPitch > 0 ? (Math.abs(currentCents) <= 20 ? `IN-TUNE (${currentCents > 0 ? '+' : ''}${currentCents}c)` : currentCents < -20 ? `FLAT (${currentCents}c)` : `SHARP (+${currentCents}c)`) : 'MENUNGGU SUARA' }}
                </span>
                <span v-if="currentExercise" class="text-[11px] font-mono text-[#758094] hidden md:inline">
                  Target: <strong class="text-[#00F5A0]">{{ currentExercise.title }}</strong>
                </span>
                <span v-else class="text-[11px] font-mono text-[#758094] hidden md:inline">
                  Mode Bebas (Kanvas Bersih)
                </span>
              </div>

              <!-- Zoom Oktaf & Scale Tag -->
              <div class="flex items-center gap-2 text-xs font-mono">
                <span class="text-zinc-500 text-[10px]">ZOOM:</span>
                <button
                  type="button"
                  class="px-2 py-0.5 rounded border text-[11px]"
                  :class="rollZoomMode === 'focus' ? 'border-[#00F5A0]/60 bg-[#072A1E] text-[#00F5A0] font-bold' : 'border-white/10 bg-zinc-900 text-zinc-400'"
                  @click="setRollZoom('focus')"
                >
                  C3–C5
                </button>
                <button
                  type="button"
                  class="px-2 py-0.5 rounded border text-[11px]"
                  :class="rollZoomMode === 'full' ? 'border-[#00F5A0]/60 bg-[#072A1E] text-[#00F5A0] font-bold' : 'border-white/10 bg-zinc-900 text-zinc-400'"
                  @click="setRollZoom('full')"
                >
                  C2–C6
                </button>
              </div>
            </div>

            <!-- Piano Roll Title & Legend -->
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
              <span class="text-[#A3A8B8]">
                {{ currentExercise ? `Target Latihan: ${currentExercise.title} • Tempo ${currentExercise.bpm} BPM` : 'Mode Bebas: Tanpa Balok Target (Kanvas Bersih)' }}
              </span>
              <div class="flex items-center gap-3 font-normal text-xs normal-case">
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> In-Tune (±20 sen)</span>
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-400"></span> Flat</span>
                <span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Sharp</span>
              </div>
            </div>

            <div class="rounded overflow-hidden border border-white/6 bg-[#070709] relative select-none">
              <canvas
                ref="pianoRollCanvasRef"
                class="w-full block cursor-ew-resize min-h-[360px] md:min-h-[520px]"
                height="520"
                @mousedown="handleCanvasMouseDown"
                @mousemove="handleCanvasMouseMove"
                @mouseup="handleCanvasMouseUp"
                @mouseleave="handleCanvasMouseUp"
                title="Tarik atau klik timeline untuk menggeser posisi pemutaran dan inspeksi vokal"
              ></canvas>

              <!-- Floating Pure Icon Transport Deck [ ◁  II/▶  ▷ ] di Sudut Kanan Bawah Canvas -->
              <div
                v-if="!isRecording && (recordedAudioBlob || audioBuffer)"
                class="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#121215]/95 backdrop-blur-md p-1.5 rounded-lg border border-white/15 shadow-2xl"
              >
                <!-- Mundur 2s -->
                <button
                  type="button"
                  class="w-8 h-8 rounded flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer text-xs"
                  @click="seekRelative(-2)"
                  title="Mundur 2 detik"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="11 19 2 12 11 5 11 19"/>
                    <polygon points="22 19 13 12 22 5 22 19"/>
                  </svg>
                </button>

                <!-- Putar dari Awal / Jeda / Lanjut HANYA IKON -->
                <button
                  type="button"
                  class="w-8 h-8 rounded flex items-center justify-center transition-all cursor-pointer"
                  :class="isPlaying ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'"
                  @click="togglePlayback"
                  :title="isPlaying ? 'Jeda Audio' : 'Putar Rekaman dari Awal'"
                >
                  <svg v-if="!isPlaying" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                </button>

                <!-- Maju 2s -->
                <button
                  type="button"
                  class="w-8 h-8 rounded flex items-center justify-center bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer text-xs"
                  @click="seekRelative(2)"
                  title="Maju 2 detik"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="13 19 22 12 13 5 13 19"/>
                    <polygon points="2 19 11 12 2 5 2 19"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Right Column: Card 2 Vocal Registers & Span + Live Meter (444px on desktop) -->
      <div class="w-full xl:w-[444px] xl:shrink-0 flex flex-col gap-4">
        <!-- Live Pitch Needle Card (Studio Metering) -->
        <Card class="bg-[#121215] border-white/8">
          <div class="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>DETEKSI NADA WAKTU NYATA</span>
            <span class="text-[10px] text-zinc-500 font-mono">F0 TRACKER</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-baseline">
              <span class="text-5xl font-black font-mono text-zinc-100 leading-none">{{ currentNoteStr }}</span>
              <span class="text-xl font-mono text-zinc-400 ml-1">{{ currentOctaveStr }}</span>
            </div>
            <div class="text-right">
              <div class="font-mono text-sm font-semibold text-zinc-300">{{ currentPitchStr }}</div>
              <div class="font-mono text-xs font-bold" :class="currentCentsClass">{{ currentCentsStr }}</div>
              <div class="text-[11px] mt-0.5 font-mono" :class="statusClass">{{ currentStatusText }}</div>
            </div>
          </div>

          <!-- Needle Deviation Bar -->
          <div class="w-full h-2.5 bg-[#0a0a0c] rounded-full mt-4 relative overflow-hidden border border-white/10">
            <div class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-zinc-600 -translate-x-1/2"></div>
            <div
              class="absolute top-0 bottom-0 w-2 rounded-full -translate-x-1/2 transition-all duration-100"
              :class="Math.abs(currentCents) <= 20 ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : currentCents < -20 ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'"
              :style="{ left: needlePosition }"
            ></div>
          </div>
          <div class="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
            <span>-50c (Flat)</span>
            <span>0c</span>
            <span>+50c (Sharp)</span>
          </div>
        </Card>

        <!-- Session Acoustic Telemetry Summary (Matching Card 2 Figma #61:9571) -->
        <Card
          class="!p-5 rounded-[16px] border border-white/10"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
        >
          <div class="flex items-center justify-between text-[11px] font-mono font-bold text-[#A3A8B8] uppercase tracking-wider mb-3">
            <span class="text-[#FAFAFC]">Vocal Registers &amp; Span</span>
            <span class="text-[#00F5A0] font-bold">{{ pitchHistory.length > 0 ? `${telemetryLow} — ${telemetryHigh}` : 'Standby' }}</span>
          </div>

          <!-- Highlight Box #61:9585 -->
          <div class="p-3.5 rounded-xl bg-[#072A1E]/80 border border-[#00F5A0]/40 mb-3">
            <div class="flex items-center justify-between text-[10px] font-bold text-[#00F5A0] mb-1 font-mono">
              <span>{{ dynamicRegisterTitle }}</span>
              <span class="flex items-center gap-1">
                <svg v-if="pitchHistory.length > 0 && overallScore >= 85" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                <span>{{ pitchHistory.length > 0 ? (overallScore >= 85 ? 'Top 10% Vokal' : 'Latihan Aktif') : 'Standby' }}</span>
              </span>
            </div>
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-black font-mono text-white">{{ pitchHistory.length > 0 ? `${telemetryLow} — ${telemetryHigh}` : '—' }}</span>
              <span class="text-xs font-mono font-bold text-[#00F5A0]">Power: {{ dynamicPowerRate }}%</span>
            </div>
            <div class="text-[10px] text-[#A3A8B8] mt-1 font-mono">
              Span: {{ telemetryOctaves }} Oktaf ({{ vocalClassification }})
            </div>
            <div class="w-full bg-[#0D1A1F] rounded-full h-1.5 overflow-hidden mt-2">
              <div class="bg-[#00F5A0] h-full rounded-full transition-all duration-300" :style="{ width: `${dynamicPowerRate}%` }"></div>
            </div>
          </div>

          <table class="w-full text-xs font-mono">
            <tbody>
              <tr class="border-b border-white/5 py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">HEAD VOICE (2k–5k Hz):</td>
                <td class="text-[#F59E0A] font-bold">{{ Math.round(resonance.head) }}% Formant</td>
              </tr>
              <tr class="border-b border-white/5 py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">MIXED VOICE (400–2k Hz):</td>
                <td class="text-[#00F5A0] font-bold">{{ Math.round(resonance.mask) }}% Balance</td>
              </tr>
              <tr class="border-b border-white/5 py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">CHEST VOICE (100–400 Hz):</td>
                <td class="text-[#06B6D4] font-bold">{{ Math.round(resonance.chest) }}% Foundation</td>
              </tr>
              <tr class="border-b border-white/5 py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">Nada Terendah Terdeteksi:</td>
                <td class="text-white font-bold">{{ telemetryLow }}</td>
              </tr>
              <tr class="border-b border-white/5 py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">Nada Tertinggi Terdeteksi:</td>
                <td class="text-white font-bold">{{ telemetryHigh }}</td>
              </tr>
              <tr class="py-1.5 flex justify-between">
                <td class="text-[#A3A8B8]">Waktu Bersuara (Voiced):</td>
                <td class="text-[#00F5A0] font-bold">{{ telemetryVoicedRate }}%</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <!-- Resonance Balance Meter -->
        <Card class="bg-[#121215] border-white/8">
          <div class="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>DISTRIBUSI RESONANSI VOKAL</span>
            <Badge variant="cyan" class="text-[9px]">3-BAND EQ</Badge>
          </div>
          <div class="flex flex-col gap-3">
            <Progress :value="resonance.chest" label="Chest Voice (Dada / 100-400Hz)" showValue color="cyan" />
            <Progress :value="resonance.mask" label="Mask / Mixed Voice (Wajah / 400-2kHz)" showValue color="emerald" />
            <Progress :value="resonance.head" label="Head Voice (Kepala / 2-5kHz)" showValue color="amber" />
          </div>
        </Card>

        <!-- AI Acoustic Analysis Action Card (Clean Studio Flow) -->
        <Card class="bg-[#121215] border-white/8 p-5">
          <div class="flex items-center justify-between mb-3">
            <Badge :variant="analysisAvailable ? 'green' : 'outline'" class="font-mono text-[10px]">
              {{ isAnalyzing ? 'MEMPROSES DIAGNOSTIK...' : analysisAvailable ? 'HASIL SIAP' : 'STANDBY' }}
            </Badge>
            <span class="text-[11px] font-mono text-zinc-500">DSP DIAGNOSTIC</span>
          </div>

          <!-- Belum Ada Rekaman -->
          <div v-if="!analysisAvailable && !isRecording && !isAnalyzing" class="text-center py-4 bg-[#0a0a0c] rounded border border-white/6 px-4">
            <div class="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center mx-auto mb-2 text-zinc-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" y1="19" x2="12" y2="22"/>
              </svg>
            </div>
            <p class="text-xs font-mono text-zinc-400 leading-relaxed">
              Mulai rekam vokal Anda atau import file audio untuk menghasilkan rapor diagnostik 5 dimensi.
            </p>
          </div>

          <!-- Sedang Merekam -->
          <div v-else-if="isRecording" class="text-center py-4 bg-[#0a0a0c] rounded border border-rose-500/20 px-4">
            <div class="w-3 h-3 rounded-full bg-rose-500 mx-auto mb-2 animate-ping"></div>
            <p class="text-xs font-mono text-zinc-300">
              Merekam audio vokal... Klik <span class="text-rose-400 font-bold">"Selesai"</span> untuk memproses analisis.
            </p>
          </div>

          <!-- Sedang Memproses Backend / AI Analysis -->
          <div v-else-if="isAnalyzing" class="text-center py-5 bg-[#0a0a0c] rounded border border-cyan-500/30 px-4">
            <div class="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <div class="text-xs font-mono text-cyan-300 font-bold">Mesin akustik sedang memproses audio...</div>
            <div class="text-[11px] font-mono text-zinc-500 mt-1">Mengekstrak pitch drift, kestabilan nada dan resonansi</div>
          </div>

          <!-- Rekaman Selesai & Hasil Analisis Tersedia -->
          <div v-else-if="analysisAvailable" class="space-y-3">
            <div class="p-3 bg-emerald-950/40 rounded border border-emerald-500/30 flex items-center justify-between">
              <div>
                <div class="text-xs font-mono font-bold text-emerald-300">Rekaman Berhasil Diproses</div>
                <div class="text-[11px] font-mono text-zinc-400 mt-0.5">
                  {{ sessionTime.toFixed(1) }} detik audio • {{ pitchHistory.length }} frame nada
                </div>
              </div>
              <div class="text-2xl font-black font-mono text-emerald-400">{{ overallScore }}</div>
            </div>

            <Button
              variant="default"
              size="default"
              class="w-full flex items-center justify-center gap-2 font-mono font-bold shadow-lg shadow-emerald-500/20"
              @click="openReportPage"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>Lihat Rapor Hasil Analisis Vokal</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>

    <!-- Bottom Bento Row (from Figma #61:9610: Card 3 416px, Card 4 444px, Card 5 420px -> max-w-[1312px] mx-auto) -->
    <div class="flex flex-col xl:flex-row gap-4 mt-2 items-start w-full max-w-[1312px] mx-auto">
      <!-- Card 3: Gemini AI Vocal Coach (#61:9611) (416px on desktop) - Premium Lock Design -->
      <div
        class="w-full xl:w-[416px] xl:shrink-0 rounded-[16px] p-5 flex flex-col justify-between border border-[#00F5A0]/30 min-h-[340px] relative overflow-hidden"
        style="background: linear-gradient(133deg, rgba(0, 245, 161, 0.08) 7%, rgba(8, 36, 26, 0.7) 30%, rgba(14, 16, 21, 0.88) 70%, rgba(9, 10, 13, 0.95) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12);"
      >
        <!-- Background Ambient Glow & Blurred Content -->
        <div class="filter blur-[1.5px] select-none opacity-40 pointer-events-none">
          <div class="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00F5A0" stroke-width="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span class="text-[10px] font-bold font-mono tracking-wider text-[#00F5A0] uppercase">YOUR VOCAL COACH</span>
          </div>
          <h4 class="text-base font-bold text-[#FAFAFC] mb-1">Bridge Mix-Voice Smoothly</h4>
          <p class="text-[11px] leading-[17px] text-[#D1D6E0] mb-4">
            "Great resonance on chest tones! Smooth the F#4 to G4 bridge to eliminate the slight flat drift during breath recovery."
          </p>

          <div class="px-3 py-2 bg-[#14161E]/90 border border-white/10 rounded-lg flex items-center justify-between mb-4">
            <div class="flex flex-col">
              <span class="text-[11px] font-bold text-[#FAFAFC]">Take Analysis: F#4–G4 Shift</span>
              <span class="text-[9px] font-mono text-[#F59E0A]">Mild Flatness Detected at 00:23</span>
            </div>
            <div class="flex items-end gap-1 h-5">
              <span class="w-1 bg-[#00F5A0] h-2 rounded-full"></span>
              <span class="w-1 bg-[#00F5A0] h-4 rounded-full"></span>
              <span class="w-1 bg-[#F43F5E] h-5 rounded-full"></span>
              <span class="w-1 bg-[#00F5A0] h-3 rounded-full"></span>
              <span class="w-1 bg-[#00F5A0] h-2 rounded-full"></span>
            </div>
          </div>
        </div>

        <!-- Premium Lock Overlay Banner -->
        <div class="absolute inset-0 bg-[#07090D]/85 backdrop-blur-[3px] flex flex-col items-center justify-center p-6 text-center z-20">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00F5A0]/20 to-[#0A261D] border border-[#00F5A0]/50 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(0,245,160,0.25)]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00F5A0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#072A1E] border border-[#00F5A0]/40 text-[9px] font-mono font-bold text-[#00F5A0] uppercase tracking-wider mb-2">
            <span>PREMIUM FEATURE</span>
          </div>

          <h4 class="text-base font-extrabold text-[#FAFAFC] mb-1.5 tracking-tight">AI Vocal Coach &amp; Drill Generator</h4>
          <p class="text-xs text-[#A3A8B8] leading-relaxed mb-5 max-w-[310px]">
            Dapatkan feedback intonasi per-frasa instan, koreksi register vokal, dan rekomendasi latihan adaptif berdasar data suara Anda.
          </p>

          <router-link
            to="/pricing"
            class="w-full max-w-[280px] h-9 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(0,245,160,0.3)] hover:opacity-95 transition-all"
          >
            <span>Upgrade ke Pro / Premium</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Card 4: Accuracy Trend (#61:9643) (444px on desktop) -->
      <div
        class="w-full xl:w-[444px] xl:shrink-0 rounded-[16px] p-5 flex flex-col justify-between border border-white/8 min-h-[340px]"
        style="background: linear-gradient(217deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#FAFAFC]">Accuracy Trend</span>
              <span class="text-sm font-bold text-[#00F5A0] font-mono">{{ pitchAccuracyRate > 0 ? `${pitchAccuracyRate}%` : '—' }}</span>
              <span v-if="pitchAccuracyRate > 0" class="text-[10px] text-[#00F5A0] font-bold">Aktif</span>
            </div>
            <span class="text-[10px] font-mono text-[#D1D6E0] px-2 py-0.5 rounded bg-[#14161E] border border-white/10">Weekly</span>
          </div>
          <p class="text-[11px] text-[#758094] font-mono mb-4">Grafik kestabilan intonasi vokal 7 hari terakhir</p>
        </div>

        <!-- 7-Day Bar Chart Graphic (Proporsional & Kokoh) -->
        <div class="h-[175px] px-3.5 pt-6 pb-2.5 bg-[#07090D]/90 rounded-xl border border-white/6 flex flex-col justify-between">
          <div class="grid grid-cols-7 gap-3 items-end h-[120px] w-full">
            <div
              v-for="(item, idx) in weeklyAverages"
              :key="idx"
              class="flex flex-col items-center gap-1.5 h-full justify-end relative group"
            >
              <!-- Popover Persentase di atas Bar -->
              <span
                class="text-[9px] font-bold font-mono transition-colors"
                :class="item.pct > 0 ? (idx === 6 ? 'text-[#00F5A0]' : 'text-zinc-300') : 'text-zinc-600'"
              >
                {{ item.pct > 0 ? `${item.pct}%` : '—' }}
              </span>
              <!-- Batang Bar dengan Lebar Tegap -->
              <div class="w-full max-w-[28px] h-full flex items-end">
                <div
                  class="w-full rounded-md transition-all duration-300 min-h-[4px]"
                  :class="item.pct > 0 ? (idx === 6 ? 'bg-gradient-to-t from-[#00F5A0]/80 to-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.45)]' : 'bg-gradient-to-t from-[#0A261D] to-[#144238] border border-emerald-500/20') : 'bg-white/5 border border-white/5'"
                  :style="{ height: `${Math.max(4, item.pct)}%` }"
                ></div>
              </div>
              <span
                class="text-[10px] font-mono mt-1"
                :class="idx === 6 ? 'text-[#00F5A0] font-bold' : 'text-[#758094]'"
              >
                {{ item.day }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] font-mono text-[#A3A8B8] mt-3 pt-2 border-t border-white/5">
          <span>Vibrato: {{ vibratoRate > 0 ? `${vibratoRate} Hz` : '—' }} ({{ vibratoQuality >= 75 ? 'Natural' : 'Developing' }})</span>
          <span class="text-[#00F5A0] font-bold">Akurasi Rata-rata: {{ pitchAccuracyRate > 0 ? `${pitchAccuracyRate}%` : '—' }}</span>
        </div>
      </div>

      <!-- Card 5: Recent Singing Takes (#61:9684) (420px on desktop) -->
      <div
        class="w-full xl:w-[420px] xl:shrink-0 rounded-[16px] p-5 flex flex-col justify-between border border-white/8 min-h-[340px]"
        style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
      >
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-bold text-[#FAFAFC]">Recent Singing Takes</span>
          <router-link to="/analytics" class="text-xs text-[#A3A8B8] hover:text-white font-mono">View All</router-link>
        </div>

        <div class="flex flex-col gap-2">
          <div v-if="recentTakesList.length === 0" class="text-center py-6 text-xs text-zinc-500 font-mono">
            Belum ada take vokal tersimpan. Mulai rekam untuk membuat take pertama.
          </div>

          <!-- Live Dynamic Takes -->
          <div
            v-for="(take, idx) in recentTakesList.slice(0, 3)"
            :key="take.id || idx"
            class="flex items-center justify-between p-2.5 rounded-lg bg-[#14161E]/80 border border-white/6"
          >
            <div class="flex items-center gap-2.5">
              <div
                class="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
                :class="take.accuracy >= 80 ? 'bg-[#072A1E] border border-[#00F5A0]/40 text-[#00F5A0]' : 'bg-[#1F232E] border border-rose-500/40 text-rose-400'"
                @click="togglePlayback"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <div class="flex flex-col text-left">
                <span class="text-[11px] font-bold text-[#FAFAFC] truncate max-w-[170px]">{{ take.title }}</span>
                <span class="text-[9px] text-[#758094] font-mono">{{ take.subtitle }}</span>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-[#072A1E] text-[#00F5A0] border border-[#00F5A0]/30">{{ take.pts }}</span>
              <button
                v-if="recordedAudioBlob || audioBuffer"
                type="button"
                class="text-[9px] font-mono text-[#D1D6E0] bg-[#141A21] border border-white/10 px-2 py-1 rounded hover:text-white cursor-pointer"
                @click="togglePlayback"
              >
                {{ isPlaying ? 'Stop' : 'Replay' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    <!-- Exercise Catalog Modal -->
    <ExerciseCatalogModal
      :isOpen="isCatalogOpen"
      :exercises="exerciseList"
      :selectedId="currentExerciseId"
      @close="isCatalogOpen = false"
      @select="handleSelectExercise"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Card from '../components/ui/Card.vue';
import Progress from '../components/ui/Progress.vue';
import ExerciseCatalogModal from '../components/ExerciseCatalogModal.vue';
import {
  detectPitch,
  freqToNote,
  freqToMidi,
  midiToFreq,
  computeResonance,
  estimateVibrato,
  computeJitter,
  computeBreathSupport,
  computeRMS,
  NOTE_NAMES
} from '../utils/pitch.js';

const router = useRouter();

// State Pemrosesan Analisis
const isAnalyzing = ref(false);
const analysisAvailable = ref(false);
const micPermissionError = ref(false);
const isRecordingPaused = ref(false);

// Sesi dan Batasan Tier
const user = ref(JSON.parse(localStorage.getItem('vs_user') || 'null'));
const currentTier = computed(() => user.value?.tier || 'free');
const isPremiumUser = computed(() => currentTier.value === 'premium' || currentTier.value === 'pro');
const maxRecordingSec = computed(() => {
  if (currentTier.value === 'premium') return 900;
  if (currentTier.value === 'pro') return 300;
  return 60;
});

// State Perekaman & Playback
const isRecording = ref(false);
const isPlaying = ref(false);
const isGuideAudioPlaying = ref(false);
const sessionTime = ref(0);
let timerInterval = null;

// Timeline Navigation & Zoom Modes (From Legacy Prototype)
const rollZoomMode = ref('focus'); // 'focus' (C3-C5) atau 'full' (C2-C6)
const isRollPaused = ref(false);
const hitIndicator = ref(false);
let isDraggingCanvas = false;
let dragStartX = 0;
let dragStartTime = 0;

// Dynamic Exercise Catalog & Latency (Default: Kanvas Bersih / Freeform)
const isCatalogOpen = ref(false);
const currentExerciseId = ref('freeform');
const micLatencyMs = ref(20);
const exerciseList = ref([
  {
    id: 'scale-major-octave',
    title: 'Full Octave Major Solfeggio',
    category: 'Pitch Accuracy',
    level: 'Menengah',
    target_vowel: '/a/ (Ah) & /i/ (Ee)',
    bpm: 96,
    description: 'Melatih presisi intonasi tiap interval semiton dari Do rendah hingga Do tinggi.',
    notes: [
      { midi: 60, start: 0.0, dur: 0.6 },
      { midi: 62, start: 0.6, dur: 0.6 },
      { midi: 64, start: 1.2, dur: 0.6 },
      { midi: 65, start: 1.8, dur: 0.6 },
      { midi: 67, start: 2.4, dur: 0.6 },
      { midi: 69, start: 3.0, dur: 0.6 },
      { midi: 71, start: 3.6, dur: 0.6 },
      { midi: 72, start: 4.2, dur: 1.2 },
      { midi: 71, start: 5.4, dur: 0.5 },
      { midi: 69, start: 5.9, dur: 0.5 },
      { midi: 67, start: 6.4, dur: 0.5 },
      { midi: 65, start: 6.9, dur: 0.5 },
      { midi: 64, start: 7.4, dur: 0.5 },
      { midi: 62, start: 7.9, dur: 0.5 },
      { midi: 60, start: 8.4, dur: 1.2 }
    ]
  },
  {
    id: 'warmup-lip-trill',
    title: 'Lip Trill 5-Tone Scale',
    category: 'Warm-up & Release',
    level: 'Pemula',
    target_vowel: 'Lip Buzz / Brrr',
    bpm: 84,
    description: 'Melepaskan ketegangan rahang, mengaktifkan napas diafragma, dan meratakan tekanan subglotal.',
    notes: [
      { midi: 60, start: 0.0, dur: 0.5 },
      { midi: 62, start: 0.5, dur: 0.5 },
      { midi: 64, start: 1.0, dur: 0.5 },
      { midi: 65, start: 1.5, dur: 0.5 },
      { midi: 67, start: 2.0, dur: 0.7 },
      { midi: 65, start: 2.7, dur: 0.5 },
      { midi: 64, start: 3.2, dur: 0.5 },
      { midi: 62, start: 3.7, dur: 0.5 },
      { midi: 60, start: 4.2, dur: 1.0 }
    ]
  },
  {
    id: 'arpeggio-triad',
    title: 'Major Triad Arpeggio (Do-Mi-Sol-Do)',
    category: 'Pitch Agility',
    level: 'Menengah',
    target_vowel: '/o/ (Oh) / /u/ (Oo)',
    bpm: 105,
    description: 'Lompatan interval ketiga dan kelima mayor untuk kelenturan pita suara.',
    notes: [
      { midi: 60, start: 0.0, dur: 0.5 },
      { midi: 64, start: 0.5, dur: 0.5 },
      { midi: 67, start: 1.0, dur: 0.5 },
      { midi: 72, start: 1.5, dur: 1.0 },
      { midi: 67, start: 2.5, dur: 0.5 },
      { midi: 64, start: 3.0, dur: 0.5 },
      { midi: 60, start: 3.5, dur: 1.0 }
    ]
  },
  {
    id: 'passaggio-register-blend',
    title: 'Passaggio Register Shift',
    category: 'Register Transition',
    level: 'Lanjutan',
    target_vowel: '/u/ -> /o/ -> /a/',
    bpm: 80,
    description: 'Latihan transisi halus dari suara dada menembus jembatan vokal menuju mix voice.',
    notes: [
      { midi: 64, start: 0.0, dur: 0.8 },
      { midi: 65, start: 0.8, dur: 0.8 },
      { midi: 67, start: 1.6, dur: 0.8 },
      { midi: 69, start: 2.4, dur: 0.8 },
      { midi: 71, start: 3.2, dur: 1.2 },
      { midi: 69, start: 4.4, dur: 0.7 },
      { midi: 67, start: 5.1, dur: 0.7 },
      { midi: 65, start: 5.8, dur: 0.7 },
      { midi: 64, start: 6.5, dur: 1.2 }
    ]
  },
  {
    id: 'sustain-vibrato-stability',
    title: 'Long Note Sustain & Vibrato',
    category: 'Breath & Vibrato',
    level: 'Semua Level',
    target_vowel: '/a/ (Ah Open Throat)',
    bpm: 60,
    description: 'Menahan nada stabil minimal 4 detik tanpa pitch drift, disusul vibrato natural.',
    notes: [
      { midi: 65, start: 0.0, dur: 4.5 }
    ]
  }
]);

const currentExercise = computed(() => {
  if (!currentExerciseId.value || currentExerciseId.value === 'freeform') return null;
  return exerciseList.value.find(e => e.id === currentExerciseId.value) || null;
});

const currentExerciseTitle = computed(() => {
  if (!currentExercise.value) return 'Mode Bebas (Kanvas Bersih)';
  return currentExercise.value.title;
});

function handleSelectExercise(ex) {
  currentExerciseId.value = ex.id;
  // Reset sessionTime ke 0 agar balok panduan langsung start bersih dari luar sisi kanan
  if (!isRecording.value && !isPlaying.value) {
    sessionTime.value = 0;
  }
}

const selectedExercise = computed(() => currentExerciseId.value);
const transposeKey = ref(0);
const uploadStatusText = ref('');
const isProcessingUpload = ref(false);

// Live Pitch Readings
const currentPitch = ref(-1);
const currentCents = ref(0);
const currentNote = ref('-');
const currentOctave = ref('');
const resonance = ref({ chest: 0, mask: 0, head: 0 });
const liveVuL = ref(0);
const liveVuR = ref(0);

// Riwayat data vokal sesi
const pitchHistory = ref([]); // [{ t, freq, cents, midi }]
const noteBlocks = ref([]);   // Balok notasi vokal pengguna [{ midi, start, dur, inTuneCount, totalCount }]
let activeUserBlock = null;
let pendingMidiCandidate = null;
let candidateFrameCount = 0;

// Audio Context & Nodes
let audioCtx = null;
let analyser = null;
let fftAnalyser = null;
let sourceNode = null;
let micStream = null;
let animFrameId = null;

// Recorded Audio & Playback Engine
const recordedAudioBlob = ref(null);
const audioBuffer = ref(null);
let mediaRecorder = null;
let recordedChunks = [];
let playbackAudioSource = null;
let playbackAudioEl = null;
let playbackStartTime = 0;
let playbackAudioOffset = 0;

// Riwayat sesi rekaman lokal pengguna
const recentTakesList = ref(JSON.parse(localStorage.getItem('vs_recent_takes') || '[]'));
const weeklyAverages = computed(() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  const takes = recentTakesList.value;
  if (takes.length === 0) {
    return days.map(day => ({ day, pct: 0 }));
  }
  const latestPct = Math.round(takes[0]?.accuracy || 0);
  return [
    { day: 'Mon', pct: 0 },
    { day: 'Tue', pct: 0 },
    { day: 'Wed', pct: 0 },
    { day: 'Thu', pct: 0 },
    { day: 'Fri', pct: 0 },
    { day: 'Sat', pct: 0 },
    { day: 'Today', pct: latestPct }
  ];
});

// Canvas References
const spectrumCanvasRef = ref(null);
const pianoRollCanvasRef = ref(null);
const radarCanvasRef = ref(null);
let radarChartInstance = null;

// Computed Displays
const formattedTime = computed(() => {
  const m = Math.floor(sessionTime.value / 60).toString().padStart(2, '0');
  const s = Math.floor(sessionTime.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

const sessionStateText = computed(() => {
  if (isRecording.value) {
    return isRecordingPaused.value ? 'REKAMAN DIJEDA' : 'SEDANG MEREKAM VOKAL';
  }
  if (isPlaying.value) return 'MEMUTAR ULANG REKAMAN';
  if (isGuideAudioPlaying.value) return 'PANDUAN NADA PIANO';
  return 'STANDBY';
});

const currentNoteStr = computed(() => currentNote.value);
const currentOctaveStr = computed(() => currentOctave.value);
const currentPitchStr = computed(() => (currentPitch.value > 0 ? `${currentPitch.value.toFixed(1)} Hz` : '- Hz'));
const currentCentsStr = computed(() => {
  if (currentPitch.value <= 0) return '±0 sen';
  return `${currentCents.value > 0 ? '+' : ''}${currentCents.value} sen`;
});

const centsDevClass = computed(() => {
  if (currentPitch.value <= 0) return 'text-slate-500';
  if (Math.abs(currentCents.value) <= 20) return 'text-emerald-400';
  if (currentCents.value < -20) return 'text-rose-400';
  return 'text-amber-400';
});

const currentCentsClass = computed(() => centsDevClass.value);

const currentStatusText = computed(() => {
  if (currentPitch.value <= 0) return 'Menunggu suara vokal...';
  if (Math.abs(currentCents.value) <= 20) return 'In-Tune';
  if (currentCents.value < -20) return 'Flat (Terlalu Rendah)';
  return 'Sharp (Terlalu Tinggi)';
});

const statusClass = computed(() => centsDevClass.value);

const needlePosition = computed(() => {
  if (currentPitch.value <= 0) return '50%';
  const clamped = Math.max(-50, Math.min(50, currentCents.value));
  return `${50 + (clamped / 50) * 45}%`;
});

// Metrik Rapor Evaluasi (Default 0 sebelum rekaman)
const pitchAccuracyRate = ref(0);
const pitchStabilityRate = ref(0);
const vibratoRate = ref(0);
const vibratoQuality = ref(0);
const breathSupportRate = ref(0);

// Telemetry & Sampel Nada Terdeteksi (From Legacy Prototype)
const telemetryLow = computed(() => {
  if (pitchHistory.value.length === 0) return '-';
  const minMidi = Math.min(...pitchHistory.value.map(p => p.midi));
  const noteName = NOTE_NAMES[((minMidi % 12) + 12) % 12];
  const oct = Math.floor(minMidi / 12) - 1;
  return `${noteName}${oct}`;
});

const telemetryHigh = computed(() => {
  if (pitchHistory.value.length === 0) return '-';
  const maxMidi = Math.max(...pitchHistory.value.map(p => p.midi));
  const noteName = NOTE_NAMES[((maxMidi % 12) + 12) % 12];
  const oct = Math.floor(maxMidi / 12) - 1;
  return `${noteName}${oct}`;
});

const telemetryVoicedRate = computed(() => {
  if (sessionTime.value <= 0) return 0;
  const voicedSec = pitchHistory.value.length * 0.05;
  return Math.min(100, Math.round((voicedSec / sessionTime.value) * 100));
});

const telemetryOctaves = computed(() => {
  if (pitchHistory.value.length === 0) return 0;
  const minMidi = Math.min(...pitchHistory.value.map(p => p.midi));
  const maxMidi = Math.max(...pitchHistory.value.map(p => p.midi));
  return Number(((maxMidi - minMidi) / 12).toFixed(1));
});

const vocalClassification = computed(() => {
  if (pitchHistory.value.length === 0) return 'Menunggu Sesi Vokal';
  const maxMidi = Math.max(...pitchHistory.value.map(p => p.midi));
  const minMidi = Math.min(...pitchHistory.value.map(p => p.midi));
  if (maxMidi >= 76) return 'Soprano Range';
  if (maxMidi >= 70 && minMidi >= 53) return 'Alto / Mezzo Range';
  if (maxMidi >= 67 && minMidi >= 48) return 'Tenor Range';
  if (maxMidi >= 62 && minMidi >= 43) return 'Baritone Range';
  return 'Bass Range';
});

const dynamicRegisterTitle = computed(() => {
  if (pitchHistory.value.length === 0) return 'Vocal Registers Standby';
  if (resonance.value.head > 45) return 'HEAD VOICE DOMINANT';
  if (resonance.value.mask > 45) return 'MIXED VOICE BALANCE';
  return 'CHEST VOICE FOUNDATION';
});

const dynamicPowerRate = computed(() => {
  if (pitchHistory.value.length === 0) return 0;
  const avgDb = rmsHistory.value.length > 0 ? (rmsHistory.value.reduce((a, b) => a + b, 0) / rmsHistory.value.length) : -30;
  return Math.min(100, Math.max(20, Math.round(((avgDb + 45) / 35) * 100)));
});

const detectedNotesChips = computed(() => {
  const seen = new Map();
  pitchHistory.value.forEach(p => {
    const noteName = NOTE_NAMES[((p.midi % 12) + 12) % 12];
    const oct = Math.floor(p.midi / 12) - 1;
    const label = `${noteName}${oct}`;
    if (!seen.has(label)) {
      seen.set(label, { note: label, inTune: Math.abs(p.cents) <= 20 });
    }
  });
  return Array.from(seen.values()).slice(0, 24);
});

function setRollZoom(mode) {
  rollZoomMode.value = mode;
}

function togglePauseRoll() {
  isRollPaused.value = !isRollPaused.value;
}

function seekRelative(deltaSec) {
  sessionTime.value = Math.max(0, sessionTime.value + deltaSec);
  if (isPlaying.value) {
    playAudioFromTime(sessionTime.value);
  }
}

const overallScore = computed(() => {
  const val = Math.round(
    pitchAccuracyRate.value * 0.35 +
    pitchStabilityRate.value * 0.25 +
    vibratoQuality.value * 0.15 +
    breathSupportRate.value * 0.25
  );
  return Math.max(10, Math.min(100, val));
});

const scoreGrade = computed(() => {
  const s = overallScore.value;
  if (s >= 90) return 'Sangat Baik (Master Vocalist)';
  if (s >= 80) return 'Baik (Solid Pitch Accuracy)';
  if (s >= 70) return 'Cukup (Perlu Stabilisasi F0)';
  return 'Perlu Latihan Dasar Tangga Nada';
});

const aiAdviceText = computed(() => {
  if (pitchHistory.value.length === 0) {
    return 'Lakukan rekaman vokal atau nyanyikan nada untuk mendapatkan evaluasi intonasi otomatis.';
  }
  if (overallScore.value >= 85) {
    return 'Kontrol intonasi dan penempatan resonansi vokal Anda sangat stabil. Lanjutkan eksplorasi dinamika volume dan variasi arpeggio oktaf tinggi.';
  }
  if (pitchAccuracyRate.value < 75) {
    return 'Terdeteksi deviasi nada flat pada transisi nada menengah. Gunakan latihan Tangga Nada Mayor terpandu dan fokus pada penempatan resonansi suara di rongga wajah (Mask).';
  }
  return 'Stabilitas penahanan nada Anda cukup baik. Latihlah konsistensi pernapasan diafragma agar getaran vibrato 5-7 Hz berosilasi lebih relaks.';
});

const coachAnalysis = computed(() => {
  if (pitchHistory.value.length === 0) {
    return {
      title: 'Siap Menganalisis Vokal',
      desc: '"Mulai bernyanyi atau rekam vokal untuk mendeteksi deviasi intonasi, formants, dan keseimbangan jembatan vokal Anda."',
      takeTitle: 'Standby: Menunggu Input',
      takeDetail: 'Mikrofon siap di 48kHz',
      hasDrift: false
    };
  }

  // Cari nada dengan deviasi sen terburuk
  const outOfTunePoints = pitchHistory.value.filter(p => Math.abs(p.cents) > 20);
  if (outOfTunePoints.length > 0) {
    const worstPoint = outOfTunePoints.reduce((prev, curr) => Math.abs(curr.cents) > Math.abs(prev.cents) ? curr : prev, outOfTunePoints[0]);
    const info = freqToNote(worstPoint.freq);
    const worstTime = `${Math.floor(worstPoint.t / 60).toString().padStart(2, '0')}:${Math.floor(worstPoint.t % 60).toString().padStart(2, '0')}`;
    const driftType = worstPoint.cents < -20 ? 'Flat' : 'Sharp';

    return {
      title: `${info.note}${info.octave} Intonation Correction`,
      desc: `Terdeteksi deviasi nada ${driftType} (${worstPoint.cents > 0 ? '+' : ''}${worstPoint.cents} sen) pada ${info.note}${info.octave} di menit ${worstTime}. Stabilkan napas diafragma saat transisi interval ini.`,
      takeTitle: `Take Analysis: ${info.note}${info.octave} Shift`,
      takeDetail: `${driftType} (${worstPoint.cents > 0 ? '+' : ''}${worstPoint.cents}c) pada ${worstTime}`,
      hasDrift: true
    };
  }

  return {
    title: 'Pitch & Timbre Sangat Presisi',
    desc: 'Intonasi Anda sangat konsisten di setiap nada! Pertahankan stabilitas pernapasan dan bentuk artikulasi vokal yang terbuka.',
    takeTitle: 'Take Analysis: In-Tune Solid',
    takeDetail: 'Akurasi di atas 90%',
    hasDrift: false
  };
});

// Preset Latihan Melodi Adaptif dari Katalog
// Tiap latihan diberi jeda lead-in (leadIn = 3.6s)
// Pada t = 0 (awal rekam / play), balok pertama (g.start = 3.6s) berada tepat di luar batas kanan kanvas (x >= w)
// Balok bergerak mulus mengalir dari kanan ke kiri menuju garis merah patokan pengguna!
const EXERCISE_LEAD_IN_SECS = 3.6;

const activeGuideNotes = computed(() => {
  const current = currentExercise.value;
  if (!current || !current.notes) return [];
  return current.notes.map(n => {
    const noteName = NOTE_NAMES[((n.midi % 12) + 12) % 12];
    const oct = Math.floor(n.midi / 12) - 1;
    return {
      note: `${noteName}${oct}`,
      midi: n.midi,
      start: n.start + EXERCISE_LEAD_IN_SECS,
      dur: n.dur
    };
  });
});

// DAW Piano Roll Constants
const PITCH_MIN_MIDI = 48; // C3 (~130.8 Hz)
const PITCH_MAX_MIDI = 72; // C5 (~523.3 Hz)
const TOTAL_NOTES = PITCH_MAX_MIDI - PITCH_MIN_MIDI + 1; // 25 tuts
// WINDOW_SECS diperkecil dari 10 detik ke 4.5 detik
// Efek: Kecepatan gulir bertambah ~2.2x lipat lebih cepat
// Balok nada yang dihasilkan menjadi 2.2x lebih panjang per detik suara, tidak gepeng/mudah terpotong
const WINDOW_SECS = 4.5;
const KEY_COL_WIDTH = 60;
const SHARP_MAP = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];

// Inisialisasi Audio Context
function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    fftAnalyser = audioCtx.createAnalyser();
    fftAnalyser.fftSize = 512;
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

// Mulai Perekaman Bernyanyi
async function startRecording() {
  ensureAudioContext();
  micPermissionError.value = false;

  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    micPermissionError.value = true;
    return;
  }

  sourceNode = audioCtx.createMediaStreamSource(micStream);
  sourceNode.connect(analyser);
  sourceNode.connect(fftAnalyser);

  // Setup MediaRecorder
  recordedChunks = [];
  try {
    mediaRecorder = new MediaRecorder(micStream);
    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });
      recordedAudioBlob.value = blob;

      // Konversi blob audio ke DataURL untuk diputar di halaman Rapor
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          if (reader.result) {
            localStorage.setItem('vs_latest_audio_url', reader.result);
          }
        } catch (e) {
          console.warn('Audio data terlalu besar untuk localStorage:', e);
        }
      };
      reader.readAsDataURL(blob);
    };
    mediaRecorder.start();
  } catch (e) {
    console.warn('MediaRecorder tidak didukung, menggunakan buffer sintetis:', e);
  }

  pitchHistory.value = [];
  noteBlocks.value = [];
  activeUserBlock = null;
  pendingMidiCandidate = null;
  candidateFrameCount = 0;
  sessionTime.value = 0;
  isRecording.value = true;
  isRecordingPaused.value = false;
  isPlaying.value = false;

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (isRecordingPaused.value) return;
    sessionTime.value += 0.1;
    if (sessionTime.value >= maxRecordingSec.value) {
      stopRecording();
    }
  }, 100);

  renderDAWLoop();
}

function togglePauseRecording() {
  if (!isRecording.value) return;
  isRecordingPaused.value = !isRecordingPaused.value;
  if (mediaRecorder) {
    if (isRecordingPaused.value && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
    } else if (!isRecordingPaused.value && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
    }
  }
}

function cancelRecording() {
  if (!isRecording.value) return;
  isRecording.value = false;
  isRecordingPaused.value = false;
  if (timerInterval) clearInterval(timerInterval);

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    try { mediaRecorder.stop(); } catch {}
  }
  if (micStream) {
    micStream.getTracks().forEach(t => t.stop());
  }

  pitchHistory.value = [];
  noteBlocks.value = [];
  activeUserBlock = null;
  sessionTime.value = 0;
  currentPitch.value = -1;
  currentNote.value = '-';
  isAnalyzing.value = false;
  analysisAvailable.value = false;
}

// Hentikan Perekaman
function stopRecording() {
  isRecording.value = false;
  if (timerInterval) clearInterval(timerInterval);

  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
  if (micStream) {
    micStream.getTracks().forEach(t => t.stop());
  }

  if (activeUserBlock) {
    noteBlocks.value.push(activeUserBlock);
    activeUserBlock = null;
  }

  // LANGSUNG kalkulasi dan simpan tanpa menunggu delay agar data tidak tertinggal saat navigasi
  calculateSessionReport();
  saveSessionReportToStorage();

  // Efek visual pemrosesan akustik singkat
  isAnalyzing.value = true;
  analysisAvailable.value = true;

  setTimeout(() => {
    isAnalyzing.value = false;
  }, 400);
}

function openReportPage() {
  saveSessionReportToStorage();
  router.push('/report');
}

async function saveSessionReportToStorage() {
  const payload = {
    id: `VS-REC-${Date.now().toString().slice(-4)}`,
    user_id: user.value?.id || null,
    date: new Date().toISOString(),
    overallScore: overallScore.value,
    scoreGrade: scoreGrade.value,
    duration: formattedTime.value,
    pitchAccuracy: pitchAccuracyRate.value,
    pitchStability: pitchStabilityRate.value,
    vibratoRate: vibratoRate.value,
    vibratoQuality: vibratoQuality.value,
    breathSupport: breathSupportRate.value,
    resonance: resonance.value,
    detectedNotes: detectedNotesChips.value,
    aiAdvice: aiAdviceText.value,
    exerciseTitle: currentExercise.value ? currentExercise.value.title : 'Freeform Vocal Take',
    vocalSpanText: `${telemetryLow.value} – ${telemetryHigh.value}`,
    vocalFachText: vocalClassification.value,
    noteBlocks: noteBlocks.value,
    pitchHistory: pitchHistory.value.slice(-300) // simpan data sinkronisasi piano roll
  };

  localStorage.setItem('vs_latest_report', JSON.stringify(payload));

  // Simpan ke riwayat takes lokal
  try {
    const newTake = {
      id: payload.id,
      title: currentExercise.value ? currentExercise.value.title : 'Freeform Vocal Take',
      subtitle: `Take #${recentTakesList.value.length + 1} • In-Tune ${payload.pitchAccuracy}%`,
      pts: `+${Math.max(5, Math.round(payload.overallScore / 5))} pts`,
      accuracy: payload.pitchAccuracy,
      duration: payload.duration,
      date: new Date().toLocaleDateString('id-ID', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    recentTakesList.value.unshift(newTake);
    if (recentTakesList.value.length > 10) recentTakesList.value.pop();
    localStorage.setItem('vs_recent_takes', JSON.stringify(recentTakesList.value));
  } catch (e) {
    console.warn('Gagal menyimpan recent take:', e);
  }

  // Simpan ke database backend jika online
  try {
    fetch('http://localhost:8001/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  } catch (e) {}

  // Simpan audio URL jika blob rekaman tersedia
  if (recordedAudioBlob.value) {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
        localStorage.setItem('vs_latest_audio_url', reader.result);
      } catch (e) {
        console.warn('Storage limit untuk audio base64, menggunakan URL runtime:', e);
      }
    };
    reader.readAsDataURL(recordedAudioBlob.value);
  }
}

// FR-013: Audio Scrubbing & Mouse Drag Handlers for Interactive Timeline
function handleCanvasMouseDown(event) {
  if (!pianoRollCanvasRef.value) return;
  const rect = pianoRollCanvasRef.value.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  if (clickX <= KEY_COL_WIDTH) return;

  isDraggingCanvas = true;
  dragStartX = clickX;
  dragStartTime = sessionTime.value;

  // Single click jumps timeline immediately
  jumpTimelineToX(clickX, rect.width);
}

function handleCanvasMouseMove(event) {
  if (!isDraggingCanvas || !pianoRollCanvasRef.value) return;
  const rect = pianoRollCanvasRef.value.getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const deltaX = currentX - dragStartX;
  const rollWidth = rect.width - KEY_COL_WIDTH;
  
  // Dragging shifts the timeline smoothly
  const timeDelta = (deltaX / rollWidth) * WINDOW_SECS;
  sessionTime.value = Math.max(0, dragStartTime - timeDelta);
}

function handleCanvasMouseUp() {
  if (isDraggingCanvas) {
    isDraggingCanvas = false;
  }
}

function jumpTimelineToX(clickX, totalWidth) {
  const rollWidth = totalWidth - KEY_COL_WIDTH;
  const relFrac = (clickX - KEY_COL_WIDTH) / rollWidth;
  // Garis merah patokan sekarang berada di 25% lebar kanvas (sisi kiri)
  // Posisi klik di kanvas dipetakan agar tepat bergeser ke garis patokan
  const windowStart = Math.max(0, sessionTime.value - WINDOW_SECS * 0.25);
  const clickedTime = windowStart + relFrac * WINDOW_SECS;
  sessionTime.value = Math.max(0, clickedTime);

  // Jika sedang memutar audio, sinkronkan playback audio seketika ke waktu baru
  if (isPlaying.value) {
    playAudioFromTime(sessionTime.value);
  }
}

function playAudioFromTime(startTime) {
  ensureAudioContext();
  stopAudioPlaybackOnly();

  playbackAudioOffset = Math.max(0, startTime);
  sessionTime.value = playbackAudioOffset;

  if (audioBuffer.value) {
    playbackAudioSource = audioCtx.createBufferSource();
    playbackAudioSource.buffer = audioBuffer.value;
    playbackAudioSource.connect(audioCtx.destination);
    playbackStartTime = audioCtx.currentTime;
    playbackAudioSource.onended = () => {
      isPlaying.value = false;
    };
    playbackAudioSource.start(0, playbackAudioOffset);
    isPlaying.value = true;
  } else if (recordedAudioBlob.value) {
    const audioUrl = URL.createObjectURL(recordedAudioBlob.value);
    playbackAudioEl = new Audio(audioUrl);
    playbackAudioEl.currentTime = playbackAudioOffset;
    playbackAudioEl.onended = () => {
      isPlaying.value = false;
    };
    playbackAudioEl.play();
    isPlaying.value = true;
  }
}

function stopAudioPlaybackOnly() {
  if (playbackAudioSource) {
    try { playbackAudioSource.stop(); } catch {}
    playbackAudioSource = null;
  }
  if (playbackAudioEl) {
    try {
      playbackAudioEl.pause();
      playbackAudioEl = null;
    } catch {}
  }
}

// Synth Piano Tone Guide
function playPianoTone(freq, duration = 0.8) {
  ensureAudioContext();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// Putar Panduan Tangga Nada Piano
function toggleGuideAudio() {
  if (isGuideAudioPlaying.value) {
    isGuideAudioPlaying.value = false;
    return;
  }

  ensureAudioContext();
  const notes = activeGuideNotes.value;
  if (notes.length === 0) return;

  // Mulai playback panduan dari t = 0
  sessionTime.value = 0;
  isGuideAudioPlaying.value = true;

  // Jalankan timeline timer untuk animasi visual balok meluncur dari kanan ke patokan merah
  const startStamp = performance.now();
  const guideTimer = setInterval(() => {
    if (!isGuideAudioPlaying.value) {
      clearInterval(guideTimer);
      return;
    }
    sessionTime.value = (performance.now() - startStamp) / 1000;
  }, 16);

  notes.forEach(n => {
    const freq = midiToFreq(n.midi + transposeKey.value);
    setTimeout(() => {
      if (!isGuideAudioPlaying.value) return;
      playPianoTone(freq, n.dur);
    }, n.start * 1000);
  });

  const lastNote = notes[notes.length - 1];
  const totalMs = (lastNote.start + lastNote.dur) * 1000;
  setTimeout(() => {
    isGuideAudioPlaying.value = false;
    clearInterval(guideTimer);
  }, totalMs + 500);
}

// FR-009: Handle Upload Audio File
async function handleAudioFileUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  ensureAudioContext();
  uploadStatusText.value = `Membaca & menganalisis file "${file.name}"...`;
  isProcessingUpload.value = true;

  try {
    const arrayBuf = await file.arrayBuffer();
    const decoded = await audioCtx.decodeAudioData(arrayBuf);
    audioBuffer.value = decoded;

    // Ekstraksi nada dari audio file secara lokal
    const sampleRate = decoded.sampleRate;
    const channelData = decoded.getChannelData(0);
    const frameSize = 2048;
    const hopSize = Math.floor(sampleRate * 0.05); // 50ms per frame
    const totalDuration = decoded.duration;

    pitchHistory.value = [];
    noteBlocks.value = [];
    activeUserBlock = null;

    let t = 0;
    const tempBuf = new Float32Array(frameSize);

    for (let offset = 0; offset + frameSize < channelData.length; offset += hopSize) {
      tempBuf.set(channelData.subarray(offset, offset + frameSize));
      const p = detectPitch(tempBuf, sampleRate);
      if (p > 0) {
        const info = freqToNote(p);
        pitchHistory.value.push({
          t,
          freq: p,
          midi: info.midiNote,
          cents: info.cents
        });

        // Rekonstruksi balok nada
        if (!activeUserBlock || activeUserBlock.midi !== info.midiNote) {
          if (activeUserBlock) noteBlocks.value.push(activeUserBlock);
          activeUserBlock = {
            midi: info.midiNote,
            start: t,
            dur: 0.05,
            inTuneCount: Math.abs(info.cents) <= 20 ? 1 : 0,
            totalCount: 1
          };
        } else {
          activeUserBlock.dur += 0.05;
          activeUserBlock.totalCount++;
          if (Math.abs(info.cents) <= 20) activeUserBlock.inTuneCount++;
        }
      } else {
        if (activeUserBlock) {
          noteBlocks.value.push(activeUserBlock);
          activeUserBlock = null;
        }
      }
      t += 0.05;
      if (t > 90) break; // Batasi 90 detik awal untuk komputasi cepat
    }

    if (activeUserBlock) noteBlocks.value.push(activeUserBlock);

    sessionTime.value = Math.min(totalDuration, 90);
    calculateSessionReport();
    saveSessionReportToStorage();
    analysisAvailable.value = true;
    uploadStatusText.value = `Berhasil mengekstrak nada dari "${file.name}" (${sessionTime.value.toFixed(1)}s). Klik "Lihat Rapor Hasil Analisis Vokal" untuk evaluasi.`;
  } catch (err) {
    uploadStatusText.value = `Gagal memproses file audio: ${err.message}`;
  } finally {
    isProcessingUpload.value = false;
  }
}

// Toggle Playback Audio Rekaman
function togglePlayback() {
  if (isPlaying.value) {
    stopAudioPlaybackOnly();
    isPlaying.value = false;
    return;
  }

  // Sesuai permintaan pengguna: Putar rekaman selalu dimulai dari awal sekali (t = 0)
  sessionTime.value = 0;
  playAudioFromTime(0);
}

// Kalkulasi Skor dan Laporan Akhir Akustik Profesional
const rmsHistory = ref([]); // buffer riwayat RMS volume dB

function calculateSessionReport() {
  if (pitchHistory.value.length === 0) return;

  const validPitches = pitchHistory.value;
  const inTuneItems = validPitches.filter(p => Math.abs(p.cents) <= 20);
  pitchAccuracyRate.value = Math.round((inTuneItems.length / validPitches.length) * 100);

  // Kestabilan: varians cents & jitter
  const centsArr = validPitches.map(p => Math.abs(p.cents));
  const avgCents = centsArr.reduce((a, b) => a + b, 0) / centsArr.length;
  pitchStabilityRate.value = Math.max(50, Math.min(98, Math.round(100 - avgCents * 1.2)));

  // Vibrato SOTA check
  const hzHistory = validPitches.map(p => p.freq);
  const vib = estimateVibrato(hzHistory);
  vibratoRate.value = vib.hasVibrato ? vib.rate : 5.8;
  vibratoQuality.value = vib.hasVibrato ? 88 : 72;

  // Real Acoustic Breath Support: dihitung dari deviasi standar desibel nyata
  if (rmsHistory.value.length > 5) {
    breathSupportRate.value = computeBreathSupport(rmsHistory.value);
  } else {
    breathSupportRate.value = Math.min(95, Math.max(65, Math.round(pitchStabilityRate.value * 0.92 + 6)));
  }
}

// Loop Render Animasi DAW & Canvases
const timeDomainBuf = new Float32Array(2048);
const freqDataBuf = new Uint8Array(256);

function renderDAWLoop() {
  // Jika sedang memutar audio rekaman/berkas, sinkronkan sessionTime secara presisi
  if (isPlaying.value) {
    if (audioBuffer.value && audioCtx) {
      sessionTime.value = playbackAudioOffset + (audioCtx.currentTime - playbackStartTime);
    } else if (playbackAudioEl) {
      sessionTime.value = playbackAudioEl.currentTime;
    }

    // Ambil sampel nada dari histori pada detik saat ini untuk visual panah
    const curT = sessionTime.value;
    const matchPt = pitchHistory.value.find(p => Math.abs(p.t - curT) <= 0.08);
    if (matchPt) {
      currentPitch.value = matchPt.freq;
      const info = freqToNote(matchPt.freq);
      currentNote.value = info.note;
      currentOctave.value = info.octave;
      currentCents.value = matchPt.cents;
    } else {
      currentPitch.value = -1;
      currentNote.value = '-';
      currentOctave.value = '';
      currentCents.value = 0;
    }
  }

  drawSpectrum();
  drawPianoRoll();

  if (isRecording.value) {
    // Ambil data nada waktu nyata dari mic
    analyser.getFloatTimeDomainData(timeDomainBuf);
    const p = detectPitch(timeDomainBuf, audioCtx.sampleRate);
    currentPitch.value = p;

    // Rekam level RMS desibel nyata untuk evaluasi napas & stabilitas dinamika
    const currentDb = computeRMS(timeDomainBuf);
    if (Number.isFinite(currentDb) && currentDb > -50) {
      rmsHistory.value.push(currentDb);
      // Map dB (-50 dB s/d -5 dB) ke rentang VU bar 0 - 100%
      const vuPercent = Math.min(100, Math.max(5, Math.round(((currentDb + 50) / 45) * 100)));
      liveVuL.value = vuPercent;
      liveVuR.value = Math.min(100, Math.max(5, Math.round(vuPercent * (0.9 + Math.random() * 0.2))));
    } else {
      liveVuL.value = Math.max(5, liveVuL.value * 0.85);
      liveVuR.value = Math.max(4, liveVuR.value * 0.85);
    }

    if (p > 0) {
      const info = freqToNote(p);
      currentNote.value = info.note;
      currentOctave.value = info.octave;
      currentCents.value = info.cents;

      // Kompensasi delay latensi mikrofon hardware (ms to sec)
      const latencySec = (micLatencyMs.value || 0) / 1000;
      const adjustedTime = Math.max(0, sessionTime.value - latencySec);

      const recordPoint = {
        t: adjustedTime,
        freq: p,
        midi: info.midiNote,
        cents: info.cents
      };
      pitchHistory.value.push(recordPoint);

      // Kelola balok nada aktif dengan anti-jitter / note debouncing
      // Mencegah tumpang tindih akibat fluktuasi cepat antara 2 semiton
      if (!activeUserBlock) {
        // Balok baru dimulai
        activeUserBlock = {
          midi: info.midiNote,
          start: adjustedTime,
          dur: 0.05,
          inTuneCount: Math.abs(info.cents) <= 20 ? 1 : 0,
          totalCount: 1,
          lastHeard: adjustedTime
        };
        pendingMidiCandidate = null;
        candidateFrameCount = 0;
      } else if (activeUserBlock.midi === info.midiNote) {
        // Nada sama berlanjut mulus: perpanjang durasi
        activeUserBlock.dur = Math.max(0.05, adjustedTime - activeUserBlock.start);
        activeUserBlock.totalCount++;
        activeUserBlock.lastHeard = adjustedTime;
        if (Math.abs(info.cents) <= 20) activeUserBlock.inTuneCount++;
        pendingMidiCandidate = null;
        candidateFrameCount = 0;
      } else {
        // Nada berbeda terdeteksi: cek apakah ini fluktuasi sesaat (jitter) atau pergantian nada sungguhan
        if (pendingMidiCandidate === info.midiNote) {
          candidateFrameCount++;
        } else {
          pendingMidiCandidate = info.midiNote;
          candidateFrameCount = 1;
        }

        // Harus bertahan setidaknya 3 frame (~50ms) stabil sebelum mengganti balok nada
        if (candidateFrameCount >= 3) {
          // Tutup balok lama tepat pada detik transisi (anti-overlap horizontal)
          activeUserBlock.dur = Math.max(0.05, adjustedTime - activeUserBlock.start);
          if (activeUserBlock.dur >= 0.08) {
            noteBlocks.value.push(activeUserBlock);
          }
          // Buka balok nada baru persis di titik adjustedTime
          activeUserBlock = {
            midi: info.midiNote,
            start: adjustedTime,
            dur: 0.05,
            inTuneCount: Math.abs(info.cents) <= 20 ? 1 : 0,
            totalCount: candidateFrameCount,
            lastHeard: adjustedTime
          };
          pendingMidiCandidate = null;
          candidateFrameCount = 0;
        } else {
          // Selama masa transisi singkat, perpanjang balok aktif lama agar tidak ada jeda bolong
          activeUserBlock.dur = Math.max(0.05, adjustedTime - activeUserBlock.start);
          activeUserBlock.lastHeard = adjustedTime;
        }
      }
    } else {
      pendingMidiCandidate = null;
      candidateFrameCount = 0;
      if (activeUserBlock) {
        // Toleransi jeda mikro suara (0.12s) sebelum balok difinalisasi
        const latencySec = (micLatencyMs.value || 0) / 1000;
        const adjustedTime = Math.max(0, sessionTime.value - latencySec);
        if (adjustedTime - (activeUserBlock.lastHeard || adjustedTime) > 0.12) {
          if (activeUserBlock.dur >= 0.08) {
            noteBlocks.value.push(activeUserBlock);
          }
          activeUserBlock = null;
        }
      }
    }

    // Ambil resonansi
    fftAnalyser.getByteFrequencyData(freqDataBuf);
    const fftFloat = new Float32Array(freqDataBuf.length);
    for (let i = 0; i < freqDataBuf.length; i++) {
      fftFloat[i] = (freqDataBuf[i] / 255) * 60 - 60; // normalize ke dB
    }
    resonance.value = computeResonance(fftFloat, audioCtx.sampleRate, 512);
  }

  animFrameId = requestAnimationFrame(renderDAWLoop);
}

// Gambar Spektrogram Resonansi
function drawSpectrum() {
  const canvas = spectrumCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 85;

  ctx.fillStyle = '#070709';
  ctx.fillRect(0, 0, w, h);

  if (!isRecording.value) {
    ctx.fillStyle = '#27272a';
    ctx.font = '10px JetBrains Mono';
    ctx.fillText('Spektogram aktif saat sesi rekam vokal berjalan.', 12, h / 2 + 3);
    return;
  }

  // Visualisasi pita resonansi (Cyan -> Emerald -> Amber)
  const barWidth = (w / freqDataBuf.length) * 1.5;
  let x = 0;
  for (let i = 0; i < freqDataBuf.length; i++) {
    const val = freqDataBuf[i];
    const barH = (val / 255) * (h - 10);
    const freq = i * (audioCtx.sampleRate / 512);

    if (freq < 400) ctx.fillStyle = '#06b6d4';      // Chest Voice (Cyan Synthwave)
    else if (freq < 2000) ctx.fillStyle = '#10b981'; // Mask Voice (Electric Emerald)
    else ctx.fillStyle = '#f59e0b';                  // Head Voice (Warm Amber)

    ctx.fillRect(x, h - barH, barWidth - 1, barH);
    x += barWidth;
    if (x > w) break;
  }
}

// Gambar DAW Piano Roll Canvas (10-Detik Moving Window)
function drawPianoRoll() {
  const canvas = pianoRollCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 520;

  ctx.fillStyle = '#070709';
  ctx.fillRect(0, 0, w, h);

  // Dynamic zoom range (focus: C3-C5 = 48-72, full: C2-C6 = 36-84)
  const pitchMin = rollZoomMode.value === 'full' ? 36 : 48;
  const pitchMax = rollZoomMode.value === 'full' ? 84 : 72;
  const totalNotes = pitchMax - pitchMin + 1;

  const rollWidth = w - KEY_COL_WIDTH;
  const noteHeight = h / totalNotes;
  const currentTime = sessionTime.value;

  // Garis merah dijadikan patokan statis di 20% lebar kanvas timeline (sisi kiri)
  // Waktu yang sedang aktif (currentTime) selalu tepat berada pada garis patokan kiri ini
  const STATIC_RATIO = 0.20;
  const staticPlayheadX = KEY_COL_WIDTH + rollWidth * STATIC_RATIO;
  const windowStart = currentTime - WINDOW_SECS * STATIC_RATIO;

  // 1. Grid Horizontal & Kolom Tuts Piano
  for (let i = 0; i < totalNotes; i++) {
    const midi = pitchMax - i;
    const y = i * noteHeight;
    const isSharp = SHARP_MAP[midi % 12] === 1;

    // Background bar baris
    ctx.fillStyle = isSharp ? '#0a0a0d' : '#101014';
    ctx.fillRect(KEY_COL_WIDTH, y, rollWidth, noteHeight);

    // Garis pemisah semiton
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(KEY_COL_WIDTH, y);
    ctx.lineTo(w, y);
    ctx.stroke();

    // Tuts Piano Vertikal di Kiri (Hardware Gear Aesthetic)
    ctx.fillStyle = isSharp ? '#18181d' : '#f4f4f5';
    ctx.fillRect(0, y, KEY_COL_WIDTH, noteHeight);

    ctx.strokeStyle = '#27272a';
    ctx.strokeRect(0, y, KEY_COL_WIDTH, noteHeight);

    // Label Nada
    const noteName = NOTE_NAMES[((midi % 12) + 12) % 12];
    const oct = Math.floor(midi / 12) - 1;
    ctx.fillStyle = isSharp ? '#71717a' : '#18181b';
    ctx.font = 'bold 9px JetBrains Mono';
    ctx.fillText(`${noteName}${oct}`, 6, y + noteHeight * 0.72);
  }

  // 2. Render Balok Panduan Melodi (Target Guide Blocks)
  const guides = activeGuideNotes.value;
  guides.forEach(g => {
    const targetMidi = g.midi + transposeKey.value;
    if (targetMidi >= pitchMin && targetMidi <= pitchMax) {
      const rowIdx = pitchMax - targetMidi;
      const y = rowIdx * noteHeight;
      const bx = KEY_COL_WIDTH + ((g.start - windowStart) / WINDOW_SECS) * rollWidth;
      const bw = (g.dur / WINDOW_SECS) * rollWidth;

      if (bx + bw > KEY_COL_WIDTH && bx < w) {
        // Balok latihan cyan neon dengan efek glow halus
        ctx.fillStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 1.5;
        ctx.fillRect(bx, y + 2, bw, noteHeight - 4);
        ctx.strokeRect(bx, y + 2, bw, noteHeight - 4);

        // Aksen glow di ujung kepala balok panduan
        ctx.fillStyle = '#22d3ee';
        ctx.fillRect(bx, y + 2, Math.min(6, bw), noteHeight - 4);

        ctx.fillStyle = '#e4e4e7';
        ctx.font = 'bold 9px JetBrains Mono';
        ctx.fillText(g.note, bx + 8, y + noteHeight * 0.68);
      }
    }
  });

  // 3. Render Balok Notasi Vokal Pengguna
  const allUserBlocks = [...noteBlocks.value];
  if (activeUserBlock) allUserBlocks.push(activeUserBlock);

  allUserBlocks.forEach(b => {
    if (b.midi >= pitchMin && b.midi <= pitchMax) {
      const rowIdx = pitchMax - b.midi;
      const y = rowIdx * noteHeight;
      const bx = KEY_COL_WIDTH + ((b.start - windowStart) / WINDOW_SECS) * rollWidth;
      const bw = Math.max(4, (b.dur / WINDOW_SECS) * rollWidth);

      if (bx + bw > KEY_COL_WIDTH && bx < w) {
        const inTuneRatio = b.totalCount > 0 ? b.inTuneCount / b.totalCount : 1;
        ctx.fillStyle = inTuneRatio >= 0.7 ? '#10b981' : inTuneRatio >= 0.4 ? '#f59e0b' : '#f43f5e';
        // Sudut balok rapi dengan border halus DAW
        ctx.fillRect(bx, y + 1.5, Math.max(3, bw - 1), noteHeight - 3);
        ctx.strokeStyle = inTuneRatio >= 0.7 ? '#059669' : inTuneRatio >= 0.4 ? '#d97706' : '#e11d48';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, y + 1.5, Math.max(3, bw - 1), noteHeight - 3);
      }
    }
  });

  // 4. Garis Merah Patokan Statis & Panah Posisi Nada Pengguna
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(staticPlayheadX, 0);
  ctx.lineTo(staticPlayheadX, h);
  ctx.stroke();

  // Badge Header Garis Statis
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.moveTo(staticPlayheadX - 6, 0);
  ctx.lineTo(staticPlayheadX + 6, 0);
  ctx.lineTo(staticPlayheadX, 9);
  ctx.closePath();
  ctx.fill();

  // Panah Penunjuk Nada Vokal Real-time Pengguna pada Garis Merah
  if (currentPitch.value > 0) {
    const fractionalMidi = 12 * Math.log2(currentPitch.value / 440) + 69;
    if (fractionalMidi >= pitchMin && fractionalMidi <= pitchMax) {
      const currentY = (pitchMax - fractionalMidi) * noteHeight;
      const isOk = Math.abs(currentCents.value) <= 20;

      // Gambar Panah Horizontal Menunjuk Garis Merah (dari kiri ke kanan mendekati garis)
      ctx.fillStyle = isOk ? '#10b981' : currentCents.value < -20 ? '#f59e0b' : '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(staticPlayheadX - 18, currentY);
      ctx.lineTo(staticPlayheadX - 5, currentY - 6);
      ctx.lineTo(staticPlayheadX - 5, currentY + 6);
      ctx.closePath();
      ctx.fill();

      // Lingkaran Titik Fokus Pitch pada Garis
      ctx.beginPath();
      ctx.arc(staticPlayheadX, currentY, 4, 0, Math.PI * 2);
      ctx.fillStyle = isOk ? '#10b981' : currentCents.value < -20 ? '#f59e0b' : '#f43f5e';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label Nada Tepat di Kanan Garis
      const noteLabel = `${currentNote.value}${currentOctave.value}`;
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(noteLabel, staticPlayheadX + 8, currentY + 4);
    }
  }
}

function triggerPrintReport() {
  window.print();
}

function handleGlobalKeydown(e) {
  // Abaikan saat fokus di input atau textarea
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target?.tagName)) return;

  if (e.code === 'Space') {
    e.preventDefault();
    if (recordedAudioBlob.value || audioBuffer.value) {
      togglePlayback();
    }
  } else if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    if (isRecording.value) {
      stopRecording();
    } else if (!isPlaying.value) {
      startRecording();
    }
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault();
    seekRelative(-2);
  } else if (e.code === 'ArrowRight') {
    e.preventDefault();
    seekRelative(2);
  }
}

onMounted(() => {
  // Bersihkan data dummy/mock dari prototipe lama agar real-production murni
  if (!localStorage.getItem('vs_clean_v1')) {
    localStorage.removeItem('vs_recent_takes');
    localStorage.removeItem('vs_sessions');
    localStorage.removeItem('vs_latest_report');
    localStorage.setItem('vs_clean_v1', 'true');
    recentTakesList.value = [];
  }

  window.addEventListener('keydown', handleGlobalKeydown);
  nextTick(() => {
    renderDAWLoop();
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeydown);
  stopRecording();
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (timerInterval) clearInterval(timerInterval);
  if (audioCtx) audioCtx.close();
});
</script>

<style scoped>
@media print {
  nav, footer, .border-b, button, label {
    display: none !important;
  }
}
</style>