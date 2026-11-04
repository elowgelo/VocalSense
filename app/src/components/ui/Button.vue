<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="classes"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const props = defineProps({
  variant: {
    type: String,
    default: 'default', // 'default' | 'secondary' | 'outline' | 'danger' | 'ghost'
  },
  size: {
    type: String,
    default: 'default', // 'sm' | 'default' | 'lg' | 'icon'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  class: {
    type: String,
    default: '',
  }
});

defineEmits(['click']);

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'bg-[#00F5A0] text-slate-950 font-bold hover:bg-[#10B981] shadow-lg shadow-[#00F5A0]/20 active:scale-[0.98]',
        secondary: 'bg-[#14161E] text-zinc-100 hover:bg-[#1F232E] border border-white/10 active:scale-[0.98]',
        outline: 'border border-white/12 bg-[#0E1015]/90 text-zinc-200 hover:bg-white/10 hover:text-white hover:border-[#00F5A0]/40 active:scale-[0.98]',
        danger: 'bg-rose-500 text-white hover:bg-rose-400 shadow-md shadow-rose-500/30 active:scale-[0.98]',
        ghost: 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100',
        radiant: 'bg-gradient-to-r from-[#00F5A0] to-[#10B981] text-slate-950 font-black hover:opacity-95 shadow-xl shadow-[#00F5A0]/25 active:scale-[0.98]'
      },
      size: {
        sm: 'h-8 px-3 text-[11px]',
        default: 'h-9 px-4 py-2',
        lg: 'h-11 px-6 text-sm',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const classes = computed(() => {
  return cn(buttonVariants({ variant: props.variant, size: props.size }), props.class);
});
</script>