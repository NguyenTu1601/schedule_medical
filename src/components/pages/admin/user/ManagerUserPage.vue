<template lang="pug">
div
  div.font-bold(class='text-[18px]') Quản lý người dùng
  div.flex.gap-2.justify-center.items-center.w-fit.mt-4(class='rounded-[10px] px-4 py-2 cursor-pointer border border-[#C80815]' @click="handleAddUser")
    img.w-6.h-6.shrink-0(src='./assets/add.svg')
    div.text-sm.font-bold(class='text-[#C80815]') Tạo mới
  div.flex.justify-end
    div.mt-2.flex(class='border border-[#DEE3ED] px-4 py-2 rounded-[4px] w-[600px]')
      input.outline-none.text-base.w-full(v-model='searchUser' ref='searchRef')
      img(class='w-6 h-6 shrink-0' src='./assets/search.svg')
  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Username
      td.p-2(class='') Email
      td.p-2(class='') Tên người dùng
      td.p-2(class='') Vai trò
      td.p-2(class='') Địa chỉ 
      td.p-2(class='') Trạng thái 
      td.p-2(class='w-[80px]')
    tr(v-for='item in listUser')
      td {{item.username}}
      td {{item.email}}
      td {{item.name}}
      td {{item.phanquyen}}
      td {{ item.address }}
      td {{ item.trangthai }}
      td
        div.flex.justify-between(v-if='item.trangthaiId===1' )
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit(item)')
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg' @click="handleDelete(item)")
        div(v-else)
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/eye.svg' @click='handleEdit(item)')
  el-dialog(v-model="isShowModalFormUser" title="" width='1200px' :destroy-on-close='true' @close='handleClose')
    ModalUserForm(v-if='isShowModalFormUser' @cancel='handleCancel' v-model:isEdit= 'isEdit' v-model:formUser='formUser' :typeEdit='typeEdit')
    div(v-else)
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import ModalUserForm from './component/ModalUserForm.vue'
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import { onMounted } from 'vue';
import { refDebounced, useFocus } from '@vueuse/core'
import { ElNotification, ElPopconfirm } from 'element-plus';

const route = useRoute()
const router = useRouter()

const listUser = ref([])
const isShowModalFormUser = ref(false)
const isEdit = ref(false)
const searchUser = ref('')

const debounced = refDebounced(searchUser, 500)

watch(debounced, async () => {
  const form = {
    userid: debounced.value.length > 0 ? debounced.value : "0"
  }
  await UserApis.getListUser(form).then(res => {
    if (res.result === 0) {
      ElNotification({
        title: 'Error',
        message: res.message,
        type: 'error',
      });
    }
    listUser.value = res.content
  })
})

const formDeFault = ref({
  id: '',
  name: '',
  username: '',
  email: '',
  phonenumber: '',
  address: '',
  roleID: '',
  password: '',
  gender: '',
  ngaysinh: '',
  shortDescription: '',
  description: '',
  clinicId: null,
  avtimage: '',
  trangthaiId: null
})

const formUser = ref({
  id: '',
  name: '',
  username: '',
  email: '',
  phonenumber: '',
  address: '',
  roleID: '',
  password: '',
  gender: '',
  ngaysinh: '',
  shortDescription: '',
  description: '',
  clinicId: null,
  avtimage: '',
  trangthaiId: null
})

const role = computed(() => {
  return route.params.role
})

function reset() {
  formUser.value = formDeFault.value
}

async function getListUser() {
  const form = {
    userid: '0'
  }
  await UserApis.getListUser(form).then(res => {
    listUser.value = res.content
  })
}
function handleAddUser() {
  isEdit.value = false
  isShowModalFormUser.value = true
}

function handleEdit(user) {
  formUser.value = user
  formUser.value.gender = formUser.value.gender?.toString()
  isEdit.value = true
  isShowModalFormUser.value = true
}

function handleCancel(val) {
  isShowModalFormUser.value = false
  isEdit.value = false
  formUser.value = formDeFault.value
  getListUser()
}

async function handleDelete(user) {
  if (confirm("Bạn có muốn xóa user " + user.name) === true) {
    const form = {
      userId: user.id
    }
    await UserApis.deleteUser(form).then(res => {
      if (res.result === 1) {
        ElNotification({
          title: 'Success',
          message: res.message,
          type: 'success',
        });
      }
      if (res.result === 0) {
        ElNotification({
          title: 'Error',
          message: res.message,
          type: 'error',
        });
      }
      getListUser()
    })
  }
}

onMounted(() => {
  getListUser()
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