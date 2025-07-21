
import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, editFamilyModel, PatchEducationPayload } from '../../model/pagesModel';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Child } from '../../model/pagesModel';
import { EditService } from '../../editservice/edit.service';


@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
 templateUrl: './profile-family.component.html',
  styleUrl: './profile-family.component.scss'
})
export class ProfileFamilyComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;


  originalData: any = {};
  data: any 
   getAllStaff: allStaffModel;
  //  familyModel: editFamilyModel
   staffId: any
   editMode: boolean = false;
   isLoading = false

     selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;

  originalStaffData: any;
  
 

  constructor(public editService:EditService, private router:Router, private location:Location, private pagesService:PagesService,
    private checkboxService:CheckboxService, private staffDataService:StaffDataService, private route:ActivatedRoute ){

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
      this.fetchStaffData(); 
    }
    // this.fetchFamiltDetails();
  
    this.data = this.staffDataService.getData();

    this.originalData = structuredClone(this.data); 
     }





     goBack(){
    this.location.back()
  }


     fetchStaffData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.data = res;     

        console.log('Fetched staff data:', this.data);
         this.isLoading = false;

          this.data = structuredClone(res);     
          this.originalStaffData = structuredClone(res);
          

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }


   
       



// Submit(form: NgForm) {
//   if (form.invalid) return;
//   const supervisorPayload: editFamilyModel = {
//   supervisor: [this.data.supervisor._id], 
//   spouseName: this.data.supervisor.spouseName,
//   spousePhone: this.data.supervisor.spousePhone,
//   spouseEmail: this.data.supervisor.spouseEmail,
//   numberOfChildren: this.data.supervisor.numberOfChildren,
//   children: this.data.supervisor.children.map((child: Child) => ({
//     fullName: child.fullName,
//     dob: child.dob,
//     _id: child._id
//   }))
// };


//   this.pagesService.patchFamilyDetails(this.staffId, supervisorPayload).subscribe({
//     next: (res) => {
//       console.log('Supervisor updated successfully');
     
//     },
//     error: (err) => {
//       console.error('Error updating supervisor', err);
//     }
//   });
// }


Submit(form: NgForm) {
  if (form.invalid) return;

  const supervisorPayload: editFamilyModel = {
    _id: this.staffId,
    spouseName: this.data.supervisor.spouseName,
    spousePhone: this.data.supervisor.spousePhone,
    spouseEmail: this.data.supervisor.spouseEmail,
    numberOfChildren: this.data.supervisor.numberOfChildren,
    children: this.data.children.map((child: Child) => ({
      fullName: child.fullName,
      dob: child.dob,
      _id: child._id || undefined // include _id if present for updates
    }))
  };

  console.log('PATCH FAMILY PAYLOAD:', supervisorPayload);

  this.pagesService.patchFamilyDetails(this.staffId, supervisorPayload).subscribe({
    next: (res) => {
      console.log('✅ Family details updated successfully:', res);
    },
    error: (err) => {
      console.error('❌ Error updating family details:', err);
    }
  });
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