import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  private endpoint: string = 'https://fine-pink-lab-coat.cyclic.app/zone'

  constructor(private httpClient: HttpClient) { }

  public getZones() {
    let options = {};
    return this.httpClient.get(this.endpoint, options);
  }

  public createZone(zone: any) {
    let options = {};
    return this.httpClient.post(this.endpoint, zone, options);
  }

  public getZone(id: string) {
    let options = {};
    return this.httpClient.get(`${this.endpoint}/${id}`, options);
  }

  public deleteZone(id: string) {
    let options = {};
    return this.httpClient.delete(`${this.endpoint}/${id}`, options);
  }

  public editZone(id: string, zone: any) {
    let options = {};
    return this.httpClient.put(`${this.endpoint}/${id}`, zone, options);
  }
}
