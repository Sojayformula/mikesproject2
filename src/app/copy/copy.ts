//   selectedUnitId: string | null = null;
// selectedUnitPayload: any = null; // whatever payload structure you need

// // Called when you click Edit button, passing the item
// selectedId(item: any) {
//   this.selectedUnitId = item._id;  // save the selected unit's id
//   this.selectedUnitPayload = { /* fill with your update data or show form */ };
//   // You might want to open a modal or enable a form here
//   console.log('Selected Unit ID:', this.selectedUnitId);
// }

// editUnit() {
//   if (!this.selectedUnitId) {
//     console.log('No unit selected');
//     return;
//   }

//   this.pagesService.updateUnit(this.selectedUnitId, this.selectedUnitPayload).subscribe({
//     next: (res) => {
//       console.log('api data', res);
//          this.resetForm();
//     },
//     error: (err) => {
//       console.log('update failed', err);
//     }
//   });
// }



//  <!-- Modal centered on page -->
//   <!-- <div
//     *ngIf="showModal"
//     class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//   >
//     <div  class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
//       <h2 class="text-xl font-bold mb-4">Edit Unit</h2> -->
     


//       <!-- <div *ngFor="let unit of units; let i = index" (ngSubmit)="onSubmit(unit)">
//      <div class="flex items-center space-x-4 my-2">  -->


//     <!-- <button type="submit" class="bg-blue-500 text-white px-3 py-1 rounded">
//       Save
//     </button>
//   </div>
// </div>  -->






//       <!-- <div class="flex justify-end space-x-2">
//         <button (click)="closeModal()" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
//           Cancel
//         </button>
//         <button (click)="saveUnit()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Save
//         </button>
//         </div> -->
    
//       <!-- </div>
//     </div>
//   </div>
// </div> -->





//              <!-- Modal -->
//     <!-- <div *ngIf="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//   <div class="bg-white rounded-lg p-6 w-1/3 shadow-lg">
//     <h2 class="text-xl font-semibold mb-4">Edit Unit</h2>

//     <label class="block mb-2">Name:</label>
//     <input [(ngModel)]="editModel.name" class="border p-2 w-full mb-4" />

//     <label class="block mb-2">Description:</label>
//     <input [(ngModel)]="editModel.description" class="border p-2 w-full mb-4" /> -->

//     <!-- Optional fields if needed -->
//     <!--
//     <label class="block mb-2">Unit Head:</label>
//     <input [(ngModel)]="editModel.unitHead" class="border p-2 w-full mb-4" />
//     -->

//     <!-- <div class="flex justify-end gap-4">
//       <button (click)="showEditModal = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//       <button (click)="updateUnit()" class="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
//     </div>
//   </div>
// </div> -->







//                       <!-- Edit modal -->
// <!-- <nz-modal
//   [(nzVisible)]="showEditModal"
//   [nzTitle]="editTitleTpl"
//   (nzOnCancel)="closeEditModal()"
//   [nzFooter]="editFooterTpl"
//   nzClassName="custom-modal"
//    [nzMaskClosable]="true" 
// >
//    Modal Title 
//   <ng-template #editTitleTpl>
//     <div class="text-lg font-semibold">Edit Unit</div>
//     <hr>
//   </ng-template>

//    Modal Body
//   <ng-container *nzModalContent>
//     <form class="space-y-4 px-4">
//        Name 
//       <nz-form-item>
//         <div  class="mt-4">
//         <label class="block text-sm font-medium text-gray-700">Name</label>
//         <input
//           type="text"
//           [(ngModel)]="editModel.name"
//           name="name"
//           class="w-full mt-1 p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         />
//         </div>
//       </nz-form-item>

//        Description 
//       <nz-form-item>
//         <div  class="mt-3">
//         <label class="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           [(ngModel)]="editModel.description"
//           name="description"
//           rows="2"
//           class="w-full mt-1 p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         ></textarea>
//         </div>
//       </nz-form-item>
    

