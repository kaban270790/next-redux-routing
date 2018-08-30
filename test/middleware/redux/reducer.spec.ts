
import reducer from '../../../lib/middleware/redux/reducer';
import initialState from '../../../lib/middleware/redux/initialState';
import { NAVIGATE } from '../../../lib/middleware/redux/constants';

const route = {
  filePath: '/index',
  pathname: '',
  regExp: '/',
};

const action = {
  type: NAVIGATE,
  route,
};

describe('reducer', () => {
  it('should return the initial state by default', () => {
    expect(reducer(initialState, { type: 'NOOP' })).toEqual(initialState);
  });

  it('should return the correct state shape when navigate received', () => {
    expect(reducer(initialState, action)).toEqual({
      route: {
        filePath: '/index',
        pathname: '',
        regExp: '/',
      }
    });
  });
});
