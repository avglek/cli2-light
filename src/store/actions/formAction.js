import { FORM_ADD_PARAMS, FORM_SUBMIT, FORM_CLEAR } from './actionsType'

export const submitForm = (payload) => ({
  payload,
  type: FORM_SUBMIT,
})

export const addParamsForm = (payload) => ({
  type: FORM_ADD_PARAMS,
  payload,
})

export const clearForm = () => ({
  type: FORM_CLEAR,
})
