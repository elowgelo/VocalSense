<template>
  <footer class="border-t border-white/6 bg-[#050608]/98 py-10 mt-auto">
    <div class="max-w-[1140px] mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between gap-10 pb-8 border-b border-white/6">
        <!-- Brand & Description -->
        <div class="flex flex-col gap-2.5 max-w-[320px]">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[#00F5A0]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            </div>
            <span class="font-extrabold text-sm text-[#FAFAFC] tracking-tight">VocalSense AI</span>
          </div>
          <p class="text-[11px] leading-relaxed text-[#A3A8B8]">
            Precision bio-acoustic vocal training and real-time pitch diagnostic engine powered by Gemini AI.
          </p>
          <div class="text-[10px] text-[#758094] mt-1 font-mono">
            © 2026 VocalSense AI Technologies Inc. All rights reserved.
          </div>
        </div>

        <!-- Product Column -->
        <div class="flex flex-col gap-2 min-w-[160px]">
          <div class="text-[11px] font-bold text-[#FAFAFC] tracking-wider uppercase mb-1">PRODUCT</div>
          <router-link to="/studio" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Live Studio Tuner</router-link>
          <router-link to="/studio" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Interactive Piano Roll</router-link>
          <router-link to="/studio" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Gemini AI Vocal Coach</router-link>
          <router-link to="/tuner" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Solfeggio Trainer</router-link>
          <router-link to="/range-finder" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Vocal Range Finder</router-link>
        </div>

        <!-- Resources Column -->
        <div class="flex flex-col gap-2 min-w-[160px]">
          <div class="text-[11px] font-bold text-[#FAFAFC] tracking-wider uppercase mb-1">RESOURCES</div>
          <a href="#features" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Acoustic DSP Research</a>
          <a href="#features" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">YIN Pitch Algorithm</a>
          <a href="#features" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Formant Analysis Guide</a>
          <router-link to="/studio" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Warm-Up Drill Library</router-link>
          <router-link to="/analytics" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Developer API</router-link>
        </div>

        <!-- Legal Column -->
        <div class="flex flex-col gap-2 min-w-[160px]">
          <div class="text-[11px] font-bold text-[#FAFAFC] tracking-wider uppercase mb-1">LEGAL & TRUST</div>
          <a href="#" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Privacy Policy</a>
          <a href="#" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Audio Data Protection</a>
          <a href="#" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Terms of Service</a>
          <a href="#" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Midtrans Security Audit</a>
          <a href="#" class="text-[11px] text-[#A3A8B8] hover:text-[#00F5A0] transition-colors">Contact Support</a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6 text-[10px] text-[#758094]">
        <div>Built with WebAudio DSP & Gemini Multimodal Pedagogy</div>
        <div class="text-[#A3A8B8] font-medium flex items-center gap-2">
          <span>Twitter / X</span>
          <span>•</span>
          <span>GitHub</span>
          <span>•</span>
          <span>Discord</span>
          <span>•</span>
          <span>YouTube</span>
        </div>
      </div>
    </div>
  </footer>
</template>