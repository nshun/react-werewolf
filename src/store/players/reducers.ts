import {
  INIT_PLAYERS,
  Player,
  PlayerActionTypes,
  Players,
  Roles,
  UPDATE_PLAYERS
} from "./types";

const initPlayers = (num: number): Players => {
  const arr = new Array<string>(num);
  for (let i = 0; i < num; i++) {
    arr[i] = "";
  }
  return {
    players: arr.map(() => {
      return { name: "", role: Roles.villager };
    })
  };
};

const initialState: Players = initPlayers(12);

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
