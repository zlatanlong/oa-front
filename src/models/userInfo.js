export default {
  namespace: 'userInfo',

  state: {
    // TODO 改回来到时候
    isLogined: true,
    info: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      yield put({ type: 'save' });
    }
  },

  reducers: {
    save(state, action) {
      console.log('action', action);
      return { ...state, info: action.data, isLogined: action.isLogined };
    }
  }
};
