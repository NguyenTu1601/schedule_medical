<template lang="pug">
div.h-full(class='bg-[#F2F2F2]')
  div.px-5.py-6.h-full.flex.flex-col
    div.flex.gap-2.items-center.cursor-pointer(@click="handleBack")
      img.w-6.h-6.shrink-0(src='./assets/arrow-left.svg')
      dev.text-base.font-semibold Back
    div.mt-6.bg-white(class='flex justify-center rounded-[10px] pt-12 h-full w-full')
      div.text-center.w-full
        div(class='text-[20px] font-bold') Verify account
        div(class='text-[#616161] text-sm mt-2') We have sent a verify code to 
        div(class='text-sm font-bold') nguyenvantu.qng1234@gmail.com
        div.flex.justify-center
          v-otp-input.mt-8(
            class='gap-x-2'
            ref="otpInput"
            :input-classes='[ {"border-cardinal":errorMessage } ,{"border-mystic":!errorMessage } ,"w-12 h-12 border rounded-lg text-center outline-none focus:border-black" ]'
            separator=""
            :num-inputs="4"
            :should-auto-focus="true"
            :is-input-num="true"
            :conditionalClass="['one', 'two', 'three', 'four']"
            @on-change="handleOnChange"
            @on-complete="handleOnChange"
          )
        .resend-wrapper.text-center.mt-8
          | Not received email?&nbsp;
          span.font-semibold.text-spanish-gray.pointer-events-none(v-if="duration !== 30")
            | Resend  ({{ durationDown }})
          span.font-bold.text-cardinal.cursor-pointer(v-else="" @click="resend") Resend
        div.flex.justify-center
          div.mt-8(class='max-w-[328px] py-[10px] bg-[linear-gradient(90deg,#DA151A_0%,#BB070D_100%)] w-full text-white font-semibold text-sm rounded-[10px]') Verify
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VOtpInput from 'vue3-otp-input'
import { useRoute, useRouter } from "vue-router";
import { computed } from 'vue';
import { onMounted } from 'vue';
import { watch } from 'vue';
import { onUnmounted } from 'vue';

const otpInput = ref(null)
const code = ref('')

const router = useRouter()
const route = useRoute()

const duration = ref(0)
const durationDown = computed(() => 30 - duration.value)
const isResendLoading = ref(false)
let countingIntv: number

const stopCountingDuration = () => {
  window.clearInterval(countingIntv)
}

const startCountingDuration = () => {
  stopCountingDuration()
  duration.value = 0
  countingIntv = window.setInterval(() => {
    duration.value++
  }, 1000)
}
function handleOnChange(value: string) {
  code.value = value.trim()
  console.log(code.value)
}

function handleBack() {
  router.push({ name: 'signup' })
}

function resend() {

}

watch(durationDown, () => {
  if (durationDown.value === 0) {
    stopCountingDuration()
  }
})
onMounted(() => {
  startCountingDuration()
})
// stop interval
onUnmounted(() => {
  stopCountingDuration()
})
</script>

<style scoped></style>