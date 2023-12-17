<template lang="pug">
div
  div.font-bold(class='text-[18px]') User Manager
  div.flex.gap-2.justify-center.items-center.w-fit.mt-4(class='rounded-[10px] px-4 py-2 cursor-pointer border border-[#C80815]' @click="handleAdd")
    img.w-6.h-6.shrink-0(src='./assets/add.svg')
    div.text-sm.font-bold(class='text-[#C80815]') Add clinic
  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Name
      td.p-2(class='') Mã
      td.p-2(class='') Trạng thái
      td.p-2(class='') Short name 
      td.p-2(class='') Address 
      td.p-2(class='w-[80px]') Actions
    tr(v-for='item in listClinic')
      td {{item.name}}
      td {{item.ma}}
      td {{item.trangthai}}
      td {{item.shortName}}
      td {{ item.address }}
      td
        div.flex.justify-between
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit')
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg')
  el-dialog(v-model="isShowModalFormClinic" title="" width='1200px')
    ModalClinicForm(v-if='isShowModalFormClinic' @cancel='handleCancel' v-model:isEdit= 'isEdit' :formClinic='formClinic')
    div(v-else)
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import ModalClinicForm from './component/ModalClinicForm.vue';
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user';
import { onMounted } from 'vue';

const route = useRoute();
const router = useRouter();

const isShowModalFormClinic = ref(false);
const isEdit = ref(false);
const listClinic = ref([]);

const formDeFault = {
  name: '',
  address: '',
  maClinic: '',
  shortName: '',
  short_description: '',
  description: '',
  hotline: ''
};

const formClinic = ref({
  name: '',
  address: '',
  maClinic: '',
  shortName: '',
  short_description: '',
  description: '',
  hotline: ''
});
watch(
  formClinic,
  () => {
    console.log(formClinic.value);
  },
  { deep: true },
);

function reset() {
  formClinic.value = formDeFault;
}

function handleAdd() {
  isShowModalFormClinic.value = true;
}

function handleEdit() {
  isShowModalFormClinic.value = true;
}

function handleCancel(val) {
  isShowModalFormClinic.value = false;
  isEdit.value = false;
  getListClinic();
}
async function getListClinic() {
  await UserApis.getListClinic().then((res) => {
    listClinic.value = res.content;
  });
}

onMounted(() => {
  getListClinic();
});
</script>

<style scoped>
table {
  /* border: 1px solid #1F1F1F; */
  border-collapse: collapse;
}

td,
th,
tr,
table {
  border: 1px solid #1f1f1f;
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
