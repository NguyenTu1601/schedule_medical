<template lang="pug">
div.overflow-y-auto
  div.text-xl.font-bold Thông tin bệnh án
  div.mt-4.text-lg.font-bold Thông tin bệnh nhân:
  div.mt-4.flex
    div.flex-1
      div.text-base.font-semibold Mã lịch hẹn:
      div.text-base {{ detailBooking?.code }}
    div.flex-1
      div.text-base.font-semibold Số thứ tự:
      div.text-base {{ detailBooking?.stt }}
  div.mt-2.flex
    div.flex-1
      div.text-base.font-semibold Nhóm máu:
      div.text-base {{ detailBooking?.nhommau }}
    div.flex-1
      div.text-base.font-semibold Triệu chứng
      div.text-base {{ detailBooking?.health_status }}
  div.mt-2.flex
    div.flex-1
      div.text-base.font-semibold Tên bệnh nhân:
      div.text-base {{ detailBooking?.patientName }}
    div.flex-1
      div.text-base.font-semibold Tái khám:
      div.text-base {{ detailBooking?.isTaikham }}
  div.mt-2.flex
    div.flex-1
      div.text-base.font-semibold Tuổi:
      div.text-base {{ detailBooking?.age }}
    div.flex-1
  div.mt-4.text-lg.font-bold Đơn thuốc:
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Triệu chứng
      input(type='text' placeholder='' v-model="diagnostic" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Ngày tái khám
      el-date-picker.w-full.mt-1(v-model="taikhamDate"
        type="date"
        placeholder="ngày tái khám"
        size="large"
        )
  div(class='mt-4')
    table.w-full
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='') Tên thuốc
        td.p-2(class='') số lượng
        td.p-2(class='w-[100px]') Hành động
      tr(v-for='(item,idx) in listMedicine')
        td.p-2(class='') 
          input.w-full(v-model='item.name' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          input.w-full(v-model='item.description' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td
          div.flex.justify-between(v-if='idx===listMedicine.length-1')
            img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/add-black.svg' @click='handleAdd')
            img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/delete.svg' @click="handleDelete")
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoading') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')

</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue";
import UserApis from '@/apis/user'
import dayjs from 'dayjs'

const emits = defineEmits(['cancel'])
const props = defineProps(['bookingId'])


const listMedicine = ref([{
  name: '',
  code: '',
  unit: '',
  description: '',
  amout: 2.5
}])
const isLoading = ref(false)
const detailBooking = ref()
const diagnostic = ref('')
const taikhamDate = ref()

const bookingId = computed(() => {
  return props.bookingId
})

function handleAdd() {
  listMedicine.value.push({
    name: '',
    code: '',
    unit: '',
    description: '',
    amout: 2.5
  })
}

function handleDelete() {
  if (listMedicine.value.length > 1) {
    listMedicine.value.pop()
  }
}

function handleCancel(type) {
  emits('cancel', type)
}

function handleSave() {
  isLoading.value = true
  UserApis.createMedicine(listMedicine.value).then(() => {
    isLoading.value = false
    handleCancel('save')
  }).finally(() => {
    isLoading.value = false
    handleCancel('save')
  })
}

async function getDetailBooking() {
  const form = {
    bookingId: bookingId.value
  }
  await UserApis.getDetailBooking(form).then(res => {
    detailBooking.value = res.content[0]
    console.log(detailBooking.value)
  })
}
onMounted(() => {
  console.log(bookingId.value)
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