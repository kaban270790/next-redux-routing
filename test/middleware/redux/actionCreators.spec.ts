
import { NAVIGATE } from '../../../lib/middleware/redux/constants';
import { navigate } from '../../../lib/middleware/redux/actionCreators';

const route = {
  filePath: '/index',
  pathname: '',
  regExp: '/',
};

const action = {
  type: NAVIGATE,
  route,
};

describe('navigate', () => {
  it('should return the correct action object', () => {
    expect(navigate(route)).toEqual(action)
  });
});
