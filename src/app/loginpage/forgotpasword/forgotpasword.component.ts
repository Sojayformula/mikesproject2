import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { forgotpasswordModel } from '../../model/forgotpassword-model';

@Component({
  selector: 'app-forgotpasword',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgotpasword.component.html',
  styleUrl: './forgotpasword.component.scss'
})
export class ForgotpaswordComponent {

   errorMessage = '';
    email: string = '';

  loginData: forgotpasswordModel

  constructor(private router:Router, private authService:AuthService){
    this.loginData = new forgotpasswordModel()
  }
  

  otp(){
    this.router.navigate(['/otp'])
  }

onSubmit(form: NgForm): void {
  const formData = form.value; 

  this.authService.forgotpassword(this.email).subscribe({
    next: (res) => {
      if (res?.response?.success) {
        console.log('OTP sent successfully');
        alert('OTP sent to email');
      } else {
        console.warn('Unexpected response:', res);
        alert('Unexpected server response');
      }

      this.router.navigate(['/otp']);
      // , { queryParams: { email: this.email } }


    },
    error: (error) => {
      console.error('Failed to send OTP:', error);
      alert('Error sending OTP');
    }
  });
}


}























//  onSubmit(item:NgForm) {

  // if (form.invalid) {
  //   alert('Please enter a valid email');
  //   return;
  // }
// this.authService.forgotpassword(this.loginData).subscribe({
//   next: (res) => {
//     if (res?.response?.success) {
//       console.log('OTP sent successfully');
//       alert('OTP sent to email');
//     } else {
//       console.warn('Unexpected response:', res);
//       alert('Unexpected server response');
//     }
//   },
//   error: (error) => {
//     console.error('Failed to send OTP:', error);
//     alert('Error sending OTP');
//   }
// });

// }
