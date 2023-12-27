<template lang="pug">
div
  div.gap-4
    div.text-base.font-semibold.mt-4 Đổi ca
    div.flex.justify-start.mt-4
      div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Tạo mới
    div.flex.justify-end
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
        input.outline-none.text-base.w-full(v-model='inputSearch')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')

  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='whitespace-nowrap ') ID
      td.p-2(class='whitespace-nowrap ') Bác sĩ đổi
      td.p-2(class='whitespace-nowrap ') Bác sĩ thay
      td.p-2(class='whitespace-nowrap ') Trạng thái
      td.p-2(class='whitespace-nowrap ') Lịch khám
      td.p-2(class='whitespace-nowrap ') Lý do
      td.p-2(class='w-[100px] whitespace-nowrap') Thao tác
    tr(v-for='item in listSchedule')
      td.p-2(class='') {{ item.changeId }}
      td.p-2(class='') {{ item.fromdoctorName }}
      td.p-2(class='') {{ item.todoctorName }}
      td.p-2(class='') {{ item.status }}
      td.p-2(class='') {{ item.timedt + ' ' + convertDay(item.date)}}
      td.p-2(class='') {{ item.reason }}
      td
        div.flex.justify-center.gap-2(v-if='item.statusid===1')
          span(title='Chỉnh sửa')
            img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit(item)')
          span(title='Xóa')
            img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg' @click="handleDelete(item)")
        div.flex.justify-center(v-else)
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/eye.svg' @click='handleEdit(item)')
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalSwitchShift(v-if='isShow' @cancel='handleCancel')
    div(v-else)
</template>
<script setup lang="ts">
import { ref } from 'vue';
import MedicineApis from '@/apis/user'
import { onMounted } from 'vue';
import ModalSwitchShift from './component/ModalSwitchShift.vue'
import { refDebounced, useFocus } from '@vueuse/core'
import { watch } from 'vue';
import { ElNotification } from 'element-plus';
import dayjs from 'dayjs';

const inputSearch = ref('')
const listSchedule = ref([])
const isShow = ref(false)

const debounced = refDebounced(inputSearch, 300)

const isEdit = ref(false)
const medicineEdit = ref()

watch(debounced, async () => {
  const form = {
    keyword: debounced.value.length > 0 ? debounced.value : '0'
  }
  await MedicineApis.getListChangeSchedule(form).then(res => {
    listSchedule.value = res.content
  })
})

async function getListSchedule() {
  const form = {
    keyword: '0'
  }
  await MedicineApis.getListChangeSchedule(form).then(res => {
    listSchedule.value = res.content
  })
}

async function handleDelete(item) {
  if (confirm("Bạn có muốn xóa chuyên khoa " + item.name) === true) {
    const form = {
      medicineId: item.id,
      code: item.code
    }

    await MedicineApis.deleteMedicine(form).then(res => {
      getListSchedule()
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
    })
  }
}

function handleEdit(item) {
  isShow.value = true
  isEdit.value = true
  medicineEdit.value = item
}

function handleAdd() {
  isEdit.value = false
  isShow.value = true
}

async function handleCancel(val) {
  if (val === 'save') {
    await getListSchedule()
  }
  isShow.value = false
}

function convertDay(day) {
  return dayjs(day).format('DD-MM-YYYY')
}
onMounted(() => {
  getListSchedule()
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