<template>
  <div class="flex flex-col items-center justify-center p-12 @container">
    <h1 class="text-4xl font-medium">Your New Viper App</h1>
    <h2 class="text-muted-foreground mt-2">
      Everything you need to start building
    </h2>

    <div
      class="mt-12 w-full grid grid-cols-1 @min-[800px]:grid-cols-2 @min-[1200px]:grid-cols-4 gap-4"
    >
      <HomeCard
        title="Forms & Mutations"
        description="Call api's without writing any endpoints"
      >
        <div class="space-y-2">
          <FormInput
            id="demo-input"
            label="Enter a number less than 10 to see an error"
            v-model="formTest.state.value.number"
            :error="formTest.errors.value.number"
          />
          <Button
            @click="formTest.mutate()"
            :loading="formTest.isPending.value"
          >
            Submit
          </Button>
        </div>
      </HomeCard>
      <HomeCard
        title="Props"
        description="Server data in your page with no manual wiring"
      >
        <div class="space-y-2">
          <p>{{ serverTime }}</p>
          <Button @click="refetchTime()" :loading="refetchLoading">
            Refetch
          </Button>
        </div>
      </HomeCard>
      <HomeCard
        title="Lazy Props"
        description="Fetch data only when you need it"
      >
        <p>{{ lazyTime || 'Not fetched yet' }}</p>

        <template #footer>
          <Button @click="refetchLazyTime()" :loading="lazyTimeLoading">
            Fetch
          </Button>
        </template>
      </HomeCard>
      <HomeCard
        title="Theme Selector and Dark Mode"
        description="Stored in cookies so no flashing on load"
      >
        <div class="space-y-4">
          <AppearanceTabs />
          <div class="flex items-center gap-2">
            <span>Theme:</span>
            <ThemeSelector />
          </div>
          <p>
            Find more at
            <a class="underline" href="https://tweakcn.com/" target="_blank">
              tweakcn.com
            </a>
          </p>
        </div>
      </HomeCard>
      <HomeCard
        title="Status Toasts"
        description="Styled notifications built in"
      >
        <div class="flex gap-2">
          <Button @click="toast.success('Saved!')">Success</Button>
          <Button @click="toast.error('Uh oh!')">Error</Button>
        </div>
      </HomeCard>
      <HomeCard
        title="Password Confirmation"
        description="Require authorization before continuing"
      >
        <PasswordConfirmation :on-confirm="onPasswordConfirm">
          <Button>Perform Secure Operation</Button>
        </PasswordConfirmation>
      </HomeCard>
      <HomeCard
        title="Profile Settings"
        description="Ready to go forms for password changes and profile updates"
      >
        <Button as-child>
          <router-link :to="route('profile')">Visit profile</router-link>
        </Button>
      </HomeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button';
import HomeCard from '@/components/HomeCard.vue';
import FormInput from '@/components/FormInput.vue';
import { usePage } from '@ozmos/viper-vue';
import { toast } from 'vue-sonner';
import PasswordConfirmation from '@/components/PasswordConfirmation.vue';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import { route } from '@/pages/routes';
import ThemeSelector from '@/components/ThemeSelector.vue';

const page = usePage<ViperGen.AppGroupHome>();

const {
  data: serverTime,
  refetch: refetchTime,
  isFetching: refetchLoading,
} = page.useQuery('serverTime');

const {
  data: lazyTime,
  refetch: refetchLazyTime,
  isFetching: lazyTimeLoading,
} = page.useQuery('lazyServerTime');

const formTest = page.useForm('formsTest', {
  state: {
    number: '',
  },
  onSuccess() {
    formTest.reset();
    toast.success('Form submitted');
  },
});

function onPasswordConfirm() {
  alert('Password confirmed!');
}
</script>
