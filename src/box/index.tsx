import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import { ColorType } from '../types'

export interface BoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  variant?: string
  elevation?: string | number
  color?: ColorType
  as?: 'div' | 'form' | string | React.FunctionComponent<any>
}

const Box = React.forwardRef(function Box({
  className,
  variant,
  elevation,
  color,
  as: Tag = 'div',
  ...props
}: BoxProps, ref: any) {
  const styles = CONFIG.box || {}
  return (
    <Tag
      className={
        join(
          styles.uiBox,
          styles[variant!],
          styles[color as any],
          elevation && styles[`elevation${ elevation }`],
          className
        )
      }
      { ...props }
      ref={ ref }
    />
  )
})

export default Box
