import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { Location } from '@angular/common';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { allStaffModel, editStaffModel, getStaffModel } from '../../model/pagesModel';
import imageCompression from 'browser-image-compression';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EditService } from '../../editservice/edit.service';

import { ChangeDetectorRef } from '@angular/core';
import { Subscription, take } from 'rxjs';



@Component({
  selector: 'app-person-information',
  imports: [CommonModule, FormsModule, MatProgressSpinner],
  templateUrl: './person-information.component.html',
  styleUrl: './person-information.component.scss'
})
export class PersonInformationComponent implements OnInit{

  @ViewChild('staffForm') formRef!: NgForm;

  
  private sub!: Subscription;

  currentStepIndex = 0;
   staffData: any;  
   editStaffData: editStaffModel;
  getStaffModel: getStaffModel;
  getAllStaff: allStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  isLoading = false;

  editMode: boolean = false;
originalStaffData: any;
 formData: any = {};         // Bound to the form via [(ngModel)]
  originalData: any = {};
  
  // selectedFile!: File;
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



   ngOnInit(): void {
  //  const item = this.route.snapshot.queryParamMap.get('staffId');
  // this.staffId = item; 

  // //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
  //   console.log("my id:", JSON.parse(JSON.stringify(item)))
  // //  this.fetchMaritalStatus() 


   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

  });


     if (this.staffId) {
      this.fetchStaffData();
     }

      this.staffData = this.staffDataService.getData();
     
  }



     fetchStaffData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.staffData = res; 
        console.log('Fetched staff data:', this.staffData);
         this.isLoading = false;

          this.staffData = structuredClone(res);     
          this.originalStaffData = structuredClone(res);
          console.log('Fetched staff data:', this.staffData);

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
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

    // Convert compressed file to base64 string for preview and submission
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

// onFileSelected(event: any): void {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }
// }


            //  CONVERTED DATE //
get formattedDOB(): string {
  const date = this.staffData?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.staffData.supervisor.dateOfBirth = value;
}



 goBackToPersonalInfo(){
    this.location.back()
  }

  next(){
    this.router.navigate(['edit-personal-info'])
  }

  onInputChange(field: string, value: string) {
  this.staffData.supervisor[field] = value;

  this.staffDataService.setData({ supervisor: this.staffData.supervisor });

  // Detect typing 
  const isTyping = Object.values(this.staffData.supervisor).some(
    val => val && val.toString().trim().length > 0
  );
  this.checkboxService.setTypingStatus('person-information', isTyping);
}

// onInputChange(field: string, value: string) {
//   this.staffData[field] = value;

//   this.staffDataService.setData(this.staffData);

//   // Check if ANY field has a value
//   const isTyping = Object.values(this.staffData).some(
//     val => val && val.toString().trim().length > 0
//   );

//   // ✅ Update checkbox
//   this.checkboxService.setTypingStatus('person-information', isTyping);
// }






//  Edit  function
onEditToggle(): void {
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
    }
  })
 }






}























      //   this.sub = this.editService.action$.subscribe(action => {
    //   if (action === 'edit') this.editMode = true;
    //   if (action === 'cancel') this.resetForm();
    //   if (action === 'save') this.submitForm();
    // });

 // resetForm() {
  //   this.editMode = false;

  //   // Revert changes by restoring the backup copy
  //   // this.staffData = structuredClone(this.originalData); 
  // }

  // submitForm() {
  //   if (this.editMode) {
  //     console.log('Saving data:', this.staffData);
  //     this.editMode = false;

  //     // Optionally update originalData if save is successful
  //     this.originalData = structuredClone(this.staffData);
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
   
  //enterEditMode() {
//     this.editMode = true;
//     // Save a new copy before user starts editing
//     // this.originalData = structuredClone(this.staffData);
//     this.originalData = JSON.parse(JSON.stringify(this.staffData));
   
//   }

//  resetForm() {
//     console.log('Reset in ChildTwo');
//     this.editMode = false;
//   }

//    submitForm() {
//     if (this.editMode) {
//       console.log('Submitting:', this.formData);
//       this.editMode = false;
//     }
//   }

//   ngOnDestroy(): void {
//     this.sub.unsubscribe();
//   }


  // EDIT FORM //

// onEditToggle(): void {
//   this.editMode = true;
  
// }

// onCancel(): void {
//   this.editMode = false;
 
// }

// toggleEdit() {
//   this.editService.enableEdit();
// }

// cancelEdit() {
//   this.editService.disableEdit();
// }



//   onToggleEdit() {
//     const isEditing = this.editService.editModeSubject.getValue();
//     if (isEditing) {
//       // TODO: Save changes to server here
//       console.log('Saving:', this.formData);
//     } else {
//       this.editService.enableEdit();
//     }
//   }