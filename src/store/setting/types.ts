export interface Setting {
  players: number;
  villagers: number;
  werewolves: number;
  seers: number;
  doctors: number;
  interval: number;
}

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

interface UpdateSettingsAction {
  type: typeof UPDATE_SETTINGS;
  setting: Setting;
}

export type SettingActionTypes = UpdateSettingsAction;
