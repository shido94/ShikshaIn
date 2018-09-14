import {PayloadAction} from '../actions';
import {BRANCH_ADD_ACTION} from '../actions/branch';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {BranchList} from '../model/branch-list';

export interface BranchState extends EntityState<BranchList> {
  branchImg: string;
  branch_name: string;
  loading: boolean;
  loaded: boolean;
}

export const branchAdapter = createEntityAdapter<BranchList>({
  selectId: branches => branches.branch_name
});

const initialState: BranchState = branchAdapter.getInitialState({
  branchImg: '',
  branch_name: '',
  loaded: false,
  loading: false
});

export function branchReducer(currentState: BranchState = initialState, action: PayloadAction): BranchState {
  switch (action.type) {
    case BRANCH_ADD_ACTION:
      return branchAdapter.addAll(action.payload, currentState);
    default:
      return currentState;
  }
}

export const _areBranchesLoading = (state: BranchState) => state.loading;

export const _areBranchesLoaded =  (state: BranchState) => state.loaded;
