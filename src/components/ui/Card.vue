<template>
  <div :class="cn('rounded-xl border border-white/8 bg-[#121215] p-5 shadow-xl shadow-black/50', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '../../utils/cn';

const props = defineProps({
  class: {
    type: String,
    default: '',
  }
});
</script>