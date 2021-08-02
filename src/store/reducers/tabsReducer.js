import {
  TAB_ADD,
  TAB_CHANGE,
  TAB_CLEAR,
  TAB_REMOVE,
  TAB_UPDATE,
} from '../actions/actionsType'

const initialState = {
  items: [],
  count: 0,
}

export default function tabReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_ADD:
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.items.length,
      }
    case TAB_REMOVE:
      const items = state.items.filter((i, inx) => inx !== action.payload)
      return { ...state, items, count: state.count > 0 ? state.count : 0 }

    case TAB_CHANGE:
      const count = action.payload
      return { ...state, count }

    case TAB_UPDATE:
      const cloneItems = state.items.map((item) => {
        if (item.uid === action.payload.uid) {
          item = { ...item, ...action.payload }
        }
        return item
      })

      return { ...state, items: cloneItems }

    case TAB_CLEAR:
      const cleanItems = state.items.map((item) => {
        if (item.uid === action.payload.uid) {
          item = {
            uid: action.payload.uid,
            title: action.payload.title,
            loading: true,
          }
        }
        return item
      })

      return { ...state, items: cleanItems }

    default:
      return state
  }
}
