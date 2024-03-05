import { PlayerGamesDto } from './player-games-dto';

export interface GameDto {
  id?: number | undefined;
  gameName?: string | undefined;
  hostName?: string | undefined;
  hostResult?: number | undefined;
  guestName?: string | undefined;
  guestResult?: number | undefined;
  gamePlayers?: PlayerGamesDto[] | undefined;
}
