export default function init(routes: any[]) {
  const defaultRoute = {
    path: '/',
    component: () => import('@/components/layouts/emptyLayout/EmptyLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/components/pages/emptyLayout/HomePage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
