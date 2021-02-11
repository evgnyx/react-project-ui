import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import MenuItem from './menu-item'
import MenuIcon from './menu-icon'
import MenuText from './menu-text'
import { ColorType } from '../types'

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'color'> {
  className?: string
  variant?: string
  color?: ColorType
  horizontal?: boolean
}

const Menu = React.forwardRef(function Menu({
  className,
  variant,
  color,
  horizontal,
  children,
  ...props
}: MenuProps, ref: any) {
  const styles = CONFIG.menu || {}
  const cl = React.useMemo(() => {
    return join(
      horizontal
        ? styles.uiMenuHorizontal
        : styles.uiMenu,
      styles[variant!],
      styles[color as any],
      className
    )
  }, [horizontal, variant, color, className])

  return (
    <ul
      className={ cl }
      { ...props }
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
