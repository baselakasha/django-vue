<script setup>
import { defineProps, defineEmits, reactive } from 'vue'
const emit = defineEmits(['todo-status-change', 'todo-title-change', 'todo-delete'])
const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const TodoItemState = reactive({
  editing: false,
  pending_value: props.todo.title,
  delete_confirm_shown: false
})

const checkboxChanged = (e) => {
  emit('todo-status-change', props.todo.id, e.target.checked, props.todo.title)
}

const enableEdit = () => {
  TodoItemState.editing = true
}

const todoTitleChange = (e) => {
  emit('todo-title-change', props.todo.id, TodoItemState.pending_value)
  TodoItemState.editing = false
  TodoItemState.pending_value = props.todo.title
}

const showDeleteConfirmation = () => {
  TodoItemState.delete_confirm_shown = true
}

const cancelDelete = () => {
  TodoItemState.delete_confirm_shown = false
}

const deleteTodoItem = () => {
  emit('todo-delete', props.todo.id)
}
</script>

<template>
  <div>
    <li class="list-item p-4 mb-2 todo-item" :class="{ completed: todo.completed }">
      <div v-if="TodoItemState.editing">
        <div class="field has-addons">
          <button>
            <span @click="TodoItemState.editing = false" class="mr-3"> ⬅️ </span>
          </button>
          <div class="control">
            <input class="input" type="text" v-model="TodoItemState.pending_value" />
          </div>
          <div class="control">
            <button @click="todoTitleChange" class="button">Save</button>
          </div>
        </div>
      </div>
      <div v-else-if="TodoItemState.delete_confirm_shown">
        <div class="columns">
          <div class="column">
            <p>Are you sure you want to delete this todo?</p>
          </div>
          <div class="column has-text-right">
            <button class="button" @click="cancelDelete">
              <span>No</span>
            </button>
            <button class="button is-danger ml-2" @click="deleteTodoItem">
              <span>Yes</span>
            </button>
          </div>
        </div>
      </div>
      <div v-else class="columns">
        <div class="column">
          <input :id="todo.id" @change="checkboxChanged" :checked="props.todo.completed" type="checkbox" class="mr-3"  />
          <label :for="todo.id">{{ todo.title }}</label>
        </div>
        <div class="column has-text-right">
          <button class="px-2" @click="enableEdit">
            <span>✏️</span>
          </button>
          <button @click="showDeleteConfirmation">
            <span>❌</span>
          </button>
        </div>
      </div>
    </li>
  </div>
</template>

<style lang="scss" scoped>
.todo-item {
  background-color: #dcdcdc;
  border-radius: 5px;
  max-width: 30%;
  margin: auto;
}

.completed {
  text-decoration: line-through;
  background-color: grey;
}
</style>
