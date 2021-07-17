import {CLI2_ERROR, CLI2_POST, CLI2_SUCCESS} from './actionsType'

export const postCli2 = query => ({
    type: CLI2_POST,
    payload:query,
  })

export const succesCli2 = response =>({
  type: CLI2_SUCCESS,
  payload:response,
})

export const errorCli2 = error =>({
  type: CLI2_ERROR,
  payload:error,
})