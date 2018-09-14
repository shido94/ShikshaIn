import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';
import {log} from 'util';
import {EventBusService} from '../services/event-bus.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  @Output() refresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  emailControl = new FormControl(null, [Validators.required, Validators.email]);
  passwordControl = new FormControl(null, [Validators.required]);

  constructor(private router: Router,
              private userService: UserServiceService,
              private eventBus: EventBusService,
              private alertService: AlertService) {
    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });
  }

  ngOnInit() {
    $(function () {
      // Get the modal
      const modal = document.getElementById('myModal');

// Get the button that opens the modal
      const btn = document.getElementById('clickme');

// Get the <span> element that closes the modal
      const span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
      btn.onclick = function () {
        modal.style.display = 'block';
      };

// When the user clicks on <span> (x), close the modal
      $('span').onclick = function () {
        modal.style.display = 'none';
      };

// When the user clicks anywhere outside of the modal, close it
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      };

    });
  }

  onLogin() {
    const obs = this.userService.loginUser(this.loginForm.value);
    obs.subscribe(data => {
        console.log(data);
        if (data.success) {
          console.log(data);
          localStorage.setItem('USER_TOKEN', data.token);
          localStorage.setItem('USER_NAME', data.username);
          this.eventBus.announce('LOGIN_SUCCESS');
          this.alertService.success('successfully login');
          this.refresh.next(true);
        }
      },
      error => {
        this.alertService.error(error.error.message);
      });
  }
}

