import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import join from '../utils/join'
import CONFIG from '../config'

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: string
  color?: string
  size?: string
  href?: string
  to?: LinkProps['to']
}

const Button = React.forwardRef(function Button({
  className,
  variant = 'default',
  color,
  size,
  ...props
}: ButtonProps, ref: any) {
  const styles = CONFIG.button || {}

  const Tag: any = React.useMemo(() => {
    if (props.href) return 'a'
    if (props.to) return Link
    return 'button'
  }, [props.href, props.to])

  return (
    <Tag
      className={
        join(
          styles.uiButton,
          variant && styles[variant],
          color && styles[color],
          size && styles[size],
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default Button
