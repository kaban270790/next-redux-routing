
import * as React from 'react';
import { QueryStringMapObject } from 'next';
import * as http from 'http';
import * as url from 'url';
import * as shortid from 'shortid';
import { EventChangeOptions, PopStateCallback, RouterCallback } from 'next/router';

type EventName = 'routeChangeStart'
    | 'routeChangeComplete'
    | 'routeChangeError'
    | 'beforeHistoryChange'
    | 'hashChangeStart'
    | 'hashChangeComplete';
type EventHandler = (url: string) => any;
type UrlLike = url.UrlObject | url.Url;

const reactComponent = class Component extends React.Component { render() { return React.createElement('div', {}, 'Div'); } }

const routerProps = {
  pathname: '/',
  route: '/',
  components: {},
  back: () => {},
  beforePopState: (cb: PopStateCallback) => true,
  prefetch: (url: string): Promise<React.ComponentType<any>> => new Promise((resolve) => resolve(reactComponent)),
  push: (url: string | UrlLike, as?: string | UrlLike, options?: EventChangeOptions): Promise<boolean> => new Promise(resolve => resolve(true)),
  reload: (route: string): Promise<void> => new Promise(resolve => resolve()),
  replace: (url: string | UrlLike, as?: string | UrlLike, options?: EventChangeOptions): Promise<boolean> => new Promise(resolve => resolve(true)),
  events: {
      on: (eventName: EventName, handler: EventHandler | ErrorEventHandler): void => {},
      off: (eventName: EventName, handler: (url: string) => any): void => {},
  },
};

const router = {
  router: routerProps,
  readyCallbacks: [() => {}],
  ready: (cb: RouterCallback): void => {},
  ...routerProps
};

const buildId = shortid.generate();

export default {
  dir: '/',
  dev: false,
  quiet: false,
  router,
  http: null,
  nextConfig: {},
  distDir: '/dist',
  buildId,
  hotReloader: {},
  renderOpts: {
      dev: '',
      staticMarkup: false,
      distDir: '/dist',
      hotReloader: {},
      buildId,
      availableChunks: {},
      generateETags: false,
  },

  getHotReloader: (dir: string, options: { quiet: boolean; config: {}; buildId: string }): any => {},
  handleRequest: (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl?: UrlLike): Promise<void> => new Promise(resolve => resolve()),
  getRequestHandler: () => (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl?: UrlLike): Promise<void> => new Promise(resolve => resolve()),
  setAssetPrefix: (prefix: string): void => {},
  prepare: (): Promise<void> => new Promise(resolve => resolve()),
  close: (): Promise<void> => new Promise(resolve => resolve()),
  defineRoutes: (): Promise<void> => new Promise(resolve => resolve()),
  start: (): Promise<void> => new Promise(resolve => resolve()),
  run: (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl: UrlLike): Promise<void> => new Promise(resolve => resolve()),
  render: (req: http.IncomingMessage, res: http.ServerResponse, pathname: string, query?: QueryStringMapObject, parsedUrl?: UrlLike): Promise<void> => new Promise(resolve => resolve()),
  renderToHTML: (req: http.IncomingMessage, res: http.ServerResponse, pathname: string, query?: QueryStringMapObject): Promise<string> => new Promise(resolve => resolve('')),
  renderError: (err: any, req: http.IncomingMessage, res: http.ServerResponse, pathname: string, query?: QueryStringMapObject): Promise<void> => new Promise(resolve => resolve()),
  renderErrorToHTML: (err: any, req: http.IncomingMessage, res: http.ServerResponse, pathname: string, query?: QueryStringMapObject): Promise<string> => new Promise(resolve => resolve('')),
  render404: (req: http.IncomingMessage, res: http.ServerResponse, parsedUrl?: UrlLike): Promise<void> => new Promise(resolve => resolve()),
  serveStatic: (req: http.IncomingMessage, res: http.ServerResponse, path: string): Promise<void> => new Promise(resolve => resolve()),
  isServeableUrl: (path: string): boolean => true,
  readBuildId: (): string => buildId,
  handleBuildId: (buildId: string, res: http.ServerResponse): boolean => true,
  getCompilationError: (): Promise<any> => new Promise(resolve => resolve()),
  send404: (res: http.ServerResponse): void => {},
};
