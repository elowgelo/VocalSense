<template>
  <div class="max-w-4xl mx-auto px-6 py-10 studio-grid-bg">
    <div class="text-center max-w-xl mx-auto mb-10">
      <div class="flex items-center justify-center gap-2 mb-2">
        <Badge variant="green" class="font-mono text-[10px]">CHROMATIC TUNER</Badge>
        <span class="text-xs font-mono text-zinc-500">PRECISION CENTS METER</span>
      </div>
      <h1 class="text-3xl font-black text-zinc-100 tracking-tight">Chromatic Tuner Digital</h1>
      <p class="text-xs text-zinc-400 mt-2">
        Deteksi nada vokal real-time dengan jarum meter deviasi cents dan kalibrasi ambang batas kebisingan lingkungan (Noise Gate).
      </p>
    </div>

    <!-- Error Banner jika izin mic ditolak -->
    <div v-if="micError" class="max-w-md mx-auto mb-6 p-4 rounded-lg border border-rose-500/40 bg-rose-950/40 text-xs text-rose-200">
      <div class="font-bold text-rose-300 mb-1">Akses Mikrofon Ditolak</div>
      <p class="text-zinc-300 leading-relaxed">
        Aktifkan izin mikrofon pada setelan peramban web untuk menggunakan tuner kromatik ini.
      </p>
    </div>

    <!-- Start Banner if not running -->
    <div v-if="!isRunning" class="max-w-md mx-auto">
      <Card class="text-center py-10 px-8 flex flex-col items-center border-white/8 bg-[#121215]">
        <div class="w-14 h-14 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="22"/>
          </svg>
        </div>
        <h3 class="text-base font-bold text-zinc-100 mb-2">Siap Menyetem Vokal</h3>
        <p class="text-xs text-zinc-400 mb-6 max-w-xs leading-relaxed">
          Pastikan mikrofon Anda terhubung. Tuner beroperasi secara lokal di peramban tanpa kirim audio ke server.
        </p>
        <Button variant="default" size="lg" class="w-full" @click="startTuner">
          Aktifkan Mikrofon & Mulai
        </Button>
      </Card>
    </div>

    <!-- Tuner Active Display -->
    <div v-else class="max-w-md mx-auto flex flex-col items-center gap-6">
      <Card class="w-full p-6 bg-[#121215] border-white/8 flex flex-col items-center">
        <!-- Arc & Note Display -->
        <div class="relative w-80 h-44 flex items-center justify-center">
          <svg viewBox="0 0 320 180" class="w-full h-full">
            <path class="fill-none stroke-zinc-900" stroke-width="20" stroke-linecap="round" d="M 40 160 A 120 120 0 0 1 280 160" />
            <path
              class="fill-none transition-all duration-100"
              stroke-width="20"
              stroke-linecap="round"
              d="M 40 160 A 120 120 0 0 1 280 160"
              :style="{
                stroke: arcColor,
                strokeDasharray: ARC_LEN,
                strokeDashoffset: arcOffset
              }"
            />
            <line x1="160" y1="28" x2="160" y2="52" class="stroke-white/40" stroke-width="2" />
          </svg>

          <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-baseline">
            <span class="text-6xl font-black font-mono text-zinc-100 tracking-tight">{{ displayNote }}</span>
            <sup class="text-2xl font-mono text-zinc-400 ml-1">{{ displayOctave }}</sup>
          </div>
        </div>

        <div class="text-center mt-3">
          <div class="text-sm font-mono text-zinc-300 font-semibold">{{ displayFreq }}</div>
          <div class="text-base font-mono font-bold mt-0.5" :style="{ color: centsColor }">
            {{ displayCents }}
          </div>
          <div class="text-xs font-mono text-zinc-400 mt-1">{{ statusText }}</div>
        </div>

        <!-- Needle Meter -->
        <div class="w-full mt-6">
          <div class="relative h-3 w-full rounded-full bg-[#0a0a0c] border border-white/10 overflow-hidden flex">
            <div class="h-full w-2/5 bg-amber-500/20 border-r border-amber-500/30"></div>
            <div class="h-full w-1/5 bg-emerald-500/20"></div>
            <div class="h-full w-2/5 bg-rose-500/20 border-l border-rose-500/30"></div>
            <div class="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/40"></div>
            <div
              class="absolute top-0 bottom-0 w-2 rounded-full -translate-x-1/2 transition-all duration-100 shadow-md"
              :style="{ left: needleLeft, background: needleColor }"
            ></div>
          </div>
          <div class="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-1.5">
            <span>-50 sen (Flat)</span>
            <span class="text-emerald-400 font-bold">In-Tune (±10c)</span>
            <span>+50 sen (Sharp)</span>
          </div>
        </div>

        <!-- Live History Canvas -->
        <div class="w-full mt-6">
          <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">HISTORI NADA WAKTU NYATA</div>
          <div class="w-full h-20 rounded overflow-hidden bg-[#0a0a0c] border border-white/6">
            <canvas ref="historyCanvasRef" class="w-full h-full block"></canvas>
          </div>
        </div>

        <!-- Controls & Calibrations -->
        <div class="w-full mt-6 pt-5 border-t border-white/8 space-y-4 font-mono text-xs">
          <div class="flex items-center justify-between gap-4">
            <label class="text-zinc-300 font-medium">Acuan A4:</label>
            <input
              type="range"
              min="430"
              max="450"
              step="1"
              v-model.number="refFreq"
              class="flex-1 accent-emerald-500 cursor-pointer"
            />
            <span class="text-emerald-400 font-bold min-w-[50px] text-right">{{ refFreq }} Hz</span>
          </div>

          <div class="flex items-center justify-between gap-4">
            <label class="text-zinc-300 font-medium">Noise Gate:</label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              v-model.number="noiseGateVal"
              class="flex-1 accent-emerald-500 cursor-pointer"
            />
            <span class="text-zinc-400 min-w-[50px] text-right">{{ noiseGateVal }}</span>
          </div>

          <Button variant="outline" size="sm" class="w-full mt-2" @click="stopTuner">
            Hentikan Tuner
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Card from '../components/ui/Card.vue';
import { detectPitch } from '../utils/pitch.js';

