import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PersonalInfo {
   firstName: string;
  lastName: string;
  otherName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  maritalStatus: string;
  phoneNumber: string;
  email: string;
  idType: string;
  idNumber: string;
}

export interface EmploymentData {
  unit: string;
  supervisor: string;
  startDate: string;
  endDate?: string;
  employmentType: string;
  department: string;
  position: string;
}

export interface FamilyData {
  unit: string;
  supervisor: string;
  startDate: string;
  endDate?: string;
  employmentType: string;
  department: string;
  position: string;
}

export interface nextOfKinsData {
  unit: string;
  supervisor: string;
  startDate: string;
  endDate?: string;
  employmentType: string;
  department: string;
  position: string;
}

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





 private readonly personalInfoKey = 'employmentData';
   private personalInfoData: PersonalInfo | null = null;
 
  // Employment Data Handlers
  setPersonalInfoData(data: PersonalInfo): void {
    console.log('check data',data)
    this.personalInfoData = data;
    localStorage.setItem(this.personalInfoKey, JSON.stringify(data));
  }

  getPersonalInfoData(): PersonalInfo | null {
    if (this.personalInfoData) return this.personalInfoData;

    const stored = localStorage.getItem(this.personalInfoKey);
    if (stored) {
      try {
        this.personalInfoData = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse employmentData from localStorage', e);
        this.personalInfoData = null;
      }
    }

    return this.personalInfoData;
  }

  clearPersonalInfoData(): void {
    this.personalInfoData = null;
    localStorage.removeItem(this.personalInfoKey);
  }





  
 private readonly employmentKey = 'employmentData';
   private employmentData: EmploymentData | null = null;
 
  // Employment Data Handlers
  setEmploymentData(data: EmploymentData): void {
    this.employmentData = data;
    localStorage.setItem(this.employmentKey, JSON.stringify(data));
  }

  getEmploymentData(): EmploymentData | null {
    if (this.employmentData) return this.employmentData;

    const stored = localStorage.getItem(this.employmentKey);
    if (stored) {
      try {
        this.employmentData = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse employmentData from localStorage', e);
        this.employmentData = null;
      }
    }

    return this.employmentData;
  }

  clearEmploymentData(): void {
    this.employmentData = null;
    localStorage.removeItem(this.employmentKey);
  }


  
  
 private readonly familyKey = 'employmentData';
   private familyData: FamilyData | null = null;
 
  // Employment Data Handlers
  setFamilyData(data: EmploymentData): void {
    this.employmentData = data;
    localStorage.setItem(this.familyKey, JSON.stringify(data));
  }

  getFamilyData(): EmploymentData | null {
    if (this.employmentData) return this.familyData;

    const stored = localStorage.getItem(this.familyKey);
    if (stored) {
      try {
        this.familyData = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse employmentData from localStorage', e);
        this.familyData = null;
      }
    }

    return this.familyData;
  }

  clearFamilyData(): void {
    this.familyData = null;
    localStorage.removeItem(this.familyKey);
  }




  
 private readonly nextOfKInsKey = 'employmentData';
   private nextOfKinsData: nextOfKinsData | null = null;
 
  // Employment Data Handlers
  setNextOfKinsData(data: nextOfKinsData) {
    this.nextOfKinsData = data;
    localStorage.setItem(this.familyKey, JSON.stringify(data));
  }

  getNextOfKInsData(): nextOfKinsData | null {
    if (this.nextOfKinsData) return this.nextOfKinsData;

    const stored = localStorage.getItem(this.nextOfKInsKey);
    if (stored) {
      try {
        this.familyData = JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse employmentData from localStorage', e);
        this.nextOfKinsData = null;
      }
    }

    return this.nextOfKinsData;
  }

  clearNextOfKinsData(): void {
    this.familyData = null;
    localStorage.removeItem(this.nextOfKInsKey);
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

  


