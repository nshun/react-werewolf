import { Setting, UPDATE_SETTINGS } from "./types";

export const updateSetting = (newSetting: Setting) => ({
  type: UPDATE_SETTINGS,
  setting: newSetting,
});
