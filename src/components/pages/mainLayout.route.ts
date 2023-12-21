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
        path: '/list/specialty/',
        name: 'specialty_list',
        component: () => import('@/components/pages/specialty/SpecialtyListPage.vue'),
      },
      {
        path: '/detail/doctor/:id',
        name: 'doctor_detail',
        component: () => import('@/components/pages/doctor/DoctorDetailPage.vue'),
      },
      {
        path: '/list/doctor/',
        name: 'doctor_list',
        component: () => import('@/components/pages/doctor/DoctorListPage.vue'),
      },
      {
        path: '/detail/clinic/:id',
        name: 'clinic_detail',
        component: () => import('@/components/pages/clinic/ClinicDetailPage.vue'),
      },
      {
        path: '/list/clinic/',
        name: 'clinic_list',
        component: () => import('@/components/pages/clinic/ClinicListPage.vue'),
      }
    ],
  };

  routes.push(defaultRoute);
}
