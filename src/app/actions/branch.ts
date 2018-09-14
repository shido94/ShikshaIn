import {PayloadAction} from './index';
import {BranchList} from '../model/branch-list';


export const BRANCH_ADD_ACTION = '[branch] add action';
export const VIDEOS_SET_LOADING_ACTION = '[video] set loading action';


export class AddBranchAction implements PayloadAction {
  readonly type = BRANCH_ADD_ACTION;

  constructor(public payload: BranchList[]) {}
}

export class SetLoadingBranchAction implements PayloadAction {
  readonly type = VIDEOS_SET_LOADING_ACTION;
  constructor(public payload: boolean) {}
}
