<template lang="pug">
tr(v-if='listMedicine')
  td.p-2(class='')
    el-popover(:visible="name.length >0 && focused" placement="top-start" :width="300")
      template(#reference)
        input.w-full(v-model='name' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]' ref='target')
      template(#default)
        div.table-sm
          table.w-full
            tr.font-bold(class='!text-base')
              td Tên thuốc
              td Mã
            tr(v-for='medicine in listMedicineSearch' class='hover:bg-[#EBECED] cursor-pointer' @click="handleSelect(medicine)")
              td {{ medicine.name }}
              td {{ medicine.code }}
  td.p-2(class='')
    input.w-full(type="number" v-model='amout' class='border border-[#DEE3ED] px-2 py-1 rounded-[4px]')
  td
    div.flex.justify-between(v-if='idx===listMedicine.length-1')
      img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/add-black.svg' @click='handleAdd')
      img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/delete.svg' @click="handleDelete")
</template>

<script setup lang="ts">
import { reactive, h, ref, computed, defineEmits, watch, defineProps, onMounted } from "vue";
import { refDebounced, useFocus } from '@vueuse/core'
import UserApis from '@/apis/user'

const props = defineProps(['listMedicine', 'idx'])

const target = ref()
const name = ref('')
const amout = ref(0)
const selectedMedicine = ref(null)
const listMedicineSearch = ref([])

const { focused } = useFocus(target)

const listMedicine = computed(() => {
  return props.listMedicine
})
const idx = computed(() => {
  return props.idx
})
watch(name, () => {
  listMedicine.value[idx.value].name = name.value
})
watch(amout, () => {
  listMedicine.value[idx.value].amout = amout.value
})

const debounced = refDebounced(name, 500)

watch(debounced, async () => {
  const form = {
    keyword: debounced.value
  }
  await UserApis.getListMedicine(form).then(res => {
    listMedicineSearch.value = res.content
  })
}, { immediate: true })

function handleAdd() {
  listMedicine.value.push({
    name: '',
    code: '',
    unit: '',
    description: '',
    amout: 0,
    id:''
  })
}

function handleDelete() {
  if (listMedicine.value.length > 1) {
    listMedicine.value.pop()
  }
}

function handleSelect(item) {
  selectedMedicine.value = item
  listMedicine.value[idx.value].id = item.id
  name.value = item.name
}
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
  border: 1px solid #1F1F1F;
  padding: 8px;
  font-size: 12px;
}

.table-sm 
td,
th,
tr,
table {
  border: 1px solid #1F1F1F;
  padding: 4px;
  font-size: 12px;
}
</style>