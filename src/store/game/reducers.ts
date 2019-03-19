import {
  GameActionTypes,
  INIT_PLAYERS,
  Player,
  Players,
  Roles,
  UPDATE_PLAYERS
} from "./types";

const initialPlayers = (num: number): Players => {
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

const initialState: Players = initialPlayers(12);

export default function gameReducer(
  state = initialState,
  action: GameActionTypes
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
