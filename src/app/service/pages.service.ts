import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { addUnitModel, unitModel, updateUnitModel } from '../model/pagesModel';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http:HttpClient) { }

  getUnit(item: unitModel):Observable<any>{
  //     return this.http.get(environment.baseurl + '/unit/get-units?page=1&pageSize=10')
  // }
       console.log("give me unit",item)
    let url = `${environment.baseurl}/unit/get-units?page=1&pageSize=10`     

    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }
    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }

    return this.http.get(url)
  
  }

    addUnit(payload: addUnitModel): Observable<any> {
  return this.http.post(`${environment.baseurl}/unit/create-unit`, payload);
}

  updateUnit(id: string, payload: updateUnitModel): Observable<any> {
  return this.http.patch(`${environment.baseurl}/unit/update-unit/${id}`, payload);
}


 getId(id: string ): Observable<any> {
    return this.http.get(`${environment.baseurl}/unit/get-unit/${id}`);
  }







  getOrganizations(): Observable<any> {
    return this.http.get<any>(`${environment.baseurl}/organizations`); 
  }

  getParentUnits(): Observable<any> {
    return this.http.get<any>(`${environment.baseurl}/units`); 
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