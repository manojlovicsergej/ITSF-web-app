import { GameDto } from "./game-dto";
import { PlayerDto } from "./player-dto";
import { TournamentDto } from "./tournament-dto";

export interface DashboardDto{
    brojIgraca?: number | undefined;
    brojUtakmica?: number | undefined;
    brojTurnira?: number | undefined;

    igrac?: PlayerDto | undefined;
    utakmica?: GameDto | undefined;
    turnir?: TournamentDto | undefined;
}