
import Router from '../lib';

describe('Test', () => {
  it('should throw an error if no routes are provided', () => {
    expect(Router).toThrowError();
  });
});
