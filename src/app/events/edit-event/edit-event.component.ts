import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventsService } from '../../services/events.service';
import { VolunteersService } from '../../services/volunteers.service';
import { ZonesService } from '../../services/zones.service';
import { Volunteer } from '../../volunteers/volunteer';
import { Zone } from '../../zones/zone';
import { AddEventComponent } from '../add-event/add-event.component';
import { Event } from '../event';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent {
  @Input() public event!: Event;
  public zones!: Zone[];
  public volunteers!: Volunteer[];
  public volunteersInput!: string;
  public selectedVolunteerIds: string[] = [];
  public selectedZoneId!: string;
  @ViewChild('zoneSelectInput') zoneInput!: ElementRef<HTMLSelectElement>;
  @ViewChild('startingHourInput') beginingdateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endingHourInput') endingdateInput!: ElementRef<HTMLInputElement>;

  constructor(
    private volunteerService: VolunteersService,
    private zoneService: ZonesService,
    private eventService: EventsService,
    public dialogRef: MatDialogRef<AddEventComponent>
    ) {}

  ngOnInit(): void {
    this.volunteerService.getVolunteers().subscribe(res => {
      this.volunteers = res as Volunteer[];
    })
    this.zoneService.getZones().subscribe(res => {
      this.zones = res as Zone[];
    })
    this.event.benevoles.forEach(benevole => {
      this.selectedVolunteerIds.push(benevole._id);
    });
    this.selectedZoneId = this.event.zone._id;

    console.log(this.event);
    
  }

  public onVolunteerSelected(event: any) {
    const selectedVolunteer = this.volunteers.find(volunteer => volunteer.nom + " " + volunteer.prenom === event.target.value);
    if (selectedVolunteer && !this.selectedVolunteerIds.includes(selectedVolunteer._id)) {
      this.selectedVolunteerIds.push(selectedVolunteer._id);
    }
    event.target.value = '';
  }

  public getVolunteerById(volunteerId: string): Volunteer | undefined {
    return this.volunteers.find(volunteer => volunteer._id === volunteerId);
  }
  
  public removeVolunteer(volunteerId: string) {
    const index = this.selectedVolunteerIds.indexOf(volunteerId);
    if (index >= 0) {
      this.selectedVolunteerIds.splice(index, 1);
    }
  }
  

  public onSubmit(): void {
    // create an array of Game objects from the selected game ids
    const selectedVolunteers = this.selectedVolunteerIds.map(id => {
      const volunteer = this.volunteers.find(volunteer => volunteer._id === id);
      return volunteer ? {...volunteer} : null;
    }).filter(volunteer => volunteer !== null);
  
    let volunteersToAdd: Volunteer[] = [];
    selectedVolunteers.forEach(volunteer => {
      volunteersToAdd.push(new Volunteer(volunteer!._id, volunteer!.prenom, volunteer!.nom, volunteer!.email));
    });
    // assign the new array to the event's benevole property
    this.event.benevoles = volunteersToAdd;
    this.event.zone = this.zones.find(zone => zone._id === this.zoneInput.nativeElement.value)!;

    this.event.beginingdate = new Date(this.beginingdateInput.nativeElement.value);
    this.event.endingdate = new Date(this.endingdateInput.nativeElement.value);

    // call the createZone method to save the changes
    this.eventService.createEvent(this.event).subscribe(res => {
      console.log('Event updated successfully!');
      this.dialogRef.close();
    });
  }
}
