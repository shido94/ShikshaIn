import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {EventBusService} from '../../services/event-bus.service';
import {Router} from '@angular/router';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;

  usernameControl = new FormControl(null, [Validators.required]);
  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  professionControl = new FormControl(null, [Validators.required]);
  passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  conf_passwordControl = new FormControl(null, [Validators.required, Validators.minLength(5)]);
  // roleControl = new FormControl(null, [Validators.required]);


  constructor(private adminService: AdminService,
              private router: Router,
              private eventBus: EventBusService,
              private alertService: AlertService) {
    this.myForm = new FormGroup({
      username: this.usernameControl,
      email: this.emailControl,
      // role: this.roleControl,
      profession: this.professionControl,
      password: this.passwordControl,
      conf_password: this.conf_passwordControl
    });
  }

  ngOnInit() {
  }


  register() {
    console.log(this.myForm);
    this.adminService.registerAdmin(this.myForm.value).subscribe(data => {
        if (data.success) {
          this.eventBus.announce('REGISTER_SUCCESS');
          this.router.navigate(['/admin/login']);
          this.alertService.success('successfully register');
        }
      },
      error => {
        this.alertService.error(error.error.message);
      });
  }

}
