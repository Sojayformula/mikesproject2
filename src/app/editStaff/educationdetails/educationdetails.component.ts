import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../service/pages.service';
import { allStaffModel } from '../../model/pagesModel';
import { StaffDataService } from '../../StaffDataService/staff-data.service';

@Component({
  selector: 'app-education-details',
  imports: [FormsModule, CommonModule],
  templateUrl: './educationdetails.component.html',
  styleUrl: './educationdetails.component.scss'
})
export class EducationdetailsComponent implements OnInit {

  employeeData: any ={};
  getAllStaff: allStaffModel
  staffId: any;
  selectedStep: string = '';
  selectedFiles: File[] = [];
  isDragging = false;



  constructor(private route:ActivatedRoute, private pagesService:PagesService, private staffDataService:StaffDataService){
    this.getAllStaff = new allStaffModel()
  }



  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
    const item = params.get('staffId');
    this.staffId = item;

    console.log("my id:", this.staffId);
       this.fetchEduDetails();
  });
  }


   fetchEduDetails() {
    this.pagesService.getAllStaff(this.getAllStaff).subscribe({
      next: (res) => {
        const employee = res.data.find((staff: any) => staff._id === this.staffId);
        if (employee) {
          this.staffDataService.setData(employee); // 🔥 Save globally
          this.employeeData = employee;            // 💾 Local assignment
          console.log('Matched Employee:', this.employeeData);
        } else {
        // console.warn('No matching employee found for staffId:', this.staffId);
        }
      },
      error: (err) => {
        console.error('Failed to fetch data', err);
      }
    });
  }


  removeFile(index: number) {
  this.selectedFiles.splice(index, 1);
}

 onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFiles = Array.from(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  getFileType(file: File): string {
    const type = file.type;
    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';
    if (type === 'application/msword' || type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'word';
    if (type === 'application/vnd.ms-excel' || type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'excel';
    if (type.startsWith('text/')) return 'text';
    return 'other';
  }


}
