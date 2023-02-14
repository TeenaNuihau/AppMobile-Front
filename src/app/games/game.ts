
export class Game {
  _id: string
    nom: string;
    type: string;
  
    constructor(_id: string, nom: string, type: string) {
      this._id = _id;
      this.nom = nom;
      this.type = type;
    }
  }
  