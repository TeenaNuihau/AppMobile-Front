import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { VolunteersService } from '../services/volunteers.service';
import { Volunteer } from './volunteer';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css'],
})
export class VolunteersComponent {
  public volunteers : Volunteer[] = [];
  public enableEdit : boolean = false;
  public enableEditIndex : number | null = null;
  public column: string = "prenom";
  public isDesc: boolean = false;
  newVolunteerForm = this.fb.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor (private volunteersService : VolunteersService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getVolonteersList();
  }

  public getVolonteersList() {
    this.volunteersService.getVolunteers().subscribe(res => {
      this.volunteers = res as Volunteer[];
    })
  }

  public onSubmit(): void {
    const volunteerprenom = this.newVolunteerForm.value.prenom;
    const volunteernom = this.newVolunteerForm.value.nom;
    const volunteerEmail = this.newVolunteerForm.value.email; 
    if (volunteerprenom != null && volunteernom != null && volunteerEmail != null) {
      const volunteerToAdd = { _id: "", prenom: volunteerprenom, nom: volunteernom, email: volunteerEmail };
      this.volunteersService.createVolunteer(volunteerToAdd).subscribe(res => {
        this.volunteers.push(res as Volunteer);
      })
    }
    this.newVolunteerForm.reset();
  }

  public saveVolunteer(volunteer: Volunteer) : void {
    const prenomInput = document.getElementById("volunteerPrenom") as HTMLInputElement;
    const nomInput = document.getElementById("volunteerNom") as HTMLInputElement;
    const emailInput = document.getElementById("volunteerEmail") as HTMLInputElement;
    const editedVolunteer = new Volunteer(volunteer._id, prenomInput.value, nomInput.value, emailInput.value);
    this.volunteersService.editVolunteer(volunteer._id, editedVolunteer).subscribe();
    this.volunteers[this.volunteers.indexOf(volunteer)] = editedVolunteer;
  }

  public removeVolunteer(volunteer: Volunteer) : void {
    this.volunteersService.deleteVolunteer(volunteer._id).subscribe();
    this.volunteers.splice(this.volunteers.indexOf(volunteer), 1);
  }

  public enableEditMethod(i: number) {
    this.enableEditIndex = i;
    this.enableEdit = true;
  }

  
  public sort(property: string) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    if ( property == "prenom" || property == "nom")
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

  public formNotValid() {
    const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$");
    return this.newVolunteerForm.value.prenom === '' || this.newVolunteerForm.value.nom === '' || !emailRegex.test(this.newVolunteerForm.value.email!)
  }
}
