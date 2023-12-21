<template lang="pug">
div.w-full.border.mt-4.bg-white(class='border-[#DEE3ED] p-4 rounded-[8px]')
  div.flex.my-4.gap-8()
    div.flex-1
      div.flex.gap-4
        img.shrink-0(class='w-[100px] h-[100px] rounded-full object-cover' :src='doctor.avtimage')
        div
          div(class='text-[18px] font-bold') {{ doctor.doctorname }}
          div(v-html='doctor.short_description') 
    div.flex-1
      el-select.mt-1(v-model="dateSchedule" placeholder="schedule" size="large")
        el-option(v-for='idx in 5' :value='idx' :label='formatDate(now+86400000*(idx-1))')
      div.mt-2.text-base.font-bold.flex.gap-2.items-center
        img.w-6.h-6.shrink-0(src='../assets/schedule.svg')
        div Lịch khám
      div.mt-2.text-sm(v-if='listSchedule.length===0') Bác sĩ không có lịch khám bệnh trong khoảng thời gian này.
      div.mt-2.flex.gap-2.pl-6
        div.px-6.py-2(class='bg-[#FFCECE] text-base font-semibold cursor-pointer rounded-[10px]' v-for='item in listSchedule' @click="handleSchedule(item)") {{item.timedt}}
      div.mt-2(class='p-4 border border-[#DEE3ED] rounded-[8px]')
        div.font-bold(class='text-[18px]') ĐỊA CHỈ
        div.text-base.mt-1 {{doctor?.clinicname}}
        div.text-base {{doctor?.address}}
        div.mt-1.flex.gap-2
          img.w-5.h-5.shrink-0(src='../assets/hand-right.svg')
          div(class='text-base')
            span.font-bold Giá khám:&nbsp;
            span {{ numberWithCommas(doctor?.price)}}
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalBooking(v-if='isShow' @cancel='handleCancel' :bookingClinicAdd='bookingClinicAdd' :account='account')
    div(v-else)
</template>

<script setup lang="ts">
import UserApis from '@/apis/user';
import { computed, defineProps, ref ,watch} from 'vue'
import dayjs from 'dayjs'
import ModalBooking from '../../doctor/component/ModalBooking.vue';
import useAccount from '@/compositions/useAccount';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const { account, getAccount } = useAccount()

const props = defineProps(['doctor'])
const now = ref(+new Date())
const listSchedule = ref([])
const dateSchedule = ref(1)

const doctor = computed(() => { 
  return props.doctor
})
const isShow = ref(false)

const bookingClinicAdd = ref({
  scheduleId: '',
  healthstatus: '',
  nhommau: '',
  isTaiKham: false,
  emailPatient: '',
  namePatient: '',
  dob: '',
  phonenumber: '',
  address: '',
  age: '',
})

function handleCancel(val) {
  isShow.value = false
}
const router = useRouter()

function handleSchedule(item) {
  if (!account.value || account.value.roleID !== 1) {
    router.push('/login')
  } else {
    bookingClinicAdd.value.scheduleId = item.id
    isShow.value = true
  }
}
function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
}

watch(dateSchedule, async () => {
  if (dateSchedule.value) {
    const form = {
      doctorId: doctor.value.Id,
      date: formatDate(now.value + 86400000 * (dateSchedule.value - 1))
    }
    await UserApis.getListScheduleByDate(form).then((res) => {
      listSchedule.value = res.content
    })
  }

})
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
onMounted(async () => {
  await getAccount()
})
</script>

<style scoped>

</style>