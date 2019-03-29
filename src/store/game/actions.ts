import shuffle from "../../utils/shuffle";
import {
  ACTION_PLAYER,
  Game,
  GameActionTypes,
  GameDate,
  INIT_PLAYERS,
  Player,
  Roles,
  TICK_TIME,
  Time,
  UPDATE_PLAYERS,
  VOTE_PLAYER,
} from "./types";

function createRoles(nums: number[]) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  const roles: number[] = new Array<number>(sum);
  let cnt = 0;
  for (const role in Roles) {
    if (!isNaN(Number(role))) {
      for (let i = 0; i < nums[role]; i++) {
        roles[cnt++] = Number(role);
      }
    }
  }
  return roles;
}

export const initPlayers = (
  names: string[],
  roleNums: number[]
): GameActionTypes => {
  const roles = shuffle(createRoles(roleNums));
  return {
    type: INIT_PLAYERS,
    players: roles.map(
      (val, i): Player => {
        return {
          id: i,
          name: names[i] || `Player ${i + 1}`,
          role: val,
          voteId: undefined,
          actionId: undefined,
        };
      }
    ),
  };
};

export const updatePlayers = (newState: Player[]): GameActionTypes => ({
  type: UPDATE_PLAYERS,
  players: newState,
});

export const votePlayer = (
  players: Player[],
  id: number,
  voteId: number
): GameActionTypes => {
  return {
    type: VOTE_PLAYER,
    players: players.map(player => {
      if (player.id === id) {
        player.voteId = voteId;
      }
      return player;
    }),
  };
};

export const actionPlayer = (
  players: Player[],
  id: number,
  actionId: number
): GameActionTypes => {
  return {
    type: ACTION_PLAYER,
    players: players.map(player => {
      if (player.id === id) {
        player.actionId = actionId;
      }
      return player;
    }),
  };
};

export const tickTime = (game: Game, nextTime: Time): GameActionTypes => {
  return {
    type: TICK_TIME,
    game: {
      players: game.players.map(player => {
        return { ...player, actionId: undefined, voteId: undefined };
      }),
      date: {
        day: nextTime === Time.night ? game.date.day : game.date.day + 1,
        time: nextTime,
      },
    },
  };
};
