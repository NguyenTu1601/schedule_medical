<template lang="pug">
div
  div.text-sm Username
  input.p-4(type="text" placeholder='Username' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='username')
  div.text-sm.mt-3 Password
  div.p-4(class='mt-[6px] rounded-[10px] border border-[#DEE3ED] w-full flex gap-2 items-center')
    input(:type='isShowPassword?"text":"password"' placeholder='Password' class='outline-none text-base w-full' v-model='password')
    img.w-5.h-5.shrink-0.cursor-pointer(v-if='isShowPassword' src='../assets/eye.svg' @click='()=>isShowPassword= !isShowPassword')
    img.w-5.h-5.shrink-0.cursor-pointer(v-else src='../assets/eye-close.svg'  @click='()=>isShowPassword= !isShowPassword')
  div.cursor-pointer.text-base.font-semibold.mt-6(class='text-[#C52428]') Forgot your password?

  div.flex.gap-2(class='p-[10px] bg-[linear-gradient(90deg,#DA151A_0%,#BB070D_100%)] text-whisper cursor-pointer rounded-[10px] flex justify-center mt-8' @click='login')
    img(src='../assets/sign-in.svg')
    div.text-base.font-semibold Login
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import useAuthn from '../compositions/useAuthn'

const username = ref('')
const password = ref('')
const isShowPassword = ref(false)
const isLoading = ref(false)

const { login: loginAuth} = useAuthn()

function login (e: Event) {
  isLoading.value = true
  console.log(username.value, ' ',password.value)
  return loginAuth(username.value, password.value)
    .then(() => {
      // auth.password = ''
      // auth.errorMessage = ''
      // router.push({ name: 'main' })
    })
    .catch(() => {
      // auth.password = ''
      // auth.errorMessage = 'Invalid username or password'
    })
    .finally(() => (isLoading.value = false))
}
</script>

<style scoped>

</style>