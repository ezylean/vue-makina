import * as plugin from './plugins/vue';
import './plugins/makina';

export const install = plugin.install;
export default plugin;

// auto install
// @ts-ignore
if (typeof Vue !== 'undefined') {
  // @ts-ignore
  Vue.use(plugin);
}
