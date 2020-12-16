import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface ButtonProps extends React.PropsWithChildren<{
  className?: string
  variant?: string
  color?: string
}> {}

const Button = React.forwardRef(function Button({
  className,
  variant,
  color,
  children
}: ButtonProps, ref: any) {
  const styles = CONFIG.button || {}
  return (
    <button
      className={
        join(
          styles.uiButton,
          variant && styles[variant],
          color && styles[color],
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
