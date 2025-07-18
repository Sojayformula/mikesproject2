import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { allStaffModel, EditEmmergencyModel, EditEmploymentModel } from '../../model/pagesModel';
import { PagesService } from '../../service/pages.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-emengency-contact',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './emengencycontact.component.html',
  styleUrl: './emengencycontact.component.scss'
})
export class EmengencycontactComponent {
  @ViewChild('formRef') formRef!: NgForm;


  // emergencyData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false
   isAPILoading = false

   editMode =false
   originalData: any

     emergencyData: any = {
    emergencyContactFullName: '',
    emergencyContactRelationship: '',
    emergencyContactPhoneNumber: '',
    emergencyContactEmail: '',
    emergencyContactCurrentAddress: '',
  };

  constructor(private router:Router, private pagesService:PagesService, private route:ActivatedRoute,
    public staffDataService: StaffDataService, public checkboxService: CheckboxService, private notification: NzNotificationService
  ){
    this.getAllStaff = new allStaffModel
  }


  ngOnInit(): void {
      const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item;  
    console.log("my id:", JSON.parse(JSON.stringify(item)))

    this.fetchEmergencyData()
    
  }


  createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000})
  }



     fetchEmergencyData() {
      this.isAPILoading =true
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.emergencyData = res; 
        console.log('Fetched emergency data:', this.emergencyData);
         this.isAPILoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }

        // CHECK BOX LOGIC
    onInputChange(value: any, field: string) {
  if (field && this.emergencyData) {
    this.emergencyData[field] = value;

    this.staffDataService.setData(this.emergencyData);

    const isTyping = Object.values(this.emergencyData).some(
      val => val && val.toString().trim().length > 0
    );

    this.checkboxService.setTypingStatus('emengency-contact', isTyping);
  }
}

  //     goBack(){
  //   this.location.back()
  // }

  //  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.emergencyData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.emergencyData = JSON.parse(JSON.stringify(this.originalData)); // restore
}


    
      onSubmit(form: NgForm) {
        this.isLoading = true;
      
      const payload: Partial<EditEmmergencyModel> = {
        _id: this.staffId,
        emergencyContactFullName: form.value.emergencyContactFullName,
        emergencyContactRelationship: form.value.emergencyContactRelationship,
        emergencyContactPhoneNumber: form.value.emergencyContactPhoneNumber,
        emergencyContactEmail: form.value.emergencyContactEmail,
        emergencyContactCurrentAddress: form.value.emergencyContactCurrentAddress,
      
        };
      
      
        console.log('PATCH payload:', payload);
        console.log('Unit being sent:', form.value.emergency);
      // console.log('Supervisor being sent:', form.value.supervisorId);
      
      
        this.pagesService.patchEmergency(this.staffId, payload).subscribe({
          next: (res) => {
            console.log('Success:', res);
             this.createNotification('topRight', "success", "update Successful!!", "Updated!")
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
