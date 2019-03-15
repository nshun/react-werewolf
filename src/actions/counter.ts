import { Action } from "redux";
import { ActionNames } from "../constants/counter";

interface IncrementAction extends Action {
  type: ActionNames.INC;
  plusAmount: number;
}
interface DecrementAction extends Action {
  type: ActionNames.DEC;
  minusAmount: number;
}

export const incrementAmount = (amount: number): IncrementAction => ({
  type: ActionNames.INC,
  plusAmount: amount
});

export const decrementAmount = (amount: number): DecrementAction => ({
  type: ActionNames.DEC,
  minusAmount: amount
});

export type CounterActions = IncrementAction | DecrementAction;
export type ReduxActions = CounterActions | Action;
