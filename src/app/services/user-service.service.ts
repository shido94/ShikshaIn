import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

  subjectData(sub, branch, semester) {
    return this.http.post<GetValues>('/user/subjectSearch', {sub, branch, semester});
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

  getBranch(): Observable<any> {
    return this.http.get<any>('/admin/branch-list').pipe(
      map((post) => {
        return post;
      })
    );
  }

  getSemester (branch) {
    console.log('br ', branch);
    return this.http.post<any>('/admin/semester', {branch});
  }

  getSubject (branch, sem) {
    return this.http.post<any>('/admin/subject', {branch: branch, sem: sem});
  }

  getData (subject, sem) {
    return this.http.post<any>('/admin/data-details', {subject, sem});
  }

}
