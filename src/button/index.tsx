import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface ButtonProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>> {
  className?: string
  variant?: string
  color?: string
}

const Button = React.forwardRef(function Button({
  className,
  variant,
  color,
  ...props
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
      { ...props }
      ref={ ref }
    />
  )
})

export default Button
