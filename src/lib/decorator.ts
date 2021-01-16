import { createDecorator } from 'vue-class-component';
import { StateMachine } from '../types';

export function State(stateMachine: StateMachine<any>) {
  return createDecorator((options, key) => {
    options.mixins.push({
      data() {
        if (this.$sm && this.$sm[key]) {
          return {};
        }

        return {
          [key]: stateMachine.state
        };
      },
      created() {
        if (this.$sm && this.$sm[key]) {
          return;
        }

        this.$once(
          'hook:beforeDestroy',
          stateMachine.onStateChange(state => {
            this[key] = state;
          })
        );

        this.$sm = { ...this.$sm, [key]: stateMachine };
      }
    });
  });
}
