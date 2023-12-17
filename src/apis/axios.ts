import axios from 'axios';
import EventEmitter from '@/services/eventEmitter';

let eventEmitter = new EventEmitter();
export let eventObservable = eventEmitter.asObservable();

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || window.location.origin,
  // withCredentials: true,
});

instance.interceptors.request.use(config => {
  if (config && config.url) {
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
  }

  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      eventEmitter.emit(error.response.status.toString(), error);
    }

    return Promise.reject(error);
  },
);

export default instance;