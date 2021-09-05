import { combineReducers } from 'redux';
import loginReducer, { ILoginState } from './login';
import todosReducer, { ITodosState } from './todos';
import web3Reducer, { IWeb3State } from './web3';

export default combineReducers({
  loginReducer,
  todosReducer,
  web3Reducer
});

export interface IStore {
  loginReducer: ILoginState,
  todosReducer: ITodosState,
  web3Reducer: IWeb3State
}
