
import mockApp from 'nextjs-mock-app';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';

import render from '../../../lib/middleware/express/render';
import routeCallback from '../../../lib/middleware/express/routeCallback';

let req;
let res;

describe('Express middleware', () => {
  beforeEach(() => {
    req = new Request();
    res = new Response();
  });

  afterEach(() => {
    req.resetMocked();
    res.resetMocked();
  });

  it('should return a promise', () => {
    expect(routeCallback(render, mockApp, '/about')(req, res)).toBeInstanceOf(Promise);
  });
});
