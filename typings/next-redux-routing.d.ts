
import { Request, Response, Router as ExpressRouter } from 'express';
import { QueryStringMapObject, Server } from 'next';
import NextRouter from 'next/router';
import { ComponentType } from 'react';
import { Action, Middleware } from 'redux';

export type ExpressMiddleware = (app: Server) => ExpressRouter;
export type ExpressMiddlewareConstructor = (opts: OptionsObject) => ExpressMiddleware;

export interface LinkProps {
  children: JSX.Element | JSX.Element[];
  href: string;
  prefetch?: boolean;
  navigate: Navigate;
  scroll?: boolean;
}

export type Navigate = (href: string, options?: OptionsType) => Promise<any>;

export type OptionsObject = {
  routes?: Routes;
  Router?: typeof NextRouter;
};

export type OptionsType = {
  prefetch?: boolean;
  scroll?: boolean;
};

export type ReduxOptionsObject = {
  routes: Routes;
  Router: Server['router'];
};

export type ReduxMiddleware = (opts: ReduxOptionsObject) => Middleware;

export type Render = (
  app: Server,
  req: Request,
  res: Response,
  filePath: string,
  params?: QueryStringMapObject
) => Promise<void>;

export type RouteCallback = (
  render: Render,
  app: Server,
  filePath: string,
  params?: Record<string, string | string[] | undefined> | undefined
) => (req: Request, res: Response) => Promise<void>;

export type Routes = {
  [x: string]: RouteObject
};

export type RouteObject = {
  name?: string;
  regExp?: string;
  pathname: string;
  filePath: string;
  [x: string]: string | number | boolean | undefined;
};

export interface INavigateAction extends Action {
  href: string;
  options?: OptionsType;
}

export interface INavigateFailureAction extends Action {
  error: Error;
}

export interface INavigateSuccessAction extends Action {
  route: RouteObject;
}

export interface IRouter {
  expressMiddleware: ExpressMiddleware;
  // Link: ComponentType;
  reduxMiddleware: Middleware;
  Router: Server['router'];

  routes: RouteObject[];

  getByName: (name: string) => RouteObject | undefined;
  getByPath: (path: string) => RouteObject | undefined;

  pushRoute: (route: RouteObject, query: object) => Promise<boolean>
}
