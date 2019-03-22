import { combineReducers } from "redux";

import gameReducer from "./game/reducers";
import settingReducer from "./setting/reducers";

export const rootReducer = combineReducers({
  setting: settingReducer,
  game: gameReducer,
});
