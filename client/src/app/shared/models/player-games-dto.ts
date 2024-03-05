import { Side } from './side-type';

export interface PlayerGamesDto {
  id?: number | undefined;
  playerId?: number | undefined;
  gameId?: number | undefined;
  side: Side | undefined;
}
