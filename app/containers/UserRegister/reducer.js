/*
 *
 * UserRegister reducer
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
const userRegisterReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.SIGN_UP:
        draft.loading = true;
        break;
      case types.SIGN_UP_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.SIGN_UP_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default userRegisterReducer;
