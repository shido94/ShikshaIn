import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert.service';
import {AdminService} from '../services/admin.service';
import {EventBusService} from '../../services/event-bus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup;

  numberControl = new FormControl(null, [Validators.required, Validators.email]);

  constructor(private router: Router,
              private adminService: AdminService) {
    this.verifyForm = new FormGroup({
      number: this.numberControl
    });
  }

  ngOnInit() {
  }

  onVerify() {
    const obs = this.adminService.verifyAdmin(this.verifyForm.value);
    obs.subscribe(data => {
      console.log(data);
        if (data.success) {
          this.router.navigate(['/admin/register']);
        }
      });
  }
}
