<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-xs font-semibold text-slate-300">
      {{ label }}
    </label>
    <select
      :id="id"
      :value="modelValue"
      :disabled="disabled"
      :class="cn(
        'flex h-9 w-full rounded-lg border border-white/10 bg-slate-900/90 px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
        props.class
      )"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
    </select>
  </div>
</template>

<script setup>
import { cn } from '../../utils/cn';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  class: {
    type: String,
    default: '',
  }
});

defineEmits(['update:modelValue']);
</script>