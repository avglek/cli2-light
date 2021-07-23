import { AUTH_ERROR, AUTH_POST, AUTH_SUCCESS, AUTH_LOGOUT } from './actionsType'

export const postAuth = (formdata) => ({
  type: AUTH_POST,
  payload: { ...formdata },
})

export const succesAuth = () => ({
  type: AUTH_SUCCESS,
})
export const logoutAuth = () => ({
  type: AUTH_LOGOUT,
})

export const errorAuth = (error) => {
  console.log('actiot', error)
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}
