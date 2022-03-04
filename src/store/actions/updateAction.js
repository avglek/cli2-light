import {
  UPDATE_POST,
  UPDATE_SUCCESS,
  UPDATE_CLEAR,
  UPDATE_ERROR,
} from './actionsType';

export function updatePost(payload) {
  return {
    type: UPDATE_POST,
    payload,
  };
}

export function updateSuccess(payload) {
  return {
    type: UPDATE_SUCCESS,
    payload,
  };
}

export function updateClear() {
  return {
    type: UPDATE_CLEAR,
  };
}

export function updateError(payload) {
  return {
    type: UPDATE_ERROR,
    payload,
  };
}
