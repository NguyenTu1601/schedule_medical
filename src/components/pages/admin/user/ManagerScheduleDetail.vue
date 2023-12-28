<template lang="pug">
div.w-full.h-full
  iframe(v-if='account' width="100%" height="100%" :src='url' frameborder="0")
</template>

<script setup lang="ts">
import useAccount from "@/compositions/useAccount";
import { computed } from "vue";
import { onMounted } from "vue";

const { account, getAccount } = useAccount()

const url = computed(() => {
  // http://1.53.252.173:6789/Baocao_chitiet_lichhen_E/ReportBuilder?userid=100023&parent_fk=10000&from_dms=0
  return 'http://1.53.252.173:6789/Baocao_chitiet_lichhen_E/ReportBuilder?userid=' + account.value.id + '&parent_fk=10000&from_dms=0'
})
onMounted(async () => {
  if (!account.value) {
    await getAccount()
    console.log('asasas')
  }
})
</script>

<style scoped></style>