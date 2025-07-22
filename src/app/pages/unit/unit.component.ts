import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { PagesService } from '../../service/pages.service';
import { addUnitModel, allStaffModel, unitModel, updateUnitModel } from '../../model/pagesModel';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { debounceTime, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NzPaginationModule } from 'ng-zorro-antd/pagination'


@Component({
  selector: 'app-unit',
  imports: [CommonModule, FormsModule, NzDropDownModule, NzButtonModule, NzIconModule, NzFormModule, NzModalModule, MatProgressSpinner, NzPaginationModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss',
})
export class UnitComponent implements OnInit, OnDestroy{

  unitHead:string = ''; 
 isLoading = false

   APIData: any;
   selectedTab:string = 'Active';

   searchQuery: string = "";
   page = 1;
   pageSize = 5;
   totalItems: number = 10; 
   currentPage = 1
   filterModel: string ='';

  unitModel!: unitModel
  editModel!: updateUnitModel
  addUnitData!: addUnitModel
  searchQuery$ = new Subject<string>();
 


  showEditModal = false;
  userList: any[] = [];
  parentUnitList: any[] = [];



   constructor (private pagesService: PagesService, private notification: NzNotificationService, private modal: NzModalService,){
    this.unitModel = new unitModel()
     this.editModel = new updateUnitModel()
     this.addUnitData = new addUnitModel()

     this.searchQuery$.pipe(debounceTime(500)).subscribe((searchTerm: string)=>{
      this.searchQuery = searchTerm
      this.searchFunction()
   })
   
    
  }


  ngOnInit(){
   this.fetchunit() 

  }


     createNotification(position: 'topRight', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000,   }); 
  }


  // unitModel
  fetchunit(){
    this.isLoading = true
  this.unitModel.search = this.searchQuery?.trim() || '';
  // this.unitModel.page = this.unitModel.page || '1';
  // this.unitModel.pageSize = this.unitModel.pageSize || '10';
   this.unitModel.page = this.page ;
  this.unitModel.pageSize = this.pageSize;


    console.log('unit mode Data', this.unitModel)
    this.pagesService.getUnit(this.unitModel).subscribe({
      next: (res)=>{
        this.APIData = res.data
        console.log('APIData', res)
        this.isLoading = false
        
      },

       error: (error) => {
        console.error('Error fetching unit:', error);
        this.isLoading = true
       
      },
      complete:()=>{

      }
    })
  }


      // SEARCH FUNCTION //
  giveTobehaviour(){
    this.searchQuery$.next(this.searchQuery)
  }

  searchFunction(){
    console.log('search query',this.searchQuery)
    this.unitModel.search = this.searchQuery.trim();
    this.page = 1
    this.fetchunit()
  }

   ngOnDestroy(): void {
    this.searchQuery$.complete();
  }


      // PAGINATION //
        onPageChange(page: number){
        this.page = page
        this.fetchunit();
        console.log("leave page changed",this.page)
        }
      
        onPageSizeChange(){
          this.page = 1;
          this.fetchunit(); 
        }





addUnit(form: NgForm) {
  const payload: addUnitModel = {
  _id: this.addUnitData._id,  
  name: form.value.name?.trim(),
  description: form.value.description?.trim() || '',
  unitHead: form.value.unitHead || null,
  isSubUnit: form.value.isSubUnit === true,
  parentUnit: form.value.parentUnit?._id || null
};

  this.pagesService.addUnit(payload).subscribe({
    next: (res) => {
      console.log('✅ Unit created successfully', res);
      form.resetForm();
      this.fetchunit();
      this.addUnitData = new addUnitModel();
      this.showEditModal = false;
    },
    error: (err) => {
      console.error('❌ Failed to create unit:', err);
    }
  });
}





selectedUnitId: string | null = null;
selectedUnitPayload: any = null;

selectedId(item: any) {
  this.selectedUnitId = item._id;
  this.selectedUnitPayload = { ...item,
    unitHead: item.unitHead?._id || null,
    parentUnit: item.parentUnit?._id || item.parentUnit || null,
    organization: item.organization?._id || null,
  };
  console.log('Selected Unit ID:', this.selectedUnitId);
}

