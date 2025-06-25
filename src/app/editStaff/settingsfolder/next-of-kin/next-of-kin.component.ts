import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxService } from '../../../checkboxService/checkbox.service';
import { allStaffModel } from '../../../model/pagesModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../../service/pages.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-next-of-kin',
  imports: [FormsModule, CommonModule],
  templateUrl: './next-of-kin.component.html',
  styleUrl: './next-of-kin.component.scss'
})
export class NextOfKinComponent2 {



   nextOfKinsData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

   originalData: any
   editMode = false;

  constructor( private typingStatusService: CheckboxService, private router:Router, private location:Location, private pagesService:PagesService, private route:ActivatedRoute){
    this.getAllStaff = new allStaffModel
  }


  ngOnInit(): void {
  //     const item = this.route.snapshot.queryParamMap.get('staffId');
  // this.staffId = item; 

  // //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
  //   console.log("my id:", JSON.parse(JSON.stringify(item)))

   this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);

  });

   // this.etchNextOfKinData()
    
  }



    //  etchNextOfKinData() {
    // this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
    //   next: (res ) => {
    //     this.nextOfKinsData = res; 
    //     console.log('Fetched staff data:', this.nextOfKinsData);
    //      this.isLoading = false;

    //   },
    //   error: (err) => {
    //     console.error('Error fetching staff:', err);
    //   },

    //      complete: () => {

    //      }
    // });
    // }

    onSubmit(form:NgForm){}
 
  

     goBack(){
    this.location.back()
  }


    onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // ✅ This line sets the typing status for this step
   this.typingStatusService.setTypingStatus('next-of-kins', value.trim().length > 0);

  }

  
//  Edit  function
onEditToggle(): void {
  this.editMode = true;
  this.originalData = JSON.parse(JSON.stringify(this.nextOfKinsData)); // deep copy
}

// Cancel function
onCancel(): void {
  this.editMode = false;
  this.nextOfKinsData = JSON.parse(JSON.stringify(this.originalData)); // restore
}

  Submit(form: NgForm){}

}