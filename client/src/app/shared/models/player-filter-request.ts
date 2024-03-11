import { Position } from './position-type';

export interface PlayerFilterRequest {
  rating?: number | undefined;
  winrate?: number | undefined;
  position?: Position | undefined;
}
