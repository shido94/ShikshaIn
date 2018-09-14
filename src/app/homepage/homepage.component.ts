import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
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
  }

  OnNotifyRefresh(refresh: boolean) {
    if (refresh) {
      this.ngOnInit();
    }
  }

  nextPage() {

    this.router.navigate(['branch']);
  }

  logout() {
    localStorage.clear();
    this.ngOnInit();
  }

}
