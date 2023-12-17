<template lang="pug">
div
  ManagerUserPage(v-if='role==="user"')
  ManagerDoctorPage(v-else-if='role==="doctor"')
  ManagerDoctorPlan(v-else-if='role==="plan-doctor"')
  ManagerMedicine(v-else-if='role==="medicine"')
  ManagerPatient(v-else-if='role==="patient"')
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ManagerUserPage from './ManagerUserPage.vue';
import ManagerDoctorPage from './ManagerDoctorPage.vue';
import ManagerClinicPage from './ManagerClinicPage.vue';
import ManagerDoctorPlan from './ManagerDoctorPlan.vue';
import ManagerMedicine from './ManagerMedicine.vue';
import ManagerPatient from './ManagerPatient.vue';

const route = useRoute()
const router = useRouter()

const role = computed(() => {
  return route.params.role
})

watch(role, () => {
  console.log(role.value)
})
</script>

<style scoped></style>