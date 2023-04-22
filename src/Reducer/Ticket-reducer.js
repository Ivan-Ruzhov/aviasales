import {
  TICKETS,
  BUTTON_FAST,
  BUTTON_OPTIMAL,
  BUTTON_SALES,
  LOADING_END,
  LOADING_BEGIN,
  ERROR,
  ID,
  NO_ERROR,
} from '../actions/types'

const defaultState = {
  tickets: [],
  stops: 0,
  err: '',
  loading: '',
  end: '',
  searchId: '',
}
const totalDuration = (data) => data.segments.reduce((acc, prev) => (acc += prev.duration), 0)

const ticketReducer = (state = defaultState, action) => {
  const arr = state.tickets.slice(0)
  switch (action.type) {
    case ID:
      return {
        ...state,
        searchId: action.id,
      }
    case TICKETS:
      return {
        ...state,
        tickets: [...action.arr.tickets, ...state.tickets.slice(0)],
        end: action.arr.stop,
      }
    case BUTTON_SALES:
      return {
        ...state,
        tickets: arr.sort((a, b) => a.price - b.price),
      }
    case BUTTON_FAST:
      return {
        ...state,
        tickets: arr.sort((a, b) => {
          const overalDuration = ({ segments }) => segments.reduce((acc, { duration }) => acc + duration, 0)
          return overalDuration(a) - overalDuration(b)
        }),
      }
    case BUTTON_OPTIMAL:
      return {
        ...state,
        tickets: arr.sort((a, b) => {
          const optimalPrev = a.price + totalDuration(a)
          const optimalNext = b.price + totalDuration(b)
          return optimalPrev - optimalNext
        }),
      }
    case LOADING_BEGIN:
      return {
        ...state,
        loading: true,
      }
    case LOADING_END:
      return {
        ...state,
        loading: false,
      }
    case ERROR:
      return {
        ...state,
        err: action.payload,
      }
    case NO_ERROR:
      return {
        ...state,
        err: '',
      }
    default:
      return state
  }
}

export { ticketReducer }
