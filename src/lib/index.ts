import { mixinFactory } from './mixinFactory';

const optionsDefaults = {
  allowDirectDispatch: false
};

/**
 * install function required by the Vue plugin system
 *
 * @param Vue                 Vue constructor.
 * @param overrideOptions     override the default options.
 * @returns                   void
 */
export function install(Vue, overrideOptions: Partial<typeof optionsDefaults>) {
  // Merge options argument into options defaults
  const options = { ...optionsDefaults, ...overrideOptions };

  Vue.mixin(mixinFactory(options));
}
