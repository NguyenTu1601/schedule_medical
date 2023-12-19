<template lang="pug">
div
  div.font-bold(class='text-[18px]') Quản lý chuyên khoa
  div.flex.gap-2.justify-center.items-center.w-fit.mt-4(class='rounded-[10px] px-4 py-2 cursor-pointer border border-[#C80815]' @click="handleAdd")
    img.w-6.h-6.shrink-0(src='./assets/add.svg')
    div.text-sm.font-bold(class='text-[#C80815]') Tạo mới chuyên khoa
  table.w-full.mt-4
    tr(class='bg-[#C80815] text-white text-sm font-bold')
      td.p-2(class='') Tên chuyên khoa
      td.p-2(class='') Mã
      td.p-2(class='') Trạng thái
      td.p-2(class='w-[80px]')
    tr(v-for='item in listSpecialty')
      td {{item.name}}
      td {{item.ma}}
      td {{item.trangthai}}
      td
        div.flex.justify-between
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/edit.svg' @click='handleEdit(item)')
          img.w-6.h-6.shrink-0.cursor-pointer(src='./assets/delete.svg' @click="handleDelete(item)")
  el-dialog(v-model="isShowModalFormSpecialty" title="" width='1200px')
    ModalSpecialtyForm(v-if='isShowModalFormSpecialty' @cancel='handleCancel' v-model:isEdit= 'isEdit' :formSpecialty='formSpecialty')
    div(v-else)
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue';
import ModalSpecialtyForm from './component/ModalSpecialtyForm.vue';
import { useRoute, useRouter } from 'vue-router';
import UserApis from '@/apis/user';
import { onMounted } from 'vue';
import { ElNotification } from 'element-plus';

const route = useRoute();
const router = useRouter();

const isShowModalFormSpecialty = ref(false);
const isEdit = ref(false);
const listSpecialty = ref([]);

const formDeFault = {
  id: '',
  name: '',
  ma: '',
  trangthai: '',
  short_description: '',
  description: '',
  image: ''
}

const formSpecialty = ref({
  id: '',
  name: '',
  ma: '',
  trangthai: '',
  short_description: '',
  description: '',
  image: ''
});

function reset() {
  formSpecialty.value = formDeFault;
}

function handleAdd() {
  isEdit.value = false
  isShowModalFormSpecialty.value = true;
}

function handleEdit(item) {
  isEdit.value = true
  formSpecialty.value = item
  isShowModalFormSpecialty.value = true;
}

function handleCancel(val) {
  isShowModalFormSpecialty.value = false;
  isEdit.value = false;
  reset()
  getListSpecialty();
}
async function handleDelete(item) {
  if (confirm("Bạn có muốn xóa chuyên khoa " + item.name) === true) {
    const form = {
      id: item.id
    }
    await UserApis.deleteSpecialty(form).then((res) => {
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
      getListSpecialty()
    });
  }

}
async function getListSpecialty() {
  await UserApis.getListSpecialty().then((res) => {
    listSpecialty.value = res.content;
  });
}

onMounted(() => {
  getListSpecialty();
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
