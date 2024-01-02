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
          div(v-if='debounced.length>0' class='w-full max-h-[400px] overflow-auto')
            div.px-4.py-2
              div.font-bold(v-if='listDoctorSearch.length>0' class='text-[18px]') Bác sĩ
              div.flex.py-2.gap-4.h-full(v-for='doctor in listDoctorSearch' class='cursor-pointer hover:bg-[#F6F6F6]' @click='handleToDoctorDetail(doctor)')
                img(:src='doctor?.image' class='w-[40px] h-[40px] rounded-full shrink-0')
                div.w-full.flex.items-center
                  div.text-base.font-bold {{doctor?.name}}
              div.font-bold(v-if='listClinicSearch.length>0' class='text-[18px] mt-4') Phòng khám
              div.flex.py-2.gap-4.h-full(v-for='clinic in listClinicSearch' class='cursor-pointer hover:bg-[#F6F6F6]' @click="handleToClinicDetail(clinic)")
                img(:src='clinic?.image' class='w-[40px] h-[40px] rounded-full shrink-0')
                div.w-full.flex.items-center
                  div.text-base.font-bold {{clinic?.name}}
              div.font-bold(v-if='listSpecialtySearch.length>0' class='text-[18px] mt-4') Chuyên khoa
              div.flex.py-2.gap-4.h-full(v-for='specialty in listSpecialtySearch' class='cursor-pointer hover:bg-[#F6F6F6]' @click="handleToSpecialtyDetail(specialty)")
                img(:src='specialty?.image' class='w-[40px] h-[40px] rounded-full shrink-0')
                div.w-full.flex.items-center
                  div.text-base.font-bold {{specialty?.name}}
            //- div.px-6.py-3(class='hover:bg-[#1F1F1F]/[0.08] cursor-pointer border-b border-[#EFE8E8] last:border-[0px] select-none' v-for='event in listSearchEvent' @click="selectEvent(event)")
            //-   div.font-semibold(class='text-[#1F1F1F] text-sm break-normal') {{ event.name }}
            //-   div.mt-1.text-sm(class='text-[#796D6D]') {{formatDay(event.begin_at)}}
    router-link.h-fit.border(v-if='!account' class='cursor-pointer border-[#DA151A] px-4 py-2 rounded-full flex gap-2' to='/login')
      img.w-5.h-5.shrink-0(src='../assets/user.svg')
      div.text-base.font-bold Sign in
    div.flex.gap-4(v-else)
      //- div.text-base.font-semibold {{ account.name }}
      img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/profile.svg' @click="handleProfile")
      img.w-6.h-6.shrink-0.cursor-pointer(src='../assets/logout.svg' @click="handleLogout")
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { refDebounced, useFocus } from '@vueuse/core'
import { watch } from 'vue';
import useAccount from '@/compositions/useAccount';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import UserApis from '@/apis/user'

const { account, getAccount, removeAccount } = useAccount()

const inputSearch = ref('')
const inputSearchRef = ref()
const { focused } = useFocus(inputSearchRef)
const listDoctorSearch = ref([])
const listClinicSearch = ref([])
const listSpecialtySearch = ref([])
const isShowSearchList = ref(false)
const debounced = refDebounced(inputSearch, 500)

watch(focused, () => {
  // inputSearch
  console.log(focused.value)
})

watch([focused, debounced], () => {
  if (focused.value) {
    if (debounced.value.length > 0) {
      isShowSearchList.value = true
    } else {
      isShowSearchList.value = false
    }
  } else {
    isShowSearchList.value = false
  }
}, { immediate: true, deep: true })
watch(debounced, async () => {
  if (debounced.value.length > 0) {
    isShowSearchList.value = true
  }
  const form = {
    keyword: debounced.value.length > 0 ? debounced.value : "0"
  }
  await UserApis.search(form).then(res => {
    listDoctorSearch.value = res.content.doctor
    listClinicSearch.value = res.content.clinic
    listSpecialtySearch.value = res.content.specialty
  })
})

function handleToDoctorDetail(doctor) {
  inputSearch.value = ''
  isShowSearchList.value = false
  router.push({
    name: 'doctor_detail', params: {
      id: doctor.id
    }
  })
}
function handleToClinicDetail(clinic) {
  inputSearch.value = ''
  isShowSearchList.value = false
  router.push({
    name: 'clinic_detail', params: {
      id: clinic.id
    }
  })
}
function handleToSpecialtyDetail(specialty) {
  inputSearch.value = ''
  isShowSearchList.value = false
  router.push({
    name: 'specialty_detail', params: {
      id: specialty.id
    }
  })
}
const router = useRouter()
function handleLogout() {
  removeAccount()
  router.push('/login')
}
function handleProfile() {
  router.push({
    name: 'profile', query: {
      tab: 'user'
    }
  })
}
onMounted(() => {
  getAccount()
})
</script>

<style scoped></style>