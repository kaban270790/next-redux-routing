
import { RouteCallback } from "@typings/next-redux-routing";

const routeCallback: RouteCallback = function routeCallback(render, app, filePath) {
  return (req, res) => render(app, req, res, filePath, res.locals);
}

export default routeCallback;
