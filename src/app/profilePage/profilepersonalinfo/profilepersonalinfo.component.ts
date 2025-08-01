
import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { Location } from '@angular/common';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { addNewStaffModel, allStaffModel, editStaffModel, getStaffModel } from '../../model/pagesModel';
import imageCompression from 'browser-image-compression';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EditService } from '../../editservice/edit.service';

import { ChangeDetectorRef } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-personal-information',
  imports: [CommonModule, FormsModule, MatProgressSpinner],
  templateUrl: './profilepersonalinfo.component.html',
  styleUrl: './profilepersonalinfo.component.scss'
})
export class ProfilepersonalinfoComponent implements OnInit{

  

  currentStepIndex = 0;
   //staffData: any;  
   editStaffData: editStaffModel;
  getStaffModel: getStaffModel;
  getAllStaff: allStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  isLoading = false;
  isAPILoading = false

  editMode: boolean = false;
originalStaffData: any;
 formData: any = {};    
  originalData: any = {};
  
 
imagePreview: string | ArrayBuffer | null = null;
 isCheckedMap: { [key: string]: boolean } = {};


  constructor(private cd: ChangeDetectorRef, private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, public editService:EditService, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService,
    ){

    this.getStaffModel = new getStaffModel()
    this.editStaffData = new editStaffModel()

      this.getAllStaff = new allStaffModel()
  }



   staffData: any = {};
 

 


   ngOnInit(): void {
   const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item; 

    //  this.route.paramMap.subscribe(params => {
    //   this.staffId = params.get('id') || '';
    //   console.log('Received Staff ID:', this.staffId);
    //  })


     if (this.staffId) {
      
     }

     this.fetchStaffData();


    this.staffData = this.staffDataService.getData();

  this.steps.forEach(step => this.isCheckedMap[step] = false);

  this.checkboxService.typingStatus$.subscribe((statusMap) => {
    this.steps.forEach((step) => {
      this.isCheckedMap[step] = !!statusMap[step];
    });

    this.cd.detectChanges(); 
  });


     
  }



     fetchStaffData() {
      this.isAPILoading = true
    this.pagesService.getLoggedInUserProfile().subscribe({
      next: (res ) => {
        this.staffData = res; 
        console.log('Fetched staff data:', this.staffData);
         

         const userId = localStorage.getItem('userId')
         console.log('Profile user id', userId)
         this.isAPILoading = false;

          // this.staffData = structuredClone(res);     
          // this.originalStaffData = structuredClone(res);
          // console.log('Fetched staff data:', this.staffData);

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
        this.isAPILoading = false;
      },

         complete: () => {

         }
    });
    }

 getSafeProfilePicture(pic?: string): string {
  if (!pic) return '/assets/default-profile.png'; // fallback image if missing
  return pic.replace(/^"|"$/g, '');
}



async onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Convert compressed file to base64 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.staffData.profilePicture = this.imagePreview;
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error('Image compression failed:', error);
    alert('Failed to compress image. Please try another one.');
  }
}




            //  CONVERTED DATE //
get formattedDOB(): string {
  const date = this.staffData?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.staffData.supervisor.dateOfBirth = value;
}


//  Edit  function
onEditToggle() {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.staffData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.staffData = JSON.parse(JSON.stringify(this.originalData)); // restore
}



Submit(form: NgForm) {
  this.isLoading =true;
 const payload = {
    _id: this.staffId, 
    profilePicture: this.staffData?.profilePicture || '',
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    otherName: form.value.otherName || '',
    email: form.value.email,
    dateOfBirth: form.value.dateOfBirth,
    nationality: form.value.nationality,
    gender: form.value.gender,
    idType: form.value.idType,
    phoneNumber: form.value.phoneNumber,
    idNumber: form.value.idNumber,
    maritalStatus: form.value.maritalStatus
  };

  console.log('Submitting payload:', this.editStaffData);
  console.log('Submit triggered in child:', form.value); 


  this.pagesService.getEditStaff(this.staffId, payload ).subscribe({
    next: (res) => {
      console.log('patch', res)
      //  alert('Form updated successfull')
       this.isLoading = false;
    
    },

    error: (err) => {
      console.log('error', err)
      console.log('Failed to submit form')
      alert('Form update failed')
      this.isLoading = false
    }
  })
 }




steps: string[] = [];
 
  getFieldValue(field: string): any {
  switch (field) {
    case 'firstName': return this.staffData?.firstName;
    case 'lastName': return this.staffData?.lastName;
    case 'otherName': return this.staffData?.otherName;
    case 'gender': return this.staffData?.gender;
    case 'nationality': return this.staffData?.nationality;
    case 'dateOfBirth': return this.staffData?.dateOfBirth;
    default: return '';
  }
}


onInputChange() {
  const requiredFields = [
    'firstName',
    'lastName',
    'otherName',
    'gender',
    'nationality',
    'dateOfBirth',
  ];

  const isComplete = requiredFields.every(fieldName => {
    const val = this.getFieldValue(fieldName);
    return val !== null && val !== undefined && val.toString().trim().length > 0;
  });

  this.checkboxService.setTypingStatus('person-information', isComplete);
}


}