editUnit(form: NgForm) {
  if (!this.selectedUnitId) return;

  this.pagesService.updateUnit(this.selectedUnitId, this.selectedUnitPayload).subscribe({
    next: () => {
        this.createNotification('topRight','success', 'Unit details updated successfully.','Updated!');
      this.fetchunit();
      this.resetForm(form);
    },
    error: (err) => {
      console.log('Update failed', err)
        this.createNotification('topRight','success', 'Edit unit failed','Failed!');
    }
  });

}


resetForm(form: NgForm) {
  form.resetForm();
  this.selectedUnitId = null;
  this.selectedUnitPayload = null;
}



//               // Delete function //
// eleteUnit(id: string) {
//   if (confirm('Are you sure you want to delete this unit?')) {
//     this.pagesService.deleteUnit(id).subscribe({
//       next: (res) => {
//         alert(res.message || 'Unit deleted successfully');
//         this.fetchunit(); 
//       },
//       error: (err) => {
//         console.error('Delete failed:', err);
//         alert('Failed to delete unit');
//       }
//     });
//   }
// }



selectedStaffIdToDelete: string | null = null;
showDeleteModal = false;

cancelDeleteStaff() {
  this.resetDeleteModal();
}

resetDeleteModal() {
  this.selectedStaffIdToDelete = null;
  this.showDeleteModal = false;
}

deleteUnit(id: string) {
  this.selectedStaffIdToDelete = id;
  this.showDeleteModal = true;
}

confirmDeleteStaff() {
  if (!this.selectedStaffIdToDelete) return;

  this.pagesService.deleteStaff(this.selectedStaffIdToDelete).subscribe({
    next: (res) => {
      console.log('Delete unit', res)
      this.notification.success('Deleted!', res.message || 'Staff deleted successfully');
      this.fetchunit();
    },
    error: () => {
      this.notification.error('Error', 'Failed to delete staff');
    },
    complete: () => {
      this.resetDeleteModal();
    }
  });
}




  toggleTab(item: string){
    this.selectedTab = item;
    this.fetchunit();
   
    console.log("toggle some",item);
  }


   isFilterModalVisible = false;
   modalFooter = '';

             /// Modal///
    openFilterModal(): void {
      console.log('Opening modal');
    this.isFilterModalVisible = true;
  }

  closeFilterModal(): void {
    this.isFilterModalVisible = false;
  }

  applyFilters(): void {
    console.log('Filter applied for:',);
    this.closeFilterModal();
     this.fetchunit();
  }



  closeEditModal() {
    this.showEditModal = false;
  }
openEditModal() {
    this.showEditModal = true;
  }




      
      isModalVisible = false;
      isUpdating = false;

    showModal(){
    this.isModalVisible = true;
  }

  
    handleCancel() {
    this.isModalVisible = false;
  }

}




















  // ditUnit(){
  //   const Id = this.selectedId;
  //   let payload = this.Data;
  //   payload.unitHead = this.addUnitData.unitHead._id;
  //   payload.parentUnit = this.addUnitData.parentUnit._id;
  //   this.pagesService.updateUnit(id, payload).subscribe({
  //     next: (res)=>{
  //       console.log('api data', res)
  //     },

  //     error:(err)=>{
  //        console.log('update failed', err)
  //     }
  //   })
  // }



