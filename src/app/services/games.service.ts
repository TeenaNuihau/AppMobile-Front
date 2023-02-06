import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private httpClient: HttpClient) { }

  getGames(): {name: string, type: string, zone: string, date: string, start: string, end: string}[] {
    return [
      {
        name: 'Jeu enfant',
        type: 'enfant',
        zone: 'Esplanade-Accueil',
        date: "2024-02-01",
        start: "14:05",
        end: "15:05"
      },
      {
        name: 'Jeu famille',
        type: 'famille',
        zone: 'Antigone-Buvette',
        date: "2023-08-16",
        start: "14:05",
        end: "15:05"
      },
      {
        name: 'Jeu ambiance',
        type: 'ambiance',
        zone: '',
        date: "2023-02-16",
        start: "14:05",
        end: "15:05"
      },
      {
        name: 'Jeu initié',
        type: 'initié',
        zone: 'Antigone-Proto',
        date: "2024-02-16",
        start: "14:05",
        end: "15:05"
      },
      {
        name: 'Jeu expert',
        type: 'expert',
        zone: 'Antigone-Loup-Garous',
        date: "",
        start: "",
        end: ""
      },
    ]
  }

  private getById(id: number): Observable<Object> {
    return this.httpClient.get("/games/" + id)
  }
}
