import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import { reduxRouterMiddleware } from './router';

const exampleInitialState = {};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    default: return state;
  }
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware, reduxRouterMiddleware)));
}
