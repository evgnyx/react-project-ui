import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import MenuItem from './menu-item'

interface MenuProps extends React.PropsWithChildren<{
  className?: string
  variant?: string
}> {}

const Menu = React.forwardRef(function Menu({
  className,
  variant,
  children
}: MenuProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <ul
      className={
        join(
          styles.uiMenu,
          variant && styles[variant],
          className
        )
      }
      ref={ ref }
    >
      { children }
    </ul>
  )
})

;(Menu as any).Item = MenuItem

export default Menu as typeof Menu & {
  Item: typeof MenuItem
}
