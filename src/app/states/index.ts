import {ActionReducerMap, createSelector} from '@ngrx/store';
import {_areBranchesLoaded, _areBranchesLoading, branchAdapter, branchReducer, BranchState} from './branch';


export interface State {
  branches: BranchState;
}

export const reducers: ActionReducerMap<State> = {
  branches: branchReducer
};

export const getBranchState = (state: State) => state.branches;

const branchSelector = branchAdapter.getSelectors(getBranchState);
export const getBranches = branchSelector.selectAll;

export const areBranchesLoading = createSelector(getBranchState, _areBranchesLoading);
export const areBranchLoaded = createSelector(getBranchState, _areBranchesLoaded);
