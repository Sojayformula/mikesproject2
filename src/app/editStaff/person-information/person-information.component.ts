import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { Location } from '@angular/common';
import { StaffDataService } from '../../StaffDataService/staff-data.service';
import { CheckboxService } from '../../checkboxService/checkbox.service';
import { allStaffModel, editStaffModel, getStaffModel } from '../../model/pagesModel';
import imageCompression from 'browser-image-compression';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { MatProgressSpinner } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-person-information',
  imports: [CommonModule, FormsModule, MatProgressSpinner],
  templateUrl: './person-information.component.html',
  styleUrl: './person-information.component.scss'
})
export class PersonInformationComponent implements OnInit{

  currentStepIndex = 0;
   staffData: any={};  
   editStaffData: editStaffModel;
  getStaffModel: getStaffModel;
  getAllStaff: allStaffModel;
  selectedStaff: any={};
  storedMaritalData: string = ''; 
  staffId: any;
  isLoading = false;
  
  // selectedFile!: File;
imagePreview: string | ArrayBuffer | null = null;


  constructor(private router: Router, private pagesService: PagesService,
    private route:ActivatedRoute, private location:Location, 
    private staffDataService: StaffDataService,private checkboxService:CheckboxService,
  ){

    this.getStaffModel = new getStaffModel()
    this.editStaffData = new editStaffModel()

      this.getAllStaff = new allStaffModel()
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

  }




    fetchStaffData() {
    this.pagesService.getUserById(this.staffId, this.getAllStaff).subscribe({
      next: (res ) => {
        this.staffData = res; 
        console.log('Fetched staff data:', this.staffData);
         this.isLoading = false;

      },
      error: (err) => {
        console.error('Error fetching staff:', err);
      },

         complete: () => {

         }
    });
    }


 getSafeProfilePicture(pic?: string): string {
  if (!pic) return '/assets/default-profile.png'; // fallback image if missing
  return pic.replace(/^"|"$/g, '');
}




   


// selectedFile: File | null = null;


async onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 100,
    useWebWorker: true,
  };

  try {
    // Compress the image
    const compressedFile = await imageCompression(file, options);

    // Convert compressed file to base64 string for preview and submission
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.staffData.profilePicture = this.imagePreview;
    };
    reader.readAsDataURL(compressedFile);
  } catch (error) {
    console.error('Image compression failed:', error);
    alert('Failed to compress image. Please try another one.');
  }
}







get formattedDOB(): string {
  const date = this.staffData?.dateOfBirth;
  return date ? formatDate(date, 'yyyy-MM-dd', 'en-US') : '';
}

set formattedDOB(value: string) {
  this.staffData.supervisor.dateOfBirth = value;
}

 goBackToPersonalInfo(){
    this.location.back()
  }

  next(){
    this.router.navigate(['edit-personal-info'])
  }

  onInputChange(field: string, value: string) {
  this.staffData.supervisor[field] = value;

  this.staffDataService.setData({ supervisor: this.staffData.supervisor });

  // Detect typing (check if any field has value)
  const isTyping = Object.values(this.staffData.supervisor).some(
    val => val && val.toString().trim().length > 0
  );
  this.checkboxService.setTypingStatus('person-information', isTyping);
}




editMode: boolean = false;
originalStaffData: any;

onEditToggle(): void {
  this.editMode = true;
  
}

onCancel(): void {
  this.editMode = false;
 
}



onSubmit(form: NgForm): void {
  this.isLoading =true;
 const payload = {
    _id: this.staffId, 
    profilePicture: this.staffData?.profilePicture || '',
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    otherName: form.value.otherName || '',
    email: form.value.email,
    dateOfBirth: form.value.dateOfBirth,
    nationality: form.value.nationality,
    gender: form.value.gender,
    idType: form.value.idType,
    phoneNumber: form.value.phoneNumber,
    idNumber: form.value.idNumber,
    maritalStatus: form.value.maritalStatus
  };

  console.log('Submitting payload:', this.editStaffData);


  this.pagesService.getEditStaff(this.staffId, payload ).subscribe({
    next: (res) => {
      console.log('patch', res)
      //  alert('Form updated successfull')
       this.isLoading = false;

    },

    error: (err) => {
      console.log('error', err)
      console.log('Failed to submit form')
      alert('Form update failed')
    }
  })
 }


}