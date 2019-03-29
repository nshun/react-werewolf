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
  alive: boolean;
  name: string;
  role: Roles;
  voteId: number | undefined;
  actionId: number | undefined;
}

export interface GameDate {
  day: number;
  time: Time;
}

export interface History {
  lastDiedPlayer: Player | null;
}

export interface Game {
  players: Player[];
  date: GameDate;
  history: History;
}

export const INIT_GAME = "INIT_GAME";
export const UPDATE_PLAYERS = "UPDATE_PLAYERS";
export const VOTE_PLAYER = "VOTE_PLAYER";
export const ACTION_PLAYER = "VOTE_PLAYER";
export const TICK_TIME = "TICK_TIME";

interface InitPlayersAction {
  type: typeof INIT_GAME;
  game: Game;
}

interface UpdatePlayersAction {
  type: typeof UPDATE_PLAYERS;
  players: Player[];
}

interface VotePlayerAction {
  type: typeof VOTE_PLAYER;
  players: Player[];
}

interface ActionPlayerAction {
  type: typeof ACTION_PLAYER;
  players: Player[];
}

interface TickTimeAction {
  type: typeof TICK_TIME;
  game: Game;
}

export type GameActionTypes =
  | InitPlayersAction
  | UpdatePlayersAction
  | VotePlayerAction
  | ActionPlayerAction
  | TickTimeAction;
