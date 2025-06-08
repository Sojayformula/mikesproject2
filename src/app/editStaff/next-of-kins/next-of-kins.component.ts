import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-of-kins',
  imports: [],
  templateUrl: './next-of-kins.component.html',
  styleUrl: './next-of-kins.component.scss'
})
export class NextOfKinsComponent {

  constructor(private router:Router, private location:Location){}

     goBack(){
    this.location.back()
  }

}
