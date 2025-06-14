import { CommonModule } from '@angular/common';
//import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pageslayout',
  imports: [RouterModule, CommonModule],
  templateUrl: './pageslayout.component.html',
  styleUrl: './pageslayout.component.scss'
})
export class PageslayoutComponent {

  constructor(private router:Router){}

logout(){
  localStorage.removeItem('token')
  this.router.navigate(['/homepage'])
}


mobileMenuOpen = false;

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

  

}
