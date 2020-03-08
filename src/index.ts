import * as plugin from './lib';

export const install = plugin.install;
export default plugin;

// auto install
// @ts-ignore
if (typeof Vue !== 'undefined') {
  // @ts-ignore
  Vue.use(plugin);
}
