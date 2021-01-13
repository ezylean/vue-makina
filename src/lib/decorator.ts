import { createDecorator } from 'vue-class-component';
import { StateMachine } from '../types';

export function State(stateMachine: StateMachine<any>) {
  return createDecorator((options, key) => {
    options.mixins.push({
      data() {
        return {
          [key]: stateMachine.state
        };
      },
      created() {
        this.$once('hook:beforeDestroy', stateMachine.onStateChange(state => {
          this[key] = state;
        }))
      }
    });
  });
}
