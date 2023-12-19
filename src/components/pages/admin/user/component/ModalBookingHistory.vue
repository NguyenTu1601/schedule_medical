<template lang="pug">
div.overflow-y-auto
  div.text-xl.font-bold Thông tin lịch sử khám bệnh

  div.mt-4.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Mã bệnh án:
      div.text-base {{ detailBooking?.historyCode }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tên bệnh nhân:
      div.text-base {{ detailBooking?.patientName }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Ngày tái khám:
      div.text-base {{ detailBooking?.re_examinationDate }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tuổi:
      div.text-base {{ detailBooking?.age }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Lời khuyên:
      div.text-base {{ detailBooking?.advice }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Chuẩn đoán:
      div.text-base {{ detailBooking?.diagnostic }}
  div
    table.w-full.mt-4
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='') Mã thuốc
        td.p-2(class='') Tên thuốc
        td.p-2(class='') Thông tin
        td.p-2(class='') Số liều 1 ngày
        td.p-2(class='') Đơn vị
        td.p-2(class='') Đơn giá
        td.p-2(class='') Thành tiền
      tr(v-if='detailBooking && detailBooking.medicines' v-for='item in detailBooking.medicines')
        td.p-2(class='') {{ item.mathuoc }}
        td.p-2(class='') {{ item.name }}
        td.p-2(class='') {{ item.description }}
        td.p-2(class='') {{ item.solieungay }}
        td.p-2(class='') {{ item.unit }}
        td.p-2(class='') {{ item.dongia }}
        td.p-2(class='') {{ item.renevue }}
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="")
      div() in đơn thuốc
</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue"
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import RowMedicineBooking from "./RowMedicineBooking.vue"

const emits = defineEmits(['cancel'])
const props = defineProps(['bookingHistory'])
const detailBooking = ref()

const bookingHistory = computed(() => {
  return props.bookingHistory
})

const visible = computed(() => {
  return
})

async function getDetailBooking() {
  const form = {
    historyId: bookingHistory.value.historyId
  }
  await UserApis.getDetailHistoryByDoctor(form).then(res => {
    detailBooking.value = res.content
  })
}

function handleCancel(type) {
  emits('cancel', type)
}

onMounted(() => {
  getDetailBooking()
})
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