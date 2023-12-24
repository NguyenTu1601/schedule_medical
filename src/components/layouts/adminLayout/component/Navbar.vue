<template lang="pug">
div.w-full
  div(class='h-[60px] shadow-lg flex justify-between items-center px-10')
    div(class='text-[20px] font-bold whitespace-nowrap cursor-pointer select-none' @click='handleToHome') schedule medical
    div.flex.gap-4
      span(v-if='account && account?.roleID===2' title='Dashboard' @click="handleDashboard")
        img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/dashboard.svg' )
      img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/logout.svg' @click="handleLogout")
</template>

<script setup lang="ts">
import useAccount from '@/compositions/useAccount';
import { useRouter } from 'vue-router';

const { account, getAccount, removeAccount } = useAccount()
const router = useRouter()

function handleLogout() {
  removeAccount()
  router.push('/login')
}

function handleDashboard() {
  removeAccount()
  router.push('/report')
}

function handleToHome() {
  if (account.value) {
    if (account.value?.roleID === 2) {
      router.push('/manager/plan-doctor')
    }
    if (account.value?.roleID === 0) {
      router.push('/manager/user')
    }
    if (account.value?.roleID === 3) {
      router.push('/manager/doctor')
    }
    if (account.value?.roleID === 1) {
      router.push('/')
    }
  }
}
</script>

<style scoped></style>