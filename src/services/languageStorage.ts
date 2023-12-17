import store from 'store';
import Cookies from 'js-cookie';
const LANGUAGE_STORAGE = 'language';

function getLanguage() {
  return store.get(LANGUAGE_STORAGE) || 'vi';
}

function getLanguageCookies() {
  return Cookies.get(LANGUAGE_STORAGE) || null;
}

export function saveLanguageCookies(token: string) {
  let splitDomain = window.location.host.split('.');
  let pathDomain = '';
  if (splitDomain.length - 2 >= 0) {
    if (splitDomain.length > 2) {
      splitDomain.shift();
    }
    pathDomain = '.' + splitDomain.join('.');
  }
  Cookies.set(LANGUAGE_STORAGE, token, { expires: 365 * 10, domain: pathDomain });
}

function setLanguage(name: string) {
  store.set(LANGUAGE_STORAGE, name);
}

export default {
  saveLanguageCookies,
  getLanguageCookies,
  getLanguage,
  setLanguage,
};
