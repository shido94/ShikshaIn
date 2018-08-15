import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';

interface RegisterResponse {
  success: boolean;
  message: '';
}

interface UploadPhoto {
  success: true;
  url: '';
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

  uploadData (uploadImage) {
    const token = localStorage.getItem('USER_TOKEN');
    return this.http.post<UploadPhoto>('/user/upload', uploadImage, {
      headers: {Authorization: 'Bearer ' + token}
    });
  }

  formSubmit (formSubmit) {
    const token = localStorage.getItem('USER_TOKEN');
    return this.http.post<RegisterResponse>('/user/submit', formSubmit, {
      headers: {Authorization: 'Bearer ' + token}
    });
  }

  getBranch () {
    return this.http.get<GetValues>('/user/');
  }

}
