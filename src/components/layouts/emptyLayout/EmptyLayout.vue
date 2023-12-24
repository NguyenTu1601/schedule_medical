<template lang="pug">
.h-screen.w-screen.flex.flex-col.overflow-x-hidden(class='bg-[#F6F6F6]')
  Navbar.z-10
  div.h-full
    div.w-full.manager
      router-view
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '../adminLayout/component/Navbar.vue';

</script>