import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Game } from '../../games/game';
import { GamesService } from '../../services/games.service';
import { ZonesService } from '../../services/zones.service';
import { Zone } from '../zone';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.css']
})
export class AddZoneComponent {
  public zone: Zone = new Zone("", "", []);
  public games!: Game[];
  public gamesInput!: string;
  public selectedGameIds: string[] = [];
  @ViewChild('nomInput') nomInput!: ElementRef<HTMLInputElement>;

  constructor(
    private gameService: GamesService,
    private zoneService: ZonesService,
    public dialogRef: MatDialogRef<AddZoneComponent>
    ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe(res => {
      this.games = res as Game[];
    })
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
    this.zone.nom = this.nomInput.nativeElement.value;

    // call the createZone method to save the changes
    this.zoneService.createZone(this.zone).subscribe(res => {
      console.log('Zone created successfully!');
      this.dialogRef.close();
    });
  }
  
}
