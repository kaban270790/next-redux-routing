
import { ExpressMiddleware, IRouter, RouteObject } from '@typings/next-redux-routing';

import render from './render';
import routeCallback from './routeCallback';

export default function expressMiddleware(this: IRouter): ExpressMiddleware {
  if (typeof this.routes === 'undefined') {
    throw new Error('No routes provided!');
  }
  return (app, Router) => {
    const router = Router();

    this.routes.forEach((routeObj: RouteObject) => {
      if (routeObj.regExp) {
        router.get(new RegExp(routeObj.regExp), routeCallback(render, app, routeObj.filePath));
      }
    });

    router.get('*', routeCallback(render, app, '/404'));

    return router;
  };
}
