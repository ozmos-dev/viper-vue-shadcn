<template>
  <Tabs :default-value="appearance">
    <TabsList>
      <TabsTrigger
        v-for="{ value, Icon, label } in tabs"
        :value="value"
        @click="updateAppearance(value)"
      >
        <component :is="Icon" />
        <span>
          {{ label }}
        </span>
      </TabsTrigger>
    </TabsList>
  </Tabs>
</template>

<script setup lang="ts">
import { useAppearance } from '@/composables/use-appearance';
import { Monitor, Moon, Sun } from 'lucide-vue-next';
import { TabsList, Tabs, TabsTrigger } from '@/components/ui/tabs';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
  { value: 'light', Icon: Sun, label: 'Light' },
  { value: 'dark', Icon: Moon, label: 'Dark' },
  { value: 'system', Icon: Monitor, label: 'System' },
] as const;
</script>
