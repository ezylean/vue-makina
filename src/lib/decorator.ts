import { createDecorator } from 'vue-class-component';
import { StateMachine } from '../types';

export function State(stateMachine: StateMachine<any>) {
  return createDecorator((options, key) => {
    const UNSUBSCRIBE = `__${key}MakinaUnsubscribe`;
    options.mixins.push({
      data() {
        return {
          [key]: stateMachine.state
        };
      },
      created() {
        this[UNSUBSCRIBE] = stateMachine.onStateChange(state => {
          this[key] = state;
        });
      },
      beforeDestroy() {
        this[UNSUBSCRIBE]();
      }
    });
  });
}
