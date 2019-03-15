import { Action, combineReducers, compose, createStore } from "redux";
import { CounterActions } from "./actions/counter";
import counter, { GameState } from "./reducers/counter";

const rootReducer = combineReducers({
  counter
});

export interface ReduxState {
  counter: GameState;
}

export type ReduxAction = CounterActions | Action;

function createFinalStore() {
  const finalCreateStore = compose()(createStore);
  return finalCreateStore(rootReducer);
}

export default createFinalStore();
