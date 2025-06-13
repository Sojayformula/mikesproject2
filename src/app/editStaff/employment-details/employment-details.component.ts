import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';


@Component({
  selector: 'app-employment-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './employment-details.component.html',
  styleUrl: './employment-details.component.scss'
})
export class EmploymentDetailsComponent implements OnInit{
    
    // employeeData: any[]=[];
    // employeeData: any = null;
    employeeData: any = { 
  //         unit: { name: '' },
  // employmentType: '',
  // hireDate: '',
  // workLocation: '',
  // supervisor: ''
    }
    currentStep = 0;
    getAllStaff: allStaffModel;
     staffId: any
     selectedEmployee: string =''
     selectedStep: string = '';

    

 

   constructor( private staffDataService: StaffDataService, private router: Router, private location:Location, private route:ActivatedRoute, 
    private typingStatusService: CheckboxService, private pagesService: PagesService){

      this.getAllStaff = new allStaffModel()

   }


   ngOnInit(): void {

   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

    // if (this.staffId) {
    //   this.fetchEmployees(); 
    // }
     this.fetchEmployees();
  });

   }


  //  fetchEmployees(){
  //   console.log('fetched data', this.getAllStaff)
  //   this.pagesService.getAllStaff(this.getAllStaff).subscribe({
  //   next: (res) => {
  //     this.employeeData = res.data;
  //     console.log('Api response', res)

  //   },

  //   error:(err)=>{
  //     console.log('Failed to fetch data', err)
  //   }
  //   })
  //  }

  fetchEmployees() {
    this.pagesService.getAllStaff(this.getAllStaff).subscribe({
      next: (res) => {
        const employee = res.data.find((staff: any) => staff._id === this.staffId);
        if (employee) {
          this.staffDataService.setData(employee); // 🔥 Save globally
          this.employeeData = employee;            // 💾 Local assignment
          console.log('Matched Employee:', this.employeeData);
        } else {
        // console.warn('No matching employee found for staffId:', this.staffId);
        }
      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
  }


    goBack(){
    this.location.back()
  }

  onSubmit(form:NgForm){}

  

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // ✅ This line sets the typing status for this step
    this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
  }

// onInputChange(event: Event) {
//   const input = event.target as HTMLInputElement;
//   const value = input.value;
//   this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
// }



}






//   const data = this.staffDataService.getData();
  // if (data) {
  //   this.employeeData = data;
  //   console.log('✅ Received data in child:', this.employeeData);
  // } else {
  //   console.warn('⚠️ No staff data found in service');
  // }
  //   // this.fetchEmployees();
  //     if (this.staffId) {
  //   this.fetchEmployees();
  // } else {
  //   console.warn('staffId is not set!');
  // }

