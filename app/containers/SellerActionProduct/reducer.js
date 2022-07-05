/*
 *
 * SellerActionProduct reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: ""
};

/* eslint-disable default-case, no-param-reassign */
const sellerActionProductReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.DELETE_PRODUCT:
        draft.loading = true;
        break;
      case types.DELETE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.DELETE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_PRODUCT:
        draft.loading = true;
        break;
      case types.UPDATE_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.UPDATE_PRODUCT_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default sellerActionProductReducer;
