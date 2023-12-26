<template lang="pug">
div
  div.gap-4
    div.text-base.font-semibold.mt-4 Quản lý lịch khám bệnh
    //- div.flex.justify-start.mt-4
    //-   div(class='px-4 py-2 text-lg font-semibold text-white bg-[#C80815] rounded-[10px] cursor-pointer' @click="handleAdd") Tạo bệnh án
    div.flex.justify-end
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
        input.outline-none.text-base.w-full(v-model='searchInput')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')

  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Mã lịch hẹn
      td.p-2(class='') Số thứ tự
      td.p-2(class='') Tên bệnh nhân
      td.p-2(class='') Ngày
      td.p-2(class='') Trạng thái
      td.p-2(class='w-[80px]') Thao tác
    tr(v-for='item in listBooking')
      td.p-2(class='') {{ item.bookingCode }}
      td.p-2(class='') {{ item.bookingStt }}
      td.p-2(class='') {{ item.PatientName }}
      td.p-2(class='') {{ item.date }}
      td.p-2(class='') Chờ khám
      td
        div.flex.justify-center
          span(title="Tạo bệnh án")
            img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/add.svg' @click='handleAddBooking(item.bookingId)')
  el-dialog(v-model="isShow" title="" width='1000px' @close='handleOnClose')
    ModalBookingDoctor(v-if='isShow' @cancel='handleCancel' :bookingId='bookingId' @save='handleSave' )
    div(v-else)
</template>
<script setup lang="ts">
import { ref ,watch} from 'vue';
import MedicineApis from '@/apis/user'
import { onMounted } from 'vue';
import ModalBookingDoctor from './component/ModalBookingDoctor.vue'
import { refDebounced, useFocus } from '@vueuse/core'
import { ElNotification } from 'element-plus';

const searchInput = ref('')
const donvi = ref()
const listBooking = ref([])
const isShow = ref(false)
const bookingId = ref()

const debounced = refDebounced(searchInput, 500)

watch(debounced, async () => {
  const form = {
    macode: debounced.value.length > 0 ? debounced.value : "0"
  }
  await MedicineApis.getListAccessBooking(form).then(res => {
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
async function getListBooking() {
  const form = {
    macode: '0'
  }
  await MedicineApis.getListAccessBooking(form).then(res => {
    listBooking.value = res.content
  })
}

function handleSave() {

}

function handleAdd() {
  isShow.value = true
}

function handleAddBooking(id) {
  bookingId.value = id
  isShow.value = true
}

async function handleCancel(val) {
  await getListBooking()
  isShow.value = false
}

function handleOnClose() {
  console.log('aa')
  getListBooking()
}
onMounted(() => {
  getListBooking()
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