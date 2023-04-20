import { SET_CHECK_ALL, SET_CHECKED_lIST } from '../actions/types'

const initialState = {
  checkedList: ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
  checkAll: true,
}

const checkboxOptions = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECKED_lIST:
      return { ...state, checkedList: action.payload }
    case SET_CHECK_ALL:
      return { ...state, checkAll: action.payload }

    default:
      return state
  }
}

export { checkboxOptions }
