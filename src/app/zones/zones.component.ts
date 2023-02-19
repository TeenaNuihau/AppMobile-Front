import { Component } from '@angular/core';
import { Game } from '../games/game';
import { ZonesService } from '../services/zones.service';
import { Zone } from './zone';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent {
  public zones : Zone[] = [];

  constructor(
    private zonesService: ZonesService
  ) {}

  ngOnInit(): void {
    this.zonesService.getZones().subscribe(res => {
      this.zones = res as Zone[];
    });
  }

  public removeZone(zone: Zone) : void {
    this.zonesService.deleteZone(zone._id).subscribe();
    this.zones.splice(this.zones.indexOf(zone), 1);
  }

  public get formattedGameList(): string {
    return this.zones.map(zone => zone.jeux.map(jeu => jeu.nom).join(' - ')).join('\n');
  }
}
