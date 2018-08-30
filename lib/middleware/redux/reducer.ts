
import { AnyAction } from 'redux';
import initialState from './initialState';
import { NAVIGATE_SUCCESS, NAVIGATE_FAILURE, START_NAVIGATION } from './constants';

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case NAVIGATE_FAILURE: {
      const { error } = action;
      return {
        ...state,
        error,
        isNavigating: false,
      };
    }
    case NAVIGATE_SUCCESS: {
      const { route } = action;
      return {
        ...state,
        isNavigating: false,
        route,
      };
    }
    case START_NAVIGATION: {
      return {
        ...state,
        isNavigating: true,
      };
    }
    default:
      return state;
  }
};

