import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {EventBusService} from '../../services/event-bus.service';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl(null, [Validators.required]);

  constructor(private router: Router,
              private adminService: AdminService,
              private eventBus: EventBusService,
              private alertService: AlertService) {
    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  ngOnInit() {
  }

  onLogin() {
    const obs = this.adminService.loginAdmin(this.loginForm.value);
    obs.subscribe(data => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('USER_TOKEN', data.token);
          localStorage.setItem('USER_NAME', data.username);
          localStorage.setItem('USER_ROLE', data.admin);
          this.eventBus.announce('LOGIN_SUCCESS');
          this.router.navigate(['/admin/home']);
          this.alertService.success('successfully login');
        }
      },
      error => {
        this.alertService.error(error.error.message);
      });
  }

}