//        Unit Head
//       <nz-form-item>
//         <div  class="mt-3">        <label class="block text-sm font-medium text-gray-700">Unit Head</label>
//         <select
//           [(ngModel)]="editModel.unitHead"
//           name="unitHead"
//           class="w-full mt-1 p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         >
//           <option *ngFor="let user of APIData" [value]="user._id">
//             {{ user.unitHead.firstName }} {{ user.unitHead.lastName }}
//           </option>
//         </select>
//         </div>
//       </nz-form-item>

      
//        isSubUnit
//        <div>
//         Is this the sub unit?
//        </div>
//        <div class="flex gap-4 relative top-[-10px]">
//       <nz-form-item>
//         <div class="mt-3">
//         <label class="inline-flex items-center space-x-2">
//           <input
//             type="checkbox"
//             [(ngModel)]=" editModel.isSubUnit"
//             name="isSubUnit"
//             class="form-checkbox"
//           />
//           <span class="text-sm text-gray-700">Yes</span>
//         </label>
//         </div>
//       </nz-form-item>

//        <nz-form-item>
//         <div class="mt-3">
//         <label class="inline-flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="isSubUnit"
//             class="form-checkbox"
//           />
//           <span class="text-sm text-gray-700">No</span>
//         </label>
//         </div>
//       </nz-form-item>
//       </div>

//        Parent Unit 
//       <nz-form-item>
//         <div class="mt-3">
//         <label class="block text-sm font-medium text-gray-700">Parent Unit</label>
//         <select
//           [(ngModel)]="editModel.parentUnit"
//           name="parentUnit"
//           class="w-full mt- p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         >
//           <option *ngFor="let unit of APIData" [value]="unit._id">
//             {{ unit.unitHead.firstName }} {{ unit.name }}
//           </option>
//         </select>
//         </div>
//       </nz-form-item>

//     </form>
//   </ng-container>

//    Modal Footer 
//   <ng-template #editFooterTpl>
//     <div class="flex justify-end gap-4 px-4 pb-4 mt-4">
//       <button nz-button (click)="closeEditModal()" class="bg-white border border-gray-300 px-4 py-1">
//         Cancel
//       </button>
//       <button nz-button nzType="primary" (click)="onSubmit()" class="bg-blue-600 text-white px-4 py-1">
//         Save
//       </button>
//     </div>
//   </ng-template>
// </nz-modal> -->







//               <!-- Add staff modal -->
//   <!-- <nz-modal
//   [(nzVisible)]="isFilterModalVisible"
//   [nzTitle]="modalTitleTpl"
//   (nzOnCancel)="closeFilterModal()"
//   [nzFooter]="modalFooter"
//   nzClassName="custom-modal"
//    [nzMaskClosable]="true" 
// >
//    Modal Title 
//   <ng-template #modalTitleTpl>
//     <div class="text-lg font-semibold"></div>
//     <hr>
//   </ng-template>

//    Modal Body
//   <ng-container *nzModalContent>
//     <form class="space-y-4 px-4">
//        Name
//       <nz-form-item>
//         <div  class="mt-4">
//         <label class="block text-sm font-medium text-gray-700"></label>
//         <input
//           type="text"
//            [(ngModel)]="filterModel.name"
//           name="name"
//           class="w-full mt-1 p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         />
//         </div>
//       </nz-form-item>
    

//        Unit Head
//       <nz-form-item>
//         <div  class="mt-3">
//         <label class="block text-sm font-medium text-gray-700"></label>
//         <select
//          [(ngModel)]="filterModel.unitHead" name="unitHead" 
//           name="unitHead"
//           class="w-full mt-1 p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         >
//           <option *ngFor="let user of userList" [value]="user._id">
//             {{ user.firstName }} {{ user.lastName }}
//           </option>
//         </select>
//         </div>
//       </nz-form-item>

//        Parent Unit
//       <nz-form-item>
//         <div class="mt-3">
//         <label class="block text-sm font-medium text-gray-700"></label>
//         <select
        
