<template lang="pug">
div.flex.flex-col.justify-between.h-full
  div
    div.flex.justify-center
      div.relative
        img.rounded-full.object-cover(class='w-[200px] h-[200px]' :src='formUser?.avtimage')
        .absolute.right-0.cursor-pointer(
          class='hover:opacity-70 bottom-[-3px]'
          @click='selectFile()'
        )
          img(class="w-[60px] h-[60px]" src='../assets/icon-update.png' alt='')
    div.flex.gap-8.mt-4
      div.flex-1
        div.text-sm Tên
        input(type='text' placeholder='tên' v-model="formUser.name" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
      div.flex-1
        div.text-sm Email
        input(type='text' placeholder='email' v-model="formUser.email" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex.gap-8.mt-4
      div.flex-1
        div.text-sm Số điện thoại
        input(type='text' placeholder='username' v-model="formUser.phonenumber" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
      div.flex-1
        div.text-sm Địa chỉ
        input(type='text' placeholder='địa chỉ' v-model="formUser.address" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex.gap-8.mt-4
      div.flex-1
        div.text-sm Ngày sinh
        el-date-picker.w-full.mt-1(v-model="formUser.ngaysinh"
          type="date"
          placeholder="Pick a day"
          size="large"
          )
      div.flex-1 
        div.text-sm Giới tính
        el-select.mt-1.w-full(v-model="formUser.gender" placeholder="giới tính" size="large")
          el-option(value='1' label='Nam')
          el-option(value='2' label='Nữ')
          el-option(value='3' label='Khác')
  div.flex.justify-end
    div(class='px-6 py-2 text-base font-bold border border-[#DA151A] text-[#DA151A] rounded-full cursor-pointer hover:bg-[#DA151A] hover:text-white' @click='handleSave') Lưu
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import useAccount from "@/compositions/useAccount";
import AccountApis from '@/apis/account';
import { ElNotification } from 'element-plus';

const { account, getAccount } = useAccount()

const formUser = ref({
  id: '',
  name: '',
  email: '',
  phonenumber: '',
  address: '',
  gender: '',
  ngaysinh: '',
  avtimage: '',
})

watch(account, () => {
  formUser.value.id = account?.value?.id
  formUser.value.name = account?.value?.name
  formUser.value.email = account?.value?.email
  formUser.value.phonenumber = account?.value?.phonenumber
  formUser.value.address = account?.value?.address
  formUser.value.gender = account?.value?.gender?.toString()
  formUser.value.ngaysinh = account?.value?.ngaysinh
  formUser.value.avtimage = account?.value?.avtimage
}, { immediate: true, deep: true })



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
      formUser.value.avtimage = result.info.secure_url
    }
  }
);
const selectFile = () => {
  myWidget.open()
}

async function handleSave() {
  await AccountApis.update(formUser.value).then(res => {
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
  })
}

onMounted(() => {
  getAccount()

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
</style>