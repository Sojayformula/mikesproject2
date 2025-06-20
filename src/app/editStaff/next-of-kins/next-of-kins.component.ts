import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxService } from '../../checkboxService/checkbox.service';

@Component({
  selector: 'app-next-of-kins',
  imports: [FormsModule, CommonModule],
  templateUrl: './next-of-kins.component.html',
  styleUrl: './next-of-kins.component.scss'
})
export class NextOfKinsComponent implements OnInit {

  nextOfKinsData: any
  staffId: any
   getAllStaff: allStaffModel;
   isLoading = false

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

    this.fetchNextOfKinData()
    
  }



     fetchNextOfKinData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.nextOfKinsData = res; 
        console.log('Fetched staff data:', this.nextOfKinsData);
         this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }

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

  Submit(){}

}