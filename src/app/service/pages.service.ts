import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs/internal/Observable';
import { unitModel, updateUnitModel } from '../model/pagesModel';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http:HttpClient) { }

  getUnit():Observable<any>{
     return this.http.get(environment.baseurl + '/unit/get-units?page=1&pageSize=10')
  }

  updateUnit(payload: updateUnitModel, id: string): Observable<any> {
  return this.http.patch(`${environment.baseurl}/unit/update/${id}`, payload);
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