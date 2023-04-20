import { Alert, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'

import { Ticket } from '../Ticket'
import { FooterButton } from '../Footer-button'
import { ticketsServes } from '../../tickets-servise'
import { loadingBegin, ticket } from '../../actions/actions'

import classes from './ListTickets.module.scss'

function ListTickets() {
  const filterOfStops = (tickets, checkedList) => {
    const newCheckedList = checkedList.map((item) => {
      switch (item) {
        case 'Без пересадок':
          return 0
        case '1 пересадка':
          return 1
        case '2 пересадки':
          return 2
        case '3 пересадки':
          return 3
        default:
          return 0
      }
    })
    return tickets.filter(
      (ticket) =>
        newCheckedList.includes(ticket.segments[0].stops.length) &&
        newCheckedList.includes(ticket.segments[1].stops.length)
    )
  }
  const getTickets = new ticketsServes()
  const dispatch = useDispatch()
  const { tickets, loading, searchId } = useSelector((state) => state.ticketReducer)
  console.log(tickets)
  const spinner = loading ? <Spin /> : null
  const filter = useSelector((state) => state.checkboxOptions.checkedList)
  const ticketList = filterOfStops(tickets, filter)
  const counter = useSelector((state) => state.moreTickets.count)
  const elements = ticketList
  useEffect(() => {
    dispatch(loadingBegin())
    dispatch(ticket(getTickets.getTickets(searchId)))
  }, [])
  return (
    <>
      {spinner}
      {elements.length ? (
        <ul className={classes['list-tickets']}>
          {elements.slice(0, counter).map((el) => (
            <Ticket key={(el.price + el.segments[0].duration) * Math.random()} tic={el} />
          ))}
          {elements.length ? <FooterButton /> : null}
        </ul>
      ) : null}
      {elements.length === 0 && !loading ? (
        <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
      ) : null}
    </>
  )
}

export { ListTickets }
