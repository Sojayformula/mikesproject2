    import { CommonModule } from '@angular/common';
    import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
    import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
//import { environment } from '../../environment/environment';
import { loginModel } from '../../model/login-model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NzNotificationService } from 'ng-zorro-antd/notification';


    @Component({
      selector: 'app-signin',
      imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
      templateUrl: './signin.component.html',
      styleUrl: './signin.component.scss'
    })
    export class SigninComponent {

    
      loginData: loginModel

      show = false;
      isLoading = false
      email: string = '';
      password: string = '';


    constructor(private router:Router, private authService:AuthService, private notification: NzNotificationService){

      this.loginData = new loginModel()
    }

    forgotPassword(){
      this.router.navigate(['/forgotpassword']);
    }

   createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   }); 
  }


  
 

    onSubmit(item:NgForm){
       this.isLoading = true;
       console.log('Login payload:', this.loginData);


        this.authService.login(this.loginData).subscribe({
          next: (res) => {
            console.log('Login successfully:', res);

             localStorage.setItem('token', res.token);
            
            localStorage.setItem('token', res.token);
            const token = localStorage.getItem('token')
            console.log('toke', token)

            localStorage.setItem('userId', res._id);
            const userId = localStorage.getItem('userId');
            console.log('Logged-in User ID:', userId);


             this.router.navigate(['/dashboard'])
            this.createNotification('topRight', "success", "Login Successful!!", "Welcome Back!")
           

            // if(res.isFirstLogin == true ){
            //   this.router.navigate(['resetpassword'])
            // }else{
            //   this.router.navigate(['dashboard'])
            // }
            this.isLoading = true;
          
          },
          error: (err) => {
            console.error('Login failed:', err);
            this.createNotification("topRight", "error", "Login Failed!!", "Invalid Credentials!")
            this.isLoading = false
          }
        });
    }


    }







//      import { CommonModule } from '@angular/common';
//      import { Component } from '@angular/core';
//  import { FormsModule, NgForm } from '@angular/forms';
//      import { Router } from '@angular/router';
//  import { AuthService } from '../../service/auth.service';
//  import { environment } from '../../environment/environment';
//  import { loginModel } from '../../model/login-model';
 

// @Component({
//   selector: 'app-signin',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './signin.component.html'
// })
// export class SigninComponent {
//   loginData: loginModel = {
//     email: '',
//     password: ''
//   };

//   constructor(private router:Router, private authService:AuthService){}

//   onSubmit(form: NgForm) {
//     if (form.invalid) {
//       alert('Please fill in all required fields');
//       return;
//     }

//     this.authService.login(this.loginData).subscribe({
//       next: (res) => {
//         console.log('Login success:', res);

//         // Save token
//         localStorage.setItem('token', res.token);

//         // Redirect
//         if (res.isFirstLogin === true) {
//           this.router.navigate(['/updatePassword']);
//         } else {
//           this.router.navigate(['/dashboard']);
//         }
//       },
//       error: (err) => {
//         console.error('Login failed:', err);
//         alert('Invalid login credentials');
//       }
//     });
//   }
// }
