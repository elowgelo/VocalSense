<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default' | 'purple' | 'green' | 'amber' | 'rose' | 'outline'
  },
  class: {
    type: String,
    default: '',
  }
});

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-white/10 bg-zinc-900 text-zinc-300',
        green: 'border border-emerald-500/30 bg-emerald-950/40 text-emerald-400',
        cyan: 'border border-cyan-500/30 bg-cyan-950/40 text-cyan-400',
        amber: 'border border-amber-500/30 bg-amber-950/40 text-amber-400',
        rose: 'border border-rose-500/30 bg-rose-950/40 text-rose-400',
        purple: 'border border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
        outline: 'border border-white/20 text-zinc-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const classes = computed(() => {
  return cn(badgeVariants({ variant: props.variant }), props.class);
});
</script>