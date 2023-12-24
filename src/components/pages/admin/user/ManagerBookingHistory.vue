<template lang="pug">
div
  div.gap-4
    div.text-base.font-semibold.mt-4 Lịch sử khám bệnh
    //- div.flex.justify-start.mt-4
    //-   div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Tạo bệnh án
    div.flex.justify-end
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
        input.outline-none.text-base.w-full(v-model='searchInput')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')

  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Mã bệnh án
      td.p-2(class='') Tên bệnh nhân
      td.p-2(class='') Ngày tái khám
      td.p-2(class='') Trạng thái
      td.p-2(class='w-[80px]') 
    tr(v-for='item in listHistoryBooking')
      td.p-2(class='') {{ item.mabenhan }}
      td.p-2(class='') {{ item.patientName }}
      td.p-2(class='') {{ item.re_examinationDate }}
      td.p-2(class='') {{ item.status }}
      td
        div.flex.justify-center
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/eye.svg' @click='handleViewBooking(item)')
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalBookingHistory(v-if='isShow' @cancel='handleCancel' :history='bookingHistory')
    div(v-else)
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import MedicineApis from '@/apis/user'
import { onMounted } from 'vue';
import ModalBookingHistory from './component/ModalBookingHistory.vue'
import { refDebounced } from '@vueuse/core'
import { ElNotification } from 'element-plus';

const listHistoryBooking = ref([])
const isShow = ref(false)
const bookingId = ref()
const searchInput = ref('')
const debounced = refDebounced(searchInput, 500)

const bookingHistory = ref({
  historyId: '',
  mabenhan: '',
  diagnostic: '',
  re_examinationDate: '',
  patientName: '',
  statusId: '',
  status: '',
})

watch(debounced, async () => {
  const form = {
    keyword: debounced.value.length > 0 ? debounced.value : "0"
  }
  await MedicineApis.getListHistoryByDoctor(form).then(res => {
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    listHistoryBooking.value = res.content
  })
})
async function getListHistoryBooking() {
  const form = {
    keyword: '0'
  }
  await MedicineApis.getListHistoryByDoctor(form).then(res => {
    listHistoryBooking.value = res.content
  })
}


function handleViewBooking(item) {
  isShow.value = true
  bookingHistory.value = item
}

async function handleCancel(val) {
  if (val === 'save') {
    await getListHistoryBooking()
  }
  isShow.value = false
}
onMounted(() => {
  getListHistoryBooking()
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