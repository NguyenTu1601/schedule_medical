import axios, { eventObservable } from './axios';
import { AxiosPromise } from 'axios';
import { omit, forIn } from 'lodash-es';

import accountStorage from '@/services/accountStorage';
const staticEnv = (import.meta as any).env;

const http = {
  client: axios,
  callApi,
  eventObservable,
};

const apiResources: any = {
  account: {
    login: {
      url: '/api/User/Login',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    signUp: {
      url: '/api/v1/user/signup',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    getProfile: {
      url: '/api/User/getProfile',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
  },
  user: {
    listUser: {
      url: '/api/User/getListUser?userid={userid}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    listRole: {
      url: '/api/User/getListRole',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    createUser: {
      url: '/api/User/createUser',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    editUser: {
      url: '/api/User/editUser',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    deleteUser: {
      url: '/api/User/deleteUser',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    },
    listHocvi: {
      url: '/api/User/getListHocVi',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
    }
  },
  doctor: {
    listDoctor: {
      url: '/api/Doctor/getListDoctor',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    createSchedule: {
      url: '/api/Doctor/createSchedule',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    createHistory: {
      url: '/api/Doctor/createHistoryByDoctor',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    }
  },
  clinic: {
    listClinic: {
      url: '/api/Clinic/getListClinic',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    createClinic: {
      url: '/api/Clinic/createClinic',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    updateClinic: {
      url: '/api/Clinic/updateClinic',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
  },
  file: {
    upload: {
      url: '/SalesUpERP/upSvl',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
  },
  specialty: {
    listSpecialty: {
      url: '/api/Specialty/getListSpecialty',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    createSpecialty: {
      url: '/api/Specialty/createSpecialty',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    updateSpecialty: {
      url: '/api/Specialty/updateSpecialty',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    deleteSpecialty: {
      url: '/api/Specialty/deleteSpecialtyById?id={id}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
  },
  medicine: {
    listMedicine: {
      url: '/api/Medicine/getListMedicine?keyword={keyword}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    listMedicineByCode: {
      url: '/api/Medicine/getListMedicine?keyword={keyword}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    createMedicine: {
      url: '/api/Medicine/createMedicine',
      verb: 'POST',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    }
  },
  booking: {
    listAccess: {
      url: '/api/Booking/getListBookingAccess?macode={macode}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    },
    detailBooking: {
      url: '/api/Booking/getDetailBooking?bookingId={bookingId}',
      verb: 'GET',
      baseUrl: staticEnv.ACC_NEW_API_URL,
      requiredToken: true,
    }
  }
};

export default http;

interface CallApiParams {
  resource: string;
  data?: object;
  headers?: object;
  config?: object;
}

function callApi(params: CallApiParams): AxiosPromise {
  const apiSplit = params.resource.split('.');
  const module = apiSplit[0];
  const method = apiSplit[1];
  const fullResource = apiResources[module][method];
  let url: string =
    (fullResource.baseUrl ? fullResource.baseUrl() : '') + fullResource.url;
  const data: any = params.data || {};
  const urlParams = omit(data, ['body']);
  const headers =
    fullResource.headers || params.headers
      ? Object.assign(
        {},
        axios.defaults.headers,
        fullResource.headers,
        params.headers,
      )
      : axios.defaults.headers;

  forIn(urlParams, (value, key) => {
    if (value) {
      url = url.replace('{' + key + '}', value);
    } else {
      const reg = new RegExp(key + '={' + key + '}&?');
      url = url.replace(reg, '');
    }
  });

  url = url.replace(/[&\?]$/, '');
  let p = Promise.resolve();
  if (fullResource.requiredToken) {
    p = p
      .then(() => {
        return accountStorage.getToken();
      })
      .then((token) => {
        if (token) {
          headers.Authorization = `${token}`;
        }
      });
  }
  if (fullResource.requiredToken === false) {
    delete headers.Authorization;
  } else if (!headers.Authorization) {
    headers.Authorization = '';
  }

  return p.then(() => {
    const config = Object.assign(
      {
        method: fullResource.verb,
        url,
        data: data.body,
        headers,
      },
      params.config,
    );
    return axios.request(config).catch((e) => {
      throw e;
    });
  });
}
