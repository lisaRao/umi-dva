import Immutable from 'immutable';
import * as couponService from '../services/coupon';

const immutableState = Immutable.fromJS({
  couponList: [],
  couponHistoryList: [],
  couponData: {
    total: null,
    page: null,
    pageSize: null,
  },
  listCode: 0,
  historyCode: 0,
  historyData: {
    total: null,
    page: null,
    pageSize: null,
  },
});

export default {
  namespace: 'coupon',
  state: immutableState,
  reducers: {
    save(state, {
      payload: {
        couponList, 
        couponData, 
        listCode, 
        couponHistoryList,
        historyData,
        historyCode
      }}) {
      return { ...state, couponList, couponData, listCode, couponHistoryList, historyData, historyCode };
    },
  },
  effects: {
    *getCoupon({payload: values}, {call, put}) {
      const { data } = yield call(couponService.fetchCoupon, values);
      if(data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            couponList: data.data.list,
            couponData: {
              ...data.data, 
              page: values._page,
              pageSize: values._pageSize,
            }
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            listCode: data.code
          },
        });
      }
    },
    *getHistoryCoupon({payload: values}, {call, put}) {
      const { data } = yield call(couponService.fetchHistoryCoupon, values);
      if(data.code === 0) {
        yield put({
          type: 'save',
          payload: {
            couponHistoryList: data.data.list,
            historyData: {
              ...data.data, 
              page: values._page,
              pageSize: values._pageSize,
            }
          },
        });
      } else {
        yield put({
          type: 'save',
          payload: {
            historyCode: data.code
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
        const orderby = query.from || 'date';
        if (pathname === '/coupon') {
          dispatch({ type: 'getCoupon', payload: {...query, _page: 1, _pageSize: 100, orderby: orderby} });
        }
        if(pathname === '/coupon/history') {
          dispatch({ type: 'getHistoryCoupon', payload: {...query, _page: 1, _pageSize: 100 } });
        }
      });
    },
  },
};
