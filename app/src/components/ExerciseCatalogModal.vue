<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div class="bg-[#121215] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-xl flex flex-col shadow-2xl overflow-hidden">
      <!-- Header -->
      <div class="px-6 py-5 border-b border-white/8 flex items-center justify-between bg-[#0a0a0c]">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              KURIKULUM VOKAL PROFESIONAL
            </span>
            <span class="text-xs font-mono text-zinc-500">{{ exercises.length }} Modul Latihan Siap Pakai</span>
          </div>
          <h2 class="text-xl font-black text-zinc-100 tracking-tight">Katalog Sesi Olah Vokal & Solfeggio</h2>
          <p class="text-xs text-zinc-400 mt-0.5">Pilih modul terstruktur dengan panduan fonem, tempo metronom, dan balok target nada</p>
        </div>
        <button
          @click="$emit('close')"
          class="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="px-6 py-3 border-b border-white/5 bg-[#0e0e11] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          class="px-3 py-1 rounded text-xs font-mono font-medium whitespace-nowrap transition-all"
          :class="activeCategory === cat ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'bg-white/5 text-zinc-400 hover:text-zinc-200'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Exercise Cards Grid -->
      <div class="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        <!-- Option: Mode Bebas (Tanpa Target Bar / Bersih) -->
        <div
          class="p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between"
          :class="!selectedId || selectedId === 'freeform' ? 'bg-cyan-950/20 border-cyan-500/60 shadow-lg shadow-cyan-500/10' : 'bg-[#0a0a0c] border-white/8 hover:border-white/20'"
          @click="selectFreeform"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                Latihan Bebas
              </span>
              <span class="text-[10px] font-mono font-bold text-cyan-400">
                Kanvas Bersih
              </span>
            </div>

            <h3 class="text-base font-bold text-zinc-100 mb-1">Mode Bebas (Freeform Singing)</h3>
            <p class="text-xs text-zinc-400 leading-relaxed mb-3">Bernyanyi bebas tanpa target balok. Piano roll bersih menampilkan F0 pitch vokal waktu nyata.</p>

            <div class="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/[0.02] p-2.5 rounded border border-white/5 mb-3">
              <div>
                <span class="text-zinc-500">Target Nada:</span>
                <div class="text-cyan-300 font-bold truncate">Tanpa Batasan</div>
              </div>
              <div>
                <span class="text-zinc-500">Visualisasi:</span>
                <div class="text-zinc-200 font-bold">Input Murni</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-white/5">
            <span class="text-[11px] font-mono text-zinc-500">0 interval target</span>
            <button
              class="px-3 py-1.5 rounded text-xs font-mono font-bold transition-all"
              :class="!selectedId || selectedId === 'freeform' ? 'bg-cyan-400 text-slate-950' : 'bg-white/10 text-zinc-200 hover:bg-white/20'"
            >
              {{ !selectedId || selectedId === 'freeform' ? 'Aktif (Bersih) ✓' : 'Pilih Mode Bebas' }}
            </button>
          </div>
        </div>

        <div
          v-for="ex in filteredExercises"
          :key="ex.id"
          class="p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between"
          :class="selectedId === ex.id ? 'bg-emerald-950/20 border-emerald-500/60 shadow-lg shadow-emerald-500/10' : 'bg-[#0a0a0c] border-white/8 hover:border-white/20'"
          @click="selectExercise(ex)"
        >
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                {{ ex.category }}
              </span>
              <span
                class="text-[10px] font-mono font-bold"
                :class="ex.level === 'Lanjutan' ? 'text-rose-400' : ex.level === 'Menengah' ? 'text-amber-400' : 'text-emerald-400'"
              >
                {{ ex.level }}
              </span>
            </div>

            <h3 class="text-base font-bold text-zinc-100 mb-1">{{ ex.title }}</h3>
            <p class="text-xs text-zinc-400 leading-relaxed mb-3">{{ ex.description }}</p>

            <div class="grid grid-cols-2 gap-2 text-[11px] font-mono bg-white/[0.02] p-2.5 rounded border border-white/5 mb-3">
              <div>
                <span class="text-zinc-500">Fonem Target:</span>
                <div class="text-emerald-300 font-bold truncate">{{ ex.target_vowel }}</div>
              </div>
              <div>
                <span class="text-zinc-500">Tempo Ideal:</span>
                <div class="text-zinc-200 font-bold">{{ ex.bpm }} BPM</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-white/5">
            <span class="text-[11px] font-mono text-zinc-500">{{ ex.notes ? ex.notes.length : 0 }} interval nada</span>
            <button
              class="px-3 py-1.5 rounded text-xs font-mono font-bold transition-all"
              :class="selectedId === ex.id ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-zinc-200 hover:bg-white/20'"
            >
              {{ selectedId === ex.id ? 'Sedang Dipilih ✓' : 'Gunakan Latihan Ini' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Info -->
      <div class="px-6 py-4 border-t border-white/8 bg-[#0a0a0c] flex items-center justify-between text-xs font-mono text-zinc-500">
        <span>Tekan tombol di kartu untuk langsung memuat tangga nada ke kanvas DAW</span>
        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded bg-white/10 text-zinc-200 font-mono text-xs font-bold hover:bg-white/20 transition-colors"
        >
          Tutup Katalog
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  exercises: {
    type: Array,
    default: () => []
  },
  selectedId: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'select']);

const activeCategory = ref('Semua');

const categories = computed(() => {
  const cats = new Set(props.exercises.map(e => e.category));
  return ['Semua', ...Array.from(cats)];
});

const filteredExercises = computed(() => {
  if (activeCategory.value === 'Semua') return props.exercises;
  return props.exercises.filter(e => e.category === activeCategory.value);
});

function selectExercise(ex) {
  emit('select', ex);
  emit('close');
}

function selectFreeform() {
  emit('select', { id: 'freeform', title: 'Mode Bebas (Kanvas Bersih)', notes: [] });
  emit('close');
}
</script>