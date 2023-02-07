import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AffectationsService } from '../services/affectations.service';
import { GamesService } from '../services/games.service';
import { VolunteersService } from '../services/volunteers.service';

@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.css']
})
export class AffectationsComponent {
  public affectations : {zone: string, date: string, start: string, end: string, game: string, volunteers: string[]}[] = [];
  public games : {name: string, type: string, zone: string, date: string, start: string, end: string}[] = [];
  public volunteers : {firstname: string, lastname: string, email: string}[] = [];
  affectationForm = this.fb.group({
    zone: ['', Validators.required],
    date: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    game: ['', Validators.required],
    volunteers: ['', Validators.required],
  });

  constructor (
    private affectationsService : AffectationsService,
    private gamesService : GamesService, 
    private volunteersService : VolunteersService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.affectations = this.affectationsService.getAffectations();
    this.games = this.gamesService.getGames();
    this.volunteers = this.volunteersService.getVolunteers();
  }

  public onSubmit(): void {
    const affectationZone = this.affectationForm.value.zone;
    const affectationDate = this.affectationForm.value.date;
    const affectationStart = this.affectationForm.value.start;
    const affectationEnd = this.affectationForm.value.end;
    const affectationGame = this.affectationForm.value.game;
    if (this.affectationForm.value.volunteers != null) {
      const affectationVolunteers = [this.affectationForm.value.volunteers];
      if (affectationZone != null && affectationDate != null && affectationStart != null && affectationEnd != null && affectationGame != null) {
        const affectationToAdd = {zone: affectationZone, date: affectationDate, start: affectationStart, end: affectationEnd, game: affectationGame, volunteers: affectationVolunteers};
        this.affectations.push(affectationToAdd);
      }
      this.affectationForm.reset();
    }
  }
}
