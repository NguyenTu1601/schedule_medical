<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold User information
  div.flex.gap-8.mt-8
    div.flex-1
      div.text-sm Name
      input(type='text' v-model="formUser.name" placeholder='name' class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Birthday
      el-date-picker.w-full.mt-1(v-model="formUser.birthday"
        type="date"
        placeholder="Pick a day"
        size="large"
        )
      //- input(type='text' v-model="formUser.last_name" placeholder='last name' class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Email
      input(type='text' placeholder='email' v-model="formUser.email" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Phone number
      input(type='text' placeholder='phone number' v-model="formUser.phone" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Address
      input(type='text' placeholder='address' v-model="formUser.address" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Gender
      el-select.mt-1.w-full(v-model="formUser.gender" placeholder="Gender" size="large")
        el-option(value='1' label='Nam')
        el-option(value='2' label='Nữ')
        el-option(value='3' label='Khác')
  div.flex.gap-8.mt-2
    div.flex-1.sh
      div.text-sm Vai trò
      el-select.mt-1.w-full(v-model="formUser.role" placeholder="Vai trò" size="large")
        el-option(v-for='role in listRole' :value='role.id' :label='role.ten')
    div.flex-1
      div.text-sm Password
      input(type='password' v-model="formUser.password" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-2
    div.flex-1.sh
      div.text-sm Username
      input(type='text' placeholder='username' v-model="formUser.username" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      //- div.text-sm Password
      //- input(type='password' v-model="formUser.password" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')

  div.text-sm.mt-2 Short description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formUser.shortDescription' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formUser.shortDescription')
  div.text-sm.mt-2 Description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formUser.description' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formUser.description')
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img(v-else src='../assets/loading.svg')

</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { reactive, h, ref, shallowRef, defineEmits, watch, defineProps } from "vue";
import UserApis from '@/apis/user'
import dayjs from 'dayjs'
import { VueEditor } from "vue3-editor";

const emits = defineEmits(['cancel'])
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: null,
  },
  typeEdit: {
    type: String,
    default: 'user',
  },
  formUser: {
    type: Object,
    default: null
  }
})
const editorSettings = ref({
  modules: {
    clipboard: {
      matchers: [[Node.ELEMENT_NODE, customQuillClipboardMatcher]]
    }
  }
})

const listRole = ref([])
const listHocVi = ref([])
const isLoadingCreate = ref(false)

const formUser = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  address: '',
  role: '',
  password: '',
  gender: '',
  birthday: ''
})
watch(formUser, () => {
  // console.log(formUser)
})

function customQuillClipboardMatcher(node, delta) {
  delta.ops = delta.ops.map((op) => {
    return {
      insert: op.insert
    }
  })
  return delta
}

async function getListRole() {
  await UserApis.getListRole().then(res => {
    listRole.value = res.content
  })
}
async function getListHocvi() {
  await UserApis.getListHocvi().then(res => {
    listHocVi.value = res.content
  })
}

async function createUser() {
  isLoadingCreate.value = true
  const form = {
    name: formUser.name,
    ngaysinh: formatDate(formUser.birthday),
    email: formUser.email,
    password: formUser.password,
    gender: formUser.gender,
    phonenumber: formUser.phone,
    username: formUser.username,
    roleid: formUser.role
  }
  await UserApis.createUser(form).then(res => {
    emits('cancel', 'save')
  }).finally(() => {
    isLoadingCreate.value = false
  })
}

function handleCancel() {
  emits('cancel', 'cancel')
}
onMounted(() => {
  console.log('aa')
  getListRole()
})

function handleSave() {
  createUser()
}

function formatDate(dateStr) {
  const dateObj = +new Date(dateStr);

  return dayjs(dateObj).format('YYYY-MM-DD');
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