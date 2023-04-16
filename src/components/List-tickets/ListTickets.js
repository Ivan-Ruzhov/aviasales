import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Spin } from 'antd'

import { Ticket } from '../Ticket'
import { FooterButton } from '../Footer-button'
import { ticketsServes } from '../tickets-servise'
import { ticket, loadingBegin, error } from '../actions/actions'
import { filterOfStops } from '../Reducer/Checxbox-reducer'

import classes from './ListTickets.module.scss'
const ListTickets = () => {
  let id = 0
  const getTickets = new ticketsServes()
  const dispatch = useDispatch()
  const { tickets, stops, loading } = useSelector((state) => state.ticketReducer)
  const spinner = loading ? <Spin /> : null
  const filter = useSelector((state) => state.checkboxOptions.checkedList)
  const ticketList = filterOfStops(tickets, filter)
  const counter = useSelector((state) => state.moreTickets.count)
  const elements = ticketList.slice(0, counter)
  useEffect(() => {
    if (!localStorage.getItem('aviaID')) {
      getTickets.getId().then()
    }
    dispatch(loadingBegin())
    dispatch(ticket(getTickets.getTickets()))
  }, [])
  useEffect(() => {
    dispatch(
      ticket(
        getTickets.getTickets().catch(() => {
          dispatch(error())
        })
      )
    )
  }, [stops])
  return (
    <React.Fragment>
      {spinner}
      {elements.length ? (
        <ul className={classes['list-tickets']}>
          {elements.map((el) => {
            return <Ticket key={id++} tic={el} />
          })}
          {elements.length ? <FooterButton /> : null}
        </ul>
      ) : null}
      {elements.length === 0 && !loading ? (
        <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
      ) : null}
    </React.Fragment>
  )
}

export { ListTickets }
