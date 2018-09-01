
import NextRouter from 'next/router';

import routerMiddleware from '../../../lib/middleware/redux';

import routes from '../../../routes';
import { NAVIGATE } from '../../../lib/middleware/redux/constants';

const mappedRoutes = Object.keys(routes).map(key => ({ name: key, ...routes[key] }));

const Router = {
  routes: mappedRoutes,
  Router: {
    push: () => new Promise(resolve => { resolve() }),
  },
};

describe('Express middleware', () => {
  it('should throw an error if no routes file is provided', () => {
    expect(routerMiddleware.bind({})).toThrowError('No routes provided');
  });

  it('should throw an error if no router instance is found', () => {
    expect(routerMiddleware.bind({ routes: mappedRoutes })).toThrowError('No router instance found');
  });

  it('should return an anonymous function', () => {
    expect(routerMiddleware.call(Router)).toBeInstanceOf(Function);
  });

  it('should return a function that returns a function', () => {
    expect(routerMiddleware.call(Router)({})).toBeInstanceOf(Function);
  });

  it('should return a function that returns a function that returns a function', () => {
    expect(routerMiddleware.call(Router)({})(() => ({}))).toBeInstanceOf(Function);
  });

  it(`should dispatch the startNavigation action when the ${NAVIGATE} action is called`, () => {
    const action = {
      type: NAVIGATE,
      href: '/',
    };
    const mockDispatch = jest.fn();

    routerMiddleware.call(Router)({ dispatch: mockDispatch })(() => ({}))(action);

    expect(mockDispatch).toHaveBeenCalled()
  });

  it(`should dispatch the navigateFailure action when no route is found`, () => {
    const action = {
      type: NAVIGATE,
      href: '/noop',
    };
    const mockDispatch = jest.fn();

    routerMiddleware.call(Router)({ dispatch: mockDispatch })(() => ({}))(action);

    expect(mockDispatch).toHaveBeenCalled()
  });

  it(`should dispatch the navigateSuccess action when Router push is successful`, () => {
    const action = {
      type: NAVIGATE,
      href: '/',
    };
    const mockDispatch = jest.fn();

    routerMiddleware.call(Router)({ dispatch: mockDispatch })(() => ({}))(action);

    expect(mockDispatch).toHaveBeenCalled()
  });
});
