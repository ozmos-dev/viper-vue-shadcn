<template>
  <div
    class="min-h-screen bg-background text-foreground flex items-center justify-center"
  >
    <div>
      <div class="flex items-center justify-center gap-4">
        <router-link :to="route('login')">Login</router-link>
        <router-link :to="route('register')">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { route } from '@/pages/routes';
</script>
