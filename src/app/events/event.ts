import { Volunteer } from '../volunteers/volunteer'
import { Zone } from '../zones/zone';

export class Event {
  _id: string;
  beginingdate: Date;
  endingdate: Date;
  zone: Zone;
  benevoles: Volunteer[];

  constructor(_id: string, beginingdate: Date, endingdate: Date, zone: Zone, benevoles: Volunteer[]) {
    this._id = _id;
    this.beginingdate = beginingdate;
    this.endingdate = endingdate;
    this.zone = zone;
    this.benevoles = benevoles;
  }
}
  