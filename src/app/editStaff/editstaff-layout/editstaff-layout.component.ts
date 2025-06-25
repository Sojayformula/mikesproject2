import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { filter, take } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';
import { EditService } from '../../editservice/edit.service';
import { EducationdetailsComponent } from '../educationdetails/educationdetails.component';
import { EmploymentDetailsComponent } from '../employment-details/employment-details.component';
import { FamilyDetailsComponent } from '../family-details/family-details.component';
import { PersonInformationComponent } from '../person-information/person-information.component';
import { EmengencycontactComponent } from '../emengencycontact/emengencycontact.component';



@Component({
  selector: 'app-editstaff-layout',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editstaff-layout.component.html',
  styleUrl: './editstaff-layout.component.scss'
})
export class EditstaffLayoutComponent {

  //  @ViewChild(EducationdetailsComponent) educationdetailsComponent!: EducationdetailsComponent;
  // @ViewChild(EmploymentDetailsComponent) employmentDetailsComponent!: EmploymentDetailsComponent;
  // @ViewChild(FamilyDetailsComponent) familyDetailsComponent!: FamilyDetailsComponent;
  //  @ViewChild(PersonInformationComponent) PersonInformationComponent!: PersonInformationComponent;
  // @ViewChild(EmengencycontactComponent) EmergencyContactComponent!: EmengencycontactComponent;

  steps = ['person-information', 'employment-details', 'family-details', 'next-of-kins', 'emengency-contact', 'education-details' ];
  currentStepIndex = 0;
  employeeData: any
  isChecked = false;
  inputValue = '';
  isSidebarOpen = false;
  staffId: any
 

  isCheckedMap: { [key: string]: boolean } = {};

   constructor( private staffDataService:StaffDataService, private cd: ChangeDetectorRef, public editService:EditService, 
      private editControlService:EditService, private location:Location, private router: Router, private route:ActivatedRoute, 
      private typingStatusService: CheckboxService){

      // this.steps.forEach(step => this.isCheckedMap[step] = false);
  }

  //       handleInputChange(step: string, hasValue: boolean) {
  //      this.isCheckedMap[step] = hasValue;
  // }



ngOnInit() {
  this.steps.forEach(step => this.isCheckedMap[step] = false);


   this.steps.forEach(step => this.isCheckedMap[step] = false);
  this.typingStatusService.typingStatus$.subscribe((statusMap) => {
    this.steps.forEach((step) => {
      this.isCheckedMap[step] = !!statusMap[step];
    });

    this.cd.detectChanges(); 
  });

}



  goBack() {
    this.router.navigate(['/staff']); 
  }


goToNext() {
  if (this.currentStepIndex < this.steps.length - 1) {
    const nextStep = this.steps[this.currentStepIndex + 1];
    this.router.navigate([`/editstaff-layout/${nextStep}`], {
      queryParamsHandling: "preserve" 
    });
  }
}

goToPrev() {
  if (this.currentStepIndex > 0) {
    const prevStep = this.steps[this.currentStepIndex - 1];
    this.router.navigate([`/editstaff-layout/${prevStep}`], {
      queryParamsHandling: "preserve"
    });
  }
}

 
mobileMenuOpen = false;

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
  
}

// originalData: any;
// formData: any;

//  save() {
//     console.log('Save called:', this.employeeData);
//     this.originalData = structuredClone(this.employeeData); // update backup
//   }

}



































// toggleEdit() {
//   this.editService.enableEdit();
// }

// onToggleEdit(): void {
//   this.editService.editMode$.subscribe(editMode => {
//     if (editMode) {
//       // Save logic here (e.g., submit form)
//       this.editService.disableEdit();
//     } else {
//       this.editService.enableEdit();
//     }
//   }).unsubscribe(); 
// }


// onToggleEdit(): void {
//   this.editService.editMode$.pipe(take(1)).subscribe(editMode => {
//     if (editMode) {
//       // Save all child forms
//       console.log('Saving all sections...');

//       if (this.PersonInformationComponent?.formRef?.valid) {
//         this.PersonInformationComponent.Submit(this.PersonInformationComponent.formRef);
//       }

//       if (this.familyDetailsComponent?.formRef?.valid) {
//         this.familyDetailsComponent.Submit(this.familyDetailsComponent.formRef);
//       }

//       if (this.educationdetailsComponent?.formRef?.valid) {
//         this.educationdetailsComponent.onSubmit(this.educationdetailsComponent.formRef);
//       }

//       if (this.employmentDetailsComponent?.formRef?.valid) {
//         this.employmentDetailsComponent.Submit(this.employmentDetailsComponent.formRef);
//       }

//        this.editService.disableEdit();
//     } else {
//       this.editService.enableEdit();
//     }
//   });
// }


// cancelEdit(): void {
//   this.editService.disableEdit();
// }
//    cancelEdit(): void {
//   if (this.PersonInformationComponent) {
//     this.PersonInformationComponent.reset();
//   }

//   if (this.familyDetailsComponent) {
//     this.familyDetailsComponent.reset();
//   }

//   // if (this.educationdetailsComponent) {
//   //   this.educationdetailsComponent.reset();
//   // }

//   // if (this.employmentDetailsComponent) {
//   //   this.employmentDetailsComponent.reset();
//   // }

//   // this.editService.disableEdit();
 
// }

// cancelEdit(): void {
//   if (this.PersonInformationComponent) {
//     setTimeout(() => this.PersonInformationComponent.reset(), 0);
//   }
//   this.editService.disableEdit();
// }


//  onToggleEdit() {
//     this.editService.editMode$.subscribe((editing) => {
//       if (editing) {
//         this.educationComponent.save();  // call save in child
//         this.editService.disableEdit();
//       } else {
//         this.editService.enableEdit();
//       }
//     }).unsubscribe();
//   }

//   cancelEdit() {
//     this.educationComponent.reset(); // reset from child
//   }

 //  onEdit() {
  //   this.editControlService.trigger('edit');
  // }

  // onSave() {
  //   this.editControlService.trigger('save');
  // }

  // onCancel() {
  //   this.editControlService.trigger('cancel');
  // }

