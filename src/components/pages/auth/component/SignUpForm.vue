<template lang="pug">
div
  div.text-sm Tên
  input.p-4(type="text" placeholder='tên' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='name')
  div.text-sm.mt-3 Tên đăng nhập
  input.p-4(type="text" placeholder='tên đăng nhập' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='username')
  div.text-sm.mt-3 Email
  input.p-4(type="text" placeholder='email' class='mt-[6px] rounded-[10px] outline-none border border-[#DEE3ED] w-full text-base' v-model='email')
  div.text-sm.mt-3 Mật khẩu
  div.p-4(class='mt-[6px] rounded-[10px] border border-[#DEE3ED] w-full flex gap-2 items-center')
    input(:type='isShowPassword?"text":"password"' placeholder='mật khẩu' class='outline-none text-base w-full' v-model='password')
    img.w-5.h-5.shrink-0.cursor-pointer(v-if='isShowPassword' src='../assets/eye.svg' @click='()=>isShowPassword= !isShowPassword')
    img.w-5.h-5.shrink-0.cursor-pointer(v-else src='../assets/eye-close.svg'  @click='()=>isShowPassword= !isShowPassword')

  //- div.text-sm.mt-3 Nhập lại mật khẩu
  //- div.p-4(class='mt-[6px] rounded-[10px] border border-[#DEE3ED] w-full flex gap-2 items-center')
  //-   input(:type='isShowConfirmPassword?"text":"password"' placeholder='nhập lại mật khẩu' class='outline-none text-base w-full' v-model='Password')
  //-   img.w-5.h-5.shrink-0.cursor-pointer(v-if='isShowConfirmPassword' src='../assets/eye.svg' @click='()=>isShowConfirmPassword= !isShowConfirmPassword')
  //-   img.w-5.h-5.shrink-0.cursor-pointer(v-else src='../assets/eye-close.svg'  @click='()=>isShowConfirmPassword= !isShowConfirmPassword')


  div.flex.gap-2(class='p-[10px] bg-[linear-gradient(90deg,#DA151A_0%,#BB070D_100%)] text-whisper cursor-pointer rounded-[10px] flex justify-center mt-8' @click='handleSignUp')
    img(src='../assets/sign-in.svg')
    div.text-base.font-semibold Đăng ký
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import useAuthn from '../compositions/useAuthn'
import { ElNotification } from 'element-plus';

const router = useRouter()

const username = ref('')
const password = ref('')
const email = ref('')
const name = ref('')

const isLoading = ref(false)

const confirmPassword = ref('')
const isShowPassword = ref(false)
const isShowConfirmPassword = ref(false)

const { signup: signupAuth } = useAuthn()

async function handleSignUp() {
  if (username.value.length === 0 || password.value.length === 0 || email.value.length === 0 || name.value.length === 0) {
    ElNotification({
      title: 'Error',
      message: 'vui lòng điền đủ các trường',
      type: 'error',
    });
    return
  }
  isLoading.value = true
  await signupAuth({
    name: name.value,
    username: username.value,
    email: email.value,
    password: password.value,
  })
    .then((res) => {
      if (res.data.result === 1) {
        ElNotification({
          title: 'Success',
          message: res.data.message,
          type: 'success',
        });
        router.push({ name: 'verify', query: { username: username.value, email: email.value } })
      }
      if (res.data.result === 0) {
        ElNotification({
          title: 'Error',
          message: res.data.message,
          type: 'error',
        });
      }

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