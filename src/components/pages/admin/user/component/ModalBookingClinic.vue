<template lang="pug">
div.overflow-y-auto
  div.text-xl.font-bold Thông tin lịch hẹn

  div.mt-4.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Mã lịch hẹn:
      div.text-base {{ bookingClinic?.bookingCode }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Số thứ tự
      div.text-base {{ bookingClinic?.bookingStt }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Nhóm máu:
      div.text-base {{ bookingClinic?.nhommau }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tên bệnh nhân:
      div.text-base {{ bookingClinic?.PatientName }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tái khám:
      img.w-5.h-5(v-if='bookingClinic && bookingClinic?.isTaikham===1' src='../assets/check.svg')
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Giá tiền:
      div.text-base {{ bookingClinic?.price }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Email bệnh nhân:
      div.text-base {{ bookingClinic?.emailPatient }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Ngày khám:
      div.text-base {{ bookingClinic?.date }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tên bác sĩ:
      div.text-base {{ bookingClinic?.DoctorName }}
    div.flex-1.flex.gap-2

  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave()")
      div(v-if='step===1') {{  bookingClinic.statusId===1?'Xác nhận thanh toán':'In phiếu'}}
      div(v-if='step===2') In phiếu
</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue"
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import RowMedicineBooking from "./RowMedicineBooking.vue"
import { ElNotification } from "element-plus";

const emits = defineEmits(['cancel'])
const props = defineProps(['bookingClinic'])
const bookingAccessToPay = ref()
const step = ref(1)

const bookingClinic = computed(() => {
  return props.bookingClinic
})


// async function getDetailBooking() {
//   const form = {
//     historyId: bookingClinic.value.historyId
//   }
//   await UserApis.getDetailHistoryByDoctor(form).then(res => {
//     detailBooking.value = res.content
//   })
// }
async function getBookingAccessToPay() {
  const form = {
    bookingId: bookingClinic.value.bookingId
  }
  UserApis.getBookingAccessToPay(form).then(res => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: res.message,
        type: 'success',
      });
    }
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    step.value = 2
    bookingAccessToPay.value = res.content
  })
}

function handleSave() {
  if (bookingClinic.value.statusId === 1) {
    getBookingAccessToPay()
  }
}

function handleCancel(type) {
  emits('cancel', type)
}


</script>

<style scoped>
:global(.el-select .el-input__inner:focus) {
  box-shadow: 0px 0px;
}

:global(.el-select .el-input.is-focus .el-input__inner) {
  box-shadow: 0 0 0 1px #1F1F1F;
}

:global(.el-input__inner) {
  padding: 8px !important;
}

:global(.el-date-editor.el-input) {
  width: 100% !important;
  height: 38px !important;
}

:global(.el-input__prefix-inner) {
  display: none;
}

:global(.el-input--large .el-input__inner) {
  height: 38px !important;
}

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