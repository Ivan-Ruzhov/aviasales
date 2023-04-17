import {
  TICKETS,
  BUTTON_FAST,
  BUTTON_OPTIMAL,
  BUTTON_SALES,
  LOADING_END,
  LOADING_BEGIN,
  STOP_STATIC,
  STOP_INC,
  ERROR,
} from '../actions/types'

const defaultState = {
  tickets: [],
  stops: 0,
  err: '',
  loading: '',
  end: '',
}
const totalDuration = (data) => data.segments.reduce((acc, prev) => (acc += prev.duration), 0)

const ticketReducer = (state = defaultState, action) => {
  const arr = state.tickets.slice(0)
  switch (action.type) {
    case TICKETS:
      console.log(action.arr.tickets)
      // eslint-disable-next-line no-case-declarations
      const ticket = action.arr.tickets.map((el) => ({
        price: el.price,
        logo: el.carrier,
        segments: el.segments,
      }))
      return {
        ...state,
        tickets: [...state.tickets.slice(0), ...ticket],
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
    case STOP_INC:
      return {
        ...state,
        stops: (state.stops += 1),
      }
    case STOP_STATIC:
      return state
    case ERROR:
      return {
        ...state,
        err: action.payload,
      }
    default:
      return state
  }
}

export { ticketReducer }
