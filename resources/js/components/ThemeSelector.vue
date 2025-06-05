<template>
  <Select :model-value="theme" @update:modelValue="updateTheme">
    <SelectTrigger>
      <SelectValue placeholder="Default" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem v-for="theme in themes" :key="theme" :value="theme">
        {{ theme }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { Theme, themes, useTheme } from '@/composables/use-theme.js';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const { theme, updateTheme } = useTheme();
</script>
