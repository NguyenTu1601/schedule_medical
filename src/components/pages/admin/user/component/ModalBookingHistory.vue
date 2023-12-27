<template lang="pug">
div.overflow-y-auto
  div.text-xl.font-bold Thông tin lịch sử khám bệnh

  div.mt-4.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Mã bệnh án:
      div.text-base {{ detailBooking?.historyCode }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tên bệnh nhân:
      div.text-base {{ detailBooking?.patientName }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Ngày tái khám:
      div.text-base {{ detailBooking?.re_examinationDate }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Tuổi:
      div.text-base {{ detailBooking?.age }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Lời khuyên:
      div.text-base {{ detailBooking?.advice }}
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Chuẩn đoán:
      div.text-base {{ detailBooking?.diagnostic }}
  div.mt-2.flex
    div.flex-1.flex.gap-2
      div.text-base.font-semibold Bác sĩ:
      div.text-base {{ detailBooking?.doctorName }}
    div.flex-1.flex.gap-2
      d
  div
    table.w-full.mt-4
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='whitespace-nowrap') Mã thuốc
        td.p-2(class='whitespace-nowrap') Tên thuốc
        td.p-2(class='whitespace-nowrap') Thông tin
        td.p-2(class='whitespace-nowrap') Số liều 1 ngày
        td.p-2(class='whitespace-nowrap') Đơn vị
        td.p-2(class='whitespace-nowrap') Đơn giá
        td.p-2(class='whitespace-nowrap') Thành tiền
      tr(v-if='detailBooking && detailBooking.medicines' v-for='item in detailBooking.medicines')
        td.p-2(class='break-keep') {{ item.mathuoc }}
        td.p-2(class='') {{ item.name }}
        td.p-2(class='') {{ item.description }}
        td.p-2(class='') {{ item.solieungay }}
        td.p-2(class='') {{ item.unit }}
        td.p-2(class='') {{ item.dongia }}
        td.p-2(class='') {{ item.renevue }}
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel

    div.cursor-pointer.px-4.py-2.border(v-if='detailBooking?.thanhtoanthuoc==="0"' class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click='handlePay')
      div() Thanh toán đơn thuốc
    div.cursor-pointer.px-4.py-2.border(v-if='detailBooking?.thanhtoanthuoc==="1"' class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click='handlePrintBill')
      div() In hóa đơn

    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white')
      div(@click="handleprint(detailBooking)") in đơn thuốc
</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue"
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import RowMedicineBooking from "./RowMedicineBooking.vue"
import { ElNotification } from "element-plus";
import useAccount from "@/compositions/useAccount";

const { account, getAccount } = useAccount()

const emits = defineEmits(['cancel'])
const props = defineProps(['history'])
const detailBooking = ref()

const history = computed(() => {
  return props.history
})

const bookingHistory = ref([])

const visible = computed(() => {
  return
})

async function getDetailBooking() {
  const form = {
    historyId: history.value.historyId
  }
  if (account.value.roleID === 2) {

    await UserApis.getDetailHistoryByDoctor(form).then(res => {
      detailBooking.value = res.content
    })
  } else {
    await UserApis.getDetailHistoryByAdminClinic(form).then(res => {
      detailBooking.value = res.content
    })
  }
}

function handlePrintBill() {
  window.open("http://1.53.252.173:7754/api/invoice/generate?historyId="+ history.value.historyId);
}

function handleCancel(type) {
  emits('cancel', type)
}

async function handlePay() {
  const form = {
    historyId: history.value.historyId
  }
  await UserApis.accessToPayMedicine(form).then(async (res) => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: 'Thanh toán thành công',
        type: 'success',
      });
      handleCancel('pay')
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
onMounted(async () => {
  await getDetailBooking()
})
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