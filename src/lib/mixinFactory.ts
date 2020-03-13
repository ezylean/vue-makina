/**
 * Create a vue-makina mixin to manage the `stateMachines` option.
 *
 * @param options   plugin options
 * @returns         a Vue mixin
 * @ignore
 */
export function mixinFactory(options: { allowDirectDispatch: boolean }) {
  return {
    data() {
      const stateMachines = this.$options.stateMachines;
      if (stateMachines) {
        return Object.keys(stateMachines).reduce((result, prop) => {
          result[prop] = stateMachines[prop].getState();
          return result;
        }, {});
      }
      return {};
    },
    created() {
      const stateMachines = this.$options.stateMachines;
      if (stateMachines) {
        const stateMachineNames = Object.keys(stateMachines);
        this._makinaSubscriptions = stateMachineNames.map(prop => {
          return stateMachines[prop].subscribe(state => {
            this[prop] = state;
          });
        });

        const dispatchs = stateMachineNames.map(
          name => stateMachines[name].dispatch
        );
        const uniqueDispatchs = dispatchs.filter(
          (dispatch, index) => dispatchs.indexOf(dispatch) === index
        );

        if (uniqueDispatchs.length === 1) {
          this.dispatch = options.allowDirectDispatch
            ? uniqueDispatchs[0]
            : Object.create(uniqueDispatchs[0]);
        } else {
          this.dispatch = options.allowDirectDispatch
            ? uniqueDispatchs
            : uniqueDispatchs.map(dispatch => Object.create(dispatch));
        }
      }
    },
    beforeDestroy() {
      if (this._makinaSubscriptions) {
        this._makinaSubscriptions.map(unsubscribe => unsubscribe());
      }
    }
  };
}
