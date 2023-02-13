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
  public games : {nom: string, type: string}[] = [];
  public volunteers : {prenom: string, nom: string, email: string}[] = [];
  public affectationForm = this.fb.group({
    zone: ['', Validators.required],
    date: ['', Validators.required],
    start: ['', Validators.required],
    end: ['', Validators.required],
    game: ['', Validators.required],
    volunteers: [''],
  });
  public selectedVolunteer: string | undefined;
  public list: string[] = [];

  constructor (
    private affectationsService : AffectationsService,
    private gamesService : GamesService, 
    private volunteersService : VolunteersService,
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.affectations = this.affectationsService.getAffectations();
    this.gamesService.getGames().subscribe(res => {
      this.games = res as {nom: string, type: string}[];
    })
    this.volunteersService.getVolunteers().subscribe(res => {
      this.volunteers = res as {prenom: string, nom: string, email: string}[];
    })
  }

  public addToList() {
    if (this.selectedVolunteer && !this.list.includes(this.selectedVolunteer)) {
      this.list.push(this.selectedVolunteer);
      console.log(this.affectationForm.valid);
      
    }
  }
  
  public removeVolunteer(volunteer: string) {
    this.list.splice(this.list.indexOf(volunteer), 1);
  }

  public onSubmit(): void {
    const affectationZone = this.affectationForm.value.zone;
    const affectationDate = this.affectationForm.value.date;
    const affectationStart = this.affectationForm.value.start;
    const affectationEnd = this.affectationForm.value.end;
    const affectationGame = this.affectationForm.value.game;
    if (affectationZone != null && affectationDate != null && affectationStart != null && affectationEnd != null && affectationGame != null) {
      const affectationToAdd = {zone: affectationZone, date: affectationDate, start: affectationStart, end: affectationEnd, game: affectationGame, volunteers: this.list};
      this.affectations.push(affectationToAdd);
    }
    this.affectationForm.reset();
    document.getElementById("submitButton")?.setAttribute("disabled", "true");
    this.list = [];
  }
  
}
