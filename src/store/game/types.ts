export enum Roles {
  villager,
  werewolf,
  seer,
  doctor,
}

export enum Time {
  night,
  noon,
}

export interface Player {
  id: number;
  alive: boolean;
  actioned: boolean;
  name: string;
  role: Roles;
  voteId: number | null;
  actionId: number | null;
}

export interface GameDate {
  day: number;
  time: Time;
}

export interface GameState {
  winner: Roles | null;
  lastDiedPlayer: Player | null;
}

export interface Game {
  players: Player[];
  date: GameDate;
  state: GameState;
}

export const INIT_GAME = "INIT_GAME";
export const UPDATE_PLAYERS = "UPDATE_PLAYERS";
export const VOTE_PLAYER = "VOTE_PLAYER";
export const ACTION_PLAYER = "ACTION_PLAYER";
export const FINISH_ACTION = "FINISH_ACTION";
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

interface FinishActionAction {
  type: typeof FINISH_ACTION;
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
  | FinishActionAction
  | TickTimeAction;
