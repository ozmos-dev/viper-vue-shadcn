<php>
use Illuminate\Http\Request;
use Ozmos\Viper\Attrs;
use App\Data\Requests\RegisterRequest;
use App\Models\User;

return new
#[Attrs\Name('register')]
class {
    #[Attrs\Action()]
    public function register(RegisterRequest $request)
    {
        $user = User::create($request->toArray());
        auth()->login($user);
    }
};
</php>

<script lang="ts" setup>
import { usePage } from '@ozmos/viper-vue';
import { useRouter } from 'vue-router';
import { cn } from '@/lib/utils';
import { GalleryVerticalEnd } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput.vue';
import { route } from '@/pages/routes';

const page = usePage<ViperGen.AuthGroupRegister>();
const router = useRouter();

const form = page.useForm('register', {
  state: {
    name: '',
    email: '',
    password: '',
  },
  onSuccess() {
    router.push('/home');
  },
});
</script>

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
          <h1 class="text-xl font-bold">Welcome to Acme Inc.</h1>
          <div class="text-center text-sm">
            Already have an account?
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
            label="Name"
            type="name"
            id="name"
            placeholder="Jane Doe"
            required
            v-model="form.state.value.name"
            :error="form.errors.value.name"
          />
          <FormInput
            label="Email"
            type="email"
            id="email"
            placeholder="m@example.com"
            required
            v-model="form.state.value.email"
            :error="form.errors.value.email"
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
            Sign Up
          </Button>
        </div>
      </div>
    </form>
    <div
      class="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
    >
      By clicking continue, you agree to our
      <a href="#">Terms of Service</a>
      and
      <a href="#">Privacy Policy</a>
      .
    </div>
  </div>
</template>
