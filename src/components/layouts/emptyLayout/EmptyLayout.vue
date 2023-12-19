<template lang="pug">
div
  Header
  div
    router-view
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from './component/Header.vue'
const EmptyLayout = defineComponent({});

export default EmptyLayout;
</script>