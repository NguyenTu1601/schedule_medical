<template lang="pug">
div
  div.font-bold(class='text-[18px]') Clinic Manager
  div.mt-10.font-semibold.text-base Tên phòng khám
  div.border.mt-2(class='border-[#DEE3ED] rounded-[4px] px-4 py-2')
    input.w-full(v-model='formClinic.name')
  div.mt-4.font-semibold.text-base Địa chỉ
  div.border.mt-2(class='border-[#DEE3ED] rounded-[4px] px-4 py-2')
    input.w-full(v-model='formClinic.address')
  div.mt-4.font-semibold.text-base  Short description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formClinic.shortDescription' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formClinic.shortDescription')
  div.mt-2.font-semibold.text-base  Description
  div.flex.gap-8.mt-2
    div.flex-1
      VueEditor(v-model='formClinic.description' :editorOptions="editorSettings")
    div.flex-1.border.p-4(class='border-[#DEE3ED] rounded-[4px]')
      div(v-html='formClinic.description')
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import ModalUserForm from './component/ModalUserForm.vue'
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user'
import { onMounted } from 'vue';
import { VueEditor } from "vue3-editor";

const formClinic = ref({
  name: '',
  address: '',
  shortDescription: '',
  description: ''
})

const editorSettings = ref({
  modules: {
    clipboard: {
      matchers: [[Node.ELEMENT_NODE, customQuillClipboardMatcher]]
    }
  }
})


function customQuillClipboardMatcher(node, delta) {
  delta.ops = delta.ops.map((op) => {
    return {
      insert: op.insert
    }
  })
  return delta
}


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