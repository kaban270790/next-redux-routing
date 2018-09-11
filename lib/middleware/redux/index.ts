
import { Middleware } from 'redux';

import { NAVIGATE } from './constants';
import { navigateFailure, navigateSuccess, startNavigation } from './actionCreators';

import { IRouter } from '@typings/next-redux-routing';

export default function reduxMiddleware(this: IRouter): Middleware {
  if (typeof this.routes === 'undefined') {
    throw new Error('No routes provided');
  } else if (typeof this.Router === 'undefined') {
    throw new Error('No router instance found');
  }
  return ({ dispatch }) => next => action => {
    if (action.type === NAVIGATE) {
      dispatch(startNavigation());

      const { href, query } = action;
      const route = this.routes.find(r => r.regExp ? new RegExp(r.regExp).test(href) : false);

      if (!route) {
        dispatch(navigateFailure(new Error('Route not found')));
        return;
      }

      return this.pushRoute(route, query)
        .then((success: boolean) => {
          if (success) {
            return dispatch(navigateSuccess(route));
          }
          return dispatch(navigateFailure(new Error('Route push unsuccessful')));
        }, () => {
          return dispatch(navigateFailure(new Error('Route push unsuccessful')));
        })
        .catch((error: Error) => {
          return dispatch(navigateFailure(error));
        });
    }
    return next(action);
  };
}
