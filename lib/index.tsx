
import * as React from 'react';
import NextRouter from 'next/router';
import { Middleware } from 'redux';
import { expressMiddleware, reduxMiddleware } from './middleware';
import { ExpressMiddleware, LinkProps, OptionsObject, IRouter, RouteObject } from '@typings/next-redux-routing';
import { Link } from './components';

export class Router implements IRouter {
  public expressRouterMiddleware: ExpressMiddleware;
  public Link: (props: LinkProps) => JSX.Element;
  public reduxRouterMiddleware: Middleware;
  public Router: typeof NextRouter;
  public routes: RouteObject[];

  constructor(opts: OptionsObject = {}) {
    const { Router = NextRouter, routes } = opts;
    if (typeof routes === 'undefined' || !(Object.keys(routes).length > 0)) {
      throw new Error('No routes provided');
    }
    this.routes = Object.keys(routes).map(key => ({ name: key, ...routes[key] }));
    this.Link = this.getLink();
    this.Router = Router;
    this.expressRouterMiddleware = expressMiddleware.call(this);
    this.reduxRouterMiddleware = reduxMiddleware.call(this, {
      ...opts,
      Router: this.Router,
    });
  }

  getByName = (name: string): RouteObject | undefined => {
    return this.routes.find(r => r.name ? (r.name === name) : false);
  }

  getByPath = (path: string): RouteObject | undefined => {
    return this.routes.find(r => r.regExp ? new RegExp(r.regExp).test(path) : false);
  }

  getLink = (): (props: LinkProps) => JSX.Element => {
    return (props: LinkProps) => (
      <Link
        getByPath={this.getByPath}
        Router={this.Router}
        {...props}
      />
    );
  }

  pushRoute = (route: RouteObject, query: object = {}): Promise<boolean> => {
    return this.Router.push({
      pathname: route.filePath,
    }, {
      pathname: `/${route.pathname}`,
      query,
    });
  }
}

export default (opts: OptionsObject) => new Router(opts);
