<template>
  <div class="analytics-page max-w-6xl mx-auto px-6 py-10 studio-grid-bg">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6 mb-8">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <Badge variant="green" class="font-mono text-[10px]">DASBOR ANALITIK & ARSIP / FR-014 / FR-018</Badge>
          <span class="text-xs font-mono text-zinc-500">VOICE TELEMETRY ARCHIVE</span>
        </div>
        <h1 class="text-3xl font-black text-zinc-100 tracking-tight">Arsip Sesi Vokal & Riwayat Progres</h1>
        <p class="text-xs text-zinc-400 mt-1">
          Pantau evolusi akurasi nada, stabilitas vibrato, dan perluasan tessitura dari rekaman latihan vokal Anda.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <router-link to="/studio">
          <Button variant="default" size="sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor"/>
            </svg>
            <span>Mulai Sesi Baru</span>
          </Button>
        </router-link>
      </div>
    </div>

    <!-- Quick Telemetry Stats Overview -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <Card class="bg-[#121215] border-white/8 !p-4">
        <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Total Sesi Latihan</div>
        <div class="text-3xl font-black font-mono text-zinc-100">{{ sessions.length }}</div>
        <div class="text-[11px] text-emerald-400 font-mono mt-1">+2 sesi minggu ini</div>
      </Card>

      <Card class="bg-[#121215] border-white/8 !p-4">
        <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Rata-rata Akurasi</div>
        <div class="text-3xl font-black font-mono text-emerald-400">{{ avgAccuracy }}%</div>
        <div class="text-[11px] text-zinc-400 font-mono mt-1">±18 cents deviasi mikro</div>
      </Card>

      <Card class="bg-[#121215] border-white/8 !p-4">
        <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Rentang Vokal Aktif</div>
        <div class="text-3xl font-black font-mono text-cyan-400">{{ vocalRangeSpan }}</div>
        <div class="text-[11px] text-zinc-400 font-mono mt-1">2.3 Oktaf Tessitura</div>
      </Card>

      <Card class="bg-[#121215] border-white/8 !p-4">
        <div class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Kestabilan Vibrato</div>
        <div class="text-3xl font-black font-mono text-amber-400">5.9 Hz</div>
        <div class="text-[11px] text-emerald-400 font-mono mt-1">Optimal 5–7 Hz</div>
      </Card>
    </div>

    <!-- Main Analytics Layout: Chart & History Table -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
      <!-- Accuracy Progression Chart (8 cols) -->
      <Card class="lg:col-span-8 bg-[#121215] border-white/8 flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-white/6 pb-3">
          <div>
            <div class="text-xs font-mono font-bold uppercase text-zinc-300 tracking-wider">KURVA TREN AKURASI NADA (%)</div>
            <p class="text-[11px] text-zinc-500 font-mono mt-0.5">Riwayat 6 sesi latihan terakhir</p>
          </div>
          <Badge variant="green" class="font-mono text-[10px]">TREN NAIK +14%</Badge>
        </div>

        <div class="h-64 relative w-full pt-2">
          <canvas ref="trendChartCanvasRef"></canvas>
        </div>
      </Card>

      <!-- Resonance Distribution Breakdown (4 cols) -->
      <Card class="lg:col-span-4 bg-[#121215] border-white/8 flex flex-col gap-4">
        <div class="border-b border-white/6 pb-3">
          <div class="text-xs font-mono font-bold uppercase text-zinc-300 tracking-wider">KESEIMBANGAN RESONANSI</div>
          <p class="text-[11px] text-zinc-500 font-mono mt-0.5">Rata-rata 3 pita frekuensi akustik</p>
        </div>

        <div class="space-y-4 pt-1">
          <Progress :value="38" label="Chest Voice (Dada / 100–400Hz)" showValue color="cyan" />
          <Progress :value="44" label="Mask / Mixed Voice (Wajah / 400–2kHz)" showValue color="emerald" />
          <Progress :value="18" label="Head Voice (Kepala / 2–5kHz)" showValue color="amber" />
        </div>

        <div class="bg-[#0a0a0c] p-3 rounded border border-white/5 text-xs text-zinc-400 leading-relaxed font-mono mt-2">
          <span class="text-emerald-400 font-bold">Catatan Akustik:</span> Resonansi suara campuran (Mask) mendominasi, menandakan penempatan vokal di area fokal wajah yang sehat tanpa ketegangan laring.
        </div>
      </Card>
    </div>

    <!-- Session History Table -->
    <Card class="bg-[#121215] border-white/8">
      <div class="flex items-center justify-between border-b border-white/6 pb-4 mb-4">
        <div>
          <h2 class="text-base font-bold text-zinc-100 font-mono tracking-tight">RIWAYAT ARSIP REKAMAN SESI</h2>
          <p class="text-xs text-zinc-500 font-mono mt-0.5">Data tersimpan di penyimpanan peramban lokal secara privat</p>
        </div>
        <Button variant="outline" size="sm" @click="clearHistory">
          Kosongkan Riwayat
        </Button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs font-mono text-left">
          <thead>
            <tr class="border-b border-white/8 text-zinc-500 uppercase text-[10px]">
              <th class="py-2.5 px-3">Tanggal & Waktu</th>
              <th class="py-2.5 px-3">Modul Latihan</th>
              <th class="py-2.5 px-3">Durasi</th>
              <th class="py-2.5 px-3">Rentang Nada</th>
              <th class="py-2.5 px-3">Akurasi Nada</th>
              <th class="py-2.5 px-3">Skor Total</th>
              <th class="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="s in sessions" :key="s.id" class="hover:bg-white/2 transition-colors">
              <td class="py-3 px-3 text-zinc-300">{{ s.date }}</td>
              <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-300 text-[11px]">
                  {{ s.exercise }}
                </span>
              </td>
              <td class="py-3 px-3 text-zinc-400">{{ s.duration }}</td>
              <td class="py-3 px-3 text-cyan-400 font-bold">{{ s.range }}</td>
              <td class="py-3 px-3 font-bold" :class="s.accuracy >= 80 ? 'text-emerald-400' : 'text-amber-400'">
                {{ s.accuracy }}%
              </td>
              <td class="py-3 px-3 font-bold text-zinc-100">
                <span class="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/25">
                  {{ s.score }} / 100
                </span>
              </td>
              <td class="py-3 px-3 text-right">
                <router-link to="/studio">
                  <Button variant="ghost" size="sm" class="text-xs">Buka Studio</Button>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Card from '../components/ui/Card.vue';
