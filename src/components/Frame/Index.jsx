import { Layout, Menu, Dropdown, Avatar, message, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import {
  DownOutlined,
  UserOutlined,
  CarryOutOutlined,
  TeamOutlined,
  UserSwitchOutlined,
  SettingOutlined,
  LogoutOutlined,
  TagsOutlined,
  SettingTwoTone,
  SmileOutlined
} from '@ant-design/icons';
import Logo from '../../assets/yay.jpg';
import { routesGroup } from '../../routes';
import style from './frame.css';
import { clearToken } from '../../utils/authc';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function Index(props) {
  const [thingRoutes, setThingRoutes] = useState([]);
  const [teamRoutes, setTeamRoutes] = useState([]);
  const [roleRoutes, setRoleRoutes] = useState([]);
  const [tagRoutes, setTagRoutes] = useState([]);
  const [userOperateRoutes, setUserOperateRoutes] = useState([]);
  const [testRoutes, setTestRoutes] = useState([]);

  useEffect(() => {
    // let userPermissionUrlSet = [];
    // let permissionSet = [...props.userInfo.info.permissionSet];
    // permissionSet.forEach(
    //   permission => {
    //     userPermissionUrlSet.push(permission.frontRoute);
    //   }
    // );
    // 从 userPermissionSet 中 解除对应route的受控
    // for (const key in routesGroup) {
    //   if (routesGroup.hasOwnProperty(key)) {
    //     const routes = routesGroup[key];
    //     routes.forEach(
    //       route => {
    //         if (userPermissionUrlSet.indexOf(route.path) !== -1) {
    //           route.controlled = false;
    //         }
    //       }
    //     )
    //   }
    // }
    // setThingRoutes(routesGroup.thingRoutes.filter(route => route.isShow && !route.controlled))
    // setTeamRoutes(routesGroup.teamRoutes.filter(route => route.isShow && !route.controlled))
    // setRoleRoutes(routesGroup.roleRoutes.filter(route => route.isShow && !route.controlled))
    // setTagRoutes(routesGroup.tagRoutes.filter(route => route.isShow && !route.controlled))
    // setUserOperateRoutes(routesGroup.userOperateRoutes.filter(route => route.isShow && !route.controlled))
    // setTestRoutes(routesGroup.testRoutes.filter(route => route.isShow && !route.controlled))

    // 测试阶段
    setThingRoutes(routesGroup.thingRoutes.filter(route => route.isShow));
    setTeamRoutes(routesGroup.teamRoutes.filter(route => route.isShow));
    setRoleRoutes(routesGroup.roleRoutes.filter(route => route.isShow));
    setTagRoutes(routesGroup.tagRoutes.filter(route => route.isShow));
    setUserOperateRoutes(
      routesGroup.userOperateRoutes.filter(route => route.isShow)
    );
    setTestRoutes(routesGroup.testRoutes.filter(route => route.isShow));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 鼠标滑到右上角用户上时候的弹出菜单
  const popMenu = (
    <Menu
      onClick={p => {
        if (p.key === 'logOut') {
          props.history.push('/login');
          props.dispatch({
            type: 'userInfo/save',
            isLogined: false
          });
          clearToken();
        } else if (p.key === 'info') {
          props.history.push('/u/info');
        } else {
          message.info(p.key);
        }
      }}>
      <Menu.Item key='noti'>通知中心</Menu.Item>
      <Menu.Item key='info'>
        <SmileOutlined />
        个人信息
      </Menu.Item>
      <Menu.Item key='setting'>
        <SettingOutlined />
        设置
      </Menu.Item>
      <Menu.Item key='logOut'>
        <LogoutOutlined />
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100%' }}>
      <Header className={style.header}>
        <Space>
          <img src={Logo} alt='logo' style={{ width: '100px' }} />
          <span className={style.headerTitle}>OA管理系统</span>
        </Space>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <span style={{ color: '#fff', margin: '0 10px' }}>
              {props.userInfo.info.realName} <DownOutlined />
            </span>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className='site-layout-background'>
          <Menu
            mode='inline'
            defaultSelectedKeys={['/admin/thing']}
            defaultOpenKeys={['tagRoutes']}
            style={{ height: '100%', borderRight: 0 }}>
            {/* 事务管理 */}
            <SubMenu
              key='thingRoutes'
              title={
                <span>
                  <CarryOutOutlined />
                  事务管理
                </span>
              }>
              {thingRoutes.map(route => {
                return (
                  <Menu.Item
                    key={route.path}
                    onClick={p => props.history.push(p.key)}>
                    {route.title}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            {/* 标签管理 */}
            <SubMenu
              key='tagRoutes'
              title={
                <span>
                  <TagsOutlined />
                  标签管理
                </span>
              }>
              {tagRoutes.map(route => {
                return (
                  <Menu.Item
                    key={route.path}
                    onClick={p => props.history.push(p.key)}>
                    {route.title}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            {/* 小组管理 */}
            <SubMenu
              key='teamRoutes'
              title={
                <span>
                  <TeamOutlined />
                  小组管理
                </span>
              }>
              {teamRoutes.map(route => {
                return (
                  <Menu.Item
                    key={route.path}
                    onClick={p => props.history.push(p.key)}>
                    {route.title}
                  </Menu.Item>
                );
              })}
            </SubMenu>
            {/* 用户管理 */}
            {userOperateRoutes.length !== 0 && (
              <SubMenu
                key='userOperateRoutes'
                title={
                  <span>
                    <UserSwitchOutlined />
                    用户管理
                  </span>
                }>
                {userOperateRoutes.map(route => {
                  return (
                    <Menu.Item
                      key={route.path}
                      onClick={p => props.history.push(p.key)}>
                      {route.title}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            )}
            {/* 角色权限管理 */}
            {roleRoutes.length !== 0 && (
              <SubMenu
                key='roleRoutes'
                title={
                  <span>
                    <SettingTwoTone />
                    角色权限管理
                  </span>
                }>
                {roleRoutes.map(route => {
                  return (
                    <Menu.Item
                      key={route.path}
                      onClick={p => props.history.push(p.key)}>
                      {route.title}
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            )}
            {/* 测试用 */}
            <SubMenu
              key='testRoutes'
              title={
                <span>
                  <UserOutlined />
                  测试用
                </span>
              }>
              {testRoutes.map(route => {
                return (
                  <Menu.Item
                    key={route.path}
                    onClick={p => props.history.push(p.key)}>
                    {route.title}
                  </Menu.Item>
                );
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 16px 16px' }}>
          <Content
            className='site-layout-background'
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280
            }}>
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(connect(({ userInfo }) => ({ userInfo }))(Index));
