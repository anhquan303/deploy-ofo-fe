/*
 *
 * FoodDetail reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export const initialState = {
  loading: false,
  message: "",
  food: undefined
};

/* eslint-disable default-case, no-param-reassign */
const foodDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case types.GET_FOOD_BY_ID:
        draft.loading = true;
        break;
      case types.GET_FOOD_BY_ID_SUCCESS:
        draft.loading = false;
        draft.food = action.payload;
        break;
      case types.GET_FOOD_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
    }
  });

export default foodDetailReducer;
