import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { Router } from '@angular/router';
import { allStaffModel } from '../../model/pagesModel';

@Component({
  selector: 'app-staff',
  imports: [FormsModule, CommonModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {

  APIData: any[] = [];

  allStaff: allStaffModel
  



  constructor(private pageService:PagesService, private router:Router){

    this.allStaff = new allStaffModel()
  }

  ngOnInit(): void {
    this.fetchAllStaff()
  }

  fetchAllStaff(){
    this.pageService.fetchStaff(this.allStaff).subscribe({
      next: (res)=>{
        this.APIData = res.data || [];
         console.log('response data', res)
          console.log('APIData response', this.APIData)
       
      },

      error: (err)=>{
        console.log('Failed to fetch staff', err)
      }
    })
  }
  staffId(staffId: any, allStaff: allStaffModel) {
    throw new Error('Method not implemented.');
  }


  // navigate(item:string){
  //   // this.router.navigate([`/person-information?staffId=${id}`])
  //   // const data =  JSON.stringify(item)
  //   this.router.navigateByUrl(`/editstaff-layout?staffId=${item}`)      
  // }

  navigate(item: any) {
  const staffId = typeof item === 'string' ? item : item._id;
  console.log('Navigating with staffId:', staffId);
  this.router.navigate(['/editstaff-layout/person-information'], {
    queryParams: { staffId }
  });
}



}
