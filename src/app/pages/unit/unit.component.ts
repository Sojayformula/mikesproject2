import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { PagesService } from '../../service/pages.service';
import { unitModel, updateUnitModel } from '../../model/pagesModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';



@Component({
  selector: 'app-unit',
  imports: [CommonModule, FormsModule, NzDropDownModule, NzButtonModule, FormsModule, NzIconModule, NzFormModule, NzModalModule],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent implements OnInit{

  units: any[] = [];


  APIData: any[] = [];
  selectedTab:string = 'Active'
  unitModel!: unitModel
  editModel!: updateUnitModel

  constructor (private pagesService: PagesService){
    this.unitModel = new unitModel()
    this.editModel = new updateUnitModel()
  }


  ngOnInit(): void {
   this.fetchunit() 
  }

  fetchunit(){

    console.log('unit mode Data', this.unitModel)
    this.pagesService.getUnit().subscribe({
      next: (res)=>{
        console.log('APIData', res)
        this.APIData = res.data
      },

       error: (error) => {
        console.error('Error fetching leaves:', error);
       
      },
      complete:()=>{

      }
    })
  }

  toggleTab(item: string){
    // this.fetchunit. = item === 'ALL' ? '' : item;
    this.selectedTab = item;
    this.fetchunit();
   
    console.log("toggle some",item);
  }

    handleAction(unitId: string): void {
    console.log(`Action triggered for Unit ID: ${unitId}`);
   
  }


  // viewUnit: Unit = {
  //   name: '', 
    
  // };

  

  //   submitUnit() {

  //   this.pagesService.updateUnit(unitId, payload).subscribe({
  //     next: response => {
  //       console.log('Unit sent successfully', response);
  //     },
  //     error: err => {
  //       console.error('Error sending unit', err);
  //     }
  //   });
  // }


 
  //   editUnit(unit: any) {
  //   console.log('Editing unit:', unit);
  // }

  // deleteUnit(unitId: string) {
  //   console.log('Deleting unit with ID:', unitId);
  //   // Call delete service here if needed
  // }



   showModal = false;
   editData: any[] = [];
   inputData: string = '';
  // editForm = {
  //   _id: '',
  //   name: '',
  //   description: ''
  // };

 

  // openEditModal(unit: any) {
  //   this.editForm = { ...unit };
  //   this.showModal = true;
  // }

  updateUnit() {
    // const payload = {
    //   _id: this.editForm._id,
    //   name: this.editForm.name,
    //   description: this.editForm.description,
    // };

    this.pagesService.updateUnit(this.editModel, this .editModel.id).subscribe({
      next: (res) => {
        alert(res.message || 'Unit updated');
        this.showModal = false;
        this.fetchunit();
      },
      error: (err) => {
        alert('Update failed');
        console.error(err);
      }
    });
  } 
 



   isFilterModalVisible = false;
   modalFooter = '';
  

    openFilterModal() {
      console.log('Opening modal');
    this.isFilterModalVisible = true;
  }

  
  closeFilterModal(): void {
    this.isFilterModalVisible = false;
  }


  applyFilters(): void {
    // console.log('Applying filter for department:', this.selectedDepartment);

    this.closeFilterModal();
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


