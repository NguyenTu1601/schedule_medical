import { createI18n } from 'vue-i18n';
import LanguageStorage from '@/services/languageStorage';
import viLang from './i18n/vi';
import enLang from './i18n/en';

export async function loadLocale() {
  let locale = 'vi';
  let paramsString = window.location.search;
  let searchParams = new URLSearchParams(paramsString);
  let queryLang = LanguageStorage.getLanguageCookies() || null;
  const langCode = ['en', 'vi', 'ko'];
  if (queryLang && langCode.indexOf(queryLang) != -1) {
    locale = queryLang;
  } else if (!LanguageStorage.getLanguage()) {
    locale = 'vi';
  } else {
    locale = LanguageStorage.getLanguage();
  }

  LanguageStorage.setLanguage(locale);
  LanguageStorage.saveLanguageCookies(locale);

  return createI18n({
    locale,
    legacy: false,
    messages: {
      vi: viLang,
      en: enLang,
    },
    fallbackLocale: 'vi',
    globalInjection: true,
  });
}

export default { loadLocale };
