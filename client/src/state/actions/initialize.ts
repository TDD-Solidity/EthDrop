import { INITIALIZE_WEB3_FAILED, INITIALIZE_WEB3_REQUESTED, INITIALIZE_WEB3_SUCCESS } from '../types/initWeb3';
import { IInitializeWeb3Success } from '../../services/initialize-web';

export const initWeb3Requested = () => ({
  type: INITIALIZE_WEB3_REQUESTED,
});

export const initWeb3Success = (initWeb3Data: IInitializeWeb3Success) => {
  return {
    type: INITIALIZE_WEB3_SUCCESS,
    payload: initWeb3Data,
  };
};

export const initWeb3Failed = (error: Error) => ({
  type: INITIALIZE_WEB3_FAILED,
  payload: error,
});
