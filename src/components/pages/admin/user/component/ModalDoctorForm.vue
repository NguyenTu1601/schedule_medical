<template lang="pug">
div.overflow-y-auto
  div.text-base.font-bold Thông tin bác sĩ
  div.flex.gap-8.mt-8
    div.flex-1
      div.text-sm Tên Bác sĩ
      input(type='text' v-model="formDoctor.doctorname" placeholder='name' class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
    div.flex-1
      div.text-sm Giá khám
      el-select.mt-1.w-full(v-model="formDoctor.price" placeholder="chuyên khoa" size="large")
        el-option(value='200000' label='200000')
        el-option(value='250000' label='250000')
        el-option(value='300000' label='300000')
        el-option(value='350000' label='350000')
        el-option(value='400000' label='400000')
        el-option(value='500000' label='500000')
      //- input(type='text' v-model="formUser.last_name" placeholder='last name' class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')
  div.flex.gap-8.mt-4
    div.flex-1
      div.text-sm Chuyên khoa
      el-select.mt-1.w-full(v-model="selectSpecialty" placeholder="chuyên khoa" size="large")
        el-option(v-for='item in listSpecialty' :value='item.id' :label='item.name')
    div.flex-1
      div.text-sm Số điện thoại
      input(type='text' placeholder='phone number' v-model="formDoctor.phonenumber" class='outline-none p-2 text-sm border border-[#DEE3ED] rounded-[4px] w-full mt-1')

  div.text-sm.mt-2 Short description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formDoctor.short_description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formUser.shortDescription')
  div.text-sm.mt-2 Description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formDoctor.description' :editorOptions="editorSettings")
    //- div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
    //-   div(v-html='formUser.description')
  div.mt-2
    div.text-sm Ảnh
    div.mt-2
      div.px-2.p-1.flex.justify-center(class='bg-[#DA151A] text-white text-sm w-fit cursor-pointer rounded-[10px] items-center gap-2' @click="selectFile")
        img.h-6.w-6.shrink-0(src='../assets/upload.svg')
        div {{formDoctor.avtimage?.length>0?"Edit":"Upload"}}
      img.mt-4(v-if='formDoctor.avtimage?.length>0' :src='formDoctor.avtimage' class='w-[100px] h-[100px] object-cover')
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
import { computed } from "vue";
import { ElNotification } from "element-plus";

const emits = defineEmits(['cancel'])
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: null,
  },
  formDoctor: {
    type: Object,
    default: null
  }
})

const formDoctor = computed(() => {
  return props.formDoctor
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
const listSpecialty = ref([])
const selectSpecialty = ref([])



function customQuillClipboardMatcher(node, delta) {
  delta.ops = delta.ops.map((op) => {
    return {
      insert: op.insert
    }
  })
  return delta
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
      formDoctor.value.avtimage = result.info.secure_url
    }
  }
);
const selectFile = () => {
  myWidget.open()
}

async function getListHocvi() {
  await UserApis.getListHocvi().then(res => {
    listHocVi.value = res.content
  })
}

async function editDoctor() {
  isLoadingCreate.value = true
  const specialty = []
  specialty.push(selectSpecialty.value.toString())
  const form = {
    doctorId: formDoctor.value.Id,
    name: formDoctor.value.doctorname,
    description: formDoctor.value.description,
    short_description: formDoctor.value.short_description,
    image: formDoctor.value.avtimage,
    phone: formDoctor.value.phonenumber,
    price: formDoctor.value.price,
    specialtyId: specialty
  }
  await UserApis.createDoctor(form).then(res => {
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
  }).finally(() => {
    isLoadingCreate.value = false
  })
}

async function getListSpecialty() {
  await UserApis.getListSpecialty().then(res => {
    listSpecialty.value = res.content
  })
}

function handleCancel() {
  emits('cancel', 'cancel')
}

onMounted(() => {
  getListSpecialty()
})

function handleSave() {
  // createUser()
  editDoctor()
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