import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

interface RegisterResponse {
  success: boolean;
}

interface LoginResponse {
  success: boolean;
  token: any;
  username: string;
}

interface GetValues {
  success: boolean;
  value: any;
}

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor(private http: HttpClient) { }

  registerUser(userForm) {
    return this.http.post<RegisterResponse>('/user/register', userForm);
  }

  loginUser(userForm) {
    return this.http.post<LoginResponse>('/user/login', userForm);
  }

  branchData(branchData) {
    return this.http.post<GetValues>('/user/branchSearch', {branchData});
  }

  uploadData (uploadForm) {
    // const headers = new HttpHeaders().set('Content-Type', 'undefined');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<RegisterResponse>('/user/upload', {uploadForm}, { headers });
  }

}
