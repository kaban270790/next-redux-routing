const Router = require('../dist').default;

const routes = require('./routes');

const router = Router({ routes });

module.exports = router;
