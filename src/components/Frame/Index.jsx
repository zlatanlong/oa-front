import { Layout, Menu, Breadcrumb, Dropdown, Avatar, message ,Space } from 'antd';
import { withRouter } from 'dva/router';
import { DownOutlined, UserOutlined, CarryOutOutlined, TeamOutlined, UserSwitchOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import Logo from '../../assets/yay.jpg';
import { adminRoutes } from '../../routes';
import style from './frame.css';
import { clearToken } from '../../utils/authc';


const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const routes = adminRoutes.filter(route => route.isShow);

const thingRoutes = routes.filter(route => route.path.indexOf('/admin/thing') === 0)
const userRoutes = routes.filter(route => route.path.indexOf('/admin/user') === 0)
const teamRoutes = routes.filter(route => route.path.indexOf('/admin/team') === 0)
const myRoutes = routes.filter(route => route.path.indexOf('/admin/mine') === 0)
const testRoutes = routes.filter(route => route.path.indexOf('/admin/test') === 0)


function Index(props) {
  const popMenu = (
    <Menu onClick={(p) => {
      if (p.key === 'logOut') {
        props.history.push('/login')
        clearToken()
      } else {
        message.info(p.key)
      }
    }
    }>
      <Menu.Item key='noti'>通知中心</Menu.Item>
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
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            {/* {routes.map(route => {
              return (
                <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
              )
            })} */}
            {/* 事务 */}
            <SubMenu
              key="sub1"
              title={
                <span>
                  <CarryOutOutlined />
                    事务
                  </span>
              }
            >
              {thingRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 用户 */}
            <SubMenu
              key="sub2"
              title={
                <span>
                  <UserSwitchOutlined />
                    用户操作
                  </span>
              }
            >
              {userRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 小组 */}
            <SubMenu
              key="sub3"
              title={
                <span>
                  <TeamOutlined />
                    小组
                  </span>
              }
            >
              {teamRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 个人信息 */}
            <SubMenu
              key="sub5"
              title={
                <span>
                  <UserOutlined />
                    我的
                  </span>
              }
            >
              {myRoutes.map(route => {
                return (
                  <Menu.Item key={route.path} onClick={p => props.history.push(p.key)}>{route.title}</Menu.Item>
                )
              })}
            </SubMenu>
            {/* 测试用 */}
            <SubMenu
              key="sub4"
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

export default withRouter(Index);