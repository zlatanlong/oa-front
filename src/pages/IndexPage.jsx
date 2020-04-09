import React from 'react';
import { connect } from 'dva';
import Frame from '../components/Frame/Index.jsx';
import { Route, Switch, Redirect } from 'dva/router';
import { adminRoutes } from '../routes';
import { isLogined } from '../utils/authc';

/**
 * admin子路由
 * @param {*} props 
 */
function IndexPage(props) {
  return (isLogined() ?
    <Frame>
      <Switch>
        {adminRoutes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              render={routeProps => {
                return <route.component {...routeProps} />
              }}
            />
          )
        })}
        <Redirect to={adminRoutes[0].path} from="/admin" />
      </Switch>
    </Frame> : <Redirect to='/login' />
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
