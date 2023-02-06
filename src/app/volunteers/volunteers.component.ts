import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  newVolunteerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor (private volunteersService : VolunteersService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.volunteers = this.volunteersService.getVolunteers();
  }

  public onSubmit(): void {
    const volunteerFirstname = this.newVolunteerForm.value.firstName;
    const volunteerLastname = this.newVolunteerForm.value.lastName;
    const volunteerEmail = this.newVolunteerForm.value.email;
    if (volunteerFirstname != null && volunteerLastname != null && volunteerEmail != null) {
      const volunteerToAdd = { firstname: volunteerFirstname, lastname: volunteerLastname, email: volunteerEmail };
      this.volunteers.push(volunteerToAdd);
    }
    this.newVolunteerForm.reset();
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
