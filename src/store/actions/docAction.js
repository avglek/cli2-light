import {DOC_ERROR, DOC_POST, DOC_SUCCESS} from './actionsType'

export const postDoc = (query) => ({
  type: DOC_POST,
  payload: query,
})

export const succesDoc = (response) => {

  return {
    type: DOC_SUCCESS,
    payload: response,
  }
}

export const errorDoc = (error) => ({
  type: DOC_ERROR,
  payload: error,
})
