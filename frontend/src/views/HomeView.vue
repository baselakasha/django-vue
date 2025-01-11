<script setup>
import { useTodoStore } from '@/stores/todo'
import CreateTodo from '../components/CreateTodo.vue'
import TodoItem from '../components/TodoItem.vue'

const todoStore = useTodoStore()
const refresh = async () => {
  await todoStore.fetchTodoList()
  todoStore.todo_list.sort((a, b) => a.completed - b.completed)
}

refresh()

const createTodo = async (title) => {
  await todoStore.create({
    title,
    completed: false
  })
  refresh()
}

const todoStatusChange = async (id, status, title) => {
  await todoStore.update({ id: id, completed: status, title: title })
  refresh()
}

const todoTitleChange = async (id, title) => {
  await todoStore.update({
    id: id,
    title: title
  })
  refresh()
}

const deleteTodo = async (id) => {
  await todoStore.delete(id)
  refresh()
}
</script>

<template>
  <CreateTodo @create-todo="createTodo" />
  <div class="container has-background-light p-5 rounded mt-5" v-if="todoStore.todo_list != 0">
    <ul>
      <TodoItem
        v-for="todo in todoStore.todo_list"
        :key="todo.id"
        :todo="todo"
        @todo-status-change="todoStatusChange"
        @todo-title-change="todoTitleChange"
        @todo-delete="deleteTodo"
      />
    </ul>
  </div>
</template>
