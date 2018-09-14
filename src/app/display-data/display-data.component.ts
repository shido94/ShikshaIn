import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import {ActivatedRoute} from '@angular/router';
import {UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css']
})
export class DisplayDataComponent implements OnInit {
  data = [];

  constructor(private route: ActivatedRoute, private userService: UserServiceService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const details$ = this.userService.getData(params['id'], params['semester']);
      details$.subscribe(result => {
        this.data = result;
        console.log(result);
      });
    });
  }

}
