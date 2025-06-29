import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddstaffService {

  constructor() { }


   formData: any = {
    firstName: '',
    lastName: '',
    otherName: '',
    dod: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
    phoneNumber: '',
    email: '',
    idType: '',
    idNumber: ''
  
  };

  steps = ['personal-information', 'employment-details', 'family-details', 'next-of-kin',  'emergency-contact', 'education-details'];

  getCurrentStepIndex(url: string): number {
    return this.steps.findIndex(step => url.includes(step));
  }

  getNextStep(currentUrl: string): string | null {
    const index = this.getCurrentStepIndex(currentUrl);
    return this.steps[index + 1] ?? null;
  }

  getPrevStep(currentUrl: string): string | null {
    const index = this.getCurrentStepIndex(currentUrl);
    return this.steps[index - 1] ?? null;
  }

}
