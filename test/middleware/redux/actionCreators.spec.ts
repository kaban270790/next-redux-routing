
import {
  NAVIGATE,
  NAVIGATE_FAILURE,
  NAVIGATE_SUCCESS,
  START_NAVIGATION
} from '../../../lib/middleware/redux/constants';
import {
  navigate,
  navigateFailure,
  navigateSuccess,
  startNavigation
} from '../../../lib/middleware/redux/actionCreators';

describe('actionCreators', () => {
  it('navigate should return the correct action object', () => {
    expect(navigate('home')).toEqual({
      type: NAVIGATE,
      routeName: 'home',
    })
  });

  it('navigateFailure should return the correct action object', () => {
    const error = new Error('Oh dear...');
    expect(navigateFailure(error)).toEqual({
      type: NAVIGATE_FAILURE,
      error,
    })
  });

  it('navigateSuccess should return the correct action object', () => {
    const route = {
      filePath: '/index',
      pathname: '',
      regExp: '/',
    };
    expect(navigateSuccess(route)).toEqual({
      type: NAVIGATE_SUCCESS,
      route,
    })
  });

  it('startNavigation should return the correct action object', () => {
    expect(startNavigation()).toEqual({
      type: START_NAVIGATION,
    })
  });
});
