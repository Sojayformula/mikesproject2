import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';

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

  isCheckedMap: { [key: string]: boolean } = {};


    constructor(private location:Location, private router: Router, private typingStatusService: CheckboxService){

  this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const step = this.steps.find(s => event.url.includes(s));
        if (step) {
          this.currentStepIndex = this.steps.indexOf(step);
        }
      });

    this.typingStatusService.typingStatus$.subscribe((statusMap) => {
      this.isCheckedMap = { ...statusMap };
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



  

  onInputChange() {
    this.isChecked = this.inputValue.trim().length > 0;
  }

  



}
