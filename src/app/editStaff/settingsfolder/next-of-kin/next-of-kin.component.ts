import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { addNewStaffModel, allStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';

@Component({
  selector: 'app-next-of-kin',
  imports: [FormsModule, CommonModule],
  templateUrl: './next-of-kin.component.html',
  styleUrl: './next-of-kin.component.scss'
})
export class NextOfKinComponent2 {



   nextOfKinsData: any
  staffId: any
  //  getAllStaff: allStaffModel;
   isLoading = false

   originalData: any
   editMode = false;

  constructor( private typingStatusService: CheckboxService, private router:Router, private location:Location, 
    private pagesService:PagesService, private route:ActivatedRoute, public formService:AddstaffService,
    public formsServiceService:FormsServiceService
  ){
    // this.getAllStaff = new allStaffModel
  }



   formData: Partial<addNewStaffModel> = {};
//    ngOnInit() {
//    const state = history.state as { formData: Partial<addNewStaffModel> };

//   console.log('History state:', state);

//   if (state?.formData) {
//     this.formData = state.formData;
//     console.log('Loaded form data:', this.formData);
//   } else {
//     console.warn('No formData found in history state');
//   }
// }
ngOnInit() {
  this.formData = this.formsServiceService.formData ;
  console.log('Loaded form data in ngOnInit:', this.formData);
}





    onSubmit(form:NgForm){}
 
  

     goBack(){
    this.location.back()
  }


    onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // ✅ This line sets the typing status for this step
   this.typingStatusService.setTypingStatus('next-of-kins', value.trim().length > 0);

  }

  
//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.nextOfKinsData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.nextOfKinsData = JSON.parse(JSON.stringify(this.originalData)); // restore
}

  Submit(form: NgForm){}




   get isLastStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getNextStep(currentUrl) === null;
  }

  get isFirstStep(): boolean {
    const currentUrl = this.router.url;
    return this.formService.getPrevStep(currentUrl) === null;
  }

  // goNext() {
  //   const currentUrl = this.router.url;
  //   const next = this.formService.getNextStep(currentUrl);
  //   if (next) {
  //     this.router.navigate([next], { relativeTo: this.route.parent });
  //   }
  // }
  //  goNext() {
  //     console.log('Going to next step with form data:', this.formData); 
  //   const currentUrl = this.router.url;
  //   const next = this.formService.getNextStep(currentUrl);
  //   if (next) {
  //     this.router.navigate([next], { relativeTo: this.route.parent });
  //   }
  // }
//     goNext() {
//   console.log('Going to next step with form data:', this.formData); 

//   const currentUrl = this.router.url;
//   const next = this.formService.getNextStep(currentUrl);

//   if (next) {
//     this.router.navigate([next], {
//       relativeTo: this.route.parent,
//       state: { formData: this.formData }  // ✅ Send data here
//     });
//   }
// }

//   goPrev() {
//     const currentUrl = this.router.url;
//     const prev = this.formService.getPrevStep(currentUrl);
//     if (prev) {
//       this.router.navigate([prev], { relativeTo: this.route.parent });
//     }
//   }


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