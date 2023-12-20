<template lang="pug">
div
  ManagerUserPage(v-if='role==="user"')
  ManagerDoctorPage(v-else-if='role==="doctor"')
  ManagerDoctorPlan(v-else-if='role==="plan-doctor"')
  ManagerMedicine(v-else-if='role==="medicine"')
  ManagerPatient(v-else-if='role==="patient"')
  ManagerClinicPage(v-else-if='role==="admin-clinic"')
  ManagerAllClinic(v-else-if='role==="clinic"')
  ManagerSpecialty(v-else-if='role==="specialty"')
  ManagerBookingDoctor(v-else-if='role==="booking-doctor"')
  ManagerBookingHistory(v-else-if='role==="booking-history"')
  ManagerBookingDoctorClinic(v-else-if='role==="plan-clinic"')
  ManagerBookingHistoryClinic(v-else-if='role==="booking-history-clinic"')
  ManagerBookingClinic(v-else-if='role==="booking-clinic"')
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAccount from "@/compositions/useAccount";
import ManagerUserPage from './ManagerUserPage.vue';
import ManagerDoctorPage from './ManagerDoctorPage.vue';
import ManagerClinicPage from './ManagerClinicPage.vue';
import ManagerDoctorPlan from './ManagerDoctorPlan.vue';
import ManagerMedicine from './ManagerMedicine.vue';
import ManagerPatient from './ManagerPatient.vue';
import ManagerAllClinic from './ManagerAllClinic.vue';
import ManagerSpecialty from './ManagerSpecialty.vue';
import ManagerBookingDoctor from './ManagerBookingDoctor.vue';
import ManagerBookingHistory from './ManagerBookingHistory.vue';
import ManagerBookingDoctorClinic from './ManagerBookingDoctorClinic.vue';
import ManagerBookingHistoryClinic from './ManagerBookingHistoryClinic.vue';
import ManagerBookingClinic from './ManagerBookingClinic.vue';

const { account, getAccount } = useAccount()

const route = useRoute()
const router = useRouter()

const role = computed(() => {
  return route.params.role
})

watch(role, () => {
  console.log(role.value)
})
watch(account, () => {
  console.log(account.value)
}, { immediate: true })
onMounted(async () => {
  if (!account.value) {
    await getAccount().catch(() => {
      router.push('/login')
    })
  }
})
</script>

<style scoped></style>