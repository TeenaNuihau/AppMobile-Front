import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private endpoint: string = 'http://localhost:3000/event'

  constructor(private httpClient: HttpClient) { }

  public getEvents() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }
}
