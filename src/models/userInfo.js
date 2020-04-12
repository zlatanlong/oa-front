
export default {

  namespace: 'userInfo',

  state: {
    isLogined: false,
    info: {}
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      console.log('action', action)
      return { ...state, info: action.data, isLogined: action.isLogined };
    },
  },

};
