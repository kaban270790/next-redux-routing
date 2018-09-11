
import * as React from 'react';
import { mount } from 'enzyme';

import Router from '../../../lib';
import routes from '../../../routes';
import { Link } from '../../../lib/components/Link';

const router = Router({ routes });

let navigate = () => new Promise(resolve => resolve());

router.getLink = () => props => (
  <Link
    getByPath={router.getByPath}
    navigate={navigate}
    Router={router.Router}
    {...props}
  />
);

let LinkComponent = router.getLink();

describe('Link', () => {
  it('should render an anchor element by default', () => {
    const wrapper = mount(
      <LinkComponent href="/about">Test</LinkComponent>
    );

    expect(wrapper.text()).toEqual('Test');
  });

  it('should render child correctly', () => {
    const wrapper = mount(
      <LinkComponent href="/about">
        <button>Test</button>
      </LinkComponent>
    );

    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Test');
  });

  it('should navigate when clicked with a known route', () => {
    navigate = jest.fn();

    const wrapper = mount(
      <LinkComponent href="/about">
        <button>Test</button>
      </LinkComponent>
    );

    wrapper.find('button').simulate('click');
    expect(navigate).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('should not navigate when clicked with an unknown route', () => {
    navigate = jest.fn();

    const wrapper = mount(
      <LinkComponent
        href="/sped"
        navigate={navigate}
      >
        <button>Test</button>
      </LinkComponent>
    );

    wrapper.find('button').simulate('click');
    expect(navigate).toHaveBeenCalledTimes(0);
  });

  it('should call prefetch if prefetch is on', () => {
    router.Router.prefetch = jest.fn();

    mount(
      <LinkComponent
        href="/about"
        prefetch={true}
        Router={router.Router}
      >
        <button>Test</button>
      </LinkComponent>
    );

    expect(router.Router.prefetch).toHaveBeenCalledTimes(1);
  });

  it('should not call prefetch if prefetch is off', () => {
    router.Router.prefetch = jest.fn();

    mount(
      <LinkComponent
        href="/about"
        Router={router.Router}
      >
        <button>Test</button>
      </LinkComponent>
    );

    expect(router.Router.prefetch).toHaveBeenCalledTimes(0);
  });
});
