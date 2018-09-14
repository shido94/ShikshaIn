import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  pendings = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getPendingData().subscribe(data => {
      this.pendings = data;
    });
  }



}
