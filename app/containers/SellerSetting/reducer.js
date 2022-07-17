/*
 *
 * SellerSetting reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  user: undefined,
  listWard: []
};

/* eslint-disable default-case, no-param-reassign */
const sellerSettingReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_STORE_BY_ID:
        draft.loading = true;
        break;
      case types.GET_STORE_BY_ID_SUCCESS:
        draft.loading = false;
        draft.user = action.payload;
        break;
      case types.GET_STORE_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.GET_LIST_WARDS:
        draft.loading = true;
        break;
      case types.GET_LIST_WARDS_SUCCESS:
        draft.loading = false;
        draft.listWard = action.payload;
        break;
      case types.GET_LIST_WARDS_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerSettingReducer;
