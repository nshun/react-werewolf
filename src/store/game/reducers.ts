import {
  Game,
  GameActionTypes,
  INIT_PLAYERS,
  Roles,
  UPDATE_PLAYERS
} from "./types";

const initState = (num: number): Game => {
  const arr = new Array<string>(num);
  for (let i = 0; i < num; i++) {
    arr[i] = "";
  }
  return {
    players: arr.map((val, i) => {
      return {
        id: i,
        name: `Player ${i + 1}`,
        role: Roles.villager,
        voteId: undefined
      };
    })
  };
};

const initialState: Game = initState(6);

export default function gameReducer(
  state = initialState,
  action: GameActionTypes
): Game {
  switch (action.type) {
    case INIT_PLAYERS:
      return {
        ...state,
        ...action.game
      };
    case UPDATE_PLAYERS:
      return {
        ...state,
        ...action.game
      };
    default:
      return state;
  }
}
