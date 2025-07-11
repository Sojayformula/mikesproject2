import { CommonModule } from '@angular/common';
//import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-pageslayout',
  imports: [RouterModule, CommonModule],
  templateUrl: './pageslayout.component.html',
  styleUrl: './pageslayout.component.scss'
})
export class PageslayoutComponent {

  constructor(private router:Router, private authService: AuthService){}

logout(){
  this.authService.logout
  this.router.navigate(['/homepage'])
}

mobileMenuOpen = false;

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
  
}





  

}
