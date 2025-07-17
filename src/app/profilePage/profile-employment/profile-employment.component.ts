
import { CommonModule, formatDate, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { PagesService } from '../../service/pages.service';
import { allStaffModel, EditEmploymentModel, EditProfileNextOfKinModel, editStaffModel } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { EditService } from '../../editservice/edit.service';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-profile-employment',
  imports: [FormsModule, CommonModule, MatProgressSpinner],
  templateUrl: './profile-employment.component.html',
  styleUrl: './profile-employment.component.scss'
})
export class ProfileemploymentDetailsComponent implements OnInit{
  // @ViewChild('formRef') formRef!: NgForm;

    units: any
    supervisor: any
    staffData: any
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
     form: any={}

     isFormComplete: boolean = false;



    
  


 


   constructor(public editService:EditService, private staffDataService: StaffDataService, private router: Router, private location:Location, private route:ActivatedRoute, 
    private typingStatusService: CheckboxService, private pagesService: PagesService, public checkboxService:CheckboxService,
    private cd: ChangeDetectorRef ){

      this.getAllStaff = new allStaffModel()
       this.editStaffData = new editStaffModel()

   }


   ngOnInit(): void {
  
  //  this.route.queryParamMap.subscribe((params) => {
  //   const item = params.get('staffId');
  //   this.staffId = item;

  //   console.log("my id:", this.staffId);

  // });

   
      this.fetchEmployees(); 
    
    
     this.fetchUnits();
     this.fetchSupervisors();


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


   fetchEmployees() {
    this.pagesService.getLoggedInUserProfile().subscribe({
      next: (res ) => {
        this.employeeData = res; 
        console.log('Fetched staff data:', this.employeeData);
         this.isLoading = false;

          this.employeeData = structuredClone(res);     
          this.originalStaffData = structuredClone(res);
          console.log('Fetched staff data:', this.employeeData);

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
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




onSubmit(form: NgForm) {
  this.isLoading = true;

const payload: Partial<EditProfileNextOfKinModel> = {
  _id: this.staffId,
  employmentType: form.value.employmentType,
  jobTitle: form.value.jobTitle,
  unit: [form.value.unitId], 
  hireDate: form.value.hireDate,
  workLocation: form.value.workLocation,
  supervisor: [form.value.supervisorId], 
  educationDetails: []

  };

  console.log('PATCH payload:', payload);
  console.log('Unit being sent:', form.value.unitId);
console.log('Supervisor being sent:', form.value.supervisorId);


  this.pagesService.patchEmployment(this.staffId, payload).subscribe({
    next: (res) => {
      console.log('Success:', res);
      this.isLoading = false;
    },
    error: (err) => {
      console.error('Error:', err);
      alert('Update failed');
      this.isLoading = false;
    }
  });
}

}