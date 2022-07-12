/*
 *
 * FoodDetail actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getFoodById(payload) {
  return {
    type: types.GET_FOOD_BY_ID,
    payload
  };
}


export function getFoodByIdSuccess(payload) {
  return {
    type: types.GET_FOOD_BY_ID_SUCCESS,
    payload
  };
}


export function getFoodByIdFailed(payload) {
  return {
    type: types.GET_FOOD_BY_ID_FAILED,
    payload
  };
}

