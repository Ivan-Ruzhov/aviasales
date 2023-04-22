import thunk from 'redux-thunk'
import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux'

import { checkboxOptions } from './Checxbox-reducer'
import { ticketReducer } from './Ticket-reducer'
import { buttonActive } from './Button-active-reducer'

const store = createStore(
  combineReducers({
    checkboxOptions,
    ticketReducer,
    buttonActive,
  }),
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export { store }
