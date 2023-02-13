import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private endpoint: string = 'http://localhost:3000/jeux'

  constructor(private httpClient: HttpClient) { }

  public getGames() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }
}
