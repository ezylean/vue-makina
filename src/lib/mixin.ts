/**
 * vue-makina mixin to manage the `stateMachines` option.
 */
export const mixin = {
  data() {
    this.$sm = {
      ...this.$options.stateMachines,
      ...this.$attrs.stateMachines,
      ...this.$attrs['state-machines']
    };

    return Object.keys(this.$sm).reduce((result, prop) => {
      const [sm, selector] = Array.isArray(this.$sm[prop])? this.$sm[prop] : [this.$sm[prop], (state) => state];
      result[prop] = selector(sm.state);
      return result;
    }, {});
  },
  created() {
    for (const prop in this.$sm) {
      if (Object.prototype.hasOwnProperty.call(this.$sm, prop)) {
        const [sm, selector] = Array.isArray(this.$sm[prop])? this.$sm[prop] : [this.$sm[prop], (state) => state];
        this.$once(
          'hook:beforeDestroy',
          sm.onStateChange(state => {
            this[prop] = selector(state);
          })
        );
      }
    }
  }
};
