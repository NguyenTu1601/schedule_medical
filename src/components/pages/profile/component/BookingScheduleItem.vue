<template lang="pug">
div.w-full.border.mt-4(class='border-[#EAEBED] p-4 rounded-[8px] bg-[#EAEBED]')
  img(v-if='diffMinute >= -20' class='h-[50px]' src='../assets/new.svg') 
  div.flex
    div.flex-1
      div.font-bold.text-base
        span Mã lịch hẹn:&nbsp;
        span {{ booking.bookingCode }}
      div.text-base.mt-1.ml-4
        span Người đặt lịch:&nbsp;
        span {{ booking.PatientName }}
      div.text-base.mt-1.ml-4
        span Ngày khám:&nbsp;
        span {{ formatDate(+new Date(booking.date)) }}
      div.text-base.mt-1.ml-4
        span Tình trạng sức khỏe:&nbsp;
        span.italic {{ booking.health_status }}
      div.text-base.mt-1.ml-4
        span Giá tiền:&nbsp;
        span {{ booking.price }}
      div.text-base.mt-1.ml-4
        span Trạng thái:&nbsp;
        span {{ booking.trangthai }}

    div.flex-1
      div.font-bold.text-base
        span Khám tại:&nbsp;
        router-link(:to='{name: "clinic_detail", params: {id: booking.clinicId}}' target= '_blank' class='hover:text-[#C80815]') {{ booking.clinicName }}
      div.text-base.ml-4.mt-1
        span Bác sĩ:&nbsp;
        span {{ booking.DoctorName }}
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, defineProps, ref, watch } from 'vue'
import { useRouter } from 'vue-router';


const props = defineProps(['booking'])

function formatDate(date) {
  return dayjs(date).format('DD-MM-YYYY')
}

const router = useRouter()
function viewDetailClinic() {
  router.push({
    name: 'clinic_detail', params: {
      id: props.booking.clinicId
    }
  })
}
const diffMinute = computed(() => {
  const futureDate = new Date(props.booking.createdAt);
  const diffMinutes = getMinutesDiffFromNow(futureDate);
  return diffMinutes
})

watch(diffMinute, () => {
  console.log(diffMinute.value)
},{immediate:true})

function getMinutesDiffFromNow(targetDate) {
  // Get the current date/time
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = targetDate.getTime() - now.getTime();

  // Convert milliseconds to minutes
  const minutesDiff = Math.floor(timeDiff / (1000 * 60));

  return minutesDiff;
}
</script>

<style scoped></style>