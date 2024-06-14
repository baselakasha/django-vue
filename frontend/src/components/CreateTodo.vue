<script setup>
import { reactive, defineEmits } from 'vue'

const emit = defineEmits(['create-todo'])

const todoState = reactive({
  todo_title: '',
  invalid: false,
  error_message: ''
})

const createTodo = (e) => {
  e.preventDefault()
  if (todoState.todo_title === '') {
    todoState.invalid = true
    todoState.error_message = 'Title is required'
    return
  }
  emit('create-todo', todoState.todo_title)
  todoState.todo_title = ''
  todoState.invalid = false
  todoState.error_message = ''
}
</script>

<template>
  <main class="container">
    <div class="has-background-light p-5 rounded mt-5">
      <h1 class="title is-3">Create Todo</h1>
      <div v-if="todoState.invalid" class="notification is-danger mt-3">
        {{ todoState.error_message }}
      </div>
      <form action="" method="" @submit="createTodo">
        <label for="" class="has-text-weight-bold">Title</label>
        <input
          class="input mt-3"
          type="text"
          v-model="todoState.todo_title"
          :class="{ 'is-danger': todoState.invalid }"
        />
        <button class="button is-primary mt-3">Create</button>
      </form>
    </div>
  </main>
</template>
