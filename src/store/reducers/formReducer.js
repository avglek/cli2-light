import {
  FORM_ADD_PARAMS,
  FORM_SUBMIT,
  FORM_CLEAR,
} from '../actions/actionsType'

const initialState = {
  call: '',
  uid: '',
  id: '',
  params: [],
}

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_ADD_PARAMS:
      const filtredParams = state.params.filter(
        (i) => i.name !== action.payload.name
      )
      return {
        ...state,
        params: [...filtredParams, action.payload],
      }

    case FORM_CLEAR:
      return {
        ...state,
        call: '',
        uid: '',
        id: '',
        params: [],
      }
    case FORM_SUBMIT:
      return {
        ...state,
        call: action.payload.call,
        uid: action.payload.uid,
        id: action.payload.id,
      }

    default:
      return state
  }
}
