<template lang="pug">
div
  div.text-sm Username
  input.p-4(type="text" placeholder='Username' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='username')
  div.text-sm.mt-3 Email
  input.p-4(type="text" placeholder='Username' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='email')
  div.text-sm.mt-3 Password
  div.p-4(class='mt-[6px] rounded-[10px] border border-[#DEE3ED] w-full flex gap-2 items-center')
    input(:type='isShowPassword?"text":"password"' placeholder='Password' class='outline-none text-base w-full' v-model='password')
    img.w-5.h-5.shrink-0.cursor-pointer(v-if='isShowPassword' src='../assets/eye.svg' @click='()=>isShowPassword= !isShowPassword')
    img.w-5.h-5.shrink-0.cursor-pointer(v-else src='../assets/eye-close.svg'  @click='()=>isShowPassword= !isShowPassword')

  div.text-sm.mt-3 Confirm password
  div.p-4(class='mt-[6px] rounded-[10px] border border-[#DEE3ED] w-full flex gap-2 items-center')
    input(:type='isShowConfirmPassword?"text":"password"' placeholder='Confirm password' class='outline-none text-base w-full' v-model='Password')
    img.w-5.h-5.shrink-0.cursor-pointer(v-if='isShowConfirmPassword' src='../assets/eye.svg' @click='()=>isShowConfirmPassword= !isShowConfirmPassword')
    img.w-5.h-5.shrink-0.cursor-pointer(v-else src='../assets/eye-close.svg'  @click='()=>isShowConfirmPassword= !isShowConfirmPassword')


  div.flex.gap-2(class='p-[10px] bg-[linear-gradient(90deg,#DA151A_0%,#BB070D_100%)] text-whisper cursor-pointer rounded-[10px] flex justify-center mt-8' @click='handleSignUp')
    img(src='../assets/sign-in.svg')
    div.text-base.font-semibold Sign up
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import useAuthn from '../compositions/useAuthn'

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')

const isLoading = ref(false)

const confirmPassword = ref('')
const isShowPassword = ref(false)
const isShowConfirmPassword = ref(false)

const { signup: signupAuth } = useAuthn()

function handleSignUp() {
  isLoading.value = true
  return signupAuth({
    username: username.value,
    email: email.value,
    password: password.value,
  })
    .then(() => {
      router.push({ name: 'verify', query: { username: username.value, email: email.value } })
    })
    .catch((error) => {
    })
    .finally(() => {
      isLoading.value = false
    })

}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
</script>

<style scoped></style>