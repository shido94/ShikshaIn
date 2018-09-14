import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../services/user-service.service';
import {BranchList} from '../model/branch-list';
import {BranchManager} from '../manager/manager.component';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {
  branches: BranchList[];

  constructor(private userService: UserServiceService,
              // private branchManager: BranchManager
  ) { }

  ngOnInit() {
    // const branches$ = this.branchManager.getBranches();

    this.userService.getBranch().subscribe(branch => {
      // console.log(branch);
      this.branches = branch;
      // console.log(this.branches);
    });
  }

}
