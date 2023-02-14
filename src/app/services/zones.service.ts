import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private endpoint: string = 'http://localhost:3000/zone'

  constructor(private httpClient: HttpClient) { }

  public getZones() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }
}
