import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GamesService } from '../services/games.service';
import { Game } from './game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  public games : Game[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "nom";
  public isDesc: boolean = false;
  newGameForm = this.fb.group({
    nom: ['', Validators.required],
    type: ['', Validators.required],
  });

  constructor (private gamesService : GamesService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getGamesList();
  }

  public getGamesList() {
    this.gamesService.getGames().subscribe(res => {
      this.games = res as {nom: string, type: string}[];
    })
  }

  public onSubmit(): void {
    const gameName = this.newGameForm.value.nom;
    const gameType = this.newGameForm.value.type;
    if (gameName != null && gameType != null) {
      const gameToAdd = { nom: gameName, type: gameType };
      this.games.push(gameToAdd);
    }
    this.newGameForm.reset();
  }


  public saveGame(i: number) : void {
    const nomInput = document.getElementById("gameName") as HTMLInputElement;
    const typeInput = document.getElementById("gameType") as HTMLInputElement;
    if (!typeInput.value) {
      typeInput.value = typeInput.placeholder;
    }
    const editedGame = { nom: nomInput.value, type: typeInput.value };
    this.games[i] = editedGame;
  }

  public removeGame(i: number) : void {
    this.games.splice(i, 1);
  }

  public enableEditMethod(i: number) {
    this.enableEditIndex = i;
    this.enableEdit = true;
  }

  public sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    if ( property == "nom" || property == "type")
    this.games.sort(function(a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
