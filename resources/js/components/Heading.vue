<template>
  <div class="space-y-1">
    <h3 class="text-lg/6 font-medium">{{ title }}</h3>
    <p class="max-w-2xl text-sm text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>
