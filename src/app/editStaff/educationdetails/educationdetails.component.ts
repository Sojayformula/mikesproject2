import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, EditEmploymentModel, editStaffModel, EducationDetail, EducationDetailModel, PatchEducationPayload } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { NzNotificationContainerComponent, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './educationdetails.component.html',
  styleUrl: './educationdetails.component.scss'
})
export class EducationdetailsComponent implements OnInit {


  educationData: any = {};
   getAllStaff: allStaffModel
  //  editEduData: EducationDetailModel;
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;
  isLoading = false
  isAPILoading = false
   

   editMode: boolean = false;
originalStaffData: any;



  constructor(private route:ActivatedRoute, private pagesService:PagesService, 
    private staffDataService:StaffDataService, public checkboxService: CheckboxService, private notification: NzNotificationService ){
    this.getAllStaff = new allStaffModel()
  
  }



  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);
        this.fetchEduDetails();
  });

  }



    createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   })
    }



fetchEduDetails() {
  this.isAPILoading = true
  this.pagesService.getUEduById(this.staffId, this.getAllStaff).subscribe({
    next: (res) => {
      const staff = res.data || res;

      this.educationData = {
        educationDetails: staff.educationDetails?.length
          ? staff.educationDetails
          : staff.supervisor?.educationDetails || []
      };
        this.isAPILoading = false
      console.log('educationDetails:', this.educationData.educationDetails);
      console.log('Length:', this.educationData.educationDetails.length);
    },
    error: (err) => {
      console.error('Failed to fetch data', err);
    }
  });
}



 allowOnlyLetters(event: KeyboardEvent){
  const ltters = event.key;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(ltters)) {
    event.preventDefault(); 
  }
}


      // ADD MORE LOGIC //
addMoreEducation() {
  this.educationData.educationDetails.push({
    institutionName: '',
    courseOfStudy: '',
    startDate: '',
    endDate: ''
  });

  console.log('Updated educationDetails:', this.educationData.educationDetails);
}


// removeEducation(index: number) {
//   this.educationData.educationDetails.splice(index, 1);
// }

removeEducation(index: number) {
  this.educationData.educationDetails.splice(index, 1);

  const payload= {
    _id: this.staffId,
    educationDetails: this.educationData.educationDetails
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
//   onInputChange(value: any, field: string) {
//   if (field && this.educationData?.educationDetails?.length) {
//     (this.educationData.educationDetails[0] as any)[field] = value;

//     this.staffDataService.setData(this.educationData);

//     const isTyping = Object.values(this.educationData.educationDetails[0]).some(
//       val => val && val.toString().trim().length > 0
//     );

//     this.checkboxService.setTypingStatus('education-details', isTyping);
//   }
// }












onSubmit(form: NgForm) {
  if (form.invalid) return;

  this.isLoading = true;

  const payload: Partial<EducationDetail> = {
    _id: this.staffId,
    educationDetails: this.educationData.educationDetails.map((edu: EducationDetailModel) => ({
      _id: edu._id,
      institutionName: edu.institutionName,
      courseOfStudy: edu.courseOfStudy,
      startDate: edu.startDate,
      endDate: edu.endDate
    }))
  };

  this.pagesService.patchEmployment(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('Success:', res);
      this.isLoading = false;
      this.createNotification('topRight', "success", "update Successful!!", "Updated!")
    },
    error: (err) => {
      console.error(' Error:', err);
      this.isLoading = false;
      alert('Update failed');
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


//   onSubmitEducation(form: NgForm) {
//   const payload = {
//     staffId: this.staffId,
//      institutionName: form.value.institutionName,
//   courseOfStudy: form.value.courseOfStudy,
//   startDate: form.value.startDate,
//   endDate: form.value.endDate,
//     // educationDetailsModel: this.educationData.educationDetails
//   };

//   console.log('Submitting education data:', payload);

//   this.pagesService.postEducation(this.staffId, this.payload).subscribe({
//     next: (res) => {
//       console.log('Successfully submitted education data:', res);
//       alert('Education details saved successfully!');
//     },
//     error: (err) => {
//       console.error('Error submitting education data:', err);
//       alert('Failed to save education details.');
//     }
//   });
// }


}









//   removeFile(index: number) {
//   this.selectedFiles.splice(index, 1);
// }

//  onDragOver(event: DragEvent) {
//     event.preventDefault();
//     this.isDragging = true;
//   }

//   onDragLeave(event: DragEvent) {
//     event.preventDefault();
//     this.isDragging = false;
//   }


//   onDrop(event: DragEvent) {
//   event.preventDefault();
//   this.isDragging = false;
//   const files = event.dataTransfer?.files;
//   if (files && files.length > 0) {
//     this.addFiles(files);
//   }
// }

//   onFileSelected(event: Event) {
//   const input = event.target as HTMLInputElement;
//   if (input.files) {
//     this.addFiles(input.files);
//   }
// }



//   addFiles(fileList: FileList) {
//   for (let i = 0; i < fileList.length; i++) {
//     this.selectedFiles.push(fileList[i]);
//   }
// }
