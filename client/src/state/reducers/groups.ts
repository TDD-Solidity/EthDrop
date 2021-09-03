import { Group } from '../../models/group';
import { GROUPS_FAILED, GROUPS_REQUESTED, GROUPS_SUCCESS } from '../types/groups';

export interface ILoginState {
  fetching: boolean,
  error: object | undefined,
  groups: Group[] | undefined
}

export const initialState = {
  fetching: false,
  error: undefined,
  groups: [],
}

interface IAction {
  type?: string;
  payload?: unknown;
}

const reducer = (state: ILoginState = initialState, action: IAction = {}): ILoginState => {

  const { type, payload } = action;

  switch (type) {

    case GROUPS_REQUESTED:
      return {
        ...state,
        fetching: true,
        error: undefined,
        groups: undefined,
      };

    case GROUPS_SUCCESS:
      return {
        ...state,
        groups: (payload as any).groups,
        fetching: false,
        error: undefined,
      };

    case GROUPS_FAILED:
      return {
        ...state,
        fetching: false,
        groups: undefined,
        error: payload as object,
      };

    default:
      return state;

  }

};

export default reducer;
