# Next Redux Routing

[![Build Status](https://travis-ci.com/guillaume008/next-redux-routing.svg?branch=master)](https://travis-ci.com/guillaume008/next-redux-routing)

[![Coverage Status](https://coveralls.io/repos/github/guillaume008/next-redux-routing/badge.svg?branch=master)](https://coveralls.io/github/guillaume008/next-redux-routing?branch=master)

Universal, "single source of truth" routing solution for Next.js

## Usage

This package contains the following:

* Express Middleware for handling route attachment for server-side routing
* Redux Middleware for handling client-side routing
* A replacement Link componnent to use instead of NextJS provided Link component for navigation

All are attached to the default export Router object.

You will need to create a routes file that will be the single source of truth for you routes across your application.
This file can be in any directory, you will just need to provide it to the Router constructor when you initiate the
router.

### Example routes.js

Create a routes file that exports an object with the route name as the key and the value being an object.

The value object can contain any information related to the route that you might want to access at some
point down the line.  However, the value object MUST also include the following key/value pairs:

* **regExp**: A regular expression for handling the route
* **pathname**: The pathname to be used by the NextJS Router for handling the URL to be shown in the browser
* **filePath**: The path to the view file in the pages directory next uses for the application views

```javascript
// routes.js
module.exports = {
  about: {
    regExp: '\\b(about)\\b/?$',
    pathname: 'about',
    filePath: '/pages/about',
  },
  home: {
    regExp: '^/?$',
    pathname: '',
    filePath: '/index',
  },
};
```

### Example router.js

It's a nice idea to create a `router.js` file to house your router instantiation as you'll need to import it into
various files throughout your project.

```javascript
// router.js
// 1. Import the Router constructor
const Router = require('next-redux-routing');

// 2. Import your routes file
const routes = require('./routes');

// 3. Instantiate the Router and provide the routes as part of the options
//    object to the constructor
const router = Router({ routes });

// 4. Export the router
module.exports = router;
```

### Example server.js using Express Middleware

Let's add the Express Middleware for handling server-side routing.

```javascript
// server.js
const express = require('express');
const next = require('next');

// 1. Import the router from router.js
const { expressRouterMiddleware } = require('../router');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: '../src' });
const handle = app.getRequestHandler();
const render = require('./render')(app);

const startServer = async () => {
  const server = express();

  // 2. Call the express middleware and pass in the app
  server.use(expressRouterMiddleware(app));

  await app.prepare();

  server.listen(port, error => {
    if (error) {
      throw error;
    }
    console.log(`Server listening on ${port}...`);
  });
};

startServer();
```

### Example store.js using Redux Middleware

See the [official example in the NextJS repository](https://github.com/zeit/next.js/tree/canary/examples/with-redux) for setting
up Redux nicely with NextJS.  This example expands on that setup so I've hidden the original code in collapsibles.

Now, let's attach the redux middleware to the store.

```javascript
// store.js
```

<details><summary>Show</summary>

```javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
```

</details>

```javascript
import { reduxRouterMiddleware } from '../router';
```

<details><summary>Show</summary>

```javascript
const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0
}

export const actionTypes = {
  TICK: 'TICK',
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      })
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      })
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      })
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: exampleInitialState.count
      })
    default: return state
  }
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = dispatch => {
  return setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() })
  }, 1000)
}

export const incrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.INCREMENT })
}

export const decrementCount = () => dispatch => {
  return dispatch({ type: actionTypes.DECREMENT })
}

export const resetCount = () => dispatch => {
  return dispatch({ type: actionTypes.RESET })
}
```

</details>

```javascript
export function initializeStore(initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware, reduxRouterMiddleware)));
}
```

### Example use of Link component

Finally, the last piece of the puzzle for client-side routing is to use the Link component in your React code.

You must provide either the route name or a href to the Link component so that it may find the route.

```javascript
// pages/index.js
import { Link } from '../routes'

export default () => (
  <div>
    <div>Welcome to Next.js!</div>
    <Link name="about">
      <a>About page</a>
    </Link>
    or
    <Link href="/about">
      <a>About page</a>
    </Link>
  </div>
)
```
