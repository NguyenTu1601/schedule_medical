<template lang="pug">
div
  swiper(class="mySwiper w-full " :slidesPerView="4" :spaceBetween="30"
    :freeMode="true" :pagination="{clickable: true}" :modules="modules" :allowSlideNext="true" :allowSlidePrev="true")
    swiper-slide(v-for='doctor in listDoctor' class='')
      div.group(class='border border-[#DEE3ED] rounded-[16px] p-5 h-[270px] select-none cursor-pointer hover:border-[#C80815]')
        img(:src="doctor.avtimage" @click="handleClick" class='w-[380px] h-[180px] object-cover')
        div.text-center.mt-4(class='text-[18px] font-bold group-hover:text-[#C80815]') {{ doctor.doctorname }}
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import UserApis from '@/apis/user';

const modules = ref([Navigation, Autoplay])

const listDoctor = ref([])

function handleClick() {

}

async function getListDoctor() {
  await UserApis.getListDoctor().then((res) => {
    listDoctor.value = res.content;
  });
}

onMounted(() => {
  getListDoctor();
});
</script>

<style scoped></style>