import { Alert, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { Ticket } from '../Ticket'
import { FooterButton } from '../Footer-button'
import { ticket } from '../../actions/actions'

import classes from './ListTickets.module.scss'

function ListTickets() {
  const [count, setCount] = useState(5)
  const more = () => {
    setCount(count + 5)
  }
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
  const dispatch = useDispatch()
  const { tickets, loading, err } = useSelector((state) => state.ticketReducer)
  useEffect(() => {
    dispatch(ticket())
  }, [])
  const spinner = loading ? <Spin /> : null
  const filter = useSelector((state) => state.checkboxOptions.checkedList)
  const ticketList = filterOfStops(tickets, filter)
  return (
    <>
      {err ? <Alert type="error" message={err} /> : null}
      {spinner}
      {ticketList.length ? (
        <ul className={classes['list-tickets']}>
          {ticketList.slice(0, count).map((el) => (
            <Ticket key={(el.price + el.segments[0].duration) * Math.random()} tic={el} />
          ))}
          {ticketList.length ? <FooterButton more={more} /> : null}
        </ul>
      ) : null}
      {ticketList.length === 0 && !loading ? (
        <Alert message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
      ) : null}
    </>
  )
}

export { ListTickets }
