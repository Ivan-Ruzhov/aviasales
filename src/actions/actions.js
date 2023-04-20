import {
  TICKETS,
  FILTER_MORE_TICKETS,
  SET_CHECKED_lIST,
  SET_CHECK_ALL,
  BUTTON_SALES,
  BUTTON_FAST,
  BUTTON_OPTIMAL,
  LOADING_END,
  LOADING_BEGIN,
  ERROR,
  ID,
} from './types'

const ticket = (fn, dispatch) => {
  const getTickets = async () => {
    await fn.then((res) => {
      if (!res.stop) {
        dispatch({ type: TICKETS, arr: res })
        getTickets()
      } else {
        dispatch({ type: TICKETS, arr: res })
        dispatch(loadingEnd())
      }
    })
  }
  getTickets()
}
const moreTickets = () => ({ type: FILTER_MORE_TICKETS })

const setCheckedList = (payload) => ({
  type: SET_CHECKED_lIST,
  payload,
})

const setCheckAll = (payload) => ({
  type: SET_CHECK_ALL,
  payload,
})

const onSale = () => ({
  type: BUTTON_SALES,
})

const onOptimal = () => ({ type: BUTTON_OPTIMAL })

const onFast = () => ({ type: BUTTON_FAST })

const loadingBegin = () => ({ type: LOADING_BEGIN })

const loadingEnd = () => ({ type: LOADING_END })

const error = () => ({ type: ERROR })

const id = (fn) => {
  return async (dispatch) => {
    const res = await fn
    dispatch({ type: ID, id: res })
  }
}

export { ticket, moreTickets, setCheckAll, setCheckedList, onSale, onFast, onOptimal, loadingBegin, error, id }
