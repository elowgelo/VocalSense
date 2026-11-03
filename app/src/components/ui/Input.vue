<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="id" class="text-xs font-semibold text-slate-300">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="cn(
        'flex h-10 w-full rounded-lg border border-white/10 bg-slate-900/80 px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
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