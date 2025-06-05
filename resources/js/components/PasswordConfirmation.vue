<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormInput from '@/components/FormInput.vue';
import { Button } from '@/components/ui/button';
import { usePage } from '@ozmos/viper-vue';
import AppGroupLayout = ViperGen.AppGroupLayout;
import { ref } from 'vue';

const props = defineProps<{
  loading?: boolean;
  onConfirm(): void;
}>();

const open = ref(false);

const page = usePage<AppGroupLayout>();

const form = page.useForm('confirmPassword', {
  state: {
    password: '',
  },
});

async function submit() {
  await form.mutateAsync();
  await props.onConfirm();
  form.reset();
  open.value = false;
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Password Confirmation</DialogTitle>
        <DialogDescription>
          Please enter your password to continue.
        </DialogDescription>
      </DialogHeader>

      <form id="confirm-password-form" method="post" @submit.prevent="submit">
        <FormInput
          id="password"
          label=""
          type="password"
          v-model="form.state.value.password"
          :error="form.errors.value.password"
        />
      </form>

      <DialogFooter>
        <Button
          :loading="props.loading || form.isPending.value"
          type="submit"
          form="confirm-password-form"
        >
          Submit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
