export const pingReducer = (state = { isPinging: false }, action) => {
  switch (action.type) {
    case 'PING':
      return { ...state, isPinging: true }

    case 'PONG':
      return { ...state, isPinging: false }
    case 'VALUE':
      return { ...state, isPinging: false, value: action.payload }

    default:
      return state
  }
}
