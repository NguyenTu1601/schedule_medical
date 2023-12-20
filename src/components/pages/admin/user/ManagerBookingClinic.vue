<template lang="pug">
div
  div.gap-4
    div.text-base.font-semibold.mt-4 Quản lý lịch hẹn
    div.flex.justify-start.mt-4
      div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Tạo lịch hẹn
    div.flex.justify-end
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
        input.outline-none.text-base.w-full(v-model='searchInput')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')

  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Mã lịch hẹn
      td.p-2(class='') Số thứ tự
      td.p-2(class='') Bệnh nhân
      td.p-2(class='') Bác sĩ
      td.p-2(class='') Ngày
      td.p-2(class='') Trạng thái
      td.p-2(class='w-[80px]') Action
    tr(v-for='item in listBooking')
      td.p-2(class='') {{ item.bookingCode }}
      td.p-2(class='') {{ item.bookingStt }}
      td.p-2(class='') {{ item.PatientName }}
      td.p-2(class='') {{ item.DoctorName }}
      td.p-2(class='') {{ item.date }}
      td.p-2(class='') {{ item.trangthai }}
      td
        div.flex.justify-center
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/eye.svg' @click='handleViewBooking(item)')
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalBookingClinic(v-if='isShow' @cancel='handleCancel' :bookingClinic='bookingClinic')
    div(v-else)
  el-dialog(v-model="isShowAdd" title="" width='1000px' @close='handleClose')
    ModalAddBookingClinic(v-if='isShowAdd' @cancel='handleCancelAdd' :bookingClinicAdd='bookingClinicAdd')
    div(v-else)
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import MedicineApis from '@/apis/user'
import { onMounted } from 'vue';
import ModalBookingClinic from './component/ModalBookingClinic.vue'
import ModalAddBookingClinic from './component/ModalAddBookingClinic.vue'
import { refDebounced } from '@vueuse/core'
import { ElNotification } from 'element-plus';

const listBooking = ref([])
const isShow = ref(false)
const isShowAdd = ref(false)
const bookingId = ref()
const searchInput = ref('')
const debounced = refDebounced(searchInput, 500)

const bookingClinic = ref({
  bookingId: '',
  bookingCode: '',
  bookingStt: '',
  DoctorName: '',
  PatientName: '',
  date: '',
  buoi: '',
  nhommau: '',
  health_status: '',
  isTaikham: '',
  age: '',
  price: '',
  emailPatient: '',
  scheduleId: '',
})

const bookingClinicAdd = ref({
  scheduleId: '',
  healthstatus: '',
  nhommau: '',
  isTaiKham: false,
  emailPatient: '',
  namePatient: '',
  dob: '',
  phonenumber: '',
  address: '',
  age: '',
})
watch(debounced, async () => {
  const form = {
    keyword: debounced.value.length > 0 ? debounced.value : "0"
  }
  await MedicineApis.getListBookingNeedToPay(form).then(res => {
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    listBooking.value = res.content
  })
})
async function getlistBooking() {
  const form = {
    keyword: '0'
  }
  await MedicineApis.getListBookingNeedToPay(form).then(res => {
    listBooking.value = res.content
  })
}

function handleAdd() {
  isShowAdd.value = true
}

function handleViewBooking(item) {
  isShow.value = true
  bookingClinic.value = item
}

async function handleCancel(val) {
  await getlistBooking()
  isShow.value = false
}

function handleClose() {
  getlistBooking()
}
onMounted(() => {
  getlistBooking()
})

</script>

<style scoped>
table {
  /* border: 1px solid #1F1F1F; */
  border-collapse: collapse;
}

td,
th,
tr,
table {
  border: 1px solid #1F1F1F;
  padding: 8px;
  font-size: 14px;
}

:global(.el-dialog__header) {
  padding: 0px;
}

:global(.el-dialog__footer) {
  padding: 0px;
}
</style>