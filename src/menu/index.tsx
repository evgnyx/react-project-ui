import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import MenuItem from './menu-item'
import MenuIcon from './menu-icon'
import MenuText from './menu-text'

export interface MenuProps extends React.PropsWithChildren<{
  className?: string
  variant?: string
  color?: string
  horizontal?: boolean
}> {}

const Menu = React.forwardRef(function Menu({
  className,
  variant,
  color,
  horizontal,
  children
}: MenuProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <ul
      className={
        join(
          styles.uiMenu,
          horizontal && styles.horizontal,
          variant && styles[variant],
          styles[color as any],
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
;(Menu as any).Icon = MenuIcon
;(Menu as any).Text = MenuText

export default Menu as typeof Menu & {
  Item: typeof MenuItem
  Icon: typeof MenuIcon
  Text: typeof MenuText
}
