import { Game } from "../games/game";

export class Zone {
  _id: string;
  nom: string;
  games: Game[];

  constructor(_id: string, nom: string, games: Game[]) {
    this._id = _id;
    this.nom = nom;
    this.games = games;
  }
}
  