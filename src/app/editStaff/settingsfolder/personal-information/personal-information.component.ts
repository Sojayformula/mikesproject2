import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { addNewStaffModel, allStaffModel, editStaffModel, getStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { PagesService } from '../../../service/pages.service';
import { EditService } from '../../../editservice/edit.service';
import { CommonModule, formatDate, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import imageCompression from 'browser-image-compression';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddstaffService } from '../../../addstaffservice/addstaff.service'; 
import { FormsServiceService } from '../formService/forms-service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-personal-information',
  imports: [FormsModule, CommonModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.scss'
})
export class PersonalInformationComponent2 implements OnInit {



  
  
  successMessage = '';
  errorMessage = '';

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
 //formData: any = {};      
  originalData: any = {};
  
  // selectedFile!: File;
imagePreview: string | ArrayBuffer | null = null;

//  localPageData
  formData= {
    firstName: '',
  lastName: '',
  otherName: '',
  gender: '',
  dateOfBirth: '',
  nationality: '',
  maritalStatus: '',
  idType: '',
  idNumber: '',
  phoneNumber: '',
  email: ''
 }; 
  
resetForm() {
 this.formData= {
    firstName: '',
  lastName: '',
  otherName: '',
  gender: '',
  dateOfBirth: '',
  nationality: '',
  maritalStatus: '',
  idType: '',
  idNumber: '',
  phoneNumber: '',
  email: ''
 };   }



  constructor(private cd: ChangeDetectorRef, private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, public editService:EditService, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService,  public formService: AddstaffService,
    public formsServiceService: FormsServiceService, public AddstaffService: AddstaffService, private notification: NzNotificationService
  ){

    this.getStaffModel = new getStaffModel()
    this.editStaffData = new editStaffModel()
    this.getAllStaff = new allStaffModel()
   
}

     createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  }


ngOnInit() {
  this.formData = this.formsServiceService.formData || {};
  console.log('Loaded form data in ngOnInit:', this.formData);

 
  // const savedData = this.formsServiceService.getData();
  // this.formData = { ...this.formData, ...savedData }; // only overrides existing fields


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



 goBackToPersonalInfo(){
    this.location.back()
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


   // NEXT AND PREVIOUS FUNCTIONS //
   get isLastStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getNextStep(currentUrl) === null;
  }

  get isFirstStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getPrevStep(currentUrl) === null;
  }

  
//    goNext() {
//     console.log('Personal info', this.formData)
//   this.formsServiceService.updateData(this.formData);
//   const next = this.formsServiceService.getNextStep(this.router.url);
//   if (next) {
//     this.router.navigate([next]);
//   }
// }
goNext() {
  console.log('Personal info', this.formData);
  this.formsServiceService.updateData(this.formData); // ✅ Save to shared service
  const next = this.formsServiceService.getNextStep(this.router.url);
  if (next) {
    this.router.navigate([next]);
  }
}


  goPrev() {
    const currentUrl = this.router.url;
    const prev = this.formsServiceService.getPreviousStep(currentUrl);
    if (prev) {
      this.router.navigate([prev], { relativeTo: this.route.parent });
    }
  }


}


















// //  Edit  function
// onEditToggle(): void {
//   this.editMode = true;
//   this.originalData = JSON.parse(JSON.stringify(this.staffData)); // deep copy
// }

// // Cancel function
// onCancel(): void {
//   this.editMode = false;
//   this.staffData = JSON.parse(JSON.stringify(this.originalData)); // restore
// }



  // get isLastStep(): boolean {
  //   const currentUrl = this.router.url;
  //   return this.formService.getNextStep(currentUrl) === null;
  // }

  // get isFirstStep(): boolean {
  //   const currentUrl = this.router.url;
  //   return this.formService.getPrevStep(currentUrl) === null;
  // }



  // routeFormData(){
  // const state = history.state as { formData: Partial<addNewStaffModel> };

  // console.log('History state:', state);

  // if (state?.formData) {
  //   this.formData = state.formData;
  //   console.log('Loaded form data:', this.formData);
  // } else {
  //   console.warn('No formData found in history state');
  // }
  // }