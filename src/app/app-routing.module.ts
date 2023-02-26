import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { EventsComponent } from './events/events.component';
import { ZonesComponent } from './zones/zones.component';
import { AddEditZoneComponent } from './zones/add-edit-zone/add-edit-zone.component';

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
  },
  {
    path: 'events',
    component: EventsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
