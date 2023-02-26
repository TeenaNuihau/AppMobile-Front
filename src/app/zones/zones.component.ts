import { Component, OnInit } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ZonesService } from '../services/zones.service';
import { AddEditZoneComponent } from './add-edit-zone/add-edit-zone.component';
import { Zone } from './zone';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  public zones : Zone[] = [];
  public selectedZone: Zone | null = null;

  constructor(
    private zonesService: ZonesService,
    private dialog: MatDialog
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

  public getFormattedGameListForZone(zone: Zone): string {
    return zone.jeux.map(jeu => jeu.nom).join(' - ');
  }

  public editZone(zone: Zone): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    dialogConfig.data = { zone };
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.position = {
      left: 'calc(50% - 250px)',
      top: 'calc(30% - 250px)',
      transform: 'translate(-50%, -50%)'
    } as DialogPosition;
    this.dialog.open(AddEditZoneComponent, dialogConfig);
  }
  
}
