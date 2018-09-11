
import { Render } from "@typings/next-redux-routing";

const render: Render = function render(app, req, res, pagePath, params) {
  return app.renderToHTML(req, res, pagePath, params)
    .then(html => {
      res.send(html);
    })
    .catch(error => {
      app.renderError(error, req, res, pagePath, params);
    });
}

export default render;
