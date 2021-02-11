import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { ColorType } from '../types'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'> {
  color?: ColorType
}

const Input = React.forwardRef(function Input({
  className,
  color,
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
          styles[color as any],
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
