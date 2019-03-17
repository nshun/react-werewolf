import {
  INIT_PLAYERS,
  Player,
  PlayerActionTypes,
  Players,
  Roles,
  UPDATE_PLAYERS
} from "./types";

const initialPlayer: Player = { name: "", role: Roles.villager };
const initialState: Players = { players: [initialPlayer] };

export default function settingReducer(
  state = initialState,
  action: PlayerActionTypes
): Players {
  switch (action.type) {
    case INIT_PLAYERS:
      return {
        ...state,
        ...action.players
      };
    case UPDATE_PLAYERS:
      return {
        ...state,
        ...action.players
      };
    default:
      return state;
  }
}
