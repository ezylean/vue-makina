import { StateMachine } from '../types';

/**
 * vue-makina mixin to manage the `stateMachines` option.
 */
export const mixin = {
  data() {
    const stateMachines: StateMachine<any> = this.$options.stateMachines;
    if (stateMachines) {
      return Object.keys(stateMachines).reduce((result, prop) => {
        result[prop] = stateMachines[prop].state;
        return result;
      }, {});
    }
    return {};
  },
  created() {
    const stateMachines: StateMachine<any> = this.$options.stateMachines;
    if (stateMachines) {
      for (const prop in stateMachines) {
        if (Object.prototype.hasOwnProperty.call(stateMachines, prop)) {
          this.$once('hook:beforeDestroy', stateMachines[prop].onStateChange(state => {
            this[prop] = state;
          }))
        }
      }
    }
  }
};
