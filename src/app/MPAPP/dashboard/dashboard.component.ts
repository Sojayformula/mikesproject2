import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Notification } from '../../model/pagesModel';
import { markAsReadModel} from '../../model/pagesModel';


import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PagesService } from '../../service/pages.service';

@Component({
  selector: 'app-MPdashboard',
  imports: [CommonModule, FormsModule, NzTabsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class MPDashboardComponent implements OnInit {

    todayNotifications: Notification[] = [];
  yesterdayNotifications: Notification[] = [];
   notificationData: any
   notificationCount: any
   notificationModel:  markAsReadModel
   dropdownOpen = false
  selectedChoice = 'Today'
  showNotificationModal = false

 
   constructor(private router: Router, private pageService: PagesService){
    this.notificationModel = new markAsReadModel
   }
  

  ngOnInit(): void {
    this.fetchNotifications()
  }




 fetchNotifications() {
  this.pageService.getNotification().subscribe((res) => {
    const allNotifications: Notification[] = res?.data?.Yesterday || [];


    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    this.todayNotifications = [];
    this.yesterdayNotifications = [];

    allNotifications.forEach((notification) => {
      const createdDate = new Date(notification.createdAt);
      const isUnread = !notification.isRead;

      // Sort by creation date
      if (createdDate.toDateString() === today.toDateString()) {
        this.todayNotifications.push(notification);
      } else if (createdDate.toDateString() === yesterday.toDateString()) {
        this.yesterdayNotifications.push(notification);
      }
    });

    // Count only unread notifications
    this.notificationCount = [
      ...this.todayNotifications,
      ...this.yesterdayNotifications
    ].filter(n => !n.isRead).length;
  });
}






markAsRead(notification: Notification) {
  if (notification.isRead) return;

  notification.isRead = true;

  this.notificationCount = [
    ...this.todayNotifications,
    ...this.yesterdayNotifications
  ].filter(n => !n.isRead).length;

  const payload = { notificationId: notification._id };

  this.pageService.markNotificationAsRead(payload).subscribe({
    next: (res) => {
      console.log('Notification marked as read:', res);
      this.fetchNotifications(); 
    },
    error: (err) => {
      console.error('Failed to mark as read', err);
      notification.isRead = false;

      this.notificationCount = [
        ...this.todayNotifications,
        ...this.yesterdayNotifications
      ].filter(n => !n.isRead).length;
    }
  });
}







// markAsRead(notification: Notification) {
//   if (notification.isRead) return; // already read

//   // Optimistically mark it read in the UI
//   notification.isRead = true;

//   this.pageService.markNotificationAsRead(this.notificationModel).subscribe({
//     next: (res) => {
//       console.log('Notification marked as read', res);
      
//     },
//     error: (err) => {
//       console.error('Error marking as read', err);
//       // Optional: Revert in case of failure
//       notification.isRead = false;
//     }
//   });
// }

// markAsRead(notification: Notification) {
//   if (notification.isRead) return; // already read

//   // Optimistically mark it read in the UI
//   notification.isRead = true;

//   // ⬇️ Update notification count immediately
//   this.notificationCount = [
//     ...this.todayNotifications,
//     ...this.yesterdayNotifications
//   ].filter(n => !n.isRead).length;

//   this.pageService.markNotificationAsRead(this.notificationModel).subscribe({
//     next: (res) => {
//       console.log('✅ Notification marked as read', res);
//       // Optionally: refresh the full list if needed
//       // this.fetchNotifications();
//     },
//     error: (err) => {
//       console.error('Error marking as read', err);
//       // Optional: revert change if server call fails
//       notification.isRead = false;

//       // Recalculate again in case of failure
//       this.notificationCount = [
//         ...this.todayNotifications,
//         ...this.yesterdayNotifications
//       ].filter(n => !n.isRead).length;
//     }
//   });
// }




//   fetchNotifications() {
//   this.pageService.getNotification().subscribe((res) => {
//     const allNotifications: Notification[] = res?.data?.Yesterday || [];

//     const today = new Date();
//     const yesterday = new Date();
//     yesterday.setDate(today.getDate() - 1);

//     this.todayNotifications = [];
//     this.yesterdayNotifications = [];

//     allNotifications.forEach((notification) => {
//       const created = new Date(notification.createdAt);
//       const createdDateStr = created.toDateString();

//       if (createdDateStr === today.toDateString()) {
//         this.todayNotifications.push(notification);
//       } else if (createdDateStr === yesterday.toDateString()) {
//         this.yesterdayNotifications.push(notification);
//       }
//     });

//     this.notificationCount = this.todayNotifications.length + this.yesterdayNotifications.length;
//   });
// }



// markAsRead(notificationId: string) {
//   this.pageService.markNotificationAsRead(this.notificationModel).subscribe({
//     next: (res) => {
//       this.todayNotifications = this.todayNotifications.filter(n => n._id !== notificationId);
//       this.yesterdayNotifications = this.yesterdayNotifications.filter(n => n._id !== notificationId);
//       this.notificationCount--;
//     },
//     error: (err) => {
//       console.error('Failed to mark as read', err);
//     }
//   });
// }



     toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }


  closeNotificationModal(){
    this.showNotificationModal = false
  }

  openNotificationModal(){
    this.showNotificationModal = true
  }

          // MODAL LINKS //
  activeTab: 'All' | 'Read' | 'Unread' = 'All';

  setTab(tab: 'All' | 'Read' | 'Unread') {
    this.activeTab = tab;
  }


    // Function to Toggle ALL APPROVED PENDING DECLINE

  // toggleSelect(item:string){
  //   this.employeeData.employeeStatus = item === 'ALL' ? '' : item;
  //   this.selectedChoice = item;
  //   this.getEmployees();
   
  //   console.log("toggle some",item);
  // }

}



