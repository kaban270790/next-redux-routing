
import { Request, Response, Router as ExpressRouter } from 'express';
import { Server } from 'next';
import { ComponentType } from 'react';
import { Action, Middleware } from 'redux';

export type ExpressMiddleware = (app: Server) => ExpressRouter;
export type ExpressMiddlewareConstructor = (opts: OptionsObject) => ExpressMiddleware;

export type OptionsObject = {
  routes: Routes;
};

export type ReduxOptionsObject = {
  routes: Routes;
  Router: Server['router'];
};

export type ReduxMiddleware = (opts: ReduxOptionsObject) => Middleware;

export type Routes = {
  [x: string]: RouteObject
};

export type RouteObject = {
  filePath: string;
  pathname: string;
  regExp: string;
  [x: string]: string | number | boolean
};

export interface INavigateAction extends Action {
  routeName: string;
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
}
