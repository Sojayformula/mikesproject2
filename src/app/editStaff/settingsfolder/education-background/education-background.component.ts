import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { addNewStaffModel, allStaffModel, editStaffModel } from '../../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';

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


    // localPageData 
 
    formData = {
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
   
  


//       resetForm() {
//       this.formData = {
//       staffId: '',
//       educationDetails: [
//         {
//           institutionName: '',
//           courseOfStudy: '',
//           startDate: '',
//           endDate: ''
//         },
//         {
//           institutionName: '',
//           startDate: '',
          
//         }
//       ]
//     }; 
// }









  constructor(private route:ActivatedRoute, private pagesService:PagesService, private staffDataService:StaffDataService,
     public formService: AddstaffService, private router:Router, public formsServiceService: FormsServiceService,
     private checkboxService: CheckboxService
    ){

    this.addNewStaff = new addNewStaffModel()

   }



// ngOnInit() {
//   this.formData = this.formsServiceService.formData || {};
//   console.log('Loaded form data in ngOnInit:', this.formData);
// }
ngOnInit() {
  const savedData = this.formsServiceService.formData || {};
  this.formData = {
    ...this.formData, // keeps default structure
    ...savedData,     // overrides with saved values
    educationDetails: savedData.educationDetails?.length
      ? savedData.educationDetails
      : this.formData.educationDetails
  };
  console.log('Loaded form data in ngOnInit:', this.formData);

}




showField() {
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
  this.formsServiceService.updateData(this.formData);
  const next = this.formsServiceService.getNextStep(this.router.url);
  if (next) {
    this.router.navigate([next]);
  }
}

  // goPrev() {
  //   const currentUrl = this.router.url;
  //   const prev = this.formsServiceService.getPreviousStep(currentUrl);
  //   if (prev) {
  //     this.router.navigate([prev], { relativeTo: this.route.parent });
  //   }
  // }

  goPrev() {
  this.formsServiceService.updateData(this.formData); 
  const currentUrl = this.router.url;
  const prev = this.formsServiceService.getPreviousStep(currentUrl);
  if (prev) {
    this.router.navigate([prev], { relativeTo: this.route.parent });
  }
}





submit() {
  this.formsServiceService.updateData(this.formData); 

  const fullPayload = this.formsServiceService.formData;
  console.log('Submitting this payload:', fullPayload);

 this.pagesService.postAddNewStaff(fullPayload).subscribe({
  next: (res) => {
    console.log('Submitted!', res);
    this.formsServiceService.resetFormData();
      this.router.navigate(['/editsettings/personal-information']);
   
  },
  error: (err) => {
    console.error('Error mike:', err);

    // this.formsServiceService.resetFormData();
    //   this.router.navigate(['/editsettings/personal-information']);

  },
  complete: () => {
    console.log('Request complete');
    

  }
});

} 





// steps: string[] = [];


// // private hasEdited: boolean = false;
// private previousStatus: boolean = false;
// private debounceTimeout: any = null;

// onInputChange(): void {
//   // this.hasEdited = true;
//   console.log('onInputChange triggered');

//    clearTimeout(this.debounceTimeout);

//    this.debounceTimeout = setTimeout(() => {
//     const requiredFields: string[] = [
//       'firstName',
//       'lastName',
//       'otherName',
//       'gender',
//       'dateOfBirth',
//       'nationality',
//       'maritalStatus',
//       'phoneNumber',
//       'email',
//       'idType',
//       'idNumber',
//     ];

//     const isComplete = requiredFields.every(field => {
//       const val = this.formData?.[field];
//       console.log(`🔍 ${field}:`, val);
//       return val !== null && val !== undefined && val.toString().trim().length > 0;
//     });

//     console.log('✅ Form complete:', isComplete);

//     if (isComplete !== this.previousStatus) {
//       this.checkboxService.setTypingStatus('personal-information', isComplete);
//       this.previousStatus = isComplete;
//       console.log(isComplete ? '☑️ Checkbox ticked' : '⬜ Checkbox unticked');
//     }
//    }, 50);

}















 //  this.resetForm();                         
    //   this.formsServiceService.formData = {};   
    //   localStorage.removeItem('formData'); 

  






















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
