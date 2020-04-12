import { Layout, Menu, Breadcrumb, Dropdown, Avatar, message, Space } from 'antd';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { DownOutlined, UserOutlined, CarryOutOutlined, TeamOutlined, UserSwitchOutlined, SettingOutlined, LogoutOutlined, TagsOutlined, SettingTwoTone, SmileOutlined, } from '@ant-design/icons';
import Logo from '../../assets/yay.jpg';
import * as routers from '../../routes';
import style from './frame.css';
import { clearToken } from '../../utils/authc';


const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const thingRoutes = routers.thingRoutes.filter(route => route.isShow && !route.controlled)
const teamRoutes = routers.teamRoutes.filter(route => route.isShow && !route.controlled)
const roleRoutes = routers.roleRoutes.filter(route => route.isShow && !route.controlled)
const tagRoutes = routers.tagRoutes.filter(route => route.isShow && !route.controlled)
const userOperateRoutes = routers.userOperateRoutes.filter(route => route.isShow && !route.controlled)
const testRoutes = routers.testRoutes.filter(route => route.isShow && !route.controlled)


function Index(props) {
  const popMenu = (
    <Menu onClick={(p) => {
      if (p.key === 'logOut') {
        props.history.push('/login')
        props.dispatch({
          type: 'userInfo/save',
          isLogined: false
        })
        clearToken()
      } else if (p.key === 'info') {
        props.history.push('/u/info')
      } else {
        message.info(p.key)
      }
    }
    }>
      <Menu.Item key='noti'>通知中心</Menu.Item>
      <Menu.Item key='info'><SmileOutlined />个人信息</Menu.Item>
      <Menu.Item key='setting'><SettingOutlined />设置</Menu.Item>
      <Menu.Item key='logOut'><LogoutOutlined />退出</Menu.Item>
    </Menu >
  );

  return (
    <Layout style={{ height: "100%" }}>
      <Header className={style.header}>
        <Space>
          <img src={Logo} alt="logo" style={{ width: "100px" }} />
          <span className={style.headerTitle}>OA管理系统</span>
        </Space>
        <Dropdown overlay={popMenu}>
          <div>
            <Avatar>U</Avatar>
            <span style={{ color: '#fff', margin: '0 10px' }}>
              超级管理员 <DownOutlined />
            </span>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['/admin/thing']}
            defaultOpenKeys={['thingRoutes']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {/* {routes.map(route => {
              return (
                <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
              )
            })} */}
            {/* 事务管理 */}
            <SubMenu
              key="thingRoutes"
              title={
                <span>
                  <CarryOutOutlined />
                    事务管理
                  </span>
              }
            >
              {thingRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 标签管理 */}
            <SubMenu
              key="tagRoutes"
              title={
                <span>
                  <TagsOutlined />
                  标签管理
                </span>
              }
            >
              {tagRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 小组管理 */}
            <SubMenu
              key="teamRoutes"
              title={
                <span>
                  <TeamOutlined />
                    小组管理
                  </span>
              }
            >
              {teamRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 用户管理 */}
            {userOperateRoutes.length !== 0 && <SubMenu
              key="userOperateRoutes"
              title={
                <span>
                  <UserSwitchOutlined />
                    用户管理
                  </span>
              }
            >
              {userOperateRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>}
            {/* 角色权限管理 */}
            {roleRoutes.length !== 0 && <SubMenu
              key="roleRoutes"
              title={
                <span>
                  <SettingTwoTone />
                  角色权限管理
                </span>
              }
            >
              {roleRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>}
            {/* 测试用 */}
            <SubMenu
              key="testRoutes"
              title={
                <span>
                  <UserOutlined />
                    测试用
                  </span>
              }
            >
              {testRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 16px 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default withRouter(
  connect(({ userInfo }) => ({ userInfo }))(Index)
);