<template lang="pug">
div.w-full.h-full
  ManagerUserPage(v-if='role==="user"')
  ManagerDoctorPage(v-else-if='role==="doctor"&& account')
  ManagerDoctorPlan(v-else-if='role==="plan-doctor"&& account')
  ManagerMedicine(v-else-if='role==="medicine"&& account')
  ManagerPatient(v-else-if='role==="patient"&& account')
  ManagerClinicPage(v-else-if='role==="admin-clinic"&& account')
  ManagerAllClinic(v-else-if='role==="clinic"&& account')
  ManagerSpecialty(v-else-if='role==="specialty"&& account')
  ManagerBookingDoctor(v-else-if='role==="booking-doctor"&& account')
  ManagerBookingHistory(v-else-if='role==="booking-history"&& account')
  ManagerBookingDoctorClinic(v-else-if='role==="plan-clinic"&& account')
  ManagerBookingClinic(v-else-if='role==="booking-clinic"&& account')
  ManagerBookingHistoryClinic(v-else-if='role==="booking-history-clinic"&& account')
  ManagerRevenuePage(v-else-if='role==="revenue"&& account')
  ManagerSwitchShift(v-else-if='role==="switch-shift"&& account')
  ManagerMedicineStatistics(v-else-if='role==="medicine-statistics"&& account')
  ManagerScheduleDetail(v-else-if='role==="schedule-detail"&& account')

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
import ManagerRevenuePage from './ManagerRevenuePage.vue';
import ManagerSwitchShift from './ManagerSwitchShift.vue';
import ManagerMedicineStatistics from './ManagerMedicineStatistics.vue';
import ManagerScheduleDetail from './ManagerScheduleDetail.vue';

const { account, getAccount } = useAccount()

const route = useRoute()
const router = useRouter()

const role = computed(() => {
  return route.params.role
})


onMounted(async () => {
  if (!account.value) {
    await getAccount().catch(() => {
      router.push('/login')
    })
  }
})
</script>

<style scoped></style>