<template>
  <div class="max-w-4xl mx-auto px-6 py-10 studio-grid-bg">
    <div class="text-center max-w-xl mx-auto mb-10">
      <div class="flex items-center justify-center gap-2 mb-2">
        <Badge variant="cyan" class="font-mono text-[10px]">TESSITURA FINDER</Badge>
        <span class="text-xs font-mono text-zinc-500">VOICE CLASSIFIER</span>
      </div>
      <h1 class="text-3xl font-black text-zinc-100 tracking-tight">Vocal Range Finder</h1>
      <p class="text-xs text-zinc-400 mt-2">
        Uji nada terendah dan tertinggi yang dapat Anda suarakan secara stabil untuk mengetahui tipe vokal alami Anda (Bass, Bariton, Tenor, Alto, Sopran).
      </p>
    </div>

    <!-- Error Banner jika izin mic ditolak -->
    <div v-if="micError" class="max-w-md mx-auto mb-6 p-4 rounded-lg border border-rose-500/40 bg-rose-950/40 text-xs text-rose-200">
      <div class="font-bold text-rose-300 mb-1">Akses Mikrofon Ditolak</div>
      <p class="text-zinc-300 leading-relaxed">
        Aktifkan izin mikrofon pada setelan peramban web untuk melakukan pengujian rentang vokal.
      </p>
    </div>

    <!-- Start Section -->
    <div v-if="!isRunning && !result" class="max-w-md mx-auto">
      <Card class="text-center py-10 px-8 flex flex-col items-center border-white/8 bg-[#121215]">
        <div class="w-14 h-14 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-lg shadow-cyan-500/10">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <h3 class="text-base font-bold text-zinc-100 mb-2">Tes Rentang Vokal Interaktif</h3>
        <p class="text-xs text-zinc-400 mb-6 max-w-xs leading-relaxed">
          Anda akan bernyanyi satu nada rendah stabil, lalu satu nada tinggi. AI akan mengklasifikasikan jangkauan oktaf Anda.
        </p>
        <Button variant="default" size="lg" class="w-full" @click="startFinder">
          Mulai Pengujian Vokal
        </Button>
      </Card>
    </div>

    <!-- Live Test Section -->
    <div v-else-if="isRunning" class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Live Note Box -->
      <Card class="text-center py-6 bg-[#121215] border-white/8">
        <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">NADA TERDETEKSI SEKARANG</div>
        <div class="text-6xl font-black font-mono text-emerald-400 tracking-tight my-2">{{ liveNoteStr }}</div>
        <div class="text-xs font-mono text-zinc-400">{{ liveFreqStr }}</div>
      </Card>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Step 1: Nada Terendah -->
        <Card
          class="flex flex-col justify-between transition-all"
          :class="capturedLow ? 'border-cyan-500/40 bg-[#0e161c]' : 'border-white/8 bg-[#121215]'"
        >
          <div>
            <div class="text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">LANGKAH 01</div>
            <h4 class="text-sm font-bold text-zinc-100 mb-1">Nada Terendah (Lowest)</h4>
            <p class="text-xs text-zinc-400 mb-4 leading-relaxed">Bunyikan nada paling rendah yang nyaman Anda tahan stabil.</p>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              class="w-full mb-3"
              :disabled="currentPitch <= 0"
              @click="captureNote('low')"
            >
              Kunci Nada Rendah
            </Button>
            <div v-if="capturedLow">
              <Badge variant="cyan" class="w-full justify-center font-mono">
                Terkunci: {{ capturedLow.note }}{{ capturedLow.octave }} ({{ capturedLow.freq.toFixed(1) }} Hz)
              </Badge>
            </div>
          </div>
        </Card>

        <!-- Step 2: Nada Tertinggi -->
        <Card
          class="flex flex-col justify-between transition-all"
          :class="capturedHigh ? 'border-emerald-500/40 bg-[#0e1c15]' : 'border-white/8 bg-[#121215]'"
        >
          <div>
            <div class="text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">LANGKAH 02</div>
            <h4 class="text-sm font-bold text-zinc-100 mb-1">Nada Tertinggi (Highest)</h4>
            <p class="text-xs text-zinc-400 mb-4 leading-relaxed">Bunyikan nada paling tinggi yang nyaman Anda capai tanpa memaksakan leher.</p>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              class="w-full mb-3"
              :disabled="currentPitch <= 0"
              @click="captureNote('high')"
            >
              Kunci Nada Tinggi
            </Button>
            <div v-if="capturedHigh">
              <Badge variant="green" class="w-full justify-center font-mono">
                Terkunci: {{ capturedHigh.note }}{{ capturedHigh.octave }} ({{ capturedHigh.freq.toFixed(1) }} Hz)
              </Badge>
            </div>
          </div>
        </Card>
      </div>

      <div class="flex items-center justify-center gap-3">
        <Button
          variant="default"
          size="default"
          :disabled="!capturedLow || !capturedHigh"
          @click="analyzeRange"
        >
          Lihat Klasifikasi Tipe Vokal
        </Button>
        <Button variant="ghost" size="sm" @click="stopFinder">Batal</Button>
      </div>
    </div>

    <!-- Results Display -->
    <div v-else-if="result" class="max-w-xl mx-auto">
      <Card class="text-center p-8 bg-[#121215] border-white/8 flex flex-col items-center">
        <Badge variant="green" class="mb-3 font-mono">HASIL JANGKAUAN VOKAL</Badge>
        <h2 class="text-4xl font-black text-emerald-400 tracking-tight mb-1">{{ result.voiceType }}</h2>
        <p class="text-xs text-zinc-400 mb-6">Rentang Vokal Alami Terdeteksi</p>

        <div class="w-full grid grid-cols-3 items-center rounded border border-white/8 bg-[#0a0a0c] p-4 mb-6">
          <div>
            <div class="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Nada Terendah</div>
            <div class="font-mono font-black text-xl text-cyan-400 mt-1">{{ result.low.note }}{{ result.low.octave }}</div>
            <div class="text-[11px] text-zinc-400 font-mono">{{ result.low.freq.toFixed(1) }} Hz</div>
          </div>
          <div class="border-x border-white/8 px-2">
            <div class="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">RENTANG</div>
            <div class="font-mono text-emerald-400 font-black text-xl mt-1">{{ result.octaves }} Oktaf</div>
          </div>
          <div>
            <div class="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Nada Tertinggi</div>
            <div class="font-mono font-black text-xl text-amber-400 mt-1">{{ result.high.note }}{{ result.high.octave }}</div>
            <div class="text-[11px] text-zinc-400 font-mono">{{ result.high.freq.toFixed(1) }} Hz</div>
          </div>
        </div>

        <!-- Piano Key Visualizer -->
        <div class="w-full overflow-x-auto pb-2 mb-6">
          <div class="h-16 flex min-w-[500px] rounded overflow-hidden border border-white/8 bg-[#0a0a0c] p-1">
            <div
              v-for="k in pianoKeys"
              :key="k.midi"
              class="flex-1 relative flex items-end justify-center pb-1 transition-colors"
              :class="[
                k.isSharp ? 'bg-[#18181d] border-r border-[#0a0a0c] z-10 h-10' : 'bg-zinc-300 border-r border-zinc-400 h-full',
                k.midi >= result.low.midiNote && k.midi <= result.high.midiNote ? '!bg-emerald-600/80' : '',
                k.midi === result.low.midiNote || k.midi === result.high.midiNote ? '!bg-emerald-400 shadow-md' : ''
              ]"
              :title="k.name"
            >
              <span
                v-if="k.midi === result.low.midiNote"
                class="text-[9px] font-black font-mono text-slate-950 bg-emerald-400 px-1 rounded absolute bottom-1"
              >MIN</span>
              <span
                v-if="k.midi === result.high.midiNote"
                class="text-[9px] font-black font-mono text-slate-950 bg-emerald-400 px-1 rounded absolute bottom-1"
              >MAX</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <router-link to="/studio">
            <Button variant="default" size="default">Lanjut Latihan di Studio</Button>
          </router-link>
          <Button variant="outline" size="default" @click="resetFinder">Uji Ulang</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Card from '../components/ui/Card.vue';
