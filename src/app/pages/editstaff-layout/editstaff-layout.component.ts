import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editstaff-layout',
  imports: [RouterModule, CommonModule],
  templateUrl: './editstaff-layout.component.html',
  styleUrl: './editstaff-layout.component.scss'
})
export class EditstaffLayoutComponent {
 

  constructor(private location:Location){}

  goBack(){
    this.location.back()
  }

}
