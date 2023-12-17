import Cookies from 'js-cookie';
const ACCOUNT_STORAGE_PREFIX = 'account.';
const TOKEN = ACCOUNT_STORAGE_PREFIX + 'token';
const REQUIRES = ACCOUNT_STORAGE_PREFIX + 'requires';

export function isLoggedIn() {
  let token = getToken();
  return token ? true : false;
}

export function getToken(): Promise<string> {
  return Promise.resolve(Cookies.get(TOKEN));
}

export function saveToken(token: string) {
  let splitDomain = window.location.host.split('.');
  let pathDomain = '';
  if (splitDomain.length - 2 >= 0) {
    if (splitDomain.length > 2) {
      splitDomain.shift();
    }

    pathDomain = '.' + splitDomain.join('.');
  }

  Cookies.set(TOKEN, token, { expires: 365 * 10, domain: pathDomain });
}

export function removeToken() {
  let splitDomain = window.location.host.split('.');
  let pathDomain = '';
  if (splitDomain.length - 2 >= 0) {
    if (splitDomain.length > 2) {
      splitDomain.shift();
    }

    pathDomain = '.' + splitDomain.join('.');
  }

  Cookies.remove(TOKEN, { domain: pathDomain });
}

export function logOut() {
  removeToken();
  removeRequires();
}

export function getRequires() {
  let requires = Cookies.get(REQUIRES);
  return requires ? JSON.parse(requires) : {};
}

export function saveRequires(requires: Object) {
  let format = JSON.stringify(requires);
  Cookies.set(REQUIRES, format, { expires: 365 * 10 });
}

export function removeRequires() {
  Cookies.remove(REQUIRES);
}

export default {
  isLoggedIn,
  getToken,
  saveToken,
  removeToken,
  logOut,
  getRequires,
  saveRequires,
  removeRequires,
};
