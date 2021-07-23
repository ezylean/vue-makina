<template>
  <div>
    <p>{{ app.display }}</p>
    <button @click="app.increment">increment</button>
    <button @click="app.decrement">decrement</button>
  </div>
</template>

<script>
  export default {
    props: {
      app: {
        type: Object,
        required: true
      }
    },
  }
</script>