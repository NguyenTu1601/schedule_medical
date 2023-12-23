<template lang="pug">
div
  div.flex.gap-2
    div(class='flex-[6]')
      div.flex
        div.flex-1
          div.font-semibold.text-base Tên bác sĩ
          div.mt-1.font-medium.text-base {{account?.name}}
        div.flex-1.pr-4
          div.font-semibold.text-base Chọn ngày
          el-date-picker.w-full.mt-1(v-model="day"
            type="date"
            placeholder="Pick a day"
            size="large"
            :disabled-date="disabledDate"
          )
      div.w-full.flex.justify-center.mt-4
        div.text-base.text-white.cursor-pointer( v-if='!isLoading' class='bg-[#C52428] px-4 py-2 rounded-[10px] w-[130px] flex justify-center' @click='handleSave') Lưu thông tin
        div.text-base.text-white.cursor-pointer(v-else class='bg-[#C52428] px-4 py-2 rounded-[10px] w-[130px] flex justify-center' )
          img.w-6.h-6.shrink-0(src='./assets/loading.svg')
    div(class='flex-[4]') 
      div.flex.gap-2(class='mt-[20px]')
        div.select-none(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer' :class='[{"!bg-[#DA151A] text-white":isExist("0")}]' @click='handleSelectTime("0")' ) Ca sáng
        div.select-none(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer' :class='[{"!bg-[#DA151A] text-white":isExist("1")}]' @click='handleSelectTime("1")' ) Ca chiều
        //- div(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer' :class='[{"!border-[#DA151A]":isExist("0")}]' @click='handleSelectTime("0")') Ca sáng
        //- div(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer' :class='[{"!border-[#DA151A]":isExist("1")}]' @click='handleSelectTime("1")') Ca Chiều
  div.mt-10.flex
    div(class='w-[80px] shrink-0 px-[10px] flex items-center justify-center')
      div(class='bg-[#C52428] w-[60px] h-[60px] flex items-center justify-center rounded-full shrink-0 cursor-pointer' @click="prev")
        img(class='w-6 h-6' src='./assets/arrow-left.svg')
    div.w-full
      table.w-full
        tr
          td
          td(align="center")
            div Thứ 2
            div {{ formatDate(mondayToView) }}
          td(align="center")
            div Thứ 3
            div {{ formatDate(mondayToView+86400000) }}
          td(align="center")
            div Thứ 4
            div {{ formatDate(mondayToView+86400000*2) }}
          td(align="center")
            div Thứ 5
            div {{ formatDate(mondayToView+86400000*3) }}
          td(align="center")
            div Thứ 6
            div {{ formatDate(mondayToView+86400000*4) }}
          td(align="center")
            div Thứ 7
            div {{ formatDate(mondayToView+86400000*5) }}
          td(align="center")
            div Chủ nhật
            div {{ formatDate(mondayToView+86400000*6) }}
        tr(class='h-[100px]')
          td.font-bold(align="center") Ca sáng
          td(v-for='item in 7')
            DateInWeek(:time='0' :listScheduleDates='listScheduleDates' :day='mondayToView+86400000*(item-1)') a
        tr(class='h-[100px]')
          td.font-bold(align="center") Ca chiều
          td(v-for='item in 7')
            DateInWeek(:time='1' :listScheduleDates='listScheduleDates' :day='mondayToView+86400000*(item-1)') a

    div(class='w-[80px] shrink-0 px-[10px] flex items-center justify-center')
      div(class='bg-[#C52428] w-[60px] h-[60px] flex items-center justify-center rounded-full shrink-0 cursor-pointer' @click="next")
        img(class='w-6 h-6' src='./assets/arrow-right.svg')
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs'
import UserApis from '@/apis/user'
import useAccount from "@/compositions/useAccount";
import { onMounted } from 'vue';
import DateInWeek from './component/DateInWeek.vue';
import { ElNotification } from 'element-plus';

const { account, getAccount } = useAccount()

const day = ref()
const listTime = ref([])
const isLoading = ref(false)

const nextMonday = computed(() => {
  var today = new Date();
  var dayOfWeek = today.getDay();
  var daysToAdd = (dayOfWeek === 1) ? 7 : (1 + (7 - dayOfWeek));
  var nextMonday = +new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToAdd);
  return nextMonday
})
const mondayToView = ref(nextMonday.value - 604800000)

const disabledDate = (time) => {
  return dayjs(nextMonday.value).subtract(1, 'day') > time
}

const listScheduleByDate = ref([])
const listScheduleDates = ref([])

async function handleGetListSchedulebyDates() {
  const form = {
    doctorId: account.value.id,
    fromDate: dayjs(mondayToView.value).format('YYYY-MM-DD'),
    toDate: dayjs(mondayToView.value + 86400000 * 6).format('YYYY-MM-DD'),
  }
  await UserApis.getListSchedulebyDates(form).then(res => {
    listScheduleDates.value = res.content
  })
}

watch(mondayToView, async () => {
  await handleGetListSchedulebyDates()
}, { immediate: true, deep: true })

watch(day, async () => {
  const form = {
    doctorId: account.value.id,
    date: dayjs(day.value).format('YYYY-MM-DD'),
  }
  await UserApis.getListSchedulebyDate(form).then(res => {
    listScheduleByDate.value = res.content
    if (listScheduleByDate.value.length > 0) {
      listTime.value = listScheduleByDate.value.map(item => {
        return item.timeid.toString()
      })
    } else {
      listTime.value = []
    }

  })
})


function handleSelectTime(time) {
  var index = listTime.value.indexOf(time);

  if (index !== -1) {
    listTime.value.splice(index, 1);
  } else {
    listTime.value.push(time);
  }
}

function isExist(time) {
  var index = listTime.value.indexOf(time);
  if (index !== -1) {
    return true
  }
  return false
}

function formatDate(date) {
  const day = dayjs(date).format('DD/MM/YYYY')
  return day
}

function next() {
  mondayToView.value = mondayToView.value + 604800000
}

function prev() {
  mondayToView.value = mondayToView.value - 604800000

}

async function handleSave() {
  isLoading.value = true
  const form = {
    doctorId: account.value.id,
    date: dayjs(day.value).format('YYYY-MM-DD'),
    time: listTime.value
  }
  await UserApis.createScheduleDoctor(form).then(async (res) => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: 'Lưu lịch hẹn thành công',
        type: 'success',
      });
    }
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    isLoading.value = false
    handleGetListSchedulebyDates()

  }).catch(err => {
    isLoading.value = false
  })
}

onMounted(async () => {
  await handleGetListSchedulebyDates()
})
</script>

<style scoped>
table,
th,
td {
  border: 1px solid #C52428;
  border-collapse: collapse;
}

td {
  font-size: 16px;
  align-items: center;
}

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