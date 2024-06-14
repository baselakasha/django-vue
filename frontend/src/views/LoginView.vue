<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../stores/auth';
import router  from '../router';

const authStore = useAuthStore();

const form_state = reactive({
  username: '',
  password: '',
  invalid: false, 
})

const login = async () => {
    try {
        await authStore.login(
            {
                username: form_state.username,
                password: form_state.password
            }
        );
        router.push('/');
    }
    catch (error) {
      if (error.response.status === 401) {
        form_state.invalid = true;
      }
      else {
        console.error(error);
      }
    }
}

</script>

<template>
  <div class="container p-5 rounded has-background-light mt-5">
    <h1 class="title is-3">Login</h1>
    <div v-if="form_state.invalid" class="notification is-danger">
      Invalid username or password
    </div>
    <form action="" @submit.prevent="login">
      <div class="field">
        <label class="label" for="username">Username</label>
        <p class="control has-icons-left">
          <input v-model="form_state.username" id="username" class="input" type="text" placeholder="" />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <label class="label" for="password">Password</label>
        <p class="control has-icons-left">
          <input v-model="form_state.password" id="password" class="input" type="password" placeholder="" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success">Login</button>
        </p>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
