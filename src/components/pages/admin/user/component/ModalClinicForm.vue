<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin phòng khám
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tên phòng khám
      input(type='text' placeholder='' v-model="formClinic.name" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Địa chỉ
      input(type='text' placeholder='' v-model="formClinic.address" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tên ngắn
      input(type='text' placeholder='' v-model="formClinic.shortName" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Mã 
      input(type='text' placeholder='' v-model="formClinic.ma" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Hotline
      input(type='text' placeholder='' v-model="formClinic.hotline" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1

  div.mt-4.font-semibold.text-base  Short description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formClinic.short_description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formClinic.shortDescription')
  div.mt-2.font-semibold.text-base  Description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formClinic.description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formClinic.description')
  div.mt-2
    div.font-semibold.text-base Ảnh
    div.mt-2
      div.px-2.p-1.flex.justify-center(class='bg-[#DA151A] text-white text-sm w-fit cursor-pointer rounded-[10px] items-center gap-2' @click="selectFile")
        img.h-6.w-6.shrink-0(src='../assets/upload.svg')
        div {{formClinic.image.length>0?"Sửa ảnh":"Thêm ảnh"}}
    img.mt-4(v-if='formClinic.image.length>0' :src='formClinic.image' class='max-w-[800px] max-h-[300px] object-cover')
  div.flex.justify-end.gap-4.items-center.w-full.mt-4
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px]' @click="handleCancel") Cancel
    div.cursor-pointer.px-4.py-2.border(class='font-bold text-sm rounded-[10px] border-[#DA151A] text-[#DA151A] hover:bg-[#DA151A] hover:text-white' @click="handleSave")
      div(v-if='!isLoadingCreate') Save
      img.w-6.h-6.shrink-0(v-else src='../assets/loading.svg')
  input.hidden(
    ref='fileSelect'
    type='file'
    @change='onSelectFile'
    accept='image/*'
    multiple=''
  )
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
  formClinic: {
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

const isLoadingCreate = ref(false)

const formClinic = computed(() => {
  return props.formClinic
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

async function handleCreateClinic() {
  isLoadingCreate.value = true
  const form = {
    name: formClinic.value.name,
    maClinic: formClinic.value.ma,
    address: formClinic.value.address,
    shortName: formClinic.value.shortName,
    short_description: formClinic.value.short_description,
    description: formClinic.value.description,
    hotline: formClinic.value.hotline,
    image: formClinic.value.image
  }
  await UserApis.createClinic(form).then(res => {
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
async function handleUpdateClinic() {
  isLoadingCreate.value = true
  const form = {
    id: formClinic.value.id,
    name: formClinic.value.name,
    maClinic: formClinic.value.ma,
    address: formClinic.value.address,
    shortName: formClinic.value.shortName,
    short_description: formClinic.value.short_description,
    description: formClinic.value.description,
    hotline: formClinic.value.hotline,
    image: formClinic.value.image
  }
  await UserApis.updateClinic(form).then(res => {
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
      formClinic.value.image = result.info.secure_url
    }
  }
);
const selectFile = () => {
  myWidget.open()
}

function handleCancel() {
  emits('cancel', 'cancel')
}

function handleSave() {
  if (isEdit.value === true) {
    handleUpdateClinic()
  } else {
    handleCreateClinic()
  }
}
onMounted(() => {
})


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