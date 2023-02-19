import { Game } from "../games/game";

export class Zone {
  _id: string;
  nom: string;
  jeux: Game[];

  constructor(_id: string, nom: string, games: any[]) {
    this._id = _id;
    this.nom = nom;
    this.jeux = games as Game[];
  }
}
  