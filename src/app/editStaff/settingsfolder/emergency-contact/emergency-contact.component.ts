import { Component } from '@angular/core';
import { addNewStaffModel, allStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';

@Component({
  selector: 'app-emergency-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})

export class EmergencyContactComponent2 {



   emergencyData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

   editMode =false
   originalData: any
   formData: Partial<addNewStaffModel> = {};

  constructor(private router:Router, private pagesService:PagesService, private route:ActivatedRoute,
   public formService:AddstaffService, public formsServiceService: FormsServiceService
  ){
    this.getAllStaff = new allStaffModel
  }


ngOnInit() {
  this.formData = this.formsServiceService.formData || {};
  console.log('Loaded form data in ngOnInit:', this.formData);
}



    //  etchEmergencyData() {
    // this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
    //   next: (res ) => {
    //     this.emergencyData = res; 
    //     console.log('Fetched emergency data:', this.emergencyData);
    //      this.isLoading = false;

    //   },
    //   error: (err) => {
    //     console.error('Error fetching staff:', err);
    //   },

    //      complete: () => {

    //      }
    // });
    // }


  //  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.emergencyData));
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.emergencyData = JSON.parse(JSON.stringify(this.originalData)); 
}


    Submit(form:NgForm){}



    


  get isLastStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getNextStep(currentUrl) === null;
  }

  get isFirstStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getPrevStep(currentUrl) === null;
  }

 goNext() {
  this.formsServiceService.updateData(this.formData);
  const next = this.formsServiceService.getNextStep(this.router.url);
  if (next) {
    this.router.navigate([next]);
  }
}

  goPrev() {
    const currentUrl = this.router.url;
    const prev = this.formsServiceService.getPreviousStep(currentUrl);
    if (prev) {
      this.router.navigate([prev], { relativeTo: this.route.parent });
    }
  }
 

}










