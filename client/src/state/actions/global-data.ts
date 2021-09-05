
import {HEAR_EVENT_APP_PAUSED, NEW_GROUP_CREATED } from '../types/global-data'

export function heardEvent_AppPaused(newPauseState: boolean) {
    return {
      type: HEAR_EVENT_APP_PAUSED,
      payload: newPauseState,
    };
  };

export function heardEvent_NewGroupCreated(newPauseState: boolean) {
    return {
      type: NEW_GROUP_CREATED,
      payload: newPauseState,
    };
  };