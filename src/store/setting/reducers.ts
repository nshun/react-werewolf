import { Setting, SettingActionTypes, UPDATE_SETTINGS } from "./types";

const initialState: Setting = {
  players: 6,
  villagers: 2,
  werewolves: 2,
  seers: 1,
  doctors: 1,
  interval: 120,
};

export default function settingReducer(
  state = initialState,
  action: SettingActionTypes
): Setting {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.setting,
      };
    default:
      return state;
  }
}
