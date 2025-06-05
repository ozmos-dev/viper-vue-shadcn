<template>
  <div class="">
    <Heading
      title="Edit Profile"
      description="Update your profile information here"
    />
    <div class="mt-6">
      <form method="post" @submit.prevent="form.mutate()">
        <div class="flex flex-col gap-6 max-w-sm">
          <FormInput
            id="name"
            label="Name"
            v-model="form.state.value.name"
            :error="form.errors.value.name"
          />
          <FormInput
            id="email"
            label="Email"
            type="email"
            v-model="form.state.value.email"
            :error="form.errors.value.email"
          />
          <div>
            <Button :loading="form.isPending.value">Save</Button>
          </div>
        </div>
      </form>
    </div>

    <Separator class="my-6" />

    <Heading
      title="Delete Account"
      description="This action is not reversible"
    />

    <div class="mt-4">
      <PasswordConfirmation
        :onConfirm="onDelete"
        :loading="deleteUser.isPending.value"
      >
        <Button variant="destructive">Delete my account</Button>
      </PasswordConfirmation>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import { usePage } from '@ozmos/viper-vue';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import Heading from '@/components/Heading.vue';
import { Separator } from '@/components/ui/separator';
import PasswordConfirmation from '@/components/PasswordConfirmation.vue';
import { route } from '@/pages/routes';

const page = usePage<ViperGen.AppGroupProfileIndex>();

const { data: user, refetch } = page.useQuery('user');

const form = page.useForm('updateUser', {
  state: {
    name: user.value.name,
    email: user.value.email,
  },
  onSuccess() {
    toast.success('Profile saved!');
    refetch();
  },
});

const deleteUser = page.useMutation('deleteUser');

async function onDelete() {
  try {
    await deleteUser.mutateAsync({});
    window.location.href = route('login');
  } catch {
    toast.error('Something went wrong');
  }
}
</script>

<php>
return new
#[\Ozmos\Viper\Attrs\Name('profile')]
class {
    #[\Ozmos\Viper\Attrs\Action()]
    public function updateUser(\App\Data\Requests\UpdateProfileRequest $request)
    {
        auth()->user()->update($request->toArray());
    }

    #[\Ozmos\Viper\Attrs\Action()]
    public function deleteUser()
    {
        auth()->user()->delete();
        auth()->logout();
    }
};
</php>
