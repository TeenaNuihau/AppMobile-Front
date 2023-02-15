import { Volunteer } from '../volunteers/volunteer'
import { Zone } from '../zones/zone';

export class Event {
  _id: string;
  beginingdate: string;
  endingdate: string;
  zone: Zone;
  benevoles: Volunteer[];

  constructor(_id: string, beginingdate: string, endingdate: string, zone: Zone, benevoles: Volunteer[]) {
    this._id = _id;
    this.beginingdate = beginingdate;
    this.endingdate = endingdate;
    this.zone = zone;
    this.benevoles = benevoles;
  }
}
  