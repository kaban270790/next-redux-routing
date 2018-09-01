
import { ComponentType } from 'react';
import NextRouter from 'next/router';
import { Middleware } from 'redux';
import { expressMiddleware, reduxMiddleware } from './middleware';
import { ExpressMiddleware, OptionsObject, IRouter, RouteObject } from "@typings/next-redux-routing";

class Router implements IRouter {
  public expressMiddleware: ExpressMiddleware;
  // public Link: ComponentType;
  public reduxMiddleware: Middleware;
  public Router: typeof NextRouter;
  public routes: RouteObject[];

  constructor(opts: OptionsObject) {
    const { routes } = opts;
    if (typeof routes === 'undefined' || !(Object.keys(routes).length > 0)) {
      throw new Error('No routes provided');
    }
    this.routes = Object.keys(routes).map(key => ({ name: key, ...routes[key] }));
    // this.Link = Link;
    this.Router = NextRouter;
    this.expressMiddleware = expressMiddleware.call(this);
    this.reduxMiddleware = reduxMiddleware.call(this, {
      ...opts,
      Router: this.Router,
    });
  }

  getByName(name: string) {
    return this.routes.find(r => r.name === name);
  }

  getByPath(path: string) {
    return this.routes.find(r => new RegExp(r.regExp).test(path));
  }
}

export default (opts: OptionsObject) => new Router(opts);
