export enum Roles {
  villager,
  werewolf,
}

export enum Time {
  night,
  noon,
}

export interface Player {
  id: number;
  name: string;
  role: Roles;
  voteId: number | undefined;
  actionId: number | undefined;
}

export interface GameDate {
  day: number;
  time: Time;
}

export interface Game {
  players: Player[];
  date: GameDate;
}

export const INIT_PLAYERS = "INIT_PLAYERS";
export const UPDATE_PLAYERS = "UPDATE_PLAYERS";
export const VOTE_PLAYER = "VOTE_PLAYER";
export const ACTION_PLAYER = "VOTE_PLAYER";
export const TICK_TIME = "TICK_TIME";

interface InitPlayersAction {
  type: typeof INIT_PLAYERS;
  players: Player[];
}

interface UpdatePlayersAction {
  type: typeof UPDATE_PLAYERS;
  players: Player[];
}

interface VotePlayerAction {
  type: typeof VOTE_PLAYER;
  players: Player[];
}

interface TickTimeAction {
  type: typeof TICK_TIME;
  date: GameDate;
}

export type GameActionTypes =
  | InitPlayersAction
  | UpdatePlayersAction
  | VotePlayerAction
  | TickTimeAction;
