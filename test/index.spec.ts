
import Router, { Router as RouterClass } from '../lib';
import routes from '../routes';

const router = {
  push: () => new Promise(resolve => resolve(true))
}

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

  it('should return a Link component', () => {
    expect(Router({ routes }).getLink()).toBeInstanceOf(Function);
  });

  it('should return a promise on route push', () => {
    expect(Router({ Router: router, routes }).pushRoute({
      name: 'about',
      regExp: '\\b(about)\\b/?$',
      pathname: 'about',
      filePath: '/pages/about',
    })).toBeInstanceOf(Promise);
  });

  it('should return a boolean on successful route push', async () => {
    expect(await Router({ Router: router, routes }).pushRoute({
      name: 'about',
      regExp: '\\b(about)\\b/?$',
      pathname: 'about',
      filePath: '/pages/about',
    })).toBe(true);
  });
});
