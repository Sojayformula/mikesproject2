import { Injectable } from '@angular/core';
import { addNewStaffModel } from '../../../model/pagesModel';

@Injectable({
  providedIn: 'root'
})
export class FormsServiceService {

  constructor() { }

  readonly FORM_STEPS = [
  '/editsettings/personal-information',
  '/editsettings/employment-details',
  '/editsettings/family-details',
  '/editsettings/next-of-kin',
  '/editsettings/emergency-contact',
  '/editsettings/education-details'
];

   formData: any = {
     spouseName: '',
  spousePhone: '',
  spouseEmail: '',
  numberOfChildren: 2,
  children: [
    { fullName: '', dob: '' },
    { fullName: '', dob: '' }
  ]
   };
//   formData: Partial<addNewStaffModel> = {
  // spouseName: '',
  // spousePhone: '',
  // spouseEmail: '',
  // numberOfChildren: 2,
  // children: [
  //   { fullName: '', dob: '' },
  //   { fullName: '', dob: '' }
  // ]
// };


  updateData(data: any) {
    console.log('Updating formData with:', data);
    this.formData = { ...this.formData, ...data };
    console.log('Updated formData:', this.formData);
  }
   

  getNextStep(currentUrl: string): string | null {
    const index = this.FORM_STEPS.indexOf(currentUrl);
    console.log('Current URL:', currentUrl, 'Index:', index);
    return this.FORM_STEPS[index + 1] || null;
  }

  getPreviousStep(currentUrl: string): string | null {
    const index = this.FORM_STEPS.indexOf(currentUrl);
    return this.FORM_STEPS[index - 1] || null;
  }
  
}




































 //    formData: Partial<addNewStaffModel> = {};

  // updateData(data: Partial<addNewStaffModel>) {
  //   this.formData = { ...this.formData, ...data };
  //   localStorage.setItem('formData', JSON.stringify(this.formData));
  // }

  // loadData() {
  //   const stored = localStorage.getItem('formData');
  //   if (stored) {
  //     this.formData = JSON.parse(stored);
  //   }
  // }

  // reset() {
  //   this.formData = {};
  //   localStorage.removeItem('formData');
  // }
  //   private readonly FORM_STEPS = [
  //   'personal-information',
  //   'employment-details',
  //   'family-details',
  //   'next-of-kin',
  //   'emergency-contact',
  //   'education-details'
  // ];
