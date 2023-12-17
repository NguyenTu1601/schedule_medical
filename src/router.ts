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
  // const { account, getProfileIfNotExist, updateUserSetting, userSetting } = useAccount();
  // let initEnvP = initEnv();
  // router.beforeEach(async (to, from, next) => {
  //   await initEnvP;
  //   let isSetLocale = false;
  //   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  //   async function setLocale() {
  //     return;
  //     if(isSetLocale) return;
  //     isSetLocale = true;
     
  //     let locale = await userSetting();
  //     if(!locale) {
  //       isSetLocale = false;
  //       return;
  //     }
   
  //     if (locale.user_setting.locale != LanguageStorage.getLanguage()) {
  //       LanguageStorage.setLanguage(locale.user_setting.locale);
  //       LanguageStorage.saveLanguageCookies(locale.user_setting.locale);
  //       await updateUserSetting({locale: locale.user_setting.locale})
  //       if(to.fullPath == '/profile')
  //         window.location.href = `${window.location.origin}/my-ticket`;
  //       else {
  //         window.location.href = `${window.location.origin}${to.fullPath}`;
  //       }
          
  //     }
      
  //     isSetLocale = true;
  //     return;
  //   }

  //   setLocale();
  //   if (!requiresAuth || account.value) {
  //     await getProfileIfNotExist();

  //     await setLocale();

  //     if (
  //       requiresAuth &&
  //       account.value &&
  //       account.value.account_status === 'verifying'
  //     ) {
  //       next({
  //         name: 'verify_code',
  //         query: {
  //           username: account.value.email || account.value.phone_number,
  //         },
  //       });
  //       return null;
  //     }
  //     next();
  //     setTimeout(() => {
  //       window.scrollTo({
  //         top: 0,
  //         left: 0,
  //         behavior: 'smooth'
  //       });
  //     }, 200);
  //     return null;
  //   }
    

  //   let p = getProfileIfNotExist();
  //   return p
  //     .then(async (res) => {
  //       await setLocale();
  //       if (account.value && account.value.account_status === 'verifying') {
  //         next({
  //           name: 'verify_code',
  //           query: {
  //             username: account.value.email || account.value.phone_number,
  //           },
  //         });
  //         return null;
  //       }
  //       if (res == 'MISS_TOKEN') {
  //         next({
  //           name: 'sign_in',
  //           query: { redirect: to.fullPath},
  //         });
  //       }
  //       next();
  //       setTimeout(() => {
  //         window.scrollTo({
  //           top: 0,
  //           left: 0,
  //           behavior: 'smooth'
  //         });
  //       }, 200);
  //       return null;
  //     })
  //     .catch(() => {
  //       next({ name: 'sign_in', query: { redirect: to.fullPath} });
  //     });
  // });
}

export default router;
