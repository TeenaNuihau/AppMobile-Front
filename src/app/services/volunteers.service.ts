import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  private endpoint: string = 'http://localhost:3000/benevole'

  constructor(private httpClient: HttpClient) { }

  getVolunteers(): {firstname: string, lastname: string, email: string}[] {
    return [
      {
        firstname: 'bene',
        lastname: 'vole 1',
        email: 'benevole1@mail.fr',
      },
      {
        firstname: 'bene',
        lastname: 'vole 2',
        email: 'benevole2@mail.fr',
      },
      {
        firstname: 'bene',
        lastname: 'vole 3',
        email: 'benevole3@mail.fr',
      },
    ]
  }

  getVolunteersFromAPI() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }
}
