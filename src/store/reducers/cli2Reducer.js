import { CLI2_ERROR, CLI2_POST, CLI2_SUCCESS } from '../actions/actionsType'

const initialState = {
  error: '',
  loading: false,
  data: {},
}

export const cli2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLI2_POST:
      return {
        ...state,
        error: '',
        loading: true,
        data: '',
      }
    case CLI2_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        data: action.payload,
      }
    case CLI2_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: {},
      }

    default:
      return state
  }
}
