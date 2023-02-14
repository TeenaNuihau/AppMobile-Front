import { Game } from "../games/game";

export class Zone {
    nom: string;
    games: Game[];
  
    constructor(nom: string, games: Game[]) {
      this.nom = nom;
      this.games = games;
    }
  }
  