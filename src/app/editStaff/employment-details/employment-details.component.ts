import { CommonModule, formatDate, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, EditEmploymentModel, editStaffModel } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EditService } from '../../editservice/edit.service';
import { ChangeDetectorRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-employment-details',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './employment-details.component.html',
  styleUrl: './employment-details.component.scss'
})
export class EmploymentDetailsComponent implements OnInit{
  // @ViewChild('formRef') formRef!: NgForm;

    units: any
    supervisor: any

    editStaffData: editStaffModel
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
     isSaveLoading = false
     form: any={}

     isFormComplete: boolean = false;



    formData: any = {
  jobTitle: '',
  employmentType: '',
  hireDate: '',
  unit: [],
 supervisor: []
};
  


 


   constructor(public editService:EditService, private staffDataService: StaffDataService, private router: Router, private location:Location, private route:ActivatedRoute, 
    private typingStatusService: CheckboxService, private pagesService: PagesService, public checkboxService:CheckboxService,
    private cd: ChangeDetectorRef, private notification: NzNotificationService ){

      this.getAllStaff = new allStaffModel()
       this.editStaffData = new editStaffModel()

   }


   ngOnInit(): void {
  
   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

  });

   if (this.staffId) {
      this.fetchEmployees(); 
    }
    
     this.fetchUnits();
     this.fetchSupervisors();

  // this.steps.forEach(step => this.isCheckedMap[step] = false);

    // this.checkboxService.formComplete$.subscribe(status => {
    //   this.isFormComplete = status;
    // });

    // this.employeeData = this.staffDataService.getEmpl();


    this.steps.forEach(step => {
  this.isCheckedMap[step] = this.typingStatusService.getTypingStatus(step); // Load real values
});


 this.steps.forEach(step => this.isCheckedMap[step] = false);

  this.typingStatusService.typingStatus$.subscribe((statusMap) => {
    this.steps.forEach((step) => {
      this.isCheckedMap[step] = !!statusMap[step];
    });

    this.cd.detectChanges(); 
  })
   }



         createNotification(position: 'topRight', type: 'success' | 'info' | 'warning' | 'error', title: string, message: string){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000})
  }



   fetchEmployees() {
    this.isLoading = true
    console.log('EmployeeData', this.employeeData)
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.employeeData = res.data; 
        console.log('Fetched staff data:', this.employeeData);
         this.isLoading = false;

          this.employeeData = structuredClone(res);     
          this.originalStaffData = structuredClone(res);
          console.log('Fetched staff data:', this.employeeData);

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
        this.isLoading = false;
      },

         complete: () => {

         }
    });
    }



fetchUnits() {
  this.pagesService.getUnits().subscribe({
    next: (res) => {
      const unitMap = new Map<string, { _id: string; name: string }>();
      
      for (const staff of res.data) {
        const unit = staff.unit;
        if (unit && typeof unit === 'object' && unit._id && unit.name) {
          unitMap.set(unit._id, { _id: unit._id, name: unit.name });
        }
      }

      this.units = Array.from(unitMap.values());
      console.log('Extracted units from staff:', this.units);
    },
    error: (err) => {
      console.error('Failed to fetch staff list:', err);
    }
  });
}



fetchSupervisors() {
  this.pagesService.getStaff().subscribe({
    next: (res) => {
      this.supervisor = res.data;
      console.log('dropdown supervisor', res)
    },
    error: (err) => {
      console.error('Failed to fetch supervisors:', err);
    }
  });
}

    //  CHECK BOX LOGIC
  //   onInputChange(value: any, field: string) {
  //   if (field && this.employeeData) {
  //     this.employeeData[field] = value;

  //     this.staffDataService.setData(this.employeeData);

  //     const isTyping = Object.values(this.employeeData).some(
  //       val => val && val.toString().trim().length > 0
  //     );

  //     this.checkboxService.setTypingStatus('employment-details', isTyping);
  //   }
  // }

//   getFieldValue(field: string): any {
//   switch (field) {
//     case 'jobTitle': return this.employeeData?.supervisor?.jobTitle;
//     case 'employmentType': return this.employeeData?.employmentType;
//     case 'workLocation': return this.employeeData?.workLocation;
//     case 'hireDate': return this.formattedDOB;
//     case 'unit': return this.form?.units;
//     case 'supervisor': return this.form?.supervisor;
//     default: return '';
//   }
// }


// onInputChange() {
//   const requiredFields = [
//     'jobTitle',
//     'employmentType',
//     'workLocation',
//     'hireDate',
//     'unit',
//     'supervisor'
//   ];

//   const isComplete = requiredFields.every(fieldName => {
//     const val = this.getFieldValue(fieldName);
//     return val !== null && val !== undefined && val.toString().trim().length > 0;
//   });

//   this.checkboxService.setTypingStatus('employment-details', isComplete);
// }



steps: string[] = [];
 
  getFieldValue(field: string): any {
  switch (field) {
    case 'jobTitle': return this.employeeData?.supervisor?.jobTitle;
    case 'employmentType': return this.employeeData?.employmentType;
    case 'workLocation': return this.employeeData?.workLocation;
    case 'hireDate': return this.formattedDOB;
    case 'unit': return this.form?.units;
    case 'supervisor': return this.form?.supervisor;
    default: return '';
  }
}


