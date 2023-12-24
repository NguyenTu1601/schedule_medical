export default function init(routes: any[]) {
  const defaultRoute = {
    path: '/',
    component: () => import('@/components/layouts/emptyLayout/EmptyLayout.vue'),
    children: [
      {
        path: '/report',
        name: 'report',
        component: () => import('@/components/pages/admin/user/ReportPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