const isRunning = ref(false);
const micError = ref(false);
const refFreq = ref(440);
const noiseGateVal = ref(6);

const currentPitch = ref(-1);
const currentCents = ref(0);
const currentNote = ref('-');
const currentOctave = ref('');
const statusText = ref('Menunggu suara...');
const statusClass = ref('text-muted');

const ARC_LEN = 408;
const historyBuf = ref(new Array(100).fill(0));
const historyCanvasRef = ref(null);

let audioCtx = null;
let analyser = null;
let source = null;
let stream = null;
let animFrame = null;
const buf = new Float32Array(2048);

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const displayNote = computed(() => currentNote.value);
const displayOctave = computed(() => currentOctave.value);
const displayFreq = computed(() => (currentPitch.value > 0 ? `${currentPitch.value.toFixed(1)} Hz` : '- Hz'));
const displayCents = computed(() => {
  if (currentPitch.value <= 0) return '± 0 sen';
  const prefix = currentCents.value > 0 ? '+' : '';
  return `${prefix}${currentCents.value} sen`;
});

const needleLeft = computed(() => {
  if (currentPitch.value <= 0) return '50%';
  const clamped = Math.max(-50, Math.min(50, currentCents.value));
  const percent = 50 + (clamped / 50) * 44;
  return `${percent}%`;
});

const needleColor = computed(() => {
  if (currentPitch.value <= 0) return 'var(--text3)';
  const abs = Math.abs(currentCents.value);
  if (abs <= 10) return 'var(--green)';
  if (currentCents.value < -10) return 'var(--red)';
  return 'var(--yellow)';
});

const centsColor = computed(() => needleColor.value);

const arcColor = computed(() => needleColor.value);

const arcOffset = computed(() => {
  if (currentPitch.value <= 0) return ARC_LEN;
  const clamped = Math.max(-50, Math.min(50, currentCents.value));
  const frac = (clamped + 50) / 100;
  return ARC_LEN * (1 - frac * 0.7);
});

async function startTuner() {
  micError.value = false;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
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
  requestAnimationFrame(tick);
}

function stopTuner() {
  isRunning.value = false;
  if (animFrame) cancelAnimationFrame(animFrame);
  if (stream) stream.getTracks().forEach(t => t.stop());
  if (audioCtx) audioCtx.close();
  currentPitch.value = -1;
  currentNote.value = '-';
  currentOctave.value = '';
}

function tick() {
  if (!isRunning.value) return;
  animFrame = requestAnimationFrame(tick);

  analyser.getFloatTimeDomainData(buf);

  // Periksa rms ambang batas kebisingan
  let sum = 0;
  for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
  const rms = Math.sqrt(sum / buf.length);
  const threshold = noiseGateVal.value / 1000;

  let pitch = -1;
  if (rms >= threshold) {
    pitch = detectPitch(buf, audioCtx.sampleRate);
  }

  currentPitch.value = pitch;
  historyBuf.value.shift();
  historyBuf.value.push(pitch > 0 ? pitch : 0);
  drawHistory();

  if (pitch <= 0) {
    currentNote.value = '—';
    currentOctave.value = '';
    currentCents.value = 0;
    statusText.value = 'Menunggu vokal...';
    statusClass.value = 'text-muted';
    return;
  }

  // Hitung deviasi terhadap refFreq
  const midi = 12 * Math.log2(pitch / refFreq.value) + 69;
  const midiR = Math.round(midi);
  const cents = Math.round((midi - midiR) * 100);
  const oct = Math.floor(midiR / 12) - 1;
  const noteName = NOTE_NAMES[((midiR % 12) + 12) % 12];

  currentNote.value = noteName;
  currentOctave.value = oct;
  currentCents.value = cents;

  const abs = Math.abs(cents);
  if (abs <= 10) {
    statusText.value = 'Tepat Nada (In-Tune) ✓';
    statusClass.value = 'text-green';
  } else if (cents < -10) {
    statusText.value = `Fals Rendah (Flat) ${cents} sen`;
    statusClass.value = 'text-red';
  } else {
    statusText.value = `Fals Tinggi (Sharp) +${cents} sen`;
    statusClass.value = 'text-yellow';
  }
}

function drawHistory() {
  const canvas = historyCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 80;

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  ctx.strokeStyle = '#7c3aed';
  ctx.lineWidth = 2;
  ctx.beginPath();

  const data = historyBuf.value;
  const step = w / (data.length - 1);
  let first = true;

  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    if (p <= 0) continue;
    // Map 65Hz - 880Hz log ke height
    const norm = Math.max(0, Math.min(1, Math.log2(p / 65) / Math.log2(880 / 65)));
    const y = h - norm * (h - 10) - 5;
    const x = i * step;

    if (first) {
      ctx.moveTo(x, y);
      first = false;
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

onUnmounted(() => {
  stopTuner();
});
</script>