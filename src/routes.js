import Login from "./pages/Login"
import Index from "./pages/admin/index"
import Products from "./pages/Products"
import PageNotFound from "./pages/PageNotFound"
import Routines from "./pages/Routines"
import Edit from "./pages/Edit"
import UserAdd from "./pages/user/UserAdd"
import Vote from "./pages/Vote"

export const mainRoutes = [
  {
    path: '/login',
    component: Login
  }, {
    path: '/404',
    component: PageNotFound
  },
]

export const adminRoutes = [
  {
    path: '/admin/index',
    component: Index,
    exact: true,
    isShow: true,
    title: '默认页'
  }, {
    path: '/admin/test/products',
    component: Products,
    exact: true,
    isShow: true,
    title: '商品列表'
  }, {
    path: '/admin/test/routines',
    component: Routines,
    exact: true,
    isShow: true,
    title: '事务列表'
  }, {
    path: '/admin/test/routines/edit/:id?',
    component: Edit,
    exact: true,
    isShow: false,
    title: ''
  }, {
    path: '/admin/user/edit/:id?',
    component: UserAdd,
    exact: true,
    isShow: false,
    title: ''
  }, {
    path: '/admin/test/vote',
    component: Vote,
    exact: true,
    isShow: true,
    title: '投票模块'
  }, {
    path: '/admin/thing/list',
    component: Index,
    exact: true,
    isShow: true,
    title: '事务日程'
  }, {
    path: '/admin/thing/edit/:id?',
    component: Index,
    exact: true,
    isShow: true,
    title: '添加事务'
  }, {
    path: '/admin/thing',
    component: Index,
    exact: true,
    isShow: true,
    title: '事务页'
  }, {
    path: '/admin/user/edit/:id?',
    component: Index,
    exact: true,
    isShow: true,
    title: '添加用户'
  }, {
    path: '/admin/team/list',
    component: Index,
    exact: true,
    isShow: true,
    title: '我的小组'
  }, {
    path: '/admin/team/edit/:id?',
    component: Index,
    exact: true,
    isShow: true,
    title: '添加小组'
  }, {
    path: '/admin/mine',
    component: Index,
    exact: true,
    isShow: true,
    title: '个人信息'
  }, 
]