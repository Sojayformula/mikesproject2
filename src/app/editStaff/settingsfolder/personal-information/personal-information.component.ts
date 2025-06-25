import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { allStaffModel, editStaffModel, getStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { PagesService } from '../../../service/pages.service';
import { EditService } from '../../../editservice/edit.service';
import { CommonModule, formatDate, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import imageCompression from 'browser-image-compression';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-personal-information',
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent2 implements OnInit {
  @ViewChild('staff') formRef!: NgForm;


  
 // private sub!: Subscription;

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


  constructor(private cd: ChangeDetectorRef, private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, public editService:EditService, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService,
  ){

    this.getStaffModel = new getStaffModel()
    this.editStaffData = new editStaffModel()

      this.getAllStaff = new allStaffModel()
  }



   ngOnInit(): void {
    //  this.staffData = this.staffDataService.getData();
     
  }



    //  etchStaffData() {
    // this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
    //   next: (res ) => {
    //     this.staffData = res; 
    //     console.log('Fetched staff data:', this.staffData);
    //      this.isLoading = false;

    //       this.staffData = structuredClone(res);     
    //       this.originalStaffData = structuredClone(res);
    //       console.log('Fetched staff data:', this.staffData);

    //   },
    //   error: (err) => {
    //     console.error('Error fetching staff:', err);
    //   },

    //      complete: () => {

    //      }
    // });
    // }

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

  // Detect typing (check if any field has value)
  const isTyping = Object.values(this.staffData.supervisor).some(
    val => val && val.toString().trim().length > 0
  );
  this.checkboxService.setTypingStatus('person-information', isTyping);
}

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

// Submit(form:NgForm){}




  // ubmit() {
  //   if (this.formRef.valid) {
  //     console.log('Employment Info Submitted:', this.formRef.value);
  //   } else {
  //     console.warn('Employment Info form is invalid');
  //   }
  // }







// submit(form: NgForm) {
//   this.isLoading =true;
//  const payload = {
//     _id: this.staffId, 
//     profilePicture: this.staffData?.profilePicture || '',
//     firstName: form.value.firstName,
//     lastName: form.value.lastName,
//     otherName: form.value.otherName || '',
//     email: form.value.email,
//     dateOfBirth: form.value.dateOfBirth,
//     nationality: form.value.nationality,
//     gender: form.value.gender,
//     idType: form.value.idType,
//     phoneNumber: form.value.phoneNumber,
//     idNumber: form.value.idNumber,
//     maritalStatus: form.value.maritalStatus
//   };

//   console.log('Submitting payload:', this.editStaffData);
//   console.log('Submit triggered in child:', form.value); 



//       console.log('Employment Info Submitted:', this.formRef.value);
//   this.pagesService.getAddStaff(this.staffId, payload ).subscribe({
//     next: (res) => {
//       console.log('patch', res)
//       //  alert('Form updated successfull')
//        this.isLoading = false;
    
//     },
  

//     error: (err) => {
//       console.log('error', err)
//       console.log('Failed to submit form')
//       alert('Form update failed')
//     }
//   })
//  }


submit(): void {
  if (!this.formRef || !this.formRef.valid) {
    console.warn('Form is invalid or missing');
    return;
  }

  const form = this.formRef;
  this.isLoading = true;

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

  console.log('✅ Submitting form with payload:', payload);

  this.pagesService.getAddStaff(payload).subscribe({
    next: (res) => {
      console.log('✅ Staff updated successfully:', res);
      this.isLoading = false;
    },
    error: (err) => {
      console.error('❌ Error updating staff:', err);
      alert('Form update failed');
      this.isLoading = false;
    }
  });
}




// submit(): void {
//   if (!form.valid) {
//     console.warn('Form is invalid');
//     return;
//   }

//   this.isLoading = true;

//   const payload = { ...this.staffData };

//   this.pagesService.getAddStaff(payload).subscribe({
//     next: (res) => {
//       console.log('✅ Staff created:', res);
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('❌ Error creating staff:', err);
//       this.isLoading = false;
//     }
//   });
// }




}