import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { Location } from '@angular/common';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { getStaffModel } from '../../model/pagesModel';


@Component({
  selector: 'app-person-information',
  imports: [CommonModule, FormsModule],
  templateUrl: './person-information.component.html',
  styleUrl: './person-information.component.scss'
})
export class PersonInformationComponent implements OnInit{

   staffData: any = {};  
  getStaffModel: getStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  loading = true;

  constructor(private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService,
  private typingStatusService: CheckboxService,){

    this.getStaffModel = new getStaffModel()
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

       this.staffData = this.staffDataService.getData();

  //        this.staffData = {
  //   supervisor: { nationality: '', maritalStatus: '' }, 
  // };

    if (!this.staffData.supervisor) {
    this.staffData.supervisor = { nationality: '', maritalStatus: '' };
  }

  }




// ngOnInit(): void {
//   const item = this.route.snapshot.queryParamMap.get('staffId');
//   this.staffId = item; 

//   console.log("my id:", this.staffId);

//   // Step 1: Fetch staff data if staffId is available
//   if (this.staffId) {
//     this.fetchStaffData();
//   }

//   // Step 2: Get staff data from the service
//   this.staffData = this.staffDataService.getData();

//   // Step 3: Check if staffData exists before accessing supervisor
//   if (this.staffData && !this.staffData.supervisor) {
//     this.staffData.supervisor = { nationality: '', maritalStatus: '' };
//   }
// }







    fetchStaffData() {
    this.getStaffModel = new getStaffModel()
    this.pagesService.getUserById(this.staffId, this.getStaffModel).subscribe({
      next: (res ) => {
        this.staffData = res;
         this.staffDataService.setData(this.staffData); // ✅ store data 
        console.log('Fetched staff data:', this.staffData);
         this.loading = false;
        
      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }


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



get formattedDOB(): string {
  const date = this.staffData?.supervisor?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.staffData.supervisor.dateOfBirth = value;
}

 goBack(){
    this.location.back()
  }

  //   onInputChange(field: string, value: string) {
  //   this.staffData[field] = value;
  //   this.staffDataService.setData({ [field]: value });

  //   const isTyping = Object.values(this.staffData).some(val => val && val.toString().trim().length > 0);
  //   this.checkboxService.setTypingStatus('person-information', isTyping);
  // }

  onInputChange(field: string, value: string) {
  this.staffData.supervisor[field] = value;

  this.staffDataService.setData({ supervisor: this.staffData.supervisor });

  // Detect typing (check if any field has value)
  const isTyping = Object.values(this.staffData.supervisor).some(
    val => val && val.toString().trim().length > 0
  );
  this.checkboxService.setTypingStatus('person-information', isTyping);
}




}
