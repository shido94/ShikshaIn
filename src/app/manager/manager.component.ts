import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {areBranchesLoading, areBranchLoaded, getBranches, State} from '../states';
import {UserServiceService} from '../services/user-service.service';
import {combineLatest, Observable} from 'rxjs';
import {BranchList} from '../model/branch-list';


@Injectable()
export class BranchManager {
  constructor(private store: Store<State>, private userServices: UserServiceService) {
  }

  // public getBranches(): Observable<BranchList[]> {
  //   const loading$ = this.store.pipe(select(areBranchesLoading));
  //   const loaded$ = this.store.pipe(select(areBranchLoaded));
  //   loading$.pipe(
  //     // combineLatest()
  //   ).subscribe();
  //
  //
  //
  //
  //   return this.store.pipe(select(getBranches));
  // }

}

