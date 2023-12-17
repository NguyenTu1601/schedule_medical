export default function init(routes: any[]) {
  const defaultRoute = {
    path: '/',
    component: () => import('@/components/layouts/adminLayout/AdminLayout.vue'),
    children: [
      {
        path: '/manager/:role',
        name: 'manager',
        component: () => import('@/components/pages/admin/user/ManagerPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
