import {
  Game,
  GameActionTypes,
  INIT_GAME,
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
        id: i + 1,
        alive: true,
        actioned: false,
        name: "",
        role: Roles.villager,
        voteId: null,
        actionId: null,
      };
    }),
    date: {
      day: 0,
      time: Time.night,
    },
    state: {
      winner: null,
      lastDiedPlayer: null,
    },
  };
};

const initialState: Game = initState(6);

export default function gameReducer(
  state = initialState,
  action: GameActionTypes
): Game {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...state,
        ...action.game,
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
        ...action.game,
      };
    default:
      return state;
  }
}
