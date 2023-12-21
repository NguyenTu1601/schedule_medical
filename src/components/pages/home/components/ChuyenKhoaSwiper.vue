<template lang="pug">
div
  swiper(class="mySwiper w-full " :slidesPerView="4" :spaceBetween="30"
    :freeMode="true" :pagination="{clickable: true}" :modules="modules" :allowSlideNext="true" :allowSlidePrev="true")
    swiper-slide(v-for='specialty in listSpecialty' class='')
      div.group(class='border border-[#DEE3ED] rounded-[16px] p-5 h-[270px] select-none cursor-pointer hover:border-[#C80815]' @click='handleSelect(specialty)')
        img(:src="specialty.image" @click="handleClick" class='w-[380px] h-[180px] object-cover')
        div.text-center.mt-4(class='text-[18px] font-bold group-hover:text-[#C80815]') {{ specialty.name }}
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

const listSpecialty = ref([])

function handleClick() {

}

async function getListSpecialty() {
  await UserApis.getListSpecialty().then((res) => {
    listSpecialty.value = res.content;
  });
}

const router = useRouter()

function handleSelect(specialty) {
  router.push({
    name: 'specialty_detail', params: {
      id: specialty.id
    }
  })
}

onMounted(() => {
  getListSpecialty();
});
</script>

<style scoped></style>