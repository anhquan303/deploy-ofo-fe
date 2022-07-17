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
  food: undefined,
  rating: 0,
  listComment: []
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
      case types.GET_RATING_FOOD_BY_ID:
        draft.loading = true;
        break;
      case types.GET_RATING_FOOD_BY_ID_SUCCESS:
        draft.loading = false;
        draft.rating = action.payload;
        break;
      case types.GET_RATING_FOOD_BY_ID_FAILED:
        draft.loading = false;
        draft.rating = action.payload;
        break;
      case types.GET_LIST_COMMENT_FOOD_BY_ID:
        draft.loading = true;
        break;
      case types.GET_LIST_COMMENT_FOOD_BY_ID_SUCCESS:
        draft.loading = false;
        draft.listComment = action.payload;
        break;
      case types.GET_LIST_COMMENT_FOOD_BY_ID_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_TO_CART:
        draft.loading = true;
        break;
      case types.ADD_TO_CART_SUCCESS:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.ADD_TO_CART_FAILED:
        draft.loading = false;
        draft.message = action.payload;
        break;
      case types.RESET:
        draft.loading = false;
        draft.message = "";
        break;
    }
  });

export default foodDetailReducer;
