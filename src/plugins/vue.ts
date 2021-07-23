import VueConstructor from 'vue';
import { StateContainer } from '@ezy/makina';

/**
 * vue-makina mixin to make all state containers and state machines reactive
 *
 * @param Vue                 Vue constructor.
 * @returns                   void
 */
export function install(Vue: typeof VueConstructor) {
  Vue.mixin({
    data() {
      return Object.keys(Vue.prototype).reduce((result, prop) => {
        if (Vue.prototype[prop] instanceof StateContainer) {
          result[prop] = Vue.prototype[prop];
        }
        return result;
      }, {});
    },
  });
}
