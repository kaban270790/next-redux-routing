
import { Request, Response, Router } from 'express';
import { Server } from 'next';
import { Action, Middleware } from 'redux';

export type ExpressMiddleware = (app: Server) => Router;
export type ExpressMiddlewareConstructor = (opts: OptionsObject) => ExpressMiddleware;

export type OptionsObject = {
  routes: Routes;
};

export type ReduxMiddleware = (opts: OptionsObject) => Middleware;

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
