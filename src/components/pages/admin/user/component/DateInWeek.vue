<template lang="pug">
div(v-if='listScheduleDates')
  div(v-if='isHaveSchedule' class='flex justify-center') 
    img(class="w-[60px] h-[60px]" src='../assets/check-red.svg')
 
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { onMounted } from 'vue';
import { computed, ref, watch, defineProps } from 'vue';

const props = defineProps(['listScheduleDates', 'time', 'day'])

const time = computed(() => { return props.time })

const listScheduleDates = computed(() => { return props.listScheduleDates })

const day = computed(() => { return props.day })

const isHaveSchedule = computed(() => {
  const dayFormat = formatDate(day.value)
  let isExist = listScheduleDates.value.some(schedule => {
    return dayFormat === schedule.date && time.value.toString() === schedule.timeid.toString()
  }
  )
  console.log(isExist)
  return isExist
})

onMounted(() => {
  // console.log(props)
})

function formatDate(date) {
  const day = dayjs(date).format('YYYY-MM-DD')
  return day
}
</script>

<style scoped></style>