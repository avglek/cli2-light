import {
  UPDATE_POST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  UPDATE_CLEAR,
} from '../actions/actionsType';

const initialState = {
  error: '',
  loading: false,
  data: null,
};

export const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return {
        ...state,
        error: '',
        loading: true,
        data: null,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        data: action.payload,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        data: null,
      };

    default:
      return state;
  }
};
