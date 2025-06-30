import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, EditEmploymentModel } from '../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';

@Component({
  selector: 'app-next-of-kins',
  imports: [FormsModule, CommonModule],
  templateUrl: './next-of-kins.component.html',
  styleUrl: './next-of-kins.component.scss'
})
export class NextOfKinsComponent implements OnInit {

  nextOfKinsData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

   originalData: any
   editMode = false;

  constructor( private typingStatusService: CheckboxService, private router:Router, private location:Location, private pagesService:PagesService, private route:ActivatedRoute){
    this.getAllStaff = new allStaffModel
  }


  ngOnInit() {
  //     const item = this.route.snapshot.queryParamMap.get('staffId');
  // this.staffId = item; 

  // //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
  //   console.log("my id:", JSON.parse(JSON.stringify(item)))

   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

  });

    this.fetchNextOfKinData()
    
  }



     fetchNextOfKinData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.nextOfKinsData = res; 
        console.log('Fetched staff data:', this.nextOfKinsData);
         this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }
 
  

     goBack(){
    this.location.back()
  }


    onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // This line sets the typing status for this step
   this.typingStatusService.setTypingStatus('next-of-kins', value.trim().length > 0);

  }

  
//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.nextOfKinsData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.nextOfKinsData = JSON.parse(JSON.stringify(this.originalData)); // restore
}

  Submit(form: NgForm) {
    this.isLoading = true;
  
  const payload: Partial<EditEmploymentModel> = {
    _id: this.staffId,
    employmentType: form.value.employmentType,
    jobTitle: form.value.jobTitle,
    unit: [form.value.unitId], 
    hireDate: form.value.hireDate,
    workLocation: form.value.workLocation,
    supervisor: [form.value.supervisorId], 
    educationDetails: []
  
    };
  
    console.log('PATCH payload:', payload);
    console.log('Unit being sent:', form.value.unitId);
  console.log('Supervisor being sent:', form.value.supervisorId);
  
  
    this.pagesService.patchEmployment(this.staffId, payload).subscribe({
      next: (res) => {
        console.log('Success:', res);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Update failed');
        this.isLoading = false;
      }
    });
  }

}