import shuffle from "../../utils/shuffle";
import {
  ACTION_PLAYER,
  FINISH_ACTION,
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
            id: i + 1,
            alive: true,
            actioned: false,
            name: names[i] || `Player ${i + 1}`,
            role: val,
            voteId: null,
            actionId: null,
          };
        }
      ),
      date: {
        day: 0,
        time: Time.night,
      },
      state: {
        winner: null,
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

export const finishAction = (
  players: Player[],
  id: number
): GameActionTypes => {
  return {
    type: FINISH_ACTION,
    players: players.map(player => {
      if (player.id === id) {
        player.actioned = true;
      }
      return player;
    }),
  };
};

function majority(ids: number[]) {
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
  return maxIds[Math.floor(Math.random() * maxIds.length)] || null;
}

function vote(players: Player[], nextTime: Time) {
  let lastDiedPlayer: Player | null = null;
  let protectedIds: number[] = [];

  let deathId = majority(
    players.map(
      player =>
        (nextTime === Time.night ? player.voteId : player.actionId) || -1
    )
  );

  for (const player of players) {
    if (player.role === Roles.doctor && player.actionId) {
      protectedIds = [...protectedIds, player.actionId];
    }
  }

  if (deathId) {
    for (const id of protectedIds) {
      if (deathId === id) {
        deathId = null;
        break;
      }
    }
  }

  const votedPlayers: Player[] = players.map(player => {
    if (player.id === deathId) {
      lastDiedPlayer = player;
      return {
        ...player,
        alive: false,
        actioned: false,
        actionId: null,
        voteId: null,
      };
    } else {
      return { ...player, actioned: false, actionId: null, voteId: null };
    }
  });

  return {
    lastDiedPlayer,
    votedPlayers,
  };
}

function chkWinner(players: Player[]) {
  const alives = players.filter(player => player.alive);
  const werewoves = alives.filter(player => player.role === Roles.werewolf);
  if (alives.length === werewoves.length) {
    return Roles.werewolf;
  } else if (werewoves.length === 0) {
    return Roles.villager;
  } else {
    return null;
  }
}

export const tickTime = (game: Game, nextTime: Time): GameActionTypes => {
  const { lastDiedPlayer, votedPlayers } = vote(game.players, nextTime);
  const winner = chkWinner(votedPlayers);

  return {
    type: TICK_TIME,
    game: {
      players: votedPlayers,
      date: {
        day: nextTime === Time.night ? game.date.day : game.date.day + 1,
        time: nextTime,
      },
      state: {
        winner,
        lastDiedPlayer,
      },
    },
  };
};
