import React from 'react'
import PropTypes from 'prop-types'

import classes from './FooterButton.module.scss'

function FooterButton({ more }) {
  return (
    <button className={classes['footer-button']} onClick={() => more()}>
      <span className={classes['footer-button__span']}>Показать еще 5 билетов!</span>
    </button>
  )
}

FooterButton.defaultProps = {
  more: () => {},
}

FooterButton.propTypes = {
  more: PropTypes.func,
}

export { FooterButton }
