<template lang="pug">
div.w-full.h-full.px-10.py-6
  div(class='bg-white p-6')
    div.flex.gap-6
      img(class='h-[150px] w-[150px]' :src='account?.avtimage')
      div
        div(class='font-bold text-[18px]') {{ account?.name }}
        div(v-html='account?.short_description')
    div.flex.gap-4.mt-4
      div
        div Doanh thu từ ngày
        el-date-picker.w-full.mt-1(v-model="dayStart"
        type="date"
        placeholder=""
        size="large"
        )
      div 
        div Doanh thu đến ngày
        el-date-picker.w-full.mt-1(v-model="dayEnd"
        type="date"
        placeholder=""
        size="large"
        )

  div(class='bg-white p-6 mt-6 flex gap-6')
    div.flex.flex-col(class='w-[400px] shrink-0')
      div.p-6.border(class='border-[#EFE8E8] rounded-3xl')
        div.text-center.text-base.font-semibold Lịch hẹn 
          div.border-t(class='border-[#EFE8E8] my-3')
          div.flex
            div.flex-1(class='border-r border-[#EFE8E8]')
              div.text-center(class='text-[#796D6D] text-sm') Đã thanh toán
              div.mt-3(class='text-[#4A6800] font-semibold text-center') {{ bookingInfo?bookingInfo.lichhendathanhtoan:0 }}
            div.flex-1(class='border-r border-[#EFE8E8]')
              div.text-center(class='text-[#998f8f] text-sm') Đã khám
              div.mt-3(class='text-[#0061A4] font-semibold text-center') {{ bookingInfo? bookingInfo.lichhendakham:0 }}
            div.flex-1
              div.text-center(class='text-[#796D6D] text-sm') Đã xác nhận
              div.mt-3(class='text-[#D29700] font-semibold text-center') {{bookingInfo ? bookingInfo.lichhendaxacnhan:0}}
      div.p-6.border(class='border-[#EFE8E8] rounded-3xl mt-6')
        div.text-center.text-base.font-semibold Tổng doanh thu
        div(class='text-[28px] text-[#F4803F] font-bold text-center') {{revenue?numberWithCommas(revenue.tongdoanhthu):0}} đ
        div.border-t(class='border-[#EFE8E8] my-3')
        div.flex.justify-between.text-sm
          div(class='text-[#796D6D]') Doanh thu lịch hẹn
          div(class='text-[#4A6800] font-semibold') {{revenue?numberWithCommas(revenue.doanhthulichhen):0}} đ
        div.flex.justify-between.text-sm.mt-3
          div(class='text-[#796D6D]') Doanh thu thuốc
          div(class='text-[#0061A4] font-semibold') {{revenue?numberWithCommas(revenue.doanhthuthuoc):0}} đ
        //- div.border-t(class='border-[#EFE8E8] my-3')
        //- div.flex.justify-between.text-sm.mt-3
        //-   div(class='text-[#796D6D]') Total discount value
        //-   div(class='text-[#0061A4] font-semibold') {{numberWithCommas(reportRevenue.revenueTotalDiscountValue)}} đ
        div.border-t(class='border-[#EFE8E8] mt-3')
    div.p-6.border(class='border-[#EFE8E8] rounded-3xl w-full')
      div.text-base.font-semibold Top loại thuốc
      div.border-t(class='border-[#EFE8E8] my-3')
      div
        div.flex.justify-between.my-2(v-if='listMedicine' v-for='item in listMedicine')
          div.text-base.font-semibold {{item.name}}
          div {{ item.soluongbanra }}
  div.mt-6.p-6.rounded-3xl.border(class='border-[#EFE8E8] bg-white')
    div
      div.font-semibold.text-base Số lượt đặt lịch
      div(class='h-[1px] border-t border-[#EFE8E8] my-3')
      div.text-xs số lượt
      div(class='h-[500px] mt-3')
        Line(:data="data" :options="options" :height='500')
</template>

<script setup lang="ts">
import useAccount from "@/compositions/useAccount";
import dayjs from 'dayjs'
import {
  Chart as ChartJSRevenue,
  CategoryScale as CategoryScale1,
  LinearScale as LinearScale1,
  PointElement as PointElement1,
  LineElement as LineElement1,
  Title as Title1,
  Tooltip as Tooltip1,
} from 'chart.js'
import { computed, watch } from "vue";
import { Line } from 'vue-chartjs'
import { ref } from "vue";
import UserApis from '@/apis/user'

const { account, getAccount } = useAccount()
const dayStart = ref()
const dayEnd = ref()
const selectConstantDay = ref()

const bookingInfo = ref()
const revenue = ref()
const listMedicine = ref()
const dataLichHen = ref([])
const dataLichHenLabel = ref([])
const dataLichHenData= ref([])
watch([dayStart, dayEnd], async () => {
  if (dayStart.value, dayEnd.value) {
    const form = {
      doctorId: account.value.id,
      fromDate: formatDate(dayStart.value),
      toDate: formatDate(dayEnd.value)
    }
    await UserApis.getBookingInfo(form).then(res => {
      bookingInfo.value = res.content
    })
    await UserApis.getDoanhThu(form).then(res => {
      revenue.value = res.content
    })
    await UserApis.getDataLoaiThuoc(form).then(res => {
      listMedicine.value = res.content
    })
    await UserApis.getDataLichHen(form).then(res => {
      dataLichHen.value = res.content

    })
  }
})

const labelsArray = ['4/9', '5/9', '5/9', '7/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9', '4/9',]
const dataArray = [40, 39, 10, 40, 39, 80, 0, 40, 39, 10, 40, 39, 80, 40, 40, 39, 10, 40, 39, 80]

const lichHenLabel = computed(() => {
  const label = dataLichHen.value?.map((data) => {
    return data.date
  })
  return label
})
const lichHenData = computed(() => {
  const data = dataLichHen.value?.map((data) => {
    return data.solichhen
  })
  return data
})

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.1,
    scales: {
      y: {
        beginAtZero: true,
        // max: maxRevenue.value + (maxRevenue.value * 0.2)
      }
    }
  }
})
const data = computed(() => {
  return {
    labels: lichHenLabel.value,
    datasets: [
      {
        label: 'Revenue',
        // backgroundColor: 'linear-gradient(180deg, #F6767A 0%, rgba(255, 255, 255, 0.00) 99.68%);',
        data: lichHenData.value,
        fill: -1,
        backgroundColor: '#E91D23',
        borderColor: '#E91D23'
      }
    ]
  }
})
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function formatDate(dateStr) {
  const dateObj = +new Date(dateStr);

  return dayjs(dateObj).format('YYYY-MM-DD');
}
ChartJSRevenue.register(
  CategoryScale1,
  LinearScale1,
  PointElement1,
  LineElement1,
  Title1,
  Tooltip1,
)
</script>

<style scoped></style>