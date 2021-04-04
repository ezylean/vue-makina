import * as plugin from './lib';
export * from './lib/decorator';
import { StateMachine } from './types';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    stateMachines?: {
      [key: string]: (StateMachine<any> | [StateMachine<any>, (state: any) => any]);
    };
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $sm: {
      [key: string]: (StateMachine<any> | [StateMachine<any>, (state: any) => any]);
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
