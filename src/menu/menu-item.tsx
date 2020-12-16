import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

interface MenuItemProps extends React.PropsWithChildren<{
  className?: string
}> {}

const MenuItem = React.forwardRef(function MenuItem({
  className,
  children
}: MenuItemProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <li
      className={
        join(
          styles.uiMenuItem,
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
