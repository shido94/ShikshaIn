import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventBus} from '../services/event-bus';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-message',
  templateUrl: './user-message.component.html',
  styleUrls: ['./user-message.component.css']
})
export class UserMessageComponent implements OnInit {

  docData: string;

  messageForm: FormGroup;

  constructor(private adminService: AdminService,
              private router: Router,
              private eventBus: EventBus,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.docData = this.route.snapshot.params['doc'];

    this.messageForm = this.formBuilder.group({
      subject: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  OnUpload($event) {
    const data = {
      docs: this.docData,
      response: $event
    };
    this.adminService.disapproveData($event);
  }

}
