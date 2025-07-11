import { Component, OnInit } from '@angular/core';
import { addNewStaffModel, allStaffModel, Child, editFamilyModel } from '../../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { EditService } from '../../../editservice/edit.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { PagesService } from '../../../service/pages.service';
import { CommonModule, Location } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';



@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent2 implements OnInit{



   originalData: any = {};
  data: any = {}
   getAllStaff: allStaffModel;
  //  familyModel: editFamilyModel
   staffId: any
   editMode: boolean = false;
   isLoading = false

     selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  
 
   formData = {
    spouseName: '',
  spousePhone: '',
  spouseEmail: '',
  marriageCertificateUrl: '',
  numberOfChildren: '',
  children: [
    { fullName: '', dob: '' },
    { fullName: '', dob: '' }
  ]
  };

// formData = {
//   spouseName: '',
//   spousePhone: '',
//   spouseEmail: '',
//   marriageCertificateUrl: '',
//   numberOfChildren: '',
//   children: [] as { fullName: string; dob: string }[]
// };

children ={
  fullName: '', 
  dob: '' 
}



 

   resetForm() {
     this. formData = {
    spouseName: '',
  spousePhone: '',
  spouseEmail: '',
  marriageCertificateUrl: '',
  numberOfChildren: '',
  children: [
    { fullName: '', dob: '' },
    { fullName: '', dob: '' }
  ]
  };
   }




// nextStep() {
//   this.formsService.updateData(this.localPageData);
//   this.router.navigate(['/editsettings/next-of-kin']);
// }

 

  constructor(public editService:EditService, private router:Router, private location:Location, private pagesService:PagesService,
    private checkboxService:CheckboxService, private staffDataService:StaffDataService, 
    private route:ActivatedRoute, public formService: AddstaffService, public formsServiceService: FormsServiceService ){

      this.getAllStaff = new allStaffModel()
     
    }

//   ngOnInit() {
//    this.formData = this.formsServiceService.formData || {};
//    console.log('Loaded form data in ngOnInit:', this.formData);

// }
// ngOnInit() {
//     const saved = this.formsServiceService.formData || {};

//   // Step 1: Merge defaults and saved data (excluding children)
//   this.formData = {
//     spouseName: '',
//     spousePhone: '',
//     spouseEmail: '',
//     marriageCertificateUrl: '',
//     numberOfChildren: '',
//     ...saved
//   };

//   // Step 2: Ensure `children` exists and has 2 entries
//   this.formData.children = saved.children ?? [
//     { fullName: '', dob: '' },
//     { fullName: '', dob: '' }
//   ];

//   console.log('Loaded form data in ngOnInit:', this.formData);
// }
ngOnInit() {
  const saved = this.formsServiceService.getData() || {};

  this.formData = {
    spouseName: '',
    spousePhone: '',
    spouseEmail: '',
    marriageCertificateUrl: '',
    numberOfChildren: '',
    ...saved,
    children: Array.isArray(saved.children) ? saved.children : []
  };

  console.log('Loaded form data in ngOnInit:', this.formData);

   if (!this.formData.children || this.formData.children.length === 0) {
    this.formData.children = [{ fullName: '', dob: '' }]; 
}
}




gOnInit() {
  const saved = this.formsServiceService.getData();

  // Force children to be empty unless intentionally saved
  this.formData = {
    ...this.formData,
    ...saved,
    children: saved?.children?.length ? saved.children : []
  };

}



  allowOnlyDigits(event: KeyboardEvent) {
  const char = event.key;
  if (!/^\d$/.test(char)) {
    event.preventDefault(); // Block if not 0-9
  }
}



      // ADD MORE LOGIC //
addMore() {
   this.formData.children.push({ fullName: '', dob: ''});

   this.formData.numberOfChildren = this.formData.children.length.toString(); 
}



removeChild(index: number) {
  this.formData.children.splice(index, 1);
}










// formData = {
//   spouseName: '',
//   spousePhone: '',
//   spouseEmail: '',
//   marriageCertificateUrl: '',
//   numberOfChildren: '',
//   children: [] as { fullName: string; dob: string }[]
// };

// addChild() {
//   this.formData.children.push({
//      fullName: '',
//       dob: ''
//    });
// }






     goBack(){
    this.location.back()
  }


    onInputChange(field: string, value: string) {
    this.data[field] = value;
    this.staffDataService.setData({ [field]: value });

    // mark checkbox
    const isTyping = Object.values(this.data).some(val => val && val.toString().trim().length > 0);
    this.checkboxService.setTypingStatus('person-information', isTyping);
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
      this.selectedFiles = Array.from(files);
    }
  }


  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    const files = Array.from(input.files);
    this.selectedFiles.push(...files);
    input.value = ''; 
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


//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.data)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.data = JSON.parse(JSON.stringify(this.originalData)); // restore
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

}