<template lang="pug">
div.h-full(class='w-[250px] pt-6 px-4 overflow-auto !h-[calc(100vh-60px-24px)] pb-2')
  div.flex.flex-col.w-full.p-4(v-if='roleUserId===0' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/user")' :class='[{"!border-[#C52428]" : role==="user"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/user.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý người dùng
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/doctor")' :class='[{"!border-[#C52428]" : role==="doctor"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/doctor.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý bác sĩ
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===0' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/specialty")' :class='[{"!border-[#C52428]" : role==="specialty"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/specialty.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý chuyên khoa
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===0 ' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/clinic")' :class='[{"!border-[#C52428]" : role==="clinic"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/clinic.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý phòng khám

  //- div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/admin-clinic")' :class='[{"!border-[#C52428]" : role==="admin-clinic"}]')
  //-   div.flex.justify-center
  //-     img.w-10.h-10.shrink-0(src='../assets/clinic.svg')
  //-   div.text-center.font-bold(class='text-[18px] ') Phòng khám của tôi
  //- div.flex.flex-col.w-full.p-4.mt-2(class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/plan-user")' :class='[{"!border-[#C52428]" : role==="plan-user"}]')
  //-   div.flex.justify-center
  //-     img.w-10.h-10.shrink-0(src='../assets/plan.svg')
  //-   div.text-center.font-bold(class='text-[18px] ') Quản lý kế hoạch khám bệnh(user)
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===2 ' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/plan-doctor")' :class='[{"!border-[#C52428]" : role==="plan-doctor"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/plan.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý kế hoạch khám bệnh(doctor)
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/plan-clinic")' :class='[{"!border-[#C52428]" : role==="plan-clinic"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/plan.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý kế hoạch khám bệnh(admin)
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===2 || roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/medicine")' :class='[{"!border-[#C52428]" : role==="medicine"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/medicine.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý thuốc
  //- div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/patient")' :class='[{"!border-[#C52428]" : role==="patient"}]')
  //-   div.flex.justify-center
  //-     img.w-10.h-10.shrink-0(src='../assets/patient.svg')
  //-   div.text-center.font-bold(class='text-[18px] ') Quản lý Bệnh nhân
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===2' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/booking-doctor")' :class='[{"!border-[#C52428]" : role==="booking-doctor"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/patient.svg')
    div.text-center.font-bold(class='text-[18px] ') Khám bệnh
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===2' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/booking-history")' :class='[{"!border-[#C52428]" : role==="booking-history"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/patient.svg')
    div.text-center.font-bold(class='text-[18px] ') Lịch sử khám bệnh
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/booking-history-clinic")' :class='[{"!border-[#C52428]" : role==="booking-history-clinic"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/patient.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý bệnh án
  div.flex.flex-col.w-full.p-4.mt-2(v-if='roleUserId===3' class='rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] cursor-pointer border border-white' @click='handleChangeManager("/manager/booking-clinic")' :class='[{"!border-[#C52428]" : role==="booking-clinic"}]')
    div.flex.justify-center
      img.w-10.h-10.shrink-0(src='../assets/schedule.svg')
    div.text-center.font-bold(class='text-[18px] ') Quản lý lịch hẹn


</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAccount from "@/compositions/useAccount";

const { account, getAccount } = useAccount()

const route = useRoute()
const router = useRouter()

const role = computed(() => {
  return route.params.role
})

const roleUserId = computed(() => {
  return account.value?.roleID
})

function handleChangeManager(routeLink) {
  router.push(routeLink)
}

onMounted(() => {
  console.log(route)
})

onMounted(async () => {
  if (!account.value) {
    await getAccount().catch(() => {
      router.push('/login')
    })
  }
})
</script>

<style scoped></style>