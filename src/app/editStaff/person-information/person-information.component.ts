import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getStaffModel, unitModel } from '../../model/pagesModel';
import { PagesService } from '../../service/pages.service';

@Component({
  selector: 'app-person-information',
  imports: [CommonModule, FormsModule],
  templateUrl: './person-information.component.html',
  styleUrl: './person-information.component.scss'
})
export class PersonInformationComponent implements OnInit{

  staffdata: any[] = [];
  staffModel!: getStaffModel
  storedMaritalData: string = ''; 
  staffId: any;

  constructor(private router: Router, private pagesService: PagesService,private route:ActivatedRoute){

    this.staffModel = new getStaffModel()
  }



   ngOnInit(): void {
   const item = this.route.snapshot.queryParamMap.get('staffId');
  this.staffId = item; 

  //  const  item = this.route.snapshot.queryParamMap.get('staffId')
  
    console.log("my id:", JSON.parse(JSON.stringify(item)))
  //  this.fetchMaritalStatus() 

     if (this.staffId) {
      this.fetchStaffData();
     }
  
  }


    fetchStaffData() {
    this.pagesService.getUserById(this.staffId, this.staffModel).subscribe({
      next: (res) => {
        this.staffdata = res || []; 
        console.log('Fetched staff data:', this.staffdata);
      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      }
    });
    }
  



//   fetchStaffData() {
//   this.pagesService.getUserById().subscribe({
//     next: (res) => {
//       console.log('get me marital status', res);

//       this.APIData = res.data || [];
//       console.log('Updated APIData:', this.APIData);
//     },
//     error: (error) => {
//       console.error('Error fetching marital status:', error);
//     },
//     complete: () => {}
//   });
// }

onSubmit(form:NgForm){}



  selectedFile!: File;
imagePreview: string | ArrayBuffer | null = null;

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

}
