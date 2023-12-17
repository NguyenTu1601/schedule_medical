import { createApp } from 'vue';
import App from './App.vue';
import '@vant/touch-emulator'; // Just import this module, then Vant works in PC browser
import i18n from './i18n';
import { createHead } from '@vueuse/head';
// import dayjsDirective from '@/directives/dayjs';
// import clipboardDirective from '@/directives/clipboard';
import ElementPlus from 'element-plus';
import en from 'element-plus/es/locale/lang/en';
import vi from 'element-plus/es/locale/lang/vi';

export async function initApp(
  router,
  rootContainer: string | Element = '#app',
) {
  let locale = await i18n.loadLocale();
  const app = createApp(App);
  app.use(ElementPlus, { locale: locale.global.locale == 'en' ? en : vi });
  app.use(router);
  app.use(locale);

  app.config.compilerOptions.isCustomElement = (tag) =>
    tag.startsWith('emoji-picker') || tag.startsWith('duet-date-picker');

  app.mount(rootContainer);
  // importDirectives(app);

  return app;
}

// function importDirectives(app) {
//   dayjsDirective(app);
//   clipboardDirective(app);
// }
