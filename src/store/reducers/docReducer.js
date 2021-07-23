import { DOC_ERROR, DOC_POST, DOC_SUCCESS } from '../actions/actionsType'

const initialState = {
  error: '',
  loading: false,
  data: null,
}

export const docReducer = (state = initialState, action) => {
  switch (action.type) {
    case DOC_POST:
      return {
        ...state,
        error: '',
        loading: true,
        data: null,
      }
    case DOC_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        data: action.payload,
      }
    case DOC_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null,
      }

    default:
      return state
  }
}
