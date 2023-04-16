import React from 'react'
import { useDispatch } from 'react-redux'

import { moreTickets } from '../actions/actions'

import classes from './FooterButton.module.scss'

const FooterButton = () => {
  const dispatch = useDispatch()
  const more = () => {
    dispatch(moreTickets())
  }
  return (
    <button className={classes['footer-button']} onClick={more}>
      <span className={classes['footer-button__span']}>Показать еще 5 билетов!</span>
    </button>
  )
}

export { FooterButton }
