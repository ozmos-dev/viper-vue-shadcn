<template>
  <div class="px-4 py-6">
    <Heading
      title="Settings"
      description="Manage your profile and account settings"
      class="mb-8"
    />

    <div
      class="flex flex-col space-y-8 md:space-y-0 lg:flex-row lg:space-x-12 lg:space-y-0"
    >
      <aside class="w-full max-w-xl lg:w-48">
        <nav class="flex flex-col space-x-0 space-y-1">
          <Button
            v-for="item in tabs"
            :key="item.to"
            variant="ghost"
            :class="[
              'w-full justify-start',
              { 'bg-muted': router.currentRoute.value.path === item.to },
            ]"
            as-child
          >
            <router-link :to="item.to">
              {{ item.label }}
            </router-link>
          </Button>
        </nav>
      </aside>

      <Separator class="my-6 md:hidden" />

      <div class="flex-1 md:max-w-2xl">
        <section class="max-w-xl">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useBreadcrumb } from '@/pages/(app)/_layout.vue';
import { route, router } from '@/pages/routes';
import { Button } from '@/components/ui/button';
import Heading from '@/components/Heading.vue';
import { Separator } from '@/components/ui/separator';

useBreadcrumb({ label: 'Profile', href: route('profile') });

const tabs = [
  { label: 'General', value: 'profile', to: '/profile' },
  { label: 'Password', value: 'password', to: '/profile/password' },
  { label: 'Appearance', value: 'appearance', to: '/profile/appearance' },
];
</script>
