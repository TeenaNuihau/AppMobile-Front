import { Volunteer } from '../volunteers/volunteer'

export class Event {
    beginingDate: string;
    endingDate: string;
    benevoles: Volunteer[];
  
    constructor(beginingDate: string, endingDate: string, benevoles: Volunteer[]) {
      this.beginingDate = beginingDate;
      this.endingDate = endingDate;
      this.benevoles = benevoles;
    }
  }
  