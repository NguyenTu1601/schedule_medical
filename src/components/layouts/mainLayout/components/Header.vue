<template lang="pug">
.z-30.bg-white.header(class='h-[64px] shadow-md fixed w-screen top-0')
  .flex.w-full.h-full.w-full.px-6.justify-between.items-center
    //- img(src='../assets/booking.svg')
    div.items-center.flex.gap-2
      router-link.uppercase(class='text-[20px] font-bold whitespace-nowrap cursor-pointer' to='/') schedule medical
      div(class='sm:block hidden w-[350px] ml-6 shrink-0')
        el-popover(class="sm:block hidden" trigger="click" placement='bottom-start' :show-arrow='false' popper-class='!w-[500px] !rounded-[24px] !px-0' v-model:visible='isShowSearchList')
          template(#reference)
            div.flex.items-center(ref='inputRef' class='w-full max-w-[350px] h-full')
              div.py-2.flex(class='pl-3 pr-1 gap-[10px] bg-[#F6F6F6] rounded-full w-full')
                img.w-6.h-6.shrink-0(src='../assets/search.svg')
                input(v-model="inputSearch" ref='inputSearchRef' class='text-sm bg-transparent w-full' placeholder="Search")
          div(class='w-full max-h-[500px] overflow-auto')
            //- div.px-6.py-3(class='hover:bg-[#1F1F1F]/[0.08] cursor-pointer border-b border-[#EFE8E8] last:border-[0px] select-none' v-for='event in listSearchEvent' @click="selectEvent(event)")
            //-   div.font-semibold(class='text-[#1F1F1F] text-sm break-normal') {{ event.name }}
            //-   div.mt-1.text-sm(class='text-[#796D6D]') {{formatDay(event.begin_at)}}
    div.h-fit.border(class='cursor-pointer border-[#DA151A] px-4 py-2 rounded-full flex gap-2')
      img.w-5.h-5.shrink-0(src='../assets/user.svg')
      div.text-base.font-bold Sign in
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { refDebounced, useFocus } from '@vueuse/core'
import { watch } from 'vue';

const inputSearch = ref('')
const inputSearchRef = ref()
const { focused } = useFocus(inputSearchRef)


const debounced = refDebounced(inputSearch, 1000)

watch(focused, () => {
  inputSearch
  console.log(focused.value)
})

</script>

<style scoped></style>