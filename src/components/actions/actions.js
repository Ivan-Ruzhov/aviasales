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
  STOP_STATIC,
  STOP_INC,
  ERROR,
} from './types'
const ticket = (fn) => {
  try {
    return async (dispatch) => {
      const res = await fn
      if (!res) {
        dispatch(stopInc())
        return null
      }
      if (!res.stop) {
        dispatch(stopInc())
      } else {
        dispatch(loadingEnd())
        dispatch(stopStatic())
      }
      dispatch({ type: TICKETS, arr: res })
    }
  } catch (err) {
    throw new Error(err)
  }
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

const stopInc = () => ({ type: STOP_INC })

const stopStatic = () => ({ type: STOP_STATIC })

const loadingBegin = () => ({ type: LOADING_BEGIN })

const loadingEnd = () => ({ type: LOADING_END })

const error = () => ({ type: ERROR })

export { ticket, moreTickets, setCheckAll, setCheckedList, onSale, onFast, onOptimal, loadingBegin, error }
