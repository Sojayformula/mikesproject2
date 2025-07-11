import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { resetPasswordModel } from '../../model/login-model';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {

  // newPassword: string = '';
  // confirmPasword: string = '';
  // newPassword: string
  show = false
  onShow = false
  //  resetpassword: resetPasswordModel


  constructor(private authService: AuthService, private router: Router){
    // this.resetpassword = new resetPasswordModel()
  }

    payload ={
       newPassword: '',
       confirmPassword: ''
    }

  submit(){
    console.log('Reset payload', this.payload)
    console.log('payload', this.payload)
    this.authService.resetPassWord(this.payload).subscribe({
      next:(res)=>{
        console.log('Reset password', res)
        if(res.message === 200){
        this.router.navigate(['signin'])
        }
      },

      error:(err)=>{
        console.log('Failed to reset password', err)
      },

      complete:()=>{
        console.log('complete')
      }
    })
  }

}

//  this.notification.create("error", "Sorry, Password Reset Unsuccesful!!", "Invalid OTP or OTP expired.");
//         this.router.navigate(["/auth/forgotpassword"]);

  //  if(response.status == '201'){
  //         this.loading= false;

  //         this.notification.create("success", "Password Reset Succesfully!!", "Login with your new password.");
  //         this.router.navigate(["/auth/signin"])
  //         console.log('almost there');
  //       }