import * as React from 'react'
import Svg, { SvgProps } from '../svg'
import join from '../utils/join'
import CONFIG from '../config'

export interface MenuIconProps extends SvgProps {}

const MenuIcon = React.forwardRef(function MenuIcon({
  className,
  ...props
}: MenuIconProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <Svg
      className={
        join(
          styles.uiMenuIcon,
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default MenuIcon
