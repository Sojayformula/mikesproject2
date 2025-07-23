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
  selector: 'app-person-information',
  imports: [CommonModule, FormsModule, MatProgressSpinner],
  templateUrl: './person-information.component.html',
  styleUrl: './person-information.component.scss'
})
export class PersonInformationComponent implements OnInit{

 @ViewChild('staffForm') staffForm!: NgForm;

  
  // private sub!: Subscription;

  currentStepIndex = 0;
   staffData: any = {
     firstName: '',
    lastName: '',
    otherName: '',
    dateOfBirth: '',
    email: '',
      gender: '',
    nationality: '',
    idNumber: '',
    idType: '',
    maritalStatus: '',
    phoneNumber: '',
                     
   }; 
   
   
   editStaffData: editStaffModel;
  getStaffModel: getStaffModel;
  getAllStaff: allStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  isAPILoading = false;
   isLoading = false;

  editMode: boolean = false;
originalStaffData: any;
 formData: any = {};    
  originalData: any = {};
  
 
imagePreview: string | ArrayBuffer | null = null;
 isCheckedMap: { [key: string]: boolean } = {};


  constructor(private cd: ChangeDetectorRef, private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, public editService:EditService, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService, private notification: NzNotificationService
    ){

    this.getStaffModel = new getStaffModel()
    this.editStaffData = new editStaffModel()

      this.getAllStaff = new allStaffModel()

     

  }


   ngOnInit(): void {
   const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item; 

   //const  item = this.route.snapshot.queryParamMap.get('staffId')
  
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

  this.steps.forEach(step => this.isCheckedMap[step] = false);

  this.checkboxService.typingStatus$.subscribe((statusMap) => {
    this.steps.forEach((step) => {
      this.isCheckedMap[step] = !!statusMap[step];
    });

    this.cd.detectChanges(); 
  });
     
  }


       createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000})
  }

      // GENDER SELECT //
    selectedGender: any
    genderOptions = [
  { key: 'Male', label: 'Male' },
  { key: 'Female', label: 'Female' },
  { key: 'Other', label: 'Other' }

];

        // mARITAL STATUS SELECT //
   selectMaritalStatus: any
   maritalStatusOption = [
    {key: 'Married', label: 'Married'},
    {key: 'Single', label: 'Single'}
    
   ];





     fetchStaffData() {
      this.isAPILoading = true
      console.log('Personal data', this.staffData)
       
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.staffData = res.data || ''; 
        console.log('Fetched staff data:', this.staffData);
         this.isAPILoading = false;
         
         this.staffData = structuredClone(res);     
         this.originalStaffData = structuredClone(res);
          console.log('Fetched staff data:', this.staffData);

         
      },
      error: (err) => {
        console.error('Error fetching staff:', err);
        this.isAPILoading = false
      },

         complete: () => {

         }
    });
    }
  
  

  allowOnlyLetters(event: KeyboardEvent){
  const ltters = event.key;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(ltters)) {
    event.preventDefault(); 
  }
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

       if (!this.staffData) {
        this.staffData = {};
      }

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


      // CHECK BOX LOGIC
//   onInputChange(field: string, value: string) {
//   this.staffData.supervisor[field] = value;

//   this.staffDataService.setData({ supervisor: this.staffData.supervisor });

//   // Detect typing 
//   const isTyping = Object.values(this.staffData.supervisor).some(
//     val => val && val.toString().trim().length > 0
//   );
//   this.checkboxService.setTypingStatus('person-information', isTyping);
// }



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
       this.createNotification('topRight', "success", "Update Successful!!", "Updated!")
       this.isLoading = false;
    
    },

    error: (err) => {
      console.log('error', err)
      console.log('Failed to submit form')
      alert('Form update failed')
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



       // IMGE PREVIEW //
isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname !== 'profile.jpg'; 
  } catch {
    return false;
  }
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