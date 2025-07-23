import { Component } from '@angular/core';
import { addNewStaffModel, allStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddstaffService } from '../../../addstaffservice/addstaff.service';
import { FormsServiceService } from '../formService/forms-service.service';
import { CheckboxService } from '../../../checkboxService/checkbox.service';

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



   formData = {
   emergencyContactFullName: '',
    emergencyContactRelationship: '',
    emergencyContactPhoneNumber: '',
    emergencyContactEmail: '',
    emergencyContactCurrentAddress: '',
};


  resetForm() {
    this.  formData = {
   emergencyContactFullName: '',
    emergencyContactRelationship: '',
    emergencyContactPhoneNumber: '',
    emergencyContactEmail: '',
    emergencyContactCurrentAddress: '',
};
  }


  constructor(private router:Router, private pagesService:PagesService, private route:ActivatedRoute,
   public formService:AddstaffService, public formsServiceService: FormsServiceService, private checkboxService: CheckboxService
  ){
    this.getAllStaff = new allStaffModel
  }


ngOnInit() {
  this.formData = this.formsServiceService.formData || {};
  console.log('Loaded form data in ngOnInit:', this.formData);
}





  //  Edit  function
onEditToggle() {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.emergencyData));
}

// Cancel function
onCancel() {
  this.editMode = false;
  this.emergencyData = JSON.parse(JSON.stringify(this.originalData)); 
}


  
  allowOnlyLetters(event: KeyboardEvent): void {
  const charCode = event.key;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault(); 
  }
}



    


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


  


steps: string[] = [];


// private hasEdited: boolean = false;
private previousStatus: boolean = false;
private debounceTimeout: any = null;

onInputChange(): void {
  // this.hasEdited = true;
  console.log('onInputChange triggered');

   clearTimeout(this.debounceTimeout);

   this.debounceTimeout = setTimeout(() => {
    const requiredFields: string[] = [
      'emergencyContactFullName',
    'emergencyContactRelationship',
    'emergencyContactPhoneNumber',
    'emergencyContactEmail',
    'emergencyContactCurrentAddress',
    ];

    const isComplete = requiredFields.every(field => {
      const val = (this.formData as any)[field];
      console.log(`🔍 ${field}:`, val);
      return val !== null && val !== undefined && val.toString().trim().length > 0;
    });

    console.log('✅ Form complete:', isComplete);

    if (isComplete !== this.previousStatus) {
      this.checkboxService.setTypingStatus('emergency-contact', isComplete);
      this.previousStatus = isComplete;
      console.log(isComplete ? '☑️ Checkbox ticked' : '⬜ Checkbox unticked');
    }
   }, 50);
  }

}










