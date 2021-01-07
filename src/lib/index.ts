import VueConstructor from 'vue';
import { mixin } from './mixin';

/**
 * install function required by the Vue plugin system
 *
 * @param Vue                 Vue constructor.
 * @returns                   void
 */
export function install(Vue: typeof VueConstructor) {
  Vue.mixin(mixin);
}
