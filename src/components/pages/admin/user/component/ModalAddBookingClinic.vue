<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin lịch hẹn

  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tên
      input(type='text' placeholder='tên' v-model="bookingClinicAdd.namePatient" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Số điện thoại
      input(type='text' placeholder='số điện thoại' v-model="bookingClinicAdd.phonenumber" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Email bệnh nhân
      input(type='text' placeholder='email' v-model="bookingClinicAdd.emailPatient" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Địa chỉ
      input(type='text' placeholder='dia chi' v-model="bookingClinicAdd.address" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Ngày sinh
      el-date-picker.w-full.mt-1(v-model="bookingClinicAdd.dob"
        type="date"
        placeholder="ngày sinh"
        size="large"
        )
    div.flex-1
      div.text-sm Tuổi
      input(type='text' placeholder='tuoi' v-model="bookingClinicAdd.age" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Triệu chứng
      input(type='text' placeholder='triệu chứng' v-model="bookingClinicAdd.healthstatus" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')

  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Nhóm máu
      input(type='text' placeholder='nhóm máu' v-model="bookingClinicAdd.nhommau" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1.flex.items-center
      el-checkbox(v-model="bookingClinicAdd.isTaiKham" label="Tái khám" size="large")

  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Bác sĩ
      el-select.mt-1.w-full(v-model="doctorSelect" placeholder="Bác sĩ" size="large")
        el-option(v-for='doctor in listDoctor' :value='doctor.Id' :label='doctor.doctorname')

    div.flex-1
      div.text-sm Ngày Khám
      el-date-picker.w-full.mt-1(v-model="dateBooking"
        type="date"
        placeholder="ngày khám"
        size="large"
        )
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Chọn lịch hẹn
      el-select.mt-1.w-full(v-model="timeSelect" placeholder="Lịch hẹn" size="large")
        el-option(v-for='item in listScheduleByDate' :value='item.id' :label='item.timedt')

    div.flex-1


  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(v-if='step===1' class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')
    div.cursor-pointer.px-4.py-2.border(v-else class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleprint(detail)")
      div() In lịch hẹn

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
const props = defineProps(['bookingClinicAdd'])

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
    scheduleId: timeSelect.value,
    healthstatus: bookingClinicAdd.value.healthstatus,
    nhommau: bookingClinicAdd.value.nhommau,
    isTaiKham: bookingClinicAdd.value.isTaiKham ? '1' : '0',
    emailPatient: bookingClinicAdd.value.emailPatient,
    namePatient: bookingClinicAdd.value.namePatient,
    dob: formatDate(bookingClinicAdd.value.dob),
    phonenumber: bookingClinicAdd.value.phonenumber,
    address: bookingClinicAdd.value.address,
    age: bookingClinicAdd.value.age,
  }
  await UserApis.createBookingByAdmin(form).then(async (res) => {
    if (res.result === 1) {
      ElNotification({
        title: 'Success',
        message: res.message,
        type: 'success',
      });
      const form = {
        bookingId: res.content.id
      }
      await UserApis.getDetailBooking(form).then(res1 => {
        detail.value = res1.content[0]
        
      })
      step.value = 2
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

const detail = ref()
function handleCancel() {
  emits('cancel', 'cancel')
}

onMounted(() => {
  getListDoctorByToken()
})

function handleSave() {
  createBooking()
}

function formatDate(dateStr) {
  const dateObj = +new Date(dateStr);

  return dayjs(dateObj).format('YYYY-MM-DD');
}
async function print() {

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
        <h2>Phiếu khám</h2>

        <div class="text-label">
          <label>Mã lịch hẹn:</label>
          <p>${detail?.code}</p>
        </div>
        <div class="text-label">
          <label>Số thứ tự:</label>
          <p>${detail?.stt}</p>
        </div>

        <div class="text-label">
          <label>Bệnh nhân:</label>
          <p>${detail?.namePatient}</p>
        </div>

        <div class="text-label">
          <label>Bác sĩ:</label>
          <p>${detail.doctorName ? detail?.doctorName : ""}</p>
        </div>

          
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
</style>