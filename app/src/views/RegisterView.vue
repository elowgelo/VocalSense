<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16 studio-grid-bg">
    <Card class="w-full max-w-md p-8 bg-[#121215] border-white/8 shadow-2xl">
      <div class="text-center mb-6">
        <div class="w-10 h-10 rounded bg-zinc-900 border border-white/15 flex items-center justify-center text-emerald-400 font-mono text-xs font-black mx-auto mb-3 shadow-md">
          VS
        </div>
        <h2 class="text-2xl font-black text-zinc-100 tracking-tight">Daftar Akun VocalSense</h2>
        <p class="text-xs text-zinc-400 mt-1 font-mono">Mulai perjalanan olah vokal mandiri dengan instrumen akustik cerdas</p>
      </div>

      <div
        v-if="alertMsg"
        class="mb-4 p-3 rounded-lg text-xs"
        :class="alertType === 'error' ? 'bg-rose-950/50 border border-rose-500/30 text-rose-200' : 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-200'"
      >
        {{ alertMsg }}
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <Input
          id="reg-name"
          label="Nama Lengkap"
          type="text"
          v-model="name"
          placeholder="John Doe"
          required
        />

        <Input
          id="reg-email"
          label="Email"
          type="email"
          v-model="email"
          placeholder="nama@email.com"
          required
        />

        <Input
          id="reg-password"
          label="Kata Sandi (Min 6 Karakter)"
          type="password"
          v-model="password"
          placeholder="••••••••"
          required
        />

        <div class="space-y-1.5 font-mono">
          <label class="text-xs font-semibold text-zinc-300">PILIHAN PAKET LISENSI</label>
          <div class="grid grid-cols-3 gap-2">
            <div
              class="rounded p-3 text-center cursor-pointer border transition-all"
              :class="selectedTier === 'free' ? 'border-emerald-500 bg-emerald-950/40' : 'border-white/10 bg-[#0a0a0c] hover:border-white/20'"
              @click="selectedTier = 'free'"
            >
              <div class="font-bold text-xs text-white">Free</div>
              <div class="text-[11px] text-zinc-400 mt-0.5">Rp 0</div>
            </div>
            <div
              class="rounded p-3 text-center cursor-pointer border transition-all"
              :class="selectedTier === 'pro' ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500' : 'border-white/10 bg-[#0a0a0c] hover:border-white/20'"
              @click="selectedTier = 'pro'"
            >
              <div class="font-bold text-xs text-emerald-400">Pro</div>
              <div class="text-[11px] text-zinc-400 mt-0.5">49rb/bln</div>
            </div>
            <div
              class="rounded p-3 text-center cursor-pointer border transition-all"
              :class="selectedTier === 'premium' ? 'border-amber-500 bg-amber-950/40 ring-1 ring-amber-500' : 'border-white/10 bg-[#0a0a0c] hover:border-white/20'"
              @click="selectedTier = 'premium'"
            >
              <div class="font-bold text-xs text-amber-400">Premium</div>
              <div class="text-[11px] text-zinc-400 mt-0.5">99rb/bln</div>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant="default"
          size="default"
          class="w-full mt-2"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Mendaftar...' : 'Buat Akun' }}
        </Button>
      </form>

      <div class="text-center text-xs text-slate-400 mt-6 pt-5 border-t border-white/10">
        Sudah memiliki akun?
        <router-link to="/login" class="text-violet-400 font-bold hover:text-violet-300 ml-1">Masuk di sini</router-link>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Card from '../components/ui/Card.vue';
import Input from '../components/ui/Input.vue';

const router = useRouter();
const route = useRoute();

const name = ref('');
const email = ref('');
const password = ref('');
const selectedTier = ref('free');
const isLoading = ref(false);
const alertMsg = ref('');
const alertType = ref('error');

onMounted(() => {
  if (route.query.tier && ['free', 'pro', 'premium'].includes(route.query.tier)) {
    selectedTier.value = route.query.tier;
  }
});

function handleRegister() {
  if (password.value.length < 6) {
    alertMsg.value = 'Kata sandi minimal 6 karakter.';
    alertType.value = 'error';
    return;
  }

  isLoading.value = true;
  alertMsg.value = '';

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('vs_users') || '[]');
    if (users.find(u => u.email === email.value.trim())) {
      alertMsg.value = 'Email sudah terdaftar. Silakan masuk.';
      alertType.value = 'error';
      isLoading.value = false;
      return;
    }

    const newUser = {
      name: name.value.trim(),
      email: email.value.trim(),
      password: btoa(password.value),
      tier: selectedTier.value,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('vs_users', JSON.stringify(users));
    localStorage.setItem('vs_user', JSON.stringify({ name: newUser.name, email: newUser.email, tier: newUser.tier }));

    alertMsg.value = 'Pendaftaran berhasil! Mengalihkan ke Studio...';
    alertType.value = 'success';
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => {
      router.push('/studio');
    }, 800);
  }, 400);
}
</script>