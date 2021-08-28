import { combineReducers } from 'redux';
import rootReducer from './root-reducer';
import loginReducer, { ILoginState } from './login';
import todosReducer, { ITodosState } from './todos';

describe("rootReducer", () => {

  it('exports a from reducer that combines all other reducers', () => {

    const expectedCombinedReducer = combineReducers({
        loginReducer,
        todosReducer,
      });

    expect(rootReducer.toString()).toBe(expectedCombinedReducer.toString());

  })

})