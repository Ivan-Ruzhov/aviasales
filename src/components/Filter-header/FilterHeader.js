import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { onSale, onFast, onOptimal, buttonActive } from '../../actions/actions'

import classes from './FilterHeader.module.scss'

function FilterHeader() {
  const dispatch = useDispatch()
  const [nameButton] = useState({
    'filter__button-cheap': 'Самый дешевый',
    'filter__button-fast': 'Самый быстрый',
    'filter__Button-optimal': 'Оптимальный',
  })
  const name = Object.values(nameButton)
  const value = Object.keys(nameButton)
  const func = [onSale(), onFast(), onOptimal()]
  const filter = useSelector((state) => state.buttonActive)
  const buttonCreate = (arrName, arrFunc, arrClass, arrActive) =>
    arrName.map((values, index) => {
      const buttonClass = classNames({
        [`${classes['filter__buttons-active']}`]: arrClass[index] === arrActive.activeFilter,
      })
      return (
        <button
          key={index}
          className={`${classes.filter__buttons} ${classes[`${arrClass[index]}`]} ${buttonClass}`}
          onClick={() => {
            dispatch(arrFunc[index])
            dispatch(buttonActive(arrClass[index]))
          }}
        >
          {values}
        </button>
      )
    })
  const elements = buttonCreate(name, func, value, filter)
  return <div className={classes.filter}>{elements}</div>
}

export { FilterHeader }
