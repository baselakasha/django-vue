<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { isLoggedIn } from 'axios-jwt'
import { useLoginState } from './stores/login_state'
import { STORAGE_KEY } from 'axios-jwt/src/StorageKey'
import router from './router'

import MyHeader from './components/MyHeader.vue'

import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js'

const loginState = useLoginState()

onMounted(() => {
  window.addEventListener('storage-changed', (event) => {
    console.log('something changed')
    let jwt = window.localStorage.getItem(STORAGE_KEY)
    loginState.loggedIn = !!jwt
    if (!jwt) {
      router.push('/login')
    }
  })
})

isLoggedIn()
  .then((result) => (console.log(result), (loginState.loggedIn = result)))
  .catch(() => (loginState.loggedIn = false))
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
