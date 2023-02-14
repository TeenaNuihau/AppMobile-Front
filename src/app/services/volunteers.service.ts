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

  public createVolunteer(volunteer: any) {
    let options = {};
    return this.httpClient.post(this.endpoint, volunteer, options);
  }

  public getVolunteer(id: string) {
    let options = {};
    return this.httpClient.get(`${this.endpoint}/${id}`, options);
  }

  public deleteVolunteer(id: string) {
    let options = {};
    return this.httpClient.delete(`${this.endpoint}/${id}`, options);
  }

  public editVolunteer(id: string, volunteer: any) {
    let options = {};
    return this.httpClient.put(`${this.endpoint}/${id}`, volunteer, options);
  }
}
