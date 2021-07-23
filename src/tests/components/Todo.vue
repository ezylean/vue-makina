<template>
  <div>
    <p>{{ todo.state.text }}</p>
    <button @click="todo.complete()">completed</button>
    <button @click="todo.block()">blocked</button>
  </div>
</template>

<script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true
      }
    },
  }
</script>