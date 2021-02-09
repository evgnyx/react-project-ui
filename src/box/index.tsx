import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string
  elevation?: string | number
  color?: string
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
          styles[color!],
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
