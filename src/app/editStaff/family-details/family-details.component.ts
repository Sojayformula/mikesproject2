import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent implements OnInit {

  data: any={}

  constructor(private router:Router, private location:Location, private checkboxService:CheckboxService, private staffDataService:StaffDataService ){}

  ngOnInit(): void {
    this.data = this.staffDataService.getData();
  }

     goBack(){
    this.location.back()
  }

    onInputChange(field: string, value: string) {
    this.data[field] = value;
    this.staffDataService.setData({ [field]: value });

    // If there's any value typed, mark this step as "typed"
    const isTyping = Object.values(this.data).some(val => val && val.toString().trim().length > 0);
    this.checkboxService.setTypingStatus('person-information', isTyping);
  }

  onSubmit(form: NgForm){}

}
