import {
  AUTH_ERROR,
  AUTH_POST,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/actionsType'

const initialState = {
  user: '',
  password: '',
  resource: '',
  login: false,
  error: null,
}
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_POST:
      return {
        ...state,
        user: action.payload.user,
        password: action.payload.password,
        resource: action.payload.resource,
        error: null,
        login: false,
      }
    case AUTH_ERROR:
      return {
        ...state,
        user: '',
        password: '',
        resource: '',
        login: false,
        error: action.payload,
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        login: true,
        error: null,
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        login: false,
        error: null,
      }

    default:
      return state
  }
}
