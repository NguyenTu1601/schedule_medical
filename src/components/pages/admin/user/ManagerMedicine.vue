<template lang="pug">
div
  div.gap-4
    div.text-base.font-semibold.mt-4 Quản lý thuốc
    div.flex.justify-start.mt-4
      div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Thêm thuốc
    div.flex.justify-end
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
        input.outline-none.text-base.w-full(v-model='medicine')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')

  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Tên thuốc
      td.p-2(class='') Mã thuốc
      td.p-2(class='') Đơn vị tính
      td.p-2(class='') Trạng thái
      td.p-2(class='') Tên bệnh viện
      td.p-2(class='w-[100px]') Thao tác
    tr(v-for='item in listMedicine')
      td.p-2(class='') {{ item.name }}
      td.p-2(class='') {{ item.code }}
      td.p-2(class='') {{ item.unit }}
      td.p-2(class='') {{ item.trangthaitext }}
      td.p-2(class='') {{ item.clinicName }}
      td
        div.flex.justify-between
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit')
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg')
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
  const form = {
    keyword: '0'
  }
  await MedicineApis.getListMedicine(form).then(res => {
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