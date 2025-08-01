import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mppageslayouty',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mppageslayouty.component.html',
  styleUrl: './mppageslayouty.component.scss'
})
export class MPPageslayoutyComponent {

  constructor(private router: Router){}

  //  dropdownOpen = false


  //  toggleDropdown() {
  //   this.dropdownOpen = !this.dropdownOpen;
  // }

  //    back(){
  //   this.router.navigate(['/tools'])
  // }


  dropdownOpen = false;
mobileMenuOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

back() {
  // Add your navigation logic here
}



}
