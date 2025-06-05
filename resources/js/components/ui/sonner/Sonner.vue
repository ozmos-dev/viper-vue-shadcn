<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner';

const props = defineProps<ToasterProps>();
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :style="{
      '--normal-bg': 'var(--popover)',
      '--normal-text': 'var(--popover-foreground)',
      '--normal-border': 'var(--border)',
    }"
    :toastOptions="{
      class:
        'data-[type=success]:!border-b-2 data-[type=success]:!border-b-emerald-400 data-[type=error]:!border-b-2 data-[type=error]:!border-b-rose-400',
    }"
  />
</template>
