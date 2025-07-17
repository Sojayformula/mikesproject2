
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




@Component({
  selector: 'app-profile-page-layout',
  imports: [RouterModule, CommonModule, FormsModule],
templateUrl: './profile-page-layout.component.html',
  styleUrl: './profile-page-layout.component.scss'
})
export class ProfilePageLayoutComponent {

 
  steps = ['profile-personal', 'profile-employment', 'profile-family', 'profile-next-of-kins', 'profileemergencycontact', 'education-details' ];
  currentStepIndex = 0;
  // employeeData: any
  isChecked = false;
  inputValue = '';
  isSidebarOpen = false;
  staffData: any
  staffId: any
 

  isCheckedMap: { [key: string]: boolean } = {};

   constructor( private staffDataService:StaffDataService, private cd: ChangeDetectorRef, public editService:EditService, 
      private editControlService:EditService, private location:Location, private router: Router, private route:ActivatedRoute, 
      private typingStatusService: CheckboxService, private checkboxService: CheckboxService, private pagesService:PagesService){

      this.steps.forEach(step => this.isCheckedMap[step] = false);
  }

        handleInputChange(step: string, hasValue: boolean) {
       this.isCheckedMap[step] = hasValue;
  }



ngOnInit() {
  

     this.route.paramMap.subscribe(params => {
      this.staffId = params.get('id') || '';
      console.log('Staff ID:', this.staffId); 
    });


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


}