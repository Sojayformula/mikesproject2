import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  imports: [],
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {

  constructor(private router:Router){}

    MPPage(){
    this.router.navigate(['/MPpageslayout2/MPdashboard'])
  }

  //  MPdashboard    MPpageslayout2

}
