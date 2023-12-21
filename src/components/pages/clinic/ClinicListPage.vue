<template lang="pug">
div.w-screen.py-6
  div(class='max-w-[1200px] m-auto')
    div(class='text-[22px] font-bold') Danh sách Phòng khám
    div 
      div.flex.gap-10.py-6.border-b(class='border-[#DEE3ED] cursor-pointer select-none' v-for='clinic in listClinic' @click='handleSelectClinic(clinic)')
        img(:src='clinic.image' class='h-[120px]') 
        div.flex.items-center
          div(class='text-[18px] font-bold') {{ clinic.name }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserApis from '@/apis/user'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const listClinic = ref([])

async function getListClinic() {
  await UserApis.getListClinic().then(res => {
    listClinic.value = res.content
  })
}

const router = useRouter()

function handleSelectClinic(clinic) {
  router.push({
    name: 'clinic_detail', params: {
      id: clinic.id
    }
  })
}

onMounted(() => {
  getListClinic()
})
</script>

<style scoped></style>