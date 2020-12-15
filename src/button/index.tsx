import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
// import { Fn } from '../types'

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
          styles.uiButton,
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
