<template lang="pug">
div
  div(class='text-[18px] font-bold') Thông tin bệnh án
  div.flex.justify-end
    div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
      input.outline-none.text-base.w-full(v-model='search' ref='searchRef')
      img(class='w-6 h-6 shrink-0' src='../assets/search.svg')
  div.mt-4
    BookingHistoryItem(v-for='booking in listBooking' :booking='booking')
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onMounted } from 'vue';
import UserApis from '@/apis/user'
import { refDebounced } from '@vueuse/core'
import { ElNotification } from 'element-plus';
import BookingHistoryItem from './BookingHistoryItem.vue'

const listBooking = ref([])
const search = ref('')

const debounced = refDebounced(search, 500)

watch(debounced, async () => {
  const form = {
    keyword: debounced.value.length > 0 ? debounced.value : "0"
  }
  await UserApis.getListHistotyByPatient(form).then(res => {
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
async function getListHistoty() {
  const form = {
    keyword: '0'
  }
  await UserApis.getListHistotyByPatient(form).then(res => {
    listBooking.value = res.content
  })
}

onMounted(() => {
  getListHistoty()
})
</script>

<style scoped></style>