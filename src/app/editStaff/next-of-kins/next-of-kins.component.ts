import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, EditEmploymentModel, EditNextOfKingsModel } from '../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-next-of-kins',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './next-of-kins.component.html',
  styleUrl: './next-of-kins.component.scss'
})
export class NextOfKinsComponent implements OnInit {

  nextOfKinsData: any = {}
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false
   isAPILoading = false

   originalData: any
   editMode = false;

  constructor( private typingStatusService: CheckboxService, private router:Router, private location:Location, private pagesService:PagesService, 
    private route:ActivatedRoute, private notification: NzNotificationService){
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



    createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000})
  }



     fetchNextOfKinData() {
      this.isAPILoading =true
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.nextOfKinsData = res; 
        console.log('Fetched staff data:', this.nextOfKinsData);
         this.isAPILoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
        this.isAPILoading =false
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





  // Submit(form: NgForm) {
  //   this.isLoading = true;
  
  // const payload: Partial<EditEmploymentModel> = {
  //   _id: this.staffId,
  //   nextOfKinFullName: form.value.nextOfKinFullName,
  //   nextOfKinRelationship: form.value.nextOfKinRelationship, 
  //   nextOfKinPhoneNumber: form.value.nextOfKinPhoneNumber,
  //   nextOfKinEmail: form.value.nextOfKinEmail,
  //   nextOfKinCurrentAddress: form.value.nextOfKinCurrentAddress, 
  
  //   };
  
  //   console.log('PATCH payload:', payload);
  //   console.log('Unit being sent:', form.value.unitId);
  // console.log('Supervisor being sent:', form.value.supervisorId);
  
  
  //   this.pagesService.patchEmployment(this.staffId, payload).subscribe({
  //     next: (res) => {
  //       console.log('Success:', res);
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error:', err);
  //       alert('Update failed');
  //       this.isLoading = false;
  //     }
  //   });
  // }




  Submit(form: NgForm) {
  if (form.invalid) return;

  this.isLoading = true;

  const payload: Partial<EditNextOfKingsModel> = {
    _id: this.staffId,
    nextOfKinFullName: form.value.nextOfKinFullName,
    nextOfKinRelationship: form.value.nextOfKinRelationship,
    nextOfKinPhoneNumber: form.value.nextOfKinPhoneNumber,
    nextOfKinEmail: form.value.nextOfKinEmail,
    nextOfKinCurrentAddress: form.value.nextOfKinCurrentAddress,

  };

  console.log('📦 PATCH payload:', payload);
  console.log('Supervisor ID being sent:', form.value.supervisorId);
  console.log('Unit ID being sent:', form.value.unitId);

  this.pagesService.patchEmployment(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('Employment details updated:', res);
      this.createNotification('topRight', "success", "update Successful!!", "Updated!")
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Employment update failed.');
      this.isLoading = false;
    }
  });
}


}