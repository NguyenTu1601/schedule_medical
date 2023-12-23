<template lang="pug">
div.w-full.border.mt-4.flex(class='border-[#EAEBED] p-4 rounded-[8px] bg-[#EAEBED]')
  div.flex-1
    div.font-bold.text-base
      span Mã bệnh án:&nbsp;
      span {{ booking.historycode }}
    div.text-base.mt-1.ml-4
      span Người khám:&nbsp;
      span {{ booking.PatientName }}
    div.text-base.mt-1.ml-4
      span Ngày khám:&nbsp;
      span {{ formatDate(+new Date(booking.date)) }}
    //- div.text-base.mt-1.ml-4
    //-   span Tình trạng sức khỏe:&nbsp;
    //-   span.italic {{ booking.health_status }}
    //- div.text-base.mt-1.ml-4
    //-   span Giá tiền:&nbsp;
    //-   span {{ booking.price }}
    //- div.text-base.mt-1.ml-4
    //-   span Trạng thái:&nbsp;
    //-   span {{ booking.trangthai }}

  div.flex-1
    div.font-bold.text-base
      span Khám tại:&nbsp;
      router-link(:to='{name: "clinic_detail", params: {id: booking.clinicId}}' target= '_blank' class='hover:text-[#C80815]') {{ booking.clinicName }}
    div.text-base.ml-4.mt-1
      span Bác sĩ:&nbsp;
      span {{ booking.DoctorName }}
    div.text-base.ml-4.mt-1
      span Chuẩn đoán:&nbsp;
      span.italic {{ booking.diagnostic }}
    div.text-base.ml-4.mt-1
      span Lời dặn:&nbsp;
      span.italic {{ booking.advice }}
    div.text-base.ml-4.mt-1
      span Ngày tái khám:&nbsp;
      span {{ formatDate(+new Date(booking.re_examinationDate)) }}
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
      id: props.booking?.clinicId
    }
  })
}
</script>

<style scoped></style>