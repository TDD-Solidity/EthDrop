import { Dispatch } from 'react';
import { MiddlewareAPI, AnyAction } from 'redux';
import { getGlobalData, IInitializeWeb3Success, startGlobalDataEventListeners } from '../../services/global-data';
import { initWeb3Failed, initWeb3Success } from '../actions/initialize';
import { INITIALIZE_WEB3_REQUESTED } from '../types/initWeb3';

const initWeb3Middleware = () => {
  return (store: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    switch (action.type) {
      case INITIALIZE_WEB3_REQUESTED:

        try {
          console.log('initializing web3...')
          const web3InitData = await getGlobalData(store.dispatch) as IInitializeWeb3Success;
          console.log('got web3 stuff!')
          store.dispatch(initWeb3Success(web3InitData));
        } catch (error) {
          store.dispatch(initWeb3Failed(error));
        }

        break;

      default:
        next(action);

    }
  };
};


export default initWeb3Middleware;
