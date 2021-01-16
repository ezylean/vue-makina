<p align="center">
  <img src="https://fakeimg.pl/900x300/ffffff/333333/?text=vue-makina&font=museo" alt="vue-makina" />
</p>

<p align="center">Vue bindings for Makina</p>

## Installation

```shell
npm i @ezy/vue-makina
```

```js
import Vue from "vue"
import VueMakina from "@ezy/vue-makina"

Vue.use(VueMakina)
...
```

### Options-style example

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

### Class-style example

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

### Pass down state machines

the VueMakina plugin handle `stateMachines` and `state-machines` attributes passed to a component and register them just like the `stateMachines` option.
every state machines added to a component is added to `this.$sm`.
this allow you to:
  - access yours state machines in the template.
  - pass down state machines.

#### exemple

```html
<template>
  <div>
    <Counter :state-machines="{ counter: $sm.app.getCounter() }"></Counter>
  </div>
</template>

<script lang="ts">
  import { app } from '../state-management';

  export default {
    stateMachines: {
      app
    }
  };
</script>
```


## Links

[Reference](https://ezylean.github.io/vue-makina)

[Makina](https://www.npmjs.com/package/@ezy/makina)
