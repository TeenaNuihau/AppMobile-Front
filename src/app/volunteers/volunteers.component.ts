import { Component } from '@angular/core';
import { VolunteersService } from '../services/volunteers.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})
export class VolunteersComponent {
  public volunteers : {firstname: string, lastname: string, email: string}[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "firstname";
  public isDesc: boolean = false;

  constructor (private volunteersService : VolunteersService) {
  }

  ngOnInit() {
    this.volunteers = this.volunteersService.getVolunteers();
  }

  public saveVolunteer(i: number) : void {
    const firstnameInput = document.getElementById("volunteerFirstname") as HTMLInputElement;
    const lastnameInput = document.getElementById("volunteerLastname") as HTMLInputElement;
    const emailInput = document.getElementById("volunteerEmail") as HTMLInputElement;
    const editedVolunteer = { firstname: firstnameInput.value, lastname: lastnameInput.value, email: emailInput.value };
    this.volunteers[i] = editedVolunteer;
  }

  public removeVolunteer(i: number) : void {
    this.volunteers.splice(i, 1);
  }

  public enableEditMethod(i: number) {
    this.enableEditIndex = i;
    this.enableEdit = true;
  }

  public sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    if ( property == "firstname" || property == "lastname")
    this.volunteers.sort(function(a, b) {
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
