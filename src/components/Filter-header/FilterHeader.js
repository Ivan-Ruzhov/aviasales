import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { onSale, onFast, onOptimal } from '../actions/actions'

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
  const onClick = (e) => {
    const list = e.currentTarget.querySelectorAll('button')
    if (!e.target.classList.contains(`${classes['filter__buttons-active']}`)) {
      for (let i = 0; i < list.length; i++) {
        list[i].classList.remove(`${classes['filter__buttons-active']}`)
      }
      e.target.classList.add(`${classes['filter__buttons-active']}`)
    }
  }
  let id = 0
  const buttonCreate = (arrName, arrFunc, arrClass, ids) =>
    arrName.map((values) => (
      // eslint-disable-next-line react/button-has-type
      <button
        key={(ids += 1)}
        className={`${classes.filter__buttons} ${classes[`${arrClass[id]}`]}`}
        onClick={() => dispatch(arrFunc[id])}
      >
        {values}
      </button>
    ))
  const elements = buttonCreate(name, func, value, id)
  return (
    <div className={classes.filter} onClick={onClick}>
      {elements}
    </div>
  )
}

export { FilterHeader }
