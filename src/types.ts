export interface StateMachine<State> {
  state: State;
  onStateChange(listener: (state: State) => void): () => boolean;
}
