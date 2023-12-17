<template lang="pug">
div
  div.font-bold(class='text-[18px]') Doctor Manager
  div.flex.gap-2.justify-center.items-center.w-fit.mt-4(class='rounded-[10px] px-4 py-2 cursor-pointer border border-[#C80815]' @click="handleAddUser")
    img.w-6.h-6.shrink-0(src='./assets/add.svg')
    div.text-sm.font-bold(class='text-[#C80815]') Add Doctor
  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Doctor name
      td.p-2(class='') Clinic name
      td.p-2(class='') Hoc vi
      td.p-2(class='w-[80px]') Actions
    tr(v-for='item in listToShow')
      td {{item.doctorname}}
      td {{item.clinicname}}
      td {{item.hocvi}}
      td
        div.flex.justify-between
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit')
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg')
  el-dialog(v-model="isShowModalFormUser" title="" width='1200px')
    ModalDoctorForm(v-if='isShowModalFormUser' @cancel='handleCancel' v-model:isEdit= 'isEdit' :formUser='formUser' :typeEdit='typeEdit')
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
const listToShow = ref([])
const isShowModalFormUser = ref(false)
const isEdit = ref(false)
const typeEdit = ref('user')

const formUser = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  role: '',
  password: '',
  gender: '',
  birthday: '',
  shortDescription: '',
  description: ''
})
watch(formUser, () => {
  console.log(formUser)
})

const role = computed(() => {
  return route.params.role
})

function reset() {
  formUser.name = ''
  formUser.username = ''
  formUser.email = ''
  formUser.phone = ''
  formUser.address = ''
  formUser.role = ''
  formUser.password = ''
  formUser.gender = ''
  formUser.birthday = ''
}

async function getListUser() {
  const form = {
    userid: '0'
  }
  await UserApis.getListUser(form).then(res => {
    console.log(res.content)
    listUser.value = res.content
    listToShow.value = res.content
  })
}
async function getListDoctor() {
  await UserApis.getListDoctor().then(res => {
    listDoctor.value = res.content
    listToShow.value = res.content
  })
}

function handleAddUser() {
  isShowModalFormUser.value = true
}

function handleEdit() {
  isShowModalFormUser.value = true
}

function handleCancel(val) {
  isShowModalFormUser.value = false
  isEdit.value = false
  getListUser()
}

onMounted(() => {
  if (role.value === 'user') {
    getListUser()
  } else if (role.value === 'doctor') {
    getListDoctor()
  }
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