//   selectedUnitId: string | null = null;
// selectedUnitPayload: any = null; 




 
  // // APIData: Unit[] = [];
  // // selectedTab: 'Active' | 'Inactive' = 'Active';
  // showModal = false;
  // editedUnit: string = '';
  // editedUnitIndex: number | null = null;
  // toggleAvailability(unit: any): void {
  //   unit.isAvailable = !unit.isAvailable;

  //   this.pagesService.updateUnit(unit._id, { isAvailable: unit.isAvailable })
  //     .subscribe({
  //       next: () => console.log('Updated successfully'),
  //       error: err => console.error('Update failed', err)
  //     });
  // }

    // toggleAvailability(unit: any): void {
    // unit.isAvailable = !unit.isAvailable;
    // console.log(`Unit ${unit.id} availability changed to: ${unit.isAvailable}`);
    // }




  //     filterUnits() {
  //   this.APIData = this.APIData.filter(unit => unit.employmentStatus === this.selectedTab);
  // }

  // handleEdit(unitId: string): void {
  //   const updatedData = {
  //     name: 'Updated Name',
  //     status: 'inactive'
  //   };

  //   this.pagesService.updateUnit(unitId, updatedData).subscribe(() => {
  //     this.fetchunit();
  //   });
  // }

  // handleDelete(unitId: string): void {
  //   const confirmed = confirm('Are you sure you want to delete this unit?');
  //   if (!confirmed) return;

  //   this.pagesService.deleteUnit(unitId).subscribe(() => {
  //     this.fetchunit();
  //   });
  // }

  // handleAdd(): void {
  //   const newUnit = {
  //     name: 'New Unit',
  //     status: 'active'
  //   };

  //   this.pagesService.addUnit(newUnit).subscribe(() => {
  //     this.fetchunit();
  //   });
  // }





   // updateUnit1() {
    // const payload = {
    //   _id: this.editForm._id,
    //   name: this.editForm.name,
    //   description: this.editForm.description,
    // };

  //   this.pagesService.updateUnit(this.editModel, this .editModel.id).subscribe({
  //     next: (res) => {
  //       alert(res.message || 'Unit updated');
  //       this.showModal = false;
  //       this.fetchunit();
  //     },
  //     error: (err) => {
  //       alert('Update failed');
  //       console.error(err);
  //     }
  //   });
  // }
  
//   showEditModal = false;
//  userList: any[] = [];
//   organizationList: any[] = [];
//   parentUnitList: any[] = [];

  // editModel: updateUnitModel & { id: string } = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   unitHead: '',
  //   organization: '',
  //   parentUnit: '',
  //   isSubUnit: false
  // };


//   loadDropdownData() {
//     // this.pagesService.getUsers().subscribe(data => this.userList = data);

//     this.pagesService.getUsers().subscribe(data => {
//   console.log('User list:', data);
//   this.userList = data;
// });

//     // this.pagesService.getOrganizations().subscribe(data => this.organizationList = data);
//     // this.pagesService.getParentUnits().subscribe(data => this.parentUnitList = data);
//   }




 // this.editModel = {
    //   id: unit._id,
    //   name: unit.name,
    //   description: unit.description,
    //   unitHead: unit.unitHead?._id || '',
    //   organization: unit.organization?._id || '',
    //   parentUnit: unit.parentUnit || '',
    //   isSubUnit: unit.isSubUnit || false
    // };

  // openEditModal() {
  //   this.showEditModal = true;
  // }


  // closeEditModal() {
  //   this.showEditModal = false;
  // }


  //   editModel = {
  //   id: '',
  //   name: '',
  //   description: '',
  //   unitHead: '',
  //   organization: '',
  //   parentUnit: '',
  //   isSubUnit: false
  // };
  

//  updateUnit() {}


// onSubmit(){
//   const payload: updateUnitModel = {
//     name: this.editModel.name,
//     description: this.editModel.description,
//     unitHead: this.editModel.unitHead,
//     organization: this.editModel.organization,
//     parentUnit: this.editModel.parentUnit,
//      isSubUnit: this.editModel.isSubUnit
//   };

   
  
//   this.pagesService.updateUnit(this.editModel.id!, payload).subscribe({
//     next: (res) => {
//       alert(res.message || 'Unit updated successfully');
//       this.showEditModal = false;
//       this.fetchunit();
//     },
//     error: (err) => {
//       console.error(err);
//       alert('Update failed');
//     }
//   });
// }


  // resetForm(form: any) {
  //   form.resetForm();
  //   this.selectedUnitId = null;
  //   this.selectedUnitPayload = {
  //     name: '',
  //     description: '',
  //     isSubUnit: false
  //   };
  // }



