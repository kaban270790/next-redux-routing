import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reduxRouterMiddleware } from './router';

// REDUCERS
export const reducer = (state = {}, action) => {
  switch (action.type) {
    default: return state;
  }
}

export function initializeStore (initialState = {}) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(reduxRouterMiddleware)));
}
