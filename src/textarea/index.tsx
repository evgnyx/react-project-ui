import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'
import { ColorType } from '../types'

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'> {
  color?: ColorType
}

const Textarea = React.forwardRef(function Textarea({
  className,
  color,
  children,
  ...props
}: TextareaProps, ref) {
  const styles = getStyles('textarea')
  return (
    <div
      className={
        join(
          styles.uiTextarea,
          props.value && styles.isComplete,
          styles[color as any],
          className
        )
      }
    >
      <textarea
        className={ styles.uiTextareaField }
        { ...props }
        ref={ ref as any }
      />
      { children }
    </div>
  )
})

export default Textarea
