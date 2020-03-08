import { StateMachine, BareStateMachine } from '@ezy/makina';
import * as plugin from './lib';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    stateMachines?: {
      [key: string]:
        | StateMachine<any, any, any, any>
        | BareStateMachine<any, any, any, any>;
    };
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    dispatch: ((action: {
      type: string;
      [key: string]: any;
    }) => Promise<boolean>) & {
      [key: string]: (...args) => Promise<boolean>;
    };
  }
}

export const install = plugin.install;
export default plugin;

// auto install
// @ts-ignore
if (typeof Vue !== 'undefined') {
  // @ts-ignore
  Vue.use(plugin);
}
