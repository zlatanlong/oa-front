import React, { useEffect } from 'react';
import { connect } from 'dva';
import Frame from '../components/Frame/Index.jsx';
import { Route, Switch, Redirect } from 'dva/router';
import { adminRoutes, mainRoutes } from '../routes';
import http from '../utils/axios.js';

/**
 * 子路由
 * @param {*} props 
 */
function IndexPage({ dispatch, userInfo }) {

  useEffect(() => {
    http.post('/user').then(
      res => {
        if (res.data.code === 0) {
          dispatch({
            type: 'userInfo/save',
            isLogined: true,
            data: res.data.data
          })
        }
      }
    ).catch(err => { console.log(err) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (userInfo.isLogined ?
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
        {/* <Redirect to={mainRoutes[1].path} /> */}
        <Route path='*' component={mainRoutes[1].component} />
      </Switch>
    </Frame> : <Redirect to='/login' />
  );
}

IndexPage.propTypes = {
};

export default connect(
  ({ userInfo }) => ({ userInfo })
)(IndexPage);
