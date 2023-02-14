import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesService } from './services/games.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { VolunteersComponent } from './volunteers/volunteers.component'
import { VolunteersService } from './services/volunteers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AffectationsComponent } from './affectations/affectations.component';
import { AffectationsService } from './services/affectations.service';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    VolunteersComponent,
    AffectationsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
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
        path: 'affectations',
        component: AffectationsComponent
      },
    ])
  ],
  providers: [GamesService, VolunteersService, AffectationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
