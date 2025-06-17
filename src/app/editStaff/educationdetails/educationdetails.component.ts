import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, editStaffModel, PatchEducationPayload } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './educationdetails.component.html',
  styleUrl: './educationdetails.component.scss'
})
export class EducationdetailsComponent implements OnInit {

  // educationData: any = {};
   getAllStaff: allStaffModel
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false
   editEduData: editStaffModel;

   educationData = {
  educationDetails: [
    {
      institutionName: '',
      courseOfStudy: '',
      startDate: '',
      endDate: ''
    },
    {
      institutionName: '',
      courseOfStudy: '',
      startDate: '',
      endDate: ''
    }
  ]
};




  constructor(private route:ActivatedRoute, private pagesService:PagesService, private staffDataService:StaffDataService){
    this.getAllStaff = new allStaffModel()
    this.editEduData = new editStaffModel()

      this.educationData = {
  educationDetails: [
    {
      institutionName: '',
      courseOfStudy: '',
      startDate: '',
      endDate: ''
    },
    {
      institutionName: '',
      courseOfStudy: '',
      startDate: '',
      endDate: ''
    }
  ]
};
  }



  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);
        this.fetchEduDetails();
  });




  }


//    fetchEduDetails() {
//     this.pagesService.getUEduById(this.staffId).subscribe({
//       next: (res) => {
//          const employee = res.data?.find((staff: any) => staff._id === this.staffId);

//         if (employee) {
//           this.staffDataService.setData(employee); 
//           this.educationData = employee; 
//           console.log('Education Data Assigned:', this.educationData.educationDetails);
// console.log('Length of educationDetails:', this.educationData.educationDetails.length);

//            console.log('Response:', res);
//           console.log('Matched Employee:', this.educationData);
      
//         } else {
//          console.warn('No matching employee found for staffId:', this.staffId);
//         }
//       },
//       error: (err) => {
//         console.error('Failed to fetch data', err);
//       }
//     });
//   }






   fetchEduDetails() {
    this.pagesService.getUEduById(this.staffId).subscribe({
      next: (res) => {
      this.educationData = res;
      console.log('educationDetails:', this.educationData.educationDetails);
      console.log('Length:', this.educationData.educationDetails?.length);

      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
  }







  
  // fetchEduDetails() {
  //   this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
  //     next: (res ) => {
  //       this.educationData = res; 
  //       console.log('Fetched staff data:', this.educationData);
  //        this.isLoading = false;

  //     },
  //     error: (err) => {
  //       console.error('Error fetching staff:', err);
  //     },

  //        complete: () => {

  //        }
  //   });
  //   }


 






// onSubmit(eduform: NgForm): void {
//   this.isLoading = true;

//   const payload = {
//     _id: this.staffId,
//     educationDetails: this.educationData.educationDetails
//   };

//   // this.pagesService.patchEducation(this.staffId, payload).subscribe({
//     this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
//     next: (res) => {
//       console.log('PATCH response:', res);

//       // 🔥 Update local form data with latest from backend
//       if (res?.educationDetails) {
//         this.educationData.educationDetails = res.educationDetails;
//       }

//       this.editMode = false; // Exit edit mode
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.log('error', err);
//       alert('Form update failed');
//       this.isLoading = false;
//     }
//   });
// }




onSubmit(eduform: NgForm): void {
  if (!eduform.valid) return;

  this.isLoading = true;

  // const payload = {
  //   _id: this.staffId,
  //   educationDetails: this.educationData.educationDetails
  // };

  const payload: PatchEducationPayload = {
  _id: this.staffId,
  educationDetails: this.educationData.educationDetails
};


  this.pagesService.patchEducation(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('PATCH response:', res);

      if (res?.educationDetails) {
        this.educationData.educationDetails = res.educationDetails;
      }

      this.editMode = false;
      this.isLoading = false;
    },
    error: (err) => {
      console.error('error', err);
      alert('Form update failed');
      this.isLoading = false;
    }
  });
}









// this.educationData = JSON.parse(JSON.stringify(employee));





editMode: boolean = false;
originalStaffData: any;

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


}
