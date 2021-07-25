import test from 'ava';
import { within } from '@testing-library/dom';
import { render, fireEvent } from '@testing-library/vue';
import { config, createBase } from '@ezy/makina';
import '../';

process.env.NODE_ENV = 'development';

// @ts-ignore
import CounterComponent from '../../../src/tests/components/Counter.vue';
// @ts-ignore
import TodosComponent from '../../../src/tests/components/Todos.vue';
import { lensPath } from 'ramda';

config.freeze = Object.freeze;

test('simple', async (t) => {
  class Counter extends createBase()<number> {
    constructor(initialState = 0, IO?, options?) {
      super(initialState, IO, options);
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

  const app = Counter.create();

  const { getByText } = render(CounterComponent, {
    props: {
      app,
    },
  });

  const inc = getByText('increment' as any);
  const dec = getByText('decrement' as any);

  getByText(`Times clicked: 0` as any);
  t.is(app.state, 0);

  await fireEvent.click(inc);

  getByText(`Times clicked: 1` as any);
  t.is(app.state, 1);

  await fireEvent.click(dec);

  getByText(`Times clicked: 0` as any);
  t.is(app.state, 0);
});

test('nested', async (t) => {
  interface TodoState {
    id: number;
    text: string;
    completed?: boolean;
    blocked?: boolean;
  }

  interface TodosState {
    list: TodoState[];
  }

  class Todo extends createBase()<TodoState> {
    public complete() {
      if (!this.state.completed) {
        return this.commit('completed', {
          ...this.state,
          completed: true,
        });
      }
      return false;
    }

    public block() {
      if (!this.state.blocked) {
        return this.commit('blocked', {
          ...this.state,
          blocked: true,
        });
      }
      return false;
    }
  }

  class Todos extends createBase()<TodosState> {
    public get total() {
      return this.state.list.length;
    }

    public get completed() {
      return this.state.list.filter((todo) => !!todo.completed).length;
    }

    public get blocked() {
      return this.state.list.filter((todo) => !!todo.blocked).length;
    }

    public add(text: string) {
      this.commit('todo added', {
        list: [...this.state.list, { id: this.state.list.length, text }],
      });
    }

    public get(index: number) {
      return this.create(lensPath(['list', index]), Todo);
    }
  }

  const BaseApp = createBase({
    vue: {
      devtools: true,
    },
    modules: {
      todos: Todos,
    },
  });

  class App extends BaseApp {}

  const app = App.create({
    todos: {
      list: [],
    },
  });

  const { getByText, getByLabelText, getByTestId } = render(TodosComponent, {
    props: {
      app,
    },
  });

  const todoInput = getByLabelText('todo:' as any);
  const addButton = getByText('add' as any);

  await fireEvent.update(todoInput, 'make coffee');
  await fireEvent.click(addButton);

  await fireEvent.update(todoInput, 'do some pushups');
  await fireEvent.click(addButton);

  await fireEvent.update(todoInput, 'take off');
  await fireEvent.click(addButton);

  const firstTodo = getByTestId('0' as any);
  const secondTodo = getByTestId('1' as any);

  await fireEvent.click(within(firstTodo).getByText('completed' as any));
  await fireEvent.click(within(secondTodo).getByText('blocked' as any));

  getByText('completed: 1' as any);
  getByText('blocked: 1' as any);
  getByText('total: 3' as any);

  t.deepEqual(app.state, {
    todos: {
      list: [
        { id: 0, text: 'make coffee', completed: true },
        { id: 1, text: 'do some pushups', blocked: true },
        { id: 2, text: 'take off' },
      ],
    },
  });
});
