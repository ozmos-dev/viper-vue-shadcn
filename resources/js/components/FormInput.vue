<template>
  <div class="grid gap-3">
    <Label :for="props.id">{{ label }}</Label>
    <Input
      v-bind="$attrs"
      v-model="model"
      :class="cn('bg-card', { 'border-rose-600': error }, props.class)"
    />
    <p v-if="error" class="text-rose-600 text-sm">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

defineOptions({
  inheritAttrs: false,
});

const model = defineModel<string>();

const props = defineProps<
  {
    error?: string | null;
    label?: string;
    id: string;
  } & /* @vue-ignore */ InputHTMLAttributes
>();
</script>
