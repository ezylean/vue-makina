<p align="center">
  <img src="https://fakeimg.pl/900x300/ffffff/333333/?text=vue-makina&font=museo" alt="vue-makina" />
</p>

<p align="center">Vue bindings for Makina</p>

## Installation

```shell
npm i @ezy/vue-makina
```

### Example

`counter.ts`
```js
import { createBase, Filterables } from '@ezy/makina';

class Counter extends createBase()<number> {

  constructor(initialState = 0) {
    super(initialState);
  }

  public get display() {
    return `Times clicked: ${this.state}`;
  }

  public increment() {
    this.commit('increment', this.state + 1);
  }

  public decrement() {
    this.commit('decrement', this.state - 1);
  }
}

const counter: Filterables<Counter> = Counter.create();

export default counter;
```

`index.ts`
```js
import Vue from "vue"
import VueMakina from "@ezy/vue-makina"
import counter from "./counter"

Vue.use(VueMakina)

declare module 'vue/types/vue' {
  interface Vue {
    $counter: typeof counter
  }
}

Vue.prototype.$counter = counter;

...
```
`counter` is now available in every component as `$counter`.

`Counter.vue`
```html
<template>
  <div>
    <p>{{ $counter.display }}</p>

    <button v-on:click="$counter.increment()">+</button>
    <button v-on:click="$counter.decrement()">-</button>
  </div>
</template>

<script lang="ts">
  export default {};
</script>
```

### On mutation

Vue being based on mutation,
you will pretty quickly run into mutating your app state directly from your components, which destroy the entire point of having a state machine.

to avoid that kind of issues please consider to freeze the state of your state machines, [see here](https://www.npmjs.com/package/@ezy/makina#immutable-state-guarantee).

## Links

[Reference](https://ezylean.github.io/vue-makina)

[Makina](https://www.npmjs.com/package/@ezy/makina)
