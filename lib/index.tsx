
import * as React from 'react';
import NextRouter from 'next/router';
import { Middleware } from 'redux';
import { expressMiddleware, reduxMiddleware } from './middleware';
import { ExpressMiddleware, LinkProps, OptionsObject, IRouter, RouteObject } from '@typings/next-redux-routing';
import { Link } from './components';

export class Router implements IRouter {
  public expressMiddleware: ExpressMiddleware;
  public Link: (props: LinkProps) => JSX.Element;
  public reduxMiddleware: Middleware;
  public Router: typeof NextRouter;
  public routes: RouteObject[];

  constructor(opts: OptionsObject = {}) {
    const { routes } = opts;
    if (typeof routes === 'undefined' || !(Object.keys(routes).length > 0)) {
      throw new Error('No routes provided');
    }
    this.routes = Object.keys(routes).map(key => ({ name: key, ...routes[key] }));
    this.Link = this.getLink();
    this.Router = NextRouter;
    this.expressMiddleware = expressMiddleware.call(this);
    this.reduxMiddleware = reduxMiddleware.call(this, {
      ...opts,
      Router: this.Router,
    });
  }

  getLink() {
    return (props: LinkProps) => (
      <Link
        getByPath={this.getByPath}
        Router={this.Router}
        {...props}
      />
    );
  }

  getByName(name: string): RouteObject | undefined {
    return this.routes.find(r => r.name ? (r.name === name) : false);
  }

  getByPath(path: string): RouteObject | undefined {
    return this.routes.find(r => r.regExp ? new RegExp(r.regExp).test(path) : false);
  }

  pushRoute(route: RouteObject, query: object = {}): Promise<boolean> {
    return this.Router.push({
      pathname: route.filePath,
    }, {
      pathname: `/${route.pathname}`,
      query,
    });
  }
}

export default (opts: OptionsObject) => new Router(opts);
