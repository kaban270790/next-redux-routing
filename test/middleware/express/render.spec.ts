
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import mockApp from 'nextjs-mock-app';

import render from '../../../lib/middleware/express/render';

const html = '<div>Success</div>';
const renderToHTML = (): Promise<string> => new Promise(resolve => resolve(html));

const pagePath = '/about';

let req;
let res;

describe('Express middleware render', () => {
  beforeEach(() => {
    req = new Request();
    res = new Response();
  });

  afterEach(() => {
    req.resetMocked();
    res.resetMocked();
  });

  it('should send the rendered html', async () => {
    mockApp.renderToHTML = renderToHTML;

    await render(mockApp, req, res, pagePath);
    expect(res.send).toBeCalledWith(html);
  });

  it('should call renderError when renderToHTML promise is rejected', async () => {
    const error = new Error('Rejection!');

    mockApp.renderToHTML = (): Promise<string> => new Promise((_, reject) => reject(error));
    mockApp.renderError = jest.fn();

    await render(mockApp, req, res, pagePath);
    expect(mockApp.renderError).toBeCalledWith(error, req, res, pagePath, undefined);
  });
});
