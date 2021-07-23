<template>
  <div>
    <h1>Todos</h1>
    <p>
      <span>completed: {{ app.todos.completed }}</span>
      <span>blocked: {{ app.todos.blocked }}</span>
      <span>total: {{ app.todos.total }}</span>
    </p>
    <ul>
      <li v-for="(todo, index) in app.todos.state.list" :key="index">
        <Todo :todo="app.todos.get(index)" :data-testid="index" />
      </li>
    </ul>
    <div>
      <label for="todo">todo:</label>
      <input type="text" id="todo" name="todo" v-model="field" />
      <button @click="app.todos.add(field)">add</button>
    </div>
  </div>
</template>

<script>
import Todo from "./Todo.vue";
export default {
  components: {
    Todo
  },
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      field: ''
    }
  }
}
</script>