<template>
  <div>
    <Heading
      title="Appearance Settings"
      description="Update your account's appearance settings"
    />

    <div class="mt-6">
      <AppearanceTabs />
    </div>
  </div>
</template>

<script setup lang="ts">
import Heading from '@/components/Heading.vue';
import { useBreadcrumb } from '@/pages/(app)/_layout.vue';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { route } from '@/pages/routes';

useBreadcrumb({ label: 'Appearance', href: route('profile.appearance') });
</script>
