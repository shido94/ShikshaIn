import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface RegisterResponse {
  success: boolean;
}

interface LoginResponse {
  success: boolean;
  token: any;
  username: string;
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
}
