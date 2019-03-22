export enum Roles {
  villager,
  werewolf
}

export interface Player {
  id: number;
  name: string;
  role: Roles;
  voteId: number | undefined;
}

export interface Game {
  players: Player[];
}

export const INIT_PLAYERS = "INIT_PLAYERS";
export const UPDATE_PLAYERS = "UPDATE_PLAYERS";
export const VOTE_PLAYER = "VOTE_PLAYER";

interface InitPlayersAction {
  type: typeof INIT_PLAYERS;
  game: Game;
}

interface UpdatePlayersAction {
  type: typeof UPDATE_PLAYERS;
  game: Game;
}

interface VotePlayerAction {
  type: typeof VOTE_PLAYER;
  game: Game;
}

export type GameActionTypes =
  | InitPlayersAction
  | UpdatePlayersAction
  | VotePlayerAction;
