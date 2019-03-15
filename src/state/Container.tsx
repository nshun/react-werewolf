import { connect } from "react-redux";
import { Dispatch } from "redux";
import App from "../container/App";
import { ReduxAction, ReduxState } from "../store";
import { decrementAmount, incrementAmount } from "./module";

export class ActionDispatcher {
  constructor(private dispatch: (action: ReduxAction) => void) {}

  public increment(amount: number) {
    this.dispatch(incrementAmount(amount));
  }

  public decrement(amount: number) {
    this.dispatch(decrementAmount(amount));
  }
}

export default connect(
  (state: ReduxState) => ({ value: state.counter }),
  (dispatch: Dispatch<ReduxAction>) => ({
    actions: new ActionDispatcher(dispatch)
  })
)(App);
