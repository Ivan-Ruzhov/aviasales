import thunk from 'redux-thunk'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import { checkboxOptions } from './Checxbox-reducer'
import { ticketReducer } from './Ticket-reducer'
import { moreTickets } from './Filter-More-Tickets'

const rootReducer = combineReducers({
  checkboxOptions,
  ticketReducer,
  moreTickets,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export { store }
