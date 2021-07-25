import { install, StateContainer, StateContainerClass } from '@ezy/makina';
import * as Vue3 from 'vue';
// import { setupDevtools } from '../lib/devtools';

export const defaultConfig = { devtools: false };

declare module '@ezy/makina' {
  interface Plugins<S> {
    vue: (spec?: {
      devtools: boolean;
    }) => (Base: StateContainerClass) => typeof StateContainer;
  }
}

install({
  name: 'vue',
  decoratorFactory:
    (spec = defaultConfig) =>
    (Base: StateContainerClass) => {
      return class extends Base {
        public static create(...args) {
          const instance = super.create(...args);
          if (process.env.NODE_ENV === 'development' && spec.devtools) {
            // setupDevtools(instance);
          }

          // Vue 3 do not mutate the original object
          // so to make vue 3 aware af state changes
          // we use a reative object combined with
          // a getter/setter on the original object
          if ('reactive' in Vue3) {
            const ref = (Vue3 as any).reactive({
              value: (instance as any)._state,
            });

            Object.defineProperty(instance, '_state', {
              enumerable: true,
              configurable: true,
              set: (value) => (ref.value = value),
              get: () => ref.value,
            });
          }

          return instance as any;
        }
      } as any;
    },
});
