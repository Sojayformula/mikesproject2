import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data, tableDataModel } from '../MPModel/MPModel';
import { PagesService } from '../../service/pages.service';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { saveAs as fileSaver } from 'file-saver';
import { debounceTime, Subject } from 'rxjs';

//import { saveAs } from 'file-saver';



@Component({
  selector: 'app-manage-ticket',
  imports: [CommonModule, FormsModule, NzPaginationModule],
  templateUrl: './manage-ticket.component.html',
  styleUrl: './manage-ticket.component.scss'
})
export class ManageTicketComponent {

   //@ViewChild('form') form!: NgForm;

  tableData: any = {} 
  page = 1;
  pageSize = 10;
  //totalItems = 5;
   totalItems: number = 0; 
  currentPage = 1;
  dropdownOpen = false
  showCreateModal = false
  showEditModal = false
  searchQuery: string = "";
   searchQuery$ = new Subject<string>();

  showDeleteModal = false
  selectedTicketIdToDelete: string | null = null;

  tableModel!: tableDataModel

 
   manageFormData: Data = {
    subject: '',
    description: '',
    priority: '',
    status: '',
    organizationId: '',
    source: '',
    comments: [],
    unitId: '',
    createdBy: '',
    threadMessageIds: [],
    taggedUsers: [],
    unwatchedUserIds: [],
    docUrls: [],
    placeholders: {
      Institution: '',
      'Phone Number': '',
      'Customer Type': '',
      'Issue Channel': ''
    },
    _id: '',
    ref: '',
    emailThread: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  };



  constructor(private pageService: PagesService){
    this.tableModel = new tableDataModel
    
      this.searchQuery$.pipe(debounceTime(500)).subscribe((searchTerm: string)=>{
          this.searchQuery = searchTerm
          this.searchFunction()
       })

  }


  ngOnInit(): void {
    this.fetchTicket()
  }


  fetchTicket(){
     this.tableModel.page = this.page ;
     this.tableModel.pageSize = this.pageSize;
     this.tableModel.search = this.searchQuery?.trim() || '';
    


    console.log('Table data', this.tableModel)
    this.pageService.getTableTicket(this.tableModel).subscribe({
      next: (res) => {
        this.tableData = res.data

        console.log('API data', res)
      },

      error: (err) =>{
        console.log('Failed to fetch data', err)
      }, 

      complete: ()=>{
        console.log('complete')
      }
    })
  }


       // SEARCH FUNCTION //
  giveTobehaviour(){
    this.searchQuery$.next(this.searchQuery)
  }

  // searchFunction(){
  //   console.log('search query',this.searchQuery)
  //   this.tableModel.search = this.searchQuery.trim();
  //   this.page = 1
  //   this.fetchTicket()
  // }



 

  searchFunction(){
    this.tableModel.search = this.searchQuery
    this.page =1; 
    this.fetchTicket();
  }

  ngOnDestroy(): void {
    this.searchQuery$.complete();
  }


 



exportTableToCSV() {
  const table = document.getElementById('tableData');
  if (!table) return;

  const rows = table.querySelectorAll('thead tr, tbody tr');

  const csvData = Array.from(rows).map(row => {
    const cols = row.querySelectorAll('th, td');
    return Array.from(cols)
      .map(col => {
        const text = col.textContent?.trim() || '';
        // Escape double quotes and wrap in quotes
        return `"${text.replace(/"/g, '""')}"`;
      })
      .join(',');
  }).join('\n');

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  fileSaver(blob, 'table.csv');
}










     toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  
allowOnlyLetters(event: KeyboardEvent){
  const charCode = event.key;
  const regex = /^[a-zA-Z\s]*$/;

  if (!regex.test(charCode)) {
    event.preventDefault(); 
  }
}



         /// Modal///
  closeCreateModal() {
    
    this.showCreateModal = false;
  }
openCreateModal() {
    this.showCreateModal = true;
  }

           /// Modal///
  closeEditModal() {
    this.showEditModal = false;
  }

openEditModal() {
    this.showEditModal = true;
  }


        ///DELETE MODAL///
  closeDeleteModal() {
    this.showDeleteModal = false;
  }

openDeleteModal() {
    this.showDeleteModal = true;
  }

  resetDeleteModal() {
  this.selectedTicketIdToDelete = null;
  this.showDeleteModal = false;
}

// deleteTicket(id: string) {
//   this.selectedTicketIdToDelete = id;
//   this.showDeleteModal = true;
// }

confirmDeleteStaff() {
  if (!this.selectedTicketIdToDelete) return;
}



          //  POAGINATION //
    onPageChange(page: number){
    this.page = page
     this.fetchTicket();
    console.log("leave page changed",this.page)
    }
  
    onPageSizeChange(){
      this.page = 1;
       this.fetchTicket(); 
    }



        // MODAL LINKS //
  activeTab: 'ticket details' | 'mails' | 'notes' = 'ticket details';

setTab(tab: 'ticket details' | 'mails' | 'notes') {
  this.activeTab = tab;
}


messages = [
  {
    senderInitial: 'P',
    email: 'Patrickopata4278gmail.com',
    text: 'Ensure all updates to the ticket are documented accurately, covering the resolution process, action taken, and customer interactions. Review edits for consistency.',
    timeAgo: '30Min Ago'
  },
  {
    senderInitial: 'P',
    email: 'Patrickopata4278gmail.com',
    text: 'Ensure all updates to the ticket are documented accurately, covering the resolution process, action taken, and customer interactions. Review edits for consistency.',
    timeAgo: '30Min Ago'
  },

  {
    senderInitial: 'P',
    email: 'Patrickopata4278gmail.com',
    text: 'Ensure all updates to the ticket are documented accurately, covering the resolution process, action taken, and customer interactions. Review edits for consistency.',
    timeAgo: '30Min Ago'
  }
  
];

replies: string[] = [];       
activeReplyIndex: number | null = null;

toggleReply(index: number) {
  this.activeReplyIndex = this.activeReplyIndex ===  index ? null : index; 
}

sendReply(index: number) {
  //const reply = this.replies[index];
  console.log('Reply to message', index);
  this.replies[index] = ''; 
  this.activeReplyIndex = null; 
}


cancelReply() {
  this.activeReplyIndex = null;
}



              //  CREATE TICKET //
//submitTicket() {
  // const formValue = this.form.value;

  // const payload: Data = {
  //   subject: formValue.subject?.trim() || '',
  //   description: formValue.description?.trim() || '',
  //   priority: formValue.priority || '',
  //   status: formValue.status || '',
  //   organizationId: formValue.organizationId || '',
  //   source: formValue.source || '',
  //   comments: [], // empty array or form value
  //   unitId: formValue.unitId || '',
  //   createdBy: formValue.createdBy || '',
  //   threadMessageIds: [],
  //   taggedUsers: [],
  //   unwatchedUserIds: [],
  //   docUrls: [],
  //   placeholders: {
  //     Institution: formValue.institution || '',
  //     "Phone Number": formValue.phoneNumber || '',
  //     "Customer Type": formValue.customerType || '',
  //     "Issue Channel": formValue.issueChannel || ''
  //   },
  //   _id: '', 
  //   ref: '',
  //   emailThread: [],
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  //   __v: 0
  // };

//   console.log('Form data', this.manageFormData)

//   this.pageService.getTicket(this.manageFormData).subscribe({
//     next: (res) => {
//       console.log('API response:', res);
//     },
//     error: (err) => {
//       console.error('Failed to fetch data:', err);
//     }
//   });
// }



}
function saveAs(blob: Blob, arg1: string) {
  throw new Error('Function not implemented.');
}



