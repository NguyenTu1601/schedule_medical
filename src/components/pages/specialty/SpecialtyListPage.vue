<template lang="pug">
div.w-screen.py-6
  div(class='max-w-[1200px] m-auto')
    div(class='text-[22px] font-bold') Danh sách chuyên khoa
    div 
      div.flex.gap-10.py-6.border-b(class='border-[#DEE3ED] cursor-pointer select-none' v-for='specialty in listSpecialty' @click='handleSelectSpecialty(specialty)')
        img(:src='specialty.image' class='h-[120px]') 
        div.flex.items-center
          div(class='text-[18px] font-bold') {{ specialty.name }}
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserApis from '@/apis/user'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const listSpecialty = ref([])

async function getListSpecialty() {
  await UserApis.getListSpecialty().then(res => {
    listSpecialty.value = res.content
  })
}

const router = useRouter()

function handleSelectSpecialty(specialty) {
  router.push({
    name: 'specialty_detail', params: {
      id: specialty.id
    }
  })
}

onMounted(() => {
  getListSpecialty()
})
</script>

<style scoped>

</style>