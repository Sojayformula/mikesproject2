import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// export interface StaffData {
//   firstName?: string;
//   lastName?: string;
//   other?: string;

//   [key: string]: any; // ← This allows dynamic access with strings
// }

@Injectable({
  providedIn: 'root'
})
export class StaffDataService {

  constructor() { }

  // private dataSubject = new BehaviorSubject<StaffData>({});
  // data$ = this.dataSubject.asObservable();

  // getData(): StaffData {
  //   return this.dataSubject.value;
  // }

  // setData(newData: Partial<StaffData>) {
  //   this.dataSubject.next({
  //     ...this.dataSubject.value,
  //     ...newData
  //   });
  // }


  //   private staffData: { [key: string]: any } = {};

  // setData(data: { [key: string]: any }) {
  //   this.staffData = { ...this.staffData, ...data };
  // }

  // getData() {
  //   return this.staffData;
  // }

    private staffData: any;

  setData(data: any): void {
    this.staffData = data;
    localStorage.setItem('staffData', JSON.stringify(data));
  }

  getData(): any {
    return this.staffData;
  }

  clearData(): void {
    this.staffData = null;
  }
}
