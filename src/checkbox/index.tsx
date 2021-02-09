import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: string
  color?: string
  size?: string | number
  reverse?: boolean
}

function Checkbox({
  className,
  variant,
  color,
  size,
  reverse,
  children,
  ...props
}: CheckboxProps) {
  const styles = getStyles('checkbox')
  return (
    <label className={ join(styles.uiCheckbox, className) }>
      <input
        className={
          join(
            styles.uiCheckboxField,
            reverse && styles.reverse,
            styles[variant!],
            styles[color!],
            styles[size!],
          )
        }
        { ...props }
        type="checkbox"
      />
      <i className={ styles.uiCheckboxToggle } />
      { children &&
        <span className={ styles.uiCheckboxContent }>
          { children }
        </span>
      }
    </label>
  )
}

export default Checkbox
