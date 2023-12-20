<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin người dùng
  div.flex.gap-8.mt-8
    div.flex-1
      div.text-sm Tên người dùng
      input(type='text' v-model="formUser.name" placeholder='name' class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Ngày sinh
      el-date-picker.w-full.mt-1(v-model="formUser.ngaysinh"
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
      div.text-sm Số điện thoại
      input(type='text' placeholder='phone number' v-model="formUser.phonenumber" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Địa chỉ
      input(type='text' placeholder='address' v-model="formUser.address" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Giới tính
      el-select.mt-1.w-full(v-model="formUser.gender" placeholder="Gender" size="large")
        el-option(value='1' label='Nam')
        el-option(value='2' label='Nữ')
        el-option(value='3' label='Khác')
  div.flex.gap-8.mt-2
    div.flex-1.sh
      div.text-sm Username
      input(type='text' placeholder='username' v-model="formUser.username" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm(v-if='isEdit===false' ) Mật khẩu
      input(v-if='isEdit===false' type='password' v-model="formUser.password" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-2
    div.flex-1.sh
      div.text-sm Vai trò
      el-select.mt-1.w-full(v-model="formUser.roleID" placeholder="Vai trò" size="large")
        el-option(v-for='role in listRole' :value='role.id' :label='role.ten')

    div.flex-1
      div(v-if='formUser.roleID &&(formUser.roleID===2||formUser.roleID===3)')
        div.text-sm Phòng khám
        el-select.mt-1.w-full(v-model="formUser.clinicId" placeholder="" size="large")
          el-option(v-for='clinic in listClinic' :value='clinic.id' :label='clinic.name')
  div.mt-2
    div.text-sm Ảnh
    div.mt-2
      div.px-2.p-1.flex.justify-center(class='bg-[#DA151A] text-white text-sm w-fit cursor-pointer rounded-[10px] items-center gap-2' @click="selectFile")
        img.h-6.w-6.shrink-0(src='../assets/upload.svg')
        div {{formUser.avtimage.length>0?"Edit":"Upload"}}
    img.mt-4(v-if='formUser.avtimage.length>0' :src='formUser.avtimage' class='w-[100px] h-[100px] object-cover')
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(v-if='formUser.trangthaiId === 1 || !formUser.trangthaiId' class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')

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
const listClinic = ref([])
const imgUrlUpload = ref('')

const formUser = computed(() => {
  return props.formUser
})
const isEdit = computed(() => {
  return props.isEdit
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
async function getListClinic() {
  await UserApis.getListClinic().then(res => {
    listClinic.value = res.content
  })
}

async function createUser() {
  isLoadingCreate.value = true
  const form = {
    name: formUser.value.name,
    ngaysinh: formatDate(formUser.value.ngaysinh),
    address: formUser.value.address,
    email: formUser.value.email,
    password: formUser.value.password,
    gender: formUser.value.gender,
    phonenumber: formUser.value.phone,
    username: formUser.value.username,
    roleID: formUser.value.roleID,
    avtimage: formUser.value.avtimage,
    clinicId: formUser.value.clinicId
  }
  await UserApis.createUser(form).then(res => {
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
async function editUser() {
  isLoadingCreate.value = true
  const form = {
    id: formUser.value.id,
    name: formUser.value.name,
    ngaysinh: formatDate(formUser.value.ngaysinh),
    address: formUser.value.address,
    email: formUser.value.email,
    gender: formUser.value.gender,
    phonenumber: formUser.value.phonenumber,
    username: formUser.value.username,
    roleID: formUser.value.roleID,
    avtimage: formUser.value.avtimage,
    clinicId: formUser.value.clinicId
  }
  await UserApis.editUser(form).then(res => {
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

const cloudName = "dzngdre7f";
const uploadPreset = "schedule-medical";

const myWidget = window.cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      imgUrlUpload.value = result.info.secure_url
      formUser.value.avtimage = result.info.secure_url
    }
  }
);
const selectFile = () => {
  myWidget.open()
}
function handleCancel() {
  emits('cancel', 'cancel')
}
onMounted(() => {
  getListRole()
  getListClinic()
})

function handleSave() {
  if (isEdit.value) {
    editUser()
  } else {
    createUser()
  }
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