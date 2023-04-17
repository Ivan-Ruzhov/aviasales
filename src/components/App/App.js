import React from 'react'

import { FilterHeader } from '../Filter-header'
import { FilterMenu } from '../Filter-menu'
import { ListTickets } from '../List-tickets'
import Logo from '../../picture/logo.svg'

import classes from './App.module.scss'

// eslint-disable-next-line no-unused-vars

function App() {
  return (
    <div className={classes.app}>
      <img className={classes.app__logo} src={Logo} alt="Company Logo" />
      <div className={classes.container}>
        <FilterMenu />
        <div className={classes.content}>
          <FilterHeader />
          <ListTickets />
        </div>
      </div>
    </div>
  )
}

export { App }
