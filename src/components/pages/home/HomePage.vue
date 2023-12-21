<template lang="pug">
div(class='w-screen overflow-x-hidden')
  div(class='max-w-[1200px] m-auto pt-4')
    div(class='rounded-[28px] overflow-hidden')
      swiper(class="w-full mySwiper h-[600px]" @swiper="onSwiper" :autoplay="{delay: 2500, disableOnInteraction: false}"  :pagination="{clickable: true}" :modules="modules" :allowSlideNext="true" :allowSlidePrev="true")
        swiper-slide()
          img(src="./assets/banner1.png" @click="handleClick" class='w-[1200px] h-[600px] absolute')
        swiper-slide()
          img(src="./assets/banner2.jpg" @click="handleClick" class='w-[1200px] h-[600px] absolute')
        swiper-slide()
          img(src="./assets/banner3.jpg" @click="handleClick" class='w-[1200px] h-[600px] absolute')
    div.mt-8
      div.flex.justify-between
        div(class='text-[24px] font-bold text-[#C80815]') Chuyên khoa
        div.flex.items-center.h-max
          div(class='border border-[#C80815] text-base cursor-pointer rounded-[10px] px-2 py-1 text-[#C80815] hover:text-white hover:!bg-[#C80815]' @click="handleShowListSpecialty") Xem thêm
      ChuyenKhoaSwiper.mt-2.py-4
    div.mt-8
      div.flex.justify-between
        div(class='text-[24px] font-bold text-[#C80815]') Phòng khám
        div.flex.items-center.h-max
          div(class='border border-[#C80815] text-base cursor-pointer rounded-[10px] px-2 py-1 text-[#C80815] hover:text-white hover:!bg-[#C80815]'  @click="handleShowListClinic") Xem thêm
      ClinicSwiper.mt-2.py-4
    div.mt-8
      div.flex.justify-between
        div(class='text-[24px] font-bold text-[#C80815]') Bác sĩ nổi bật
        div.flex.items-center.h-max
          div(class='border border-[#C80815] text-base cursor-pointer rounded-[10px] px-2 py-1 text-[#C80815] hover:text-white hover:!bg-[#C80815]' @click="handleShowListDoctor") Xem thêm
      DoctorSwiper.mt-2.py-4
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { ref } from 'vue';
import ChuyenKhoaSwiper from './components/ChuyenKhoaSwiper.vue';
import ClinicSwiper from './components/ClinicSwiper.vue';
import DoctorSwiper from  './components/DoctorSwiper.vue'
import { useRouter } from 'vue-router';

const modules = ref([Navigation, Autoplay, Pagination])

function handleClick() {
  
}

function onSwiper() {
  
}

const router = useRouter()

function handleShowListSpecialty() {
  router.push('/list/specialty/')
}
function handleShowListClinic() {
  router.push('/list/clinic/')
}
function handleShowListDoctor() {
  router.push('/list/doctor/')
}
</script>

<style lang="stylus" scoped>

.overlay-bg
  filter: blur(4px)
  backdrop-filter: blur(20px)
  opacity : 0.6
  height: 100%
  border-radius: 28px
// .swiper-button-prev
//   background: #fff !important
.blur-block
  background-color: rgba(255,255,255,.6);
  backdrop-filter: blur(10px);

.blur-cus
  backdrop-filter: blur(5px);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media (max-width: 767px)
    background: none !important;
    background-image: none !important;
    height auto
  img 
    aspect-ratio 2 / 1
.size-48
  @media (max-width: 767px)
    font-size 25px
    
.bg-custom
  background-repeat no-repeat
  background-size cover
img 
  aspect-ratio 2 / 1
.font-inter
  font-family: "Inter", sans-serif;
.text-linear 
  background: -webkit-linear-gradient(#a05ede, #ffaca5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  max-width: 691px; 
  
  // line-height: 68px;
@media (max-width: 767px)
  .size-57
    font-size 40px
    line-height: 48px;
  .size-25
    font-size 18px
  .size-18
    font-size 16px
.bg-event-page
  background url("./assets/bg-event-page.jpg")
.bg-box
  //linear-gradient(rgba(0,0,0,.8), rgba(0,0,0,.8))
  background url("./assets/bg-event-page.jpg")
  background-repeat no-repeat
  background-size cover
  height inherit
  .bg-inside
    inset 0
    margin auto
</style>
