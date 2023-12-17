import http from './http';


export function upload(form): Promise<any> {
  return http
    .callApi({
      resource: 'file.upload',
      data: {
        body: form,
      },
    })
    .then(res => res.data);
}

export default {
  upload,

};
