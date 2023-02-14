
export class Volunteer {
    _id: string;
    prenom: string;
    nom: string;
    email: string;
  
    constructor(_id: string, prenom: string, nom: string, email: string) {
        this._id = _id;
        this.prenom = prenom;
        this.nom = nom;
        this.email = email;
    }
  }
  