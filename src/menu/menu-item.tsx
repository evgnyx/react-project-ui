import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface MenuItemProps extends React.PropsWithChildren<{
  className?: string
  active?: boolean
}> {}

const MenuItem = React.forwardRef(function MenuItem({
  className,
  active,
  children
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
    >
      { children }
    </li>
  )
})

export default MenuItem
