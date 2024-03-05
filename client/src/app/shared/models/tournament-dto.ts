import { GameDto } from './game-dto';

export interface TournamentDto {
  id?: number | undefined;
  name?: string | undefined;
  format?: string | undefined;
  place?: string | undefined;
  prize?: string | undefined;
  games?: GameDto[] | undefined;
}