onInputChange() {
  const requiredFields = [
    'jobTitle',
    'employmentType',
    'workLocation',
    'hireDate',
    'unit',
    'supervisor',
  ];

  const isComplete = requiredFields.every(fieldName => {
    const val = this.getFieldValue(fieldName);
    return val !== null && val !== undefined && val.toString().trim().length > 0;
  });

  this.checkboxService.setTypingStatus('employment details', isComplete);
}


currentStepIndex = 0;
//  step = ['personal-details', 'employment-details', 'education',  'review']; 
isCheckedMap: { [key: string]: boolean } = {};





  //  CONVERTED DATE LOGIC
get formattedDOB(): string {
  const date = this.employeeData?.supervisor?.hireDate;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  if (this.employeeData?.supervisor) {
    this.employeeData.supervisor.hireDate = value;
  }
}





//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.employeeData)); // deep copy takes you back to original data after clicking cancel
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




// onSubmit(form: NgForm) {
//   this.isLoading = true;

// const payload: Partial<EditEmploymentModel> = {
//   _id: this.staffId,
//   employmentType: form.value.employmentType,
//   jobTitle: form.value.jobTitle,
//   unit: [form.value.unitId], 
//   hireDate: form.value.hireDate,
//   workLocation: form.value.workLocation,
//   supervisor: [form.value.supervisorId], 
//   educationDetails: []

//   };

//   console.log('PATCH payload:', payload);
//   console.log('Unit being sent:', form.value.unitId);
// console.log('Supervisor being sent:', form.value.supervisorId);


//   this.pagesService.patchEmployment(this.staffId, payload).subscribe({
//     next: (res) => {
//       console.log('Success:', res);
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('Error:', err);
//       alert('Update failed');
//       this.isLoading = false;
//     }
//   });
// }


onSubmit(form: NgForm) {
  this.isLoading = true;

  const payload: Partial<EditEmploymentModel> = {
    _id: this.staffId,
    jobTitle: form.value.jobTitle,
    staffId: form.value.staffId,
    employmentType: form.value.employmentType,
    //unit: [form.value.unitId], 
    hireDate: form.value.hireDate, 
    workLocation: form.value.workLocation,
    //supervisor: [form.value.supervisorId], //  convert to array
    // role: form.value.roleId, // if you're using role in the form
    // emergencyContactFullName: form.value.emergencyContactFullName // if this field exists
  };

  console.log('PATCH payload:', payload);

  this.pagesService.patchEmployment(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('Success:', res);
       this.createNotification('topRight', "success", "update Successful!!", "Updated!")
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error:', err);
      alert('Update failed');
      this.isLoading = false;
    }
  });
}

// onSubmit(form: NgForm) {
//   this.isLoading = true;

//   // const payload = {
//   //   staffId: form.value.staffId || this.staffId,
//   //   jobTitle: form.value.jobTitleText,
//   //   employmentType: form.value.employmentType,
//   //   unit: [form.value.unitId],
//   //   hireDate: form.value.hireDate,
//   //   workLocation: form.value.workLocation,
//   //   supervisor: form.value.supervisorId ? [form.value.supervisorId] : [],
//   //   role: form.value.roleId,
//   //   emergencyContactFullName: form.value.emergencyContactFullName
//   // };
//   const payload: any = {
//   staffId: form.value.staffId || this.staffId,
//   jobTitle: form.value.jobTitleText,
//   employmentType: form.value.employmentType,
//   unit: [form.value.unitId],
//   hireDate: form.value.hireDate,
//   workLocation: form.value.workLocation,
//   role: form.value.roleId,
//   emergencyContactFullName: form.value.emergencyContactFullName
// };

//   console.log('✅ PATCH payload:', payload);

//   this.pagesService.patchEmployment(this.staffId, payload).subscribe({
//     next: (res) => {
//       console.log('✅ Success:', res);
//       this.isLoading = false;
//     },
//     error: (err) => {
//       console.error('❌ Error:', err.error);
//       alert('Update failed: ' + err.error?.message || 'Unknown error');
//       this.isLoading = false;
//     }
//   });
// }




}


























// onEditToggle(): void {
//   this.editMode = true;
  
// }

// onCancel(): void {
//   this.editMode = false;
 
// }

// Submit(form:NgForm){}


//   const data = this.staffDataService.getData();
  // if (data) {
  //   this.employeeData = data;
  //   console.log('✅ Received data in child:', this.employeeData);
  // } else {
  //   console.warn('⚠️ No staff data found in service');
  // }
  //   // this.fetchEmployees();
  //     if (this.staffId) {
  //   this.fetchEmployees();
  // } else {
  //   console.warn('staffId is not set!');
  // }

  // reset() {
//   this.employeeData = structuredClone(this.originalData); // Restore original
// }

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


  //   goBack(){
  //   this.location.back()
  // }

 

  

  // onInputChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   const value = input.value;

  //   // This line sets the typing status for this step
  //   this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
  // }

// // onInputChange(event: Event) {
// //   const input = event.target as HTMLInputElement;
// //   const value = input.value;
// //   this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
// // }
