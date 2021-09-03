import { GROUPS_FAILED, GROUPS_REQUESTED, GROUPS_SUCCESS } from '../types/groups';
import { IGroupsSuccess, IGroupsError } from '../../services/get-groups';

export const groupsRequested = () => ({
  type: GROUPS_REQUESTED,
});

export const groupsSuccess = (userId: IGroupsSuccess | IGroupsError) => ({
  type: GROUPS_SUCCESS,
  payload: { userId },
});

export const groupsFailed = (error: Error) => ({
  type: GROUPS_FAILED,
  payload: error,
});
