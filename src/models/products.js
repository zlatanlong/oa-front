import * as service from '../services/example';

export default {
  // 数据和方法都是绑定着命名空间
  namespace: 'products',
  state: {
    name: '张三',
    data: [
      { name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
      { name: 'umi', id: 3 },
      { name: 'hhh', id: 4 },
    ],
    cnode: {}
  },
  // reducers必须有一个返回值
  reducers: {
    // 每一个行为的第一个参数是dva管理的是数据
    // 后面的参数是action
    'delete'(state, { payload: id }) {
      // 这么写相当于数组中删除为指定id的
      console.log(state.data.filter(item => item.id !== id))
      const newData = state.data.filter(item => item.id !== id);
      return { ...state, data: newData }
    },
    setName(state, action) {
      return { ...state, name: action.data.name };
    },
    setCnode(state, action) {
      return { ...state, cnode: action.data };
    }
  },

  /**
   * 有副作用的 异步的
   */
  effects: {
    /**
     * 
     * @param {payload} param0 payload是dispatch传递的action
     * @param {put, call} param1 put的参数是一个新的action, call是call一个接口
     */
    *setNameAsync({ data }, { put, call }) {
      const newAction = {
        type: 'setName',
        data: data,
      }
      yield put(newAction)
    },
    * testCnode(action, { put, call }) {
      let rel = yield call(service.testCnode)
      if (rel.data) {
        yield put({
          type: 'setCnode',
          data: rel.data,
        })
      }
      console.log(rel)
    }

  },
  subscriptions: {
    /**
     * 
     * @param {*} param0 dispatch就是它，可以传action，history可以判断路由
     */
    testProducts({ dispatch, history }) {
      history.listen(
        (canshu) => {
          console.log(canshu)
          if (canshu.pathname === '/products') {
            console.log('hahah')
          }
        }
      )
    }
  }

};