import { combineReducers, createStore } from "redux";
import gameReducer from "./game/reducers";
import settingReducer from "./setting/reducers";

const rootReducer = combineReducers({
  setting: settingReducer,
  game: gameReducer
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
