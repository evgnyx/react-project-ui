import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import join from '../utils/join'
import { getStyles } from '../config'
import { ColorType } from '../types'

type ButtonAttributes = React.ButtonHTMLAttributes<HTMLButtonElement>

export interface ButtonProps extends Omit<ButtonAttributes, 'value' | 'color'> {
  className?: string
  variant?: string
  color?: ColorType
  size?: string
  active?: boolean
  href?: string
  to?: LinkProps['to']
  as?: React.ReactNode
  value?: ButtonAttributes['value'] | null
}

const Button = React.forwardRef(function Button({
  className,
  variant = 'default',
  color,
  size,
  active,
  as = 'button',
  ...props
}: ButtonProps, ref: any) {
  const styles = getStyles('button')
  const Tag: any = React.useMemo(() => {
    if (props.href) return 'a'
    if (props.to) return Link
    return as
  }, [props.href, props.to, as])

  return (
    <Tag
      className={
        join(
          styles.uiButton,
          variant && styles[variant],
          color && styles[color],
          size && styles[size],
          active && styles.active,
          className
        )
      }
      type="button"
      { ...props }
      ref={ ref }
    />
  )
})

export default Button
