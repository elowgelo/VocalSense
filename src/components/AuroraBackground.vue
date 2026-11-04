<template>
  <div class="relative w-full overflow-hidden">
    <!-- Aurora background ambient shapes -->
    <div
      class="aurora-blob blob-1 absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-violet-600/20 blur-[120px] pointer-events-none"
    />
    <div
      class="aurora-blob blob-2 absolute -top-20 right-0 h-[420px] w-[420px] rounded-full bg-indigo-600/15 blur-[100px] pointer-events-none"
    />
    <div
      class="aurora-blob blob-3 absolute top-60 left-1/3 h-[360px] w-[360px] rounded-full bg-fuchsia-600/10 blur-[110px] pointer-events-none"
    />
    <div class="relative z-10">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, 30px) scale(1.08); }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, 20px) scale(0.95); }
}
.blob-1 { animation: float1 14s ease-in-out infinite; }
.blob-2 { animation: float2 18s ease-in-out infinite; }
</style>