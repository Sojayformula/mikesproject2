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