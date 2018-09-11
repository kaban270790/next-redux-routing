
import { Router } from 'express';
import { ExpressMiddleware, IRouter, RouteObject } from '@typings/next-redux-routing';

import render from './render';
import routeCallback from './routeCallback';

const router = Router();

export default function expressMiddleware(this: IRouter): ExpressMiddleware {
  if (typeof this.routes === 'undefined') {
    throw new Error('No routes provided!');
  }
  return app => {
    this.routes.forEach((routeObj: RouteObject) => {
      if (routeObj.regExp) {
        router.get(new RegExp(routeObj.regExp), routeCallback(render, app, routeObj.filePath));
      }
    });

    router.get('*', routeCallback(render, app, '/404'));

    return router;
  };
}
