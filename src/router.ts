import { createRouter, createWebHistory } from 'vue-router';
import mainLayoutRoute from '@/components/pages/mainLayout.route';
import authLayoutRoute from '@/components/pages/authLayout.route';
import adminLayoutRoute from '@/components/pages/adminLayout.route';
// import useAccount from '@/compositions/useAccount';
// import { init as initEnv } from '@/services/environmentVariables';
// import LanguageStorage from '@/services/languageStorage';

const routes = buildRoutes();
let router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

updateTitlePage();
guardNavigation();

function buildRoutes(): any[] {
  const vueRoutes: any[] = [];
  vueRoutes.push({
    path: '/:pathMatch(.*)*',
    redirect: {
      name: 'home',
    },
  });
  mainLayoutRoute(vueRoutes);
  authLayoutRoute(vueRoutes);
  adminLayoutRoute(vueRoutes);

  return vueRoutes;
}

function updateTitlePage() {

}

function guardNavigation() {
  // const { account } = useAccount();

}

export default router;
