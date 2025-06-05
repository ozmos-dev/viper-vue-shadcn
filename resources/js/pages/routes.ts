import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordInfo } from 'vue-router';
import { route as routeFn } from 'ziggy-js';

export interface RouteNamedMap {
        'Layout': RouteRecordInfo<'Layout', '/', Record<never, never>, Record<never, never>, never>;
        'Index': RouteRecordInfo<'Index', '/', Record<never, never>, Record<never, never>, never>;
        'AppGroupLayout': RouteRecordInfo<'AppGroupLayout', '/', Record<never, never>, Record<never, never>, never>;
        'AppGroupHome': RouteRecordInfo<'AppGroupHome', '/home', Record<never, never>, Record<never, never>, never>;
        'AuthGroupLayout': RouteRecordInfo<'AuthGroupLayout', '/', Record<never, never>, Record<never, never>, never>;
        'AuthGroupLogin': RouteRecordInfo<'AuthGroupLogin', '/login', Record<never, never>, Record<never, never>, never>;
        'AuthGroupRegister': RouteRecordInfo<'AuthGroupRegister', '/register', Record<never, never>, Record<never, never>, never>;
        'AppGroupProfileLayout': RouteRecordInfo<'AppGroupProfileLayout', '/profile/', Record<never, never>, Record<never, never>, never>;
        'AppGroupProfileIndex': RouteRecordInfo<'AppGroupProfileIndex', '/profile/', Record<never, never>, Record<never, never>, never>;
        'AppGroupProfilePassword': RouteRecordInfo<'AppGroupProfilePassword', '/profile/password', Record<never, never>, Record<never, never>, never>;
        'AuthGroupForgotPassword': RouteRecordInfo<'AuthGroupForgotPassword', '/forgot-password', Record<never, never>, Record<never, never>, never>;
        'AppGroupProfileAppearance': RouteRecordInfo<'AppGroupProfileAppearance', '/profile/appearance', Record<never, never>, Record<never, never>, never>;
        'AuthGroupResetPasswordTokenParam': RouteRecordInfo<'AuthGroupResetPasswordTokenParam', '/reset-password/:token', {'token': string}, {'token': string}, never>;
};

const routes = [
    {
        "path": "",
        "component": () => import('./_layout.vue'),
        "children": [
            {
                "path": "",
                "component": () => import('./index.vue')
            },
            {
                "path": "",
                "component": () => import('./(app)/_layout.vue'),
                "children": [
                    {
                        "path": "home",
                        "component": () => import('./(app)/home.vue')
                    },
                    {
                        "path": "profile",
                        "component": () => import('./(app)/profile/_layout.vue'),
                        "children": [
                            {
                                "path": "",
                                "component": () => import('./(app)/profile/index.vue')
                            },
                            {
                                "path": "password",
                                "component": () => import('./(app)/profile/password.vue')
                            },
                            {
                                "path": "appearance",
                                "component": () => import('./(app)/profile/appearance.vue')
                            }
                        ]
                    }
                ]
            },
            {
                "path": "",
                "component": () => import('./(auth)/_layout.vue'),
                "children": [
                    {
                        "path": "login",
                        "component": () => import('./(auth)/login.vue')
                    },
                    {
                        "path": "register",
                        "component": () => import('./(auth)/register.vue')
                    },
                    {
                        "path": "forgot-password",
                        "component": () => import('./(auth)/forgot-password.vue')
                    },
                    {
                        "path": "reset-password/:token",
                        "component": () => import('./(auth)/reset-password/[token].vue')
                    }
                ]
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

declare module 'vue-router' {
    interface TypesConfig {
        RouteNamedMap: RouteNamedMap
    }
}

export const route: typeof routeFn = ((...args: Parameters<typeof routeFn>) => {
  args[2] = false;
  return routeFn(...args);
}) as typeof routeFn;
