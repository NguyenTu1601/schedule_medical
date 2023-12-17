<template lang="pug">
div.h-full(class='bg-[#F2F2F2]')
  div.px-5.py-6.h-full.flex.flex-col
    div.flex.gap-2.items-center.cursor-pointer
      img.w-6.h-6.shrink-0(src='./assets/arrow-left.svg')
      dev.text-base.font-semibold Return to home
    div.mt-6.bg-white(class='flex justify-center rounded-[10px] pt-8 h-full')
      div(class='max-w-[454px] w-full')
        div.flex.border-b(class='border-[#DEE3ED] relative')
          div(class='text-[20px] cursor-pointer flex-1 w-[200px] text-center pb-3 font-semibold' @click='changeLink("login")' :class='[{"text-[#DA151A]":status==="/login"}]') Login
          div(class='text-[20px] cursor-pointer flex-1 w-[200px] text-center pb-3 font-semibold' @click='changeLink("sign-up")' :class='[{"text-[#DA151A]":status!=="/login"}]') Sign Up

          div.absolute.bar(class='h-[2px] w-1/2 bg-[#DA151A] -bottom-[1px] left-0' :class='[{"!left-1/2":status!=="/login"}]')
        div.pt-8
          LoginForm(v-if='status==="/login"')
          SignUpForm(v-else)
</template>

<script setup lang="ts">
import {ref , computed,onMounted} from 'vue'
import { useRoute, useRouter } from 'vue-router';
import LoginForm from "./component/LoginForm.vue";
import SignUpForm from "./component/SignUpForm.vue";


const route = useRoute()
const router = useRouter()

const status = computed(()=>{
  return route.path
})

function changeLink(link){
  router.push(link)
}

onMounted(()=>{
  console.log(route)
})
</script>

<style scoped>
.bar {
  transition: left 0.25s;
}
</style>