import Progress from '../components/ui/Progress.vue';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const trendChartCanvasRef = ref(null);
let trendChartInstance = null;

// Contoh data histori sesi vokal terarsip
const defaultSessions = [
  { id: 1, date: '2026-10-28 14:20', exercise: 'Tangga Nada Mayor', duration: '58s', range: 'A2 - E4', accuracy: 72, score: 74 },
  { id: 2, date: '2026-10-30 16:45', exercise: 'Triad Arpeggio', duration: '60s', range: 'B2 - G4', accuracy: 78, score: 79 },
  { id: 3, date: '2026-11-01 10:10', exercise: 'Vocal Sustain', duration: '45s', range: 'C3 - C5', accuracy: 81, score: 82 },
  { id: 4, date: '2026-11-02 19:30', exercise: 'Import Lagu Eksternal', duration: '84s', range: 'G2 - A4', accuracy: 85, score: 86 },
  { id: 5, date: '2026-11-02 23:15', exercise: 'Tangga Nada Mayor', duration: '60s', range: 'A2 - G4', accuracy: 89, score: 90 }
];

const sessions = ref(JSON.parse(localStorage.getItem('vs_sessions') || JSON.stringify(defaultSessions)));

const avgAccuracy = computed(() => {
  if (sessions.value.length === 0) return 0;
  const sum = sessions.value.reduce((acc, s) => acc + s.accuracy, 0);
  return Math.round(sum / sessions.value.length);
});

const vocalRangeSpan = computed(() => 'G2 – A4');

function clearHistory() {
  if (confirm('Kosongkan semua rekaman arsip sesi vokal?')) {
    sessions.value = [];
    localStorage.removeItem('vs_sessions');
    if (trendChartInstance) {
      trendChartInstance.data.labels = [];
      trendChartInstance.data.datasets[0].data = [];
      trendChartInstance.update();
    }
  }
}

onMounted(() => {
  if (!trendChartCanvasRef.value) return;
  const ctx = trendChartCanvasRef.value.getContext('2d');

  const labels = sessions.value.map((s, idx) => `Sesi ${idx + 1}`);
  const data = sessions.value.map(s => s.accuracy);

  trendChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Akurasi Nada (%)',
          data,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointBackgroundColor: '#059669',
          pointBorderColor: '#10b981',
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 50,
          max: 100,
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#71717a', font: { family: 'JetBrains Mono', size: 10 } }
        },
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#71717a', font: { family: 'JetBrains Mono', size: 10 } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#121215',
          borderColor: 'rgba(255, 255, 255, 0.15)',
          borderWidth: 1,
          titleFont: { family: 'JetBrains Mono' },
          bodyFont: { family: 'JetBrains Mono' }
        }
      }
    }
  });
});
</script>