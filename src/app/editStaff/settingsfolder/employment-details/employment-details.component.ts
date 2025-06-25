import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EditService } from '../../../editservice/edit.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { PagesService } from '../../../service/pages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { allStaffModel } from '../../../model/pagesModel';
import { CommonModule, formatDate } from '@angular/common';
import { Location } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-employment-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './employment-details.component.html',
  styleUrl: './employment-details.component.scss'
})
export class EmploymentDetailsComponent2 {



   employeeData: any = {}
    currentStep = 0;
    getAllStaff: allStaffModel;
     staffId: any
     selectedEmployee: string =''
     selectedStep: string = '';
     originalData: any;

     selectedFiles: File[] = [];
     isDragging = false;

     editMode: boolean = false;
     originalStaffData: any;
     isLoading = false

    

 

   constructor(public editService:EditService, private staffDataService: StaffDataService, private router: Router, private location:Location, private route:ActivatedRoute, 
    private typingStatusService: CheckboxService, private pagesService: PagesService){

      this.getAllStaff = new allStaffModel()

   }


   ngOnInit(): void {

   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

  });

   if (this.staffId) {
      //this.etchEmployees(); 
    } 

  // this.steps.forEach(step => this.isCheckedMap[step] = false);

   }

  // etchEmployees() {
  //   this.pagesService.getAllStaff(this.staffId, this.getAllStaff).subscribe({
  //     next: (res) => {
  //       const employee = res.data.find((staff: any) => staff._id === this.staffId);
  //       if (employee) {
  //         this.staffDataService.setData(employee); 
  //         this.employeeData = employee;            
  //         console.log('Matched Employee:', this.employeeData);
  //       } else {
        
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch data', err);
  //     }
  //   });
  // }


    goBack(){
    this.location.back()
  }

  onSubmit(form:NgForm){}

  

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // ✅ This line sets the typing status for this step
    this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
  }
  

 get formattedDOB(){
  const date = this.employeeData?.supervisor.hireDate;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}
set formattedDOB(value: string) {
  this.employeeData.supervisor.hireDate = value;
} 





currentStepIndex = 0;
steps = ['personal-details', 'education', 'employment-details', 'review']; // Example steps
isCheckedMap: { [key: string]: boolean } = {};



// goToNext() {
//   if (this.currentStepIndex < this.steps.length - 1) {
//     const currentStep = this.steps[this.currentStepIndex];
//     this.isCheckedMap[currentStep] = true; // Mark current step as complete
//     this.currentStepIndex++;

//     const nextStep = this.steps[this.currentStepIndex];
//     this.router.navigate([nextStep], { queryParamsHandling: 'preserve' });
//   }
// }

// goToPrev() {
//   if (this.currentStepIndex > 0) {
//     this.currentStepIndex--;
//     const prevStep = this.steps[this.currentStepIndex];
//     this.router.navigate([prevStep], { queryParamsHandling: 'preserve' });
//   }
// }





//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.employeeData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.employeeData = JSON.parse(JSON.stringify(this.originalData)); // restore
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





}
