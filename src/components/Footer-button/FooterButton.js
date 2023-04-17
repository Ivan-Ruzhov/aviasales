import React from 'react'
import { useDispatch } from 'react-redux'

import { moreTickets } from '../actions/actions'

import classes from './FooterButton.module.scss'

function FooterButton() {
  const dispatch = useDispatch()

  return (
    <button className={classes['footer-button']} onClick={() => dispatch(moreTickets())}>
      <span className={classes['footer-button__span']}>Показать еще 5 билетов!</span>
    </button>
  )
}

export { FooterButton }
