import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-semester',
  templateUrl: './semester.component.html',
  styleUrls: ['./semester.component.css']
})
export class SemesterComponent implements OnInit {
  public path: string;
  semester = [];

  constructor(private route: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['name'];
      const data$ = this.userService.getSemester(this.path);
      data$.subscribe(sem => {
        this.semester = sem;
      });
    });
  }

}
