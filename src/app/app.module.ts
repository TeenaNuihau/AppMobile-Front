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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GamesComponent,
    VolunteersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
      }
    ])
  ],
  providers: [GamesService, VolunteersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
