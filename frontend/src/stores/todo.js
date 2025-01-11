import { defineStore } from 'pinia'
import axios from '../axios'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todo_list: []
  }),
  actions: {
    async create(todo) {
      await axios.post('/tasks/', todo)
    },
    async delete(id) {
      await axios.delete(`/tasks/${id}/`)
    },
    async update(todo) {
      await axios.put(`/tasks/${todo.id}/`, todo)
    },
    async fetchTodoList() {
      const response = await axios.get('/tasks/')
      this.todo_list = response.data
    }
  },
  getters: {
    getTodoList: (state) => state.todo_list
  }
})
