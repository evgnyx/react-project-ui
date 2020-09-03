import * as React from 'react'
import { join } from '../tools'
import CONFIG from '../config'


const key = 'ui-button'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string,
  view?: string,
  size?: string,
  href?: string,
  reverse?: boolean,
}

function Button({
  className,
  size,
  view,
  color,
  reverse,
  children,
  ...props
}: ButtonProps) {
  const Tag = (props.href ? 'a' : 'button') as React.ElementType

  const styles = CONFIG.button

  return (
    <Tag
      className={
        join(
          styles![key] || key,
          // theme![key],
          // theme![size!] || styles![size!] || size,
          // theme![view!] || view,
          // theme![color!] || color,
          // reverse && (styles!.reverse || 'reverse'),
          // Icon && !children && (styles!.icon || 'icon'),
          // className
        )
      }
      type="button"
      // aria-label={ children } // for screen readers
      { ...props }
    >
      { children }
    </Tag>
  )
}

export default React.memo(Button)
