
import { Request, Response, Router } from 'express';
import render from './render';
import { ExpressMiddlewareConstructor, RouteObject } from '@typings/next-redux-routing';

const router = Router();

const expressMiddleware: ExpressMiddlewareConstructor = opts => app => {
  const { routes } = opts;

  if (!routes) {
    throw new Error('You must provide a routes file');
  }

  Object.keys(routes).forEach((key: string) => {
    const routeObj: RouteObject = routes[key];
    router.get(new RegExp(routeObj.regExp), (req: Request, res: Response) => {
      const params = res.locals;
      return render(app, req, res, routeObj.filePath, params);
    });
  });

  router.get('*', (req: Request, res: Response) => {
    const params = res.locals;
    return render(app, req, res, '/404', params);
  });

  return router;
};

export default expressMiddleware;
