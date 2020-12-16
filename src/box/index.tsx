import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'

export interface BoxProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  className?: string
  variant?: string
  elevation?: string | number
}

const Box = React.forwardRef(function Box({
  className,
  variant,
  elevation,
  ...props
}: BoxProps, ref: any) {
  const styles = CONFIG.box || {}
  return (
    <div
      className={
        join(
          styles.uiBox,
          variant && styles[variant],
          elevation && styles[`elevation${ elevation }`],
          className
        )
      }
      ref={ ref }
      { ...props }
    />
  )
})

export default Box
