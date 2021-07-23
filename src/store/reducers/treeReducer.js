import { TREE_ERROR, TREE_SUCCESS, TREE_POST } from '../actions/actionsType'

const initialState = {
  loading: false,
  error: '',
  tree: [],
  docs: [],
}

export const treeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TREE_POST:
      return {
        ...state,
        loading: true,
        error: '',
        tree: [],
        docs: [],
      }
    case TREE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        tree: [],
        docs: [],
      }
    case TREE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        tree: action.payload.tree,
        docs: action.payload.docs,
      }
    default:
      return state
  }
}
