<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin lịch hẹn

  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tên
      input(type='text' placeholder='tên' v-model="account.name" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Email bệnh nhân
      input(type='text' placeholder='email' v-model="account.email" disabled class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tuổi
      input(type='text' placeholder='tuoi' v-model="bookingClinicAdd.age" 
      class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Nhóm máu
      input(type='text' placeholder='nhóm máu' v-model="bookingClinicAdd.nhommau" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Triệu chứng
      input(type='text' placeholder='triệu chứng' v-model="bookingClinicAdd.healthstatus" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')

  div.flex.gap-8.mt-4
    div.flex-1.flex.items-center
      el-checkbox(v-model="bookingClinicAdd.isTaiKham" label="Tái khám" size="large")
    div.flex-1


  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')
 

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { reactive, h, ref, shallowRef, defineEmits, watch, defineProps } from "vue";
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import { VueEditor } from "vue3-editor";
import { computed } from "vue";
import { ElNotification, ElPopconfirm } from 'element-plus';
import FileApis from '@/apis/file'

const emits = defineEmits(['cancel'])
const props = defineProps(['bookingClinicAdd','account'])

const isLoadingCreate = ref(false)
const doctorSelect = ref()
const listDoctor = ref([])
const dateBooking = ref()
const listScheduleByDate = ref([])
const timeSelect = ref()
const step = ref(1)


const bookingClinicAdd = computed(() => {
  return props.bookingClinicAdd
})
const account = computed(() => {
  return props.account
})

function customQuillClipboardMatcher(node, delta) {
  delta.ops = delta.ops.map((op) => {
    return {
      insert: op.insert
    }
  })
  return delta
}
// getListScheduleByDate
async function getListDoctorByToken() {
  await UserApis.listDoctorByToken().then(res => {
    listDoctor.value = res.content
  })
}

watch([doctorSelect, dateBooking], async () => {
  if (doctorSelect.value && dateBooking.value) {
    const form = {
      doctorId: doctorSelect.value,
      date: formatDate(dateBooking.value)
    }
    UserApis.getListScheduleByDate(form).then(res => {
      listScheduleByDate.value = res.content
    })
  }
})

async function createBooking() {
  isLoadingCreate.value = true
  const form = {
    scheduleId: bookingClinicAdd.value.scheduleId,
    healthstatus: bookingClinicAdd.value.healthstatus,
    nhommau: bookingClinicAdd.value.nhommau,
    isTaiKham: bookingClinicAdd.value.isTaiKham ? '1' : '0',
    // namePatient: bookingClinicAdd.value.namePatient,
    namePatient: account.value.name,
    age: bookingClinicAdd.value.age,
  }
  await UserApis.createBookingByPatient(form).then(res => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: res.message,
        type: 'success',
      });
      emits('cancel','save')
    }
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }

  }).catch(err => {
    ElNotification({
      title: 'Error',
      message: err,
      type: 'error',
    });
  }).finally(() => {
    isLoadingCreate.value = false
  })
}


function handleCancel() {
  emits('cancel', 'cancel')
}

onMounted(() => {
  getListDoctorByToken()

  if (account.value.ngaysinh) {
    bookingClinicAdd.value.age = calculateAge(account.value.ngaysinh)
  }
})

function handleSave() {
  createBooking()
}

function formatDate(dateStr) {
  const dateObj = +new Date(dateStr);

  return dayjs(dateObj).format('YYYY-MM-DD');
}

function calculateAge(dateOfBirth) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If the current month is earlier than the birth month
  // or if the current month is the same but the birth day
  // is later than the current day, subtract 1 from the age
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
</script>

<style scoped>
:global(.el-select .el-input__inner:focus) {
  box-shadow: 0px 0px;
}

:global(.el-select .el-input.is-focus .el-input__inner) {
  box-shadow: 0 0 0 1px #1F1F1F;
}

:global(.el-input__inner) {
  padding: 8px !important;
}

:global(.el-date-editor.el-input) {
  width: 100% !important;
  height: 38px !important;
}

:global(.el-input__prefix-inner) {
  display: none;
}

:global(.el-input--large .el-input__inner) {
  height: 38px !important;
}
</style>