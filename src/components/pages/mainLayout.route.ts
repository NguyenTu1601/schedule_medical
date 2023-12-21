export default function init(routes: any[]) {
  const defaultRoute = {
    path: '/',
    component: () => import('@/components/layouts/mainLayout/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/components/pages/home/HomePage.vue'),
      },
      {
        path: '/detail/specialty/:id',
        name: 'specialty',
        component: () => import('@/components/pages/home/HomePage.vue'),
      },
      {
        path: '/detail/doctor/:id',
        name: 'doctor_detail',
        component: () => import('@/components/pages/doctor/DoctorDetailPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
