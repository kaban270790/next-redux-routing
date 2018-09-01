
import * as express from 'express';

import routerMiddleware from '../../../lib/middleware/express';

import routes from '../../../routes';

const app = express();
const Router = {
  routes: Object.keys(routes).map(key => ({ name: key, ...routes[key] })),
};

describe('Express middleware', () => {
  it('should throw an error if no routes file is provided', () => {
    expect(routerMiddleware.bind({})).toThrowError('No routes provided!');
  })

  it('should return an anonymous function', () => {
    expect(routerMiddleware.call(Router)).toBeInstanceOf(Function);
  });

  // it('should return a function that returns a router', () => {
  //   expect(routerMiddleware.call(Router)(app)).toBeInstanceOf(express.Router());
  // });

  // it('should return a router with the correct routes', () => {
  //   expect(routerMiddleware.call(Router)(app)).toHaveProperty('get');
  // });
});
