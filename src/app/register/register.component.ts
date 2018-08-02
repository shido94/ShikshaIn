import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventBusService} from '../services/event-bus.service';
import {AlertService} from '../services/alert.service';

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


  constructor(private userService: UserServiceService,
              private router: Router,
              private eventBus: EventBusService,
              private alertService: AlertService) {
    this.myForm = new FormGroup({
      username: this.usernameControl,
      email: this.emailControl,
      profession: this.professionControl,
      password: this.passwordControl,
      conf_password: this.conf_passwordControl
    });
  }

  ngOnInit() {
  }


  register() {
    this.userService.registerUser(this.myForm.value).subscribe(data => {
        if (data.success) {
          this.eventBus.announce('REGISTER_SUCCESS');
          this.router.navigate(['/branch']);
          this.alertService.success('successfully register');
        }
      },
      error => {
        this.alertService.error(error.error.message);
      });
  }
}
