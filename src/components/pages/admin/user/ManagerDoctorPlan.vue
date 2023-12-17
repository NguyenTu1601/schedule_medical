<template lang="pug">
div
  div.flex.gap-2
    div(class='flex-[6]')
      div.flex
        div.flex-1
          div.font-semibold.text-base Tên bác sĩ
          div.mt-1.font-medium.text-base Nguyễn Tú
        div.flex-1.pr-4
          div.font-semibold.text-base Chọn ngày
          el-date-picker.w-full.mt-1(v-model="day"
            type="date"
            placeholder="Pick a day"
            size="large"
            :disabled-date="disabledDate"
          )
      div.w-full.flex.justify-center.mt-4
        div.text-base.text-white.cursor-pointer(class='bg-[#C52428] px-4 py-2 rounded-[10px]') Lưu thông tin
    div(class='flex-[4]') 
      div(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer' :class='[{"!border-[#DA151A]":isExist("0")}]' @click='handleSelectTime("0")') Ca sáng
      div(class='border border-[#DEE3ED] w-fit rounded-full px-4 py-2 text-base cursor-pointer mt-2' :class='[{"!border-[#DA151A]":isExist("1")}]' @click='handleSelectTime("1")') Ca Chiều
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
          td.fontb(align="center") Ca sáng
          td
          td
          td
          td
          td
          td
          td
        tr(class='h-[100px]')
          td(align="center") Ca chiều
          td
          td
          td
          td
          td
          td
          td
    div(class='w-[80px] shrink-0 px-[10px] flex items-center justify-center')
      div(class='bg-[#C52428] w-[60px] h-[60px] flex items-center justify-center rounded-full shrink-0 cursor-pointer' @click="next")
        img(class='w-6 h-6' src='./assets/arrow-right.svg')
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs'

const day = ref()
const listTime = ref([])

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