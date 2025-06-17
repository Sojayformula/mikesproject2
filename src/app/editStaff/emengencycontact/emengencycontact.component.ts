import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { allStaffModel } from '../../model/pagesModel';
import { PagesService } from '../../service/pages.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emengency-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './emengencycontact.component.html',
  styleUrl: './emengencycontact.component.scss'
})
export class EmengencycontactComponent {

  emergencyData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

  constructor(private router:Router, private pagesService:PagesService, private route:ActivatedRoute){
    this.getAllStaff = new allStaffModel
  }


  ngOnInit(): void {
      const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item; 

  //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
    console.log("my id:", JSON.parse(JSON.stringify(item)))

    this.fetchEmergencyData()
    
  }



     fetchEmergencyData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.emergencyData = res; 
        console.log('Fetched emergency data:', this.emergencyData);
         this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }

  //     goBack(){
  //   this.location.back()
  // }

    onSubmit(form:NgForm){}
 

}
