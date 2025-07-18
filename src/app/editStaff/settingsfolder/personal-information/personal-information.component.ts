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
   staffData: any
  currentStepIndex = 0;
   personalData: any;  
   editStaffData: editStaffModel;
  getStaffModel: getStaffModel;
  getAllStaff: allStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  isLoading = false;

  editMode: boolean = false;
originalStaffData: any;
     
  originalData: any = {};
  

imagePreview: string | ArrayBuffer | null = null;
 isCheckedMap: { [key: string]: boolean } = {};


formData: {
  [key: string]: any;
} = {
  jobTitle: '',
  unit: [],
  employmentType: '',
  hireDate: '',
  workLocation: '',
  staffId: '',
  supervisor: [],
  role: '',
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

     createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  }


ngOnInit() {
   this.formData = this.formsServiceService.formData || {};
  console.log('Loaded form data in ngOnInit:', this.formData);

  
 
  // const savedData = this.formsServiceService.getData();
  // this.formData = { ...this.formData, ...savedData }; // only overrides existing fields

    this.personalData = this.staffDataService.getPersonalInfoData();

  // this.steps.forEach(step => this.isCheckedMap[step] = false);

  // this.checkboxService.typingStatus$.subscribe((statusMap) => {
  //   this.steps.forEach((step) => {
  //     this.isCheckedMap[step] = !!statusMap[step];
  //   });

  //   this.cd.detectChanges(); 
  // });


}



     fetchStaffData() {
      console.log('Personal data', this.staffData)
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.staffData = res.data || ''; 
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



steps: string[] = [];


// private hasEdited: boolean = false;
private previousStatus: boolean = false;
private debounceTimeout: any = null;

onInputChange(): void {
  // this.hasEdited = true;
  console.log('onInputChange triggered');

   clearTimeout(this.debounceTimeout);

   this.debounceTimeout = setTimeout(() => {
    const requiredFields: string[] = [
      'firstName',
      'lastName',
      'otherName',
      'gender',
      'dateOfBirth',
      'nationality',
      'maritalStatus',
      'phoneNumber',
      'email',
      'idType',
      'idNumber',
    ];

    const isComplete = requiredFields.every(field => {
      const val = this.formData?.[field];
      console.log(`🔍 ${field}:`, val);
      return val !== null && val !== undefined && val.toString().trim().length > 0;
    });

    console.log('Form complete:', isComplete);

    if (isComplete !== this.previousStatus) {
      this.checkboxService.setTypingStatus('personal-information', isComplete);
      this.previousStatus = isComplete;
      console.log(isComplete ? '☑️ Checkbox ticked' : '⬜ Checkbox unticked');
    }
   }, 50);
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
      this.personalData.profilePicture = this.imagePreview;
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error('Image compression failed:', error);
    alert('Failed to compress image. Please try another one.');
  }
}


            //  CONVERTED DATE //
get formattedDOB(): string {
  const date = this.personalData?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.personalData.supervisor.dateOfBirth = value;
}



 goBackToPersonalInfo(){
    this.location.back()
  }



//   onInputChange(field: string, value: string) {
//   this.staffData.supervisor[field] = value;

//   this.staffDataService.setData({ supervisor: this.staffData.supervisor });

//   // Detect typing (check if any field has value)
//   const isTyping = Object.values(this.staffData.supervisor).some(
//     val => val && val.toString().trim().length > 0
//   );
//   this.checkboxService.setTypingStatus('personal-information', isTyping);
// }


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
  this.formsServiceService.updateData(this.formData); // Save to shared service
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
       this.createNotification('topRight', "success", "update Successful!!", "Updated!")
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