//           name="parentUnit"
//           class="w-full mt- p-1 border-2 rounded-md bg-[#F2F2F2] border-[#D7D7D7]"
//         >
//           <option *ngFor="let unit of parentUnitList" [value]="unit._id">
//             {{ unit.name }}
//           </option>
//         </select>
//         </div>
//       </nz-form-item>

//     </form>
//   </ng-container>

//    Modal Footer
//   <ng-template #modalFooter>
//     <div class="flex justify-end gap-4 px-4 pb-4 mt-4">
//       <button nz-button (click)="closeFilterModal()" class="bg-white border border-gray-300 px-4 py-1">
//         Cancel
//       </button>
//       <button nz-button nzType="primary" (click)="applyFilters()" class="bg-blue-600 text-white px-4 py-1">
//         Save
//       </button>
//     </div>
//   </ng-template>
// </nz-modal> -->




//                       <!-- Add unit modal -->
//                <!-- <div class="mt- bg-white">
//         <div class="flex items-center justify-between mx-5">
//           <div class="">
//              <p class="text-[18px] font-bold">Employees</p> 
//               <small class="text-[#828282] relative top-[-7px]">View all recent employees</small>
//           </div>  -->
  
                 
//            <!-- <div class="flex gap-2">
//                 <nz-modal
//                   [(nzVisible)]="isFilterModalVisible"
//                   [nzTitle]="modalTitleTpl"
//                   (nzOnCancel)="closeFilterModal()"
//                   [nzFooter]="modalFooter"
//                   nzClassName="custom-modal relative top-40 w-[1440px]"
//                 >
//               <ng-template #modalTitleTpl>
//                 <div class="flex items-center gap-2">
//                   <div class="text-lg font-semibold">Add Unit</div>
//                   </div>
//               </ng-template>

//               <ng-container *nzModalContent>
//                 <form>
//                   <div class="filter-container">
//                     <nz-form-item class="flex flex-col">
//                       <label for="department" class="text-white">Department</label>
//                       <select
//                         id="department"
                        
//                         name="department"
//                         class="py-2 border-2 rounded-lg bg-[#F2F2F2] border-[#D7D7D7]"
//                       >
//                         <option value="All">All Departments</option>
//                         <option *ngFor="let dept of APIData" [value]="dept.name">
//                           {{ dept.name }}
//                         </option>
//                       </select>
//                     </nz-form-item>

//                     <nz-form-item class="flex flex-col">
//                       <label for="department" class="text-white ">/////</label>
//                       <select
//                         id="department"
                        
//                         name="department"
//                         class="py-2 border rounded-lg"
//                       >
//                         <option value="All">All</option>
//                         <option *ngFor="let dept of APIData" [value]="dept.name">
//                           {{ dept.nam }}
//                         </option>
//                       </select>
//                     </nz-form-item>

//                     </div>
//                 </form>
//               </ng-container>

//                  Footer for Button
//                 <ng-template #modalFooter >
//                 <div class="space-x-4 mx-4">
//                 <button nz-button (click)="closeFilterModal()" class="text-black border border-blue-900 bg-white py-1 px-4">Cancel</button>
//                   <button nz-button nzType="primary" (click)="applyFilters()" class="text-white border border-blue-900 bg-blue-500 py-1 px-4">Ok</button> 
//                 </div>
//               </ng-template> 
//           </nz-modal>

//           </div>
//         </div>
//     </div>   -->

//      <!-- <td class="px-4 py-2 relative">
//               <button (click)="openModal(i)" class="text-gray-600 hover:text-black">&#x22EE;</button>
//             </td> -->

// get formattedDOB(): string {
//   return formatDate(this.staffData.supervisor.dateOfBirth, 'MM/dd/yyyy', 'en-US');
// }

// set formattedDOB(value: string) {
//   this.staffData.supervisor.dateOfBirth = value;
// }

   // If there's any value typed, mark this step as "typed"
  //   const isTyping = Object.values(this.staffData).some(val => val && val.toString().trim().length > 0);
  //   this.checkboxService.setTypingStatus('person-information', isTyping);
  // }