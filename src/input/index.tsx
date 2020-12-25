import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef(function Input({
  className,
  children,
  ...props
}: InputProps, ref: any) {
  const styles = CONFIG.get('input')
  return (
    <div className={ styles.uiInputContainer }>
      <input
        className={
          join(
            styles.uiInput,
            className
          )
        }
        { ...props }
        ref={ ref }
      />
      { children }
    </div>
  )
})

export default Input
