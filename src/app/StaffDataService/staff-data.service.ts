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

  
  private staffData: any;

  setData(data: any): void {
    this.staffData = data;
    localStorage.setItem('staffData', JSON.stringify(data));
  }

  getData(): any {
    if (this.staffData) {
      return this.staffData;
    }

    const storedData = localStorage.getItem('staffData');
    if (storedData) {
      this.staffData = JSON.parse(storedData);
    }

    return this.staffData;
  }

  clearData(): void {
    this.staffData = null;
    localStorage.removeItem('staffData');
  }
}








    //  correct in the service
  
  //  private staffId = new BehaviorSubject<string | null>(null);
  // staffId$ = this.staffId.asObservable();

  // setStaffId(id: string | null) {
  //   this.staffId.next(id);
  // }

  // in the parent place this
//   constructor(private route: ActivatedRoute, private staffContext: StaffContextService) {}

// ngOnInit(): void {
//   const item = this.route.snapshot.queryParamMap.get('staffId');
//   this.staffContext.setStaffId(item);
// }


// ngOnInit(): void {
//   this.staffContext.staffId$.subscribe(id => {
//     console.log("Child received staffId via service:", id);
//   });
// }

  


