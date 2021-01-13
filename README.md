<p align="center">
  <img src="https://fakeimg.pl/900x300/ffffff/333333/?text=vue-makina&font=museo" alt="vue-makina" />
</p>

<p align="center">Vue bindings for Makina</p>

## Installation

```shell
npm i @ezy/vue-makina
```

### Options-style Example

```js
import Vue from "vue"
import VueMakina from "@ezy/vue-makina"

Vue.use(VueMakina)
...
```

the VueMakina plugin add a `stateMachines` option to your components.
this option acccept a mapping object where every key represent the component property to update whenever a state change and the value a stateMachine.

```html
<template>
  <div>
    <p>{{ counter }}</p>

    <button v-on:click="increment()">+</button>
    <button v-on:click="decrement()">-</button>
  </div>
</template>

<script lang="ts">
  import { app } from '../state-management';

  export default {
    stateMachines: {
      counter: app.counter
    },
    methods: {
      increment () {
        app.counter.increment()
      },
      decrement () {
        app.counter.decrement()
      }
    }
  };
</script>
```

### Class-style Example

```html
<template>
  <div>
    <p>{{ counter }}</p>

    <button v-on:click="increment()">+</button>
    <button v-on:click="decrement()">-</button>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State } from '@ezy/vue-makina'
  import { app } from '../state-management';

  @Component
  export default class extends Vue {
    @State(app.counter) readonly counter: typeof app.counter.state

    public increment () {
      app.counter.increment()
    }

    public decrement () {
      app.counter.decrement()
    }
  }
</script>
```

## Links

[Reference](https://ezylean.github.io/vue-makina)

[Makina](https://www.npmjs.com/package/@ezy/makina)
