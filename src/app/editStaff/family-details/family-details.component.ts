import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';

@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent implements OnInit {

  data: any = {}
   getAllStaff: allStaffModel;
   staffId: any

  constructor(private router:Router, private location:Location, private pagesService:PagesService,
    private checkboxService:CheckboxService, private staffDataService:StaffDataService, private route:ActivatedRoute ){

      this.getAllStaff = new allStaffModel()
    }

  ngOnInit(): void {

     this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);
     })

    // if (this.staffId) {
    //   this.fetchEmployees(); 
    // }
    this.fetchFamiltDetails();
  

    this.data = this.staffDataService.getData();
     }

     goBack(){
    this.location.back()
  }


    fetchFamiltDetails() {
    this.pagesService.getAllStaff(this.staffId, this.getAllStaff).subscribe({
      next: (res) => {
        const employee = res.data.find((staff: any) => staff._id === this.staffId);
        if (employee) {
          this.staffDataService.setData(employee); // 🔥 Save globally
          this.data = employee;            // 💾 Local assignment
          console.log('Matched Employee:', this.data);
        } else {
        // console.warn('No matching employee found for staffId:', this.staffId);
        }
      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
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
