import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient: HttpClient) { }

  getGames(): {name: String, type: String, zone: String}[] {
    return [
      {
        name: 'Jeu enfant',
        type: 'enfant',
        zone: 'Esplanade-Accueil',
      },
      {
        name: 'Jeu famille',
        type: 'famille',
        zone: 'Antigone-Buvette',
      },
      {
        name: 'Jeu ambiance',
        type: 'ambiance',
        zone: '',
      },
      {
        name: 'Jeu initié',
        type: 'initié',
        zone: 'Antigone-Proto',
      },
      {
        name: 'Jeu expert',
        type: 'expert',
        zone: 'Antigone-Loup-Garous',
      },
    ]
  }
}
