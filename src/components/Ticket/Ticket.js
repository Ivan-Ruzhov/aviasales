import React from 'react'
import { add, format } from 'date-fns'

import classes from './Ticket.module.scss'

function Ticket({ tic }) {
  const oneTime = format(add(new Date(tic.segments[0].date), {}), 'KK-mm')
    .split('-')
    .join(':')
  const twoTime = format(add(new Date(tic.segments[1].date), {}), 'KK-mm')
    .split('-')
    .join(':')
  const fixNumber = (arr) => {
    if (arr[1] >= 60) {
      const newNum = (Number(arr[0]) + 1).toString()
      const newNumTwo = (Number(arr[1]) - 60).toString()
      return arr.splice(0, 2, newNum, newNumTwo)
    }
    return arr
  }
  const transfer = (arr) => {
    if (arr.length === 0) {
      return 'Нет пересадок'
    }
    if (arr.length === 1) {
      return '1 пересадка'
    }
    if (arr.length === 2) {
      return '2 пересадки'
    }
    return '3 пересадки'
  }
  const city = (arr) => arr.join(' ')
  const fixDate = (arr, arrTwo) => {
    const newArrayTwo = fixNumber(arrTwo)
    const newArray = arr.split(':')
    let newHours = Number(newArray[0]) + Number(newArrayTwo[0])
    if (newHours >= 24) {
      newHours -= 24
    }
    let newMinutes = Number(newArray[1]) + Number(newArrayTwo[1])
    if (newMinutes >= 60) {
      newMinutes -= 60
      newHours += 1
    }
    if (newMinutes < 10) {
      newMinutes = `0${newMinutes.toString()}`
    }
    if (newHours < 10) {
      newHours = `0${newHours}`
    }
    return [newHours, newMinutes].join(':')
  }
  const first = (tic.segments[0].duration / 60).toFixed(2).split('.')
  const second = (tic.segments[1].duration / 60).toFixed(2).split('.')
  return (
    <div className={classes.ticket}>
      <header className={classes.ticket__header}>
        <span className={classes.ticket__price}>{tic.price} Р</span>
        <img
          className={classes.ticket__logo}
          src={`https://pics.avs.io/99/36/${tic.logo}.png`}
          alt="Логотип Авиакомпании"
        />
      </header>
      <ul className={classes.list}>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>
            {tic.segments[0].origin} - {tic.segments[0].destination}
          </span>
          <span className={classes['list__span-description']}>
            {oneTime} - {fixDate(oneTime, first)}
          </span>
        </li>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>В пути</span>
          <span className={classes['list__span-description']}>
            {fixNumber(first)[0]}ч {fixNumber(first)[1]}м
          </span>
        </li>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>{transfer(tic.segments[0].stops)}</span>
          <span className={classes['list__span-description']}>{city(tic.segments[0].stops)}</span>
        </li>
      </ul>
      <ul className={classes.list}>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>
            {tic.segments[1].origin} - {tic.segments[1].destination}
          </span>
          <span className={classes['list__span-description']}>
            {twoTime} - {fixDate(twoTime, second)}
          </span>
        </li>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>В пути</span>
          <span className={classes['list__span-description']}>
            {fixNumber(second)[0]}ч {fixNumber(second)[1]}м
          </span>
        </li>
        <li className={classes.list__element}>
          <span className={classes['list__span-header']}>{transfer(tic.segments[1].stops)}</span>
          <span className={classes['list__span-description']}>{city(tic.segments[1].stops)}</span>
        </li>
      </ul>
    </div>
  )
}

export { Ticket }
