
import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, editStaffModel, EducationDetailModel, PatchEducationPayload } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CheckboxService } from '../../checkboxService/checkbox.service';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
   templateUrl: './profile-education.component.html',
  styleUrl: './profile-education.component.scss'
})
export class ProfileEducationComponent implements OnInit {


  educationData: any = {};
   getAllStaff: allStaffModel
  //  editEduData: EducationDetailModel;
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false
   

   editMode: boolean = false;
originalStaffData: any;


  constructor(private route:ActivatedRoute, private pagesService:PagesService, 
    private staffDataService:StaffDataService, public checkboxService: CheckboxService ){
    this.getAllStaff = new allStaffModel()
    
  }



  ngOnInit() {
  
        this.fetchEduDetails();


  }


  fetchEduDetails() {
  this.pagesService.getLoggedInEduProfile(this.getAllStaff).subscribe({
    next: (res) => {
       const staff = res.data || res;

      this.educationData = {
        educationDetails: staff?.supervisor?.educationDetails || []
      };

      console.log('educationDetails:', this.educationData.educationDetails);
      console.log('Length:', this.educationData.educationDetails.length);
    },
    error: (err) => {
      console.error('Failed to fetch data', err);
    }
  });
}




      // CHECK BOX LOGIC
    onInputChange(value: any, field: string) {
    if (field && this.educationData) {
      (this.educationData as any)[field] = value;

      this.staffDataService.setData(this.educationData);

      const isTyping = Object.values(this.educationData).some(
        val => val && val.toString().trim().length > 0
      );

      this.checkboxService.setTypingStatus('education-details', isTyping);
    }

     
  }


onSubmit(eduform: NgForm): void {
  if (!eduform.valid) return;

  this.isLoading = true;
 
   const formData = new FormData();
formData.append('_id', this.staffId);
formData.append('educationDetails', JSON.stringify(this.educationData.educationDetails));
for (let i = 0; i < this.selectedFiles.length; i++) {
  formData.append('files', this.selectedFiles[i]);
}


  this.pagesService.patchEducation(this.staffId, formData).subscribe({
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

onEditToggle(): void {
  this.editMode = true;
  
}

onCancel(): void {
  this.editMode = false;
 
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