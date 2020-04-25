export default {
  namespace: 'addThing',

  state: {
    title: '',
    content: '',
    hasSendFile: '0',
    needFinish: '0',
    needAnswer: '0',
    needFileReply: '0',
    startTime: null,
    endTime: null,
    tagId: null,
    userTeam: true,
    teamId: 0,
    receiverIds: [],
    files: [],
    questionsJSON: '',
    showStepKeys: [1, 2, 3, 5]
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
      return { ...state, ...action.payload };
    }
  }
};
