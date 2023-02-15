import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EventsService } from '../services/events.service';
import { VolunteersService } from '../services/volunteers.service';
import { ZonesService } from '../services/zones.service';
import { Volunteer } from '../volunteers/volunteer';
import { Zone } from '../zones/zone';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  public zones : Zone[] = [];
  public volunteers : Volunteer[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "nom";
  public isDesc: boolean = false;
  form = this.fb.group({
    beginingdate: ['', Validators.required],
    endingdate: ['', Validators.required],
    zone: ['', Validators.required],
    benevoles: ['', Validators.required],
  });
  public list: string[] = [];
  public selectedVolunteer: string | undefined;

  constructor(
    private volunteersService : VolunteersService,
    private zonesService: ZonesService,
    private eventsService: EventsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.volunteersService.getVolunteers().subscribe(res => {
      this.volunteers = res as Volunteer[];
    });
    this.zonesService.getZones().subscribe(res => {
      this.zones = res as Zone[];
    });
  }

  public addToList() {
    if (this.selectedVolunteer && !this.list.includes(this.selectedVolunteer)) {
      this.list.push(this.selectedVolunteer);
    }
  }
  
  public removeVolunteer(volunteer: string) {
    this.list.splice(this.list.indexOf(volunteer), 1);
  }

  public onSubmit(): void {
    const eventBeginingdate = this.form.value.beginingdate;
    const eventEndingdate = this.form.value.endingdate;
    let eventZone: Zone = new Zone("", "", []);
    let eventVolunteers: Volunteer[] = [];
    if (eventBeginingdate != null && eventEndingdate != null && this.form.value.zone != null) {
      this.list.forEach(volunteerId => {
        this.volunteersService.getVolunteer(volunteerId).subscribe(res => {
          eventVolunteers.push(res as Volunteer);
        })
      });
      const newEvent = { _id: "", beginingdate: eventBeginingdate, endingdate: eventEndingdate, zone: eventZone, volunteers: eventVolunteers };
      this.eventsService.createEvent(newEvent).subscribe();
    }
    this.form.reset();
  }
}
