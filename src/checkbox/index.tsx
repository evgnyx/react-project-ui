import * as React from 'react'
import join from '../utils/join'
import { getStyles } from '../config'

type HTMLCheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

interface CheckboxProps extends Omit<HTMLCheckboxProps, 'size' | 'checked' | 'value'> {
  value?: HTMLCheckboxProps['checked']
  variant?: string
  color?: string
  size?: string | number
  type?: 'checkbox' | 'radio'
}

function Checkbox({
  value,
  variant,
  color,
  size,
  children,
  ...props
}: CheckboxProps) {
  const styles = getStyles('checkbox')
  return (
    <label className={ styles.uiCheckbox }>
      <input
        className={
          join(
            styles.uiCheckboxField,
            styles[variant!],
            styles[color!],
            styles[size!],
          )
        }
        checked={ value }
        type="checkbox"
        { ...props }
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
