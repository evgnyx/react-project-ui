import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  color?: string
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
          color && styles[color],
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
