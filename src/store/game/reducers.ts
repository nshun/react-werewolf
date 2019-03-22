import {
  Game,
  GameActionTypes,
  INIT_PLAYERS,
  Roles,
  TICK_TIME,
  Time,
  UPDATE_PLAYERS,
  VOTE_PLAYER,
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
        name: "",
        role: Roles.villager,
        voteId: undefined,
      };
    }),
    date: {
      day: 0,
      time: Time.night,
    },
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
        players: [...action.players],
      };
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: [...action.players],
      };
    case VOTE_PLAYER:
      return {
        ...state,
        players: [...action.players],
      };
    case TICK_TIME:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
