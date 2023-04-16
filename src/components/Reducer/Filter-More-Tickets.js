import { FILTER_MORE_TICKETS } from '../actions/types'

const defaultState = {
  count: 5,
}

const moreTickets = (state = defaultState, action) => {
  switch (action.type) {
    case FILTER_MORE_TICKETS:
      return {
        count: state.count + 5,
      }
    default:
      return state
  }
}

export { moreTickets }
