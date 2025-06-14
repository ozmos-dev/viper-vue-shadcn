<template>
  <div :class="cn('flex flex-col gap-6')">
    <form method="post" @submit.prevent="form.mutate()">
      <div class="flex flex-col gap-6">
        <div class="flex flex-col items-center gap-2">
          <a href="#" class="flex flex-col items-center gap-2 font-medium">
            <div class="flex size-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd class="size-6" />
            </div>
            <span class="sr-only">Acme Inc.</span>
          </a>
          <h1 class="text-xl font-bold">Forgot Password</h1>
          <div class="text-center text-sm">
            Know your account details?
            <router-link
              :to="route('login')"
              class="underline underline-offset-4"
            >
              Log in
            </router-link>
          </div>
        </div>
        <div class="flex flex-col gap-6">
          <FormInput
            label="Email"
            type="email"
            id="email"
            placeholder="m@example.com"
            required
            v-model="form.state.value.email"
            :error="form.errors.value.email"
          />
          <Button type="submit" class="w-full" :loading="form.isPending.value">
            Send Reset Instructions
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/lib/utils';
import { GalleryVerticalEnd } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput.vue';
import { usePage } from '@ozmos/viper-vue';
import { toast } from 'vue-sonner';
import { route } from '@/pages/routes';

const page = usePage<ViperGen.AuthGroupForgotPassword>();
const form = page.useForm('sendResetLink', {
  state: {
    email: '',
  },
  onSuccess(data: { message: string }) {
    toast.success('Password reset link sent', {
      description: data.message,
    });
    form.reset();
  },
});
</script>
