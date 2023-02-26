import { Component } from '@angular/core';
import { Game } from '../games/game';
import { EventsService } from '../services/events.service';
import { Event } from './event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  public events : Event[] = [];

  constructor(
    private eventService: EventsService
  ) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(res => {
      this.events = res as Event[];
    });
  }

  public removeEvent(event: Event) : void {
    this.eventService.deleteEvent(event._id).subscribe();
    this.events.splice(this.events.indexOf(event), 1);
  }

  public getFormattedVolunteerListForZone(event: Event): string {
    return event.benevoles.map(benevole => benevole.nom + " " + benevole.prenom).join(' - ');
  }
}
