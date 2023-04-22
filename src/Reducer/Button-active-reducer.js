import { BUTTON } from '../actions/types'

const initialState = {
  activeFilter: '',
}

const buttonActive = (state = initialState, action) => {
  switch (action.type) {
    case BUTTON:
      return {
        ...state,
        activeFilter: action.payload,
      }

    default:
      return state
  }
}

export { buttonActive }
