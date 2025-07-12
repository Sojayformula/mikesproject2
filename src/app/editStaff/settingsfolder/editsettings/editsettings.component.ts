import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { addNewStaffModel, allStaffModel, editStaffModel, getStaffModel } from '../../../model/pagesModel';
import { Subscription } from 'rxjs';
import { StaffDataService } from '../../../StaffDataService/staff-data.service';
import { PagesService } from '../../../service/pages.service';
import { EditService } from '../../../editservice/edit.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import imageCompression from 'browser-image-compression';
import { Location } from '@angular/common';
import { PersonalInformationComponent2 } from '../personal-information/personal-information.component';
import { EmploymentDetailsComponent2 } from '../employment-details/employment-details.component';

@Component({
  selector: 'app-editsettings',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './editsettings.component.html',
  styleUrl: './editsettings.component.scss'
})
export class EditsettingsComponent implements OnInit {
   

    steps = ['personal-information', 'employment-details', 'family-details', 'next-of-kin', 'emergency-contact', 'education-details' ];
   currentStepIndex = 0;
  employeeData: any
  isChecked = false;
  inputValue = '';
  isSidebarOpen = false;
  staffId: any
 
  formData: Partial<addNewStaffModel> = {};
  isCheckedMap: { [key: string]: boolean } = {};

   constructor( private staffDataService:StaffDataService, private cd: ChangeDetectorRef, public editService:EditService, 
      private editControlService:EditService, private location:Location, private router: Router, private route:ActivatedRoute, 
      private typingStatusService: CheckboxService){

      // this.steps.forEach(step => this.isCheckedMap[step] = false);
  }




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

 
mobileMenuOpen = false;

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
  
}



goToNext() {
  if (this.currentStepIndex < this.steps.length - 1) {
    this.currentStepIndex++;
    this.router.navigate([`/editsettings/${this.steps[this.currentStepIndex]}`], {
      queryParamsHandling: 'preserve'
    });
  }
}

goToPrev() {
  if (this.currentStepIndex > 0) {
    this.currentStepIndex--;
    this.router.navigate([`/editsettings/${this.steps[this.currentStepIndex]}`], {
      queryParamsHandling: 'preserve'
    });
  }
}

}




























// ngOnInit() {
//   // this.steps.forEach(step => this.isCheckedMap[step] = false);


//   //  this.steps.forEach(step => this.isCheckedMap[step] = false);
//   // this.typingStatusService.typingStatus$.subscribe((statusMap) => {
//   //   this.steps.forEach((step) => {
//   //     this.isCheckedMap[step] = !!statusMap[step];
//   //   });

//   //   this.cd.detectChanges(); 
//   // });

//   //  const item = this.route.snapshot.queryParamMap.get('staffId');
//   // this.staffId = item; 
//   //  console.log("my id:", JSON.parse(JSON.stringify(item)))

//   this.route.queryParamMap.subscribe(params => {
//     const staffId = params.get('staffId');
//     console.log('staffId from query:', staffId);
//   });

// }



  // submitAll(): void {
  //   this.childComponents.forEach((child) => child.submit());
  // }

