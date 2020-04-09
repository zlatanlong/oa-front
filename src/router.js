import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './pages/IndexPage';
import { mainRoutes } from './routes';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        {mainRoutes.map(route => {
          return (
            <Route key={route.path} {...route} />
          )
        })}
        {/* 子路由 */}
        <Route path="/admin" render={routeProps => <IndexPage {...routeProps} />} />
        <Redirect to="/admin" from="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
