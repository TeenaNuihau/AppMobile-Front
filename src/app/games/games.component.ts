import { Component } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  public games : {name: String, type: String, zone: String}[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;

  constructor (private gamesService : GamesService) {
  }

  ngOnInit() {
    this.games = this.gamesService.getGames();
  }

  public saveGame(i: number) : void {
    const nameInput = document.getElementById("gameName") as HTMLInputElement;
    const typeInput = document.getElementById("gameType") as HTMLInputElement;
    const zoneInput = document.getElementById("gameZone") as HTMLInputElement;
    const editedGame = { name: nameInput.value, type: typeInput.value, zone: zoneInput.value };
    this.games[i] = editedGame;
  }

  public removeGame(i: number) : void {
    this.games.splice(i, 1);
  }

  public enableEditMethod(i: number) {
    this.enableEditIndex = i;
    this.enableEdit = true;
  }
}
