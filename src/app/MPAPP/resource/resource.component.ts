import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PagesService } from '../../service/pages.service';

@Component({
  selector: 'app-resource',
  imports: [CommonModule, FormsModule],
  templateUrl: './resource.component.html',
  styleUrl: './resource.component.scss'
})
export class ResourceComponent implements OnInit {

  placeHolderData: any
  showEditModal = false


formData = {
  label: '',
  type: '',
  options: [] as string[], 
  textValue: ''
};

// for DROPDOWN selection
selectedOption: string = ''; 





  constructor(private pageService: PagesService){}

  ngOnInit(): void {
    this.fetchPlaceHolder()
  }

  selectedBanks: any
  bankOption = [
    {key: 'GCB', label: 'GCB'},
    {key: 'Ecobank Ghana', label: 'Ecobank Ghana'},
    {key: 'CBG', label: 'CBG'},
    {key: 'UBA', label: 'UBA'},
    {key: 'Omini', label: 'Omini'},
  ]


  fetchPlaceHolder(){
    this.pageService.getPlaceHoder().subscribe({
      next: (res) => {
        this.placeHolderData = res.data
        console.log('Api fetched successfully', res)
      },

      error: (err) => {
        console.log('Failed to fetch data', err)
      },

      complete: () => {
        console.log('complete')
      }
    })
  }



          /// Modal///
  closeEditModal() {
    this.showEditModal = false;
  }
openEditModal() {
    this.showEditModal = true;
  }



  crestePlaceHol(form: NgForm) {
  const payload = {
    label: this.formData.label,
    type: this.formData.type,
    options: this.formData.type === 'DROPDOWN' ? [this.selectedOption] : [],
    textValue: this.formData.textValue
  };

  console.log('Sending payload:', payload);

  this.pageService.createPlaceHol(payload).subscribe({
    next: (res) => {
      console.log('Placeholder created:', res);
      form.resetForm();
    },
    error: (err) => {
      console.error('Placeholder creation failed:', err);
    },
    complete: () => {
      console.log('Request complete');
    }
  });
}







addOption() {
  if (this.selectedOption && !this.formData.options.includes(this.selectedOption)) {
    this.formData.options.push(this.selectedOption);
  }
}

onSubmit() {
  console.log('Form Data:', this.formData);
  // Send formData via POST to your backend
}


  


}
