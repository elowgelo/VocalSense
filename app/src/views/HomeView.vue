<template>
  <div class="home-page min-h-screen bg-[#0A0C10] text-[#FAFAFC] relative overflow-hidden font-sans">
    <!-- Ambient Radial Glow Effects (from Figma #61:13916 & 13917) -->
    <div
      class="pointer-events-none absolute -top-[100px] -left-[150px] w-[750px] h-[520px] rounded-full blur-[140px] opacity-70"
      style="background: radial-gradient(circle, rgba(0, 245, 160, 0.16) 0%, rgba(0, 245, 160, 0.04) 55%, transparent 75%);"
    ></div>
    <div
      class="pointer-events-none absolute top-[2100px] -right-[200px] w-[750px] h-[720px] rounded-full blur-[160px] opacity-60"
      style="background: radial-gradient(circle, rgba(0, 245, 160, 0.14) 0%, rgba(0, 245, 160, 0.03) 55%, transparent 80%);"
    ></div>

    <!-- 2. Hero Section (#61:14034) -->
    <section class="pt-12 pb-20 px-6 max-w-[1440px] mx-auto flex flex-col items-center text-center">
      <!-- Eyebrow Badge -->
      <div class="inline-flex items-center gap-2 mb-4">
        <span class="text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase">
          BIO-ACOUSTIC PITCH DIAGNOSTIC WEB PLATFORM
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-5xl lg:text-[50px] font-bold text-[#FAFAFC] max-w-[960px] leading-[1.16] tracking-[-0.03em] mb-4">
        Precision Bio-Acoustic Studio &amp;<br class="hidden sm:inline" />Real-Time Vocal Diagnostics
      </h1>

      <!-- Subtitle -->
      <p class="text-sm sm:text-[15px] leading-[24px] text-[#A3A8B8] max-w-[720px] mb-8 font-normal">
        Sub-millisecond YIN pitch detection, formant resonance tracking, and personalized vocal pedagogy powered by AI — zero latency, directly in your web browser.
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 mb-14">
        <router-link to="/studio">
          <button
            type="button"
            class="h-[42px] px-5 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] hover:opacity-95 shadow-[0_4px_16px_rgba(0,245,160,0.35)] border border-[#00F5A0]/90 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
            <span>Start Vocal Analysis</span>
          </button>
        </router-link>

        <router-link to="/studio">
          <button
            type="button"
            class="h-[42px] px-5 rounded-lg text-xs font-medium text-[#D1D6E0] bg-[#14161E]/95 hover:bg-[#1A212E] border border-white/12 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="7" y1="7" x2="17" y2="17"></line>
              <polyline points="17 7 17 7 17 17"></polyline>
            </svg>
            <span>Explore Live Console</span>
          </button>
        </router-link>
      </div>

      <!-- Hero Showcase Web App Window (#61:14053) -->
      <div
        class="w-full max-w-[1356px] rounded-[20px] bg-[#050608]/96 border border-white/12 p-4 sm:p-6 shadow-[0_32px_72px_-8px_rgba(0,0,0,0.75)] flex flex-col gap-4 text-left backdrop-blur-md"
        style="box-shadow: 0 32px 72px -8px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(187, 255, 167, 0.2);"
      >
        <!-- Browser Window Bar (#61:14054) -->
        <div class="flex items-center justify-between gap-4 w-full h-8 border-b border-white/6 pb-3">
          <!-- Window Dots -->
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FF5C57] inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#FFBF33] inline-block"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-[#29CC40] inline-block"></span>
          </div>

          <!-- URL Bar -->
          <div class="hidden sm:flex items-center justify-center gap-2 px-3 py-1 bg-[#14161E]/95 border border-white/10 rounded-md text-[11px] font-medium text-[#D1D6E0] max-w-[480px] w-full">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00F5A0" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span class="font-mono tracking-tight">https://app.vocalsense.ai/diagnostics/live-studio</span>
          </div>

          <!-- DSP Status -->
          <div class="flex items-center gap-1.5 text-[10px] font-bold text-[#00F5A0] font-mono">
            <span class="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-pulse"></span>
            <span>WebAudio DSP • 48kHz (Active)</span>
          </div>
        </div>

        <!-- Live Studio Canvas Inside Hero Window (#61:14068 & 14100) -->
        <div class="flex flex-col gap-4">
          <!-- Top Mini Transport Row -->
          <div class="flex flex-wrap items-center justify-between gap-3 bg-[#14161E]/70 border border-white/8 rounded-xl p-3">
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C10] border border-white/10 rounded-lg text-xs text-[#758094] w-[240px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <span class="text-[11px]">Search vocal scales, songs...</span>
                <span class="ml-auto text-[9px] font-mono px-1 py-0.5 rounded bg-white/5 border border-white/10 text-[#D1D6E0]">⌘K</span>
              </div>
              <div class="hidden md:flex items-center gap-2 text-xs font-medium text-[#D1D6E0]">
                <span class="w-2 h-2 rounded-full bg-[#00F5A0]"></span>
                <span class="text-[11px]">Shure SM7B (48kHz YIN Engine)</span>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 bg-[#141A21] border border-[#2E3847] px-3 py-1 rounded-lg">
                <div class="w-6 h-6 rounded-full bg-[#072A1E] border border-[#00F5A0]/60 flex items-center justify-center text-[10px] font-bold text-[#00F5A0]">
                  ER
                </div>
                <div class="flex flex-col text-left">
                  <span class="text-[11px] font-bold text-[#FAFAFC] leading-none">Ethan Reynolds</span>
                  <span class="text-[8px] font-bold text-[#00F5A0] font-mono tracking-wider">PRO SINGER</span>
                </div>
              </div>
              <router-link to="/studio">
                <button
                  type="button"
                  class="h-8 px-3 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] flex items-center gap-1.5 cursor-pointer shadow-sm hover:opacity-95"
                >
                  <span>New Session</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </button>
              </router-link>
            </div>
          </div>

          <!-- Top Bento Preview (Card 1: Live Pitch Studio + Card 2: Vocal Registers) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <!-- Pitch Tracker Canvas Card -->
            <div
              class="lg:col-span-8 rounded-[20px] p-5 sm:p-6 flex flex-col justify-between border border-white/10"
              style="background: linear-gradient(135deg, rgba(0, 245, 161, 0.16) 0%, rgba(8, 41, 28, 0.72) 20%, rgba(14, 16, 21, 0.85) 46%, rgba(9, 10, 13, 0.94) 71%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
            >
              <div class="flex items-center justify-between gap-2 mb-3">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#00F5A0] animate-ping"></span>
                  <span class="text-[11px] font-bold text-[#A3A8B8] font-mono tracking-wider">LIVE PITCH &amp; FORMANT TRACKER</span>
                  <span class="text-[11px] font-medium text-[#00F5A0]">• YIN DSP Active</span>
                </div>
                <div class="flex items-center gap-1.5 bg-[#14161E] border border-white/10 px-2.5 py-1 rounded-md text-[10px] font-bold text-[#F43F5E]">
                  <span class="w-2 h-2 rounded-full bg-[#F43F5E] animate-pulse"></span>
                  <span>REC 00:42 / 05:00</span>
                </div>
              </div>

              <!-- Frequency & Target Header -->
              <div class="flex items-baseline justify-between mb-3">
                <div>
                  <div class="flex items-baseline gap-3">
                    <span class="text-3xl font-black font-mono text-[#FAFAFC] tracking-tight">G4</span>
                    <span class="text-xs font-mono font-bold text-[#00F5A0] bg-[#072A1E] border border-[#00F5A0]/40 px-2 py-0.5 rounded">+2 Cents (In-Tune)</span>
                    <span class="text-xs font-mono text-[#A3A8B8]">392.2 Hz</span>
                  </div>
                  <div class="text-[10px] text-[#808799] mt-1 font-mono">
                    Scale Target: G Major Arpeggio • Vibrato 6.2 Hz (Stable)
                  </div>
                </div>
              </div>

              <!-- Interactive Waveform SVG Simulation -->
              <div class="relative w-full h-[180px] bg-[#06090C]/95 border border-white/8 rounded-xl overflow-hidden p-3 flex flex-col justify-between">
                <!-- Grid Lines -->
                <div class="absolute inset-x-0 top-[20%] border-b border-white/5 flex justify-between px-3 text-[9px] text-[#758094] font-mono">
                  <span>A4 (440Hz)</span>
                </div>
                <div class="absolute inset-x-0 top-[45%] border-b border-[#00F5A0]/30 flex justify-between px-3 text-[9px] text-[#00F5A0] font-mono font-bold">
                  <span>G4 Target (392Hz)</span>
                </div>
                <div class="absolute inset-x-0 top-[70%] border-b border-white/5 flex justify-between px-3 text-[9px] text-[#758094] font-mono">
                  <span>F4 (349Hz)</span>
                </div>

                <!-- Spline Waveform SVG -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 200">
                  <path
                    d="M 20 140 Q 120 130, 200 110 T 380 90 T 540 88 T 680 91 T 780 87"
                    fill="none"
                    stroke="#00F5A0"
                    stroke-width="3"
                    stroke-linecap="round"
                    style="filter: drop-shadow(0 0 8px rgba(0, 245, 160, 0.6));"
                  />
                  <!-- Target Circle & Glow -->
                  <circle cx="680" cy="91" r="8" fill="rgba(0, 245, 160, 0.3)" />
                  <circle cx="680" cy="91" r="3.5" fill="#FAFAFC" stroke="#00F5A0" stroke-width="2" />
                </svg>

                <!-- Tooltip Overlay -->
                <div class="absolute right-[110px] top-[40px] bg-[#FAFAFC] text-[#0D121A] px-2.5 py-1 rounded-md shadow-lg border border-[#00F5A0]/80 text-left">
                  <div class="text-[9px] font-bold">09 Dec • G4 (392.2 Hz) ↗</div>
                  <div class="text-[8px] font-semibold text-[#0A9966]">In-Tune Accuracy 99.4% (+2c)</div>
                </div>

                <!-- Timeline Ruler -->
                <div class="mt-auto flex justify-between text-[9px] font-mono text-[#758094] pt-2">
                  <span>00:00</span>
                  <span>00:02</span>
                  <span>00:04</span>
                  <span>00:06</span>
                  <span>00:08</span>
                  <span>00:10</span>
                </div>
              </div>

              <div class="flex items-center justify-between text-[11px] text-[#A3A8B8] mt-3">
                <div class="flex items-center gap-3">
                  <span class="px-2 py-0.5 rounded bg-[#14161E] border border-white/10 text-[10px] font-mono font-bold text-[#FAFAFC]">120 BPM</span>
                  <span>Noise Floor: -48 dB • RMS: -14.2 dB</span>
                </div>
                <span class="text-[#00F5A0] font-mono font-bold">Jitter: 0.12% (Flawless)</span>
              </div>
            </div>

            <!-- Vocal Registers & Span Card -->
            <div
              class="lg:col-span-4 rounded-[20px] p-5 sm:p-6 flex flex-col justify-between border border-white/10"
              style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07);"
            >
              <div class="flex items-center justify-between gap-2 mb-3">
                <span class="text-[14px] font-bold text-[#FAFAFC]">Vocal Registers &amp; Span</span>
                <button type="button" class="text-[11px] font-medium text-[#D1D6E0] bg-[#14161E] border border-white/10 px-2.5 py-1 rounded-lg hover:text-white cursor-pointer">
                  Retest
                </button>
              </div>

              <!-- Main Chest Voice Highlight Box -->
              <div
                class="rounded-2xl p-4 flex flex-col justify-between mb-3 border border-[#00F5A0]/50"
                style="background: linear-gradient(135deg, rgba(0, 245, 160, 0.22) 0%, rgba(9, 51, 36, 0.95) 25%, rgba(11, 17, 23, 0.98) 71%);"
              >
                <div class="flex items-center justify-between text-[11px] font-bold text-[#00F5A0]">
                  <span>CHEST VOICE FOUNDATION</span>
                  <span>94% Power</span>
                </div>
                <div class="text-3xl font-black font-mono text-white my-1">
                  C2 — A4
                </div>
                <div class="text-[11px] text-[#D1D6E0] mb-2 font-medium">
                  Span: 2.8 Octaves (Lyric Tenor Range)
                </div>
                <div class="w-full bg-[#14161E] rounded-full h-1.5 overflow-hidden">
                  <div class="bg-[#00F5A0] h-full rounded-full" style="width: 94%;"></div>
                </div>
                <div class="flex justify-between items-center text-[10px] text-[#758094] mt-2 font-mono">
                  <span>Acoustic Formant: 730 Hz</span>
                  <span class="text-[#00F5A0] font-bold">↑ Top 8% Singer</span>
                </div>
              </div>

              <!-- Secondary Register Mini Strips -->
              <div class="flex flex-col gap-2">
                <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0D121A]/95 border border-white/8 text-[11px]">
                  <span class="font-bold text-[#FAFAFC]">MIXED VOICE (400–2k Hz)</span>
                  <span class="font-bold text-[#00F5A0] font-mono">84% Balance</span>
                </div>
                <div class="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0F141C]/95 border border-white/8 text-[11px]">
                  <span class="font-bold text-[#F59E0A]">HEAD VOICE (2k–5k Hz)</span>
                  <span class="font-bold text-[#F59E0A] font-mono">72% Formant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Features Bento Grid (#61:14345) -->
    <section id="features" class="py-20 px-6 max-w-[1140px] mx-auto text-center">
      <div class="inline-block text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase mb-2">
        INSTANT VOCAL AUDIT &amp; SCORING
      </div>
      <h2 class="text-3xl sm:text-[34px] font-bold text-[#FAFAFC] leading-[42px] max-w-[900px] mx-auto mb-3">
        Know Exactly How Good Your Singing Really Is
      </h2>
      <p class="text-sm text-[#A3A8B8] leading-[22px] max-w-[830px] mx-auto mb-12">
        Stop guessing and stop asking friends if you sounded good. VocalSense listens to your singing, grades your tone objectively, and reveals precisely where you nailed it—and where you were off-pitch.
      </p>

      <!-- Row 1 Bento Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left">
        <!-- Card 1 -->
        <div
          class="rounded-[20px] p-7 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(135deg, rgba(0, 245, 161, 0.18) 0%, rgba(8, 41, 28, 0.72) 20%, rgba(14, 16, 21, 0.85) 46%, rgba(9, 10, 13, 0.94) 71%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <h3 class="text-lg font-bold text-[#FAFAFC] mb-2">Honest Pitch Grading, Down to the Cent</h3>
            <p class="text-[13px] leading-[20px] text-[#A3A8B8] mb-6">
              Sing into your mic and get a 100% unbiased verdict immediately. Spot every hidden flat, sharp, or wavering note that normal human ears often miss.
            </p>
          </div>
          <!-- Pitch visual simulation block -->
          <div class="bg-[#0A0C10]/90 border border-white/8 rounded-xl p-4 flex flex-col gap-2">
            <div class="flex items-center justify-between text-[11px] font-mono">
              <span class="text-[#00F5A0] font-bold">Accuracy Index: 96.4%</span>
              <span class="text-[#A3A8B8]">Tolerance: ±5 Cents</span>
            </div>
            <div class="w-full bg-[#14161E] rounded-full h-2 overflow-hidden">
              <div class="bg-gradient-to-r from-[#00F5A0] to-[#10B981] h-full" style="width: 96.4%;"></div>
            </div>
            <div class="text-[10px] text-[#758094] font-mono mt-1">
              Evaluated via autocorrelation YIN DSP engine across 48,000 Hz frame.
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div
          class="rounded-[20px] p-7 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <h3 class="text-lg font-bold text-[#FAFAFC] mb-2">Formant Resonance &amp; Passaggio Classifier</h3>
            <p class="text-[13px] leading-[20px] text-[#A3A8B8] mb-6">
              Automated acoustic mapping detects acoustic impedance changes in the pharynx, tracking chest, mix, and head resonance.
            </p>
          </div>
          <!-- 3-Band Resonance Bars -->
          <div class="bg-[#0A0C10]/90 border border-white/8 rounded-xl p-4 flex flex-col gap-2.5">
            <div class="flex justify-between items-center text-[11px] font-mono">
              <span class="text-[#FAFAFC] font-semibold">Chest Resonance (100–400Hz)</span>
              <span class="text-[#00F5A0] font-bold">92% Optimal</span>
            </div>
            <div class="flex justify-between items-center text-[11px] font-mono">
              <span class="text-[#FAFAFC] font-semibold">Mixed Passaggio (400–2kHz)</span>
              <span class="text-[#06B6D4] font-bold">85% Smooth</span>
            </div>
            <div class="flex justify-between items-center text-[11px] font-mono">
              <span class="text-[#FAFAFC] font-semibold">Head / Ring (2–5kHz)</span>
              <span class="text-[#F59E0A] font-bold">78% Singer's Formant</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Row 2 Bento Cards (3 columns) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <!-- Second-by-Second Flaw Highlighter -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(143deg, rgba(0, 245, 161, 0.16) 0%, rgba(9, 46, 33, 0.78) 21%, rgba(14, 17, 22, 0.84) 59%, rgba(8, 9, 11, 0.92) 83%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <div class="w-8 h-8 rounded-lg bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[#00F5A0] mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#FAFAFC] mb-2">Second-by-Second Flaw Highlighter</h3>
            <p class="text-xs leading-relaxed text-[#A3A8B8] mb-4">
              Never wonder which part sounded bad. Color-coded flags mark every flat syllable instantly so you know exactly which word to polish.
            </p>
          </div>
          <!-- Lyric markup simulation -->
          <div class="p-3 bg-[#0A0C10] rounded-xl border border-white/8 font-mono text-center">
            <span class="text-[#00F5A0] font-bold">Cause </span>
            <span class="text-[#F59E0A] font-bold">Of </span>
            <span class="text-[#F43F5E] font-bold">You (-18c)</span>
          </div>
          <div class="flex items-center gap-2 text-[10px] font-mono text-[#00F5A0] mt-3">
            <span class="text-[#758094]">PRECISION METRIC:</span>
            <span>Word-by-Word Marking</span>
          </div>
        </div>

        <!-- 5-Pillar Vocal Scorecard -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(45deg, rgba(28, 33, 46, 0.78) 20%, rgba(8, 36, 26, 0.72) 52%, rgba(14, 17, 22, 0.84) 95%, rgba(8, 9, 11, 0.9) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <div class="w-8 h-8 rounded-lg bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[#00F5A0] mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#FAFAFC] mb-2">5-Pillar Vocal Scorecard</h3>
            <p class="text-xs leading-relaxed text-[#A3A8B8] mb-4">
              Holistic grading across 5 core disciplines: Pitch Intonation, Vibrato Stability, Timbre Richness, Breath Stamina, and Dynamics.
            </p>
          </div>
          <div class="p-3 bg-[#0A0C10] rounded-xl border border-white/8 text-center text-xs font-mono text-[#FAFAFC]">
            Pitch 96 • Vibrato 91 • Breath 88 • Timbre 94
          </div>
          <div class="flex items-center gap-2 text-[10px] font-mono text-[#00F5A0] mt-3">
            <span class="text-[#758094]">DIAGNOSTIC MATRIX:</span>
            <span>Equilateral Radar</span>
          </div>
        </div>

        <!-- Audition-Ready Vocal Certificates -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(90deg, rgba(23, 31, 41, 0.8) 0%, rgba(8, 31, 23, 0.72) 35%, rgba(14, 17, 22, 0.84) 75%, rgba(6, 9, 11, 0.9) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <div class="w-8 h-8 rounded-lg bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[#00F5A0] mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </div>
            <h3 class="text-base font-bold text-[#FAFAFC] mb-2">Audition-Ready Vocal Certificates</h3>
            <p class="text-xs leading-relaxed text-[#A3A8B8] mb-4">
              Download official PDF score reports and pure audio stems to verify your vocal capability for auditions, classes, or personal proof.
            </p>
          </div>
          <div class="flex flex-wrap gap-2 justify-center">
            <span class="px-2 py-0.5 rounded bg-[#00F5A0]/15 border border-[#00F5A0]/40 text-[#00F5A0] text-[9px] font-mono font-bold">WAV 24/96</span>
            <span class="px-2 py-0.5 rounded bg-[#06B6D4]/15 border border-[#06B6D4]/40 text-[#06B6D4] text-[9px] font-mono font-bold">MIDI STEMS</span>
            <span class="px-2 py-0.5 rounded bg-[#F59E0A]/15 border border-[#F59E0A]/40 text-[#F59E0A] text-[9px] font-mono font-bold">BIOMETRIC PDF</span>
          </div>
          <div class="flex items-center gap-2 text-[10px] font-mono text-[#00F5A0] mt-3">
            <span class="text-[#758094]">OUTPUT STEMS:</span>
            <span>Lossless PDF &amp; Audio</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. 3-Step Journey (#61:14496) -->
    <section class="py-16 px-6 max-w-[1140px] mx-auto text-center">
      <div class="inline-block text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase mb-2">
        FRICTIONLESS WEB WORKFLOW
      </div>
      <h2 class="text-2xl sm:text-[28px] font-bold text-[#FAFAFC] leading-[36px] max-w-[800px] mx-auto mb-10">
        From First Note to Full Diagnostics in 3 Steps
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <!-- Step 1 -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(135deg, rgba(0, 245, 161, 0.18) 0%, rgba(8, 41, 28, 0.72) 20%, rgba(14, 16, 21, 0.85) 46%, rgba(9, 10, 13, 0.94) 71%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-mono font-bold text-[#00F5A0]">STEP 01</span>
            <span class="w-2 h-2 rounded-full bg-[#00F5A0]"></span>
          </div>
          <h3 class="text-base font-bold text-[#FAFAFC] mb-2">Connect &amp; Calibrate</h3>
          <p class="text-xs leading-[18px] text-[#A3A8B8] mb-4">
            Plug in your microphone. WebAudio automatically calibrates input gain and room noise floor with zero driver install.
          </p>
          <div class="px-3 py-2 bg-[#050608]/95 border border-white/8 rounded-md text-[11px] font-mono text-[#D1D6E0]">
            ✓ Mic Ready • Noise Floor: -52 dB
          </div>
        </div>

        <!-- Step 2 -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-mono font-bold text-[#00F5A0]">STEP 02</span>
            <span class="w-2 h-2 rounded-full bg-[#00F5A0]"></span>
          </div>
          <h3 class="text-base font-bold text-[#FAFAFC] mb-2">Sing Your Exercise</h3>
          <p class="text-xs leading-[18px] text-[#A3A8B8] mb-4">
            Sing any scale, phrase, or vocal warm-up. Watch your pitch curve trace in sub-cent precision with harmonic analysis.
          </p>
          <div class="px-3 py-2 bg-[#050608]/95 border border-white/8 rounded-md text-[11px] font-mono text-[#D1D6E0]">
            ♪ Real-time F0 Tracking @ 0 ms latency
          </div>
        </div>

        <!-- Step 3 -->
        <div
          class="rounded-[20px] p-6 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(143deg, rgba(0, 245, 161, 0.16) 0%, rgba(9, 46, 33, 0.78) 21%, rgba(14, 17, 22, 0.84) 59%, rgba(8, 9, 11, 0.92) 83%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs font-mono font-bold text-[#00F5A0]">STEP 03</span>
            <span class="w-2 h-2 rounded-full bg-[#00F5A0]"></span>
          </div>
          <h3 class="text-base font-bold text-[#FAFAFC] mb-2">Receive AI Diagnostics</h3>
          <p class="text-xs leading-[18px] text-[#A3A8B8] mb-4">
            Review formant acoustic scores, passaggio break points, and receive targeted drill recommendations from Gemini AI.
          </p>
          <div class="px-3 py-2 bg-[#050608]/95 border border-white/8 rounded-md text-[11px] font-mono text-[#D1D6E0]">
            ★ Overall Score: 94 / 100 (Virtuoso)
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Transparent Pricing (#61:14531) -->
    <section id="pricing" class="py-20 px-6 max-w-[1140px] mx-auto text-center">
      <div class="inline-block text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase mb-2">
        TRANSPARENT PRICING
      </div>
      <h2 class="text-3xl font-bold text-[#FAFAFC] leading-[40px] max-w-[800px] mx-auto mb-3">
        Simple Pricing for Every Vocalist
      </h2>
      <p class="text-sm text-[#A3A8B8] max-w-[650px] mx-auto mb-12">
        From everyday vocal warm-ups to professional studio calibration. Upgrade anytime via Midtrans.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-stretch">
        <!-- Tier Free -->
        <div
          class="rounded-[20px] p-7 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <h3 class="text-lg font-bold text-[#FAFAFC] mb-1">Free Explorer</h3>
            <p class="text-xs text-[#A3A8B8] mb-6">Essential pitch feedback for everyday vocal warm-ups.</p>
            <div class="text-3xl font-black font-mono text-white mb-6">
              Rp 0 <span class="text-xs font-normal text-[#A3A8B8]">/ month</span>
            </div>
            <ul class="space-y-3 text-xs text-[#D1D6E0] border-t border-white/8 pt-5 mb-8">
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Real-time Pitch Autocorrelation (YIN)</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> 10-Second Rolling Piano Roll</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Vocal Range Tessitura Finder</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Micro-Tuning Cent Accuracy</li>
            </ul>
          </div>
          <router-link to="/studio">
            <button
              type="button"
              class="w-full h-10 rounded-lg text-xs font-medium text-[#D1D6E0] bg-[#14161E]/95 hover:bg-[#1A212E] border border-white/12 transition-all cursor-pointer"
            >
              Start Free Session
            </button>
          </router-link>
        </div>

        <!-- Tier Pro (Highlighted Midtrans) -->
        <div
          class="rounded-[20px] p-7 border-2 border-[#00F5A0]/65 flex flex-col justify-between relative shadow-[0_0_30px_rgba(0,245,160,0.2)]"
          style="background: linear-gradient(135deg, rgba(0, 245, 161, 0.18) 0%, rgba(8, 41, 28, 0.72) 20%, rgba(14, 16, 21, 0.85) 46%, rgba(9, 10, 13, 0.94) 71%);"
        >
          <div class="absolute -top-3 left-7 px-3 py-0.5 rounded-full bg-[#072A1E] border border-[#00F5A0]/80 text-[#00F5A0] text-[9px] font-bold font-mono tracking-wider">
            MOST POPULAR
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#FAFAFC] mb-1">VocalSense Pro</h3>
            <p class="text-xs text-[#A3A8B8] mb-6">Complete bio-acoustic studio for serious singers &amp; artists.</p>
            <div class="text-3xl font-black font-mono text-white mb-6">
              Rp 49.000 <span class="text-xs font-normal text-[#A3A8B8]">/ month</span>
            </div>
            <ul class="space-y-3 text-xs text-[#FAFAFC] border-t border-white/10 pt-5 mb-8">
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Unlimited High-Res Audio Recording</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Gemini AI Vocal Coach Evaluation</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Audio Scrubbing to Flaw Milisecond</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> 3-Band Resonance &amp; Formant Analysis</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Lossless WAV &amp; Official Biometric PDF</li>
            </ul>
          </div>
          <button
            type="button"
            class="w-full h-10 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] hover:opacity-95 shadow-[0_4px_16px_rgba(0,245,160,0.35)] flex items-center justify-center gap-2 cursor-pointer"
            @click="selectTier('pro')"
          >
            <span>Upgrade to Pro via Midtrans</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>

        <!-- Conservatory Studio -->
        <div
          class="rounded-[20px] p-7 border border-white/10 flex flex-col justify-between"
          style="background: linear-gradient(180deg, rgba(26, 33, 46, 0.78) 0%, rgba(9, 36, 26, 0.74) 24%, rgba(14, 17, 22, 0.84) 68%, rgba(8, 9, 12, 0.92) 100%); box-shadow: 0 16px 36px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07);"
        >
          <div>
            <h3 class="text-lg font-bold text-[#FAFAFC] mb-1">Conservatory Studio</h3>
            <p class="text-xs text-[#A3A8B8] mb-6">Designed for vocal teachers, academies, and choirs.</p>
            <div class="text-3xl font-black font-mono text-white mb-6">
              Rp 149.000 <span class="text-xs font-normal text-[#A3A8B8]">/ month</span>
            </div>
            <ul class="space-y-3 text-xs text-[#D1D6E0] border-t border-white/8 pt-5 mb-8">
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Multi-Student Acoustic Profiles (up to 20)</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Batch PDF Certificate Generation</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Custom Vocal Curriculum Upload</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Raw MIDI &amp; Formant Stem Telemetry Export</li>
              <li class="flex items-center gap-2.5"><span class="text-[#00F5A0] font-bold">✓</span> Dedicated Studio Support</li>
            </ul>
          </div>
          <button
            type="button"
            class="w-full h-10 rounded-lg text-xs font-medium text-[#D1D6E0] bg-[#14161E]/95 hover:bg-[#1A212E] border border-white/12 transition-all cursor-pointer"
            @click="selectTier('premium')"
          >
            Contact Studio Sales
          </button>
        </div>
      </div>
    </section>

    <!-- 7. FAQ Accordion (#61:14626) -->
    <section class="py-16 px-6 max-w-[900px] mx-auto text-center">
      <div class="inline-block text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase mb-2">
        CLEAR ANSWERS
      </div>
      <h2 class="text-2xl sm:text-[28px] font-bold text-[#FAFAFC] leading-[36px] mb-8">
        Frequently Asked Questions
      </h2>

      <div class="flex flex-col gap-3 text-left">
        <!-- FAQ 1 (Open by default) -->
        <div class="rounded-xl p-4 bg-[#14161E]/85 border border-white/8">
          <button
            type="button"
            class="w-full flex items-center justify-between text-left text-sm font-bold text-[#FAFAFC] cursor-pointer"
            @click="toggleFaq(0)"
          >
            <span>Do I need an expensive studio microphone to get accurate pitch ratings?</span>
            <span class="text-[#00F5A0] font-mono text-base">{{ openFaq === 0 ? '−' : '+' }}</span>
          </button>
          <p v-show="openFaq === 0" class="text-xs leading-relaxed text-[#A3A8B8] mt-2.5 pt-2.5 border-t border-white/5">
            No! VocalSense AI includes automatic ambient noise subtraction and mic gain calibration, allowing high accuracy even on standard phone or laptop microphones.
          </p>
        </div>

        <!-- FAQ 2 -->
        <div class="rounded-xl p-4 bg-[#14161E]/85 border border-white/8">
          <button
            type="button"
            class="w-full flex items-center justify-between text-left text-sm font-bold text-[#FAFAFC] cursor-pointer"
            @click="toggleFaq(1)"
          >
            <span>How does the YIN pitch algorithm detect micro-cents in real-time?</span>
            <span class="text-[#00F5A0] font-mono text-base">{{ openFaq === 1 ? '−' : '+' }}</span>
          </button>
          <p v-show="openFaq === 1" class="text-xs leading-relaxed text-[#A3A8B8] mt-2.5 pt-2.5 border-t border-white/5">
            YIN performs difference-function autocorrelation over time-domain frames, tracking the fundamental frequency (F0) with sub-cent precision and zero noticeable delay in modern browsers.
          </p>
        </div>

        <!-- FAQ 3 -->
        <div class="rounded-xl p-4 bg-[#14161E]/85 border border-white/8">
          <button
            type="button"
            class="w-full flex items-center justify-between text-left text-sm font-bold text-[#FAFAFC] cursor-pointer"
            @click="toggleFaq(2)"
          >
            <span>Is my vocal audio uploaded to cloud servers or kept private?</span>
            <span class="text-[#00F5A0] font-mono text-base">{{ openFaq === 2 ? '−' : '+' }}</span>
          </button>
          <p v-show="openFaq === 2" class="text-xs leading-relaxed text-[#A3A8B8] mt-2.5 pt-2.5 border-t border-white/5">
            Real-time DSP pitch detection runs 100% locally on your machine via Web Audio API. Only anonymized acoustic telemetry is sent when requesting AI coaching feedback.
          </p>
        </div>

        <!-- FAQ 4 -->
        <div class="rounded-xl p-4 bg-[#14161E]/85 border border-white/8">
          <button
            type="button"
            class="w-full flex items-center justify-between text-left text-sm font-bold text-[#FAFAFC] cursor-pointer"
            @click="toggleFaq(3)"
          >
            <span>Can I practice scales offline without an active internet connection?</span>
            <span class="text-[#00F5A0] font-mono text-base">{{ openFaq === 3 ? '−' : '+' }}</span>
          </button>
          <p v-show="openFaq === 3" class="text-xs leading-relaxed text-[#A3A8B8] mt-2.5 pt-2.5 border-t border-white/5">
            Yes! Once loaded, the Chromatic Tuner and Range Finder run entirely in-browser without network requirements.
          </p>
        </div>
      </div>
    </section>

    <!-- 8. Final CTA Banner (#61:14652) -->
    <section class="py-16 px-6 max-w-[1140px] mx-auto">
      <div
        class="rounded-[24px] p-8 sm:p-14 text-center flex flex-col items-center justify-center gap-4 border border-[#00F5A0]/45 shadow-[0_16px_48px_-8px_rgba(0,245,161,0.2)]"
        style="background: linear-gradient(135deg, rgba(0, 245, 161, 0.18) 0%, rgba(8, 41, 28, 0.72) 20%, rgba(14, 16, 21, 0.85) 46%, rgba(9, 10, 13, 0.94) 71%);"
      >
        <span class="text-[11px] font-bold font-mono tracking-[0.14em] text-[#00F5A0] uppercase">
          ELEVATE YOUR SINGING TODAY
        </span>
        <h2 class="text-2xl sm:text-4xl font-extrabold text-[#FAFAFC] tracking-tight max-w-[700px]">
          Ready to Train with Studio Precision?
        </h2>
        <p class="text-sm text-[#A3A8B8] max-w-[550px] leading-relaxed">
          Open VocalSense AI in your browser right now. No software installation, no credit card required to start.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 mt-4">
          <router-link to="/studio">
            <button
              type="button"
              class="h-[44px] px-6 rounded-lg text-xs font-bold text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] hover:opacity-95 shadow-[0_4px_16px_rgba(0,245,160,0.35)] border border-[#00F5A0]/90 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Launch Studio Free</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </router-link>
          <router-link to="/range-finder">
            <button
              type="button"
              class="h-[44px] px-6 rounded-lg text-xs font-medium text-[#D1D6E0] bg-[#14161E]/95 hover:bg-[#1A212E] border border-white/12 transition-all cursor-pointer"
            >
              Test Vocal Range
            </button>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const openFaq = ref(0);

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? -1 : index;
}

function selectTier(tier) {
  const user = JSON.parse(localStorage.getItem('vs_user') || 'null');
  if (user) {
    user.tier = tier;
    localStorage.setItem('vs_user', JSON.stringify(user));
    alert(`Paket akun berhasil diperbarui ke ${tier.toUpperCase()}`);
    router.push('/studio');
  } else {
    router.push({ path: '/register', query: { tier } });
  }
}
</script>