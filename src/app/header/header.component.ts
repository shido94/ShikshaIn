import { Component, OnInit } from '@angular/core';
import {EventBusService} from '../services/event-bus.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null;

  constructor(private eventBus: EventBusService, private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('USER_NAME');

    this.eventBus.listen('LOGIN_SUCCESS').subscribe(user => {
      this.username = user.username;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
