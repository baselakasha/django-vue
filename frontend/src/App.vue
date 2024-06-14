<script setup>
import { RouterView } from 'vue-router'
import MyHeader from './components/MyHeader.vue'
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js';
</script>

<template>
  <MyHeader />
  <RouterView />
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  @import url('./assets/style.scss');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
