<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16 studio-grid-bg">
    <Card class="w-full max-w-md p-8 bg-[#121215] border-white/8 shadow-2xl">
      <div class="text-center mb-6">
        <div class="w-10 h-10 rounded bg-zinc-900 border border-white/15 flex items-center justify-center text-emerald-400 font-mono text-xs font-black mx-auto mb-3 shadow-md">
          VS
        </div>
        <h2 class="text-2xl font-black text-zinc-100 tracking-tight">Masuk ke VocalSense AI</h2>
        <p class="text-xs text-zinc-400 mt-1 font-mono">Akses rapor bernyanyi dan arsip rekaman vokal Anda</p>
      </div>

      <div
        v-if="alertMsg"
        class="mb-4 p-3 rounded-lg text-xs"
        :class="alertType === 'error' ? 'bg-rose-950/50 border border-rose-500/30 text-rose-200' : 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-200'"
      >
        {{ alertMsg }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <Input
          id="login-email"
          label="Email"
          type="email"
          v-model="email"
          placeholder="nama@email.com"
          required
        />

        <Input
          id="login-password"
          label="Kata Sandi"
          type="password"
          v-model="password"
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          variant="default"
          size="default"
          class="w-full mt-2"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Memverifikasi...' : 'Masuk' }}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="default"
          class="w-full"
          @click="loginWithGoogle"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" class="mr-1.5">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 20.4 7.5 23 12 23z"/>
          </svg>
          Masuk dengan Google (Demo)
        </Button>
      </form>

      <div class="text-center text-xs text-slate-400 mt-6 pt-5 border-t border-white/10">
        Belum punya akun?
        <router-link to="/register" class="text-violet-400 font-bold hover:text-violet-300 ml-1">Daftar sekarang</router-link>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '../components/ui/Button.vue';
import Card from '../components/ui/Card.vue';
import Input from '../components/ui/Input.vue';

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const alertMsg = ref('');
const alertType = ref('error');

function handleLogin() {
  isLoading.value = true;
  alertMsg.value = '';

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('vs_users') || '[]');
    const user = users.find(u => u.email === email.value.trim());

    if (!user) {
      alertMsg.value = 'Email tidak ditemukan. Silakan daftar terlebih dahulu.';
      alertType.value = 'error';
      isLoading.value = false;
      return;
    }

    if (user.password !== btoa(password.value)) {
      alertMsg.value = 'Kata sandi salah. Coba lagi.';
      alertType.value = 'error';
      isLoading.value = false;
      return;
    }

    localStorage.setItem(
      'vs_user',
      JSON.stringify({ name: user.name, email: user.email, tier: user.tier || 'free' })
    );
    window.dispatchEvent(new Event('storage'));
    router.push('/studio');
  }, 400);
}

function loginWithGoogle() {
  const mockUser = {
    name: 'Demo Singer',
    email: 'demo@vocalsense.ai',
    tier: 'pro'
  };
  localStorage.setItem('vs_user', JSON.stringify(mockUser));
  window.dispatchEvent(new Event('storage'));
  router.push('/studio');
}
</script>