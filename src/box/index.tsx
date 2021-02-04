import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: string
  elevation?: string | number
  as?: 'div' | 'form' | string | React.FunctionComponent<any>
}

const Box = React.forwardRef(function Box({
  className,
  variant,
  elevation,
  as: Tag = 'div',
  ...props
}: BoxProps, ref: any) {
  const styles = CONFIG.box || {}
  return (
    <Tag
      className={
        join(
          styles.uiBox,
          variant && styles[variant],
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
