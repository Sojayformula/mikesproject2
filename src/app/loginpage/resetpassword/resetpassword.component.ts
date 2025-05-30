import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {

  newPassword: string = '';
  confirmPasword: string = '';
  show = false
  onShow = false


  submit(){}

}
