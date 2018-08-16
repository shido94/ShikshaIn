import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';


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

  fetchData(): any {
    console.log('reaches');
    return this.http.get('/admin/api').pipe(
      map((post) => {
        console.log(post);
        return post;
      })
    );
  }

  approveData (approveData) {
    return this.http.post<RegisterResponse>('/admin/approval', {approveData});
  }

  disapproveData (disapproveData) {
    console.log(disapproveData);
    return this.http.post<RegisterResponse>('/admin/disapproval', {disapproveData});
  }
}
