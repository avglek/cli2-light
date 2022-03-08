import {
  TAB_ADD,
  TAB_CHANGE,
  TAB_CLEAR,
  TAB_REMOVE,
  TAB_UPDATE,
} from '../actions/actionsType';

const initialState = {
  items: [],
  pointer: 0,
  count: 0,
};

export default function tabReducer(state = initialState, action) {
  switch (action.type) {
    case TAB_ADD:
      return {
        ...state,
        items: [...state.items, action.payload],
        count: state.items.length,
        pointer: state.items.length,
      };
    case TAB_REMOVE:
      const items = state.items.filter((i, inx) => inx !== action.payload);
      let current = state.pointer;

      if (action.payload === state.pointer) {
        current =
          action.payload > items.length - 1 ? items.length - 1 : action.payload;
      } else {
        current = state.pointer === 0 ? 0 : state.pointer - 1;
      }

      return {
        ...state,
        items,
        count: items.length,
        pointer: current,
      };

    case TAB_CHANGE:
      const pointer = action.payload;
      return { ...state, pointer: pointer < 0 ? 0 : pointer };

    case TAB_UPDATE:
      const cloneItems = state.items.map((item) => {
        if (item.uid === action.payload.uid) {
          item = { ...item, ...action.payload };
        }
        return item;
      });

      return { ...state, items: cloneItems };

    case TAB_CLEAR:
      const cleanItems = state.items.map((item) => {
        if (item.uid === action.payload.uid) {
          item = {
            ...action.payload,
            loading: true,
            from: item.from,
          };
        }
        return item;
      });

      return { ...state, items: cleanItems };

    default:
      return state;
  }
}
