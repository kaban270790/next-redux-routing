
import { Middleware } from 'redux';
// import qs from 'qs';

import { Server } from 'next';

import { NAVIGATE } from './constants';

import { IRouter, RouteObject } from '@typings/next-redux-routing';
import { navigateFailure, navigateSuccess, startNavigation } from './actionCreators';

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
      const route = this.routes.find(r => new RegExp(r.regExp).test(href));

      if (!route) {
        dispatch(navigateFailure(new Error('Route not found')));
        return;
      }

      return this.pushRoute(route, query)
        .then((success: boolean) => {
          return dispatch(navigateSuccess(route));
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
