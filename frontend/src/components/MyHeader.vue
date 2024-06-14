<script setup>
  import { RouterLink } from 'vue-router';
  import router  from '../router';
  import { useAuthStore } from '../stores/auth';
  const authStore = useAuthStore();
  
  const logout = () => {
    authStore.logout();
    router.push('/login');
  }
</script>

<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container has-background-light rounded px-5 mt-4">
        <div class="navbar-brand">
          <RouterLink to="/" class="navbar-item has-text-weight-bold is-size-5">
            Todo App
          </RouterLink>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <RouterLink to="/" class="navbar-item">
              Home
            </RouterLink>
            <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="navbar-item">
              Login
            </RouterLink>
            <RouterLink v-if="!authStore.isAuthenticated" to="/register" class="navbar-item">
              Register
            </RouterLink>
          </div>

          <div class="navbar-end">
            <button v-if="authStore.isAuthenticated" @click='logout' class="has-text-danger" >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
