import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { allStaffModel, editStaffModel } from '../../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './education-background.component.html',
  styleUrl: './education-background.component.scss'
})
export class EducationBackgroundComponent2 implements OnInit {



  
 
   getAllStaff: allStaffModel
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false
   editEduData: editStaffModel;

   editMode: boolean = false;
originalStaffData: any;

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
        //this.etchEduDetails();
  });

  }


  //  etchEduDetails() {
  //   this.pagesService.getUEduById(this.staffId).subscribe({
  //     next: (res) => {
  //     this.educationData = res;
  //     console.log('educationDetails:', this.educationData.educationDetails);
  //     console.log('Length:', this.educationData.educationDetails?.length);

  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch data', err);
  //     }
  //   });
  // }



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

}

