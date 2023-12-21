<template lang="pug">
div.w-screen.py-6
  div(v-if='doctorDetail' class='max-w-[1200px] m-auto')
    div.flex.gap-8
      img(:src='doctorDetail?.image' class='w-[250px] h-[250px] rounded-full object-cover')
      div
        div(class='text-[22px] font-bold') {{ doctorDetail?.doctorname }}
        div(v-html='doctorDetail?.short_description' class='text-base')
    div.mt-6.flex.gap-4
      div.flex-1
        el-select.mt-1(v-model="dateSchedule" placeholder="schedule" size="large")
          el-option(v-for='idx in 5' :value='idx' :label='formatDate(now+86400000*(idx-1))')
        div.mt-2.text-base.font-bold.flex.gap-2.items-center
          img.w-6.h-6.shrink-0(src='./assets/schedule.svg')
          div Lịch khám
        div.mt-2.text-sm(v-if='listSchedule.length===0') Bác sĩ không có lịch khám bệnh trong khoảng thời gian này.
        div.mt-2.flex.gap-2.pl-6
          div.px-6.py-2(class='bg-[#FFCECE] text-base font-semibold cursor-pointer rounded-[10px]' v-for='item in listSchedule' @click="handleSchedule(item)") {{item.timedt}}
      .flex-1.border(class='border-[#DEE3ED] rounded-[10px] p-4')
        div.font-bold(class='text-[18px]') ĐỊA CHỈ
        div.text-base.mt-1 {{doctorDetail?.clinicname}}
        div.text-base {{doctorDetail?.address}}
        div.mt-1.flex.gap-2
          img.w-5.h-5.shrink-0(src='./assets/hand-right.svg')
          div(class='text-base')
            span.font-bold Giá khám:&nbsp;
            span {{ numberWithCommas(doctorDetail?.price)}}
    div.mt-6
      div(v-html='doctorDetail?.description' class='text-base')
  el-dialog(v-model="isShow" title="" width='1000px')
    ModalBooking(v-if='isShow' @cancel='handleCancel' :bookingClinicAdd='bookingClinicAdd' :account='account')
    div(v-else)
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import useAccount from '@/compositions/useAccount';
import ModalBooking from './component/ModalBooking.vue'

const { account, getAccount } = useAccount()

const doctorDetail = ref()
const now = ref(+new Date())
const dateSchedule = ref(1)
const listSchedule = ref([])

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
const route = useRoute()

function handleCancel(val) {
  isShow.value = false
}

const doctorId = computed(() => {
  route.params.id
})

watch(dateSchedule, async () => {
  if (dateSchedule.value) {
    const form = {
      doctorId: route.params.id,
      date: formatDate(now.value + 86400000 * (dateSchedule.value - 1))
    }
    await UserApis.getListScheduleByDate(form).then((res) => {
      listSchedule.value = res.content
    })
  }

})

async function getDoctorDetail() {
  await UserApis.getDoctorById({ doctorId: route.params.id }).then((res) => {
    doctorDetail.value = res.content
  })
}

function formatDate(date) {
  return dayjs(date).format('YYYY-MM-DD')
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
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
onMounted(async () => {
  getDoctorDetail()
  await getAccount()
  console.log(account.value)
})
</script>

<style scoped>
:global(ol, ul, menu) {
  list-style: inside !important;
}
</style>