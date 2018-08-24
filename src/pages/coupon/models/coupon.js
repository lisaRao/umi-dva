import Immutable from 'immutable';
import * as couponService from '../services/coupon';

const immutableState = Immutable.fromJS({
  list: [],
  historyList: [],
  total: null,
  page: null,
  pageSize: null,
});

export default {
  namespace: 'coupon',
  state: immutableState,
  reducers: {
    save(state, { payload: { list, total, page, pageSize} }) {
      return { ...state, list, total, page, pageSize };
    },
  },
  effects: {
    *getCoupon({payload: values}, {call, put}) {
      const { data } = yield call(couponService.fetchCoupon, values);
      if(data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            list: data.data.list,
            total: data.data.total,
            page: values._page,
            pageSize: values._pageSize,
          },
        });
      }

    },
    *add({ payload: values, toast }, { call}) {
      const {data} = yield call(couponService.addCoupon, values);
      if(data.code === 0) {
        toast.info(data.message, 2);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/coupon') {
          dispatch({ type: 'getCoupon', payload: {...query, _page: 1, _pageSize: 100, orderby: 'date'} });
        }
      });
    },
  },
};
