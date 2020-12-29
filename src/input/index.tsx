import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: string
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
          color && styles[color],
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
