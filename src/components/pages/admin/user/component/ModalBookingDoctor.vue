<template lang="pug">
div.overflow-y-auto
  div.text-xl.font-bold Thông tin bệnh án
  div.mt-4.text-lg.font-bold Thông tin bệnh nhân:
  //- div.mt-4.flex.gap-
  //-   div.text-base.font-semibold Mã lịch hẹn:
  //-   div.text-base {{ detailBooking?.code }}
  div.mt-4.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Mã lịch hẹn:
      div.text-base {{ detailBooking?.code }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tuổi:
      div.text-base {{ detailBooking?.age }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Nhóm máu:
      div.text-base {{ detailBooking?.nhommau }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Triệu chứng
      div.text-base {{ detailBooking?.health_status }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tên bệnh nhân:
      div.text-base {{ detailBooking?.namePatient }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tái khám:
      img.w-5.h-5(v-if='detailBooking && detailBooking?.isTaikham===1' src='../assets/check.svg')
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold ID bệnh nhân:
      div.text-base {{ detailBooking?.patientId }}
    div.flex-1.flex.gap-2

  div.mt-4.text-lg.font-bold Đơn thuốc:
  div.mt-4
    div.text-sm.whitespace-nowrap Chẩn đoán
    textarea(type='text' rows="4" placeholder='bác sĩ ghi chẩn đoán' v-model="diagnostic" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')

  div.mt-4
    div.text-sm.whitespace-nowrap Lời dặn
    textarea(type='text' rows="4" placeholder='bác sĩ ghi lời dặn' v-model="advice" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.items-center.mt-4
    div.text-sm.whitespace-nowrap Ngày tái khám
    el-date-picker.w-full.mt-1(v-model="taikhamDate"
      type="date"
      placeholder="ngày tái khám"
      size="large"
      ) 
  div(class='mt-4')
    table.w-full
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='') Tên thuốc
        td.p-2(class='') số lượng
        td.p-2(class='w-[100px]') Hành động
      RowMedicineBooking(v-for='(item,idx) in listMedicine' v-model:listMedicine='listMedicine' :idx='idx' :key='idx')
      //- tr(v-for='(item,idx) in listMedicine')
      //-   td.p-2(class='')
      //-     el-popover(:visible="item.name.length>0" placement="bottom" :width="200")
      //-       template(#reference)
      //-         input.w-full(v-model='item.name' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
      //-       template(#default)
      //-         div aaa
      //-   td.p-2(class='')
      //-     input.w-full(v-model='item.description' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
      //-   td
      //-     div.flex.justify-between(v-if='idx===listMedicine.length-1')
      //-       img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/add-black.svg' @click='handleAdd')
      //-       img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/delete.svg' @click="handleDelete")
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel
    div.cursor-pointer.px-4.py-2.border(v-if='step===1' class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoading') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')
    div.cursor-pointer.px-4.py-2.border(v-else class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleprint(detail)")
      div() In đơn thuốc

</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue"
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import RowMedicineBooking from "./RowMedicineBooking.vue"
import { ElNotification, ElPopconfirm } from 'element-plus';

const emits = defineEmits(['cancel'])
const props = defineProps(['bookingId'])


const listMedicine = ref([{
  name: '',
  code: '',
  unit: '',
  description: '',
  amout: 0,
  id: ''
}])
const isLoading = ref(false)
const detailBooking = ref()
const diagnostic = ref('')
const taikhamDate = ref()
const advice = ref('')
const step = ref(1)

const bookingId = computed(() => {
  return props.bookingId
})

const visible = computed(() => {
  return
})

function handleAdd() {
  listMedicine.value.push({
    name: '',
    code: '',
    unit: '',
    description: '',
    amout: 0,
    id: ''
  })
}

function handleDelete() {
  if (listMedicine.value.length > 1) {
    listMedicine.value.pop()
  }
}

function handleCancel(type) {
  emits('cancel', type)
}

const detail = ref()

function handleSave() {
  isLoading.value = true
  const listMedicineFilter = listMedicine.value.map(item => {
    return { medicineId: item.id, amount: item.amout }
  })
  const form = {
    bookingId: bookingId.value,
    diagnostic: diagnostic.value,
    taikhamDate: dayjs(taikhamDate.value).format('YYYY-MM-DD'),
    advice: advice.value,
    medicines: listMedicineFilter
  }
  console.log(form)
  UserApis.createHistoryByDoctor(form).then(async (res) => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: res.message,
        type: 'success',
      });
      step.value = step.value + 1
      const form1 = {
        historyId: res.content.id
      }
      await UserApis.getDetailHistoryByDoctor(form1).then(res => {
        detail.value = res.content
      })
    }
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    isLoading.value = false
    // handleCancel('save')
  }).finally(() => {
    isLoading.value = false
    // handleCancel('save')
  })
}

async function getDetailBooking() {
  const form = {
    bookingId: bookingId.value
  }
  await UserApis.getDetailBooking(form).then(res => {
    detailBooking.value = res.content[0]
    console.log(detailBooking.value)
  })
}
onMounted(() => {
  console.log(bookingId.value)
  getDetailBooking()
})

function handleprint(detail) {
  const htmlContent = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }

        .prescription-form {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        h2 {
          text-align: center;
        }

        table {
          width: 100%;
          margin-bottom: 10px;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        th {
          background-color: #4caf50;
          color: white;
        }

        .text-label {
          display: flex;
          align-items: center;
        }

        label {
          width: 120px;
          margin-right: 10px;
          font-weight: bold;
        }

        button {
          padding: 10px;
          background-color: #4caf50;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          display: block;
          margin: 0 auto;
        }

        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="prescription-form">
        <h2>Đơn thuốc</h2>

        <div class="text-label">
          <label>Phòng khám:</label>
          <p>${detail?.clinicName}</p>
          <label style="margin-left:60px">Mã bệnh án:</label>
          <p>${detail?.historyCode}</p>
        </div>

        <div class="text-label">
          <label>Bệnh nhân:</label>
          <p>${detail?.patientName}</p>
        </div>

        <div class="text-label">
          <label>Bác sĩ:</label>
          <p>${detail?.doctorName}</p>
        </div>

        <div class="text-label">
            <label>Chẩn đoán:</label>
            <p>${detail?.diagnostic}</p>
          </div>
        <div class="text-label">
            <label>Lời dặn:</label>
            <p>${detail?.advice}</p>
        </div>
        <div class="text-label">
            <label>Ngày tái khám:</label>
            <p>${detail?.re_examinationDate}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tên thuốc</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            ${detail.medicines
      .map(
        (item, index) => `
                                <tr key="${index}">
                                  <td>${item.mathuoc} - ${item.name}</td>
                                  <td>${item.unit}</td>
                                  <td>${item.soluong}</td>
                                </tr>
                              `
      )
      .join('')}
            <!-- Add more rows for additional medicines -->
          </tbody>
        </table>

      </div>
    </body>
    </html>

      `;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  } else {
    console.error('Unable to open print window');
  }
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