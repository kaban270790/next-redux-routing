
import reducer from '../../../lib/middleware/redux/reducer';
import initialState from '../../../lib/middleware/redux/initialState';
import { NAVIGATE_FAILURE, NAVIGATE_SUCCESS, START_NAVIGATION } from '../../../lib/middleware/redux/constants';

const route = {
  filePath: '/index',
  pathname: '',
  regExp: '/',
};

describe('reducer', () => {
  it('should return the initial state by default', () => {
    expect(reducer(initialState, { type: 'NOOP' })).toEqual(initialState);
  });

  it(`should return the correct state shape when ${START_NAVIGATION} received`, () => {
    expect(reducer(initialState, {
      type: START_NAVIGATION,
      routeName: 'home',
    })).toEqual({
      ...initialState,
      isNavigating: true
    });
  });

  it(`should return the correct state shape when ${NAVIGATE_FAILURE} received`, () => {
    expect(reducer(initialState, {
      type: NAVIGATE_FAILURE,
      error: 'Oh dear...',
    })).toEqual({
      ...initialState,
      error: 'Oh dear...',
    });
  });

  it(`should return the correct state shape when ${NAVIGATE_SUCCESS} received`, () => {
    expect(reducer(initialState, {
      type: NAVIGATE_SUCCESS,
      route,
    })).toEqual({
      ...initialState,
      route,
    });
  });
});
