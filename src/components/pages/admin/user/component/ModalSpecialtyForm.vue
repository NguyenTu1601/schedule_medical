<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Specialty information
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Name
      input(type='text' placeholder='name' v-model="formSpecialty.name" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Mã
      input(type='text' placeholder='mã' v-model="formSpecialty.ma" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.mt-4.font-semibold.text-base  Short description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formSpecialty.shortDescription' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formSpecialty.shortDescription')
  div.mt-2.font-semibold.text-base  Description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formSpecialty.description' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formSpecialty.description')
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
const fileSelect = ref(null)

// const formUser = reactive({
//   name: '',
//   username: '',
//   email: '',
//   phone: '',
//   address: '',
//   role: '',
//   password: '',
//   gender: '',
//   birthday: ''
// })

const formSpecialty = computed(() => {
  return props.formSpecialty
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
  await UserApis.createSpecialty(formSpecialty.value).then(res => {
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

const onSelectFile = async (e: Event) => {
  let files: File[] = [...(e.target as HTMLInputElement).files]

  // isLoadingImage.value = true

  let avatar = new FormData()
  avatar.append('data', files[0])
  // avatar.append('filename', files[0].name)

  let res = await FileApis.upload(avatar).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  }).finally(() => {
    // isLoadingImage.value = false
  })

  // form.avatar = res
  // updateProfile(form).then(() => {
  //   message.success('Avatar changed')
  //   return getProfile()
  // })
}
const selectFile = () => {
  // if (isLoadingImage.value) return;
  const open = () => {
    fileSelect.value && fileSelect.value.click()
  }
  open()
}
function handleCancel() {
  emits('cancel', 'cancel')
}

function handleSave() {
  handleCreateSpecialty()
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