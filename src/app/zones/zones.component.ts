import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Game } from '../games/game';
import { GamesService } from '../services/games.service';
import { ZonesService } from '../services/zones.service';
import { Zone } from './zone';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent {
  public zones : Zone[] = [];
  public games : Game[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "nom";
  public isDesc: boolean = false;
  form = this.fb.group({
    nom: ['', Validators.required],
    games: [''],
  });
  public list: string[] = [];
  public selectedZone: string | undefined;

  constructor(
    private gamesService : GamesService,
    private zonesService: ZonesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.gamesService.getGames().subscribe(res => {
      this.games = res as Game[];
    });
    this.zonesService.getZones().subscribe(res => {
      this.zones = res as Zone[];
    });
  }

  public addToList() {
    if (this.selectedZone && !this.list.includes(this.selectedZone)) {
      this.list.push(this.selectedZone);
    }
  }
  
  public removeGame(game: string) {
    this.list.splice(this.list.indexOf(game), 1);
  }

  public onSubmit(): void {
    const zoneName = this.form.value.nom;
    const zoneGames: Zone[] = [];
    if (zoneName != null) {
      this.list.forEach(gameId => {
        this.zonesService.getZone(gameId).subscribe(res => {
          zoneGames.push(res as Zone);
        })
      });
      const newZone = { _id: "", nom: zoneName, games: zoneGames };
      this.zonesService.createZone(newZone).subscribe();
    }
    this.form.reset();
  }

  public saveZone(zone: Zone) : void {
    const nomInput = document.getElementById("zoneNom") as HTMLInputElement;
    const gamesInput = document.getElementById("zoneGames") as HTMLInputElement;
    /*
    const editedZone = new Zone(zone._id, nomInput.value, gamesInput.value);
    this.zonesService.editZone(zone._id, editedZone).subscribe();
    this.zones[this.zones.indexOf(zone)] = editedZone;
    */
  }

  public removeZone(zone: Zone) : void {
    this.zonesService.deleteZone(zone._id).subscribe();
    this.zones.splice(this.zones.indexOf(zone), 1);
  }

  public enableEditMethod(i: number) {
    this.enableEditIndex = i;
    this.enableEdit = true;
  }

  
  public sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    if (property == "nom")
    this.zones.sort(function(a, b) {
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
