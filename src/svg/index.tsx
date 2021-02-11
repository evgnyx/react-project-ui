import * as React from 'react'
import join from '../utils/join'
import CONFIG from '../config'
import { ColorType } from '../types'

export interface SvgProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  className?: string
  size?: string
  color?: ColorType
  name: string
}

const Svg = React.forwardRef(function Svg({
  className,
  size,
  color,
  name,
  ...props
}: SvgProps, ref: any) {
  const styles = CONFIG.svg || {}
  return (
    <span
      className={
        join(
          styles.uiSvg,
          size && styles[size] || styles.default,
          styles[color as any],
          className
        )
      }
      { ...props }
      ref={ ref }
    >
      <svg>
        <use href={ `#${ name }` } />
      </svg>
    </span>
  )
})

export default Svg
