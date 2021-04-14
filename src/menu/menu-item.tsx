import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import { Fn } from '../types'

export interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  className?: string
  active?: boolean
  variant?: string
  onClick?: Fn
}

const MenuItem = React.forwardRef(function MenuItem({
  className,
  active,
  variant,
  ...props
}: MenuItemProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <li
      className={
        join(
          styles.uiMenuItem,
          styles[variant!],
          active && styles.active,
          className
        )
      }
      ref={ ref }
      { ...props }
    />
  )
})

export default MenuItem
