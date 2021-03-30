import * as React from 'react'
import Text, { TextProps } from '../text'
import join from '../utils/join'
import CONFIG from '../config'

export interface MenuTextProps extends
  TextProps,
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>
{}

const MenuText = React.forwardRef(function MenuText({
  className,
  ...props
}: MenuTextProps, ref: any) {
  const styles = CONFIG.menu || {}
  return (
    <Text
      className={
        join(
          styles.uiMenuText,
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default MenuText
