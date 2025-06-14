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
          <h1 class="text-xl font-bold">Reset Your Password</h1>
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
            disabled="true"
            readonly="true"
          />
          <FormInput
            label="Password"
            type="password"
            id="password"
            required
            v-model="form.state.value.password"
            :error="form.errors.value.password"
          />
          <Button type="submit" class="w-full" :loading="form.isPending.value">
            Reset Password
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
import { router } from '@/pages/routes';

const page = usePage<ViperGen.AuthGroupResetPasswordTokenParam>();

const { data: email } = page.useQuery('email');

const form = page.useForm('resetPassword', {
  state: {
    email: email.value,
    password: '',
  },
  onSuccess(data: { message: string }) {
    toast.success('Password reset', {
      description: data.message,
    });
    form.reset();
    router.push('/login');
  },
});
</script>
