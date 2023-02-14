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
      this.games = res as Game[];
    })
  }

  public onSubmit(): void {
    const gameName = this.newGameForm.value.nom;
    const gameType = this.newGameForm.value.type;
    if (gameName != null && gameType != null) {
      const gameToAdd = { _id: "", nom: gameName, type: gameType };
      this.gamesService.createGame(gameToAdd).subscribe(res => {
        this.games.push(res as Game);
      })
    }
    this.newGameForm.reset();
  }


  public saveGame(game: Game) : void {
    const nomInput = document.getElementById("gameName") as HTMLInputElement;
    const typeInput = document.getElementById("gameType") as HTMLInputElement;
    if (!typeInput.value) {
      typeInput.value = typeInput.placeholder;
    }
    const editedGame = { _id: game._id, nom: nomInput.value, type: typeInput.value };
    this.gamesService.editGame(game._id, editedGame).subscribe();
    this.games[this.games.indexOf(game)] = editedGame;
  }

  public removeGame(game: Game) : void {
    this.gamesService.deleteGame(game._id).subscribe();
    this.games.splice(this.games.indexOf(game), 1);
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
