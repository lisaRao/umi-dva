import Immutable from 'immutable';
import * as couponService from '../services/coupon';

const immutableState = Immutable.fromJS({
  list: [],
  historyList: [],
  total: null,
  page: null,
});

export default {
  namespace: 'coupon',
  state: immutableState,
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *getCoupon({payload: values}, {call, put}) {
      const {data} = yield call(couponService.fetchCoupon, values);
      yield put({
        type: 'save',
        payload: {
          data
        },
      });
    },
    *add({ payload: values }, { call }) {
      yield call(couponService.addCoupon, values);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
