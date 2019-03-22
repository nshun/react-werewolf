import shuffle from "../../utils/shuffle";
import {
  Game,
  GameActionTypes,
  INIT_PLAYERS,
  Player,
  Roles,
  UPDATE_PLAYERS,
  VOTE_PLAYER
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
    game: {
      players: names.map(
        (val, i): Player => {
          return {
            id: i,
            name: val || `Player ${i + 1}`,
            role: roles[i],
            voteId: undefined
          };
        }
      )
    }
  };
};

export const updatePlayers = (newState: Game): GameActionTypes => ({
  type: UPDATE_PLAYERS,
  game: newState
});

export const votePlayer = (
  players: Player[],
  id: number,
  voteId: number
): GameActionTypes => {
  return {
    type: VOTE_PLAYER,
    game: {
      players: players.map(player => {
        if (player.id === id) {
          player.voteId = voteId;
        }
        return player;
      })
    }
  };
};
