import http from './http';

export function getListUser(form): Promise<any> {
  return http
    .callApi({
      resource: 'user.listUser',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListRole(): Promise<any> {
  return http
    .callApi({
      resource: 'user.listRole',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListHocvi(): Promise<any> {
  return http
    .callApi({
      resource: 'user.listHocvi',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListDoctor(): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.listDoctor',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function listDoctorByToken(): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.listDoctorByToken',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createUser(form): Promise<any> {
  return http
    .callApi({
      resource: 'user.createUser',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function editUser(form): Promise<any> {
  return http
    .callApi({
      resource: 'user.editUser',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function deleteUser(form): Promise<any> {
  return http
    .callApi({
      resource: 'user.deleteUser',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListMedicine(form): Promise<any> {
  return http
    .callApi({
      resource: 'medicine.listMedicine',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getDoctorById(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.doctorById',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListScheduleByDate(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.getListScheduleByDate',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function deleteSpecialty(form): Promise<any> {
  return http
    .callApi({
      resource: 'specialty.deleteSpecialty',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createMedicine(form): Promise<any> {
  return http
    .callApi({
      resource: 'medicine.createMedicine',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function deleteMedicine(form): Promise<any> {
  return http
    .callApi({
      resource: 'medicine.deleteMedicine',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function updateMedicine(form): Promise<any> {
  return http
    .callApi({
      resource: 'medicine.updateMedicine',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createScheduleDoctor(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.createSchedule',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListClinic(): Promise<any> {
  return http
    .callApi({
      resource: 'clinic.listClinic',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createClinic(form): Promise<any> {
  return http
    .callApi({
      resource: 'clinic.createClinic',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function updateClinic(form): Promise<any> {
  return http
    .callApi({
      resource: 'clinic.updateClinic',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListSpecialty(): Promise<any> {
  return http
    .callApi({
      resource: 'specialty.listSpecialty',
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createSpecialty(form): Promise<any> {
  return http
    .callApi({
      resource: 'specialty.createSpecialty',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function updateSpecialty(form): Promise<any> {
  return http
    .callApi({
      resource: 'specialty.updateSpecialty',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListAccessBooking(form): Promise<any> {
  return http
    .callApi({
      resource: 'booking.listAccess',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getDetailBooking(form): Promise<any> {
  return http
    .callApi({
      resource: 'booking.detailBooking',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getListBookingNeedToPay(form): Promise<any> {
  return http
    .callApi({
      resource: 'booking.listBookingNeedToPay',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function getBookingAccessToPay(form): Promise<any> {
  return http
    .callApi({
      resource: 'booking.bookingAccessToPay',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}

export function getListHistoryByDoctor(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.getHistoryByDoctor',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}

export function getDetailHistoryByDoctor(form): Promise<any> {
  return http
    .callApi({
      resource: 'history.detailHistoryByDoctor',
      data: {
        ...form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createHistoryByDoctor(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.createHistory',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createBookingByAdmin(form): Promise<any> {
  return http
    .callApi({
      resource: 'booking.createBookingByAdmin',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export function createDoctor(form): Promise<any> {
  return http
    .callApi({
      resource: 'doctor.createDoctor',
      data: {
        body: form,
      },
    })
    .then((res: any) => {
      return res.data;
    });
}
export default {
  getListUser,
  getListRole,
  createUser,
  getListHocvi,
  getListDoctor,
  getListMedicine,
  createMedicine,
  createScheduleDoctor,
  getListClinic,
  createClinic,
  getListSpecialty,
  createSpecialty,
  getListAccessBooking,
  getDetailBooking,
  createHistoryByDoctor,
  editUser,
  deleteUser,
  updateSpecialty,
  deleteSpecialty,
  updateClinic,
  getListHistoryByDoctor,
  getDetailHistoryByDoctor,
  listDoctorByToken,
  deleteMedicine,
  updateMedicine,
  getListBookingNeedToPay,
  getBookingAccessToPay,
  getListScheduleByDate,
  createBookingByAdmin,
  createDoctor,
  getDoctorById
};
