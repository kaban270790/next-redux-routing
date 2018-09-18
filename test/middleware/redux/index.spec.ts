
import configureMockStore from 'redux-mock-store';

import Router from '../../../lib';
import routerMiddleware from '../../../lib/middleware/redux';

import routes from '../../../routes';
import { START_NAVIGATION, NAVIGATE_FAILURE, NAVIGATE_SUCCESS } from '../../../lib/middleware/redux/constants';
import { navigate } from '../../../lib/middleware/redux/actionCreators';
import initialState from '../../../lib/middleware/redux/initialState';

const mappedRoutes = Object.keys(routes).map(key => ({ name: key, ...routes[key] }));

const router = Router({ routes });
router.pushRoute = () => new Promise((resolve) => { resolve(true); });

const middleware = [router.reduxRouterMiddleware];
const mockStore = configureMockStore(middleware);

describe('Express middleware', () => {
  it('should throw an error if no routes file is provided', () => {
    expect(routerMiddleware.bind({})).toThrowError('No routes provided');
  });

  it('should throw an error if no router instance is found', () => {
    expect(routerMiddleware.bind({ routes: mappedRoutes })).toThrowError('No router instance found');
  });

  it(`should dispatch the navigateFailure action when no route is found`, async () => {
    const expectedActions = [
      { type: START_NAVIGATION },
      { type: NAVIGATE_FAILURE, error: new Error('Route not found') },
    ];

    const store = mockStore(initialState);

    await store.dispatch(navigate('/noop'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`should dispatch the navigateSuccess action when Router push is successful`, async () => {
    const expectedActions = [
      { type: START_NAVIGATION },
      {
        type: NAVIGATE_SUCCESS,
        route: {
          name: 'about',
          regExp: '\\b(about)\\b/?$',
          pathname: 'about',
          filePath: '/pages/about'
        }
      },
    ];

    const store = mockStore(initialState);

    await store.dispatch(navigate('/about'));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`should dispatch the navigateFailure action when Router push is unsuccessful`, async () => {
    router.pushRoute = () => new Promise((_, reject) => { reject(new Error('Route push unsuccessful')); });

    const expectedActions = [
      { type: START_NAVIGATION },
      { type: NAVIGATE_FAILURE, error: new Error('Route push unsuccessful') },
    ];

    const store = mockStore(initialState);

    await store.dispatch(navigate('/about'));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
