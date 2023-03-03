import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventsService } from '../services/events.service';
import { AddEventComponent } from './add-event/add-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  public events : Event[] = [];

  constructor(
    private eventService: EventsService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res => {
      this.events = res as Event[];
    });
  }

  public removeEvent(event: Event) : void {
    // this.eventService.deleteEvent(event._id).subscribe();
    this.events.splice(this.events.indexOf(event), 1);
  }

  public getFormattedVolunteerListForZone(event: Event): string {
    return event.benevoles.map(benevole => benevole.nom + " " + benevole.prenom).join(' - ');
  }

  public editEvent(event: Event) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = { event };
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = {
      left: 'calc(50% - 250px)',
      top: 'calc(30% - 250px)',
      transform: 'translate(-50%, -50%)'
    } as DialogPosition;
    const dialogRef = this.dialog.open(EditEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      // refresh the current page
      this.location.replaceState(this.router.url);
      window.location.reload();
    });
  }

  public createEvent(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = {
      left: 'calc(50% - 250px)',
      top: 'calc(30% - 250px)',
      transform: 'translate(-50%, -50%)'
    } as DialogPosition;
    const dialogRef = this.dialog.open(AddEventComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      // refresh the current page
      this.location.replaceState(this.router.url);
      window.location.reload();
    });
    
  }
}
