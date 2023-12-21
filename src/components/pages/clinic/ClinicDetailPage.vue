<template lang="pug">
div.w-screen.py-6.min-h-screen(class='bg-[#EEEEEE]')
  div(v-if='clinicDetail' class='max-w-[1200px] m-auto')
    div(class='text-[22px] font-bold') {{ clinicDetail.name }}
    div(class='text-[18px] mt-2' v-html='clinicDetail?.description')
    div(class='text-[18px] font-bold') Danh sách bác sĩ
    div
      DoctorSchedule(v-if='listDoctor' v-for='item in listDoctor' :doctor='item')
    
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import DoctorSchedule from './component/DoctorSchedule.vue'

const clinicDetail = ref()
const route = useRoute()
const listDoctor = ref([])
const now = ref(+new Date())
const dateSchedule = ref(1)

async function getDetailClinic() {
  const form = {
    id: route.params.id
  }
  await UserApis.getClinicById(form).then(res => {
    clinicDetail.value = res.content[0]
  })
}


async function listDoctorByClinic() {
    const form = {
    clinicId: route.params.id
  }
  await UserApis.listDoctorByClinic(form).then(res => {
    console.log(res)
    listDoctor.value = res.content
  })
}

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

onMounted(() => {
  getDetailClinic()
  listDoctorByClinic()
})
</script>

<style scoped>
:global(ol, ul, menu) {
  list-style: inside !important;
}
</style>