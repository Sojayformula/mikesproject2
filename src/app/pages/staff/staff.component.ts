import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { Router } from '@angular/router';
import { allStaffModel } from '../../model/pagesModel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@Component({
  selector: 'app-staff',
  imports: [FormsModule, CommonModule, NzModalModule, MatProgressSpinner, NzSpinModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {

  APIData: any;

  allStaff: allStaffModel
  staffId!: string;
  isLoading = false


 @Input() title = 'Confirm';
  @Input() content = 'Are you sure?';
 
  



  constructor(private pageService:PagesService, private router:Router, private pagesService: PagesService,
    private notification: NzNotificationService, private modal: NzModalService,
  ){

    this.allStaff = new allStaffModel()
  }

  ngOnInit(): void {
    this.fetchAllStaff()
  }


     createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   }); 
  }



 
  fetchAllStaff(){
     this.isLoading = true
    this.pageService.fetchStaff(this.allStaff).subscribe({
      next: (res)=>{
        this.APIData = res.data || [];
         console.log('response data', res)
          console.log('APIData response', this.APIData)
           this.isLoading = false
          
      },

      error: (err)=>{
        console.log('Failed to fetch staff', err)
        this.isLoading = true
      },

      complete:()=>{
        console.log('complete')
      }
    })
  }



selectedStaffIdToDelete: string | null = null;
showDeleteModal = false;

cancelDeleteStaff() {
  this.resetDeleteModal();
}

resetDeleteModal() {
  this.selectedStaffIdToDelete = null;
  this.showDeleteModal = false;
}

getdeleteStaff(id: string) {
  this.selectedStaffIdToDelete = id;
  this.showDeleteModal = true;
}

confirmDeleteStaff() {
  if (!this.selectedStaffIdToDelete) return;

  this.pagesService.deleteStaff(this.selectedStaffIdToDelete).subscribe({
    next: (res) => {
      console.log('Delete staff', res)
      this.notification.success('Deleted!', res.message || 'Staff deleted successfully');
      this.fetchAllStaff();
    },
    error: () => {
      this.notification.error('Error', 'Failed to delete staff');
    },
    complete: () => {
      this.resetDeleteModal();
    }
  });
}




 // addNavigate(item:string){
  //   // this.router.navigate([`/person-information?staffId=${id}`])
  //   // const data =  JSON.stringify(item)
    
  //   this.router.navigateByUrl(`/editsettings?staffId=${item}`)       
  // }
addNavigate(id: string) {
  this.isLoading = true;

  this.router.navigateByUrl(`/editsettings?staffId=${id}`)
    .catch((error) => {
      console.error('Navigation failed:', error);
    })
    .finally(() => {
      this.isLoading = false;
    });
}



  navigate(item: any) {
  const staffId = typeof item === 'string' ? item : item._id;
  console.log('Navigating with staffId:', staffId);
  this.router.navigate(['/editstaff-layout/person-information'], {
    queryParams: { staffId }
  });
}

}












              // Delete function //
// getdeleteStaff(id: string) {
//     // if (confirm('Are you sure you want to delete this unit?')) {
//       if (this.pendingDeleteId !== id) {
//     this.pendingDeleteId = id;

//     this.createNotification(
//       'topRight',
//       'warning',
//       'Click delete again to confirm staff deletion',
//       'Are you sure?'
//     );
//   }



//     this.pagesService.deleteStaff(id).subscribe({
//       next: (res) => {
//         // alert(res.message || 'Unit deleted successfully');
//          this.createNotification('topRight','success', res.message || 'Staff deleted successfully', 'Deleted!');
//         this.fetchAllStaff(); 
//       },
//       error: (err) => {
//         console.error('Delete failed:', err);
//         alert('Failed to delete unit');
//       }
//     });
//   //}
// }


 // addNavigate(item:string){
  //   // this.router.navigate([`/person-information?staffId=${id}`])
  //   // const data =  JSON.stringify(item)
    
  //   this.router.navigateByUrl(`/editsettings?staffId=${item}`)       
  // }