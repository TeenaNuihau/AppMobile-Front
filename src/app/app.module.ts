import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesService } from './services/games.service';
import { VolunteersService } from './services/volunteers.service';
import { EventsService } from './services/events.service';
import { ZonesService } from './services/zones.service';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { EventsComponent } from './events/events.component';
import { ZonesComponent } from './zones/zones.component';
import { AddEditZoneComponent } from './zones/add-edit-zone/add-edit-zone.component';
import { AddEditEventComponent } from './events/add-edit-event/add-edit-event.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AddZoneComponent } from './zones/add-zone/add-zone.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    VolunteersComponent,
    EventsComponent,
    ZonesComponent,
    AddEditZoneComponent,
    AddEditEventComponent,
    AddZoneComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [GamesService, VolunteersService, EventsService, ZonesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
