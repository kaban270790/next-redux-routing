
import { Request, Response, Router } from 'express';
import render from './render';
import { ExpressMiddleware, IRouter, RouteObject } from '@typings/next-redux-routing';

const router = Router();

export default function expressMiddleware(this: IRouter): ExpressMiddleware {
  if (typeof this.routes === 'undefined') {
    throw new Error('No routes provided!');
  }
  return app => {
    this.routes.forEach((routeObj: RouteObject) => {
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
}
