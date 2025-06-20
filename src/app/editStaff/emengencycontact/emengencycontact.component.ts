import { Component, ViewChild } from '@angular/core';
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
  @ViewChild('formRef') formRef!: NgForm;


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

  //  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.emergencyData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.emergencyData = JSON.parse(JSON.stringify(this.originalData)); // restore
}


    Submit(form:NgForm){}
 

}
