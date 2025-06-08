import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxService } from '../../checkboxService/checkbox.service';


@Component({
  selector: 'app-employment-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './employment-details.component.html',
  styleUrl: './employment-details.component.scss'
})
export class EmploymentDetailsComponent {

    currentStep = 0;

   constructor(private router: Router, private location:Location, private typingStatusService: CheckboxService){}


    goBack(){
    this.location.back()
  }

  onSubmit(form:NgForm){}

  

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // ✅ This line sets the typing status for this step
    this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
  }

// onInputChange(event: Event) {
//   const input = event.target as HTMLInputElement;
//   const value = input.value;
//   this.typingStatusService.setTypingStatus('employment-details', value.trim().length > 0);
// }



}

