<template lang="pug">
div.w-screen.py-6(class='bg-[#EEEEEE]')
  div(class='max-w-[1200px] m-auto')
    div(class='text-[22px] font-bold') Danh sách bác sĩ
    div
      DoctorSchedule(v-if='listDoctor' v-for='item in listDoctor' :doctor='item')
</template>

<script setup lang="ts">
import DoctorSchedule from '../clinic/component/DoctorSchedule.vue';
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import { ref } from 'vue';
import { onMounted } from 'vue';

const listDoctor = ref()

async function getListDoctor() {

  await UserApis.getListDoctor().then(res => {
    console.log(res)
    listDoctor.value = res.content
  })
}

onMounted(() => {
  getListDoctor()
})
</script>

<style scoped>

</style>