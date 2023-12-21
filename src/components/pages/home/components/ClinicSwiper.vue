<template lang="pug">
div
  swiper(class="mySwiper w-full " :slidesPerView="4" :spaceBetween="30"
    :freeMode="true" :pagination="{clickable: true}" :modules="modules" :allowSlideNext="true" :allowSlidePrev="true")
    swiper-slide(v-for='clinic in listClinic' class='')
      div.group(class='border border-[#DEE3ED] rounded-[16px] p-5 h-[270px] select-none cursor-pointer hover:border-[#C80815]' @click='handleSelectClinic(clinic)')
        img(:src="clinic.image" @click="handleClick" class='w-[380px] h-[180px] object-cover')
        div.text-center.mt-4(class='text-[18px] font-bold group-hover:text-[#C80815]') {{ clinic.name }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import UserApis from '@/apis/user';
import { useRouter } from 'vue-router';

const modules = ref([Navigation, Autoplay])

const listClinic = ref([])

function handleClick() {

}

async function getListClinic() {
  await UserApis.getListClinic().then((res) => {
    listClinic.value = res.content;
  });
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
  getListClinic();
});
</script>

<style scoped></style>