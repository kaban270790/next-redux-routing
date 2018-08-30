
import routerMiddleware from '../../../lib/middleware/express';

describe('Express middleware', () => {
  it('should throw an error if no routes file is provided', () => {
    expect(routerMiddleware({})).toThrowError('You must provide a routes file');
  })
});
