import { Reducer } from 'redux';
import { UserInfo } from '@/typings';
import { Effect } from 'dva';
import * as service from '@/services/global';
import {
  menuList as MENU_LIST,
  breadcrumbNameMap as BREAD_CRUMB_NAEMMAP,
} from './constant';

export interface IGlobalModelState {
  userInfo: UserInfo<number | string>;
  breadcrumbNameMap: any;
  menuList: any;
}

export interface IGlobalModel {
  namespace: 'global';
  state: IGlobalModelState;
  reducers: {
    updateState: Reducer<any>;
  };
  effects: {
    fetch: Effect;
    fetchUserInfo: Effect;
    fetchMenu: Effect;
  };
  subscriptions: {
    setup: Effect;
  };
}

const GlobalModel: IGlobalModel = {
  namespace: 'global',
  state: {
    userInfo: {},
    breadcrumbNameMap: {},
    menuList: [],
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      yield put({ type: 'fetchUserInfo', payload: {} });
      yield put({ type: 'fetchMenu', payload: {} });
      // @ts-ignore
      const data = yield select((state: any) => state.global);
      return data;
    },
    *fetchUserInfo({ payload }, { call, put }) {
      try {
        const { data: userInfo } = yield call(service.fetchUserInfo);
        yield put({
          type: 'updateState',
          payload: {
            userInfo,
          },
        });
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            userInfo: {},
          },
        });
      }
    },
    *fetchMenu({ payload }, { call, put }) {
      try {
        const { data } = yield call(service.fetchMenu);
        const { breadcrumbNameMap = {}, menuList = [] } = data;
        yield put({
          type: 'updateState',
          payload: {
            breadcrumbNameMap,
            menuList,
          },
        });
      } catch (error) {
        yield put({
          type: 'updateState',
          payload: {
            breadcrumbNameMap: BREAD_CRUMB_NAEMMAP,
            menuList: MENU_LIST,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ location }: any) => {
        const { pathname } = location;
        if (pathname === '/') {
          // dispatch({ type: 'fetch', payload: {} });
        }
      });
    },
  },
};

export default GlobalModel;
