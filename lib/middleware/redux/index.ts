
import Router from 'next/router';
import qs from 'qs';

import { NAVIGATE } from './constants';

import { OptionsObject, ReduxMiddleware } from '@typings/next-redux-routing';
import { startNavigation } from './actionCreators';

const reduxMiddleware: ReduxMiddleware = opts => ({ dispatch }) => next => action => {
  dispatch(startNavigation());
  // const { routes } = opts;
  // if (action.type === NAVIGATE) {
  //   Router.push(
  //     {
  //       pathname: route.filePath,
  //     },
  //     {
  //       pathname: `/${domain}${pathname}`,
  //       query,
  //     }
  //   );
  // }

  return next(action);
};

export default reduxMiddleware;
