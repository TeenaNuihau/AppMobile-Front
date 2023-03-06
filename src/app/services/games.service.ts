import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private endpoint: string = 'https://fine-pink-lab-coat.cyclic.app/jeux'

  constructor(private httpClient: HttpClient) { }

  public getGames() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }

  public createGame(game: any) {
    let options = {};
    return this.httpClient.post(this.endpoint, game, options);
  }

  public getGame(id: string) {
    let options = {};
    return this.httpClient.get(`${this.endpoint}/${id}`, options);
  }

  public deleteGame(id: string) {
    let options = {};
    return this.httpClient.delete(`${this.endpoint}/${id}`, options);
  }

  public editGame(id: string, game: any) {
    let options = {};
    return this.httpClient.put(`${this.endpoint}/${id}`, game, options);
  }
}
