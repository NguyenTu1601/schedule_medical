<template lang="pug">
.h-screen.w-screen.flex.flex-col
  Navbar
  div.flex.gap-6.h-full
    DescriptionBar.shrink-0
    div.w-full
      div.w-full.py-6.pr-4.manager(class='h-[calc(100vh-60px)]')
        div.h-full.w-full(class='rounded-[10px] shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] py-4 px-6 overflow-y-auto overflow-x-hidden')
          router-view
  
</template>

<script setup lang="ts">
import Navbar from './component/Navbar.vue'
import DescriptionBar from './component/DescriptionBar.vue'
</script>

<style scoped></style>