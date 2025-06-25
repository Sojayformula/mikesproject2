import { Component } from '@angular/core';
import { allStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emergency-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './emergency-contact.component.html',
  styleUrl: './emergency-contact.component.scss'
})

export class EmergencyContactComponent2 {



   emergencyData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

   editMode =false
   originalData: any

  constructor(private router:Router, private pagesService:PagesService, private route:ActivatedRoute){
    this.getAllStaff = new allStaffModel
  }


  ngOnInit(): void {
      const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item; 

  //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
    console.log("my id:", JSON.parse(JSON.stringify(item)))

    //this.etchEmergencyData()
    
  }



    //  etchEmergencyData() {
    // this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
    //   next: (res ) => {
    //     this.emergencyData = res; 
    //     console.log('Fetched emergency data:', this.emergencyData);
    //      this.isLoading = false;

    //   },
    //   error: (err) => {
    //     console.error('Error fetching staff:', err);
    //   },

    //      complete: () => {

    //      }
    // });
    // }


  //  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.emergencyData));
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.emergencyData = JSON.parse(JSON.stringify(this.originalData)); 
}


    Submit(form:NgForm){}
 

}










