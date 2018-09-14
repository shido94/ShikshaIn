import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects = [];
  constructor(private route: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const sub$ = this.userService.getSubject(params['name'], params['semester']);
      sub$.subscribe(subject => {
        this.subjects = subject;
        console.log(this.subjects);
      });
    });
  }

}
