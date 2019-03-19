import shuffle from "../../utils/shuffle";
import { INIT_PLAYERS, Player, Players, Roles, UPDATE_PLAYERS } from "./types";

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

export const initPlayers = (names: string[], roleNums: number[]) => {
  const roles = shuffle(createRoles(roleNums));
  return {
    type: INIT_PLAYERS,
    players: {
      players: names.map(
        (val, i): Player => {
          return { name: val, role: roles[i] };
        }
      )
    }
  };
};

export const updatePlayers = (newPlayers: Players) => ({
  type: UPDATE_PLAYERS,
  players: newPlayers
});
