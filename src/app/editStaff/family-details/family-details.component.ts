import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, editFamilyModel, PatchEducationPayload } from '../../model/pagesModel';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Child } from '../../model/pagesModel';

@Component({
  selector: 'app-family-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './family-details.component.html',
  styleUrl: './family-details.component.scss'
})
export class FamilyDetailsComponent implements OnInit {

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
 

  constructor(private router:Router, private location:Location, private pagesService:PagesService,
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
      this.fetchFamiltDetails(); 
    }
    // this.fetchFamiltDetails();
  

    this.data = this.staffDataService.getData();
     }

     goBack(){
    this.location.back()
  }


    fetchFamiltDetails() {
    this.pagesService.getAllStaff(this.staffId, this.getAllStaff).subscribe({
      next: (res) => {
        const employee = res.data.find((staff: any) => staff._id === this.staffId);
        if (employee) {
          this.staffDataService.setData(employee); // 🔥 Save globally
          this.data = employee;            // 💾 Local assignment
          console.log('Matched Employee:', this.data);
        } else {
        // console.warn('No matching employee found for staffId:', this.staffId);
        }
      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
  }


   
       



onSubmit(form: NgForm): void {
  if (form.invalid) return;

  // const supervisorPayload: editFamilyModel = {
  //    supervisor: {_id: this.data.supervisor._id,
  //     spouseName: this.data.supervisor.spouseName,
  //     spousePhone: this.data.supervisor.spousePhone,
  //     spouseEmail: this.data.supervisor.spouseEmail,
  //     numberOfChildren: this.data.supervisor.numberOfChildren,
  //     //  children: this.data.supervisor.children.map(child => ({
  //     //   fullName: child.fullName,
  //     //   dob: child.dob,
  //     //   _id: child._id
  //     children: this.data.supervisor.children.map((child: Child) => ({
  // fullName: child.fullName,
  // dob: child.dob,
  // _id: child._id
  //     }))
  //   }
  // };

  const supervisorPayload: editFamilyModel = {
  supervisor: [this.data.supervisor._id], // ✅ Send as an array of MongoDB IDs
  spouseName: this.data.supervisor.spouseName,
  spousePhone: this.data.supervisor.spousePhone,
  spouseEmail: this.data.supervisor.spouseEmail,
  numberOfChildren: this.data.supervisor.numberOfChildren,
  children: this.data.supervisor.children.map((child: Child) => ({
    fullName: child.fullName,
    dob: child.dob,
    _id: child._id
  }))
};


  this.pagesService.patchFamilyDetails(this.staffId, supervisorPayload).subscribe({
    next: (res) => {
      console.log('Supervisor updated successfully');
     
    },
    error: (err) => {
      console.error('Error updating supervisor', err);
    }
  });
}

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
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
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


}
