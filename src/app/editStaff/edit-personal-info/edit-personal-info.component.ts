import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-personal-info',
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-personal-info.component.html',
  styleUrl: './edit-personal-info.component.scss'
})
export class EditPersonalInfoComponent {

  constructor(private router:Router, private location: Location){

  }



  onSubmit(form: NgForm){}

  //  goBack(){
  //   this.router.navigate(['edit-personal-info'])
  // }

}
