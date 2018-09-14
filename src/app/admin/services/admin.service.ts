import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


interface RegisterResponse {
  success: boolean;
  message: '';
}

interface LoginResponse {
  success: boolean;
  token: any;
  username: string;
  admin: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  registerAdmin(adminForm) {
    return this.http.post<RegisterResponse>('/admin/register', adminForm);
  }

  loginAdmin(adminForm) {
    return this.http.post<LoginResponse>('/admin/login', adminForm);
  }

  verifyAdmin(verifyForm) {
    return this.http.post<RegisterResponse>('/admin/verify', verifyForm);
  }

  dataSubmitAdmin(data) {
    console.log(data);
    return this.http.post<RegisterResponse>('/admin/branch-data', data);
  }


  approveData (approveData) {
    return this.http.post<RegisterResponse>('/admin/approval', {approveData});
  }

  disapproveData (disapproveData) {
    console.log(disapproveData);
    return this.http.post<RegisterResponse>('/admin/disapproval', {disapproveData});
  }

  fetchData(): Observable<any> {
    return this.http.get<any>('/admin/posts').pipe(
      map((post) => {
        console.log(post);
        return post;
      })
    );
  }

  getPendingData(): Observable<any> {
    return this.http.get<any>('/admin/pending-data').pipe(
      map((pending) => {
        console.log(pending);
        return pending;
      })
    );
  }

  findPendingData (data) {
    return this.http.post<any>('/admin/data', {data});
  }


  // get(request: string): Observable<any> {
  //   return this.http.get(`${this.actionUrl}${request}`)
  //     .map(res => this.extractData(res))
  //     .catch(this.handleError);
  // }

}
