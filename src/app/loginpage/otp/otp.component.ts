import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-otp',
  imports: [FormsModule, CommonModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OTPComponent {

  otp: string[] = ['', '', '', '', '', ''];
  

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private router:Router, private authService: AuthService){}
  reset(){
    this.router.navigate(['/resetpassword'])
  }

  onInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (/^\d$/.test(value)) {
       this.otp[index] = value;
      if (index < 5) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      }
    } else {
      this.otp[index] = '';
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otp[index] && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }


   email: string = '';

  submitOtp() {
     const otpValue = this.otp.join(''); 
 

     const payload = {
    otp: otpValue,
  };
    // const otpValue = this.otp.join('');
    // console.log('Entered OTP:', otpValue);

    console.log('otp Payload', payload)

    this.authService.otp(payload).subscribe({
      next:(res)=>{
        console.log( res)
         this.router.navigate(['/resetpassword']);
      },

      error:(err)=>{
        console.log('Failed to submit', err)
      }
    })
   
  }



 
  trackByIndex(index: number, item: any): number {
    return index;
  }
  

}
