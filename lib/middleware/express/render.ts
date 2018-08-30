
import { Request, Response } from 'express';
import { QueryStringMapObject, Server } from 'next';

export default async function render(app: Server, req: Request, res: Response, pagePath: string, params?: QueryStringMapObject): Promise<void> {
  try {
    const html = await app.renderToHTML(req, res, pagePath, params);
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pagePath, params);
  }
}
