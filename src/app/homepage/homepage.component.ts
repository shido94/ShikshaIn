import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {EventBusService} from '../services/event-bus.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  username: string | null;

  constructor(private router: Router, private eventBus: EventBusService) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('USER_NAME');

    this.eventBus.listen('LOGIN_SUCCESS').subscribe(user => {
      console.log('user ', user);
      this.username = user.username;
    });
    console.log(this.username);
  }

  nextPage() {
    this.router.navigate(['branch']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
