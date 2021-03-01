import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { ColorType } from '../types'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'size'> {
  variant?: string
  color?: ColorType
  size?: string
}

const Input = React.forwardRef(function Input({
  className,
  variant,
  color,
  size,
  children,
  ...props
}: InputProps, ref: any) {
  const styles = getStyles('input')
  return (
    <div
      className={
        join(
          styles.uiInput,
          props.value && styles.isComplete,
          styles[variant as any],
          styles[color as any],
          styles[size as any],
          className
        )
      }
    >
      <input
        className={ styles.uiInputField }
        { ...props }
        ref={ ref }
      />
      { children }
    </div>
  )
})

export default Input
