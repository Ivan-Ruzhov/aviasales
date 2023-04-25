import { ticketsServes } from '../tickets-servise'

import {
  ID,
  TICKETS,
  SET_CHECKED_lIST,
  SET_CHECK_ALL,
  BUTTON_SALES,
  BUTTON_FAST,
  BUTTON_OPTIMAL,
  LOADING_END,
  LOADING_BEGIN,
  ERROR,
  NO_ERROR,
  BUTTON,
} from './types'

const tick = new ticketsServes()
const id = (fn) => {
  return async (dispatch) => {
    return fn.then((res) => {
      dispatch({ type: ID, id: res })
    })
  }
}
const ticket = () => (dispatch) => {
  dispatch(loadingBegin())
  tick
    .getId()
    .then((res) => {
      dispatch({ type: ID, id: res })
      dispatch(getTickets(res))
    })
    .catch((err) => {
      dispatch(error(err.toString()))
      dispatch(loadingEnd())
      return null
    })
}

const getTickets = (payload) => (dispatch) => {
  tick
    .getTickets(payload)
    .then((res) => {
      dispatch({ type: TICKETS, arr: res })
      if (!res.stop) {
        dispatch(getTickets(payload))
      } else {
        dispatch(loadingEnd())
        dispatch(noError())
      }
    })
    .catch((err) => {
      if (err.message === 'Failed to fetch') {
        dispatch(error('Нет сети, проверьте подключение в интернету'))
        dispatch(loadingEnd())
        return null
      }
      dispatch(error(err.toString()))
      dispatch(getTickets(payload))
    })
}

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

const error = (payload) => ({ type: ERROR, payload })

const noError = () => ({ type: NO_ERROR })

const buttonActive = (buttonName) => ({
  type: BUTTON,
  payload: buttonName,
})

export { id, ticket, setCheckAll, setCheckedList, onSale, onFast, onOptimal, loadingBegin, error, buttonActive }
