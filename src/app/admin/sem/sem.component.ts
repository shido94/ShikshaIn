import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-sem',
  templateUrl: './sem.component.html',
  styleUrls: ['./sem.component.css']
})
export class SemComponent implements OnInit {
  posts: any = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    console.log('reaches');
    this.adminService.fetchData().subscribe(posts => {
      this.posts = posts;
    });
  }
}
