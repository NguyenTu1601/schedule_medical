<template lang="pug">
div
  div.mt-10.flex.gap-4
    div(class='flex-[3]')
      div.text-lg.font-semibold Đơn vị tính
      el-select.mt-2.w-full(v-model="donvi" placeholder="Tat ca" size="large")
        el-option(value='1' label='Tất cả')
        el-option(value='2' label='Tuýp')
        el-option(value='3' label='Viên')
      div.text-lg.font-semibold.mt-4 Thuốc
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px]')
        input.outline-none.text-base.w-full(v-model='medicine')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')
      div.mt-10.flex.w-full
        div.w-full.font-semibold.text-lg Tổng số thuốc
        div.w-fit.text-lg 0
      div.mt-1.flex.w-full
        div.w-full.font-semibold.text-lg Tổng loại Tuýp
        div.w-fit.text-lg 0
      div.mt-1.flex.w-full
        div.w-full.font-semibold.text-lg Tổng loại Viên
        div.w-fit.text-lg 0
      div.flex.justify-center.mt-4
        div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Thêm thuốc
    div(class='flex-[7]')
      table.w-full
        tr(class='bg-[#C80815] text-white text-sm font-bold')
          td.p-2(class='') Tên thuốc
          td.p-2(class='') Mã thuốc
          td.p-2(class='') Đơn vị tính
          td.p-2(class='') Trạng thái
          td.p-2(class='') Tên bệnh viện
          td.p-2(class='') Thao tác
        tr(v-for='item in listMedicine')
          td.p-2(class='') {{ item.name }}
          td.p-2(class='') {{ item.code }}
          td.p-2(class='') {{ item.unit }}
          td.p-2(class='') {{ item.trangthaitext }}
          td.p-2(class='') {{ item.clinicName }}
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalMedicine(v-if='isShow' @cancel='handleCancel' @save='handleSave')
    div(v-else)
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MedicineApis from '@/apis/user'
import { onMounted } from 'vue';
import ModalMedicine from './component/ModalMedicine.vue'

const medicine = ref('')
const donvi = ref()
const listMedicine = ref([])
const isShow = ref(false)

async function getListMedicine() {
  await MedicineApis.getListMedicine().then(res => {
    listMedicine.value = res.content
  })
}

function handleSave() {

}

function handleAdd() {
  isShow.value = true
}

async function handleCancel(val) {
  if (val === 'save') {
    await getListMedicine()
  }
  isShow.value = false
}
onMounted(() => {
  getListMedicine()
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