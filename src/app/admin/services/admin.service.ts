import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface RegisterResponse {
  success: boolean;
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
}
