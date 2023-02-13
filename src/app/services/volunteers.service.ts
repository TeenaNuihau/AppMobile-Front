import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VolunteersService {

  private endpoint: string = 'http://localhost:3000/benevole'

  constructor(private httpClient: HttpClient) { }

  public getVolunteers() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }

  public deleteVolunteer(volunteer: any) {
    return this.httpClient.delete(this.endpoint, volunteer);
  }

  public editVolunteer(volunteer: any) {
    return this.httpClient.patch(this.endpoint, volunteer);
  }

  public addVolunteer(volunteer: any) {
    return this.httpClient.post(this.endpoint, volunteer);
  }
}
