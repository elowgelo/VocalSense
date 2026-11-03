<template>
  <div class="profile-page max-w-4xl mx-auto px-6 py-10 studio-grid-bg">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6 mb-8">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <Badge variant="cyan" class="font-mono text-[10px]">PROFIL VOKAL PENGGUNA / FR-005</Badge>
          <span class="text-xs font-mono text-zinc-500">BIOMETRIK AKUSTIK</span>
        </div>
        <h1 class="text-3xl font-black text-zinc-100 tracking-tight">Profil & Karakteristik Akustik Vokal</h1>
        <p class="text-xs text-zinc-400 mt-1">
          Spesifikasi jangkauan nada alami, klasifikasi tessitura, dan preferensi pemrosesan audio lokal Anda.
        </p>
      </div>

      <div class="flex items-center gap-3">
        <Badge :variant="userTier === 'premium' ? 'amber' : userTier === 'pro' ? 'green' : 'default'">
          TIER {{ userTier.toUpperCase() }}
        </Badge>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      <!-- Left Column: User Card & Vocal Classification -->
      <Card class="md:col-span-1 bg-[#121215] border-white/8 text-center p-6 flex flex-col items-center">
        <div class="w-20 h-20 rounded-full bg-zinc-900 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 font-mono text-2xl font-black mb-4 shadow-xl">
          {{ userInitials }}
        </div>

        <h3 class="text-lg font-bold text-zinc-100">{{ userName }}</h3>
        <p class="text-xs text-zinc-400 font-mono mt-0.5">{{ userEmail }}</p>

        <div class="w-full mt-6 pt-5 border-t border-white/8 space-y-3 text-left font-mono text-xs">
          <div class="flex justify-between">
            <span class="text-zinc-500">TIPE VOKAL:</span>
            <span class="text-emerald-400 font-bold">{{ voiceType }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-500">TESSITURA:</span>
            <span class="text-cyan-400 font-bold">C3 – E4</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-500">PASSAGGIO:</span>
            <span class="text-amber-400 font-bold">~F4</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-500">TOTAL SESI:</span>
            <span class="text-zinc-200 font-bold">14 Sesi</span>
          </div>
        </div>

        <router-link to="/range-finder" class="w-full mt-6">
          <Button variant="outline" size="sm" class="w-full">
            Tes Ulang Jangkauan
          </Button>
        </router-link>
      </Card>

      <!-- Right Column: Settings & Technical Calibration Preferences -->
      <div class="md:col-span-2 space-y-6">
        <!-- Vocal Biometrics Form -->
        <Card class="bg-[#121215] border-white/8 p-6">
          <h4 class="text-sm font-bold text-zinc-100 font-mono uppercase tracking-wider mb-4 border-b border-white/6 pb-2">
            PENGATURAN PROFIL & AKUSTIK
          </h4>

          <div class="space-y-4 text-xs font-mono">
            <div>
              <label class="block text-zinc-400 mb-1">Nama Lengkap Penyanyi:</label>
              <input
                type="text"
                v-model="userName"
                class="w-full studio-input text-xs"
              />
            </div>

            <div>
              <label class="block text-zinc-400 mb-1">Alamat Email:</label>
              <input
                type="email"
                v-model="userEmail"
                disabled
                class="w-full studio-input text-xs opacity-50 cursor-not-allowed"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-zinc-400 mb-1">Klasifikasi Tipe Suara:</label>
                <select v-model="voiceType" class="w-full studio-input text-xs cursor-pointer">
                  <option value="Bass">Bass (E2 - E4)</option>
                  <option value="Bariton">Bariton (A2 - A4)</option>
                  <option value="Tenor">Tenor (C3 - C5)</option>
                  <option value="Contralto">Contralto (F3 - F5)</option>
                  <option value="Mezzo-Sopran">Mezzo-Sopran (A3 - A5)</option>
                  <option value="Sopran">Sopran (C4 - C6)</option>
                </select>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1">Frekuensi Acuan Konser (A4):</label>
                <select v-model="concertPitch" class="w-full studio-input text-xs cursor-pointer">
                  <option value="440">440 Hz (Standard Modern)</option>
                  <option value="432">432 Hz (Natural Acoustic)</option>
                  <option value="442">442 Hz (European Symphony)</option>
                </select>
              </div>
            </div>

            <div class="pt-2">
              <Button variant="default" size="sm" @click="saveProfile">
                Simpan Perubahan Profil
              </Button>
            </div>
          </div>
        </Card>

        <!-- Privacy & Local Data Control -->
        <Card class="bg-[#121215] border-white/8 p-6">
          <h4 class="text-sm font-bold text-zinc-100 font-mono uppercase tracking-wider mb-2 border-b border-white/6 pb-2">
            KEAMANAN & PRIVASI DATA AUDIO
          </h4>
          <p class="text-xs text-zinc-400 leading-relaxed font-mono mb-4">
            Semua rekaman audio diproses 100% di browser Anda via Web Audio API. Tidak ada berkas rekaman suara yang dikirim ke server luar tanpa persetujuan Anda.
          </p>

          <div class="flex items-center justify-between text-xs font-mono border-t border-white/6 pt-4">
            <div>
              <div class="font-bold text-zinc-200">Pembersihan Sesi Lokal</div>
              <div class="text-zinc-500 text-[11px]">Hapus token login dan sesi yang disimpan di browser</div>
            </div>
            <Button variant="danger" size="sm" @click="clearLocalAccount">
              Hapus Sesi Lokal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Badge from '../components/ui/Badge.vue';
import Card from '../components/ui/Card.vue';

const router = useRouter();
const storedUser = JSON.parse(localStorage.getItem('vs_user') || '{"name":"Penyanyi Tamu","email":"vocalist@example.com","tier":"pro"}');

const userName = ref(storedUser.name || 'Penyanyi VocalSense');
const userEmail = ref(storedUser.email || 'vocalist@example.com');
const userTier = computed(() => storedUser.tier || 'free');
const voiceType = ref(localStorage.getItem('vs_voice_type') || 'Bariton');
const concertPitch = ref(localStorage.getItem('vs_concert_pitch') || '440');

const userInitials = computed(() => {
  const parts = userName.value.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return userName.value.slice(0, 2).toUpperCase();
});

function saveProfile() {
  storedUser.name = userName.value;
  localStorage.setItem('vs_user', JSON.stringify(storedUser));
  localStorage.setItem('vs_voice_type', voiceType.value);
  localStorage.setItem('vs_concert_pitch', concertPitch.value);
  alert('Profil vokal dan preferensi akustik berhasil disimpan!');
}

function clearLocalAccount() {
  if (confirm('Apakah Anda yakin ingin menghapus data akun lokal dari peramban ini?')) {
    localStorage.removeItem('vs_user');
    localStorage.removeItem('vs_token');
    alert('Sesi telah dibersihkan.');
    router.push('/login');
  }
}
</script>