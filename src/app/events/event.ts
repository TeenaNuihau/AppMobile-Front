import { Volunteer } from '../volunteers/volunteer'
import { Zone } from '../zones/zone';

export class Event {
    beginingDate: string;
    endingDate: string;
    zone: Zone;
    benevoles: Volunteer[];
  
    constructor(beginingDate: string, endingDate: string, zone: Zone, benevoles: Volunteer[]) {
      this.beginingDate = beginingDate;
      this.endingDate = endingDate;
      this.zone = zone;
      this.benevoles = benevoles;
    }
  }
  