<template lang="pug">
div
  ReportDoctor
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import useAccount from "@/compositions/useAccount"
import ReportDoctor from './ReportDoctor.vue'

const { account, getAccount } = useAccount()

onMounted(() => {
  getAccount()
})
</script>

<style scoped>

</style>