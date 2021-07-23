import { config, StateContainer, StateContainerClass } from '@ezy/makina';
// import { setupDevtools } from '../lib/devtools';

export const defaultConfig = { devtools: false };

declare module '@ezy/makina' {
  interface Plugins<S> {
    vue: (spec?: {
      devtools: boolean;
    }) => (Base: StateContainerClass) => typeof StateContainer;
  }
}

config.plugins.vue =
  (spec = defaultConfig) =>
  (Base: StateContainerClass) => {
    return class extends Base {
      public static create(...args) {
        const instance = super.create(...args);
        if (process.env.NODE_ENV === 'development' && spec.devtools) {
          // setupDevtools(instance);
        }
        return instance as any;
      }
    } as any;
  };
