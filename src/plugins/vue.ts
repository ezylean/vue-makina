import VueConstructor from 'vue';
import { StateContainer } from '@ezy/makina';

/**
 * vue-makina mixin to make all state containers and state machines reactive
 *
 * @param VueOrAPP            Vue constructor for vue 2 or app for vue 3.
 * @returns                   void
 */
export function install(Vue: typeof VueConstructor): void;
export function install(app: { config: { globalProperties: any } }): void;
export function install(VueOrAPP): void {
  const globalProperties =
    typeof VueOrAPP == 'function'
      ? VueOrAPP.prototype
      : VueOrAPP.config.globalProperties;

  VueOrAPP.mixin({
    data() {
      return Object.keys(globalProperties).reduce((result, prop) => {
        if (globalProperties[prop] instanceof StateContainer) {
          result[prop] = globalProperties[prop];
        }
        return result;
      }, {});
    },
  });
}
