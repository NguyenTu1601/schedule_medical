<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Tạo mới đổi ca

  div.flex.gap-4.mt-4
    div.flex-1
      div.text-sm Bác sĩ đổi ca
      el-select.mt-1.w-full(v-model="fromDoctor" placeholder="Bác sĩ đổi ca" size="large")
        el-option(v-for="doctor in listDoctor" :value='doctor.Id' :label='doctor.doctorname')

    div.flex-1
      div.text-sm Lịch hẹn
      el-select.mt-1.w-full(v-model="schedule" placeholder="lịch hẹn" size="large")
        el-option(v-for="schedule in listSchedule" :value='schedule.scheduleId' :label='formatScheduleLabel(schedule)')
    div.flex-1
      div.text-sm Bác sĩ thay thế
      el-select.mt-1.w-full(v-model="toDoctor" placeholder="Bác sĩ thay thế" size="large")
        el-option(v-for="item in listDoctorFree" :value='item.doctorId' :label='item.doctorName')

  div.text-sm.whitespace-nowrap.mt-4 Lý do đổi ca
  textarea(type='text' rows="4" placeholder='Lý do đổi ca' v-model="reason" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { ref, defineEmits } from 'vue';
import UserApis from '@/apis/user'
import dayjs from 'dayjs';
import { ElNotification } from 'element-plus';

const emits = defineEmits(['cancel'])

const fromDoctor = ref()
const schedule = ref()
const toDoctor = ref()
const reason = ref('')

const listDoctor = ref([])
const listSchedule = ref([])
const listDoctorFree = ref([])

watch(fromDoctor, () => {
  schedule.value = null
  toDoctor.value = null
  if (fromDoctor.value) {
    getListScheduleByDoctor()
  }
})

watch(schedule, () => {
  toDoctor.value = null
  if (schedule.value) {
    getListDoctorFreeTime()
  }
})

async function handleSave() {
  const form = {
    scheduleId: schedule.value,
    fromDoctorId: fromDoctor.value,
    toDoctorId: toDoctor.value,
    reason: reason.value
  }
  await UserApis.createChangeScheduleByDoctor(form).then(res => {
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
  })
}

function handleCancel() {
  emits('cancel', 'cancel')
}

function formatScheduleLabel(schedule) {
  return schedule.timedt + ' ' + convertDay(schedule.date)
}

async function getListDoctorFreeTime() {
  const form = {
    scheduleId: schedule.value
  }
  await UserApis.getDoctorFreeTime(form).then(res => {
    listDoctorFree.value = res.content
  })
}
async function getListDoctor() {
  await UserApis.listDoctorByToken().then(res => {
    listDoctor.value = res.content
  })
}
async function getListScheduleByDoctor() {
  const form = {
    fromdoctorId: fromDoctor.value
  }
  await UserApis.getScheduleToChange(form).then(res => {
    listSchedule.value = res.content
  })
}
function convertDay(day) {
  return dayjs(day).format('DD-MM-YYYY')
}
onMounted(() => {
  getListDoctor()
})
</script>

<style scoped></style>