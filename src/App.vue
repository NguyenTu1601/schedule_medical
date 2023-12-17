<template lang="pug">
router-view
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import '@/styles/vue2-animate.css';
import '@/styles/style.css';
import '@/styles/style.styl';
import 'element-plus/dist/index.css';
// import 'unfonts.css'

export default defineComponent({
  name: 'App',
  components: {
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus">
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  background white
  font-family 'Roboto', sans-serif
</style>