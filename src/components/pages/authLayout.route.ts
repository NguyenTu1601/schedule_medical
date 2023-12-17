export default function init(routes: any[]) {
  const defaultRoute = {
    path: '/',
    component: () => import('@/components/layouts/authenLayout/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/components/pages/auth/AuthPage.vue'),
      },
      {
        path: '/sign-up',
        name: 'signup',
        component: () => import('@/components/pages/auth/AuthPage.vue'),
      },
      {
        path: '/verify',
        name: 'verify',
        component: () => import('@/components/pages/auth/VerifyPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
