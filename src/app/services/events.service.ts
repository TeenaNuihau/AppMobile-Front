import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint: string = 'https://fine-pink-lab-coat.cyclic.app/event'

  constructor(private httpClient: HttpClient) { }

  public getEvents() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }

  public createEvent(event: any) {
    let options = {};
    return this.httpClient.post(this.endpoint, event, options);
  }

  public getEvent(id: string) {
    let options = {};
    return this.httpClient.get(`${this.endpoint}/${id}`, options);
  }

  public deleteEvent(id: string) {
    let options = {};
    return this.httpClient.delete(`${this.endpoint}/${id}`, options);
  }

  public editEvent(id: string, event: any) {
    let options = {};
    return this.httpClient.put(`${this.endpoint}/${id}`, event, options);
  }
}
