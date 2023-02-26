import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { EventsComponent } from './events/events.component';
import { ZonesComponent } from './zones/zones.component';
import { AddEditZoneComponent } from './zones/add-edit-zone/add-edit-zone.component';
import { AddEditEventComponent } from './events/add-edit-event/add-edit-event.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'games', 
    component: GamesComponent 
  },
  { 
    path: 'volunteers', 
    component: VolunteersComponent 
  },
  { 
    path: 'events', 
    component: EventsComponent 
  },
  {
    path: 'zones',
    component: ZonesComponent,
    children: [
      { 
        path: 'add-edit-zone/:id', 
        component: AddEditZoneComponent 
      },
      { 
        path: 'add-edit-zone', 
        component: AddEditZoneComponent 
      },
    ],
  },
  {
    path: 'events',
    component: EventsComponent,
    children: [
      { 
        path: 'add-edit-event', 
        component: AddEditEventComponent 
      },
      { 
        path: 'add-edit-event/:id', 
        component: AddEditEventComponent 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
