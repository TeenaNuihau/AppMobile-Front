import { Component } from '@angular/core';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent {
  public games : {name: string, type: string, zone: string}[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "name";
  public isDesc: boolean = false;

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

  /*
  public sortTable(n: number) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable") as HTMLTableElement;
    switching = true;
    dir = "asc";
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          this.isNameDesc = false;
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          this.isNameDesc = true;
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        let parentNode = rows[i].parentNode as HTMLTableElement;
        parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }
  */

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
