<template>
  <router-view></router-view>
  <Toaster position="top-right" />
</template>

<script setup lang="ts">
import 'vue-sonner/style.css';
import { Toaster } from '@/components/ui/sonner';
</script>
