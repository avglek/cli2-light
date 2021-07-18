import { AUTH_ERROR, AUTH_POST, AUTH_SUCCESS } from './actionsType'

export const postAuth = (formdata) => ({
  type: AUTH_POST,
  payload: { ...formdata },
})

export const succesAuth = (response) => ({
  type: AUTH_SUCCESS,
})

export const errorAuth = (error) => {
  console.log('actiot', error)
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}
