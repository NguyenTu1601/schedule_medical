<template lang="pug">
div.w-screen
  div.flex.gap-6.h-full
    div.h-full.shrink-0(class='w-[250px] pt-6 px-4 overflow-auto !h-[calc(100vh-60px-24px)] pb-2')
      div.flex.flex-col.w-full.p-4(class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeTab("user")' :class='[{"!border-[#C52428]" : tab==="user"}]')
        div.flex.justify-center
          img.w-10.h-10.shrink-0(src='./assets/user.svg')
        div.text-center.font-bold(class='text-[18px] ') Chỉnh sửa profile
      div.flex.flex-col.w-full.p-4.mt-2(class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeTab("booking")' :class='[{"!border-[#C52428]" : tab==="booking"}]')
        div.flex.justify-center
          img.w-10.h-10.shrink-0(src='./assets/schedule.svg')
        div.text-center.font-bold(class='text-[18px] ') Lịch sử lịch hẹn
      div.flex.flex-col.w-full.p-4.mt-2(class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeTab("history")' :class='[{"!border-[#C52428]" : tab==="history"}]')
        div.flex.justify-center
          img.w-10.h-10.shrink-0(src='./assets/history.svg')
        div.text-center.font-bold(class='text-[18px] ') Thông tin bệnh án
    div.w-full
      div.w-full.py-6.pr-4.manager(class='h-[calc(100vh-60px)]')
        div.h-full.w-full(class='rounded-[10px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] py-4 px-6 overflow-y-auto overflow-x-hidden')
          EditProfile(v-if='tab==="user"')
          ScheduleBooking(v-if='tab==="booking"')
          BookingHistory(v-if='tab==="history"')
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EditProfile from './component/EditProfile.vue'
import ScheduleBooking from './component/ScheduleBooking.vue'
import BookingHistory from './component/BookingHistory.vue'

const route = useRoute()
const router = useRouter()

const tab = computed(() => {
  return route.query.tab
})
function handleChangeTab(tab) {
  router.push({
    name: 'profile', query: {
      tab: tab
    }
  })
}
</script>

<style scoped></style>