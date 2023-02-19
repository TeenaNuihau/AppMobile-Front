import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from '../../games/game';
import { GamesService } from '../../services/games.service';
import { ZonesService } from '../../services/zones.service';
import { Zone } from '../zone';

@Component({
  selector: 'app-zone-form',
  template: './add-edit-zone.component.html',
  styleUrls: ['./add-edit-zone.component.css']
})
export class AddEditZoneComponent {
  zoneForm = this.fb.group({
    name: ['', Validators.required],
    games: this.fb.array([]),
    gameName: '',
  });
  public list: string[] = [];
  public selectedZone: string | undefined;

  constructor(private fb: FormBuilder, private zonesService: ZonesService, private gamesService: GamesService) {
    
  }

  public onSubmit(): void {
    const zoneName = this.zoneForm.value.name;
    const zoneGames: Game[] = [];
    if (zoneName != null) {
      this.list.forEach(gameId => {
        this.gamesService.getGame(gameId).subscribe(res => {
          zoneGames.push(res as Game);
        })
      });
      const newZone = { _id: "", nom: zoneName, games: zoneGames };
      this.zonesService.createZone(newZone).subscribe();
    }
    this.zoneForm.reset();
    this.list = [];
  }

  public addToList() {
    if (this.selectedZone && !this.list.includes(this.selectedZone)) {
      this.list.push(this.selectedZone);
      this.zoneForm.patchValue({ gameName: '' });
    }
  }
  
  public removeGame(game: string) {
    this.list.splice(this.list.indexOf(game), 1);
  }
}
