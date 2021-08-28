import { GROUPS_DATA_FAILED, GROUPS_DATA_REQUESTED, GROUPS_DATA_SUCCESS } from '../../types/groups-data';
import { IGroupData } from '../../../models/group-data';

export const groupsDataRequested = () => ({
  type: GROUPS_DATA_REQUESTED,
});

export const groupsDataSuccess = (groupsData: { data: IGroupData[] }) => {
  return {
    type: GROUPS_DATA_SUCCESS,
    payload: groupsData.data,
  };
};

export const groupsDataFailed = (error: Error) => ({
  type: GROUPS_DATA_FAILED,
  payload: error,
});