import { detectPitch, freqToNote, classifyVoiceType, midiToName } from '../utils/pitch.js';

const isRunning = ref(false);
const micError = ref(false);
const currentPitch = ref(-1);
const capturedLow = ref(null);
const capturedHigh = ref(null);
const result = ref(null);

let audioCtx = null;
let analyser = null;
let source = null;
let stream = null;
let animFrame = null;
const buf = new Float32Array(2048);

const liveNoteStr = computed(() => {
  if (currentPitch.value <= 0) return '-';
  const info = freqToNote(currentPitch.value);
  return info ? `${info.note}${info.octave}` : '-';
});

const liveFreqStr = computed(() => {
  return currentPitch.value > 0 ? `${currentPitch.value.toFixed(1)} Hz` : '- Hz';
});

// Rentang C2 (36) sampai C6 (84)
const pianoKeys = computed(() => {
  const keys = [];
  const SHARP_MAP = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
  for (let m = 36; m <= 84; m++) {
    keys.push({
      midi: m,
      name: midiToName(m),
      isSharp: SHARP_MAP[m % 12] === 1
    });
  }
  return keys;
});

async function startFinder() {
  micError.value = false;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    micError.value = true;
    return;
  }

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyser);

  isRunning.value = true;
  capturedLow.value = null;
  capturedHigh.value = null;
  result.value = null;

  tick();
}

function stopFinder() {
  isRunning.value = false;
  if (animFrame) cancelAnimationFrame(animFrame);
  if (stream) stream.getTracks().forEach(t => t.stop());
  if (audioCtx) audioCtx.close();
}

function tick() {
  if (!isRunning.value) return;
  animFrame = requestAnimationFrame(tick);

  analyser.getFloatTimeDomainData(buf);
  currentPitch.value = detectPitch(buf, audioCtx.sampleRate);
}

function captureNote(type) {
  if (currentPitch.value <= 0) return;
  const info = freqToNote(currentPitch.value);
  if (!info) return;

  const data = { ...info, freq: currentPitch.value };
  if (type === 'low') {
    capturedLow.value = data;
  } else {
    capturedHigh.value = data;
  }
}

function analyzeRange() {
  if (!capturedLow.value || !capturedHigh.value) return;
  stopFinder();

  let low = capturedLow.value;
  let high = capturedHigh.value;
  if (low.midiNote > high.midiNote) {
    const temp = low;
    low = high;
    high = temp;
  }

  const octaves = ((high.midiNote - low.midiNote) / 12).toFixed(1);
  const voiceType = classifyVoiceType(low.midiNote, high.midiNote);

  result.value = {
    low,
    high,
    octaves,
    voiceType
  };

  // Simpan preferensi range vokal ke user
  const user = JSON.parse(localStorage.getItem('vs_user') || 'null');
  if (user) {
    user.voiceType = voiceType;
    user.vocalRange = `${low.note}${low.octave} - ${high.note}${high.octave}`;
    localStorage.setItem('vs_user', JSON.stringify(user));
  }
}

function resetFinder() {
  result.value = null;
  startFinder();
}

onUnmounted(() => {
  stopFinder();
});
</script>