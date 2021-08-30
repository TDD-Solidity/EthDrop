// import { TODOS_REQUESTED } from '../types/todos';
// import todoService, { ITodosSuccess } from '../../services/todos.service';
// import { todosSuccess, todosFailed } from '../actions/todos';
import { Dispatch } from 'react';
import { MiddlewareAPI, AnyAction } from 'redux';
import { IGroupData } from '../../../models/group-data';
import { getGroupsData } from '../../../services/groups-data/groups-data-fetching.service';
import { groupsDataFailed, groupsDataSuccess } from '../../actions/groups-data/groups-data';
import { GROUPS_DATA_REQUESTED } from '../../types/groups-data';

const groupsDataMiddleware = () => {
  return (store: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    switch (action.type) {
      case GROUPS_DATA_REQUESTED:

      console.log('here', window)

        try {
          const groupsData = await getGroupsData(window) as IGroupData[];
          store.dispatch(groupsDataSuccess({ data: groupsData }));
        } catch (error) {
          console.log('error: ', error)
          store.dispatch(groupsDataFailed(error));
        }

        break;

      default:
        next(action);

    }
  };
};


export default groupsDataMiddleware;
