import '../css/app.css';
import { createApp, h } from 'vue';
import { RouterView } from 'vue-router';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { ViperPlugin } from '@ozmos/viper-vue';
import { router } from './pages/routes';
import { initializeAppearance } from '@/composables/use-appearance';
import NProgress from 'nprogress';
import { initializeTheme } from '@/composables/use-theme';

const queryClient = new QueryClient();

router.beforeEach((_to, _from, next) => {
  NProgress.start();
  return next();
});

router.afterEach(() => {
  NProgress.done();
});

createApp({ render: () => h(RouterView) })
  .use(router)
  .use(VueQueryPlugin, { queryClient })
  .use(ViperPlugin, {
    router,
    queryClient,
    formatTitle: title => title || 'Laravel',
  })
  .mount(document.getElementById('app')!);

initializeAppearance();
initializeTheme();
