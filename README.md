<p align="center">
  <img src="https://fakeimg.pl/900x300/ffffff/333333/?text=vue-makina&font=museo" alt="vue-makina" />
</p>

<p align="center">official Vue bindings for Makina</p>

## Installation

```shell
npm i @ezy/vue-makina
```

## Setup

the VueMakina plugin accept an optionnal option object with the following options:

`allowDirectDispatch`: set to `true` if you want to allow `dispatch({ type: 'SOME_ACTION' })` in your components (default: `false`).

### Example

```js
import Vue from "vue"
import VueMakina from "@ezy/vue-makina"

Vue.use(VueMakina, { allowDirectDispatch: false })

...
```

## Usage

the VueMakina plugin add a `stateMachines` option to your components.
this option acccept a mapping object where every key represent the component property to update whenever a state change and the value a stateMachine.

note: when a stateMachine is added his dispatch function will be assigned to the component.

note 2: if different stateMachines from different StateMachineFactory is used
the dispatch property exposed is an Array of dispatch.

### Example

```html
<template>
  <div>
    <p>{{ counter }}</p>

    <button v-on:click="dispatch.increment()">+</button>
    <button v-on:click="dispatch.decrement()">-</button>
  </div>
</template>

<script lang="ts">
  import { counterStateMachine } from '../state-management';

  export default {
    stateMachines: {
      counter: counterStateMachine
    }
  };
</script>
```

## Links

[Makina](https://www.npmjs.com/package/@ezy/makina)
