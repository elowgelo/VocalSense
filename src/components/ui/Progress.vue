<template>
  <div class="w-full">
    <div v-if="label || showValue" class="flex justify-between items-center mb-1.5 text-xs">
      <span v-if="label" class="font-medium text-slate-300">{{ label }}</span>
      <span v-if="showValue" class="font-mono text-slate-400">{{ value }}%</span>
    </div>
    <ProgressRoot
      :model-value="value"
      :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-slate-800/80 border border-white/5', props.class)"
    >
      <ProgressIndicator
        :class="cn('h-full w-full flex-1 transition-all duration-300', indicatorColorClass)"
        :style="{ transform: `translateX(-${100 - (value || 0)}%)` }"
      />
    </ProgressRoot>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { ProgressRoot, ProgressIndicator } from 'radix-vue';
import { cn } from '../../utils/cn';

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  label: {
    type: String,
    default: '',
  },
  showValue: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'purple', // 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan'
  },
  class: {
    type: String,
    default: '',
  }
});

const indicatorColorClass = computed(() => {
  switch (props.color) {
    case 'emerald':
      return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    case 'amber':
      return 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
    case 'rose':
      return 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]';
    case 'cyan':
      return 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]';
    case 'purple':
    default:
      return 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
  }
});
</script>