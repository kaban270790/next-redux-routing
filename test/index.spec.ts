
import Router, { Router as RouterClass } from '../lib';
import routes from '../routes';

describe('Test', () => {
  it('should throw an error if no routes are provided', () => {
    expect(Router).toThrowError('No routes provided');
  });

  it('should return a new instance of Router', () => {
    expect(Router({ routes })).toBeInstanceOf(RouterClass);
  });

  it('should return a route by name', () => {
    expect(Router({ routes }).getByName('about')).toEqual({
      name: 'about',
      regExp: '\\b(about)\\b/?$',
      pathname: 'about',
      filePath: '/pages/about',
    });
  });

  it('should return a route by path', () => {
    expect(Router({ routes }).getByPath('/about')).toEqual({
      name: 'about',
      regExp: '\\b(about)\\b/?$',
      pathname: 'about',
      filePath: '/pages/about',
    });
  });
});
