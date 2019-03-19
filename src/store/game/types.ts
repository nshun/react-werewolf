export enum Roles {
  villager,
  werewolf
}

export interface Player {
  name: string;
  role: Roles;
}

export interface Players {
  players: Player[];
}

export const INIT_PLAYERS = "INIT_PLAYERS";
export const UPDATE_PLAYERS = "UPDATE_PLAYERS";

interface InitPlayersAction {
  type: typeof INIT_PLAYERS;
  players: Players;
}

interface UpdatePlayersAction {
  type: typeof UPDATE_PLAYERS;
  players: Players;
}

export type GameActionTypes = InitPlayersAction | UpdatePlayersAction;
