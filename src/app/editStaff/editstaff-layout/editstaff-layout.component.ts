import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';

@Component({
  selector: 'app-editstaff-layout',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editstaff-layout.component.html',
  styleUrl: './editstaff-layout.component.scss'
})
export class EditstaffLayoutComponent {

  steps = ['person-information', 'employment-details', 'family-details', 'next-of-kins', 'emengency-contact', 'education-details' ];
  currentStepIndex = 0;

  isChecked = false;
  inputValue = '';
  staffId: any
  employeeData: any;
  isSidebarOpen = false;
 

  isCheckedMap: { [key: string]: boolean } = {};


    constructor( private staffDataService:StaffDataService, 
      private location:Location, private router: Router, private route:ActivatedRoute, 
      private typingStatusService: CheckboxService){

  }



 ngOnInit() {
  // Initialize all as false
  this.steps.forEach(step => this.isCheckedMap[step] = false);
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



  

  onInputChange() {
    this.isChecked = this.inputValue.trim().length > 0;
  }

  

}
