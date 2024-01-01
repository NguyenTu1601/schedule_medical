<template lang="pug">
.min-h-screen.overflow-x-hidden
  Header
  div(class='mt-[64px]')
    router-view  
    Footer
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<style lang="stylus" scoped>
</style>
