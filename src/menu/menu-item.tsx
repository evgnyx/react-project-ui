import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import { Fn } from '../types'

export interface MenuItemProps extends React.PropsWithChildren<{
  className?: string
  active?: boolean
  onClick?: Fn
}> {}

const MenuItem = React.forwardRef(function MenuItem({
  className,
  active,
  ...props
}: MenuItemProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <li
      className={
        join(
          styles.uiMenuItem,
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
