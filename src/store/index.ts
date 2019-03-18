import { combineReducers, createStore } from "redux";
import playersReducer from "./players/reducers";
import settingReducer from "./setting/reducers";

const rootReducer = combineReducers({
  setting: settingReducer,
  players: playersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}
