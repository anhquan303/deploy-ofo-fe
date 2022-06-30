/*
 *
 * SellerRegister reducer
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
const sellerRegisterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.SELLER_SIGNUP:
        draft.loading = true;
        break;
      case types.SELLER_SIGNUP_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SELLER_SIGNUP_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default sellerRegisterReducer;
