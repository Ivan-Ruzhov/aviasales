import React from 'react'
import { Checkbox, ConfigProvider } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import { setCheckAll, setCheckedList } from '../actions/actions'

import classes from './FilterMenu.module.scss'
const CheckboxGroup = Checkbox.Group

const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']

const FilterMenu = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.checkboxOptions)
  const onChange = (list) => {
    dispatch(setCheckedList(list))
    dispatch(setCheckAll(list.length === plainOptions.length))
  }

  const onCheckAllChange = (event) => {
    dispatch(setCheckedList(event.target.checked ? plainOptions : []))
    dispatch(setCheckAll(event.target.checked))
  }
  return (
    <section className={classes['antd-checkbox']}>
      <p className={classes['antd-checkbox__header']}> Kоличество пересадок</p>
      <ConfigProvider
        theme={{
          token: {
            controlInteractiveSize: 20,
            fontSize: 13,
            fontFamily: 'Open Sans, sans-serif',
          },
        }}
      >
        <Checkbox className={classes['antd-checkbox__checkbox']} onChange={onCheckAllChange} checked={filter.checkAll}>
          Все
        </Checkbox>
        <CheckboxGroup
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
            padding: '10px 0px 20px 20px',
            margin: '0px',
          }}
          className={classes['antd-checkbox-group']}
          options={plainOptions}
          value={filter.checkedList}
          onChange={onChange}
        />
      </ConfigProvider>
    </section>
  )
}

export { FilterMenu }
