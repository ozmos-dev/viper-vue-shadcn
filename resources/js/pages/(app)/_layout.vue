<template>
  <SidebarProvider>
    <AppSidebar @logout="logout.mutate({})" :user="user" />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <template v-for="(crumb, i) in breadcrumbs" :key="crumb.id">
                <BreadcrumbItem
                  class="hidden md:block"
                  v-if="i !== breadcrumbs.length - 1"
                >
                  <BreadcrumbLink as-child>
                    <router-link :to="crumb.href">
                      {{ crumb.label }}
                    </router-link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem v-if="i === breadcrumbs.length - 1">
                  <BreadcrumbPage>
                    {{ crumb.label }}
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator
                  class="hidden md:block"
                  v-if="i !== breadcrumbs.length - 1"
                />
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <router-view></router-view>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Crumb {
  label: string;
  id: string;
  href: string;
}

const breadcrumbs = ref<Crumb[]>([
  { id: 'root', href: '/home', label: 'Home' },
]);

export function useBreadcrumb(crumb: Crumb | Omit<Crumb, 'href'>) {
  onMounted(() => {
    breadcrumbs.value.push({
      href: router?.currentRoute.value.path ?? '#',
      ...crumb,
    });
  });

  onUnmounted(() => {
    breadcrumbs.value = breadcrumbs.value.filter(x => x.id !== crumb.id);
  });
}
</script>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar.vue';
import { usePage } from '@ozmos/viper-vue';
import { router } from '@/pages/routes';

const page = usePage<ViperGen.AppGroupLayout>();

const { data: user } = page.useQuery('user');

const logout = page.useMutation('logout', {
  onSuccess() {
    router.push('/login');
  },
});
</script>

<php>
use App\Data\UserData;
use Ozmos\Viper\Attrs;

return new
#[Attrs\Middleware(['auth'])]
class {
    #[Attrs\Prop()]
    public function user(): UserData
    {
        return UserData::from(request()->user());
    }

    #[Attrs\Action()]
    public function logout()
    {
        auth()->logout();
    }

    #[Attrs\Action()]
    public function confirmPassword()
    {
        if (!\Hash::check(request()->password, request()->user()->password)) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'password' => ['Invalid password']
            ]);
        }

        request()->session()->passwordConfirmed();

        return ['ok' => true];
    }
};
</php>
