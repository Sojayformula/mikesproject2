import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, editFamilyModel, PatchEducationPayload } from '../../model/pagesModel';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
//import { Child } from '../../model/pagesModel';
import { EditService } from '../../editservice/edit.service';
import { Child } from '../../model/pagesModel';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent implements OnInit {
  //@ViewChild('formRef') formRef!: NgForm;
  @ViewChild('staffForm') staffForm!: NgForm;


  originalData: any = {};

    data: any = {
      staffId: '',
      spouseName: '',
      spousePhone: '',
      spouseEmail: '',
      numberOfChildren: 0,
      children: [],
      supervisor: {
        _id: ''
      }
    };


   getAllStaff: allStaffModel;
   staffId: any
   editMode: boolean = false;
   isLoading = false
    isAPILoading = false

     selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
 

  originalStaffData: any;
  
 

  constructor(public editService:EditService, private router:Router, private location:Location, private pagesService:PagesService,
    private checkboxService:CheckboxService, private staffDataService:StaffDataService, private route:ActivatedRoute,
    private notification: NzNotificationService
   ){

      this.getAllStaff = new allStaffModel()
      // this.familyModel = new editFamilyModel()
    }

  ngOnInit(): void {

     this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);
     })

    if (this.staffId) {
       this.fetchFamiltDetails(); 
    }
    //  this.fetchFamiltDetails();
  
    this.data = this.staffDataService.getData();

    this.originalData = structuredClone(this.data); 



     }


      createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000})
  }




     goBack(){
    this.location.back()
  }



  fetchFamiltDetails() {
    this.isAPILoading = true
  console.log('Fetch family data before API:', this.data);
  this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
    next: (res) => {
      this.data = res.data || res;
      console.log('API response:', this.data); 
     // console.log('Updated family data:', this.data);
      this.isAPILoading = false
    },
    error: (err) => {
      console.error('Failed to fetch children data', err)
      this.isAPILoading = false
  }
  });
}



  addChild() {
    this.data.children.push({ fullName: '', dob: '' });
    
  }



  removeChild(index: number) {
  this.data.children.splice(index, 1);

  const payload= {
    _id: this.staffId,
    educationDetails: this.data.educationDetails
  };

  this.pagesService.patchEmployment(this.staffId, payload).subscribe({
    next: (res) => {
      console.log(' Education entry removed and saved:', res);
    },
    error: (err) => {
      console.error('Failed to remove education entry:', err);
    }
  });
}



Submit(form: NgForm) {
  if (form.invalid) return;
  //if (this.staffForm?.valid) {

  this.isLoading = true;

  const payload  = {
    _id: this.staffId,
    spouseName: form.value.spouseName,
    spousePhone: form.value.spousePhone,
    spouseEmail: form.value.spouseEmail,
    numberOfChildren: this.data.children.length,
    children: this.data.children.map((child: { fullName: string; dob: string }) => ({
      fullName: child.fullName,
      dob: child.dob
    })),
    supervisor: [this.data.supervisor._id]
  };

  console.log('PATCH FAMILY PAYLOAD:', payload);

  this.pagesService.patchFamilyDetails(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('Family details updated:', res);
       this.createNotification('topRight', "success", "update Successful!!", "Updated!")
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error updating family details:', err);
      alert('Family details update failed.');
      this.isLoading = false;
    }
  });
//}
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
  this.data = JSON.parse(JSON.stringify(this.originalData)); 
}


getFileIcon(url: string): string {
  if (!url) return '📁';

  const ext = url.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf': return '📄';
    case 'jpg':
    case 'jpeg':
    case 'png': return '🖼️';
    case 'doc':
    case 'docx': return '📘';
    case 'xls':
    case 'xlsx': return '📗';
    default: return '📁';
  }
}



 
 
steps: string[] = [];
 
  getFieldValue(field: string): any {
  switch (field) {
    case 'spouseName': return this.data?.spouseName;
    case 'lastName': return this.data?.lastName;
    case 'otherName': return this.data?.otherName;
    case 'gender': return this.data?.gender;
    case 'nationality': return this.data?.nationality;
    case 'dateOfBirth': return this.data?.dateOfBirth;
    default: return '';
  }
}


onInputChange() {
  const requiredFields = [
    'spouseName',
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

  this.checkboxService.setTypingStatus('family-details', isComplete);
}




}












  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files) {
  //     this.selectedFiles = Array.from(input.files);
  //   }
  // }


// onSubmit(eduform: NgForm): void {
//   if (!eduform.valid) return;

//   this.isLoading = true;

//   // const payload = {
//   //   _id: this.staffId,
//   //   educationDetails: this.educationData.educationDetails
//   // };

//   const payload: PatchEducationPayload = {
//   _id: this.staffId,
//   educationDetails: this.data.supervisor
// };


//   this.pagesService.patchEducation(this.staffId, payload).subscribe({
//     next: (res) => {
//       console.log('PATCH response:', res);

//       if (res?.supervisor) {
//         this.data.supervisor = res.supervisor;
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



    // this.data.children = staff.children || staff.supervisor?.children || [];
      // this.data.supervisor = staff.supervisor || {};
      // this.data.spouseName = staff.spouseName || '';
      // this.data.spousePhone = staff.spousePhone || '';
      // this.data.spouseEmail = staff.spouseEmail || '';
      // this.data.numberOfChildren = staff.numberOfChildren || 0;
