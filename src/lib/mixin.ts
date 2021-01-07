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
      const stateMachineNames = Object.keys(stateMachines);
      this._makinaSubscriptions = stateMachineNames.map(prop => {
        return stateMachines[prop].onStateChange(state => {
          this[prop] = state;
        });
      });
    }
  },
  beforeDestroy() {
    if (this._makinaSubscriptions) {
      this._makinaSubscriptions.map(unsubscribe => unsubscribe());
    }
  }
};
