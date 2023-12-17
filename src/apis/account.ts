import http from './http';
import AccountStorage from '@/services/accountStorage';

export function login(form): Promise<any> {
  return http
    .callApi({
      resource: 'account.login',
      data: {
        body: {
          ...form,
        },
      },
    })
    .then((res: any) => {
      AccountStorage.saveToken(res.data.content[0].authorization);
      return res.data;
    });
}

export function signUp(form: any): Promise<any> {
  return http
    .callApi({
      resource: 'account.signUp',
      data: {
        body: form,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((res) => {
      const error = (res as any).response.data;
      return Promise.reject(error);
    });
}



export default {
  login,
  signUp,
};
