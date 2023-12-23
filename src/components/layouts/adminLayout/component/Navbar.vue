<template lang="pug">
div.w-full
  div(class='h-[60px] shadow-lg flex justify-between items-center px-10')
    div schedule medical
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
</script>

<style scoped></style>