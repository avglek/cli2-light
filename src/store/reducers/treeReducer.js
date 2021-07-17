import { TREE_ERROR, TREE_SUCCESS, TREE_POST } from '../actions/actionsType'

const initialState = {
  loading: false,
  error: '',
  items: [],
}

export const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREE_POST:
      return {
        ...state,
        loading: true,
        error: '',
        items: [],
      }
    case TREE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        items: [],
      }
    case TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        items: action.payload,
      }
    default:
      return state
  }
}
