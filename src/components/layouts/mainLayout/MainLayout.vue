<template lang="pug">
.min-h-screen
  Header
  div
    router-view  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';

</script>

<style lang="stylus" scoped>
</style>
