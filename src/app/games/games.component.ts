import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GamesService } from '../services/games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  public games : {name: string, type: string, zone: string, date: string, start: string, end: string}[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "name";
  public isDesc: boolean = false;
  newGameForm = this.fb.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
  });

  constructor (private gamesService : GamesService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.games = this.gamesService.getGames();
  }

  public onSubmit(): void {
    const gameName = this.newGameForm.value.name;
    const gameType = this.newGameForm.value.type;
    if (gameName != null && gameType != null) {
      const gameToAdd = { name: gameName, type: gameType, zone: '', date: '', start: '', end: '' };
      this.games.push(gameToAdd);
    }
    this.newGameForm.reset();
  }


  public saveGame(i: number) : void {
    const nameInput = document.getElementById("gameName") as HTMLInputElement;
    const typeInput = document.getElementById("gameType") as HTMLInputElement;
    if (!typeInput.value) {
      typeInput.value = typeInput.placeholder;
    }
    const zoneInput = document.getElementById("gameZone") as HTMLInputElement;
    if (!zoneInput.value) {
      zoneInput.value = zoneInput.placeholder;
    }
    const dateInput = document.getElementById("gameDate") as HTMLInputElement;
    const startInput = document.getElementById("gameStart") as HTMLInputElement;
    const endInput = document.getElementById("gameEnd") as HTMLInputElement;
    const editedGame = { name: nameInput.value, type: typeInput.value, zone: zoneInput.value, date: dateInput.value, start: startInput.value, end: endInput.value };
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
    if ( property == "name" || property == "type" || property == "zone")
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
