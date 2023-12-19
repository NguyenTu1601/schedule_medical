<template lang="pug">
.min-h-screen.overflow-x-hidden
  Header
  div(class='mt-[64px]')
    router-view  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';

</script>

<style lang="stylus" scoped>
</style>
