<template>
  <div>
    <Heading
      title="Change Password"
      description="Confirm your old password and enter a new one"
    />
    <form method="post" @submit.prevent="form.mutate()" class="mt-6">
      <div class="flex flex-col gap-6 max-w-sm">
        <FormInput
          id="old-password"
          label="Old Password"
          type="password"
          v-model="form.state.value.old_password"
          :error="form.errors.value.old_password"
        />
        <FormInput
          id="new-password"
          label="New Password"
          type="password"
          v-model="form.state.value.new_password"
          :error="form.errors.value.new_password"
        />
        <div>
          <Button :loading="form.isPending.value">Save</Button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useBreadcrumb } from '@/pages/(app)/_layout.vue';
import FormInput from '@/components/FormInput.vue';
import { Button } from '@/components/ui/button';
import { usePage } from '@ozmos/viper-vue';
import AppGroupProfilePasswordPage = ViperGen.AppGroupProfilePassword;
import { toast } from 'vue-sonner';
import Heading from '@/components/Heading.vue';
import { route } from '@/pages/routes';

useBreadcrumb({ label: 'Change Password', href: route('profile.password') });

const page = usePage<AppGroupProfilePasswordPage>();

const form = page.useForm('resetPassword', {
  state: {
    old_password: '',
    new_password: '',
  },
  onSuccess() {
    form.reset();
    toast.success('Password Changed!');
  },
});
</script>
