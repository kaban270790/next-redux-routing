
import * as React from 'react';
import { resolve } from 'url';

import { LinkProps, OptionsType, RouteObject } from '@typings/next-redux-routing';
type ChildProps = {
  href?: string;
  onClick: (e: React.MouseEvent) => void;
};

declare const window: any;

export default class Link extends React.PureComponent<LinkProps> {
  static defaultProps = {
    prefetch: false,
    scroll: true,
  };

  protected isKnownRoute: boolean;
  protected route: RouteObject;

  constructor(props: LinkProps) {
    super(props);
    const { href } = props;
    const { route, isKnownRoute } = this.getRoute();
    route.pathname = route.pathname ? href : '';
    this.route = route;
    this.isKnownRoute = isKnownRoute;
  }

  componentDidMount() {
    this.prefetch();
  }

  componentDidUpdate(prevProps: LinkProps) {
    const { href } = this.props;
    if (JSON.stringify(prevProps.href) !== JSON.stringify(href)) {
      this.prefetch();
    }
  }

  getRoute = (): { route: RouteObject, isKnownRoute: boolean } => {
    const { getByPath, href } = this.props;
    const route = getByPath(href);
    if (typeof route !== 'undefined') {
      return {
        isKnownRoute: true,
        route: {
          ...route,
          pathname: route.pathname,
        },
      };
    }
    return {
      isKnownRoute: false,
      route: {
        filePath: href,
        pathname: href,
      },
    };
  }

  linkClicked = (e: React.MouseEvent): void => {
    if (this.isKnownRoute) {
      e.preventDefault();

      const { href, navigate } = this.props;
      let { scroll } = this.props;

      if (scroll == null) {
        scroll = href.indexOf('#') < 0;
      }
      if (!this.isKnownRoute) {
        scroll = false;
      }

      const options: OptionsType = {
        scroll,
      };

      navigate(href, options);
    }
  }

  prefetch = (): void => {
    const { prefetch, Router } = this.props;
    if (!prefetch) {
      return;
    }
    if (typeof window === 'undefined') {
      return;
    }

    // Prefetch the JSON page if asked (only in the client)
    const { pathname } = window.location;
    const link = resolve(pathname, this.route.pathname);
    Router.prefetch(link);
  }

  render() {
    const { href } = this.props;
    let { children } = this.props;

    // If the childen provided is a string (<Link>example</Link>) we wrap it in an <a> tag
    if (typeof children === 'string') {
      children = <a>{children}</a>;
    }

    // This will return the first child, if multiple are provided it will throw an error
    const child = React.Children.only(children);

    const props: ChildProps = {
      onClick: (e: React.MouseEvent) => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }
        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      },
    };

    if (child.type === 'a') {
      props.href = href;
    }

    return React.cloneElement(child, props);
  }
}
