/*
 *
 * SellerActionProduct actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as types from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function deleteProduct(payload) {
  return {
    type: types.DELETE_PRODUCT,
    payload
  };
}

export function deleteProductSuccess(payload) {
  return {
    type: types.DELETE_PRODUCT_SUCCESS,
    payload
  };
}

export function deleteProductFailed(payload) {
  return {
    type: types.DELETE_PRODUCT_FAILED,
    payload
  };
}

export function updateProduct(payload) {
  return {
    type: types.UPDATE_PRODUCT,
    payload
  };
}

export function updateProductSuccess(payload) {
  return {
    type: types.UPDATE_PRODUCT_SUCCESS,
    payload
  };
}

export function updateProductFailed(payload) {
  return {
    type: types.UPDATE_PRODUCT_FAILED,
    payload
  };
}

export function reset(payload) {
  return {
    type: types.RESET,
    payload
  };
}