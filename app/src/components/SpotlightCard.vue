<template>
  <div
    ref="cardRef"
    class="spotlight-card relative rounded-2xl border border-white/8 bg-[#0e1015]/90 p-6 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-[#00F5A0]/30 hover:shadow-[0_10px_30px_-10px_rgba(0,245,160,0.15)]"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Spotlight radial highlight in signature Electric Mint #00F5A0 -->
    <div
      class="pointer-events-none absolute -inset-px transition-opacity duration-300"
      :style="{
        opacity: isHovered ? 1 : 0,
        background: `radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(0, 245, 160, 0.16), transparent 80%)`
      }"
    />
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cardRef = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);
const isHovered = ref(false);

function handleMouseMove(e) {
  if (!cardRef.value) return;
  const rect = cardRef.value.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
}
</script>

<style scoped>
.spotlight-card {
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
}
</style>