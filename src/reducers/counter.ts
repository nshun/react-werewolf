import { CounterActions } from "../actions/counter";
import { ActionNames } from "../constants/counter";

export interface GameState {
  num: number;
}

const initialState: GameState = { num: 0 };

export default function reducer(
  state: GameState = initialState,
  action: CounterActions
): GameState {
  switch (action.type) {
    case ActionNames.INC:
      return { num: state.num + action.plusAmount };
    case ActionNames.DEC:
      return { num: state.num - action.minusAmount };
    default:
      return state;
  }
}
