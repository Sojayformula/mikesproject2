import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  imports: [FormsModule, CommonModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {

  APIData: any[] = [];

  constructor(private pageService:PagesService, private router:Router){}

  ngOnInit(): void {
    this.fetchAllStaff()
  }

  fetchAllStaff(){
    this.pageService.getAllStaff().subscribe({
      next: (res)=>{
        this.APIData = res.data;
         console.log('response data', res)
          console.log('APIData response', this.APIData)
       
      },

      error: (err)=>{
        console.log('Failed to fetch staff', err)
      }
    })
  }

  navigate(item:string){
    // this.router.navigate([`/person-information?staffId=${id}`])
    // const data =  JSON.stringify(item)
    this.router.navigateByUrl(`/editstaff-layout?staffId=${item}`)
  }

}
