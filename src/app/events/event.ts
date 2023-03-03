import { Volunteer } from '../volunteers/volunteer'
import { Zone } from '../zones/zone';

export class Event {
  beginingdate: Date;
  endingdate: Date;
  zone: Zone;
  benevoles: Volunteer[];

  constructor(beginingdate: Date, endingdate: Date, zone: Zone, benevoles: Volunteer[]) {
    this.beginingdate = beginingdate;
    this.endingdate = endingdate;
    this.zone = zone;
    this.benevoles = benevoles;
  }
}
  