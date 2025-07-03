import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { addNewStaffModel, allStaffModel, editStaffModel } from '../../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './education-background.component.html',
  styleUrl: './education-background.component.scss'
})
export class EducationBackgroundComponent2 implements OnInit {

  addNewStaff: addNewStaffModel
  //  getAllStaff: allStaffModel
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false
  // formData: Partial<addNewStaffModel> = {};

   editMode: boolean = false;
originalStaffData: any;

// In your component.ts
showAllField: boolean = false;


    localPageData = {
      staffId: '',
      educationDetails: [
        {
          institutionName: '',
          courseOfStudy: '',
          startDate: '',
          endDate: ''
        },
        {
          institutionName: '',
          startDate: '',
          
        }
      ]
    };


  constructor(private route:ActivatedRoute, private pagesService:PagesService, private staffDataService:StaffDataService,
     public formService: AddstaffService, private router:Router, public formsServiceService: FormsServiceService){

    this.addNewStaff = new addNewStaffModel()

   }



  ngOnInit() {
  // this.formData = this.formsServiceService.formData || {};
  // console.log('Loaded form data in ngOnInit:', this.formData);
}


showField() {
  // this.showAllField = true;
  this.showAllField = !this.showAllField;
}

cancelShowField() {
  this.showAllField = false;
}



onEditToggle(): void {
  this.editMode = true;
  
}

onCancel(): void {
  this.editMode = false;
 
}



  removeFile(index: number) {
  this.selectedFiles.splice(index, 1);
}

 onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }


  onDrop(event: DragEvent) {
  event.preventDefault();
  this.isDragging = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    this.addFiles(files);
  }
}

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    this.addFiles(input.files);
  }
}



  addFiles(fileList: FileList) {
  for (let i = 0; i < fileList.length; i++) {
    this.selectedFiles.push(fileList[i]);
  }
}




  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  getFileType(file: File): string {
    const type = file.type;
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';
    if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'word';
    if (type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'excel';
    if (type.startsWith('text/')) return 'text';
    return 'other';
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

   goNext() {
  this.formsServiceService.updateData(this.localPageData);
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










// formData: addNewStaffModel = {
//     _id: '',
//     profilePicture: '',
//     firstName: '',
//     lastName: '',
//     otherName: '',
//     email: '',
//     dateOfBirth: '',
//     nationality: '',
//     gender: '',
//     idType: '',
//     phoneNumber: '',
//     idNumber: '',
//     maritalStatus: '',
//     jobTitle: '',
//     unit: [],
//     employmentType: '',
//     hireDate: '',
//     workLocation: '',
//     staffId: '',
//     supervisor: [],
//     role: '',
    // emergencyContactFullName: '',
    // emergencyContactRelationship: '',
    // emergencyContactPhoneNumber: '',
    // emergencyContactEmail: '',
    // emergencyContactCurrentAddress: '',
//     spouseName: '',
//     spousePhone: '',
//     spouseEmail: '',
//     marriageCertificateUrl: '',
//     numberOfChildren: 0,
//     children: [],
//     //educationDetails: [],
//     nextOfKinFullName: '',
//     nextOfKinRelationship: '',
//     nextOfKinPhoneNumber: '',
//     nextOfKinEmail: '',
//     nextOfKinCurrentAddress: '',
//    // institutionName: '',
//     // courseOfStudy: '',
//     // startDate: '',
//     // endDate: '',
//       educationDetails: [
//     { institutionName: '', courseOfStudy: '', startDate: '', endDate: '' },
//     { institutionName: '', courseOfStudy: '', startDate: '', endDate: '' }
//   ],
//   // children: [
//   //   { fullName: '', dob: '' },
//   //   { fullName: '', dob: '' }
//   // ],
//   };




//   submit() {

//   this.formsServiceService.updateData(this.formData);

//   const fullPayload: addNewStaffModel = {
//     ...this.formsServiceService.formData,
//   } as addNewStaffModel;

//   console.log('Final Payload:', fullPayload);


//   this.pagesService.postAddNewStaff(fullPayload).subscribe({
//     next: (res) => console.log('Submitted successfully', res),
//     error: (err) => console.error('Submission failed', err)
//   });
// }
submit() {
  this.formsServiceService.updateData(this.localPageData); // Final page's own data

  const fullPayload = this.formsServiceService.formData;
  console.log('Submitting this payload:', fullPayload);

 this.pagesService.postAddNewStaff(fullPayload).subscribe({
  next: (res) => {
    console.log('Submitted!', res);
  },
  error: (err) => {
    console.error('Error:', err);
  },
  complete: () => {
    console.log('Request complete');
  }
});

}  

}



























// onSubmit(eduform: NgForm): void {
//   if (!eduform.valid) return;

//   this.isLoading = true;
 
//    const formData = new FormData();
// formData.append('_id', this.staffId);
// formData.append('educationDetails', JSON.stringify(this.educationData.educationDetails));
// for (let i = 0; i < this.selectedFiles.length; i++) {
//   formData.append('files', this.selectedFiles[i]);
// }

//   this.pagesService.patchEducation(this.staffId, formData).subscribe({
//     next: (res) => {
//       console.log('PATCH response:', res);

//       if (res?.educationDetails) {
//         this.educationData.educationDetails = res.educationDetails;
//       }

//       this.editMode = false;
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('error', err);
//       alert('Form update failed');
//       this.isLoading = false;
//     }
//   });
// }

