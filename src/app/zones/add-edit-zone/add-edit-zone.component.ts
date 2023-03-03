import { Component, Inject, Input } from '@angular/core';
import { Zone } from '../zone';
import { ZonesService } from '../../services/zones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Game } from '../../games/game';
import { GamesService } from '../../services/games.service';

export interface DialogData {
  zoneId: string;
}
export interface ZoneDialogData extends DialogData {
  zone: Zone;
}

@Component({
  selector: 'app-add-edit-zone',
  templateUrl: './add-edit-zone.component.html',
  styleUrls: ['./add-edit-zone.component.css']
})
export class AddEditZoneComponent {
  @Input() zone!: Zone;
  public games!: Game[];
  public gamesInput!: string;
  public selectedGameIds: string[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ZoneDialogData,
    private gameService: GamesService,
    private zoneService: ZonesService,
    public dialogRef: MatDialogRef<AddEditZoneComponent>
    ) {}

  ngOnInit(): void {
    // Retrieve the zone object from the data object
    this.zone = this.data.zone;
    this.gameService.getGames().subscribe(res => {
      this.games = res as Game[];
    })
    this.zone.jeux.forEach(jeu => {
      this.selectedGameIds.push(jeu._id);
    });
  }

  public onGameSelected(event: any) {
    const selectedGame = this.games.find(game => game.nom === event.target.value);
    if (selectedGame && !this.selectedGameIds.includes(selectedGame._id)) {
      this.selectedGameIds.push(selectedGame._id);
    }
    event.target.value = '';
  }

  public getGameById(gameId: string): Game | undefined {
    return this.games.find(game => game._id === gameId);
  }
  
  public removeGame(gameId: string) {
    const index = this.selectedGameIds.indexOf(gameId);
    if (index >= 0) {
      this.selectedGameIds.splice(index, 1);
    }
  }
  

  public onSubmit(): void {
    // create an array of Game objects from the selected game ids
    const selectedGames = this.selectedGameIds.map(id => {
      const game = this.games.find(game => game._id === id);
      return game ? {...game} : null;
    }).filter(game => game !== null);
  
    let gamesToAdd: Game[] = [];
    selectedGames.forEach(game => {
      gamesToAdd.push(new Game(game!._id, game!.nom, game!.type));
    });
    // assign the new array to the zone's jeux property
    this.zone.jeux = gamesToAdd;
  
    // call the editZone method to save the changes
    this.zoneService.editZone(this.zone._id, this.zone).subscribe(res => {
      console.log('Zone updated successfully!');
      this.dialogRef.close();
    });
  }
  
}
