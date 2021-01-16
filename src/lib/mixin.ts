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
      result[prop] = this.$sm[prop].state;
      return result;
    }, {});
  },
  created() {
    for (const prop in this.$sm) {
      if (Object.prototype.hasOwnProperty.call(this.$sm, prop)) {
        this.$once(
          'hook:beforeDestroy',
          this.$sm[prop].onStateChange(state => {
            this[prop] = state;
          })
        );
      }
    }
  }
};
