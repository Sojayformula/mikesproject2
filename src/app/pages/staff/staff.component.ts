import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagesService } from '../../service/pages.service';
import { Router } from '@angular/router';
import { allStaffModel } from '../../model/pagesModel';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-staff',
  imports: [FormsModule, CommonModule, NzModalModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent implements OnInit {

  APIData: any;

  allStaff: allStaffModel
  staffId!: string;
  



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
    this.pageService.fetchStaff(this.allStaff).subscribe({
      next: (res)=>{
        this.APIData = res.data || [];
         console.log('response data', res)
          console.log('APIData response', this.APIData)
       
      },

      error: (err)=>{
        console.log('Failed to fetch staff', err)
      },

      complete:()=>{
        console.log('complete')
      }
    })
  }


  // pendingDeleteId: string | null = null;

getdeleteStaff(id: string){
  this.modal.confirm({
    nzTitle: 'Are you sure you want to delete this staff?',
    nzContent: 'This action cannot be undone.',
    nzOkText: 'Delete',
    nzCancelText: 'Cancel', 
    nzOkDanger: true,
    nzWrapClassName: 'custom-confirm-modal',
    nzOnOk: () => {

      this.pagesService.deleteStaff(id).subscribe({
        next: (res) => {
          this.createNotification('topRight','success', res.message || 'Staff deleted successfully','Deleted!');
          this.fetchAllStaff();
        },
        error: (err) => {
          this.createNotification('topRight', 'error', 'Failed to delete staff', 'Error');
        }
      });
    },
   
    nzOnCancel: () => {
      this.createNotification('topRight', 'info', 'Staff deletion was cancelled', 'Cancelled');
    }
  });
}


  addNavigate(item:string){
    // this.router.navigate([`/person-information?staffId=${id}`])
    // const data =  JSON.stringify(item)
    this.router.navigateByUrl(`/editsettings?staffId=${item}`)      
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