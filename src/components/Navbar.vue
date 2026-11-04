<template>
  <nav class="sticky top-0 z-50 w-full border-b border-white/8 bg-[#0A0C10]/95 backdrop-blur-2xl transition-all">
    <div class="max-w-[1440px] mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2.5 text-zinc-100 font-bold text-base tracking-tight hover:opacity-90">
        <div class="w-8 h-8 rounded-lg bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[#00F5A0] shadow-[0_0_12px_rgba(0,245,160,0.25)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
        <span class="font-extrabold text-[16px] text-[#FAFAFC] tracking-tight">VocalSense AI</span>
      </router-link>

      <!-- Center Links (Figma: Home, Web Studio, About, Pricing) -->
      <div class="hidden md:flex items-center gap-8 text-[13px] font-medium">
        <router-link to="/" class="text-[#00F5A0] hover:text-[#00F5A0] transition-colors" active-class="!text-[#00F5A0]">
          Home
        </router-link>
        <router-link to="/studio" class="text-[#A3A8B8] hover:text-[#FAFAFC] transition-colors" active-class="!text-[#00F5A0]">
          Web Studio
        </router-link>
        <router-link to="/#features" class="text-[#A3A8B8] hover:text-[#FAFAFC] transition-colors">
          About
        </router-link>
        <router-link to="/#pricing" class="text-[#A3A8B8] hover:text-[#FAFAFC] transition-colors">
          Pricing
        </router-link>
      </div>

      <!-- Right Action Buttons -->
      <div class="flex items-center gap-4">
        <template v-if="user">
          <div class="flex items-center gap-2.5 border border-white/10 bg-[#14161E] px-3 py-1.5 rounded-xl">
            <div class="w-6 h-6 rounded-full bg-[#072A1E] border border-[#00F5A0]/40 flex items-center justify-center text-[10px] font-bold text-[#00F5A0]">
              {{ user.name ? user.name[0].toUpperCase() : 'U' }}
            </div>
            <span class="text-xs font-medium text-zinc-200">{{ user.name }}</span>
            <span class="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00F5A0]/15 text-[#00F5A0] border border-[#00F5A0]/30 uppercase">
              {{ user.tier }}
            </span>
          </div>
          <button
            type="button"
            class="text-xs text-[#A3A8B8] hover:text-white px-2 py-1 cursor-pointer transition-colors"
            @click="handleLogout"
          >
            Sign Out
          </button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-[13px] font-medium text-[#A3A8B8] hover:text-white px-2 py-1 transition-colors">
            Sign In
          </router-link>
          <router-link to="/studio">
            <button
              type="button"
              class="h-[36px] px-3.5 rounded-lg text-xs font-bold font-mono tracking-tight text-[#05140D] bg-gradient-to-r from-[#00F5A0] to-[#10B981] hover:opacity-95 shadow-[0_4px_16px_rgba(0,245,160,0.35)] border border-[#00F5A0]/90 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
              <span>Launch Studio</span>
            </button>
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from './ui/Button.vue';
import Badge from './ui/Badge.vue';

const router = useRouter();
const user = ref(null);

const tierBadgeVariant = computed(() => {
  const t = user.value?.tier;
  if (t === 'premium') return 'amber';
  if (t === 'pro') return 'green';
  return 'default';
});

function syncUser() {
  try {
    user.value = JSON.parse(localStorage.getItem('vs_user') || 'null');
  } catch {
    user.value = null;
  }
}

onMounted(() => {
  syncUser();
  window.addEventListener('storage', syncUser);
});

function handleLogout() {
  localStorage.removeItem('vs_user');
  user.value = null;
  router.push('/login');
}
</script>