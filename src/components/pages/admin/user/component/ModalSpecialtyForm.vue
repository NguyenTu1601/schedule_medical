<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin chuyên khoa
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Tên chuyên khoa
      input(type='text' placeholder='name' v-model="formSpecialty.name" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Mã
      input(type='text' placeholder='mã' v-model="formSpecialty.ma" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.mt-4.font-semibold.text-base Mô tả ngắn
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formSpecialty.short_description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formSpecialty.shortDescription')
  div.mt-2.font-semibold.text-base  Mô tả chi tiết
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formSpecialty.description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formSpecialty.description')
  div.mt-2
    div.font-semibold.text-base Ảnh
    div.mt-2
      div.px-2.p-1.flex.justify-center(class='bg-[#DA151A] text-white text-sm w-fit cursor-pointer rounded-[10px] items-center gap-2' @click="selectFile")
        img.h-6.w-6.shrink-0(src='../assets/upload.svg')
        div {{formSpecialty.image.length>0?"Sửa ảnh":"Thêm ảnh"}}
    img.mt-4(v-if='formSpecialty.image.length>0' :src='formSpecialty.image' class='max-w-[800px] max-h-[300px] object-cover')
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
  formSpecialty: {
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
const img = ref()

const formSpecialty = computed(() => {
  return props.formSpecialty
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

async function handleCreateSpecialty() {
  isLoadingCreate.value = true
  const form = {
    name: formSpecialty.value.name,
    ma: formSpecialty.value.ma,
    short_description: formSpecialty.value.short_description,
    description: formSpecialty.value.description,
    image: formSpecialty.value.image
  }
  await UserApis.createSpecialty(form).then(res => {
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
async function handleUpdateSpecialty() {
  isLoadingCreate.value = true
  const form = {
    id: formSpecialty.value.id,
    name: formSpecialty.value.name,
    ma: formSpecialty.value.ma,
    short_description: formSpecialty.value.short_description,
    description: formSpecialty.value.description,
    image: formSpecialty.value.image
  }
  await UserApis.updateSpecialty(form).then(res => {
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
      formSpecialty.value.image = result.info.secure_url
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
    handleUpdateSpecialty()
  } else {
    handleCreateSpecialty()
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