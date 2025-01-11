<script setup>
import { reactive } from 'vue'
import { register } from '../auth'
import router from '../router'

const form_state = reactive({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  password: '',
  invalid: false,
  errors: {
    username: null,
    email: null,
    password: null,
    first_name: null,
    last_name: null
  }
})

const formSubmitted = async () => {
  try {
    await register({
      username: form_state.username,
      email: form_state.email,
      password: form_state.password,
      first_name: form_state.first_name,
      last_name: form_state.last_name
    })
    router.push('/register-success')
  } catch (error) {
    if (error.response.status === 400) {
      form_state.invalid = true
      form_state.errors = error.response.data
    } else {
      console.error(error)
    }
  }
}
</script>

<template>
  <div class="container mt-5 p-5 has-background-light rounded">
    <h1 class="title is-3">Register</h1>
    <form action="" method="" @submit.prevent="formSubmitted">
      <div class="field">
        <label class="label" for="firstname">First Name</label>
        <p class="control has-icons-left">
          <input
            v-model="form_state.first_name"
            :class="{ 'is-danger': form_state.errors.first_name }"
            id="firstname"
            class="input"
            type="text"
            placeholder=""
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
        <p v-for="error in form_state.errors.first_name" class="help is-danger">
          {{ error }}
        </p>
      </div>
      <div class="field">
        <label class="label" for="lastname">Last Name</label>
        <p class="control has-icons-left">
          <input
            v-model="form_state.last_name"
            :class="{ 'is-danger': form_state.errors.last_name }"
            id="lastname"
            class="input"
            type="text"
            placeholder=""
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
        <p v-for="error in form_state.errors.lastname" class="help is-danger">
          {{ error }}
        </p>
      </div>
      <div class="field">
        <label class="label" for="username">Username</label>
        <p class="control has-icons-left">
          <input
            v-model="form_state.username"
            :class="{ 'is-danger': form_state.errors.username }"
            id="username"
            class="input"
            type="text"
            placeholder=""
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </p>
        <p v-for="error in form_state.errors.username" class="help is-danger">
          {{ error }}
        </p>
      </div>
      <div class="field">
        <label class="label" for="email">Email</label>
        <p class="control has-icons-left">
          <input
            v-model="form_state.email"
            :class="{ 'is-danger': form_state.errors.email }"
            id="email"
            type="email"
            class="input"
            placeholder=""
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <p v-for="error in form_state.errors.email" class="help is-danger">
          {{ error }}
        </p>
      </div>
      <div class="field">
        <label class="label" for="password">Password</label>
        <p class="control has-icons-left">
          <input
            v-model="form_state.password"
            :class="{ 'is-danger': form_state.errors.password }"
            id="password"
            class="input"
            type="password"
            placeholder=""
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <p v-for="error in form_state.errors.password" class="help is-danger">
          {{ error }}
        </p>
      </div>
      <input type="submit" class="button is-primary" value="Register" />
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
