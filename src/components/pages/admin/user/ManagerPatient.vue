<template lang="pug">
div
  div.mt-10.flex.gap-4
    div(class='flex-[3]')
      div.text-lg.font-semibold Chọn ngày
      el-date-picker.w-full.mt-1(v-model="date"
        type="date"
        placeholder="Pick a day"
        size="large"
        )
      div.text-lg.font-semibold.mt-4 Bộ lọc bệnh nhân
      el-select.mt-2.w-full(v-model="filter" placeholder="Tat ca" size="large")
        el-option(value='1' label='Tất cả')
        el-option(value='2' label='Chưa khám')
        el-option(value='3' label='Đã khám')
      div.text-lg.font-semibold.mt-4 Bệnh nhân
      div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px]')
        input.outline-none.text-base.w-full(v-model='patient')
        img(class='w-6 h-6 shrink-0' src='./assets/search.svg')
      div.mt-10.flex.w-full
        div.w-full.font-semibold.text-lg Đăng ký
        div.w-fit.text-lg 0
      div.mt-1.flex.w-full
        div.w-full.font-semibold.text-lg Đã khám
        div.w-fit.text-lg 0
      div.mt-1.flex.w-full
        div.w-full.font-semibold.text-lg Chưa khám
        div.w-fit.text-lg 0
    div(class='flex-[7]')
      table.w-full
        tr(class='bg-[#C80815] text-white text-sm font-bold')
          td.p-2(class='') Thời gian
          td.p-2(class='') Họ và tên
          td.p-2(class='') Cao
          td.p-2(class='') Nặng
          td.p-2(class='') Máu
          td.p-2(class='') Sex
          td.p-2(class='') Tuổi
          td.p-2(class='') Triệu chứng
          td.p-2(class='') Action

</template>
<script setup lang="ts">
import { ref } from 'vue';

const patient = ref('')
const date = ref()
const filter = ref()
</script>

<style scoped>
table {
  /* border: 1px solid #1F1F1F; */
  border-collapse: collapse;
}

td,
th,
tr,
table {
  border: 1px solid #1F1F1F;
  padding: 8px;
  font-size: 14px;
}

:global(.el-dialog__header) {
  padding: 0px;
}

:global(.el-dialog__footer) {
  padding: 0px;
}
</style>