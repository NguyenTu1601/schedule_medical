<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thêm thông tin thuốc
  div(class='mt-4')
    table.w-full
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='') Tên thuốc
        td.p-2(class='') Mã thuốc
        td.p-2(class='') Đơn vị tính
        td.p-2(class='') Description
        td.p-2(class='') Hành động
      tr(v-for='(item,idx) in listMedicine')
        td.p-2(class='') 
          input(v-model='item.name' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          input(v-model='item.code' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          //- input(v-model='item.unit' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
          el-select.mt-1.w-full(v-model="item.unit" size="large")
            el-option(value='viên' label='Viên')
            el-option(value='tuýp' label='Tuýp')
        td.p-2(class='')
          input(v-model='item.description' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
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

const listMedicine = ref([{
  name: '',
  code: '',
  unit: '',
  description: '',
  amout: 2.5
}])
const isLoading = ref(false)

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