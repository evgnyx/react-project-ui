import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
// import { Fn } from '../types'

const Settings = {
  class: 'ui-button',
}

interface ButtonProps extends React.PropsWithChildren<{
  className?: string
}> {}

const Button = React.forwardRef(function Button({
  className,
  children
}: ButtonProps, ref: any) {
  const styles = CONFIG.button || {}
  return (
    <button
      className={
        join(
          styles.uiButton || Settings.class,
          className
        )
      }
      ref={ ref }
    >
      { children }
    </button>
  )
})

export default Button
