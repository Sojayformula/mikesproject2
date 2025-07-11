import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel, resetPasswordModel } from '../model/login-model';
import { environment } from '../environment/environment';
import { forgotpasswordModel } from '../model/forgotpassword-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(item: loginModel):Observable<any>{
    return this.http.post(environment.baseurl + '/authentication/login', item)
  }

  forgotpassword(email: string):Observable<any>{
    return this.http.post(environment.baseurl + '/authentication/forget-password', {email})
  }

   resetPassWord(payload: resetPasswordModel):Observable<any>{
    return this.http.post(`${environment.baseurl}/authentication/reset-password`, payload)
  }

  otp(payload: { otp: string }): Observable<any> {
  return this.http.post(`${environment.baseurl}/authentication/verify-otp`, payload);
}

   logout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = (`${environment.baseurl}/authentication/logout`)
     
  }

} 

  
