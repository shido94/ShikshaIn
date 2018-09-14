import { Component, OnInit } from '@angular/core';
import {AdminService} from '../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventBus} from '../services/event-bus';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  data: any;

  constructor(private adminService: AdminService,
              private router: Router,
              private eventBus: EventBus,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const data$ = this.adminService.findPendingData(params['id']);
      data$.subscribe(value => {
        console.log(value);
        this.data = value;
      });
    });
  }

  OnApprove ($event) {
    console.log($event);
    const obj$ = this.adminService.approveData($event);
    obj$.subscribe(data => {
      if (data.success) {
        this.router.navigate(['/admin/data/pending']);
      }
    });
  }

  dissaprovedData ($event) {
    // this.eventBus.announce('PASS_DATA', $event);
    this.router.navigate(['admin/data/pending/file/message', {doc: $event}]);
  }

}
