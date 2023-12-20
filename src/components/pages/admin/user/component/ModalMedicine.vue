<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thêm thông tin thuốc
  div(class='mt-4')
    table.w-full
      tr(class='bg-[#C80815] text-white text-sm font-bold')
        td.p-2(class='') Tên thuốc
        td.p-2(class='') Mã thuốc
        td.p-2(class='') Đơn vị tính
        td.p-2(class='') Mô tả
        td.p-2(class='') Giá tiền
        td.p-2(v-if='!isEdit' class='w-[90px]') Hành động
      tr(v-for='(item,idx) in listMedicine')
        td.p-2(class='') 
          input(v-model='item.name' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          input(v-model='item.code' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          //- input(v-model='item.unit' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
          el-select.mt-1.w-full(v-model="item.unit" size="large")
            el-option(value='Viên' label='Viên')
            el-option(value='Tuýp' label='Tuýp')
        td.p-2(class='')
          input(v-model='item.description' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td.p-2(class='')
          input(type='number' v-model='item.price' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
        td(v-if='!isEdit')
          div.flex.justify-between(v-if='idx===listMedicine.length-1')
            img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/add-black.svg' @click='handleAdd')
            img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/delete.svg' @click="handleDelete")
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel('cancel')") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoading') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')

</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue";
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import { ElNotification } from "element-plus";

const props = defineProps(['medicineEdit', 'isEdit'])
const emits = defineEmits(['cancel'])

const listMedicine = ref([])

const isLoading = ref(false)
const medicineEdit = computed(() => {
  return props.medicineEdit
})
const isEdit = computed(() => {
  return props.isEdit
})
function handleAdd() {
  listMedicine.value.push({
    name: '',
    code: '',
    unit: '',
    description: '',
    amout: 2.5,
    price: ''
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

function handleSave() {
  if (isEdit.value) {
    console.log(listMedicine.value[0])
    const form = {
      clinicName: listMedicine.value[0].clinicName,
      clinicid: listMedicine.value[0].clinicid,
      code: listMedicine.value[0].code,
      description: listMedicine.value[0].description,
      medicineId: listMedicine.value[0].id,
      name: listMedicine.value[0].name,
      price: listMedicine.value[0].price,
      statusid: listMedicine.value[0].statusid,
      trangthaitext: listMedicine.value[0].trangthaitext,
      unit: listMedicine.value[0].unit,
    }
    UserApis.updateMedicine(form).then((res) => {
      if (res.result === 1) {
        ElNotification({
          title: 'Success',
          message: res.message,
          type: 'success',
        });
        emits('cancel', 'save')
      }
      if (res.result === 0) {
        ElNotification({
          title: 'Error',
          message: res.message,
          type: 'error',
        });
      }
      isLoading.value = false
      handleCancel('save')
    }).finally(() => {
      isLoading.value = false
      handleCancel('save')
    })
  } else {
    isLoading.value = true
    UserApis.createMedicine(listMedicine.value).then((res) => {
      if (res.result === 1) {
        ElNotification({
          title: 'Success',
          message: res.message,
          type: 'success',
        });
        emits('cancel', 'save')
      }
      if (res.result === 0) {
        ElNotification({
          title: 'Error',
          message: res.message,
          type: 'error',
        });
      }
      isLoading.value = false
      handleCancel('save')
    }).finally(() => {
      isLoading.value = false
      handleCancel('save')
    })
  }

}

onMounted(() => {
  if (isEdit.value === true) {
    listMedicine.value.push(medicineEdit.value)
  } else {
    handleAdd()
  }
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