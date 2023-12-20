<template lang="pug">
div
  div.font-bold(class='text-[18px]') Quản lý bác sĩ
  //- div.flex.gap-2.justify-center.items-center.w-fit.mt-4(class='rounded-[10px] px-4 py-2 cursor-pointer border border-[#C80815]' @click="handleAddUser")
  //-   img.w-6.h-6.shrink-0(src='./assets/add.svg')
  //-   div.text-sm.font-bold(class='text-[#C80815]') Thêm bác sĩ
  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Tên bác sĩ
      td.p-2(class='') Tên phòng khám
      td.p-2(class='') Hoc vi
      td.p-2(class='w-[80px]') Actions
    tr(v-for='item in listDoctor')
      td {{item.doctorname}}
      td {{item.clinicname}}
      td {{item.hocvi}}
      td
        div.flex.justify-between
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit(item)')
          //- img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg')
  el-dialog(v-model="isShow" title="" width='1200px')
    ModalDoctorForm(v-if='isShow' @cancel='handleCancel' v-model:isEdit= 'isEdit' :formDoctor='formDoctor')
    div(v-else)
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import ModalDoctorForm from './component/ModalDoctorForm.vue';
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import { onMounted } from 'vue';

const route = useRoute()
const router = useRouter()

const listUser = ref([])
const listDoctor = ref([])
const isShow = ref(false)
const isEdit = ref(false)

const formDefault = ref({
  Id: '',
  doctorname: "",
  description: "",
  short_description: "",
  clinicid: '',
  clinicname: "",
  hocvi: "",
  hocviid: '',
  avtimage: "",
  ngaysinh: "",
  email: "",
  phonenumber: ""
})

const formDoctor = ref({
  Id: '',
  doctorname: "",
  description: "",
  short_description: "",
  clinicid: '',
  clinicname: "",
  hocvi: "",
  hocviid: '',
  avtimage: "",
  ngaysinh: "",
  email: "",
  phonenumber: ""
})


const role = computed(() => {
  return route.params.role
})


async function getListDoctor() {
  await UserApis.listDoctorByToken().then(res => {
    listDoctor.value = res.content
  })
}

function handleAddUser() {
  isShow.value = true
}

function handleEdit(item) {
  formDoctor.value = item
  isShow.value = true
}

function handleCancel(val) {
  isShow.value = false
  isEdit.value = false
  getListDoctor()
}

onMounted(() => {
  getListDoctor()

})
</script>

<style scoped >
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