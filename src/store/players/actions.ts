import { INIT_PLAYERS, Player, Players, Roles, UPDATE_PLAYERS } from "./types";

export const initPlayers = (names: string[]) => ({
  type: INIT_PLAYERS,
  players: names.map(
    (val): Player => {
      return { name: val, role: Roles.villager };
    }
  )
});

export const updatePlayers = (newPlayers: Players) => ({
  type: UPDATE_PLAYERS,
  players: newPlayers
});
