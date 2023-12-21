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
        name: 'specialty_detail',
        component: () => import('@/components/pages/specialty/SpecialtyDetailPage.vue'),
      },
      {
        path: '/detail/doctor/:id',
        name: 'doctor_detail',
        component: () => import('@/components/pages/doctor/DoctorDetailPage.vue'),
      },
      {
        path: '/detail/clinic/:id',
        name: 'clinic_detail',
        component: () => import('@/components/pages/clinic/ClinicDetailPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
