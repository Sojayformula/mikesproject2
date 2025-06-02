import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { PagesService } from '../../service/pages.service';
import { addUnitModel, unitModel, updateUnitModel } from '../../model/pagesModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';




@Component({
  selector: 'app-unit',
  imports: [CommonModule, FormsModule, NzDropDownModule, NzButtonModule, NzIconModule, NzFormModule, NzModalModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent implements OnInit{

  unitHead:string = ''; 


   APIData: any[] = [];
   selectedTab:string = 'Active';
  // showModal = false;
   searchquery: string = "";
   filterModel: string ='';

  unitModel!: unitModel
  editModel!: updateUnitModel
  addUnitData!: addUnitModel


  showEditModal = false;
userList: any[] = [];
parentUnitList: any[] = [];



   constructor (private pagesService: PagesService){
    this.unitModel = new unitModel()
     this.editModel = new updateUnitModel()
     this.addUnitData = new addUnitModel()
  }


  ngOnInit(): void {
   this.fetchunit() 
   this.editUnit()
  
  }

  fetchunit(){
    console.log('unit mode Data', this.unitModel)
    this.pagesService.getUnit(this.unitModel).subscribe({
      next: (res)=>{
        console.log('APIData', res)
        this.APIData = res.data
      },

       error: (error) => {
        console.error('Error fetching unit:', error);
       
      },
      complete:()=>{

      }
    })
  }



    addUnit(){
    console.log('Payload being sent:', this.addUnitData);
  
   this.pagesService.addUnit(this.addUnitData).subscribe({
    next: (res) => {
      alert(res.message || 'Unit updated successfully');
      this.fetchunit();  
      this.addUnitData = new addUnitModel(); 
      this.showEditModal  = false;
      
    },
    error: (err) => {
      console.error(err);
      alert('Update failed');
    }
  });
}



  getId(id: string){
   this.pagesService.getId(id).subscribe({
    next: (res)=>{
      console.log('get me id', res)
    },

    error: (err)=>{
      console.log('get id failed', err)
    }
   })
  }


  // editUnit(){
  //   const Id = data.unit._id
  //   this.pagesService.updateUnit(id, payload).subscribe({
  //     next: (res)=>{
  //       console.log('api data', res)
  //     },

  //     error:(err)=>{
  //        console.log('update failed', err)
  //     }
  //   })
  // }



  selectedUnitId: string | null = null;
selectedUnitPayload: any = null; // whatever payload structure you need

// Called when you click Edit button, passing the item
selectedId(item: any) {
  this.selectedUnitId = item._id;  // save the selected unit's id
  this.selectedUnitPayload = { /* fill with your update data or show form */ };
  // You might want to open a modal or enable a form here
  console.log('Selected Unit ID:', this.selectedUnitId);
}

editUnit() {
  if (!this.selectedUnitId) {
    console.log('No unit selected');
    return;
  }

  this.pagesService.updateUnit(this.selectedUnitId, this.selectedUnitPayload).subscribe({
    next: (res) => {
      console.log('api data', res);
      
    },
    error: (err) => {
      console.log('update failed', err);
    }
  });
}


 

  // onSubmit() {
  //   if (!this.newUnit.name) return; // basic validation

  //   this.pagesService.addUnit(this.newUnit).subscribe({
  //     next: (response) => {
  //       // Add the new/updated unit to the table
  //       this.units.push(response);

  //       // Reset form
  //       this.newUnit = {
  //         name: '',
  //         description: '',
  //         // reset other properties
  //       };
  //     },
  //     error: (err) => {
  //       console.error('Update failed:', err);
  //     }
  //   });
  // }




  toggleTab(item: string){
    this.selectedTab = item;
    this.fetchunit();
   
    console.log("toggle some",item);
  }

  searchFunction(){
    this.unitModel.search = this.searchquery
    this.fetchunit();
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



