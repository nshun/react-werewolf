import shuffle from "../../utils/shuffle";
import {
  ACTION_PLAYER,
  Game,
  GameActionTypes,
  INIT_GAME,
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

export const initGame = (
  names: string[],
  roleNums: number[]
): GameActionTypes => {
  const roles = shuffle(createRoles(roleNums));
  return {
    type: INIT_GAME,
    game: {
      players: roles.map(
        (val, i): Player => {
          return {
            id: i,
            alive: true,
            name: names[i] || `Player ${i + 1}`,
            role: val,
            voteId: undefined,
            actionId: undefined,
          };
        }
      ),
      date: {
        day: 0,
        time: Time.night,
      },
      history: {
        lastDiedPlayer: null,
      },
    },
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

function majority(ids: number[]): number {
  const cnts: { [key: number]: number } = {};
  for (const id of ids) {
    if (cnts.hasOwnProperty(id)) {
      cnts[id]++;
    } else {
      cnts[id] = 1;
    }
  }
  let maxCnt = 0;
  let maxIds: number[] = [];
  for (const key in cnts) {
    if (cnts.hasOwnProperty(key) && Number(key) !== -1) {
      const cnt = cnts[key];
      if (maxCnt === cnt) {
        maxIds = [...maxIds, Number(key)];
      } else if (maxCnt < cnt) {
        maxCnt = cnt;
        maxIds = [Number(key)];
      }
    }
  }
  return maxIds[Math.floor(Math.random() * maxIds.length)];
}

export const tickTime = (game: Game, nextTime: Time): GameActionTypes => {
  let lastDiedPlayer: Player | null = null;

  const deathId = majority(
    game.players.map(
      player =>
        (nextTime === Time.night ? player.voteId : player.actionId) || -1
    )
  );

  return {
    type: TICK_TIME,
    game: {
      players: game.players.map(player => {
        if (player.id === deathId) {
          lastDiedPlayer = player;
          return {
            ...player,
            alive: false,
            actionId: undefined,
            voteId: undefined,
          };
        } else {
          return { ...player, actionId: undefined, voteId: undefined };
        }
      }),
      date: {
        day: nextTime === Time.night ? game.date.day : game.date.day + 1,
        time: nextTime,
      },
      history: {
        lastDiedPlayer,
      },
    },
  };
};
