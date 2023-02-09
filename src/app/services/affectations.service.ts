import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AffectationsService {

  constructor() { }

  getAffectations(): {zone: string, date: string, start: string, end: string, game: string, volunteers: [string]}[] {
    return [
    ]
  }
}
