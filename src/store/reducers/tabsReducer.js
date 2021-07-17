import { TAB_ADD, TAB_CHANGE, TAB_REMOVE } from '../actions/actionsType'

const initialState = {
  items: [],
  value: 0,
}

export default function tabReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_ADD:
      return {
        ...state,
        items: [...state.items, action.payload],
        value: state.items.length,
      }
    case TAB_REMOVE:
      const items = state.items.filter((i, inx) => inx !== action.payload)
      return { ...state, items, value: state.value >= -1 ? state.value : 0 }
    case TAB_CHANGE:
      const value = action.payload
      return { ...state, value }
    default:
      return state
  }
}
