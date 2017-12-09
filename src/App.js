import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './rootsContainers/NotFound';
import staticRoutes from './routes';
import './App.css';

/**
 * React is great at mapping data into components, and <Route> is a component.
 * wrap <Route> and use this everywhere instead, then when sub routes are added to any route it'll work
 * @param {Object} route - a new route object from the centralized route config
 * @return {Node} - a new route component with the info from the centralized route config
 */
export const RouteWithSubRoutes = (route: flowTypeRoute) => {
  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} exact={route.exact} routes={route.routes} />
      )}
    />
  );
};

class App extends Component {

  render() {
    const routes = staticRoutes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ));
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Switch>
          {routes}
          <Route component={NotFound} />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
