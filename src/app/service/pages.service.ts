import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { addNewStaffModel, addUnitModel, allStaffModel, EditEmmergencyModel, EditEmploymentModel, editFamilyModel, editStaffModel, EducationDetailModel, educationModel, getStaffModel, getStaffResponseModel, PatchEducationPayload, responseDaumModel, UnitHead, unitModel, updateUnitModel } from '../model/pagesModel';
import { Root } from '../model/login-model';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http:HttpClient) { }

  getUnit(item: unitModel):Observable<any>{
  //     return this.http.get(environment.baseurl + '/unit/get-units?page=1&pageSize=10')
  //  /unit/get-units?page=1&pageSize=10   unit/get-units?search=you&page=1&pageSize=10}
       console.log("give me unit",item)
    let url = `${environment.baseurl}/unit/get-units`     

    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }
    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }

    if (item.search) {
      url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
      isFirstParam = false;
    }

    return this.http.get(url)  
  
  }

    addUnit(payload: addUnitModel): Observable<any> {
  return this.http.post(`${environment.baseurl}/unit/create-unit`, payload);
}

//    fetchMaritalStatus(item: unitModel): Observable<any> {
//   return this.http.get(`${environment.baseurl}/unit/get-units?page=1&pageSize=10`);
// }

  updateUnit(id: string, payload: updateUnitModel): Observable<any> {
  return this.http.patch(`${environment.baseurl}/unit/update-unit/${id}`, payload);
}


 getId(id: string ): Observable<any> {
    return this.http.get(`${environment.baseurl}/unit/get-unit/${id}`);
  }

  deleteUnit(id: string): Observable<any> {
  return this.http.delete(`${environment.baseurl}/unit/delete-unit/${id}`);
}

  deleteStaff(id: string): Observable<any> {
  return this.http.delete(`${environment.baseurl}/unit/delete-unit/${id}`);
}

getAllStaff(item: allStaffModel):Observable<any> {
  // return this.http.get(`${environment.baseurl}/staff/all-staffs`);
  // id: string, 

     console.log("give me unit",item)
    let url = `${environment.baseurl}/staff/all-staffs/`     

    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }
    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }
      if (item.unit) {
      url += `${isFirstParam ? '?' : '&'}unit=${item.unit}`;
      isFirstParam = false;
    }
      if (item.search) {
      url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
      isFirstParam = false;
    }
      if (item.gender) {
      url += `${isFirstParam ? '?' : '&'}gender=${item.gender}`;
      isFirstParam = false;
    }
      if (item.maritalStatus) {
      url += `${isFirstParam ? '?' : '&'}maritalStatus=${item.maritalStatus}`;
      isFirstParam = false;
    }
      if (item.employmentType) {
      url += `${isFirstParam ? '?' : '&'}employmentType=${item.employmentType}`;
      isFirstParam = false;
    }
      if (item.workLocation) {
      url += `${isFirstParam ? '?' : '&'}workLocation=${item.workLocation}`;
      isFirstParam = false;
    }
      if (item.staffStatus) {
      url += `${isFirstParam ? '?' : '&'}staffStatus=${item.staffStatus}`;
      isFirstParam = false;
    }

    return this.http.get(url)
  
}

  fetchStaff(item:allStaffModel):Observable<any>{
    return this.http.get(`${environment.baseurl}/staff/all-staffs`); 
   
  }


    getUserById(id: string, item: allStaffModel):Observable<any>{
    return this.http.get(`${environment.baseurl}/staff/${id}`);
  }
  

    getfamilyId(id: string, item: allStaffModel):Observable<any>{
    return this.http.get(`${environment.baseurl}/staff/${id}`);
   
  }

     getEmploymentId(id: string, item: allStaffModel):Observable<any>{
    return this.http.get(`${environment.baseurl}/staff/${id}`);
   
  }




  getUEduById(id: string, itme:allStaffModel):Observable<any>{
    return this.http.get(`${environment.baseurl}/staff/${id}`); 
  }
 
  

// editStaffModel
  getEditStaff(id: string, payload: editStaffModel ): Observable<any> {
    return this.http.patch(`${environment.baseurl}/staff/${id}`, payload); 
  }

    patchFamilyDetails(id: string, payload: editFamilyModel): Observable<any> {
    return this.http.patch(`${environment.baseurl}/staff/${id}`, payload); 
  }


                    // formData: addNewStaffModel = new addNewStaffModel();
      postAddNewStaff(payload:addNewStaffModel): Observable<any> {
    return this.http.post(`${environment.baseurl}/staff/create-staff`, payload); 
  }




    patchEducation(id: string, formData: FormData): Observable<any> {
  return this.http.patch(`${environment.baseurl}/staff/${id}`, formData);
}

    patchEmployment(id: string, payload: Partial<EditEmploymentModel>):Observable<any>{
    return this.http.patch(`${environment.baseurl}/staff/${id}`, payload); 
  }

    patchEmergency(id: string, payload: Partial<EditEmmergencyModel>):Observable<any>{
    return this.http.patch(`${environment.baseurl}/staff/${id}`, payload); 
  }

    postEducation(id: string, payload: Partial<EducationDetailModel>):Observable<any>{
    return this.http.patch(`${environment.baseurl}/staff/${id}`, payload); 
  }
  


  getUnits(): Observable<any> {
   return this.http.get(`${environment.baseurl}/staff/all-staffs?page=1&pageSize=10`); 
}

getStaff(): Observable<any> {
   return this.http.get(`${environment.baseurl}/staff/all-staffs?page=1&pageSize=10`); 
}

getRole(): Observable<any> {
   return this.http.get(`${environment.baseurl}/roles/list-roles`); 
}


            // STAFF PROFILE //
 getLoggedInUserProfile(): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      return throwError(() => new Error('Missing user ID'));
    }
    return this.http.get(`${environment.baseurl}/staff/${userId}`);
  }


    getLoggedInEduProfile(itme:allStaffModel):Observable<any>{
        const userId = localStorage.getItem('userId');
    if (!userId) {
      return throwError(() => new Error('Missing user ID'));
    }
    return this.http.get(`${environment.baseurl}/staff/${userId}`); 
  }


     getLoggedInNextProfile(item: allStaffModel):Observable<any>{
         const userId = localStorage.getItem('userId');
    if (!userId) {
      return throwError(() => new Error('Missing user ID'));
    }
    return this.http.get(`${environment.baseurl}/staff/${userId}`);
  }

}





































//      getUnits(): Observable<any> {
//   return this.http.get(`${environment.baseurl}/unit/get-units?page=1&pageSize=10`);
// }

// updateUnit(id: string, payload: any    item: updateUnitModel): Observable<any> {
//   return this.http.put(`${environment.baseurl}/unit/update/${id}`, payload);
// }

// updateAvailability(id: string, isAvailable: boolean): Observable<any> {
//   return this.http.patch(`${environment.baseurl}/unit/${id}/availability`, { isAvailable });
// }




//  // POST: Add a new unit
//   addUnit(unit: any): Observable<any> {
//     return this.http.post(`${environment.baseurl}/add-unit`, unit);
//   }

 
  
//   // DELETE: Delete a unit
//   deleteUnit(unitId: string): Observable<any> {
//     return this.http.delete(`${environment.baseurl}/delete-unit/${unitId}`);
//   }

// }