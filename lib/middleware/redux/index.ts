
import { Middleware } from 'redux';
// import qs from 'qs';

import { NAVIGATE } from './constants';

import { IRouter } from '@typings/next-redux-routing';
import { navigateFailure, navigateSuccess, startNavigation } from './actionCreators';

function reduxMiddleware(this: IRouter): Middleware {
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

      this.Router.push(
        {
          pathname: route.filePath,
        },
        {
          pathname: `/${route.pathname}`,
          query,
        }
      ).then(success => {
        if (!success) {
          dispatch(navigateFailure(new Error('Route push unsuccessful')));
          return;
        }
        dispatch(navigateSuccess(route));
      }, error => {
        dispatch(navigateFailure(error));
      })
      .catch(error => {
        dispatch(navigateFailure(error));
      });
    }

    return next(action);
  };
}

export default reduxMiddleware;
