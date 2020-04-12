import Login from "./pages/Login"
import Index from "./pages/admin/Index"
import Products from "./pages/test/Products"
import PageNotFound from "./pages/PageNotFound"
import Routines from "./pages/test/Routines"
import Edit from "./pages/test/Edit"
import UserAdd from "./pages/user/UserAdd"
import Vote from "./pages/test/Vote"
import UserInfo from './pages/personal/UserInfo';

export const mainRoutes = [
  {
    path: '/login',
    component: Login
  }, {
    path: '/404',
    component: PageNotFound
  },
]

export const thingRoutes = [
  {
    path: '/thing/joinedlist',
    component: Index,
    exact: true,
    isShow: true,
    title: '日程表'
  }, {
    path: '/thing/joinedinfo/:id',
    component: Index,
    exact: true,
    isShow: false,
    title: '收到事务详情页'
  }, {
    path: '/thing/edit/:id?',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '创建事务'
  }, {
    path: '/thing/createdlist',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '已创建事务列表'
  }, {
    path: '/thing/createdinfo/:id',
    component: Index,
    exact: true,
    isShow: false,
    controlled: true,
    title: '已创建事务详情'
  }, {
    path: '/thing/edit/mine',
    component: Index,
    exact: true,
    isShow: true,
    title: '创建个人事务'
  }
]

export const teamRoutes = [
  {
    path: '/team/list',
    component: Index,
    exact: true,
    isShow: true,
    title: '我的小组'
  },{
    path: '/team/edit',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '创建小组'
  },{
    path: '/team/createdlist',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '已创建小组列表'
  },
]

export const roleRoutes = [
  {
    path: '/sys/roles',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '角色列表',
  },{
    path: '/sys/role/add',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '添加角色'
  },{
    path: '/sys/role/:id',
    component: Index,
    exact: true,
    isShow: false,
    controlled: true,
    title: '修改角色权限'
  }
]

export const tagRoutes = [
  {
    path: '/tag/list',
    component: Index,
    exact: true,
    isShow: true,
    title: '我的标签'
  },{
    path: '/tag/edit/:id',
    component: Index,
    exact: true,
    isShow: true,
    title: '创建标签'
  },{
    path: '/tag/public/edit/:id',
    component: Index,
    exact: true,
    isShow: false,
    controlled: true,
    title: '创建共有标签'
  },
]

export const userOperateRoutes = [
  {
    path: '/user/addusers',
    component: UserAdd,
    exact: true,
    isShow: true,
    controlled: true,
    title: '添加用户'
  },{
    path: '/user/list',
    component: Index,
    exact: true,
    isShow: true,
    controlled: true,
    title: '所有用户'
  },{
    path: '/user/edit/:id',
    component: Index,
    exact: true,
    isShow: false,
    controlled: true,
    title: '更新用户信息'
  },
]

export const userRoutes = [
  {
    path: '/u/info',
    component: UserInfo,
    exact: true,
    isShow: false,
    title: '个人信息'
  }
]

export const testRoutes = [
  {
    path: '/test/Vote',
    component: Vote,
    exact: true,
    isShow: true,
    title: '投票模块'
  },{
    path: '/test/products',
    component: Products,
    exact: true,
    isShow: true,
    title: 'products'
  },{
    path: '/test/routines',
    component: Routines,
    exact: true,
    isShow: true,
    title: 'Routines'
  },{
    path: '/test/edit',
    component: Edit,
    exact: true,
    isShow: false,
    title: 'Edit'
  },
]

export const adminRoutes = [
  ...thingRoutes,
  ...teamRoutes,
  ...roleRoutes,
  ...tagRoutes,
  ...userOperateRoutes,
  ...userRoutes,
  ...testRoutes
]

